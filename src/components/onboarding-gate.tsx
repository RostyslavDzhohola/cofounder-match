"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function OnboardingGate() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();
  const ensureMe = useMutation(api.users.ensureMe);
  const me = useQuery(api.users.me, isSignedIn ? {} : "skip");
  const ensuring = useRef(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (me !== null) return;
    if (ensuring.current) return;

    ensuring.current = true;
    void ensureMe().finally(() => {
      ensuring.current = false;
    });
  }, [ensureMe, isLoaded, isSignedIn, me]);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (me === undefined || me === null) return;

    const onOnboardingPage = pathname.startsWith("/onboarding");

    if (me.onboardingCompleted && onOnboardingPage) {
      router.replace("/swipe");
      return;
    }

    if (!me.onboardingCompleted && !onOnboardingPage) {
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, me, pathname, router]);

  return null;
}
