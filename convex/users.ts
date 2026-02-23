import { ConvexError, v } from "convex/values";
import {
  action,
  internalMutation,
  mutation,
  query,
  type MutationCtx,
} from "./_generated/server";
import { api, internal } from "./_generated/api";

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

const socialDraftValidator = v.object({
  twitter: v.optional(v.string()),
  github: v.optional(v.string()),
  website: v.optional(v.string()),
  instagram: v.optional(v.string()),
});

const workItemDraftValidator = v.object({
  id: v.string(),
  type: workItemTypeValidator,
  title: v.string(),
  summary: v.string(),
  url: v.string(),
  linkStatus: v.optional(linkStatusValidator),
});

type SocialDraft = {
  twitter?: string;
  github?: string;
  website?: string;
  instagram?: string;
};

type WorkItemDraft = {
  id: string;
  type:
    | "software"
    | "hardware"
    | "design"
    | "content"
    | "marketing"
    | "other";
  title: string;
  summary: string;
  url: string;
  linkStatus?: "unchecked" | "live" | "dead";
};

type WorkItemStatus = "unchecked" | "live" | "dead";

type NormalizedWorkItem = {
  id: string;
  type:
    | "software"
    | "hardware"
    | "design"
    | "content"
    | "marketing"
    | "other";
  title: string;
  summary: string;
  url: string;
  linkStatus: WorkItemStatus;
};

function trimToUndefined(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function trimToString(value?: string) {
  return value?.trim() ?? "";
}

function normalizeStringList(values?: string[]) {
  if (!values) return [];
  const unique = new Set<string>();

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) continue;
    unique.add(trimmed);
  }

  return Array.from(unique);
}

function normalizeSocial(input?: SocialDraft) {
  if (!input) return undefined;

  const twitter = trimToUndefined(input.twitter);
  const github = trimToUndefined(input.github);
  const website = trimToUndefined(input.website);
  const instagram = trimToUndefined(input.instagram);

  if (!twitter && !github && !website && !instagram) {
    return undefined;
  }

  return {
    ...(twitter ? { twitter } : {}),
    ...(github ? { github } : {}),
    ...(website ? { website } : {}),
    ...(instagram ? { instagram } : {}),
  };
}

function normalizeWorkItems(items?: WorkItemDraft[]) {
  if (!items) return [];

  return items.map((item, index) => ({
    id: trimToString(item.id) || `work-item-${index + 1}-${Date.now()}`,
    type: item.type,
    title: trimToString(item.title),
    summary: trimToString(item.summary),
    url: trimToString(item.url),
    linkStatus: item.linkStatus ?? "unchecked",
  }));
}

function normalizeHttpUrl(url: string, fieldName: string) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("INVALID_PROTOCOL");
    }
    return parsed.toString();
  } catch {
    throw new ConvexError({
      code: "INVALID_URL",
      field: fieldName,
      message: `${fieldName} must be a valid http(s) URL.`,
    });
  }
}

async function requireCurrentUser(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new ConvexError({
      code: "UNAUTHORIZED",
      message: "You must be signed in.",
    });
  }

  const existing = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();

  const now = Date.now();

  if (existing) {
    const basePatch = {
      clerkUserId: identity.subject,
      name: identity.name ?? existing.name,
      username: identity.nickname ?? existing.username,
      onboardingCompleted: existing.onboardingCompleted ?? false,
      photos: existing.photos ?? [],
      projectVideoUrls: existing.projectVideoUrls ?? [],
      productsWorkedOn: existing.productsWorkedOn ?? [],
      workItems: existing.workItems ?? [],
      createdAt: existing.createdAt ?? now,
      updatedAt: now,
    };

    await ctx.db.patch(existing._id, basePatch);

    return {
      identity,
      userId: existing._id,
      existing,
    };
  }

  const userId = await ctx.db.insert("users", {
    tokenIdentifier: identity.tokenIdentifier,
    clerkUserId: identity.subject,
    name: identity.name ?? undefined,
    username: identity.nickname ?? undefined,
    onboardingCompleted: false,
    photos: [],
    projectVideoUrls: [],
    productsWorkedOn: [],
    workItems: [],
    createdAt: now,
    updatedAt: now,
  });

  const inserted = await ctx.db
    .query("users")
    .withIndex("by_tokenIdentifier", (q) =>
      q.eq("tokenIdentifier", identity.tokenIdentifier),
    )
    .unique();

  if (!inserted) {
    throw new ConvexError({
      code: "NOT_FOUND",
      message: "User profile could not be initialized.",
    });
  }

  return {
    identity,
    userId,
    existing: inserted,
  };
}

