# Process Log
## 2025-11-06 — Session 1
- Context:
  - Initial setup and review of requirements.
- Actions:
  - Cloned fork and reviewed README/system requirements.
  - Scanned features and steps for TODOs and failing areas.
  - Added suggested vsCode plugins.
  - Ran `npm run test` and `npm run report`.
- Findings/Decisions:
  - Update login title expectation to match site.
  - Add assertion step for locked out user error.
  - Implement purchase flow and product sort outline + examples.
  - Of note: package-lock.json updated to the current project name -> "Playwright-Cucumber-Exercise"
- Issues:
  - None logged yet.
- Next Steps:
  - Fix failing login test.
  - Extend login error test.

## 2025-11-06 — Session 2
- Context:
  - Fixing, updating, and adding tests.
- Actions:
  - Repaired login test
  - Added error string validation
    - validateError added to the login page model aligning with validateTitle pattern
    - new step def created for login page
    - test added to login feature file
- Findings/Decisions:
  - Tests Pass
  - There is a Playwright method `expect(locator).toHaveText(expected[, options])` that might preform better than `errorText !== expectedError`
  - If errors need validation on multiple pages and they all have the `data-test="error"` attribute then it could be useful to move that step def to common.steps.ts
- Issues:
  - None logged yet.
- Next Steps:
  - Complete and expand the purchase test by adding a new page model and steps file

  ## 2025-11-06 — Session 3
- Context:
  - Adding purchase test.
- Actions:
  - Created page files for each page in flow
  - Created purchase steps file
  - Updated purchase feature file
  - Implemented WIP tags for debugging tests and added custom script to package.json
  - Updated README to reflect new scrips and reformatted it for clarity
- Findings/Decisions:
  - Decided to standardize Given, When, Then usage in the feature files
    - _Given (or And)_ for any setup or pre-conditions, _When_ for the final step before the validation, _Then_ for actual assertions. 
    - In the step definition files the only standard will be _Then_ for steps that contain assertions, _When_ for all others. This is because it is unknown if the final usage will be a setup or a final action
  - Discovered that tags for Cucumber are pretty much the same as the ones I have used before in Cypress
- Issues:
  - Having trouble getting the fillCheckoutInfo step that fills in multiple fields to be recognized as defined
- Next Steps:
  - Debug the fillCheckoutInfo step

## 2025-11-07 — Session 1
- Context:
  - Debugging purchase test around fillCheckoutInfo step by examining selector options
- Actions:
  - set selectors.setTestIdAttribute('data-test') once the Before hook to standardize getByTestId usage across steps
  - While debugging I updated Playwright and some dependencies in the lockfile, which I am reverting to keep the PR clean
- Findings/Decisions:
  - Research: Playwright `getByTestId` with `data-test` — see docs/research/2025-11-08-playwright-getByTestId.md (decision in docs/adr/0001-test-ids-as-primary-selectors.md)

    <details><summary>Archived notes</summary>
    - this project has many test IDs and I would like to refactor to use that selector where possible
    - found conflicting info on how to convert the default `data-testid`
      - https://playwright.dev/docs/api/class-testoptions#test-options-test-id-attribute
      - https://playwright.dev/docs/api/class-selectors#selectors-set-test-id-attribute
    - Attempted to change the config file
      - the existing import in the playwright.config.ts is `PlaywrightTestConfig`, but the one in the reference is `defineConfig`, and I don't understand the difference
        - Answer: use `defineConfig` for cleaner, type-safe configuration that can provide better IntelliSense
        - `PlaywrightTestConfig` is the type for the config object, while defineConfig is a helper that returns a properly merged PlaywrightTestConfig.
        - Learn more here https://github.com/microsoft/playwright/pull/20061/commits/de84884ca77eafd62c464256d6bd1ee7fab52dbd
      - TODO investigate more here https://playwright.dev/docs/test-use-options
    - implemented it directly in login.page.ts to prove its functionality
      - `selectors.setTestIdAttribute('data-test')`
    - FINAL VERDICT
      - the playwright.config.ts in this repo does not get ran because the test runner is cucumber-js and not Playwright Test
    </details>

- Issues:
  - An unused Playwright config in the repo was a red herring, cucumber runs the tests so that file never applied, which is why changing testIdAttribute in the config had no effect.
- Next Steps:
  - move on to debugging purchase test

## 2025-11-07 — Session 2
- Context:
  - Debugging purchase test around fillCheckoutInfo step by breaking it into multiple steps
- Actions:
  - Refactored error validation test to use the selector and expect method suggested by playwright
- Findings/Decisions:
    - Common input step abstraction
      - I added a shared step to fill fields via getByTestId because input is a common step that could be used across projects.
      - Drawback: the step hides that one argument is a test ID, which hurts readability and cross-team collaboration
      - Attempted workaround: I drafted a shared assertion step (“validate the element with test ID…”) but it made scenarios too tied to the code.
        - see comments in steps/common.steps.ts for how this played out
      - Keep step language simple and move low-level selector usage into reusable helpers (called by steps), not exposed in feature text.
      - Next step: Extract helper methods (e.g., fillByTestId(testId, text), expectByTestIdContains(testId, expected)) into a utility or base page, and call them from step files; features stay readable while selectors live in code.
  - Discovered that `await page.pause()` can be used in debugging methods in the page object
- Issues:
  - 
- Next Steps:
  - Compleat the Validate product sort by price sort scenario

## 2025-11-08 — Session 1
- Context:
  - Build Validate product sort by price sort scenario with data tables and parameterization
- Actions:
  - updated Cucumber plugin settings to add custom folder structure
  - Removed Cucumber (Gherkin) Support plugin because it was conflicting with the official Cucumber Plugin 
  - Refactored login step defs to use optional text
  - Installed cucumber-stories/cucumber-datatable for handling list inside of datatable
  - Added a docs-as-code folder to expand on my thought process outside this process doc.
  - Moved my decision notes around test ids to its own ADR (Architecture Decision Record)
  - Built the sort step for the product page.
  - Used a data table to iterate through sort options
  - Isolated the product title lists and logged them with a custom step definition for debugging
- Findings/Decisions:
  - Discovered [[optional text](https://github.com/cucumber/cucumber-expressions?tab=readme-ov-file#optional-text)] and alternative text that can be used in Gherkin steps syntax
  - Research: Debugging Playwright with Cucumber-JS — see docs/research/2025-11-08-playwright-cucumber-debugging.md
  - Researched documentation patterns like ADRs

- Issues:
  - ...
- Next Steps:
  - Build the step that validates the list order against the sort order

## 2025-11-09 — Session 1
- Context:
  - Finish Validate product sort by price scenario by adding the step that validates the list order against the sort order 
- Actions:
  - Built the data table with all sort options and expected product list orders
  - Built validate sort order method on the product page object
  - Incorporated the validation method into the step definition and added the step to the feature
  - Removed unused npm package
  - cleaned up comments and logs
- Findings/Decisions:
  - Used a basic string method to turn the lists in the datatable to arrays for comparison
    - this eliminated the need for the cucumber-datatable library
- Issues:
  - ...
- Next Steps:
  - tbd

## Template for New Entries
```
## YYYY-MM-DD — Session N
- Context:
  - ...
- Actions:
  - ...
- Findings/Decisions:
  - ...
- Issues:
  - ...
- Next Steps:
  - ...
```
