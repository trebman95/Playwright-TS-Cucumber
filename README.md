# Sample Playwright Automation Test

## System Requirements

node >= v18.5.x

npm >= v7


## Setup

// Install Visual Studio Code (or any editor)

https://code.visualstudio.com/download


// Install Node.js

https://nodejs.org/en/download


```bash
git clone https://github.com/automationExamples/Playwright-Cucumber-Exercise.git
npm install
npx playwright install
```

### Recommended vscode extensions

Cucumber v1.7.0

Cucumber (Gherkin) Support enhanced for Behat


## Instructions
To run the test
```bash
npm run test
```

After running, to generate the cucumber report (cucumber_report.html)
```bash
npm run report
```

It is not expected that you complete every task, however, please give your best effort 

You will be scored based on your ability to complete the following tasks:

- [x] Install and setup this repository on your personal computer
- [x] Complete the automation tasks listed below

### Tasks
- [x] Modify the scenario 'Validate the login page title' from [login.feature](features/login.feature#8) which runs but fails. Determine the cause of the failure and update the scenario to pass in the test
- [x] Extend the scenario 'Validate login error message' from [login.feature](features/login.feature#10) which runs and passes but is missing a step. Extend the scenario to validate the error message received.
- [x] Modify and extend the 'Validate successful purchase text' from [purchase.feature](features/purchase.feature#6) with steps for each comment listed. Consider writing a new steps.ts file along with an appropriate page.ts
- [x] Modify and extend the 'Validate product sort by price sort' from [product.feature](features/product.feature#6) with steps for each comment listed. Utilize the Scenario Outline and Examples table to parameterize the test
- [x] Extend the testing coverage with anything you believe would be beneficial

## Implemented Tests

All four required tasks are complete, plus additional bonus coverage. The full suite runs **9 scenarios (38 steps)**, all passing.

### Required tasks
- **Login page title** ([login.feature](features/login.feature)) — corrected the expected title to "Swag Labs" so the failing scenario passes.
- **Login error message** ([login.feature](features/login.feature)) — added a step asserting the locked-out user's error banner.
- **Successful purchase flow** ([purchase.feature](features/purchase.feature)) — implemented the full checkout (cart → checkout → customer info → continue → finish → order confirmation) via a new [purchase.steps.ts](steps/purchase.steps.ts) and [purchase.page.ts](pages/purchase.page.ts).
- **Product price sort** ([product.feature](features/product.feature)) — parameterized the price (low→high / high→low) sort using a Scenario Outline and Examples table.

### Bonus coverage
Added to cover important paths the original suite missed:

- **Parameterized login errors** ([login.feature](features/login.feature)) — a Scenario Outline validating the "Username is required" and "Password is required" errors for empty credentials. Reuses the existing error-message validation to demonstrate data-driven testing.
- **Successful login happy-path** ([login.feature](features/login.feature)) — confirms a valid login lands on the inventory page and renders all 6 products (the suite previously had no positive login assertion).
- **Checkout required-field validation** ([purchase.feature](features/purchase.feature)) — confirms the checkout form blocks continuing without customer info, asserting the "First Name is required" error.