export const me = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
  },
});

export const ensureMe = mutation({
  args: {},
  handler: async (ctx) => {
    const { userId } = await requireCurrentUser(ctx);
    return userId;
  },
});

export const upsertProfileDraft = mutation({
  args: {
    name: v.optional(v.string()),
    username: v.optional(v.string()),
    role: v.optional(roleValidator),
    bio: v.optional(v.string()),
    currentlyBuilding: v.optional(v.string()),
    social: v.optional(socialDraftValidator),
    projectVideoUrls: v.optional(v.array(v.string())),
    productsWorkedOn: v.optional(v.array(v.string())),
    workItems: v.optional(v.array(workItemDraftValidator)),
  },
  handler: async (ctx, args) => {
    const { userId } = await requireCurrentUser(ctx);

    const patch: Record<string, unknown> = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) {
      patch.name = trimToUndefined(args.name);
    }

    if (args.username !== undefined) {
      patch.username = trimToUndefined(args.username);
    }

    if (args.role !== undefined) {
      patch.role = args.role;
    }

    if (args.bio !== undefined) {
      patch.bio = trimToUndefined(args.bio);
    }

    if (args.currentlyBuilding !== undefined) {
      patch.currentlyBuilding = trimToUndefined(args.currentlyBuilding);
    }

    if (args.social !== undefined) {
      patch.social = normalizeSocial(args.social);
    }

    if (args.projectVideoUrls !== undefined) {
      patch.projectVideoUrls = normalizeStringList(args.projectVideoUrls);
    }

    if (args.productsWorkedOn !== undefined) {
      patch.productsWorkedOn = normalizeStringList(args.productsWorkedOn);
    }

    if (args.workItems !== undefined) {
      patch.workItems = normalizeWorkItems(args.workItems);
    }

    await ctx.db.patch(userId, patch);
    return userId;
  },
});

export const completeOnboarding = mutation({
  args: {
    role: roleValidator,
    bio: v.optional(v.string()),
    currentlyBuilding: v.string(),
    social: v.object({
      twitter: v.string(),
      github: v.string(),
      website: v.optional(v.string()),
      instagram: v.optional(v.string()),
    }),
    projectVideoUrls: v.optional(v.array(v.string())),
    productsWorkedOn: v.optional(v.array(v.string())),
    workItems: v.array(workItemDraftValidator),
  },
  handler: async (ctx, args) => {
    const { userId, existing } = await requireCurrentUser(ctx);

    if (!existing.photos || existing.photos.length < 1) {
      throw new ConvexError({
        code: "PHOTO_REQUIRED",
        message: "Add at least one profile photo before completing onboarding.",
      });
    }

    const currentlyBuilding = trimToString(args.currentlyBuilding);
    if (!currentlyBuilding) {
      throw new ConvexError({
        code: "CURRENTLY_BUILDING_REQUIRED",
        message: "Currently building is required.",
      });
    }

    const twitter = trimToString(args.social.twitter);
    const github = trimToString(args.social.github);

    if (!twitter || !github) {
      throw new ConvexError({
        code: "SOCIAL_REQUIRED",
        message: "Twitter and GitHub are required.",
      });
    }

    const website = trimToUndefined(args.social.website);
    const instagram = trimToUndefined(args.social.instagram);

    if (website) {
      normalizeHttpUrl(website, "website");
    }

    if (instagram) {
      normalizeHttpUrl(instagram, "instagram");
    }

    const workItems = normalizeWorkItems(args.workItems);

    if (workItems.length < 1) {
      throw new ConvexError({
        code: "WORK_ITEM_REQUIRED",
        message: "Add at least one work item before completing onboarding.",
      });
    }

    for (const [index, item] of workItems.entries()) {
      if (!item.title) {
        throw new ConvexError({
          code: "WORK_ITEM_TITLE_REQUIRED",
          message: `Work item ${index + 1} must have a title.`,
        });
      }

      if (!item.url) {
        throw new ConvexError({
          code: "WORK_ITEM_URL_REQUIRED",
          message: `Work item ${index + 1} must have a URL.`,
        });
      }

      item.url = normalizeHttpUrl(item.url, `workItems[${index}].url`);
    }

    const projectVideoUrls = normalizeStringList(args.projectVideoUrls);
    const normalizedVideoUrls = projectVideoUrls.map((url, index) =>
      normalizeHttpUrl(url, `projectVideoUrls[${index}]`),
    );

    await ctx.db.patch(userId, {
      role: args.role,
      bio: trimToUndefined(args.bio),
      currentlyBuilding,
      social: {
        twitter,
        github,
        ...(website ? { website } : {}),
        ...(instagram ? { instagram } : {}),
      },
      projectVideoUrls: normalizedVideoUrls,
      productsWorkedOn: normalizeStringList(args.productsWorkedOn),
      workItems,
      onboardingCompleted: true,
      imageUrl: existing.photos[0]?.url,
      updatedAt: Date.now(),
    });

    return userId;
  },
});

