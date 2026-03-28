import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// ========== QUERIES ==========

/**
 * Fetches the wallet data for the first user.
 * This is what your frontend 'useQuery(api.ledger.getWallet)' uses.
 */
export const getWallet = query({
  args: {},
  handler: async (ctx) => {
    const userDoc = await ctx.db.query("users").first();
    return userDoc || null;
  },
});

/**
 * Fetches transaction history.
 */
export const getHistory = query({
  args: {},
  handler: async (ctx) => {
    const userDoc = await ctx.db.query("users").first();
    if (!userDoc) return [];

    return await ctx.db
      .query("transactions")
      .withIndex("by_user", (q) => q.eq("userId", userDoc._id))
      .order("desc")
      .take(50);
  },
});

// ========== MUTATIONS ==========

/**
 * FIX: Conversion Logic
 * This updates the database balances and creates a history record.
 */
export const convertCurrency = mutation({
  args: {
    amountINRPaisa: v.number(),
    targetCurrency: v.string(),
    convertedAmountCents: v.number(),
    rate: v.number(),
  },
  handler: async (ctx, args) => {
    const userDoc = await ctx.db.query("users").first();
    if (!userDoc) throw new Error("User not found");

    // 1. Validation: Check if user has enough INR
    const currentINR = userDoc.balanceINR || 0;
    if (currentINR < args.amountINRPaisa) {
      throw new Error("Insufficient INR balance for conversion.");
    }

    // 2. Prepare the update
    let updateData: any = {
      balanceINR: currentINR - args.amountINRPaisa,
    };

    if (args.targetCurrency === "USD") {
      updateData.balanceUSD = (userDoc.balanceUSD || 0) + args.convertedAmountCents;
    } else if (args.targetCurrency === "EUR") {
      updateData.balanceEUR = (userDoc.balanceEUR || 0) + args.convertedAmountCents;
    }

    // 3. Update the Wallet (This makes the UI update)
    await ctx.db.patch(userDoc._id, updateData);

    // 4. Record in History
    await ctx.db.insert("transactions", {
      userId: userDoc._id,
      tokenIdentifier: userDoc.tokenIdentifier,
      note: `Converted ₹${(args.amountINRPaisa / 100).toFixed(2)} to ${args.targetCurrency}`,
      amountINR: -(args.amountINRPaisa / 100),
      fxFee: (args.amountINRPaisa * 0.01) / 100, // Optional 1% fee calculation
      type: "spend",
      currency: args.targetCurrency as "USD" | "EUR" | "INR",
      merchant: "Currency Exchange",
      status: "completed",
      timestamp: Date.now(),
    });

    return { success: true };
  },
});

/**
 * Loading funds into the wallet
 */
export const loadWallet = mutation({
  args: {
    amountINRPaisa: v.number(),
    targetCurrency: v.string(),
    inrPerUnit: v.number(),
  },
  handler: async (ctx, args) => {
    const userDoc = await ctx.db.query("users").first();
    if (!userDoc) throw new Error("User not found");

    if (args.targetCurrency === "INR") {
      await ctx.db.patch(userDoc._id, {
        balanceINR: (userDoc.balanceINR || 0) + args.amountINRPaisa,
      });
    }

    return { success: true };
  },
});

/**
 * QR Payment Logic
 */
export const processPaymentFromQrScan = mutation({
  args: {
    qrPayload: v.string(),
    inrPerUsd: v.number(),
  },
  handler: async (ctx, args) => {
    const userDoc = await ctx.db.query("users").first();
    if (!userDoc) throw new Error("User not found");

    const paymentData = JSON.parse(args.qrPayload);
    const amountUSDCents = paymentData.amountUSDCents || 0;

    // Simplified update for the QR payment
    await ctx.db.patch(userDoc._id, {
      balanceUSD: (userDoc.balanceUSD || 0) - amountUSDCents,
    });

    return { success: true };
  },
});