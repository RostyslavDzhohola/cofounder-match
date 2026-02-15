import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MatchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">It’s a match!</h1>
        <p className="text-muted-foreground">
          Your first "date" is a 7-day project sprint. Build together before
          you commit to cofounding.
        </p>
      </div>

      <Card className="space-y-3 p-6">
        <h2 className="text-lg font-semibold">Sprint proposal</h2>
        <p className="text-sm text-muted-foreground">
          Align on the problem, ship an MVP, and run 5 interviews. If both of you
          feel momentum by day 7, continue as co-founders.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="w-full">
            <Link href="/sprint">Start 7-day sprint</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/swipe">Keep swiping</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
