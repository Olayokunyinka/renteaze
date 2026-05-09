## Diagnosis

The login itself works — Supabase auth logs confirm a 200 on `/token`, the session is created, and the "Welcome back" toast fires. The problem is in `SignIn.tsx`'s post-login redirect effect:

```ts
if (profile && !profile.phone_verified) navigate("/signup/verify-phone", ...);
if (profile && !profile.survey_completed) navigate("/signup/survey", ...);
```

For any returning user whose profile row has `phone_verified = false` (the default in `handle_new_user`, and we have no working phone-OTP flow yet), SignIn redirects them to `/signup/verify-phone`. That page then checks `sessionStorage.rz_email` (only set during the signup wizard), finds it empty, and bounces to `/signup`. Net effect from the user's perspective: they tap "Sign In", see the toast, and end up back on a sign-in/sign-up looking screen — never reaching the dashboard.

The phone-verification + survey gates were designed for the new-signup wizard (where `rz_email` is in sessionStorage and the user is mid-flow). They should not run on a returning sign-in.

## Fix

Strip the onboarding-flow gating out of `SignIn.tsx` so a successful sign-in always lands on the role's dashboard (or the `?redirect=` target if present). Survey/KYC nudges already exist in-portal via `SurveyIncompleteBanner` and `KycGate`, so we don't lose any prompting.

### Change in `src/pages/auth/SignIn.tsx`

Replace the redirect effect with:

```ts
useEffect(() => {
  if (loading || !user) return;
  if (redirect) { navigate(redirect, { replace: true }); return; }
  navigate(dashboardPathForRole(roles[0]), { replace: true });
}, [user, loading, roles, redirect, navigate]);
```

(Remove `profile` from the dependency list and from the import-side destructure if no longer used.)

### Why not also fix VerifyPhone?

`VerifyPhone` is correctly scoped to the signup wizard (it relies on `rz_email`). Leaving it as-is keeps the new-signup flow intact. Only the sign-in path needed to stop forcing onboarding gates on existing users.

### Out of scope

- No DB / RLS changes.
- No changes to `useAuth`, signup wizard, or RequireAuth.
- Phone-OTP verification (currently unused) stays untouched — we can wire it in later when SMS sending is built.
