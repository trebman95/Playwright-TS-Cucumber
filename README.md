# Playwright-TS-Cucumber: BDD Test Automation Framework

![Tests](https://github.com/trebman95/Playwright-TS-Cucumber/actions/workflows/tests.yml/badge.svg)

An end-to-end test automation framework built with **Playwright**, **TypeScript**, and **Cucumber (Gherkin)**. Test scenarios are written in plain language so both technical and non-technical stakeholders can read them, while the step definitions and page objects keep the underlying code organized and reusable.

The suite runs against [SauceDemo](https://www.saucedemo.com/), a public demo e-commerce site, and covers login, product sorting, and the full checkout flow.

## Highlights

- **BDD with Gherkin:** feature files describe behavior in plain English, with reusable step definitions behind them
- **Page Object Model:** page interactions are separated from test logic to reduce duplication and make tests easier to maintain
- **Data-driven tests:** Scenario Outlines with Examples tables run the same scenario across multiple inputs (for example, four product sort orders)
- **CI/CD:** a GitHub Actions workflow runs the suite headless on every push and pull request
- **Reporting:** generates an HTML Cucumber report after each run

## What's Covered

| Feature | Scenarios |
| --- | --- |
| **Login** | Page title validation; locked-out user error message |
| **Product sorting** | Price (high to low), price (low to high), name (A to Z), name (Z to A), each validating all 6 items |
| **Purchase** | End-to-end checkout: add to cart, enter customer details, complete the order, and confirm the "Thank you for your order!" message |

## Tech Stack

- [Playwright](https://playwright.dev/)
- TypeScript
- [Cucumber.js](https://github.com/cucumber/cucumber-js) (Gherkin)
- GitHub Actions
- Node.js

## Project Structure

```
├── features/            # Gherkin feature files (login, product, purchase)
├── steps/               # Step definitions
├── hooks/               # Before/After hooks for browser setup and teardown
├── playwrightUtilities.ts   # Browser initialization
├── .github/workflows/   # CI pipeline
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 7 or later

### Installation

```bash
git clone https://github.com/trebman95/Playwright-TS-Cucumber.git
cd Playwright-TS-Cucumber
npm install
npx playwright install
```

### Running the Tests

```bash
npm run test
```

The browser opens visibly when you run locally, so you can watch the tests execute.

### Generating the Report

After a run, create the HTML report (`cucumber_report.html`):

```bash
npm run report
```

## Continuous Integration

Tests run automatically through GitHub Actions on every push to `main` and on every pull request. In CI the browser runs in headless mode (detected through the `CI` environment variable that GitHub sets), so no display is needed. Results are available in the **Actions** tab of this repository.

## Acknowledgements

Started from the [automationExamples/Playwright-Cucumber-Exercise](https://github.com/automationExamples/Playwright-Cucumber-Exercise) template, then extended with additional scenarios, page objects, and a CI pipeline.
