"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, RotateCcw, X } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type SwipeChoice = "pass" | "like";

type SwipeHistoryItem = {
  index: number;
  choice: SwipeChoice;
};

type ActionButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className: string;
  icon: ReactNode;
};

function ActionButton({
  label,
  onClick,
  disabled,
  className,
  icon,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-16 w-16 items-center justify-center rounded-full border-2 text-white shadow-[0_16px_32px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 ${className}`}
    >
      {icon}
    </button>
  );
}

const statusStyles: Record<"unchecked" | "live" | "dead", string> = {
  unchecked: "border-border/70 bg-muted/20 text-muted-foreground",
  live: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
  dead: "border-red-500/40 bg-red-500/10 text-red-500",
};

type DiscoverableProfile = {
  _id: string;
  name?: string;
  username?: string;
  role?: string;
  bio?: string;
  currentlyBuilding?: string;
  imageUrl?: string;
  photos: Array<{
    key: string;
    url: string;
    uploadedAt: number;
  }>;
  productsWorkedOn: string[];
  workItems: Array<{
    id: string;
    title: string;
    summary: string;
    url: string;
    linkStatus: "unchecked" | "live" | "dead";
  }>;
  projectVideoUrls: string[];
};

type SwipeDeckProps = {
  profiles: DiscoverableProfile[];
};

function SwipeDeck({ profiles }: SwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState<SwipeHistoryItem[]>([]);

  const total = profiles.length;
  const currentCard = profiles[index];
  const liked = history.filter((item) => item.choice === "like").length;
  const passed = history.filter((item) => item.choice === "pass").length;

  const swipe = (choice: SwipeChoice) => {
    if (!currentCard) return;
    setHistory((previous) => [...previous, { index, choice }]);
    setIndex((previous) => Math.min(previous + 1, total));
  };

  const rewind = () => {
    setHistory((previous) => {
      if (previous.length === 0) return previous;
      const next = [...previous];
      const last = next.pop();
      if (last) {
        setIndex(last.index);
      }
      return next;
    });
  };

  const reset = () => {
    setHistory([]);
    setIndex(0);
  };

  if (!currentCard) {
    return (
      <div className="mx-auto w-full max-w-md space-y-6">
        <Card className="rounded-4xl border-border/70 bg-card/85 p-8 text-center shadow-[0_24px_70px_rgba(20,19,18,0.16)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Session complete
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Deck finished.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {liked} like{liked === 1 ? "" : "s"}, {passed} pass
            {passed === 1 ? "" : "es"}.
          </p>
          <p className="mt-4 rounded-2xl border border-border/70 bg-muted/30 p-4 text-sm text-muted-foreground">
            Open the profiles you liked and start a focused build sprint together.
          </p>
          <Button onClick={reset} className="mt-5 w-full">
            Restart cards
          </Button>
        </Card>
      </div>
    );
  }

  const name =
    currentCard.name?.trim() || currentCard.username?.trim() || "Founder";
  const imageUrl =
    currentCard.photos[0]?.url ??
    currentCard.imageUrl ??
    "/images/mock-founders/maya-rivera-real2.png";

  return (
    <div className="relative mx-auto w-full max-w-md space-y-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -top-14 h-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2),transparent_70%)] blur-lg"
      />

      <Card className="group relative h-[720px] overflow-hidden rounded-4xl border-border/70 bg-card/85 p-0 shadow-[0_24px_80px_rgba(20,19,18,0.2)]">
        <div className="relative h-[430px]">
          <Image
            src={imageUrl}
            alt={`${name} portrait`}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 480px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute left-4 top-4">
            <Badge className="bg-black/45 text-white">
              {currentCard.role ?? "builder"}
            </Badge>
          </div>

          <div className="absolute bottom-0 w-full p-5 text-white">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  {name}
                </h2>
                <p className="text-sm text-white/90">
                  {currentCard.bio ?? "No bio yet."}
                </p>
              </div>
              <span className="rounded-full border border-white/40 px-3 py-1 text-xs">
                {index + 1} / {total}
              </span>
            </div>
          </div>
        </div>

        <div className="h-[290px] space-y-3 overflow-y-auto bg-card p-4">
          <div className="rounded-2xl border border-border/70 bg-muted/20 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Currently building
            </p>
            <p className="mt-1 text-sm">
              {currentCard.currentlyBuilding ?? "Not specified"}
            </p>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Products worked on
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentCard.productsWorkedOn.length > 0 ? (
                currentCard.productsWorkedOn.slice(0, 8).map((product) => (
                  <span
                    key={product}
                    className="rounded-full border border-border/70 px-2.5 py-1 text-xs"
                  >
                    {product}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  No products listed yet.
                </span>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/70 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Featured projects
            </p>
            <div className="mt-2 space-y-2">
              {currentCard.workItems.length > 0 ? (
                currentCard.workItems.slice(0, 4).map((item) => (
                  <a
                    key={item.id}
                    href={item.url || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl border border-border/70 bg-muted/10 p-2 transition hover:border-foreground/25"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium">{item.title || "Untitled project"}</p>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${statusStyles[item.linkStatus]}`}
                      >
                        {item.linkStatus}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {item.summary || "No summary yet."}
                    </p>
                  </a>
                ))
              ) : (
                <p className="text-xs text-muted-foreground">
                  No linked work items yet.
                </p>
              )}
            </div>
          </div>

          {currentCard.projectVideoUrls.length > 0 ? (
            <div className="rounded-2xl border border-border/70 bg-card/70 p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Video links
              </p>
              <div className="mt-2 space-y-1">
                {currentCard.projectVideoUrls.slice(0, 3).map((url) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate text-xs text-primary hover:underline"
                  >
                    {url}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </Card>

      <div className="flex items-center justify-center gap-4">
        <ActionButton
          label="Rewind"
          onClick={rewind}
          disabled={history.length === 0}
          className="border-amber-200 bg-amber-500 hover:bg-amber-400"
          icon={<RotateCcw className="h-6 w-6" />}
        />
        <ActionButton
          label="Pass"
          onClick={() => swipe("pass")}
          className="border-red-300 bg-red-600 hover:bg-red-500"
          icon={<X className="h-8 w-8" />}
        />
        <ActionButton
          label="Like"
          onClick={() => swipe("like")}
          className="border-emerald-300 bg-emerald-600 hover:bg-emerald-500"
          icon={<Heart className="h-7 w-7" />}
        />
      </div>
    </div>
  );
}

export default function SwipeView() {
  const profiles = useQuery(api.users.listDiscoverableProfiles);

  const deckKey = useMemo(
    () => (profiles ? profiles.map((profile) => profile._id).join("|") : ""),
    [profiles],
  );

  if (profiles === undefined) {
    return (
      <div className="mx-auto w-full max-w-md space-y-4">
        <Card className="h-[720px] animate-pulse rounded-4xl border-border/70 bg-card/70" />
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="mx-auto w-full max-w-xl space-y-4">
        <Card className="rounded-3xl border-border/70 bg-card/85 p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            No candidates yet
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            You are early.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Complete your profile and invite more builders to onboard. Once others complete onboarding,
            they appear here.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/settings">Open settings</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back home</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <SwipeDeck key={deckKey} profiles={profiles as DiscoverableProfile[]} />;
}
