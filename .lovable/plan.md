## PRD vs build audit

I read the full Lovable Build Guide v1.0 (66 screens, 8 parts) and cross-checked it against the codebase. Here is where things stand.

### Built and matching the PRD
- **Part 1 — Global setup**: brand tokens, Plus Jakarta Sans, public Navbar + Footer, Portal shell with role-coloured sidebar + topbar.
- **Part 2 — Public website (Screens 01–10)**: Index, ForTenants (with rent calculator), ForLandlords, ForInvestors, ForProfessionals, Properties + PropertyDetail, Blog + BlogPost, Events, About, Contact, FAQ.
- **Part 2B — Paid LPs (Screens 11–15)**: All five — SaveForRentLP, LoanForRentLP, LandlordManagementLP, DiasporaInvestorLP, PartnerLP — using LandingShell + LpTemplate + LandingForm.
- **Part 3 — Auth (Screens 16–23)**: SignUpRole, SignUpDetails, VerifyPhone, Survey (full 5-group, 21-question version with conditional logic, CRM tagging, geocoded address autocomplete), SignIn, ForgotPassword, ResetPassword, KycGate.
- **Parts 4–7 — Portals (Screens 24–55)**: All four portal shells (Tenant, Landlord, Investor, Professional) plus their sub-pages exist as routed PortalShell screens. Most sub-pages are scaffolded with PortalPlaceholder rather than fully built.
- **Part 8 — Admin (Screens 56–66)**: AdminDashboard, Users, Applications, Properties, Settings — all scaffolded.
- **DB schema**: profiles, user_roles, otp_verifications, notifications already created with the right RLS shape. Most other tables in the PRD (savings_plans, transactions, loan_applications, properties, events, blog_posts, etc.) are NOT yet created — sub-pages currently render placeholders, so they aren't blocking anything visible.

### Key gaps vs PRD
1. **Survey is unreachable from the natural signup path.** PRD: SignUpDetails → /signup/verify-phone → /signup/survey → dashboard. We have no working SMS provider, so the OTP step is a dead end and new users never reach Survey.
2. **Tenant portal "Properties" and "Events" sidebar links eject the user out of the portal.** They route to `/properties` and `/events`, which render the **public** Layout (public Navbar + Footer, no sidebar). The user sees this as being signed out of their account.
3. Dashboards are minimal placeholders (no SurveyIncompleteBanner wired into TenantDashboard yet, no KYC banner, no contextual "Next action" card).
4. Most portal sub-pages render `PortalPlaceholder` — no real product flows yet (Save for Rent enrolment, Loan application wizard, Documents vault, etc.).
5. No backend tables for products yet; no Edge Functions beyond `verify-nin` scaffold.

### Direct answers to your two questions

**Where is the survey?** It exists at `/signup/survey` (`src/pages/auth/Survey.tsx`) — full 5-group, 21-question version, gated behind `RequireAuth`. It's currently only reachable two ways: (a) the `SurveyIncompleteBanner` CTA on a portal dashboard, or (b) typing the URL. The natural post-signup chain (Details → Verify Phone → Survey) is broken because we have no SMS sender.

**Why do Properties / Events leave the portal?** The Tenant sidebar (`PortalShell.tsx`) links Properties → `/properties` and Events → `/events`. Those routes are public pages wrapped in the public `Layout` component, so when a logged-in tenant clicks them, the portal sidebar disappears and they see the public site. The PRD spec says "Properties → /properties (public listing)", but didn't account for the visual whiplash. We need to keep them inside the portal frame.

---

## Plan

This plan tackles the two surfaced issues + the natural next implementation step. No DB changes, no new backend.

### 1. Make Properties + Events feel "in-portal" for signed-in users

Convert `Layout.tsx` into a smart wrapper: if `useAuth().user` is signed in **and** the user has a `role`, render the page's children inside `PortalShell` for that role. Otherwise render the public Navbar + Footer as today.

Pages affected: **only `Properties.tsx`, `PropertyDetail.tsx`, `Events.tsx`**. Other public pages keep using the standalone `Layout` directly (homepage, persona pages, blog, etc.) so a logged-in user clicking the homepage logo still sees the public marketing site if they want to.

Implementation:
- Add `<PortalAwareLayout>` wrapper in `src/components/PortalAwareLayout.tsx` — uses `useAuth` to decide between `<PortalShell role={primaryRole}>{children}</PortalShell>` and plain public chrome.
- Swap `<Layout>` → `<PortalAwareLayout>` in `Properties.tsx`, `PropertyDetail.tsx`, `Events.tsx` only.

This keeps the URL public-shareable (good for SEO and unauth visitors) but keeps logged-in users anchored in their portal.

### 2. Make the Survey reachable on first signup

Bypass the broken phone-OTP step while we have no SMS:
- In `SignUpDetails.tsx`, after `supabase.auth.signUp` success, set `phone_verified = true` on the new profile (mock-phase) and navigate **straight to `/signup/survey`** instead of `/signup/verify-phone`.
- Leave `VerifyPhone.tsx` and the `verify-otp` plumbing in place for when SMS goes live — just stop routing through it.
- Survey already navigates to the role's dashboard on submit, so the rest of the chain works.

This restores the PRD's "Quick Capture → Survey → Dashboard" experience without needing an SMS provider.

### 3. Wire `SurveyIncompleteBanner` into all four portal dashboards

Component already exists. Add it at the top of `TenantDashboard`, `LandlordDashboard`, `InvestorDashboard`, `ProfessionalDashboard` so users who skipped the survey see a persistent prompt. Disappears automatically when `profile.survey_completed === true`.

### Out of scope for this turn
- Building real product flows (Save for Rent enrolment, Loan wizard, Documents vault) — those need new tables + edge functions; queue for the next iteration.
- Replacing PortalPlaceholder pages with full UIs.
- Real SMS OTP, NIN/BVN verification.
- Admin tooling beyond what's already scaffolded.

### What to build next (after this turn)
Prioritisation suggestion for the following message, in order of conversion impact:
1. **Tenant Save for Rent enrolment + plan dashboard (Screens 23a/b)** — flagship product, drives sign-ups.
2. **Tenant Loan application wizard (Screen 24)** — second flagship product, requires KycGate to come into play.
3. **Landlord property registration + tenancy CRUD (Screens 31–32)**.
4. **Investor opportunity browser with detail + EOI (Screens 39–40)**.
5. **Admin Users + Applications listing (Screens 56–58)** — gives the Renteaze team operational visibility.
