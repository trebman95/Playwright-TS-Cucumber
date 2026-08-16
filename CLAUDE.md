# CLAUDE.md

Project conventions for working in this repo. See [README.md](README.md) for setup/commands and
[NOTES.md](NOTES.md) for the reasoning behind the mocking strategy and other design tradeoffs.

## What this is

Cucumber + Playwright coverage for saucedemo.com. Two independent test lanes live here:

- **The Cucumber suite** (`features/`, `steps/`, `pages/`, `mocks/`, `api/`, `hooks/`) - the real,
  curated regression suite. This is the primary lane; everything below applies to it unless noted.
- **Playwright Test Agents** (`tests/`, `specs/`, `.claude/agents/playwright-test-*.md`) - Microsoft's
  official planner/generator/healer agents, for rapid spec-driven exploration. Separate on purpose;
  see "Playwright Test Agents" below for why.

## Hard rules for the Cucumber suite

- **Never fabricate a login.** Real UI login only, via `hooks/loginFixture.ts`. It's fine to cache
  and replay a session obtained from one real login (`context.storageState()` +
  `context.addCookies()`); it is not fine to hand-craft a session cookie for a persona that never
  actually authenticated. saucedemo validates the cookie's value against its own accepted-username
  list, so an invented one gets bounced back to login - this is a real check, not a formality.
- **Only seed product IDs that exist in saucedemo's real catalog** (`mocks/sauceDemoMocks.ts`).
  The catalog is baked into the app's JS, not data - an ID that isn't in it renders nothing, same
  failure mode as an invalid login.
- **`purchase.feature` (`@e2e`) never seeds or mocks anything.** It's the canary. If you're tempted
  to add seeding there, add a new `@mocked` scenario instead.
- Before writing an assertion against seeded/mocked state, verify the real behavior first (probe
  the live site) rather than assuming it. Every mocking decision in this repo was made this way.

## Conventions

- Tags: `@e2e` (unmocked canary), `@mocked` (seeded state), `@api` (raw HTTP, no browser),
  `@loggedIn` / `@problemUser` / `@performanceGlitchUser` (fixture-driven login personas).
- `pages/*.page.ts` hold locators and actions only - no assertions. Assertions live in `steps/`.
- `mocks/sauceDemoMocks.ts` is the single source of truth for product name → ID mapping. Don't
  hardcode product IDs elsewhere.
- Run `npm run typecheck && npm run lint && npm run format:check` before considering a change done
  - all three are enforced in CI (`.github/workflows/ci.yml`).
- Prefer extending an existing `steps/*.steps.ts` file over creating a new one unless the new steps
  are a genuinely distinct concern (see the existing split: mock seeding vs. cart assertions vs.
  checkout assertions vs. HTTP assertions).

## Playwright Test Agents

Scaffolded via `npx playwright init-agents --loop=claude`. The generator and healer agents write
and run raw `@playwright/test` spec files (`tests/*.spec.ts`) - that's a property of the MCP tools
they call (`generator_write_test`, `test_run`, etc.), not a prompt choice, so their output can't be
redirected into Gherkin. That's why they're a separate lane instead of being folded into
`features/`: use them for fast exploratory spec generation against any target, not as a second way
to write the curated suite.

- `tests/seed.spec.ts` - environment setup the generator's output assumes.
- `specs/*.md` - planner output, read by the generator.
- `tests/*.spec.ts` (generated) - run with `npm run test:agents`.

## MCP servers (`.mcp.json`)

Two, for different purposes - don't confuse them:

- `playwright-test` - bundled with `@playwright/test` 1.56+, powers the three agents above. Not
  meant to be driven directly.
- `playwright` (`@playwright/mcp`) - general-purpose browser automation for ad-hoc use in a Claude
  Code session (e.g. "go check what this page actually renders" mid-conversation), independent of
  the agents workflow.
