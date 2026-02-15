export type SprintTask = {
  id: string;
  title: string;
  detail: string;
};

export const sprintTasks: SprintTask[] = [
  {
    id: "sync-vision",
    title: "Sync on vision + ICP",
    detail: "15-minute alignment on problem, target users, and success metric.",
  },
  {
    id: "prototype",
    title: "Prototype core flow",
    detail: "Design the swipe -> match -> sprint loop in Figma or code.",
  },
  {
    id: "landing",
    title: "Ship a landing page",
    detail: "Explain the concept and collect waitlist signups.",
  },
  {
    id: "user-interviews",
    title: "Run 5 user interviews",
    detail: "Validate motivation to match and build together.",
  },
  {
    id: "mvp",
    title: "Build MVP interactions",
    detail: "Implement swipe cards + match dialog + sprint checklist.",
  },
  {
    id: "demo-day",
    title: "Demo day recap",
    detail: "Review results and decide whether to continue as cofounders.",
  },
];
