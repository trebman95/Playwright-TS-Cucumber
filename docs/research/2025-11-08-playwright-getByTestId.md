---
title: Playwright getByTestId and data-test mapping
status: consolidated
created: 2025-11-08
updated:
---

Questions
- Where to configure the test id attribute when using Cucumber-JS?
  - Answer: In a global hook before steps run; see "Configuration".
- How to use `getByTestId` with `data-test`?
  - Answer: Map test ids via `selectors.setTestIdAttribute('data-test')`.
- Why didn’t `playwright.config.ts` work here?
  - Answer: The project uses Cucumber-JS, not the Playwright Test runner, so that config isn’t executed; see "What I Tried in playwright.config.ts".

## Configuration

- With Cucumber-JS, set the test id attribute in a hook before steps run:
  - `hooks/globalHooks.ts`:
    - `import { selectors } from 'playwright'`
    - `BeforeAll(() => selectors.setTestIdAttribute('data-test'))`

Notes
- Prefer `BeforeAll` to set once; `Before` also works if `BeforeAll` is unavailable.
- Importing `selectors` from `'playwright'` is clearer than from `'@playwright/test'` in this setup.
- `playwright.config.ts` is ignored because Cucumber-JS is the runner.

### Two Ways to Override the Default Test ID (Playwright)

1) Globally via Playwright Test config (works only with the Playwright Test runner):
```
// playwright.config.ts (Playwright Test runner only)
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-test',
  },
});
```

2) Programmatically via selectors API (works in any runner, including Cucumber-JS):
```
import { selectors } from 'playwright';
// In a global hook before any steps
await selectors.setTestIdAttribute('data-test');
```

### What I Tried in playwright.config.ts (And Why It Didn’t Apply)

- I attempted multiple times to set `testIdAttribute` in `playwright.config.ts` and learned there are two config styles:
  - Older style: typing the object as `PlaywrightTestConfig`
  - Newer/cleaner: using `defineConfig(...)` helper for better merging and IDE support
- Reference on `defineConfig` being the preferred modern style:
  - https://github.com/microsoft/playwright/pull/20061/commits/de84884ca77eafd62c464256d6bd1ee7fab52dbd
- Despite using the newer `defineConfig` form, nothing changed in our runs because this project uses Cucumber-JS as the test runner. Therefore, Playwright’s test runner config file is not executed.

## Usage

- `page.getByTestId('inventory-item-name')` resolves to `[data-test="inventory-item-name"]`.
- Prefer `getByTestId` over brittle CSS/XPath selectors.

Example
```
// Given hooks/globalHooks.ts sets selectors.setTestIdAttribute('data-test')
const items = page.getByTestId('inventory-item-name');
await expect(items).toHaveText([
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  // ...
]);
```

## Related
- ADR: docs/adr/0001-test-ids-as-primary-selectors.md
- Cucumber config: `cucumber.js` loads all step files via `--require './steps/**/*.ts'` and hooks via `--require './hooks/**/*.ts'`.

## References
- Test id attribute via Playwright Test config:
  - https://playwright.dev/docs/api/class-testoptions#test-options-test-id-attribute
- Test id attribute via selectors API:
  - https://playwright.dev/docs/api/class-selectors#selectors-set-test-id-attribute
- Request for `defineConfig` vs typed configs:
  - https://github.com/microsoft/playwright/issues/19694
