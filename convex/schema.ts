import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.optional(v.string()),
    name: v.string(),
    balanceINR: v.float64(),
    balanceUSD: v.float64(),
    balanceEUR: v.float64(),
  }).index("by_token", ["tokenIdentifier"]),

  transactions: defineTable({
    tokenIdentifier: v.optional(v.string()),
    userId: v.id("users"),
    note: v.optional(v.string()),
    amountINR: v.optional(v.number()),
    amount: v.optional(v.number()),
    fxFee: v.optional(v.number()),
    type: v.union(v.literal("load"), v.literal("spend")),
    currency: v.union(v.literal("INR"), v.literal("USD"), v.literal("EUR")),
    merchant: v.string(),
    status: v.optional(v.string()),
    timestamp: v.number(),
    source: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),
});
