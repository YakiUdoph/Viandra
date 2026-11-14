# Viandra submission kit

Draft only. Nothing in this file has been published or submitted.

## A. Short product description

Viandra traces important requirements through successive handoff messages, showing what stayed intact, what disappeared or changed, and the earliest point where work began to diverge.

## B. Problem statement

Critical instructions often degrade as work moves between people, teams, tools, and AI agents. A faithful paraphrase can look different, while a small wording change can reverse an approval condition, deadline, restriction, or customer preference. Manual comparison is slow and makes the origin of a mistake hard to locate.

## C. Solution

Users paste original instructions and two or more handoffs. Viandra extracts important requirements, traces each one across the chain, classifies every transition, validates returned quotations against the source, and highlights the earliest problematic handoff. It then prepares a correction for human review and provides a portable investigation report.

## D. Why SERV Reasoning is necessary

This is a semantic task rather than a keyword diff: faithful paraphrases must remain preserved, while contradictions and material changes need contextual judgment. SERV Reasoning performs that bounded interpretation in one structured request. Viandra then validates structure and quotation provenance before showing results.

## E. Originality and differentiation

Viandra focuses on where meaning first drifted across successive free-text handoffs. Unlike SOP capture or a requirements-to-test matrix, it produces an evidence-linked narrative of instruction survival and a reviewable next message. This is a positioning statement, not a guarantee that no similar product exists.

## F. Technical architecture

- Dependency-free Node.js 20 server and responsive HTML/CSS/JavaScript client.
- Stateless `POST /api/analyze` endpoint with validation, size limits, timeout, throttling, and safe errors.
- One server-side SERV chat-completions request with a required system prompt and forced structured function output.
- Strict response checks, exact substring evidence validation, and locally computed first-problem handoff.
- Vercel-compatible serverless endpoint plus a portable Node server.

## G. Implemented features

- Ordered multi-handoff input and validation.
- All five required classifications.
- Inspectable evidence timeline and earliest problem.
- Unsupported-quotation warnings.
- Editable proposed correction, copy, and JSON export.
- Responsive accessible UI, security headers, secret isolation, bounded request behavior, and explicit failure states.
- Twenty-eight passing deterministic tests and a passing production asset build.

## H. Known limitations

The user confirmed one genuine live SERV analysis that returned structured results and exposed an over-literal semantic classification issue. The prompt refinement made afterward has not been tested live. A Vercel production deployment exists at `https://viandra.vercel.app`, but Vercel Authentication protects all deployments and the URL is not an anonymous public demo. No automated browser/device test has been completed. The rate limiter is per instance. Exact quote checks do not prove the semantic interpretation. Proposed corrections require human review. A SERV key was exposed outside the application and must be rotated before further use; it was not configured in Vercel, so live analysis is disabled there. No customer validation, revenue, traction, or production usage is claimed.

## I. Demo walkthrough

1. Open Viandra and select **Load example**.
2. Show the original: “Do not dispatch until payment is confirmed.”
3. Show Handoff 1 preserving the condition and Handoff 2 saying “Dispatch immediately.”
4. Select **Trace instructions** and explain that this makes one real SERV request.
5. Open the payment requirement and inspect exact evidence across both handoffs.
6. Point to **First issue: Handoff 2** and the `CONTRADICTED` classification.
7. Show the human-review warning and an unsupported-evidence state if available in a separate deterministic demonstration.
8. Review and edit the proposed correction, copy it, then export the JSON investigation.
9. State the boundaries: no automatic sending, approvals, certification, or persistent storage.

Do not publish this demo until the exposed SERV key has been rotated, the refined prompt has been checked with an explicitly authorized live request, and the deployed environment has been verified.

## J. Suggested X announcement

> Built Viandra for the OpenServ SERV Hackathon 02 Open Track. It traces how important instructions survive—or drift—across successive handoffs, pinpoints the first problematic message, and keeps every finding tied to source evidence for human review. [demo] [public repo] #SERVHackathon

Replace placeholders with real public URLs. Do not post automatically.

## K. Submission checklist

- [ ] Confirm organizer eligibility and any kickoff-only restrictions.
- [x] Complete one genuine live SERV analysis (user-confirmed on 2026-11-14; semantic issue observed).
- [ ] Revoke or rotate the exposed SERV API key before any further use.
- [ ] Run one explicitly authorized post-refinement live accuracy check with synthetic data.
- [ ] Perform desktop, keyboard, and mobile browser QA.
- [x] Stage the reviewed 27-file initial commit, inspect staged content for secrets, and create the first commit.
- [x] Create and verify an authentication-protected Vercel production deployment with no SERV key configured.
- [ ] Provide an accessible public demo only after its funded endpoint and abuse controls are safe; the current production URL requires Vercel Authentication.
- [x] Make the repository public and confirm the published release contains no detected credential.
- [ ] Record a real demo link or video.
- [ ] Review this write-up against actual final behavior.
- [ ] Publish the X announcement with real links before the deadline.
- [ ] Complete the submission form and include the X-post URL by November 15, 2026 at 23:59 UTC.
