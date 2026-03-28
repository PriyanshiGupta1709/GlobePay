import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Parsed merchant / amount / currency from a raw QR or payment deeplink (e.g. UPI).
 * Returned to clients as plain JSON-compatible fields.
 */
export type MerchantParseResult = {
  merchantName: string;
  amount: number;
  currency: string;
};

const MERCHANT_PARSER_SYSTEM_PROMPT = `You read messy payment QR or URL strings (often UPI: upi://pay?...).

Respond with one JSON object only — no markdown fences, no commentary — using exactly these keys:
- "merchantName" (string): a short, human-readable merchant or payee label. Prefer a real business name from a pn= or similar field when present; otherwise derive a clean title from the payee id (e.g. starbucks@okbank → "Starbucks"). Never use an empty string; use "Unknown merchant" only when nothing sensible exists.
- "amount" (number): numeric charge. If absent, non-numeric, or unclear, use 0.
- "currency" (string): ISO-style code (USD, INR, EUR, …). For Indian UPI without a currency, default "INR".

If input is incomplete, infer only from what is present; do not fabricate confident details beyond reasonable cleanup of given fragments.

Output must be valid JSON for object serialization (double-quoted keys and string values).`;

/**
 * Uses OpenAI JSON mode, then normalizes types. Falls back to deterministic UPI param parsing
 * when the model call fails or returns unusable output (hackathon resilience).
 */
export const parseMerchantQr = action({
  args: { rawQrString: v.string() },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in the Convex environment.");
    }

    const fromModel = await tryOpenAiMerchantParse(args.rawQrString, apiKey);
    if (fromModel) {
      return fromModel;
    }

    const fromUpi = tryUpiParamFallback(args.rawQrString);
    if (fromUpi) {
      return fromUpi;
    }

    throw new Error(
      "Could not parse merchant details from this string; try a standard UPI payment link.",
    );
  },
});

async function tryOpenAiMerchantParse(
  rawQrString: string,
  apiKey: string,
): Promise<MerchantParseResult | null> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: MERCHANT_PARSER_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Raw scanned string:\n${rawQrString}`,
          },
        ],
        max_tokens: 300,
        temperature: 0.1,
      }),
    });

    if (!res.ok) {
      return null;
    }

    const raw: unknown = await res.json();
    const text = extractAssistantText(raw);
    const parsed: unknown = JSON.parse(text);
    return normalizeMerchantParse(parsed);
  } catch {
    return null;
  }
}

/** Deterministic parse for common UPI links when OpenAI is unavailable. */
function tryUpiParamFallback(raw: string): MerchantParseResult | null {
  const trimmed = raw.trim();
  if (!/^upi:/i.test(trimmed)) {
    return null;
  }

  try {
    const url = new URL(trimmed);
    const params = url.searchParams;
    const pa = params.get("pa") ?? "";
    const pn = params.get("pn") ?? "";
    const amRaw = params.get("am");
    const cu = params.get("cu");

    const fromPn = pn.trim();
    const fromPa = pa.split("@")[0]?.trim() ?? "";
    const baseLabel = fromPn || fromPa;
    const merchantName = humanizePayeeLabel(baseLabel);

    let amount = 0;
    if (amRaw != null && amRaw !== "") {
      const n = Number.parseFloat(amRaw);
      if (Number.isFinite(n)) {
        amount = n;
      }
    }

    const currency = (cu?.trim() || "INR").toUpperCase() || "INR";

    return normalizeMerchantParse({
      merchantName,
      amount,
      currency,
    });
  } catch {
    return null;
  }
}

function humanizePayeeLabel(raw: string): string {
  const s = raw.replace(/[._+]+/g, " ").trim();
  if (!s) {
    return "Unknown merchant";
  }
  return s
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function normalizeMerchantParse(raw: unknown): MerchantParseResult | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) {
    return null;
  }
  const o = raw as Record<string, unknown>;

  let merchantName =
    typeof o.merchantName === "string" ? o.merchantName.trim() : "";
  if (!merchantName) {
    merchantName = "Unknown merchant";
  }

  let amount = 0;
  if (typeof o.amount === "number" && Number.isFinite(o.amount)) {
    amount = o.amount;
  } else if (typeof o.amount === "string") {
    const n = Number.parseFloat(o.amount.trim());
    if (Number.isFinite(n)) {
      amount = n;
    }
  }

  let currency =
    typeof o.currency === "string" ? o.currency.trim().toUpperCase() : "";
  if (!currency) {
    currency = "INR";
  }

  return { merchantName, amount, currency };
}

function extractAssistantText(data: unknown): string {
  if (typeof data !== "object" || data === null) {
    throw new Error("Invalid OpenAI response.");
  }
  const choices = (data as { choices?: unknown }).choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new Error("No completion choices.");
  }
  const first = choices[0] as { message?: { content?: unknown } };
  const content = first.message?.content;
  if (typeof content !== "string") {
    throw new Error("Missing text content.");
  }
  return content.trim();
}
