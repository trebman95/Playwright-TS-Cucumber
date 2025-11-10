---
title: How Cucumber-JS Loads Step Definitions
status: consolidated
created: 2025-11-08
updated:
---

Questions
- How do common steps reach all feature files?
  - Answer: Cucumber-JS loads all step files matching the configured globs for every run; see "Configuration".

## Configuration

- `cucumber.js` sets the require globs and TypeScript support:
  - `--require-module ts-node/register` enables TypeScript in step files
  - `--require './steps/**/*.ts'` loads every step definition file
  - `--require './hooks/**/*.ts'` loads global hooks

Implications
- Shared steps in `steps/common.steps.ts` are available to all features.
- Step text must be unique across all loaded files; duplicate expressions cause ambiguity errors.
