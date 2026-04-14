

## Layer 1 -- Public Website Excellence Plan

The v2 PRD keeps all v1 public website requirements and adds three key areas for Layer 1. Here is what we will build and upgrade.

---

### What is changing

**1. Navbar -- Auth Entry Points**
- Add "Sign In" link and change "Get Started" from WhatsApp link to a registration trigger
- Both route to a new `/auth` page with role-selection (Tenant / Landlord / Investor) registration flow and sign-in tab
- Mobile nav gets the same treatment

**2. Homepage -- Three New Sections**
- **Portal access strip** below hero: "Go to My Account" (if logged in concept) / "Sign Up / Sign In" CTA bar
- **Upcoming Events module**: 2-3 upcoming seminars/training events with date, title, description, and "Register" CTA (static data for now)
- **Updated social proof counters**: add "Loans Disbursed" to the existing stats bar to match PRD (tenants served, landlords partnered, properties managed, loans disbursed)

**3. Product Pages -- Apply Now / Get Started CTAs**
- Every product card on For Tenants, For Landlords, and For Investors pages gets a prominent "Apply Now" or "Get Started" button
- Button links to `/auth?product=save-for-rent&role=tenant` (product context preserved in URL)
- Clear visual hierarchy: the CTA is the primary action on each product card

**4. Auth Page (new)**
- `/auth` route with two tabs: Sign In and Register
- Register tab: role selector (Tenant/Landlord/Investor) -> role-specific fields
  - Tenant: name, email, phone, annual rent, location
  - Landlord: name, email, phone, property address, number of units
  - Investor: name, email, phone, investment interest, country of residence
- Sign In tab: email + password (visual only -- shows success toast)
- Reads `?product=` and `?role=` query params to pre-select role and show product context
- "Forgot password" link (shows toast for now)
- All forms show success toast on submit (no backend yet)

**5. Events/Training Section (new component)**
- Reusable `UpcomingEvents` component with 2-3 sample events
- Each event: title, date, location (online/Lagos), short description, "Register Now" button
- Registration button opens a simple modal with name/email/phone form (toast on submit)
- Used on Homepage and available for standalone `/events` page later

**6. Visual & UX Polish Pass**
- Add subtle scroll-reveal animations (CSS `animate-fade-in` on section entry via Intersection Observer)
- Improve product card hover states with micro-interactions
- Ensure every page section is never more than one screen away from a CTA
- Add "Apply Now" buttons to calculator results section on Tenants page

---

### Files to create or modify

| File | Action |
|------|--------|
| `src/pages/Auth.tsx` | Create -- registration/login page |
| `src/components/UpcomingEvents.tsx` | Create -- events module |
| `src/components/EventRegistrationModal.tsx` | Create -- event signup modal |
| `src/components/Navbar.tsx` | Modify -- add Sign In + Get Started routing |
| `src/pages/Index.tsx` | Modify -- add portal strip, events, update stats |
| `src/pages/ForTenants.tsx` | Modify -- add Apply Now CTAs to product cards |
| `src/pages/ForLandlords.tsx` | Modify -- add Apply Now CTAs to product cards |
| `src/pages/ForInvestors.tsx` | Modify -- add Apply Now CTAs to product cards |
| `src/App.tsx` | Modify -- add `/auth` route |
| `src/index.css` | Modify -- add scroll animation keyframes |

No backend or database required -- all forms show success toasts. This gives a complete, polished Layer 1 that is ready to connect to Supabase auth when Layer 2 begins.

