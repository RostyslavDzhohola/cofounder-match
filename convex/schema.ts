import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const roleValidator = v.union(
  v.literal("builder"),
  v.literal("designer"),
  v.literal("marketer"),
  v.literal("other"),
);

const workItemTypeValidator = v.union(
  v.literal("software"),
  v.literal("hardware"),
  v.literal("design"),
  v.literal("content"),
  v.literal("marketing"),
  v.literal("other"),
);

const linkStatusValidator = v.union(
  v.literal("unchecked"),
  v.literal("live"),
  v.literal("dead"),
);

const socialValidator = v.object({
  twitter: v.optional(v.string()),
  github: v.optional(v.string()),
  website: v.optional(v.string()),
  instagram: v.optional(v.string()),
});

const photoValidator = v.object({
  url: v.string(),
  key: v.string(),
  uploadedAt: v.number(),
});

const workItemValidator = v.object({
  id: v.string(),
  type: workItemTypeValidator,
  title: v.string(),
  summary: v.string(),
  url: v.string(),
  linkStatus: linkStatusValidator,
});

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    clerkUserId: v.optional(v.string()),
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    onboardingCompleted: v.boolean(),
    role: v.optional(roleValidator),
    bio: v.optional(v.string()),
    currentlyBuilding: v.optional(v.string()),
    social: v.optional(socialValidator),
    photos: v.array(photoValidator),
    projectVideoUrls: v.array(v.string()),
    productsWorkedOn: v.array(v.string()),
    workItems: v.array(workItemValidator),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_clerkUserId", ["clerkUserId"])
    .index("by_onboardingCompleted", ["onboardingCompleted"])
    .index("by_onboardingCompleted_and_updatedAt", [
      "onboardingCompleted",
      "updatedAt",
    ]),
});
