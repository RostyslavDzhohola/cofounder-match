import Link from "next/link";
import { notFound } from "next/navigation";
import { profiles } from "@/data/profiles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>
              {profile.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-semibold">{profile.name}</h1>
            <p className="text-muted-foreground">{profile.role}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{profile.location}</Badge>
          <Badge variant="outline">{profile.timezone}</Badge>
          <Badge variant="outline">{profile.school}</Badge>
        </div>
      </div>

      <Card className="space-y-4 p-6">
        <div>
          <h2 className="text-lg font-semibold">What I want to build</h2>
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
        <div>
          <h3 className="text-sm font-medium">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          {profile.portfolio.github && (
            <a
              className="text-primary underline"
              href={profile.portfolio.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {profile.portfolio.website && (
            <a
              className="text-primary underline"
              href={profile.portfolio.website}
              target="_blank"
              rel="noreferrer"
            >
              Portfolio
            </a>
          )}
          {profile.portfolio.instagram && (
            <a
              className="text-primary underline"
              href={profile.portfolio.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          )}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Button asChild size="sm" variant="outline">
            <Link href="/swipe">Back to swipe</Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.projects.map((project) => (
            <Card key={project.name} className="p-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {project.description}
              </p>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Ready for a sprint?</h2>
          <p className="text-sm text-muted-foreground">
            Start a 7-day build to test co-founder chemistry.
          </p>
        </div>
        <Button asChild>
          <Link href="/sprint">Start sprint</Link>
        </Button>
      </Card>
    </div>
  );
}
