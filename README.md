# Sample Playwright Automation Test

This project demonstrates UI test automation using Playwright, Cucumber (BDD), and TypeScript.

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


### Instructions
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

- [X] Install and setup this repository on your personal computer
- [X] Complete the automation tasks listed below

### Tasks
- [X] Modify the scenario 'Validate the login page title' from [login.feature](features/login.feature#8) which runs but fails. Determine the cause of the failure and update the scenario to pass in the test
- [X] Extend the scenario 'Validate login error message' from [login.feature](features/login.feature#10) which runs and passes but is missing a step. Extend the scenario to validate the error message received.
- [X] Modify and extend the 'Validate successful purchase text' from [purchase.feature](features/purchase.feature#6) with steps for each comment listed. Consider writing a new steps.ts file along with an appropriate page.ts
- [X] Modify and extend the 'Validate product sort by price sort' from [product.feature](features/product.feature#6) with steps for each comment listed. Utilize the Scenario Outline and Examples table to parameterize the test
- [X] Extend the testing coverage with anything you believe would be beneficial

### Solution Implementation
The following tasks were completed and extended:

Login
- Fixed login page title validation
- Implemented locked-out user error validation

### Purchase Flow (End-to-End)
-Add product to cart
-Navigate to cart
-Proceed to checkout
-Fill checkout information
-Complete purchase
-Validate success message

### Product Sorting
-Implemented sorting validation using Scenario Outline
-Supported:
     Price (low to high)
     Price (high to low)
-Extracted prices dynamically from UI
-Compared actual values with sorted results

### Additional Test Coverage
- Cart icon item count validation

### Framework Design

The project follows automation best practices:
-Page Object Model (POM)
-Cucumber BDD structure
-Separation of concerns:
-Feature files → business scenarios
-Step definitions → test logic
-Page objects → UI interactions
-Reusable methods and stable selectors (id, data-test) are used to improve maintainability.

### Test Report
An HTML test report is included:
cucumber_report.html
The report can be opened directly in a browser.
### Notes
Sorting validation is implemented dynamically (no hardcoded values)
Stable selectors (id, data-test) are used where applicable
The framework is designed to be scalable and maintainable
### Summary
This project demonstrates an end-to-end automation solution with structured test design, reusable components, and extended test coverage.