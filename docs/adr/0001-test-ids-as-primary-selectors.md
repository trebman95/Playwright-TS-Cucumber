---
title: Use `data-test` IDs as Primary Selector Method
status: accepted
created: 2025-11-08
updated:
links:
  - hooks/globalHooks.ts
  - pages/product.page.ts
---

## Decision

We standardize on `data-test` attributes as the primary selector mechanism for end‑to‑end tests and configure Playwright’s `getByTestId` accordingly. Page objects should declare frequently used test ids near the top of the file for visibility and easy updates.

## Context

- The application consistently exposes stable `data-test` attributes
- We run with Cucumber‑JS, so we configure test id selection in the Cucumber `Before` hook:
  - `selectors.setTestIdAttribute('data-test')`
- Example usage in a page object: `private readonly itemTitleTestId = 'inventory-item-name'` at the top for clarity (see `pages/product.page.ts`).

## Consequences

- Prefer `getByTestId('...')` over brittle CSS/XPath wherever applicable
- Keep a small set of test id constants at the top of page objects when they are reused across methods
- For elements lacking test ids, consider:
  - Adding a `data-test` attribute in the app
  - Falling back to robust role+name or text selectors

## Rationale

- `getByTestId` integrates with Playwright’s auto‑waiting and yields clearer intent
- Localizing ids in page objects makes future renames straightforward

## Status / Next Steps

- Accepted and implemented in `hooks/globalHooks.ts`
- Audit pages/steps to replace ad‑hoc CSS with `getByTestId` where appropriate

