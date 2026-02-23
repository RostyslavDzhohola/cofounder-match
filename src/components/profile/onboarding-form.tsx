"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  PhotoUploader,
  type ProfilePhoto,
} from "@/components/profile/photo-uploader";
import {
  WorkItemEditor,
  createEmptyWorkItem,
  type EditableWorkItem,
  type WorkItemType,
  type LinkStatus,
} from "@/components/profile/work-item-editor";

const roleOptions = ["builder", "designer", "marketer", "other"] as const;

type Role = (typeof roleOptions)[number];
type FormMode = "onboarding" | "settings";

type FormState = {
  role: Role | "";
  bio: string;
  currentlyBuilding: string;
  twitter: string;
  github: string;
  website: string;
  instagram: string;
  projectVideoUrlsText: string;
  productsWorkedOnText: string;
  workItems: EditableWorkItem[];
};

type OnboardingFormProps = {
  mode: FormMode;
};

const initialFormState: FormState = {
  role: "",
  bio: "",
  currentlyBuilding: "",
  twitter: "",
  github: "",
  website: "",
  instagram: "",
  projectVideoUrlsText: "",
  productsWorkedOnText: "",
  workItems: [createEmptyWorkItem()],
};

function trim(value: string) {
  return value.trim();
}

function toOptional(value: string) {
  const trimmed = trim(value);
  return trimmed || undefined;
}

function toLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function fromLines(values: string[] | undefined) {
  if (!values?.length) return "";
  return values.join("\n");
}

function parseError(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function normalizeWorkItems(items: EditableWorkItem[]) {
  return items.map((item) => ({
    id: item.id,
    type: item.type,
    title: item.title.trim(),
    summary: item.summary.trim(),
    url: item.url.trim(),
    linkStatus: item.linkStatus,
  }));
}

function profileToForm(profile: {
  role?: Role;
  bio?: string;
  currentlyBuilding?: string;
  social?: {
    twitter?: string;
    github?: string;
    website?: string;
    instagram?: string;
  };
  projectVideoUrls: string[];
  productsWorkedOn: string[];
  workItems: Array<{
    id: string;
    type: WorkItemType;
    title: string;
    summary: string;
    url: string;
    linkStatus: LinkStatus;
  }>;
}): FormState {
  return {
    role: profile.role ?? "",
    bio: profile.bio ?? "",
    currentlyBuilding: profile.currentlyBuilding ?? "",
    twitter: profile.social?.twitter ?? "",
    github: profile.social?.github ?? "",
    website: profile.social?.website ?? "",
    instagram: profile.social?.instagram ?? "",
    projectVideoUrlsText: fromLines(profile.projectVideoUrls),
    productsWorkedOnText: fromLines(profile.productsWorkedOn),
    workItems:
      profile.workItems.length > 0
        ? profile.workItems.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            summary: item.summary,
            url: item.url,
            linkStatus: item.linkStatus,
          }))
        : [createEmptyWorkItem()],
  };
}

function draftPayload(form: FormState) {
  const social = {
    twitter: toOptional(form.twitter),
    github: toOptional(form.github),
    website: toOptional(form.website),
    instagram: toOptional(form.instagram),
  };

  const hasSocial = Object.values(social).some(Boolean);

  return {
    role: (form.role || undefined) as Role | undefined,
    bio: toOptional(form.bio),
    currentlyBuilding: toOptional(form.currentlyBuilding),
    social: hasSocial ? social : undefined,
    projectVideoUrls: toLines(form.projectVideoUrlsText),
    productsWorkedOn: toLines(form.productsWorkedOnText),
    workItems: normalizeWorkItems(form.workItems),
  };
}

function completionPayload(form: FormState) {
  return {
    role: form.role as Role,
    bio: toOptional(form.bio),
    currentlyBuilding: trim(form.currentlyBuilding),
    social: {
      twitter: trim(form.twitter),
      github: trim(form.github),
      website: toOptional(form.website),
      instagram: toOptional(form.instagram),
    },
    projectVideoUrls: toLines(form.projectVideoUrlsText),
    productsWorkedOn: toLines(form.productsWorkedOnText),
    workItems: normalizeWorkItems(form.workItems),
  };
}

