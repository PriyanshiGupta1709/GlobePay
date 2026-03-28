import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Get current user
 */
export const getMe = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return null;
    }

    const userDoc = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", user.tokenIdentifier))
      .first();

    return userDoc;
  },
});

/**
 * Bootstrap user on first login
 */
export const bootstrapUser = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Check if user already exists
    const existing = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", user.tokenIdentifier))
      .first();

    if (existing) {
      return existing;
    }

    // Create new user
    return await ctx.db.insert("users", {
      tokenIdentifier: user.tokenIdentifier,
      name: user.name || "User",
      balanceINR: 0,
      balanceUSD: 0,
      balanceEUR: 0,
    });
  },
});