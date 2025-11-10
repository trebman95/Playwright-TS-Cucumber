---
title: Debugging in Playwright + Cucumber-JS
status: draft
created: 2025-11-08
updated:
---

Questions
- How can we pause interactively without hitting Cucumber timeouts?
  - Answer: Use `PWDEBUG=1` or `page.pause()` and increase Cucumber timeout during debug; see "Playwright Inspector & Timeouts".
- What’s the best way to capture rich artifacts (trace) with Cucumber?
  - Answer: Use tracing start/stop around scenarios; see "Tracing with Cucumber".
- When should we prefer logs vs. Inspector?
  - Answer: Logs for quick visibility, Inspector for interactive deep dives, tracing for non-interactive forensics; see "Choosing a Debugging Mode".
- How to open the Inspector?
  - Answer: Set `PWDEBUG=1` or call `page.pause()`.
- How to see Playwright actions?
  - Answer: Set `DEBUG=pw:api`.

## Playwright Inspector & Timeouts

- Use `PWDEBUG=1 npm run test-debug` to open the Inspector without modifying code
- `page.pause()` also works but remember: Cucumber `setDefaultTimeout(15000)` will abort the scenario if you stay paused too long
- During interactive debugging, temporarily raise Cucumber’s timeout (e.g., `setDefaultTimeout(600000)`), or do it conditionally when `PWDEBUG === '1'`

## Choosing a Debugging Mode

- Quick visibility: enable `DEBUG=pw:api`
- Interactive deep dive: use `PWDEBUG=1` (Inspector)
- Non‑interactive forensics: enable tracing (screenshots + snapshots) and review later

## Action Logs

- `DEBUG=pw:api npm run test-debug` prints each Playwright API call
- Combine with Inspector: `PWDEBUG=1 DEBUG=pw:api npm run test-debug`

## Tracing with Cucumber

- Start before scenario: `await page.context().tracing.start({ screenshots: true, snapshots: true, sources: true })`
- Stop after scenario: `await page.context().tracing.stop({ path: 'trace.zip' })`
- View: `npx playwright show-trace trace.zip`
- Tip: Gate behind a tag like `@debug` to avoid overhead in normal runs

## Reusable Debug Step

- Step: Then I log details of elements with test id "{string}"
- Prints: count, text contents (and HTML when available) for `getByTestId` matches

## Screenshots on Failure

- In an `After` hook, on scenario failure: `await page.screenshot({ path: 'failure.png', fullPage: true })`

## References

- Playwright Inspector docs
- Playwright Trace Viewer docs
- Cucumber‑JS hooks documentation
