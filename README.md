# CoFounder Match

Tinder-style co-founder matching where the "first date" is a 7-day project sprint. Swipe on real signals, match, and ship a micro-MVP together before deciding to cofound.

## MVP Features
- Home/onboarding with a clear swipe → match → sprint loop
- Swipe screen with profile cards (GitHub/portfolio/IG, school, projects)
- Match confirmation modal + dedicated match page
- 7-day sprint checklist with mock chat area
- Full profile detail page
- Local preferences (roles, timezone, interests)

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- shadcn/ui
- pnpm

## Screenshots (placeholders)
- `screenshots/home.png`
- `screenshots/swipe.png`
- `screenshots/match.png`
- `screenshots/sprint.png`
- `screenshots/profile.png`
- `screenshots/settings.png`

## Getting Started
```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Future (out of scope for MVP)
- Auth: **Clerk**
- Database + real-time matching: **Convex**
- Open-source sprint templates + matching rules

---
Built for rapid founder collaboration sprints.
