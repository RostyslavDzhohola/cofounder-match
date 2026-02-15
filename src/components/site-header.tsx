import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          CoFounder Match
        </Link>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Swipe
        </span>
      </div>
    </header>
  );
}
