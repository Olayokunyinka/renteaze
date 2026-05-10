
# Renteaze MVP — PRD Audit & Phased Build Plan

I cross-checked the v2.3 Lovable Build Guide (66 screens) against the codebase. Below is what's already built, what's stubbed, and a 6-phase plan to finish the MVP.

---

## 1. Status snapshot (built vs PRD)

### ✅ Functional today
- **Brand & design system** (Deep Blue / Gold / Plus Jakarta) — matches PRD intent (we use Plus Jakarta vs Inter; our existing memory pins this).
- **Public site (Screens 01–10)**: Home, ForTenants (with rent calculator), ForLandlords, ForInvestors, ForProfessionals, Properties + PropertyDetail, Events, Blog + BlogPost, About, Contact, FAQ.
- **Paid Landing Pages (Screens 11–15)**: all 5 done.
- **Auth (Screens 16–23)**: SignUpRole, SignUpDetails (now skips broken OTP → Survey), VerifyPhone (idle), Survey (full 21-question, dropdowns, prefilled, editable from dashboard), SignIn, ForgotPassword, ResetPassword, KycGate scaffold.
- **Portal shells** for all 4 roles + Admin, with role-coloured sidebars, topbar, RequireAuth guard.
- **Properties / Events** wrap in PortalAwareLayout so signed-in users stay inside their portal.
- **DB**: `profiles` (with the full survey schema), `user_roles` (with `has_role` SECURITY DEFINER), `otp_verifications`, `notifications`, plus `handle_new_user` trigger.

### 🟡 Scaffolded only (route exists, renders `PortalPlaceholder`)
- All Tenant sub-pages except Dashboard: SaveForRent, Loans, Documents, Statements, Messages, Settings.
- All Landlord sub-pages except Dashboard.
- All Investor sub-pages except Dashboard.
- All Professional sub-pages except Dashboard.
- All Admin pages (Users, Applications, Properties, Settings, Dashboard widgets).

### ❌ Not started
- **DB tables**: `savings_plans`, `transactions`, `loan_applications`, `properties`, `tenancy_records`, `maintenance_requests`, `investment_opportunities`, `investment_expressions`, `referrals`, `events`, `event_registrations`, `documents`, `blog_posts`, `messages`, `commission_rates`, `payout_requests`.
- **Storage buckets**: `tenant-documents`, `landlord-documents`, `investor-documents`, `professional-resources`, `property-images`, `opportunity-media`, `event-covers`, `blog-covers`.
- **Edge Functions** (PRD Appendix A): all except `verify-nin` scaffold — `send-otp`, `verify-otp`, `send-email`, `send-whatsapp`, `send-sms`, `gtbank-webhook`, `bujeti-create-account`, `paystack-webhook`, `generate-pdf-statement`, `get-exchange-rate`.
- **Communications Hub, Analytics, Content Management, Commissions/Payouts, Opportunity manager, Event manager** — admin functionality.

---

## 2. Phased build plan

Each phase is a single buildable batch with concrete DB + UI deliverables. Phases are ordered by conversion impact and dependency.

### Phase 1 — Tenant flagship products (Save for Rent + Loans)
**Why first:** SfR is the primary funnel from the homepage and tenant LP, and Loans is the second flagship. Both are gated by KYC, which forces us to also wire `KycGate` properly.

- **DB**: `savings_plans`, `transactions`, `loan_applications`, `documents` tables + RLS.
- **Storage**: `tenant-documents` bucket (private).
- **Screens 23a/b**: SfR enrolment form (annual rent → monthly = /10, 10-month visual) and SfR plan dashboard (progress ring, 10-month tile grid, virtual account placeholder, transaction history, Request Disbursement).
- **Screen 24**: 4-step Loan application wizard (Product → Property → Income → Review) → inserts into `loan_applications`.
- **Screen 25**: My Loans list + Loan detail (status timeline, repayment schedule).
- **Screen 26**: Documents vault (required docs checklist, upload to Storage, status badges).
- **Screen 27**: Statements (filters, summary, transactions table, "Download PDF" stub button).
- **Wire `KycGate`** so any product flow blocks until NIN/BVN/bank submitted (mocked verify, real Edge Function later).
- Replace `PortalPlaceholder` for these routes; keep dashboards' Quick Actions live.

### Phase 2 — Landlord operations (Properties, Tenants, Payments, Maintenance)
**Why next:** unlocks landlord-side data which Admin views depend on; also enables Property listings to be fed by real records (admin-published).

- **DB**: `properties`, `tenancy_records`, `maintenance_requests` + RLS (owner read/write own; admin all; public read where `is_public_listing=true`).
- **Storage**: `property-images` (public read), `landlord-documents` (private).
- **Screen 31**: Properties list + Add Property form + Property detail (Overview/Tenants/Maintenance/Financials tabs).
- **Screen 32**: Tenants list + Add Tenant + Tenancy detail.
- **Screen 33**: Payments tracker + "Log Manual Payment" modal (writes to `transactions`).
- **Screen 34**: Maintenance requests list + New Request form + detail with status timeline.
- **Screen 35**: Financing application wizard (Construction / Renovation / Repair) → reuses `loan_applications` schema.
- **Screen 36 / 37**: Landlord Documents + Statements (reuses Tenant patterns).
- **Public Properties page**: switch from mock data to live Supabase query.

