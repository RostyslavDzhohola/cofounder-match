"use client";

import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export const workItemTypes = [
  "software",
  "hardware",
  "design",
  "content",
  "marketing",
  "other",
] as const;

export type WorkItemType = (typeof workItemTypes)[number];

export type LinkStatus = "unchecked" | "live" | "dead";

export type EditableWorkItem = {
  id: string;
  type: WorkItemType;
  title: string;
  summary: string;
  url: string;
  linkStatus: LinkStatus;
};

const linkStatusStyles: Record<LinkStatus, string> = {
  unchecked: "border-border/70 bg-muted/40 text-muted-foreground",
  live: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
  dead: "border-red-500/40 bg-red-500/10 text-red-500",
};

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function createEmptyWorkItem(): EditableWorkItem {
  return {
    id: createId(),
    type: "software",
    title: "",
    summary: "",
    url: "",
    linkStatus: "unchecked",
  };
}

type WorkItemEditorProps = {
  items: EditableWorkItem[];
  onChange: (next: EditableWorkItem[]) => void;
};

export function WorkItemEditor({ items, onChange }: WorkItemEditorProps) {
  const updateItem = <K extends keyof EditableWorkItem>(
    id: string,
    key: K,
    value: EditableWorkItem[K],
  ) => {
    const next = items.map((item) =>
      item.id === id ? { ...item, [key]: value } : item,
    );
    onChange(next);
  };

  const addItem = () => {
    onChange([...items, createEmptyWorkItem()]);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-[0_6px_20px_rgba(20,19,18,0.08)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-medium">Work item {index + 1}</p>
            <div className="flex items-center gap-2">
              <Badge className={linkStatusStyles[item.linkStatus]}>
                {item.linkStatus}
              </Badge>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove work item ${index + 1}`}
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[220px_1fr]">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Type
              </label>
              <Select
                value={item.type}
                onValueChange={(value) =>
                  updateItem(item.id, "type", value as WorkItemType)
                }
              >
                <SelectTrigger className="w-full bg-background/80">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {workItemTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Project title
              </label>
              <Input
                value={item.title}
                onChange={(event) =>
                  updateItem(item.id, "title", event.target.value)
                }
                placeholder="Realtime dashboard for EV charging stations"
                className="bg-background/80"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Project link
              </label>
              <Input
                value={item.url}
                onChange={(event) => updateItem(item.id, "url", event.target.value)}
                placeholder="https://github.com/you/project"
                className="bg-background/80"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                What you built
              </label>
              <Textarea
                value={item.summary}
                onChange={(event) =>
                  updateItem(item.id, "summary", event.target.value)
                }
                placeholder="What you built, shipped, or learned from this project."
                className="min-h-20 bg-background/80"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full rounded-xl border-dashed"
      >
        <Plus className="h-4 w-4" />
        Add work item
      </Button>
    </div>
  );
}
