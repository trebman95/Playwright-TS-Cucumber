# Playwright-Cucumber Test Automation Framework

## Project Overview

This repository contains my implementation of an end-to-end test automation framework using Playwright and Cucumber for the SauceDemo web application. I completed this using behavior-driven development principles, implementing comprehensive test scenarios for login, product sorting, and purchase workflows.

## System Requirements

- Node.js >= v18.5.x
- npm >= v7

## Installation and Setup

```bash
git clone https://github.com/Nikita-w123/Playwright-Cucumber-Exercise.git
cd Playwright-Cucumber-Exercise
npm install
npx playwright install
```

## Running Tests

To execute all test scenarios:
```bash
npm run test
```

To run a specific feature file:
```bash
npx cucumber-js features/login.feature
npx cucumber-js features/product.feature
npx cucumber-js features/purchase.feature
```

To generate the Cucumber HTML report:
```bash
npm run report
```

The report will be generated as `cucumber_report.html` in the project root directory.

## Project Structure

```
Playwright-Cucumber-Exercise/
├── features/           # Gherkin feature files
│   ├── login.feature
│   ├── product.feature
│   └── purchase.feature
├── steps/             # Step definitions
│   ├── common.steps.ts
│   ├── login.steps.ts
│   ├── product.steps.ts
│   └── purchase.feature.ts
├── pages/             # Page Object Models
│   ├── login.page.ts
│   ├── product.page.ts
│   └── purchase.page.ts
├── hooks/             # Cucumber hooks
│   └── globalHooks.ts
├── support/           # World configuration
│   └── world.ts
└── playwrightUtilities.ts
```

## Implementation Approach

### Task 1: Fix Failing Login Page Title Validation

**Problem:** The scenario 'Validate the login page title' was failing because the expected title did not match the actual page title.

**Solution:** I analyzed the failure by running the test and examining the error output. The test expected "Labs Swag" but the actual page title was "Swag Labs". I corrected the expected value in the feature file to match the actual title.

**Files Modified:**
- `features/login.feature` - Updated expected title from "Labs Swag" to "Swag Labs"

### Task 2: Extend Login Error Message Validation

**Problem:** The scenario 'Validate login error message' was incomplete and missing a step to validate the actual error message displayed.

**Solution:** I implemented a new step definition to capture and validate the error message displayed when a locked-out user attempts to login. I used Playwright's locator API to find the error message element and verify its content.

**Implementation:**
1. Added step definition `Then I should see the error message {string}`
2. Located the error element using data-test attribute
3. Validated the error message content matches expected text

**Files Modified:**
- `features/login.feature` - Added validation step
- `steps/login.steps.ts` - Implemented step definition for error validation

### Task 3: Complete Purchase Flow Automation

**Problem:** The purchase feature had multiple TODO comments indicating missing implementation for the complete checkout flow.

**Solution:** I created a comprehensive purchase flow that handles cart management, checkout information entry, and purchase confirmation. I developed a new page object model and corresponding step definitions.

**Implementation Steps:**
1. Created `Purchase` page object class with methods for:
   - Navigating to cart and clicking checkout
   - Filling checkout information (first name, last name, postal code)
   - Completing the purchase
2. Implemented step definitions for:
   - Proceeding to checkout
   - Filling checkout information with parameterized data
   - Verifying items in checkout overview
   - Validating successful purchase confirmation

**Files Created:**
- `pages/purchase.page.ts` - Page object for purchase workflow
- `steps/purchase.feature.ts` - Step definitions for purchase scenarios

### Task 4: Parameterize Product Sorting Tests

**Problem:** The product sorting scenario needed to be parameterized using Scenario Outline and Examples tables to test multiple sort options efficiently.

**Solution:** I refactored the test to use Cucumber's Scenario Outline pattern with Examples tables. I implemented validation logic for both price and name sorting in ascending and descending order.

**Implementation:**
1. Created parameterized Scenario Outline for price sorting (low to high, high to low)
2. Implemented validation method that:
   - Extracts all product prices from the page
   - Parses price strings to numeric values
   - Compares actual order with expected sorted order
   - Provides detailed error messages on mismatch
