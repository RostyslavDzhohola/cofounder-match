import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/swipe", label: "Swipe" },
  { href: "/sprint", label: "Sprint" },
  { href: "/settings", label: "Settings" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold">
          CoFounder Match
        </Link>
        <nav className="hidden items-center gap-4 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm">
          <Link href="/swipe">Start swiping</Link>
        </Button>
      </div>
    </header>
  );
}
