# Fix plan for the survey resume issue

## What I’ll fix
1. Patch `src/pages/portal/PortalSurvey.tsx` so it behaves like the auth survey flow:
   - hydrate answers once instead of resetting on every profile refresh
   - persist in-progress answers, current step, and saved coordinates to `localStorage`
   - save partial progress to `profiles` on Next and Skip
   - resume the user on the correct step when they return to `/survey`
   - clear the draft only after successful final submission

2. Align the `AddressAutocomplete` usage in the portal survey with the component’s real API so address values and coordinates are both preserved reliably.

3. Validate the flow against the exact bug you reported:
   - complete steps 1 and 2
   - go to step 3
   - click Skip for now
   - return to `/survey`
   - confirm prior answers are still populated and the user resumes at step 3 instead of an empty form

## Expected outcome
- Users no longer lose partially completed survey data.
- `/survey` and `/signup/survey` will have consistent resume behavior.
- Skipping mid-survey becomes safe and user-friendly.

## Technical notes
- Root cause: the earlier fix was applied to `src/pages/auth/Survey.tsx`, but the route you tested (`/survey`) renders `src/pages/portal/PortalSurvey.tsx`, which still uses old prefill-only logic and does not save drafts/progress.
- The current network snapshot confirms the profile row still contains null survey fields, which explains why the portal survey reopens empty.
- I’ll keep this scoped to the survey persistence/resume bug only.