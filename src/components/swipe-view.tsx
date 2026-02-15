"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SwipeView() {
  const [index, setIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  const current = profiles[index];
  const nextProfile = profiles[index + 1];
  const progress = Math.min(index + 1, profiles.length);
  const progressPercent = (progress / profiles.length) * 100;

  const handleSwipe = (direction: "left" | "right") => {
    if (!current) return;
    if (direction === "right") {
      setMatchedProfile(current);
    }
    setIndex((prev) => Math.min(prev + 1, profiles.length));
  };

  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <Badge className="w-fit" variant="secondary">
            YC-style founder matching
          </Badge>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Swipe on shipped work. Match on momentum.
          </h1>
          <p className="text-muted-foreground">
            CoFounder Match is a project-first network. See real portfolios,
            swipe to align, and run a 7-day sprint before deciding to cofound.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>3 archetypes live.</span>
            <span>•</span>
            <span>Project galleries front and center.</span>
            <span>•</span>
            <span>No fluff, just proof.</span>
          </div>
        </div>

        {current ? (
          <div className="relative">
            {nextProfile && (
              <Card className="absolute inset-0 z-0 translate-x-3 translate-y-3 border-dashed p-6 opacity-40">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Up next</p>
                  <h3 className="text-lg font-semibold">{nextProfile.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {nextProfile.role}
                  </p>
                </div>
              </Card>
            )}

            <Card className="relative z-10 overflow-hidden border bg-card/90 p-0 shadow-[0_30px_80px_rgba(20,19,18,0.14)]">
              <div className="flex items-center justify-between px-6 pt-5 text-xs text-muted-foreground">
                <span>
                  Profile {progress} of {profiles.length}
                </span>
                <span>Swipe to explore</span>
              </div>
              <div className="px-6 pt-3">
                <div className="h-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="relative mt-4 h-60 sm:h-64">
                <Image
                  src={current.heroImage}
                  alt={`${current.name} hero`}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              <div className="relative space-y-5 px-6 pb-6">
                <div className="-mt-10 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex items-end gap-4">
                    <Avatar className="h-16 w-16 border-4 border-background">
                      <AvatarImage src={current.avatar} alt={current.name} />
                      <AvatarFallback>
                        {current.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-display text-2xl font-semibold">
                        {current.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {current.role}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{current.availability}</Badge>
                </div>

                <p className="text-sm text-muted-foreground">
                  {current.headline}
                </p>

                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="secondary">{current.location}</Badge>
                  <Badge variant="outline">{current.timezone}</Badge>
                  <Badge variant="outline">{current.school}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium">Past projects</p>
                  <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-2 scroll-smooth">
                    {current.projects.map((project) => (
                      <a
                        key={project.id}
                        className="group min-w-[220px] snap-start rounded-2xl border border-border/70 bg-background/80 p-3 transition hover:border-foreground/20"
                        href={project.link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-[1.02]"
                          />
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold">
                              {project.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {project.link.label}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {project.description}
                          </p>
                          {project.metrics && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {project.metrics.map((metric) => (
                                <span
                                  key={`${project.id}-${metric.label}`}
                                  className="rounded-full border border-border/70 px-2 py-0.5 text-[11px] text-muted-foreground"
                                >
                                  {metric.value} {metric.label}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">What I want to build</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {current.wantsToBuild}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  {current.links.map((link) => (
                    <a
                      key={link.url}
                      className="text-primary underline"
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSwipe("left")}
                  >
                    Pass
                  </Button>
                  <Button className="w-full" onClick={() => handleSwipe("right")}>
                    Match
                  </Button>
                </div>

                <Button asChild variant="ghost" className="w-full">
                  <Link href={`/profile/${current.id}`}>View full profile</Link>
                </Button>
              </div>
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
      </section>

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
                  <Link href={`/profile/${matchedProfile.id}`}>
                    Open profile
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Keep swiping</Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
