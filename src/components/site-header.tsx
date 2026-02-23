import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          CoFounder Match
        </Link>
        <div className="flex items-center gap-3">
          <SignedIn>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/swipe">Swipe</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/settings">Settings</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Sign up</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
