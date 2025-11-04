# Playwright-Cucumber-Exercise

This project demonstrates end-to-end testing for the [saucedemo.com](https://www.saucedemo.com/) web application using Playwright and Cucumber with TypeScript.

## Project Structure

```
features/           # Cucumber feature files (Gherkin syntax)
hooks/              # Cucumber hooks for browser/page lifecycle
pages/              # Page Object Model classes
steps/              # Step definitions for feature steps
playwrightUtilities.ts # Playwright browser/context/page helpers
playwright.config.ts   # Playwright configuration
```

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

## Running Tests

- **Run all Cucumber tests:**

  ```sh
  npm test
  ```

- The browser will run in headed mode so you can watch the tests.

## Given Tasks -

- [x] Modified the scenario **'Validate the login page title'** from `login.feature` and resolved the failure.
- [x] Extended the scenario **'Validate login error message'** from `login.feature` to validate the error message received.
- [x] Modified and extended the scenario **'Validate successful purchase text'** from `purchase.feature` with all required steps and supporting files.
- [x] Modified and extended the scenario **'Validate product sort by price sort'** from `product.feature` using a Scenario Outline and Examples table for parameterization.

## Troubleshooting

- If you see `net::ERR_CONNECTION_RESET`, check your internet connection and firewall settings.
- If steps are reported as "undefined", ensure the step definition exists and matches the feature file.
- For dependency issues, run `npm install` and `npx playwright install`.

# Addition Test Coverage

## Menu Coverage

An additional menu test is included to increase coverage. This test verifies:

- The menu can be opened
- The "Reset App State" option works
- The cart is empty after resetting app state

Step definitions for these actions are implemented in `steps/menu.steps.ts` using the `Menu` page object.
