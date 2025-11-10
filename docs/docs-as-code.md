# Docs-as-Code Guide

This project uses a docs-as-code approach: documentation lives in the repo, reviewed via PRs, written in Markdown, and organized by purpose. This guide explains the formats used, provides copy‑and‑paste templates, and links to high‑quality industry resources.

## Why Docs-as-Code
- Keeps docs close to code and decisions
- Enables review/versioning alongside implementation
- Makes project context discoverable for new contributors or reviewers

## Document Types

### Research / Findings Notes
Use for exploratory work, spikes, and comparisons. Start with a single Questions section so readers can quickly see status. List all questions (ideally in the order they arose). Only answered questions include a short indented answer and, if helpful, a link to the section that elaborates it.


Research filename convention: `docs/research/YYYY-MM-DD-topic.md` (date = creation date). 

Recommended structure
```
---
title: <Topic>
status: draft | consolidated
created: YYYY-MM-DD
---

Questions
- <question>
  - Answer: <short answer>; see "<section>".
- <question>

## Findings
<What you learned; evidence, notes, links>

## Experiments
<Commands, code snippets, results>

## Recommendations
<What you’d do next and why>

## References
- <links>
```

### RFC (Request for Comments)
Use for proposing a non-trivial change to architecture, tooling, or standards. Invites feedback and convergence before implementation.

RFC filename convention: `docs/rfcs/YYYY-MM-topic.md` (date = creation date)

Template
```
---
title: <Concise proposal title>
status: draft | in-review | accepted | rejected
created: YYYY-MM-DD
authors: <names/handles>
---

## Context / Problem
<What problem are we solving? Why now?>

## Goals
- <goal 1>
- <goal 2>

## Non-Goals
- <explicitly out of scope>

## Proposal
<Design/approach, examples, diagrams>

## Alternatives Considered
- <alt 1: pros/cons>
- <alt 2: pros/cons>

## Risks / Trade-offs
<Where could this hurt? Mitigations?>

## Rollout / Migration
<Phases, owners, validation plan>

## Open Questions
- <question>

## Decision & Follow-ups
<Record outcomes; link to ADR when finalized>
```

### ADR (Architecture Decision Record)
Use to record a decision and rationale once agreed. Short, durable, easy to scan later.

ADR filename convention: `docs/adr/NNNN-title.md` (sequential number)

Template
```
---
title: <Decision title>
status: proposed | accepted | superseded | deprecated
created: YYYY-MM-DD
links:
  - <related files/PRs/docs>
---

## Decision
<One-paragraph statement of what we decided>

## Context
<Forces, constraints, background>

## Consequences
- <positive/negative consequence>

## Rationale
<Why this over alternatives>

## Status / Next Steps
<What remains to do; superseding doc if any>
```

## Conventions
- Dates in filenames reflect creation time; This makes chronological browsing easy and avoids filename churn.
- Keep docs concise; link to code and external sources rather than duplicating content.
- Prefer small, focused docs over sprawling ones; cross-link them.

## Doc Status (Lifecycle Signals)
- Status lives in frontmatter (`status:`) and communicates maturity/expectations.
- Research notes: `draft` (actively evolving), `consolidated` (synthesized, stable summary), `archived` (kept for history).
- RFCs: `draft` (authoring), `in-review` (seeking feedback), `accepted` (approved for implementation), `rejected` (not moving forward), `superseded` (replaced by another RFC).
- ADRs: `proposed`, `accepted`, `superseded`, `deprecated` — following MADR conventions.
- Rationale: these align with common industry practices (MADR for ADRs; typical RFC workflows in open-source projects like Rust/React).

References for status conventions
- MADR (ADR statuses): https://adr.github.io/madr/#status
- Rust RFC life cycle (example): https://github.com/rust-lang/rfcs#rfc-life-cycle
- React RFCs (example): https://github.com/reactjs/rfcs


## Further Reading (Industry References)
- ADRs
  - Michael Nygard
    -  [“Documenting Architecture Decisions” (original blog post)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
  - Joel Parker Henderson
    - MADR (Markdown ADR) [templates/examples](https://adr.github.io/madr/)
    - [What is an architecture decision record?](https://github.com/joelparkerhenderson/architecture-decision-record)
- Documentation frameworks
  - [Diátaxis](https://diataxis.fr/)
    - documentation system (tutorial / how-to / explanation / reference)
    - Better Docs with Diátaxis [video](https://www.youtube.com/watch?v=0BqucaRwHhA)
  - Anne Gentle 
    - [Docs Like Code](https://www.docslikecode.com/)

- Thought leadership
  - [Andrew Harmel-Law](https://martinfowler.com/articles/scaling-architecture-conversationally.html)
  - [Martin Fowler](https://martinfowler.com/)
  - [ThoughtWorks Technology Radar](https://www.thoughtworks.com/radar) — commentary on engineering practices: 

