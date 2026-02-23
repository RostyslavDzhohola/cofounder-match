import { AuthConfig } from "convex/server";

const clerkDomain = process.env.CLERK_JWT_ISSUER_DOMAIN;

if (!clerkDomain) {
  throw new Error("CLERK_JWT_ISSUER_DOMAIN must be set for Convex auth.");
}

export default {
  providers: [
    {
      domain: clerkDomain,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
