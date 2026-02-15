"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roleOptions = ["Builder", "Designer", "Content/Growth"];
const interestOptions = [
  "AI tools",
  "Consumer apps",
  "B2B SaaS",
  "Marketplace",
  "Fintech",
  "Health",
  "Creator economy",
];
const timezoneOptions = [
  "UTC-8 (PST)",
  "UTC-7 (MST)",
  "UTC-6 (CST)",
  "UTC-5 (EST)",
  "UTC+0 (GMT)",
  "UTC+1 (CET)",
  "UTC+8 (SGT)",
  "UTC+9 (KST)",
];

export default function SettingsPage() {
  const [roles, setRoles] = useState<string[]>(["Builder"]);
  const [timezone, setTimezone] = useState<string>(timezoneOptions[2]);
  const [interests, setInterests] = useState<string[]>(["AI tools"]);

  const toggleValue = (
    value: string,
    state: string[],
    setState: (value: string[]) => void,
  ) => {
    setState(
      state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value],
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Preferences</h1>
        <p className="text-muted-foreground">
          Fine-tune who you want to match with. Stored locally for now.
        </p>
      </div>

      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">I am a...</h2>
          <p className="text-sm text-muted-foreground">
            Pick the roles you identify with.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {roleOptions.map((role) => (
            <Button
              key={role}
              type="button"
              variant={roles.includes(role) ? "default" : "outline"}
              onClick={() => toggleValue(role, roles, setRoles)}
            >
              {role}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Timezone</h2>
          <p className="text-sm text-muted-foreground">
            We prioritize matches with overlapping work hours.
          </p>
        </div>
        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            {timezoneOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Interests</h2>
          <p className="text-sm text-muted-foreground">
            Select the areas you want to explore.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => (
            <Badge
              key={interest}
              variant={interests.includes(interest) ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
              onClick={() => toggleValue(interest, interests, setInterests)}
            >
              {interest}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Ready to swipe?</h2>
          <p className="text-sm text-muted-foreground">
            Preferences are saved locally until we add accounts.
          </p>
        </div>
        <Button>Save preferences</Button>
      </Card>
    </div>
  );
}
