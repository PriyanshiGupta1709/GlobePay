import type { AuthConfig } from "convex/server";

/**
 * Clerk: set CLERK_JWT_ISSUER_DOMAIN in Convex env (Dashboard → Settings → Environment Variables).
 * Example: https://your-instance.clerk.accounts.dev
 */
export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
