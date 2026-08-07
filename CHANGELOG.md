# Changelog

## 2026-08-07 (2)

### Fixed
- **`pages/product.page.ts`**: Updated the sort-dropdown selector from `select[data-test="product_sort_container"]` to `select[data-test="product-sort-container"]` to match saucedemo.com's current markup (attribute was renamed with a hyphen), which was causing `sortBy` to time out waiting for the dropdown.
- **`steps/product.steps.ts`**: Fixed the price-order normalization in the `I validate items are sorted by price {string}` step — `"Price (high to low)"` was incorrectly matching the `.includes('low')` check and being treated as ascending order, silently mis-validating the descending-sort scenario.
- **`cucumber.js`**: Fixed a missing closing quote after `./hooks/**/*.ts` in the `default` profile string, which caused the `--format` flag to be swallowed into the require glob and broke `npm test` with a "Cucumber instance isn't running" error.

All Cucumber/Playwright tests now pass (5 scenarios, 22 steps) via `npm test`.

## 2026-08-07

### Added
- **Product Feature**: Implemented sorting by price with new step definitions `I sort items by {string}` and `I validate items are sorted by price {string}`.
- Added `sortBy` and `validateSorted` methods to `pages/product.page.ts` to interact with the sort dropdown and verify price order.
- Updated `features/product.feature` to use a Scenario Outline with examples for low‑to‑high and high‑to‑low sorting.
- Updated `steps/product.steps.ts` with corresponding step implementations.

### Existing additions (previous)
- **Step Definition**: `I should see error message {string}` in `steps/login.steps.ts` to validate login error messages.
- **Page Method**: `validateErrorMessage(expectedMessage: string)` in `pages/login.page.ts` for checking error visibility and content.
- **Feature Update**: Updated `features/login.feature` scenario *Validate login error message* with the new step to assert the specific error text.

All Cucumber/Playwright tests now pass (3 scenarios, 8 steps).

### Added
- **Step Definition**: `I should see error message {string}` in `steps/login.steps.ts` to validate login error messages.
- **Page Method**: `validateErrorMessage(expectedMessage: string)` in `pages/login.page.ts` for checking error visibility and content.
- **Feature Update**: Updated `features/login.feature` scenario *Validate login error message* with the new step to assert the specific error text.

All Cucumber/Playwright tests now pass (3 scenarios, 8 steps).