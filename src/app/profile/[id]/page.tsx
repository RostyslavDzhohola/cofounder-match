import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profiles } from "@/data/profiles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PageProps = {
  params: { id: string };
};

export default function ProfileDetailPage({ params }: PageProps) {
  const profile = profiles.find((item) => item.id === params.id);

  if (!profile) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">Full profile</Badge>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {profile.role}
          </span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back to swipe</Link>
        </Button>
      </div>

      <Card className="overflow-hidden border p-0">
        <div className="relative h-72 sm:h-80">
          <Image
            src={profile.heroImage}
            alt={`${profile.name} hero`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="relative space-y-6 px-6 pb-6">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="font-display text-3xl font-semibold">{profile.name}</h1>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>
            <Badge variant="outline">{profile.availability}</Badge>
          </div>

          <p className="text-sm text-muted-foreground">{profile.headline}</p>

          <div className="flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary">{profile.location}</Badge>
            <Badge variant="outline">{profile.timezone}</Badge>
            <Badge variant="outline">{profile.school}</Badge>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div>
                <h2 className="font-display text-lg font-semibold">What I want to build</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {profile.wantsToBuild}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Highlights</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {profile.highlights.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Primary links</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                {profile.links.map((link) => (
                  <a
                    key={link.url}
                    className="flex items-center justify-between rounded-xl border border-border/70 px-3 py-2 text-primary transition hover:border-foreground/20"
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-muted-foreground">
                      View →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Past projects</h2>
          <Badge variant="outline">{profile.projects.length} projects</Badge>
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-2">
          {profile.projects.map((project) => (
            <a
              key={project.id}
              className="group min-w-[260px] snap-start rounded-2xl border border-border/70 bg-background/70 p-4 transition hover:border-foreground/20"
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
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{project.name}</h3>
                  <span className="text-xs text-muted-foreground">
                    {project.link.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                {project.metrics && (
                  <div className="flex flex-wrap gap-2">
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
      </Card>

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Start a sprint</h2>
          <p className="text-sm text-muted-foreground">
            Controls live here. Invite this founder into a 7-day build to test
            chemistry before cofounding.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button>Invite to sprint</Button>
          <Button variant="outline">Request intro</Button>
        </div>
      </Card>
    </div>
  );
}
