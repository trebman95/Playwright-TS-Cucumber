---
name: add-mocked-scenario
description: Add a new @mocked Cucumber scenario to this repo by seeding client-side state directly instead of walking the UI to reach it. Use when a new checkout/cart/persona scenario is needed and the real UI path to that state is slow, or when testing a state the UI can't produce on demand (e.g. an edge case, an error page).
---

# Add a mocked scenario

This repo's mocking strategy is not "stub the network." saucedemo.com has no real backend - state
lives in a `session-username` cookie and a `cart-contents` localStorage array. Mocking here means
seeding that state directly and skipping only the UI steps that would have produced it - never
fabricating state the real app wouldn't accept. Follow this procedure in order; do not skip the
verification steps even though they feel slow.

## 1. Identify the target and the state that drives it

What page or behavior do you want to reach, and what's expensive or impossible about reaching it
through the UI? Name the specific cookie/localStorage key(s) involved - if you don't know them yet,
find out with a throwaway probe (step 2) before writing anything else.

## 2. Verify the real behavior before assuming it

Write a short, disposable Node script using `playwright` (browser) or `request` (raw HTTP) against
the **live** saucedemo.com - not this repo's fixtures - to confirm:

- What state (cookie/localStorage key, value shape) actually gates the page you want.
- That a **valid** value produces the real page.
- That an **invalid** value is rejected, not silently accepted. This is the check that makes
  seeding legitimate rather than a shortcut around real validation - see `NOTES.md` for the two
  precedents (a bogus username gets bounced to login; a bogus product ID renders nothing).

Run it with `node`, not as part of the suite. Delete it once you've confirmed the behavior -
findings go in the test/docs, not the probe script.

## 3. Only seed values that are real

- Product IDs: use `mocks/sauceDemoMocks.ts` (`PRODUCT_IDS` / `productIdsForNames`). Add a new
  product there if needed - don't hardcode an ID inline.
- Login/persona: use an existing tag from `hooks/loginFixture.ts` (`@loggedIn`, `@problemUser`,
  `@performanceGlitchUser`), or add a new `Before({ tags: '@newPersona' })` entry following the
  same `startAsUser(username)` pattern if a new saucedemo test account is needed. Never write a
  fixture that sets a session cookie without that `startAsUser` real-login-then-cache flow.

## 4. Write the scenario

- New or extended `.feature` file in `features/`, tagged `@mocked` plus whatever login/persona tag
  applies.
- Step definitions in `steps/` - extend an existing file if the concern matches (cart assertions →
  `cartMock.steps.ts`, checkout assertions → `checkoutMock.steps.ts`, seeding → `mockSeed.steps.ts`),
  otherwise add a new file.
- Page object changes in `pages/*.page.ts` - locators and actions only, no `expect()` calls there.

## 5. Validate

```bash
npm run typecheck && npm run lint && npm run format:check
npx cucumber-js --tags @mocked --require-module ts-node/register --require './steps/**/*.ts' --require './hooks/**/*.ts' --format @cucumber/pretty-formatter --exit
```

## 6. Never touch the canary

`purchase.feature` (`@e2e`) stays fully unmocked. If a new scenario needs seeding, it's a `@mocked`
scenario, full stop - it does not go in `purchase.feature`.

## 7. Update docs if the shape of the suite changed

If you added a new tag, persona, or top-level feature file, update the tag/command tables in
`README.md`. If you made a real design decision (not just followed this checklist), add a line to
`NOTES.md`.
