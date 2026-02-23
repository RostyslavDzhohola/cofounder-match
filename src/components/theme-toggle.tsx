"use client";

import { Moon, Sun } from "lucide-react";

const THEME_KEY = "cofounder-theme";

export function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const nextTheme = !root.classList.contains("dark");
    root.classList.toggle("dark", nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="group inline-flex h-9 w-20 items-center rounded-full border border-border/70 bg-card/90 px-1 shadow-[0_8px_20px_rgba(20,19,18,0.08)] transition"
    >
      <span className="flex h-7 w-7 translate-x-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition duration-300 dark:translate-x-10">
        <Sun className="h-3.5 w-3.5 dark:hidden" />
        <Moon className="hidden h-3.5 w-3.5 dark:block" />
      </span>
      <span className="sr-only">Switch light or dark mode</span>
    </button>
  );
}
