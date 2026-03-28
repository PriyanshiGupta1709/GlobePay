import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTestUser = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      balanceINR: 50000, // Starting bonus!
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