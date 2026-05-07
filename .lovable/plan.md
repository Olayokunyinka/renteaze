## Cleanup — Remove AI-Builder Feel

Targeted edits to make Renteaze feel grounded, credible, and human.

---

### 1. Homepage — Remove inflated stats bar
**File:** `src/pages/Index.tsx`

- Delete the entire `stats` section (the bar showing "2,000+ Tenants Served / 500+ Properties / 300+ Landlords / ₦2B+ Loans").
- Also remove the `stats` array constant.
- Reason: numbers are unverifiable and feel manufactured. Better to say nothing than to over-claim.

### 2. Homepage — Remove Portal Access Strip
**File:** `src/pages/Index.tsx`

- Delete the "Access your Renteaze portal..." strip with Sign In / Create Account buttons (sits right under the hero).
- Sign In / Get Started already live in the navbar — duplicating them here looks template-y.
- Remove now-unused `LogIn`, `UserPlus` imports.

### 3. Homepage — Rewrite "What Makes Renteaze Different"
**File:** `src/pages/Index.tsx`

Replace the four buzzword cards (Fintech-Powered, AI-Driven Insights, Full-Service Platform, 15+ Years Expertise) with four **values & offering** cards rooted in what Nigerian tenants/landlords/investors actually care about:

| Title | Description |
|---|---|
| **Trust & Transparency** | Clear pricing, verified properties, and honest contracts. No hidden agent fees, no surprises at move-in. |
| **Flexible Rent Solutions** | Pay rent monthly, save toward annual rent, or access rent loans. We meet you where your cashflow is. |
| **End-to-End Property Care** | From tenant screening to facility maintenance, we manage the full lifecycle so landlords earn without the headaches. |
| **Backed by 15+ Years of Real Estate** | Rooted in Dapo Okunogbe & Partners' deep Lagos market experience — not a startup guessing its way through. |

Section heading also softens: **"Why Renteaze"** with subtitle *"Built on the things that actually matter to Nigerian renters, landlords, and investors."*

Update icons accordingly (e.g. `Shield`, `Wallet`, `Home`, `Building2`).

### 4. Delete the Platform page entirely
**Files:**
- Delete `src/pages/Platform.tsx`
- `src/App.tsx` — remove the `Platform` import and the `/platform` route
- `src/components/Navbar.tsx` — remove the "Our Platform" nav link
- `src/components/Footer.tsx` — remove any "Our Platform" link if present

Reason: the page reads as generic tech marketing and adds no buyer value.

---

### Files touched
- `src/pages/Index.tsx` — remove stats, remove portal strip, rewrite differentiators
- `src/pages/Platform.tsx` — delete
- `src/App.tsx` — remove route + import
- `src/components/Navbar.tsx` — remove nav link
- `src/components/Footer.tsx` — remove nav link if present

No other pages or behavior change.