---
title: Location for Common UI Methods (e.g., fillByTestId)
status: draft
created: 2025-11-08
updated:
authors: you
---

## Context / Problem

We currently have a shared step in `steps/common.steps.ts` that fills inputs by test id. The behavior is useful across pages, but the implementation detail (calling `getByTestId` directly) lives inside step definitions. This makes reuse from page objects or other helpers awkward and couples step files to low‑level selectors.

## Goals

- Centralize common UI actions (fill, click, assert) to reduce duplication
- Keep feature files readable while hiding selector mechanics
- Keep page objects cohesive and easy to change

## Non‑Goals

- Replace the Page Object pattern
- Decide every helper name; this RFC scopes where such helpers live and how they are accessed

## Proposal

Introduce a thin, reusable helper layer for common UI actions, consumed by both step definitions and page objects.

Recommended structure:

- Add `support/ui-helpers.ts` exporting small, stateless functions:
  - `fillByTestId(page, testId, value)`
  - `clickByTestId(page, testId)`
  - `textsByTestId(page, testId): Promise<string[]>`
  - `expectByTestIdContains(page, testId, text)` (optional)

Usage:

- Step files call helpers directly (keeps steps slim and readable)
- Page objects may either:
  - a) Continue to encapsulate their own actions, or
  - b) Delegate to helpers for consistency in cross‑page behaviors

Rationale:

- Helpers promote reuse across multiple pages and steps
- Keeps selectors centralized via `getByTestId` convention configured in hooks
- Avoids over‑stuffing page objects with very generic capabilities

## Alternatives Considered

1) BasePage class in `pages/base.page.ts`
   - Pros: OO cohesion; derived pages inherit helpers
   - Cons: Inheritance coupling; helpers are sometimes page‑agnostic

2) Keep logic in steps only
   - Pros: Minimal structural change
   - Cons: Poor reuse from pages or other utilities; duplication grows

3) Export constants-only selector maps and duplicate actions
   - Pros: Clear selector ownership per page
   - Cons: Action duplication remains

## Risks / Trade‑offs

- Too many low‑level helpers can create a parallel API to Playwright; keep helpers small and purposeful
- Ensure helpers don’t hide waits or retries in ways that mask flaky selectors

## Rollout / Migration

- Step 1: Add `support/ui-helpers.ts` and move the current “fill by test id” logic there
- Step 2: Update `steps/common.steps.ts` to call the helper
- Step 3: Opportunistically adopt helpers in page objects where it reduces duplication

## Open Questions

- Do we also provide assertion helpers (e.g., `toHaveText` wrappers), or prefer raw `expect` calls in steps/pages?
- Should we add telemetry/logging to helpers for better diagnostics in CI?

## Decision & Follow‑ups

- Pending review. If accepted, capture the selector policy in an ADR (see ADR: Use test IDs as primary selector method).

