# CoFounder Match — MVP Plan

## MVP user stories
- As a visitor, I can understand the concept and start swiping.
- As a user, I can swipe left/right through cofounder profiles.
- As a user, I can see key signals (GitHub/portfolio/IG, school, projects).
- As a user, I can get a match confirmation and see the 7-day sprint proposal.
- As a user, I can view a full profile detail page.
- As a user, I can view a 7-day sprint checklist and mark tasks complete.
- As a user, I can use a mock chat area for sprint updates.
- As a user, I can set local preferences (roles, timezone, interests).

## Information architecture
- `/` — Home/Onboarding
- `/swipe` — Swipe feed + match modal
- `/match` — Match confirmation page
- `/sprint` — 7-day project sprint + checklist + mock chat
- `/profile/[id]` — Profile detail
- `/settings` — Preferences (local state)

## Component list
- SiteHeader (nav + CTA)
- ProfileCard (swipe view)
- MatchDialog (match confirmation)
- SprintChecklistItem (task row + toggle)
- ChatBubble (mock sprint chat)
- PreferenceToggle (role + interest chips)
- Data modules (profiles + sprint tasks)

## MVP TODO checklist
- [x] Initialize Next.js (TS + Tailwind + App Router) with pnpm
- [x] Install shadcn/ui + core components (button, card, dialog, checkbox, etc.)
- [x] Create mock data (profiles, sprint tasks)
- [x] Build Home/Onboarding page with CTA
- [x] Build Swipe page with card stack + left/right buttons
- [x] Add Match modal/page with 7-day sprint proposal
- [x] Build Project Sprint page with checklist + mock chat
- [x] Build Profile detail page
- [x] Build Settings/preferences page (local state)
- [x] Add basic site navigation
- [x] Add README with setup + screenshots placeholders
- [x] Create GitHub repo, commit ("Samanta:"), push to main

## Out of scope (future)
- Authentication (future: **Clerk**)
- Database (future: **Convex**)
- Real-time chat + matching (future: open source + Convex)
- Payments/subscriptions

## Self-check loop
Before finishing, verify every MVP TODO is either completed or explicitly marked future/out-of-scope.

- [x] Completed items checked above
- [x] Remaining items are in-progress or explicitly out-of-scope
