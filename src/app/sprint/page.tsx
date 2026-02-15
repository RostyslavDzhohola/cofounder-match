"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { sprintTasks } from "@/data/sprint";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const mockMessages = [
  {
    author: "You",
    message: "Day 1 goal: align on vision + pick ICP.",
  },
  {
    author: "Match",
    message: "Sounds good. I can draft the landing copy tonight.",
  },
  {
    author: "You",
    message: "I'll build the swipe flow and push a demo by tomorrow.",
  },
];

export default function SprintPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(() => {
    return sprintTasks.filter((task) => completed[task.id]).length;
  }, [completed]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">7-Day Project Sprint</h1>
          <p className="text-muted-foreground">
            Turn a match into momentum. Complete the checklist, then decide if
            you want to cofound.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/swipe">Back to swipe</Link>
        </Button>
      </div>

      <Card className="space-y-4 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Sprint checklist</h2>
          <p className="text-sm text-muted-foreground">
            {completedCount} / {sprintTasks.length} complete
          </p>
        </div>
        <div className="space-y-4">
          {sprintTasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-3 rounded-xl border border-border/70 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-muted-foreground">{task.detail}</p>
              </div>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={completed[task.id] ?? false}
                  onCheckedChange={(checked) =>
                    setCompleted((prev) => ({
                      ...prev,
                      [task.id]: Boolean(checked),
                    }))
                  }
                />
                Mark complete
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div>
          <h2 className="text-lg font-semibold">Sprint chat (mock)</h2>
          <p className="text-sm text-muted-foreground">
            Keep the sprint tight with quick async updates.
          </p>
        </div>
        <div className="space-y-3">
          {mockMessages.map((message, index) => (
            <div
              key={`${message.author}-${index}`}
              className="rounded-2xl border border-border/60 bg-muted/40 p-3 text-sm"
            >
              <p className="font-medium">{message.author}</p>
              <p className="text-muted-foreground">{message.message}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <Textarea
            placeholder="Write an update or share a sprint goal..."
            className="min-h-[90px]"
          />
          <div className="flex justify-end">
            <Button>Send update</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
