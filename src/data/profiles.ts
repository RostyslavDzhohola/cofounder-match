export type PortfolioLinks = {
  github?: string;
  instagram?: string;
  website?: string;
};

export type ProjectHighlight = {
  name: string;
  description: string;
};

export type Profile = {
  id: string;
  name: string;
  role: string;
  skills: string[];
  location: string;
  timezone: string;
  school: string;
  highlights: string[];
  wantsToBuild: string;
  portfolio: PortfolioLinks;
  projects: ProjectHighlight[];
};

export const profiles: Profile[] = [
  {
    id: "nina-patel",
    name: "Nina Patel",
    role: "Product Designer",
    skills: ["Design systems", "Figma", "UX research", "Brand"],
    location: "Austin, TX",
    timezone: "UTC-6 (CST)",
    school: "UT Austin — BFA Design",
    highlights: [
      "Led redesign that lifted activation +18%",
      "Ships tight prototypes in 48 hours",
      "Mentors early-stage founders",
    ],
    wantsToBuild:
      "A guided AI concierge for local services that feels human and trustworthy.",
    portfolio: {
      github: "https://github.com/ninap",
      instagram: "https://instagram.com/nina.designs",
      website: "https://ninapatel.design",
    },
    projects: [
      {
        name: "FlowPilot",
        description: "SaaS onboarding toolkit with modular flows + analytics.",
      },
      {
        name: "Haven Health",
        description: "Telehealth branding + patient portal UX.",
      },
    ],
  },
  {
    id: "marcus-lee",
    name: "Marcus Lee",
    role: "Full-Stack Builder",
    skills: ["Next.js", "TypeScript", "Supabase", "Stripe"],
    location: "Toronto, CA",
    timezone: "UTC-5 (EST)",
    school: "University of Waterloo — CS",
    highlights: [
      "Built 4 revenue-generating apps",
      "Loves fast MVP sprints",
      "Open-source maintainer",
    ],
    wantsToBuild:
      "A co-working dashboard for remote teams with daily accountability loops.",
    portfolio: {
      github: "https://github.com/marcuslee",
      instagram: "https://instagram.com/marcus.codes",
      website: "https://marcuslee.dev",
    },
    projects: [
      {
        name: "PulseBoard",
        description: "Remote team check-in app with async standups.",
      },
    ],
  },
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Growth + Content",
    skills: ["Go-to-market", "SEO", "Newsletter", "Community"],
    location: "London, UK",
    timezone: "UTC+0 (GMT)",
    school: "LSE — Marketing",
    highlights: [
      "Scaled newsletter to 120k",
      "Partnerships with 5 accelerators",
      "Runs community events",
    ],
    wantsToBuild:
      "A founder-friendly PR engine that turns milestones into distribution.",
    portfolio: {
      github: "https://github.com/sarahgrowth",
      instagram: "https://instagram.com/sarahgrowth",
      website: "https://sarahchen.fyi",
    },
    projects: [
      {
        name: "Launchroom",
        description: "Community playbooks for early-stage launches.",
      },
    ],
  },
  {
    id: "diego-ramirez",
    name: "Diego Ramirez",
    role: "AI Engineer",
    skills: ["Python", "LLMs", "Retrieval", "MLOps"],
    location: "Mexico City, MX",
    timezone: "UTC-6 (CST)",
    school: "UNAM — Computer Engineering",
    highlights: [
      "Built retrieval stack for fintech",
      "Optimizes inference cost",
      "Publishes on applied ML",
    ],
    wantsToBuild:
      "Vertical AI copilots for regulated industries with strong UX.",
    portfolio: {
      github: "https://github.com/diegorm",
      instagram: "https://instagram.com/diego.ai",
      website: "https://diegorm.ai",
    },
    projects: [
      {
        name: "QueryForge",
        description: "Semantic search engine for legal teams.",
      },
    ],
  },
  {
    id: "olivia-kim",
    name: "Olivia Kim",
    role: "Creative Technologist",
    skills: ["Frontend", "Motion", "WebGL", "Brand storytelling"],
    location: "Seoul, KR",
    timezone: "UTC+9 (KST)",
    school: "KAIST — Media Lab",
    highlights: [
      "Creates immersive product launches",
      "Blends code + storytelling",
      "Works fast with founders",
    ],
    wantsToBuild:
      "A live studio for product marketing assets generated in hours.",
    portfolio: {
      github: "https://github.com/oliviakim",
      instagram: "https://instagram.com/olivia.makes",
      website: "https://oliviakim.studio",
    },
    projects: [
      {
        name: "Signal Studio",
        description: "Interactive landing pages for hardware startups.",
      },
    ],
  },
];
