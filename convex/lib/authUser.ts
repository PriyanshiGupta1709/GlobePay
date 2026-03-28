import { QueryCtx, MutationCtx } from "../_generated/server";
import { Doc } from "../_generated/dataModel";

export async function requireUser(ctx: QueryCtx | MutationCtx): Promise<Doc<"users"> | null> {
  // We just grab the first user. If the DB is empty, we return null instead of crashing.
  const user = await ctx.db.query("users").first();
  return user;
}
