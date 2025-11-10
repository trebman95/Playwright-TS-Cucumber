---
title: Timeouts in Playwright + Cucumber-JS
status: draft
created: 2025-11-08
updated:
---

Questions
- Should we centralize timeouts via env vars and a small config module?
  - Answer: Yes; see "Proposed Policy" for env-driven single source of truth.
- What should the default relationship be between timeouts?
  - Answer: Cucumber > Playwright action > assertion; see "Recommended Defaults".
- Where are timeouts set today?
  - Answer: Cucumber: `setDefaultTimeout(15000)`; Playwright actions: `page.setDefaultTimeout(30000)`; assertions default ~5s.

## Current Behavior

- Cucumber step/scenario timeout: 15s
- Playwright action/locator timeout: 30s
- Expect assertions: default ~5s per assertion unless options provided
- Mismatch: Scenario can end before actions/Inspector complete

## Proposed Policy

- Single source of truth for timeouts (config or env‑driven):
  - `PW_ACTION_TIMEOUT_MS` default 30000
  - `CUCUMBER_TIMEOUT_MS` default 60000 (always ≥ action timeout)
  - Optional `ASSERT_TIMEOUT_MS` convention for expectations (e.g., 5000–15000)
- Apply once:
  - `page.setDefaultTimeout(PW_ACTION_TIMEOUT_MS)` when creating the page
  - `setDefaultTimeout(CUCUMBER_TIMEOUT_MS)` in hooks
- Debug override:
  - If `PWDEBUG=1`, bump `CUCUMBER_TIMEOUT_MS` (e.g., 10 minutes) to avoid Inspector shutdowns

## Recommended Defaults

- Local dev: action 30s, cucumber 60s
- CI (slower): action 30–60s, cucumber 90–120s
- Debug: cucumber 10m when `PWDEBUG=1`

## Per‑Assertion Timeouts

- Prefer explicit per‑assertion timeouts instead of changing global defaults, e.g. `await expect(locator).toHaveText(expected, { timeout: 15000 })`

## Next Steps

- If we adopt this policy, codify via a small `config/timeouts.ts` and wire both hooks and page creation to it
- Optionally document in README under “Project Style Standards”