### Phase 3 — Investor portal & Opportunities
- **DB**: `investment_opportunities`, `investment_expressions` + RLS.
- **Storage**: `opportunity-media` (public images, private docs path).
- **Screen 40**: Investor Dashboard with Currency toggle (NGN/USD/GBP) — local state for now, `get-exchange-rate` Edge Function later.
- **Screen 41**: Opportunities browser + Opportunity detail with EOI modal → inserts `investment_expressions`.
- **Screen 42**: My Deals list + Deal detail (stage timeline, deal documents, Renteaze notes).
- **Screen 43**: Investor Documents (KYC + admin-uploaded deal docs).
- **Screen 44**: Returns & Reports.
- **Settings**: international bank details section.

### Phase 4 — Professional / Referral programme
- **DB**: `referrals`, `payout_requests`, `commission_rates` (config) + RLS.
- **Logic**: extend `handle_new_user` to capture `?ref=` from signup URL into `referred_by`; auto-link referrals when referred user reaches "applied" or "converted" milestones (DB triggers on `loan_applications` / `savings_plans`).
- **Screen 47**: Pending Approval banner + Approved dashboard with Referral Code Hero, stats, pipeline, recent referrals/commissions.
- **Screen 48**: My Referrals list + detail modal.
- **Screen 49**: Commissions tracker + Payout Request modal + payout history.
- **Screen 50**: Resources page reading from `professional-resources` Storage bucket.

### Phase 5 — Admin backend
**Depends on Phases 1–4** (needs the data).

- **Screen 53**: Admin Dashboard (alerts strip, 8-stat grid, action queues, 3 Recharts).
- **Screen 54**: Users list (filters, search) + User detail (Profile/Products/Documents/Transactions/Activity/Notes tabs, Suspend/Verify KYC actions).
- **Screen 55**: Applications queue + Application detail (approve/reject form writes to `loan_applications` + creates notification).
- **Screen 56**: Payments & Ledger + manual payment + CSV export + webhook log table.
- **Screen 57**: Partners (approve professional accounts → flips status, generates `PRO-XXXX-NN` referral code).
- **Screen 58**: Commissions (approve, payout queue, mark paid).
- **Screen 59**: Properties registry (master view of `properties`).
- **Screen 60**: Events manager (CRUD `events`, registrants table, mark attended, CSV export).
- **Screen 61**: Opportunities manager (CRUD `investment_opportunities`, EOIs view with stage advancement).
- **Screen 62**: Content Management — Blog, FAQs, Resources (writes to `blog_posts`, `faqs`, `professional-resources` bucket).
- **Screen 63**: Analytics (date range + 7 tabs of Recharts pulling Supabase aggregates).
- **Screen 64**: Communications Hub (compose to segment, channel selector — calls Edge Function stubs).
- **Screen 65**: System Settings (super_admin only, commission rates inline editor, integrations cards).
- **Screen 66**: Notifications drawer in admin topbar.

### Phase 6 — Cross-cutting & integrations
- **Messages (Screens 28/38/45/51)**: `messages` table + Realtime subscription, two-panel UI, automated system chips. Build once and reuse across all 4 portals.
- **Notifications**: in-app drawer wired across all portals (table already exists).
- **Edge Functions** (scaffold each with TODO placeholders, no real keys yet):
  - `send-otp`, `verify-otp` (re-enable phone verification step)
  - `send-email` (SendGrid), `send-whatsapp`, `send-sms` (Termii/AT)
  - `bujeti-create-account` (called when SfR plan created — fills `virtual_account_number`)
  - `gtbank-webhook` + `paystack-webhook` (matching to plans/registrations)
  - `generate-pdf-statement` (HTML → PDF for tenant/landlord/investor statements)
  - `get-exchange-rate` (1-hour cache for investor currency toggle)
- **SEO polish**: per-page meta + JSON-LD for Properties, Events, Opportunities, Blog posts.
- **Mobile QA pass** of all portal pages.

---

## 3. Suggested execution order summary

```
Phase 1  Tenant SfR + Loans + Docs + Statements + KYC gate
Phase 2  Landlord properties/tenants/payments/maintenance/financing
Phase 3  Investor opportunities + EOIs + reports
Phase 4  Professional referrals + commissions + payouts
Phase 5  Admin (dashboard, users, apps, partners, commissions, opps, events, content, analytics, settings)
Phase 6  Messages + Notifications + Edge Functions + SEO + mobile QA
```

After approval I'll start with **Phase 1** — DB migration first, then UI for Save for Rent enrolment + plan dashboard as the first deliverable, followed by Loans, Documents, and Statements in the same phase.
