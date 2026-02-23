import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { OnboardingGate } from "@/components/onboarding-gate";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoFounder Match",
  description:
    "Find builders you actually enjoy working with by collaborating on real projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function () {
                  try {
                    var key = "cofounder-theme";
                    var stored = localStorage.getItem(key);
                    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    var dark = stored ? stored === "dark" : prefersDark;
                    document.documentElement.classList.toggle("dark", dark);
                  } catch (e) {}
                })();
              `,
            }}
          />
        </head>
        <body
          className={`${sora.variable} ${fraunces.variable} min-h-screen bg-background text-foreground font-sans antialiased`}
        >
          <ConvexClientProvider>
            <OnboardingGate />
            <SiteHeader />
            <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6">
              {children}
            </main>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
