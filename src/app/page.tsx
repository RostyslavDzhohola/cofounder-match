import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    title: "Swipe",
    description: "Browse builders, designers, and growth operators.",
  },
  {
    title: "Match",
    description: "If it feels right, start a 7-day sprint together.",
  },
  {
    title: "Cofound",
    description: "Ship fast, prove chemistry, and decide to build long-term.",
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Badge className="w-fit" variant="secondary">
            Tinder for co-founders
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Swipe into a 7-day project sprint with your next co-founder.
          </h1>
          <p className="text-lg text-muted-foreground">
            CoFounder Match pairs makers who want to build. Swipe left or right
            on profiles with GitHub, portfolio, IG, school, and project history.
            When you match, your first "date" is a focused 7-day sprint.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/swipe">Start swiping</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/sprint">Preview a sprint</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            <span>Match in hours.</span>
            <span>•</span>
            <span>Ship in days.</span>
            <span>•</span>
            <span>Cofound with confidence.</span>
          </div>
        </div>
        <Card className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">Why founders love it</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>• Profiles highlight real work, not just ideas.</li>
            <li>• A sprint replaces awkward coffee chats.</li>
            <li>• Signals who follows through in 7 days.</li>
          </ul>
          <div className="rounded-xl border border-dashed border-border p-4 text-sm">
            <p className="font-medium">Core loop</p>
            <p className="text-muted-foreground">
              Swipe → Match → Project Sprint → Cofound
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => (
          <Card key={step.title} className="space-y-2 p-5">
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
