import { action } from "./_generated/server";
import { v } from "convex/values";

/**
 * Feature 1 (`exchangeRates.fetchExchangeRates`) returns INR per 1 USD/EUR/GBP plus metadata.
 * The forecaster reuses those numbers as `rateInrPerUnit` in `history` — same unit, no conversion.
 * For a smoke test, call `fetchExchangeRates` then `historyFromFeature1Snapshot(rates, pair)` and pass
 * that array as `history`. For production, append daily snapshots (up to 7) instead of only one.
 */

/** Foreign currency side of INR pairs (matches Feature 1 `fetchExchangeRates` keys). */
export type ForecastCurrency = "USD" | "EUR" | "GBP";

/** Same fields as `fetchExchangeRates` (Feature 1); used to build `history` without extra wiring. */
export type Feature1ExchangeRates = {
  USD: number;
  EUR: number;
  GBP: number;
  base: string;
  timestamp: string;
};

/** One daily observation: INR per 1 unit of `currency` (same unit as Feature 1 `USD` / `EUR` / `GBP`). */
export type ForecastRatePoint = {
  /** Calendar day for this observation (ISO date `YYYY-MM-DD` recommended). */
  date: string;
  /** INR equivalent to 1 unit of foreign currency on that date. */
  rateInrPerUnit: number;
};

/**
 * System instructions for OpenAI: one practical, hedged sentence for travel wallets only.
 * Exported so other Convex actions or tests can reuse the same guardrails.
 */
export const TRAVEL_ADVICE_SYSTEM_PROMPT = `You are a cautious travel-wallet assistant. You summarize recent exchange-rate history in plain language for someone managing a trip budget.

Strict rules:
- Reply with exactly one sentence. No lists, no markdown, no quotation marks wrapping the reply.
- Frame advice around topping up or planning a travel balance, not investing or trading.
- Do not predict tomorrow or any future rate; do not promise outcomes. Use cautious phrasing (e.g. "based on this week", "appears", "may") where needed.
- Do not claim profits, arbitrage, or certainty. Avoid superlatives that sound like guarantees.
- Use only the numbers provided in the user message; do not invent rates or dates.
- If the series is nearly flat, say so without drama; if it moved, describe direction in general terms without forecasting.
- If only one day of data is provided, treat it as a single snapshot and do not imply a full-week pattern you were not given.`;

/**
 * Builds the user message sent to OpenAI from the selected pair and up to seven points.
 * Export for reuse (e.g. custom providers, logging, or unit-style checks).
 */
/**
 * Hackathon smoke test: map Feature 1’s JSON into one `{ date, rateInrPerUnit }` row.
 * `date` defaults to the calendar day from `rates.timestamp` (ISO `…YYYY-MM-DD…`).
 */
export function historyFromFeature1Snapshot(
  rates: Feature1ExchangeRates,
  pair: ForecastCurrency,
  options?: { date?: string },
): ForecastRatePoint[] {
  const rateInrPerUnit = rates[pair];
  if (
    typeof rateInrPerUnit !== "number" ||
    !Number.isFinite(rateInrPerUnit) ||
    rateInrPerUnit <= 0
  ) {
    throw new Error(`Invalid rate for pair ${pair} in Feature 1 snapshot.`);
  }
  const date =
    options?.date ??
    (rates.timestamp.length >= 10 ? rates.timestamp.slice(0, 10) : rates.timestamp);
  return [{ date, rateInrPerUnit }];
}

export function buildTravelAdviceUserMessage(
  pair: ForecastCurrency,
  history: ForecastRatePoint[],
): string {
  const lines = history
    .map(
      (p) =>
        `- ${p.date}: ${roundRate(p.rateInrPerUnit)} INR per 1 ${pair}`,
    )
    .join("\n");

  return [
    `Currency pair: ${pair}/INR (values are how many Indian rupees equal one ${pair}).`,
    "",
    `Daily observations (oldest to newest, ${history.length} day(s)):`,
    lines,
    "",
    "Respond with exactly one sentence for the traveler.",
  ].join("\n");
}

/**
 * Calls OpenAI and returns a single trimmed sentence (first sentence if the model returns more than one).
 */
export const generateTravelAdvice = action({
  args: {
    pair: v.union(v.literal("USD"), v.literal("EUR"), v.literal("GBP")),
    history: v.array(
      v.object({
        date: v.string(),
        rateInrPerUnit: v.number(),
      }),
    ),
  },
  handler: async (_ctx, args) => {
    const history = normalizeHistory(args.history);
    if (history.length === 0) {
      throw new Error(
        "history must contain at least one { date, rateInrPerUnit } entry.",
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is not set in the Convex environment.");
    }

    const userMessage = buildTravelAdviceUserMessage(args.pair, history);

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: TRAVEL_ADVICE_SYSTEM_PROMPT },
          { role: "user", content: userMessage },
        ],
        max_tokens: 120,
        temperature: 0.45,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI request failed (${res.status}): ${errText}`);
    }

    const raw: unknown = await res.json();
    const content = extractChatCompletionText(raw);
    return firstSentenceOnly(content);
  },
});

/** Keeps the last seven calendar points when sorted by `date`, oldest first. */
function normalizeHistory(points: ForecastRatePoint[]): ForecastRatePoint[] {
  const sorted = [...points].sort((a, b) => a.date.localeCompare(b.date));
  const last7 = sorted.slice(-7);
  return last7.filter(
    (p) =>
      p.rateInrPerUnit > 0 &&
      typeof p.date === "string" &&
      p.date.length > 0,
  );
}

function roundRate(n: number): string {
  if (!Number.isFinite(n)) {
    return String(n);
  }
  return n.toFixed(4).replace(/\.?0+$/, "");
}

function extractChatCompletionText(data: unknown): string {
  if (!isRecord(data)) {
    throw new Error("Invalid OpenAI response shape.");
  }
  const choices = data.choices;
  if (!Array.isArray(choices) || choices.length === 0) {
    throw new Error("OpenAI returned no choices.");
  }
  const first = choices[0];
  if (!isRecord(first) || !isRecord(first.message)) {
    throw new Error("Invalid OpenAI choice shape.");
  }
  const content = first.message.content;
  if (typeof content !== "string") {
    throw new Error("OpenAI message content was not text.");
  }
  return content.trim();
}

function firstSentenceOnly(text: string): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  // Avoid treating decimal points (e.g. 83.2) as sentence ends.
  const boundary = /(?<!\d)[.!?](?=\s|$)/;
  const m = boundary.exec(cleaned);
  if (m && m.index !== undefined) {
    return cleaned.slice(0, m.index + 1).trim();
  }
  return cleaned;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