export const addProfilePhoto = mutation({
  args: {
    url: v.string(),
    key: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, existing } = await requireCurrentUser(ctx);

    const key = trimToString(args.key);
    if (!key) {
      throw new ConvexError({
        code: "PHOTO_KEY_REQUIRED",
        message: "Photo key is required.",
      });
    }

    const url = normalizeHttpUrl(trimToString(args.url), "photoUrl");
    const photos = existing.photos ?? [];

    if (photos.some((photo) => photo.key === key)) {
      return photos;
    }

    if (photos.length >= 4) {
      throw new ConvexError({
        code: "PHOTO_LIMIT_REACHED",
        message: "You can upload up to 4 photos.",
      });
    }

    const nextPhotos = [
      ...photos,
      {
        key,
        url,
        uploadedAt: Date.now(),
      },
    ];

    await ctx.db.patch(userId, {
      photos: nextPhotos,
      imageUrl: nextPhotos[0]?.url,
      updatedAt: Date.now(),
    });

    return nextPhotos;
  },
});

export const removeProfilePhoto = mutation({
  args: {
    key: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, existing } = await requireCurrentUser(ctx);
    const key = trimToString(args.key);

    const currentPhotos = existing.photos ?? [];
    const nextPhotos = currentPhotos.filter((photo) => photo.key !== key);

    await ctx.db.patch(userId, {
      photos: nextPhotos,
      imageUrl: nextPhotos[0]?.url,
      updatedAt: Date.now(),
    });

    return nextPhotos;
  },
});

export const listDiscoverableProfiles = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    const profiles = await ctx.db
      .query("users")
      .withIndex("by_onboardingCompleted_and_updatedAt", (q) =>
        q.eq("onboardingCompleted", true),
      )
      .order("desc")
      .take(100);

    if (!identity) return profiles;

    return profiles.filter(
      (profile) => profile.tokenIdentifier !== identity.tokenIdentifier,
    );
  },
});

export const _setWorkItemStatuses = internalMutation({
  args: {
    userId: v.id("users"),
    workItems: v.array(
      v.object({
        id: v.string(),
        type: workItemTypeValidator,
        title: v.string(),
        summary: v.string(),
        url: v.string(),
        linkStatus: linkStatusValidator,
      }),
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      workItems: args.workItems,
      updatedAt: Date.now(),
    });
    return null;
  },
});

async function resolveLinkStatus(url: string): Promise<WorkItemStatus> {
  const target = trimToString(url);
  if (!target) return "unchecked";

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 4000);

  try {
    let response = await fetch(target, {
      method: "HEAD",
      redirect: "follow",
      signal: abortController.signal,
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(target, {
        method: "GET",
        redirect: "follow",
        signal: abortController.signal,
      });
    }

    if (response.ok) return "live";
    if (response.status === 401 || response.status === 403) return "live";
    if (response.status === 404) return "dead";
    if (response.status >= 500) return "unchecked";

    return "dead";
  } catch {
    return "unchecked";
  } finally {
    clearTimeout(timeout);
  }
}

export const recheckLinks = action({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.runQuery(api.users.me, {});

    if (!user) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "You must be signed in.",
      });
    }

    const nextWorkItems: NormalizedWorkItem[] = [];

    for (const item of user.workItems) {
      const linkStatus = await resolveLinkStatus(item.url);
      nextWorkItems.push({
        ...item,
        linkStatus,
      });
    }

    await ctx.runMutation(internal.users._setWorkItemStatuses, {
      userId: user._id,
      workItems: nextWorkItems,
    });

    return {
      checked: nextWorkItems.length,
      live: nextWorkItems.filter((item) => item.linkStatus === "live").length,
      dead: nextWorkItems.filter((item) => item.linkStatus === "dead").length,
      unchecked: nextWorkItems.filter((item) => item.linkStatus === "unchecked")
        .length,
    };
  },
});

export const generateProfileImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveProfileImage = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const { userId } = await requireCurrentUser(ctx);

    const imageUrl = await ctx.storage.getUrl(args.storageId);

    await ctx.db.patch(userId, {
      imageStorageId: args.storageId,
      imageUrl: imageUrl ?? undefined,
      updatedAt: Date.now(),
    });

    return {
      storageId: args.storageId,
      imageUrl,
    };
  },
});