export function OnboardingForm({ mode }: OnboardingFormProps) {
  const router = useRouter();
  const profile = useQuery(api.users.me);

  const ensureMe = useMutation(api.users.ensureMe);
  const upsertProfileDraft = useMutation(api.users.upsertProfileDraft);
  const completeOnboarding = useMutation(api.users.completeOnboarding);
  const addProfilePhoto = useMutation(api.users.addProfilePhoto);
  const removeProfilePhoto = useMutation(api.users.removeProfilePhoto);
  const recheckLinks = useAction(api.users.recheckLinks);

  const [form, setForm] = useState<FormState>(initialFormState);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRechecking, setIsRechecking] = useState(false);

  const hydratedUserRef = useRef<string | null>(null);
  const lastDraftRef = useRef<string>("");

  useEffect(() => {
    if (profile === undefined) return;

    if (profile === null) {
      void ensureMe().catch(() => {
        setSaveState("error");
        setFeedback("Unable to initialize your profile.");
      });
      return;
    }

    if (hydratedUserRef.current === profile._id) {
      return;
    }

    const nextForm = profileToForm(profile);
    setForm(nextForm);
    hydratedUserRef.current = profile._id;
    lastDraftRef.current = JSON.stringify(draftPayload(nextForm));
    setFeedback(null);
  }, [ensureMe, profile]);

  useEffect(() => {
    if (!profile || hydratedUserRef.current !== profile._id) {
      return;
    }

    const payload = draftPayload(form);
    const serialized = JSON.stringify(payload);

    if (serialized === lastDraftRef.current) {
      return;
    }

    setSaveState("saving");

    const timer = setTimeout(() => {
      void upsertProfileDraft(payload)
        .then(() => {
          lastDraftRef.current = serialized;
          setSaveState("saved");
          setFeedback(null);
        })
        .catch((error) => {
          setSaveState("error");
          setFeedback(parseError(error));
        });
    }, 700);

    return () => clearTimeout(timer);
  }, [form, profile, upsertProfileDraft]);

  const photos: ProfilePhoto[] = profile?.photos ?? [];

  const progress = useMemo(() => {
    const checks = [
      Boolean(form.role),
      Boolean(trim(form.currentlyBuilding)),
      Boolean(trim(form.twitter)),
      Boolean(trim(form.github)),
      photos.length > 0,
      form.workItems.some((item) => Boolean(trim(item.title)) && Boolean(trim(item.url))),
    ];

    const completed = checks.filter(Boolean).length;
    return {
      completed,
      total: checks.length,
    };
  }, [form, photos.length]);

  const saveLabel =
    saveState === "saving"
      ? "Saving draft..."
      : saveState === "saved"
        ? "Draft saved"
        : saveState === "error"
          ? "Save failed"
          : "";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await completeOnboarding(completionPayload(form));
      setSaveState("saved");

      if (mode === "onboarding") {
        router.push("/swipe");
      } else {
        setFeedback("Profile updated.");
      }
    } catch (error) {
      setSaveState("error");
      setFeedback(parseError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecheckLinks = async () => {
    setIsRechecking(true);
    setFeedback(null);

    try {
      const result = await recheckLinks({});
      setFeedback(
        `Checked ${result.checked} links: ${result.live} live, ${result.dead} dead, ${result.unchecked} unchecked.`,
      );
    } catch (error) {
      setFeedback(parseError(error));
    } finally {
      setIsRechecking(false);
    }
  };

  const busy = profile === undefined || profile === null;

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="relative overflow-hidden rounded-3xl border-border/70 bg-card/90 p-0 shadow-[0_24px_80px_rgba(20,19,18,0.14)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full bg-[radial-gradient(circle_at_top,rgba(240,101,47,0.25),transparent_68%)] blur-2xl"
        />

        <form onSubmit={handleSubmit} className="relative space-y-8 p-6 sm:p-8">
          <div className="space-y-4 border-b border-border/70 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  {mode === "onboarding" ? "Onboarding" : "Settings"}
                </p>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                  {mode === "onboarding"
                    ? "Build your founder profile"
                    : "Update your founder profile"}
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  Keep this practical: show what you are building now and what you have shipped before.
                </p>
              </div>

              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                {progress.completed}/{progress.total} required
              </Badge>
            </div>

            {saveLabel ? (
              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                {saveState === "saving" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : saveState === "saved" ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                ) : null}
                {saveLabel}
              </p>
            ) : null}

            {feedback ? <p className="text-xs text-destructive">{feedback}</p> : null}
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Core profile</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Role *
                </label>
                <Select
                  value={form.role}
                  onValueChange={(value) =>
                    setForm((previous) => ({
                      ...previous,
                      role: value as Role,
                    }))
                  }
                >
                  <SelectTrigger className="w-full bg-background/80">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Currently building *
                </label>
                <Input
                  value={form.currentlyBuilding}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      currentlyBuilding: event.target.value,
                    }))
                  }
                  placeholder="Open-source debugging toolkit for early-stage teams"
                  className="bg-background/80"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Bio
                </label>
                <Textarea
                  value={form.bio}
                  onChange={(event) =>
                    setForm((previous) => ({ ...previous, bio: event.target.value }))
                  }
                  placeholder="Builder focused on fast shipping, direct feedback loops, and clear communication."
                  className="min-h-24 bg-background/80"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Social links</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Twitter *
                </label>
                <Input
                  value={form.twitter}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      twitter: event.target.value,
                    }))
                  }
                  placeholder="https://x.com/yourhandle or @yourhandle"
                  className="bg-background/80"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  GitHub *
                </label>
                <Input
                  value={form.github}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      github: event.target.value,
                    }))
                  }
                  placeholder="https://github.com/yourname or username"
                  className="bg-background/80"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Personal website
                </label>
                <Input
                  value={form.website}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      website: event.target.value,
                    }))
                  }
                  placeholder="https://yourdomain.com"
                  className="bg-background/80"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Instagram (optional)
                </label>
                <Input
                  value={form.instagram}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      instagram: event.target.value,
                    }))
                  }
                  placeholder="https://instagram.com/yourprofile"
                  className="bg-background/80"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Media</h2>
            <div className="space-y-4 rounded-2xl border border-border/70 bg-muted/10 p-4">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Profile photos *
              </label>
              <PhotoUploader
                photos={photos}
                onAddPhoto={async (photo) => {
                  await addProfilePhoto(photo);
                }}
                onRemovePhoto={async (key) => {
                  await removeProfilePhoto({ key });
                }}
                disabled={busy || isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Project video links
              </label>
              <Textarea
                value={form.projectVideoUrlsText}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    projectVideoUrlsText: event.target.value,
                  }))
                }
                placeholder="One link per line (YouTube, Loom, or demo video URLs)"
                className="min-h-24 bg-background/80"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-semibold">Work history</h2>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Products worked on
              </label>
              <Textarea
                value={form.productsWorkedOnText}
                onChange={(event) =>
                  setForm((previous) => ({
                    ...previous,
                    productsWorkedOnText: event.target.value,
                  }))
                }
                placeholder="One product per line (hardware, software, content, design, etc.)"
                className="min-h-24 bg-background/80"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Portfolio work items *
              </label>
              <WorkItemEditor
                items={form.workItems}
                onChange={(nextItems) =>
                  setForm((previous) => ({
                    ...previous,
                    workItems: nextItems,
                  }))
                }
              />
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-3 border-t border-border/70 pt-6">
            <Button type="submit" size="lg" disabled={busy || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : mode === "onboarding" ? (
                "Complete onboarding"
              ) : (
                "Save profile"
              )}
            </Button>

            {mode === "settings" ? (
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  void handleRecheckLinks();
                }}
                disabled={busy || isRechecking}
              >
                {isRechecking ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking links...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Recheck links
                  </>
                )}
              </Button>
            ) : null}
          </div>
        </form>
      </Card>
    </div>
  );
}
