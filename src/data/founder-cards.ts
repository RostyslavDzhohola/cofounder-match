export type FounderAccomplishment = {
  title: string;
  metric: string;
  detail: string;
};

export type FounderProject = {
  name: string;
  stage: string;
  detail: string;
};

export type FounderCard = {
  id: string;
  name: string;
  role: string;
  location: string;
  headline: string;
  oneWeekBuild: string;
  strengths: string[];
  companies: string[];
  accomplishments: FounderAccomplishment[];
  currentProjects: FounderProject[];
  standoutWins: string[];
  image: string;
};

export const founderCards: FounderCard[] = [
  {
    id: "maya-rivera",
    name: "Maya Rivera",
    role: "Design-led founder + GTM operator",
    location: "San Francisco, CA",
    headline:
      "Turns trust-heavy products into polished experiences users actually love.",
    oneWeekBuild:
      "Let's build an onboarding teardown tool that records 5 user sessions and outputs the top conversion blockers in seven days.",
    strengths: ["Taste", "Rapid prototyping", "Brand strategy"],
    companies: ["Former Product Design Lead at Orbit Homes", "Ex-Brand Studio at Aster Labs"],
    accomplishments: [
      {
        title: "Activation funnel rebuild",
        metric: "+27% week-1 activation",
        detail: "Redesigned onboarding and reduced time-to-value from 16 to 6 minutes.",
      },
      {
        title: "Viral launch breakdown thread",
        metric: "134k views in 72 hours",
        detail: "Published teardown posts that converted into 2,300 waitlist signups.",
      },
      {
        title: "Sprint shipping record",
        metric: "9 prototypes in 14 days",
        detail: "Delivered two user-tested iterations per week with engineering partners.",
      },
    ],
    currentProjects: [
      {
        name: "Signal Sprintbook",
        stage: "Private beta",
        detail: "A prompt-driven playbook for founder messaging tests during week-one launches.",
      },
      {
        name: "Checkout Pulse UI",
        stage: "In progress",
        detail: "Building a conversion-first design kit for high-intent checkout flows.",
      },
    ],
    standoutWins: [
      "Hosted a 48-hour build sprint with 40 makers and shipped 11 live demos.",
      "Mentored two first-time founders from idea to their first paying customer.",
    ],
    image: "/images/mock-founders/maya-rivera-real2.png",
  },
  {
    id: "leo-kim",
    name: "Leo Kim",
    role: "Payments engineer + infra builder",
    location: "New York, NY",
    headline:
      "Loves hard technical problems, API-first products, and ruthless simplicity.",
    oneWeekBuild:
      "Let's build a tiny API latency monitor with alerts and a public status page, then test it with three developer teams this week.",
    strengths: ["Backend architecture", "Developer products", "Execution speed"],
    companies: ["Former Senior Engineer at Meadow API", "Ex-Infrastructure at Kappa Finance"],
    accomplishments: [
      {
        title: "Payments API optimization",
        metric: "42% lower p95 latency",
        detail: "Reworked queue + idempotency layers to stabilize checkout retries globally.",
      },
      {
        title: "Open-source toolkit",
        metric: "6.2k GitHub stars",
        detail: "Built a developer-first auth SDK adopted by early-stage fintech teams.",
      },
      {
        title: "Founder hack demo",
        metric: "Top 3 of 180 teams",
        detail: "Shipped a transaction intelligence prototype in one weekend.",
      },
    ],
    currentProjects: [
      {
        name: "FlowLedger",
        stage: "Design partner phase",
        detail: "Lightweight reconciliation infrastructure for AI-native finance products.",
      },
      {
        name: "SchemaPilot",
        stage: "Prototype",
        detail: "Agent-assisted migration planner for fast-moving backend teams.",
      },
    ],
    standoutWins: [
      "Built a student cube-sat telemetry dashboard that ran on orbit simulation hardware.",
      "Went from zero to first B2B customer in 12 days on a side-project launch.",
    ],
    image: "/images/mock-founders/leo-kim-real2.png",
  },
  {
    id: "nina-okafor",
    name: "Nina Okafor",
    role: "Marketplace founder + growth lead",
    location: "Los Angeles, CA",
    headline:
      "Strong at operational systems, local market loops, and repeatable growth.",
    oneWeekBuild:
      "Let's build a local launch command center for one city and run 10 real customer calls in seven days.",
    strengths: ["Ops systems", "Growth experiments", "User research"],
    companies: ["Former Growth PM at ParcelLoop", "Ex-Market Ops at Northline Commerce"],
    accomplishments: [
      {
        title: "City expansion playbook",
        metric: "8 launches in 10 weeks",
        detail: "Built a repeatable local-market rollout framework with profitability guardrails.",
      },
      {
        title: "Creator partnership campaign",
        metric: "210k impressions",
        detail: "Co-produced local founder stories that doubled weekly inbound demos.",
      },
      {
        title: "Retention turnaround",
        metric: "+19% month-2 retention",
        detail: "Introduced habit loops and incentives for repeat order behavior.",
      },
    ],
    currentProjects: [
      {
        name: "LocalLoop Radar",
        stage: "Pilot",
        detail: "Geographic demand-mapping tool for neighborhood marketplace launches.",
      },
      {
        name: "Ops Copilot",
        stage: "Early build",
        detail: "Realtime incident assistant for marketplace dispatch and supply balancing.",
      },
    ],
    standoutWins: [
      "Turned a weekend experiment into a viral market map shared by 100k+ operators.",
      "Ran 63 in-person customer interviews in one month across three cities.",
    ],
    image: "/images/mock-founders/nina-okafor-real2.png",
  },
  {
    id: "omar-haddad",
    name: "Omar Haddad",
    role: "Fintech PM + product engineer",
    location: "Chicago, IL",
    headline:
      "Builds regulated products with clear UX and strong trust signals from day one.",
    oneWeekBuild:
      "Let's build a trust-first checkout prototype with fraud signals and ship a demo that handles real test transactions by day seven.",
    strengths: ["Product strategy", "Compliance basics", "Calm execution"],
    companies: ["Former Product Lead at Atlas Pay", "Ex-Trust & Safety at RailBank"],
    accomplishments: [
      {
        title: "Risk ops automation",
        metric: "68% fewer manual reviews",
        detail: "Paired policy rules with ML scoring to lower false positives.",
      },
      {
        title: "Regulated launch",
        metric: "3 markets in 1 quarter",
        detail: "Coordinated legal, engineering, and product to launch under strict timelines.",
      },
      {
        title: "Public explainer series",
        metric: "94k total reads",
        detail: "Wrote transparent posts on fintech trust that improved conversion confidence.",
      },
    ],
    currentProjects: [
      {
        name: "Vault Path",
        stage: "Beta",
        detail: "Security-first treasury workflow for small SaaS teams with clear audit trails.",
      },
      {
        name: "Onchain Receipt",
        stage: "Concept validation",
        detail: "Proof-backed settlement receipts for cross-border service transactions.",
      },
    ],
    standoutWins: [
      "Built a full fraud-response runbook in 36 hours during a holiday incident.",
      "Won a fintech demo day with a trust UX concept judged by banking operators.",
    ],
    image: "/images/mock-founders/omar-haddad-real2.png",
  },
  {
    id: "zoe-park",
    name: "Zoe Park",
    role: "Supply chain + marketplace founder",
    location: "Seattle, WA",
    headline:
      "Connects messy real-world operations to a clean customer experience.",
    oneWeekBuild:
      "Let's build a route-delay predictor for small delivery teams and validate it with one live ops partner this week.",
    strengths: ["Operations", "Marketplace dynamics", "Experiment velocity"],
    companies: ["Former Marketplace PM at DropCart", "Ex-Supply Strategy at FreshMesh"],
    accomplishments: [
      {
        title: "Delivery reliability sprint",
        metric: "From 82% to 97% on-time",
        detail: "Introduced dynamic route swaps and clearer courier handoff logic.",
      },
      {
        title: "Community referral engine",
        metric: "31k organic installs",
        detail: "Built neighborhood ambassador loops with local creator collaborations.",
      },
      {
        title: "Launch week challenge",
        metric: "17 features shipped",
        detail: "Coordinated engineering + ops to deliver high-impact weekly releases.",
      },
    ],
    currentProjects: [
      {
        name: "Dockboard Zero",
        stage: "MVP",
        detail: "Route planning dashboard for small fulfillment teams with live delay prediction.",
      },
      {
        name: "Grocer Graph",
        stage: "Research",
        detail: "Supply signal engine predicting local inventory shortages before peak demand.",
      },
    ],
    standoutWins: [
      "Helped a food startup hit profitability in one district before full expansion.",
      "Built a disaster-response restock coordination map used by 20+ local stores.",
    ],
    image: "/images/mock-founders/zoe-park-real2.png",
  },
  {
    id: "ryan-shah",
    name: "Ryan Shah",
    role: "Community product founder",
    location: "Austin, TX",
    headline:
      "Builds products that create daily habits and strong user communities.",
    oneWeekBuild:
      "Let's build a weekly community momentum board and hit 100 active members in a focused open-source sprint.",
    strengths: ["Community mechanics", "MVP shipping", "Product intuition"],
    companies: ["Former Community PM at Threadspace", "Ex-Growth Builder at Northforum"],
    accomplishments: [
      {
        title: "Daily active streak system",
        metric: "+41% 30-day retention",
        detail: "Implemented lightweight rituals and social proof loops for creator communities.",
      },
      {
        title: "Launch mini-documentary",
        metric: "118k views",
        detail: "Produced a behind-the-scenes build story that drove sustained signups.",
      },
      {
        title: "Monetization experiment",
        metric: "First $10k MRR in 7 weeks",
        detail: "Tested premium circles + hosted sessions with power users.",
      },
    ],
    currentProjects: [
      {
        name: "Clubroom AI",
        stage: "Private alpha",
        detail: "Community assistant that surfaces high-signal threads and member introductions.",
      },
      {
        name: "Momentum Board",
        stage: "In development",
        detail: "Public shipping scoreboard that nudges founders to maintain weekly velocity.",
      },
    ],
    standoutWins: [
      "Built a niche founder forum to 12k members with near-zero paid acquisition.",
      "Ran a live product roast event that sold out in under 20 minutes.",
    ],
    image: "/images/mock-founders/ryan-shah-real2.png",
  },
];
