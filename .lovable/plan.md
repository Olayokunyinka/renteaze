# Admin survey access + demo login

## Goal
Give you a working admin login so you can see how survey responses are surfaced to staff/admins reviewing tenants, landlords, investors, and professionals.

## Current state
- `/admin/dashboard` exists but shows static cards.
- `/admin/users`, `/admin/applications`, `/admin/properties` are placeholder pages.
- Survey answers are stored on `profiles` (residence/office/tenancy/payment fields) and CRM tags on `profile_crm_tags` (admin-only).
- DB has 2 tenant accounts, no admin user.

## What I'll build

### 1. Demo admin account
Create one seeded admin via SQL migration:
- Email: `admin@renteaze.demo`
- Password: `RenteazeAdmin!2026`
- Inserts into `auth.users` (with hashed password + confirmed email), `profiles`, and `user_roles` (role = `admin`).
- Idempotent (skip insert if exists).

I'll surface these credentials in the chat after the migration runs. You can rotate the password from the Supabase dashboard whenever you want.

### 2. Admin Users page (`/admin/users`)
Real, functional list backed by `profiles` + `user_roles`:
- Search by name/email/phone
- Filter chips: role (tenant/landlord/investor/professional), survey completed (yes/no), KYC status, account status
- Table columns: Name, Email, Role(s), Survey ✓, KYC, Status, Joined
- Row click → user detail drawer

### 3. User detail drawer (survey response viewer)
Right-side sheet with tabbed sections matching the survey steps:

- **Basic** — name, email, phone, gender, age range, marital status, state, address (+ map pin if lat/lon), occupation, office address
- **Tenancy** — accommodation type, current tenant?, property type, annual rent range, period, duration, pays rent to, ease score, on-time, payment method, sought help before, interest level
- **Acquisition / CRM** — source, referral code, marketing consent, CRM tags (read from `profile_crm_tags`)
- **Account** — roles, KYC status, NIN/BVN verified flags, account manager, joined date
- Header shows `Survey: Completed at <date>` or `Survey: Incomplete (last edited <date>)`
- Empty fields render as muted "—" so you can see exactly what was vs wasn't filled

### 4. Dashboard quick stats
Replace static admin dashboard cards with live counts (pulled with simple `select count`):
- Total users (by role)
- Surveys completed / pending
- KYC pending
- Pending professional approvals
Each card links to the filtered Users page.

## Out of scope (can do next)
- Editing survey answers from admin side
- Exporting CSV
- Applications page (professional approvals workflow) and Properties admin — keep as placeholders for now unless you want them in this pass

## Technical notes
- All queries gated by existing `Admins read all profiles` / `Admins read all roles` / `Admins manage CRM tags` RLS — already in place.
- Uses `useQuery` with `supabase.from('profiles').select(...)` + a second query for roles, joined client-side (no view needed).
- Drawer uses existing shadcn `Sheet` + `Tabs`.
- Reuses `PortalShell role="admin"`.

Ready to implement?
