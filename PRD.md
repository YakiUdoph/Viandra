# Viandra product requirements

## Product

**Viandra** — “Know what changed before work moves forward.”

Viandra helps people identify important instructions that disappear, change, or become contradictory as work passes between people, teams, or AI agents. It is industry-independent and supports one universal workflow.

## Core user journey

1. Enter original instructions.
2. Add at least two successive handoff messages.
3. Select **Trace instructions** to make one bounded, server-side SERV Reasoning request.
4. Review an evidence-backed requirement timeline, including the earliest supported problematic handoff.
5. Inspect classifications and exact source evidence.
6. Review and edit a proposed corrected handoff.
7. Copy the correction or export the investigation.

## Classification vocabulary

`PRESERVED`, `MISSING`, `CHANGED`, `CONTRADICTED`, and `UNCLEAR`.

All classifications are model interpretations open to human review. Exact quotations are validated against submitted source text; quote validation does not validate the interpretation.

## Product boundaries

Viandra is not a generic chatbot, summarizer, autonomous approval system, compliance or safety certification tool, or replacement for human judgment. It must never invent approvals, payments, confirmations, permissions, completed work, or external facts, and it must not automatically send or approve anything.

## Acceptance priorities

Working product, security, reliability, design, then extras. The complete acceptance checklist is maintained in `TASKS.md` and must remain truthful.

## Initial repository state

On 2026-11-14, the repository contained only an uncommitted `.git` directory with no `HEAD`. No prototype, dependencies, tests, documentation, SERV integration, or deployment configuration existed.
