export type ProfileLink = {
  label: string;
  url: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectHighlight = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: ProfileLink;
  metrics?: ProjectMetric[];
};

export type Profile = {
  id: string;
  name: string;
  role: string;
  headline: string;
  availability: string;
  location: string;
  timezone: string;
  school: string;
  highlights: string[];
  wantsToBuild: string;
  links: ProfileLink[];
  avatar: string;
  heroImage: string;
  projects: ProjectHighlight[];
};

export const profiles: Profile[] = [
  {
    id: "aria-lane",
    name: "Aria Lane",
    role: "Product Designer",
    headline: "Systems-first designer who turns fuzzy ideas into crisp flows.",
    availability: "Open to an open-source sprint",
    location: "San Francisco, CA",
    timezone: "UTC-8 (PST)",
    school: "RISD — Digital + Product",
    highlights: [
      "Led redesign that lifted activation +22%",
      "Builds design systems that survive real scale",
      "Pairs taste with rapid prototyping",
    ],
    wantsToBuild:
      "A founder-friendly design copilot for validating positioning in days, not weeks.",
    links: [
      {
        label: "Portfolio",
        url: "https://arialane.design",
      },
      {
        label: "Figma",
        url: "https://www.figma.com/community/file/1234567890",
      },
      {
        label: "Framer",
        url: "https://www.framer.com/projects/aria-lane",
      },
    ],
    avatar: "/images/avatars/aria-lane.svg",
    heroImage: "/images/heroes/aria-lane.svg",
    projects: [
      {
        id: "nimbus-design-system",
        name: "Nimbus Design System",
        description: "Component library with 40+ tokens for B2B SaaS teams.",
        image: "/images/projects/aria-nimbus.svg",
        link: {
          label: "Figma",
          url: "https://www.figma.com/community/file/1100110011",
        },
      },
      {
        id: "signal-onboarding",
        name: "Signal Onboarding",
        description: "Conversion-focused onboarding flow with crisp product copy.",
        image: "/images/projects/aria-signal.svg",
        link: {
          label: "Framer",
          url: "https://www.framer.com/projects/signal-onboarding",
        },
      },
      {
        id: "atlas-mobile",
        name: "Atlas Mobile",
        description: "Mobile-first UX concept for local discovery.",
        image: "/images/projects/aria-atlas.svg",
        link: {
          label: "Figma",
          url: "https://www.figma.com/community/file/2200220022",
        },
      },
      {
        id: "flowcase-portfolio",
        name: "Flowcase Portfolio",
        description: "Case study storytelling for product launches.",
        image: "/images/projects/aria-flowcase.svg",
        link: {
          label: "Portfolio",
          url: "https://arialane.design/flowcase",
        },
      },
    ],
  },
  {
    id: "noah-kim",
    name: "Noah Kim",
    role: "Builder / Developer",
    headline: "Full-stack builder who ships reliable MVPs in public.",
    availability: "Shipping daily until March",
    location: "New York, NY",
    timezone: "UTC-5 (EST)",
    school: "Columbia — Computer Science",
    highlights: [
      "Built 6 revenue-positive side projects",
      "Obsessed with clean infra + fast UX",
      "Maintains open-source tooling",
    ],
    wantsToBuild:
      "A lightweight operating system for creator-led SaaS teams.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/noahkim",
      },
      {
        label: "Website",
        url: "https://noahkim.dev",
      },
      {
        label: "Stack",
        url: "https://noahkim.dev/stack",
      },
    ],
    avatar: "/images/avatars/noah-kim.svg",
    heroImage: "/images/heroes/noah-kim.svg",
    projects: [
      {
        id: "shipboard",
        name: "Shipboard",
        description: "Founder dashboard for weekly shipping accountability.",
        image: "/images/projects/noah-shipboard.svg",
        link: {
          label: "GitHub",
          url: "https://github.com/noahkim/shipboard",
        },
      },
      {
        id: "pulseops",
        name: "PulseOps",
        description: "Ops tracker for sprint goals + live milestones.",
        image: "/images/projects/noah-pulseops.svg",
        link: {
          label: "GitHub",
          url: "https://github.com/noahkim/pulseops",
        },
      },
      {
        id: "relaypay",
        name: "RelayPay",
        description: "Stripe-powered payouts layer for marketplaces.",
        image: "/images/projects/noah-relaypay.svg",
        link: {
          label: "GitHub",
          url: "https://github.com/noahkim/relaypay",
        },
      },
      {
        id: "vectorlab",
        name: "VectorLab",
        description: "RAG playground with tunable retrieval pipelines.",
        image: "/images/projects/noah-vectorlab.svg",
        link: {
          label: "GitHub",
          url: "https://github.com/noahkim/vectorlab",
        },
      },
    ],
  },
  {
    id: "dani-park",
    name: "Dani Park",
    role: "Content Creator",
    headline: "Turns raw product ideas into stories people binge.",
    availability: "Two creator slots open",
    location: "Los Angeles, CA",
    timezone: "UTC-8 (PST)",
    school: "USC — Media Arts",
    highlights: [
      "Grew a tech channel from 0 → 180k",
      "Turns launches into story arcs",
      "Strong community + newsletter loop",
    ],
    wantsToBuild:
      "A creator-first studio for founders to test messaging weekly.",
    links: [
      {
        label: "YouTube",
        url: "https://youtube.com/@danipark",
      },
      {
        label: "TikTok",
        url: "https://tiktok.com/@dani.builds",
      },
      {
        label: "Instagram",
        url: "https://instagram.com/dani.park",
      },
    ],
    avatar: "/images/avatars/dani-park.svg",
    heroImage: "/images/heroes/dani-park.svg",
    projects: [
      {
        id: "founder-breakdowns",
        name: "Founder Breakdowns",
        description: "YouTube series dissecting startup launch tactics.",
        image: "/images/projects/dani-breakdowns.svg",
        link: {
          label: "YouTube",
          url: "https://youtube.com/watch?v=founderbreakdowns",
        },
        metrics: [
          { label: "views", value: "1.2M" },
          { label: "likes", value: "48k" },
        ],
      },
      {
        id: "build-clips",
        name: "Build-in-Public Clips",
        description: "Short-form sprint recaps for builders.",
        image: "/images/projects/dani-buildclips.svg",
        link: {
          label: "TikTok",
          url: "https://tiktok.com/@dani.builds/video/123",
        },
        metrics: [
          { label: "views", value: "820k" },
          { label: "likes", value: "66k" },
        ],
      },
      {
        id: "product-teardowns",
        name: "Product Teardowns",
        description: "IG carousel series on product storytelling.",
        image: "/images/projects/dani-teardown.svg",
        link: {
          label: "Instagram",
          url: "https://instagram.com/p/product-teardowns",
        },
        metrics: [
          { label: "saves", value: "21k" },
          { label: "likes", value: "31k" },
        ],
      },
      {
        id: "launch-week",
        name: "Launch Week Series",
        description: "Open-source creator sprint coverage + playbook.",
        image: "/images/projects/dani-launchweek.svg",
        link: {
          label: "YouTube",
          url: "https://youtube.com/watch?v=launchweek",
        },
        metrics: [
          { label: "views", value: "610k" },
          { label: "subs", value: "+18k" },
        ],
      },
    ],
  },
];