3. Extended coverage by adding name sorting scenarios (A-Z, Z-A)

**Files Modified:**
- `features/product.feature` - Converted to Scenario Outline with Examples tables
- `pages/product.page.ts` - Added validation methods for price and name sorting
- `steps/product.steps.ts` - Implemented parameterized step definitions

### Task 5: Extended Test Coverage

**Additional Scenarios Implemented:**

1. **Logout Functionality Test**
   - Validates complete user session lifecycle
   - Verifies successful logout returns user to login page
   - Ensures session cleanup

2. **Name Sorting Validation**
   - Added comprehensive name sorting tests (A-Z and Z-A)
   - Validates alphabetical ordering of product names
   - Uses same parameterization pattern as price sorting

## Architectural Decisions and Problem Solving

### Implementation of Custom World

**Problem Encountered:** Initially, the project used global singleton pattern for browser and page instances through `playwrightUtilities.ts`. This approach had limitations:
- No state isolation between scenarios
- Difficult to share data between steps
- Not suitable for parallel test execution
- Limited scalability for complex test scenarios

**Solution:** I implemented Cucumber's World pattern by creating a `CustomWorld` class that extends Cucumber's World interface. This architecture provides:

**Benefits:**
1. **Isolated State:** Each scenario gets its own browser context and page instance
2. **Shared Context:** Test data can be stored and accessed across steps within a scenario
3. **Page Object Integration:** Page objects are initialized once per scenario and available throughout
4. **Better Memory Management:** Resources are properly cleaned up after each scenario

**Implementation Details:**

```typescript
export class CustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  
  // Page Objects
  loginPage: Login;
  productPage: Product;
  purchasePage: Purchase;
  
  // Shared test data
  testData: {
    username?: string;
    products?: string[];
    orderTotal?: number;
  };
}
```

The World instance is initialized before each scenario and destroyed after, ensuring clean state for every test execution.

### Handling ERR_CONNECTION_RESET Network Failures

**Problem Encountered:** During test execution, I encountered intermittent `ERR_CONNECTION_RESET` errors when navigating to the application URL. These network failures caused test flakiness and false negatives.

**Root Cause Analysis:**
- Network instability or temporary connection issues
- Server-side connection resets
- Timeout issues with default Playwright navigation settings

**Solution Implemented:** I developed a multi-layered approach to handle network failures gracefully:

**1. Retry Logic with Exponential Backoff**

I implemented automatic retry mechanism in the navigation step:
- Maximum 3 retry attempts for each navigation
- Exponential backoff strategy (1s, 2s, 3s between retries)
- Detailed logging for debugging retry attempts
- Clear error messages when all retries are exhausted

```typescript
for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        return;
    } catch (error) {
        // Retry logic with exponential backoff
    }
}
```

**2. Enhanced Browser Configuration**

I configured the browser context with improved network handling:
- Increased navigation timeout to 60 seconds
- Changed wait strategy from 'load' to 'domcontentloaded' for faster page ready state
- Enabled HTTPS error ignoring for test environments
- Added browser launch arguments for better stability

**3. Benefits of This Approach:**
- Automatic recovery from transient network issues
- Reduced test flakiness
- Better visibility into retry attempts through logging
- Configurable retry count and backoff strategy
- No manual intervention required for intermittent failures

### Selector Strategy and Reliability

**Challenge:** Initial implementation used CSS class selectors which proved unreliable when elements were not found.

**Solution:** I migrated to data-test attributes wherever available. This provides:
- More stable selectors that don't break with UI changes
- Clear intent that elements are specifically for testing
- Better maintainability as test attributes are explicitly defined

Example:
```typescript
// Before: div[class="inventory_item_name"]
// After: div[data-test="inventory-item-name"]
```

## Design Patterns Used

### Page Object Model (POM)
I implemented the Page Object Model pattern to encapsulate page-specific locators and actions. Each page class contains:
- Private locator definitions
- Public methods for user actions
- Validation methods for assertions

