"use client";

import { useState } from "react";
import Link from "next/link";
import { profiles, type Profile } from "@/data/profiles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function SwipePage() {
  const [index, setIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  const current = profiles[index];
  const nextProfile = profiles[index + 1];

  const handleSwipe = (direction: "left" | "right") => {
    if (!current) return;
    if (direction === "right") {
      setMatchedProfile(current);
    }
    setIndex((prev) => Math.min(prev + 1, profiles.length));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Swipe co-founder profiles</h1>
        <p className="text-muted-foreground">
          Swipe left to pass. Swipe right to match and start a 7-day sprint.
        </p>
      </div>

      {current ? (
        <div className="relative mx-auto max-w-xl">
          {nextProfile && (
            <Card className="absolute inset-0 z-0 translate-x-3 translate-y-3 border-dashed p-6 opacity-60">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Up next</p>
                <h3 className="text-lg font-semibold">{nextProfile.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {nextProfile.role}
                </p>
              </div>
            </Card>
          )}
          <Card className="relative z-10 space-y-5 p-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback>
                  {current.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{current.name}</h2>
                <p className="text-sm text-muted-foreground">{current.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{current.location}</Badge>
              <Badge variant="outline">{current.timezone}</Badge>
              <Badge variant="outline">{current.school}</Badge>
            </div>

            <div>
              <p className="text-sm font-medium">Skills</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {current.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Highlights</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {current.highlights.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium">What I want to build</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {current.wantsToBuild}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              {current.portfolio.github && (
                <a
                  className="text-primary underline"
                  href={current.portfolio.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}
              {current.portfolio.website && (
                <a
                  className="text-primary underline"
                  href={current.portfolio.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </a>
              )}
              {current.portfolio.instagram && (
                <a
                  className="text-primary underline"
                  href={current.portfolio.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              )}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleSwipe("left")}
              >
                Pass
              </Button>
              <Button className="w-full" onClick={() => handleSwipe("right")}
              >
                Match
              </Button>
            </div>

            <Button asChild variant="ghost" className="w-full">
              <Link href={`/profile/${current.id}`}>View full profile</Link>
            </Button>
          </Card>
        </div>
      ) : (
        <Card className="mx-auto max-w-xl p-6 text-center">
          <h2 className="text-xl font-semibold">That’s everyone for now.</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Refresh later or revisit a profile to start a sprint.
          </p>
          <Button asChild className="mt-4">
            <Link href="/">Back home</Link>
          </Button>
        </Card>
      )}

      <Dialog
        open={!!matchedProfile}
        onOpenChange={(open) => {
          if (!open) setMatchedProfile(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>It’s a match!</DialogTitle>
          </DialogHeader>
          {matchedProfile && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                You and {matchedProfile.name} are aligned. Your first "date" is a
                focused 7-day project sprint.
              </p>
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-sm font-medium">Sprint proposal</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ship a live MVP, run 5 user interviews, and decide if you want
                  to cofound after day 7.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="w-full">
                  <Link href="/sprint">Start 7-day sprint</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/profile/${matchedProfile.id}`}>
                    View profile
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
