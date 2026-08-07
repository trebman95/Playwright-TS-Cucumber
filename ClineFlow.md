# Cline Flow Guide for Playwright‑Cucumber Exercise

## Project Structure Overview
```
Playwright-Cucumber-Exercise/
│   playwrightUtilities.ts      # Helper functions to initialise/close the browser and expose a shared Page
│   ClineFlow.md                # <-- **This file** – instructions for the Cline AI agent
│
├─ pages/                       # Page‑object classes (encapsulate locators & actions)
│   ├─ login.page.ts
│   └─ product.page.ts
│
├─ steps/                       # Cucumber step definitions – glue code that drives the tests
│   ├─ common.steps.ts
│   ├─ login.steps.ts
│   └─ product.steps.ts
│
└─ ... (configuration, feature files, etc.)
```

### Primary Tools Present
| Tool/module | Purpose |
|------------|----------|
| **playwrightUtilities.ts** | Provides `initializeBrowser`, `initializePage`, `getPage`, and `closeBrowser`. These are the only entry points for managing the Playwright `Browser` and `Page` instances across the project. |
| **Page objects (`pages/*.ts`)** | Each class holds private locator strings (e.g. `userNameField`, `addToCart`) and public methods that perform actions using `this.page.locator(...)`. |
| **Step definitions (`steps/*.ts`)** | Cucumber `Given`, `Then`, etc. that import the utilities and page objects, instantiate the objects with `getPage()`, and delegate to the page‑object methods. |

## Flow Pattern (Pages ➜ Steps)
1. **Test begins** – a Cucumber `Given` step from `common.steps.ts` opens a URL using `getPage().goto(url)`. The shared `Page` instance is created beforehand by calling the exported `initializeBrowser` and `initializePage` helpers (usually in a test‑setup hook).
2. **Step → Page Object** – Each subsequent step imports the relevant page‑object class and calls a method on a fresh instance, e.g.:
   ```ts
   await new Login(getPage()).loginAsUser('standard_user');
   ```
   The page‑object contains **locators** defined as class fields and performs actions with `this.page.locator(<selector>)`.
3. **Assertions** – Validation steps call methods like `validateTitle` or `validateErrorMessage` that internally retrieve a locator, check visibility/text, and throw descriptive errors if the expectation is not met.
4. **Teardown** – After the scenario finishes, the framework (or a global `AfterAll` hook) calls `closeBrowser()` to shut down the Playwright instance.

## Assessment Locator
The only *assessment*‑type locator currently present is the **error message locator** used to verify login failures:
```ts
const errorLocator = this.page.locator('[data-test="error"]');
```
- It is defined inside `Login.validateErrorMessage` (see `pages/login.page.ts`).
- The step `Then('I should see error message {string}', …)` triggers this validation.
- When adding new assessments, follow the same pattern:
  1. Define a **private readonly** selector string (or inline locator) in the relevant page class.
  2. Expose a public validation method that checks visibility and text content.
  3. Add a corresponding Cucumber step that calls the method.

## Adding New Pages or Steps
1. **Create a page object** in `pages/`:
   ```ts
   export class NewPage {
     private readonly page: Page;
     // example locator
     private readonly submitBtn = 'button[id="submit"]';

     constructor(page: Page) { this.page = page; }

     async clickSubmit() { await this.page.locator(this.submitBtn).click(); }
   }
   ```
2. **Create a step** in `steps/` that uses the page object:
   ```ts
   Then('I submit the form', async () => {
     await new NewPage(getPage()).clickSubmit();
   });
   ```
3. **Re‑use existing utilities** – never instantiate a new `Browser` or `Page` inside steps; always rely on `getPage()`.

## Summary for Cline
- **Pattern**: *Given* → open URL → *Then* steps → page‑object methods → assertions.
- **Locators** are stored as class fields in the page objects; validation (assessment) locators follow the same convention.
- **Tools**: only `playwrightUtilities.ts` functions are needed for browser lifecycle management.
- When extending the suite, keep the folder conventions, reuse `getPage()`, and add new locators/validation methods in the relevant page class.

---
*This guide is intended for the Cline AI agent to understand the project's navigation, locator conventions, and available helper utilities.*