This separation ensures:
- Reusability of page actions across different scenarios
- Easy maintenance when UI changes
- Clear separation between test logic and page interactions

### Behavior-Driven Development (BDD)
I followed BDD principles using Cucumber's Gherkin syntax:
- Human-readable test scenarios
- Business-focused language in feature files
- Clear separation between behavior specification and implementation
- Parameterized tests using Scenario Outline for data-driven testing

## Testing Strategy

### Test Coverage

I implemented comprehensive test coverage across three main functional areas:

1. **Authentication and Authorization**
   - Valid login scenarios
   - Error handling for locked-out users
   - Session management and logout functionality

2. **Product Management**
   - Product listing and display
   - Sorting functionality (price and name)
   - Data validation for sorted results

3. **E-commerce Workflow**
   - Add to cart functionality
   - Checkout process
   - Form validation
   - Purchase completion and confirmation

### Validation Approach

I implemented robust validation mechanisms:
- **Title Validation:** Verifies correct page titles
- **Error Message Validation:** Confirms appropriate error messages
- **Sorting Validation:** Algorithmic verification of sort order
- **Element Presence:** Ensures expected elements are displayed
- **Text Content Validation:** Validates specific text content matches expectations

## Technical Implementation Details

### Asynchronous Handling
All step definitions and page methods use async/await patterns for proper handling of Playwright's asynchronous operations. This ensures:
- Proper waiting for page actions to complete
- Clean error propagation
- Readable and maintainable code

### Type Safety
I leveraged TypeScript throughout the implementation:
- Strong typing for method parameters
- Interface definitions for World and page objects
- Compile-time error detection
- Better IDE support and autocomplete

### Error Handling
I implemented comprehensive error handling:
- Descriptive error messages with context
- Expected vs actual value reporting
- Retry logic for network operations
- Proper error propagation to test runner

## Challenges and Solutions

### Challenge 1: Understanding Cucumber-Playwright Integration
**Issue:** Initial unfamiliarity with how Cucumber integrates with Playwright in TypeScript.

**Resolution:** I studied the existing codebase structure, researched Cucumber's World concept, and implemented a clean separation between feature files, step definitions, and page objects.

### Challenge 2: Locator Selection
**Issue:** Some locators were not finding elements, causing test failures.

**Resolution:** I inspected the DOM structure, identified correct data-test attributes, and updated all locators to use more reliable selectors. I also added debug logging to verify element counts during development.

### Challenge 3: Network Reliability
**Issue:** Intermittent ERR_CONNECTION_RESET failures causing test instability.

**Resolution:** Implemented retry logic with exponential backoff and enhanced browser configuration for better network handling.

### Challenge 4: Test Data Management
**Issue:** Need to share data between steps within a scenario.

**Resolution:** Implemented Custom World with testData object to store and retrieve data across steps while maintaining isolation between scenarios.

## Best Practices Followed

1. **DRY Principle:** Used Scenario Outline to avoid duplicating test scenarios
2. **Single Responsibility:** Each page object handles only its specific page
3. **Descriptive Naming:** Clear, self-documenting method and variable names
4. **Consistent Structure:** Maintained uniform code structure across all files
5. **Error Messages:** Provided detailed, actionable error messages
6. **Documentation:** Added inline comments for complex logic
7. **Type Safety:** Utilized TypeScript features for compile-time checking

## Future Enhancements

Potential improvements for the framework:
1. Implement parallel test execution using Cucumber's worker threads
2. Add screenshot capture on test failure
3. Integrate with CI/CD pipeline
4. Implement custom reporting with screenshots and detailed logs
5. Add API testing layer for backend validation
6. Implement visual regression testing
7. Add performance monitoring and metrics
8. Create reusable test data factories

## Conclusion

I successfully completed all assigned tasks and extended the test automation framework with robust error handling, comprehensive test coverage, and maintainable code architecture. The implementation follows industry best practices and design patterns, ensuring the framework is scalable, reliable, and easy to maintain. The addition of World pattern and network retry logic significantly improved test stability and reliability.
