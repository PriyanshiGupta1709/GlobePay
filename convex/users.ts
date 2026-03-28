import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/** Demo seed: old `balanceINR: 50000` read as ₹50,000 → stored in paisa. */
const DEMO_BONUS_INR_PAISA = 5_000_000;

/**
 * Call once after sign-in so ledger functions can resolve `requireUser`.
 * Requires Convex JWT from Clerk (`ConvexProviderWithAuth` + Clerk template JWT).
 */
export const bootstrap = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const existing = await ctx.db
      .query("users")
      .withIndex("by_token_identifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .first();
    if (existing) {
      return existing._id;
    }
    return await ctx.db.insert("users", {
      name: args.name.trim() || "Traveler",
      tokenIdentifier: identity.tokenIdentifier,
      balanceINR: 0,
      balanceUSD: 0,
      balanceEUR: 0,
    });
  },
});

/** Local / dashboard testing only — no `tokenIdentifier`; use `bootstrap` for real auth. */
export const createTestUser = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      balanceINR: DEMO_BONUS_INR_PAISA,
      balanceUSD: 0,
      balanceEUR: 0,
    });
  },
});

export const getBalance = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_name", (q) => q.eq("name", args.name))
      .first();
    return user ? user.balanceINR : 0;
  },
});
