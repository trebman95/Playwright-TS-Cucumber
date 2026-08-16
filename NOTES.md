# Design Notes

## Why mocked tests exist alongside a full E2E suite

saucedemo.com has no real backend - session state is a `session-username` cookie, cart state is
a `cart-contents` localStorage array of product IDs. That makes two shortcuts legitimate here,
and a third clearly not:

- **Login is never mocked.** `hooks/loginFixture.ts` always drives the real login form once per
  persona per run, then caches the resulting `storageState()` and reapplies it via
  `context.addCookies()` for every later scenario needing that persona. Skipping the UI walk on
  repeat scenarios is fine; fabricating a session for a persona that never actually authenticated
  is not - the app validates the cookie's value against its own list of accepted usernames, so an
  invented one gets bounced straight back to the login page with an error.
- **Cart contents can be seeded directly**, but only with product IDs that exist in saucedemo's
  real catalog (`mocks/sauceDemoMocks.ts`). The catalog is baked into the app's JS, not data -
  seeding an ID that isn't in it renders nothing, the same way an invalid username does. Both
  failure modes were verified directly before relying on either technique.
- `purchase.feature` (`@e2e`) never seeds anything - it's the canary that would catch a login or
  checkout regression the mocked suite can't see.

## Why the request-level tests matter, not just that they exist

`features/api-requests.feature` uses Playwright's `request` API directly against saucedemo -
no browser, no page object. It exists to test something a browser-driven test structurally
can't see: saucedemo is a static site on GitHub Pages with a client-side-only router. A raw GET
to any deep-linked route this suite relies on (`checkout-step-two.html`, `cart.html`, etc.)
returns an HTTP 404. `page.goto()` receives that same 404 as its main-document response - it
only looks fine in a browser because a client-side redirect shim embedded in GitHub Pages' 404
page hands control back to the real app once the JS bundle loads. `api-requests.feature` asserts
that 404 directly, which is also, in effect, a regression test for the exact mechanism every
`@mocked` scenario's deep-linking depends on.

## Why the Playwright test agents are a separate lane, not a replacement

`npx playwright init-agents --loop=claude` scaffolds three subagents (planner, generator, healer)
that write and run raw `@playwright/test` files. I looked at whether to redirect the generator to
emit Gherkin + step definitions matching this repo's conventions instead, and didn't: its
`generator_write_test` tool and the healer's `test_run`/`test_debug` tools are wired to Playwright's
own test runner at the MCP layer, not to `cucumber-js` - that's not something a prompt rewrite can
change. Forcing the fit would mean fighting the tool rather than using it. So `tests/` and `specs/`
exist as a genuinely separate, complementary lane for fast spec-driven exploration - `CLAUDE.md`
documents why so it isn't mistaken for an abandoned migration.

## What I would add with another hour

- A state-reset fixture independent of login. Cart isolation currently piggybacks on
  `hooks/loginFixture.ts`, which only works because every mocked scenario happens to carry
  `@loggedIn` or a persona tag. A scenario that wanted a clean cart without also wanting a fresh
  login would have nowhere to hook that today.
- Coverage of what `problem_user` and `performance_glitch_user` actually do differently (broken
  images, slow interactions), not just "can this persona reach an authenticated state."
- Permanent regression tests for the invalid-seed cases (bogus product ID, bogus username)
  themselves, rather than something verified by hand while building the fixtures.

## CI/CD

`.github/workflows/ci.yml` runs typecheck, lint, format check, then the full suite headless on
every push/PR. Traces upload as a build artifact regardless of outcome - the trace-on-failure
logic in `globalHooks.ts` already means there's nothing to upload on a clean run.

## Quality observations

- `checkout-step-two.html` (the order overview) and `checkout-complete.html` are both reachable
  by direct URL with nothing but a valid session cookie and a seeded cart - no server-side check
  confirms the checkout form was ever filled in. Not a real vulnerability in a throwaway demo
  app, but it's the gap `checkout-mocked.feature` exists to document.
- The original take-home README had two TODO comments pointing at scenarios that were already
  fixed in an earlier commit. Removed them - a stale TODO next to working code is worse than no
  comment at all.
