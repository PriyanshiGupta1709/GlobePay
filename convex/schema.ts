import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    balanceINR: v.number(),
  }).index("by_name", ["name"]),

  transactions: defineTable({
    userId: v.id("users"),
    merchantName: v.string(),
    amountUSD: v.number(),
    amountINR: v.number(),
    timestamp: v.number(),
  }),
});