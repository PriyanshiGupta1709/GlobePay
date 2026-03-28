import { mutation, query } from "./_generated/server";
import type { MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { requireUser } from "./lib/authUser";
import {
  inrPaisaToEurCents,
  inrPaisaToUsdCents,
  usdShortfallToInrPaisaEmergency,
} from "./lib/money";

const TARGET = v.union(
  v.literal("INR"),
  v.literal("USD"),
  v.literal("EUR"),
);

const EMERGENCY_FEE = 0.02;

/** ISO-ish payload scanned from a merchant QR (JSON string). */
type QrPayPayload = {
  v: number;
  t: "pay";
  merchant: string;
  amountUSDCents: number;
};

function parsePaymentQrPayload(qrPayload: string): QrPayPayload {
  let parsed: unknown;
  try {
    parsed = JSON.parse(qrPayload);
  } catch {
    throw new Error("QR payload is not valid JSON");
  }
  if (!parsed || typeof parsed !== "object") {
    throw new Error("Invalid QR payload");
  }
  const o = parsed as Record<string, unknown>;
  if (o.v !== 1 || o.t !== "pay") {
    throw new Error("Unsupported QR payment version or type");
  }
  if (typeof o.merchant !== "string" || !o.merchant.trim()) {
    throw new Error("QR payload missing merchant");
  }
  if (
    typeof o.amountUSDCents !== "number" ||
    !Number.isFinite(o.amountUSDCents) ||
    o.amountUSDCents <= 0 ||
    !Number.isInteger(o.amountUSDCents)
  ) {
    throw new Error("QR payload missing or invalid amountUSDCents");
  }
  return {
    v: 1,
    t: "pay",
    merchant: o.merchant.trim(),
    amountUSDCents: o.amountUSDCents,
  };
}

async function appendTransaction(
  ctx: MutationCtx,
  args: {
    userId: Id<"users">;
    type: "load" | "spend";
    amount: number;
    currency: "INR" | "USD" | "EUR";
    merchant: string;
    source?: "manual" | "qr";
    note?: string;
  },
) {
  await ctx.db.insert("transactions", {
    userId: args.userId,
    type: args.type,
    amount: args.amount,
    currency: args.currency,
    merchant: args.merchant,
    timestamp: Date.now(),
    source: args.source,
    note: args.note,
  });
}

async function runProcessPayment(
  ctx: MutationCtx,
  args: {
    merchantName: string;
    amountUSDCents: number;
    inrPerUsd: number;
    source: "manual" | "qr";
  },
) {
  if (
    !Number.isFinite(args.amountUSDCents) ||
    args.amountUSDCents <= 0 ||
    !Number.isInteger(args.amountUSDCents)
  ) {
    throw new Error("amountUSDCents must be a positive integer");
  }
  if (args.inrPerUsd <= 0) {
    throw new Error("inrPerUsd must be positive");
  }

  const user = await requireUser(ctx);
  const usd = user.balanceUSD;
  const inr = user.balanceINR;
  const need = args.amountUSDCents;

  let newUsd = usd;
  let newInr = inr;
  let note: string | undefined;

  if (usd >= need) {
    newUsd = usd - need;
  } else {
    const shortfall = need - usd;
    const inrDebit = usdShortfallToInrPaisaEmergency(
      shortfall,
      args.inrPerUsd,
      EMERGENCY_FEE,
    );
    if (inr < inrDebit) {
      throw new Error("Insufficient USD and INR for this payment");
    }
    newUsd = 0;
    newInr = inr - inrDebit;
    note =
      usd > 0
        ? `USD ${usd} + emergency INR ${inrDebit} paisa (2% fee on FX) for ${need}¢`
        : `Emergency INR ${inrDebit} paisa (2% fee on FX) for ${need}¢`;
  }

  await ctx.db.patch(user._id, {
    balanceUSD: newUsd,
    balanceINR: newInr,
  });

  await appendTransaction(ctx, {
    userId: user._id,
    type: "spend",
    amount: need,
    currency: "USD",
    merchant: args.merchantName.trim() || "unknown_merchant",
    source: args.source,
    note,
  });

  return {
    balances: { balanceINR: newInr, balanceUSD: newUsd, balanceEUR: user.balanceEUR },
  };
}

/**
 * Load wallet: convert INR (paisa) into the target bucket using `inrPerUnit`:
 * INR **rupees** per **one** major unit of the target currency (e.g. 83.5 INR per USD).
 * For target INR, `inrPerUnit` is ignored; paisa is credited directly.
 */
export const loadWallet = mutation({
  args: {
    /** Integer paisa loaded from a bank/card (1 INR = 100 paisa). */
    amountINRPaisa: v.number(),
    targetCurrency: TARGET,
    /** INR rupees per 1 USD/EUR (ignored when target is INR). Must be > 0 for FX targets. */
    inrPerUnit: v.number(),
  },
  handler: async (ctx, args) => {
    if (
      !Number.isFinite(args.amountINRPaisa) ||
      args.amountINRPaisa <= 0 ||
      !Number.isInteger(args.amountINRPaisa)
    ) {
      throw new Error("amountINRPaisa must be a positive integer (paisa)");
    }

    const user = await requireUser(ctx);
    let addINR = 0;
    let addUSD = 0;
    let addEUR = 0;
    let creditCurrency: "INR" | "USD" | "EUR" = "INR";
    let creditAmount = 0;

    if (args.targetCurrency === "INR") {
      addINR = args.amountINRPaisa;
      creditCurrency = "INR";
      creditAmount = addINR;
    } else if (args.targetCurrency === "USD") {
      if (args.inrPerUnit <= 0) {
        throw new Error("inrPerUnit must be positive for USD loads");
      }
      addUSD = inrPaisaToUsdCents(args.amountINRPaisa, args.inrPerUnit);
      creditCurrency = "USD";
      creditAmount = addUSD;
    } else {
      if (args.inrPerUnit <= 0) {
        throw new Error("inrPerUnit must be positive for EUR loads");
      }
      addEUR = inrPaisaToEurCents(args.amountINRPaisa, args.inrPerUnit);
      creditCurrency = "EUR";
      creditAmount = addEUR;
    }

    await ctx.db.patch(user._id, {
      balanceINR: user.balanceINR + addINR,
      balanceUSD: user.balanceUSD + addUSD,
      balanceEUR: user.balanceEUR + addEUR,
    });

    await appendTransaction(ctx, {
      userId: user._id,
      type: "load",
      amount: creditAmount,
      currency: creditCurrency,
      merchant: "wallet_load",
      source: "manual",
      note: `From ${args.amountINRPaisa} paisa INR → ${args.targetCurrency}`,
    });

    return {
      credited: { currency: creditCurrency, amount: creditAmount },
      balances: {
        balanceINR: user.balanceINR + addINR,
        balanceUSD: user.balanceUSD + addUSD,
        balanceEUR: user.balanceEUR + addEUR,
      },
    };
  },
});

/**
 * Pay in USD cents. Uses USD first; any USD shortfall is covered from INR at `inrPerUsd`
 * with a 2% emergency markup.
 */
export const processPayment = mutation({
  args: {
    merchantName: v.string(),
    amountUSDCents: v.number(),
    /** INR rupees per 1 USD, used when INR is needed for the shortfall. */
    inrPerUsd: v.number(),
    source: v.optional(v.union(v.literal("manual"), v.literal("qr"))),
  },
  handler: async (ctx, args) => {
    return await runProcessPayment(ctx, {
      merchantName: args.merchantName,
      amountUSDCents: args.amountUSDCents,
      inrPerUsd: args.inrPerUsd,
      source: args.source ?? "manual",
    });
  },
});

/** Parses a scanned payment QR (JSON) and runs the same payment logic as `processPayment`. */
export const processPaymentFromQrScan = mutation({
  args: {
    qrPayload: v.string(),
    inrPerUsd: v.number(),
  },
  handler: async (ctx, args) => {
    const payload = parsePaymentQrPayload(args.qrPayload);
    return await runProcessPayment(ctx, {
      merchantName: payload.merchant,
      amountUSDCents: payload.amountUSDCents,
      inrPerUsd: args.inrPerUsd,
      source: "qr",
    });
  },
});

/**
 * Payload to place in a QR code (stringify `payload` or use `json` with a QR library).
 */
export const getPaymentRequestQrPayload = query({
  args: {
    merchant: v.string(),
    amountUSDCents: v.number(),
  },
  handler: async (_ctx, args) => {
    if (
      !Number.isFinite(args.amountUSDCents) ||
      args.amountUSDCents <= 0 ||
      !Number.isInteger(args.amountUSDCents)
    ) {
      throw new Error("amountUSDCents must be a positive integer");
    }
    const merchant = args.merchant.trim();
    if (!merchant) {
      throw new Error("merchant is required");
    }
    const payload: QrPayPayload = {
      v: 1,
      t: "pay",
      merchant,
      amountUSDCents: args.amountUSDCents,
    };
    return { payload, json: JSON.stringify(payload) };
  },
});

export const getHistory = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);
    return await ctx.db
      .query("transactions")
      .withIndex("by_user_and_timestamp", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(10);
  },
});

export const getWallet = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);
    return {
      name: user.name,
      balanceINR: user.balanceINR,
      balanceUSD: user.balanceUSD,
      balanceEUR: user.balanceEUR,
    };
  },
});
