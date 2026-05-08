## Finishing Layer 1 — Public Website at PRD Spec

The PRD calls for 10 public-website screens plus 5 distraction-free paid-ad landing pages. We have 8 of the 10. This plan closes the gaps and tightens the homepage. No backend — every form continues to use toast confirmation.

---

### What gets built

#### 1. New public page — For Professionals (`/professionals`)
PRD Screen 05. Persona page for the referral partner programme.
- Hero: "Refer clients. Earn commissions." + CTA → `/auth?role=professional`
- "Who can join" icon grid: Estate Agents, Surveyors, Lawyers, QS, Civil Engineers, Land Surveyors, Architects, Agricultural Consultants, Artisans
- 4-step "How it works": Register → Get verified → Share your referral code → Earn commission
- Commission overview table (3 columns: Client Type, Trigger, Commission). Footnote: "Exact rates confirmed on approval."
- Benefits grid (4 cards): Dashboard, Marketing materials, Free training, Priority support
- 1 testimonial + final registration CTA
- 5-question FAQ accordion
- Add "For Professionals" link to Navbar + Footer

#### 2. Dedicated Events page (`/events`)
PRD Screen 07. Today events live only as a homepage module.
- Page header + filter tabs: All / Tenant / Landlord / Investor / Professional / Free / Paid
- 2-column event card grid (date, type badge, audience badge, speaker, price/Free, Register button)
- Reuses `EventRegistrationModal`
- Mock event dataset extracted from `UpcomingEvents` into `src/data/events.ts` so both surfaces share it

#### 3. Property detail page (`/properties/[id]`)
PRD Screen 06 detail.
- Image gallery carousel, type badge, title, location
- Key stats row (bedrooms, bathrooms, size, price)
- Description + features list + map embed placeholder
- Enquiry form (Name, Phone, Email, Message) → toast success
- Properties listing cards link here; mock properties dataset moved to `src/data/properties.ts`

#### 4. Blog post detail page (`/blog/:slug`)
PRD Screen 08 detail.
- Cover image, category, date, read time, title, author chip
- Markdown-rendered body (use existing `react-markdown`-equivalent or basic HTML)
- Share buttons (X, WhatsApp, Copy link)
- 2 related posts, persona CTA box at bottom
- Mock posts moved to `src/data/blog.ts`

#### 5. Paid-ad landing pages — Part 2B (Screens 11–15)
Five distraction-free pages, each with a custom minimal layout (no main navbar/footer):
- `/lp/save-for-rent` — Tenant savings ad
- `/lp/loan-for-rent` — Urgent rent loan ad
- `/lp/landlord-management` — Landlord acquisition
- `/lp/diaspora-investor` — Diaspora investor LinkedIn/Meta
- `/lp/partner` — Professional recruitment

Shared shell: `src/components/landing/LandingShell.tsx` (logo-only header, minimal footer with Privacy link). Shared form component with one CTA, WhatsApp secondary CTA below. On submit → toast + redirect to `/auth?role=…&product=…` per PRD.

#### 6. Homepage polish (PRD Screen 01 alignment)
The homepage is missing 3 PRD-specified sections; add them as low-key, credible modules (no inflated stats):
- **Featured Properties** — 3 cards pulled from `data/properties.ts`, link to `/properties`
- **Latest Insights** — 3 blog cards from `data/blog.ts`, link to `/blog`
- **Partner logos strip** — "In good company" subtle grey-on-white logo row (GTBank, Stanbic IBTC, MyCover.AI, Bujeti, Zed Crest) — text-only chip placeholders, no fake images
- Keep all existing sections (Hero, Why Renteaze, How It Works, Testimonials, Upcoming Events, Diaspora CTA, Solutions, Final CTA)
- Skip the "App Download Strip" — premature without a real app

#### 7. Navigation + small fixes
- Navbar: add "For Professionals" between For Investors and Events; add "Events" link
- Footer: same additions; ensure all 10 public routes are reachable from the footer
- 404 page: link back to home + suggest top destinations

---

### Files

**New:**
- `src/pages/ForProfessionals.tsx`
- `src/pages/Events.tsx`
- `src/pages/PropertyDetail.tsx`
- `src/pages/BlogPost.tsx`
- `src/pages/landing/SaveForRentLP.tsx`
- `src/pages/landing/LoanForRentLP.tsx`
- `src/pages/landing/LandlordManagementLP.tsx`
- `src/pages/landing/DiasporaInvestorLP.tsx`
- `src/pages/landing/PartnerLP.tsx`
- `src/components/landing/LandingShell.tsx`
- `src/components/landing/LandingForm.tsx`
- `src/data/events.ts`, `src/data/properties.ts`, `src/data/blog.ts`

**Modified:**
- `src/App.tsx` — add 10 new routes
- `src/components/Navbar.tsx` — add Professionals + Events links
- `src/components/Footer.tsx` — same
- `src/pages/Index.tsx` — add Featured Properties, Latest Insights, Partners strip
- `src/pages/Properties.tsx` — read from shared dataset, link cards to detail
- `src/pages/Blog.tsx` — read from shared dataset, link cards to post
- `src/components/UpcomingEvents.tsx` — read from shared dataset

**Memory updates after build:**
- Add a `mem://features/landing-pages` entry describing the LP shell + conventions
- Update `mem://index.md` Memories list

---

### Out of scope (later layers)
- Lovable Cloud / Supabase enablement
- Auth flow beyond the existing placeholder `/auth` page (Layer 2)
- 21-question profile survey (Layer 2)
- All four authenticated portals (Layers 3–6)
- Admin backend (Layer 7)
- Real Edge Functions (NIN/BVN/OTP/payment webhooks)

After this plan ships, Layer 1 will fully match the PRD's public-website spec and be ready for ad traffic the moment Cloud is enabled.
