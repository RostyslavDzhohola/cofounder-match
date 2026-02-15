import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

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
  description: "Swipe to find a co-founder and ship a 7-day sprint together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${fraunces.variable} min-h-screen bg-background text-foreground font-sans antialiased`}
      >
        <SiteHeader />
        <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
