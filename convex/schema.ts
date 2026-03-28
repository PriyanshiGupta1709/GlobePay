import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const currency = v.union(
  v.literal("INR"),
  v.literal("USD"),
  v.literal("EUR"),
);

export default defineSchema({
  users: defineTable({
    name: v.string(),
    /** Clerk / Convex auth — use `identity.tokenIdentifier`. */
    tokenIdentifier: v.optional(v.string()),
    /** Stored in paisa (1 INR = 100 paisa). */
    balanceINR: v.number(),
    /** Stored in US cents. */
    balanceUSD: v.number(),
    /** Stored in euro cents. */
    balanceEUR: v.number(),
  })
    .index("by_name", ["name"])
    .index("by_token_identifier", ["tokenIdentifier"]),

  transactions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("load"), v.literal("spend")),
    /** Minor units: paisa for INR, cents for USD/EUR. */
    amount: v.number(),
    currency,
    merchant: v.string(),
    /** Unix ms from the server at write time. */
    timestamp: v.number(),
    source: v.optional(v.union(v.literal("manual"), v.literal("qr"))),
    note: v.optional(v.string()),
  }).index("by_user_and_timestamp", ["userId", "timestamp"]),
});
