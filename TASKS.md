# Tasks

Status legend: `[x]` verified complete, `[ ]` incomplete, `[-]` not currently verifiable.

## Governance and discovery

- [x] Inspect initial repository state.
- [x] Create the seven required project documents without inventing prior work.
- [x] Verify accessible official OpenServ competition and SERV documentation.
- [x] Record unknown competition requirements explicitly.

## Product

- [x] Add the original premium editorial landing experience and direct workspace CTA described in `DESIGN.md`.
- [x] Add an explicitly illustrative semantic-drift hero and responsive scroll story without fabricated analysis claims.
- [x] Restyle the existing workspace without changing its API contract, validation, SERV behavior, or functional controls.
- [x] Verify reduced-motion behavior, keyboard focus entry, responsive stacking, and horizontal-overflow safeguards for the transformed interface in automated Edge checks.
- [x] Original instructions can be entered.
- [x] At least two handoffs can be entered and more can be added.
- [x] Request and input-size validation works.
- [x] Genuine documented SERV integration is implemented server-side.
- [x] Configure GPT-6 Luna Chat Completions function calling with the required `reasoning_effort: "none"`.
- [x] Refine the semantic rubric for faithful paraphrases, material changes, direct contradictions, and reported completion without hardcoded examples.
- [x] Returned data and exact evidence quotations are validated.
- [x] Supported classifications and first problematic handoff are displayed.
- [x] Findings are inspectable and open to human review.
- [x] Proposed correction is reviewable and editable.
- [x] Copy action is implemented.
- [x] Export action produces a safe structured report.
- [x] Errors are handled without fake results or leaked secrets.
- [x] SERV rejection diagnostics preserve upstream status and allowlisted error codes without exposing raw upstream text.
- [x] Public analysis calls have per-IP throttling plus a per-instance hourly SERV-call budget; global distributed protection remains a deployment requirement.
- [x] Complete deterministic browser-path QA for validation, three handoffs, classifications, evidence, earliest issue, correction editing, copy, export, missing credentials, 390px overflow, and keyboard entry (2026-11-14; no live request).
- [ ] Complete hands-on physical-device and assisted-technology QA; automated Edge coverage does not prove this complete.

## Verification

- [x] Deterministic tests cover required classifications and paraphrase behavior.
- [x] Tests cover first-problem detection, reported completion, exact and invalid evidence, malformed output, missing key, validation, limits, export, Vercel parity, and secret handling.
- [x] Final accuracy targeted tests pass (4/4 on 2026-11-14).
- [x] Complete deterministic suite passes (28/28 on 2026-11-14 after the accuracy refinement).
- [x] Post-transformation deterministic suite passes (29/29 on 2026-11-14; no live SERV request).
- [x] Production build passes (2026-11-14).
- [x] Final submission-pass deterministic suite passes (29/29 on 2026-11-14; no live SERV request).
- [x] Final submission-pass production build verifies five required files (2026-11-14).
- [x] Final release verification passes (28/28 complete tests and five-file production build on 2026-11-14; no live request).
- [x] Offline HTTP 400 audit re-verified the current GPT-6 Luna request and strict function schema against official OpenServ and OpenAI documentation (2026-11-14; no live request).
- [x] One genuine live SERV analysis succeeded (user-confirmed on 2026-11-14; semantic issue observed).
- [-] Post-refinement live accuracy succeeds (not tested; requires explicit authorization, a rotated key, and funded credits).
- [x] Local HTTP page, health, and missing-key failure paths are checked.

## Release and submission

- [x] README begins with accurate testing instructions.
- [x] Required environment variables and credit behavior are documented.
- [x] Vercel routing and server-only environment requirements are verified, and a protected production deployment is ready at `https://viandra.vercel.app`.
- [x] Vercel Authentication protects all deployments, including production; authenticated homepage and health checks passed.
- [x] Deploy the redesign revision from GitHub `main` to the existing protected Vercel project; deployment `dpl_H2CisNJJAGChs9krd1fWy1c4shos` is `READY` and the new headline is verified.
- [ ] Provide an anonymously accessible production demo when its funded endpoint can be protected safely; the current deployment requires Vercel Authentication.
- [x] Configure platform-level access control before production launch (Vercel Authentication for all deployments).
- [ ] Revoke or rotate the accidentally exposed SERV API key before any further use.
- [ ] If live analysis is enabled later, add only the rotated `SERV_API_KEY` as a Vercel Production Secret; use separate limited credentials for any non-production environment.
- [x] `.gitignore`, the 27-file prospective initial commit, and non-disclosing secret patterns were audited; generated files and local environments are excluded.
- [x] Stage and inspect the initial commit, create it, and publish the public repository at `https://github.com/YakiUdoph/Viandra`.
- [x] Truthful submission materials and checklist are prepared.
- [x] Final quality-gate and compliance limitations are recorded.
- [x] Prepare a real-footage 90–120-second narration, shot list, and unposted X draft.
- [x] Create an evidence-weighted 100-point readiness assessment with explicit gates.
- [ ] Record and publish an accessible real-application demo video.
- [ ] Publish the X post with real repository and demo/video links.
- [ ] Complete the official submission form with the X post URL before the deadline.

## Focused post-submission quality and security audit

- [x] Re-audit secret isolation, request and response validation, safe errors, timeout behavior, and per-instance throttling without a live SERV call.
- [x] Reject omitted or wrongly typed evidence while preserving valid `null` evidence for a missing requirement.
- [x] Add deterministic three-handoff dropped-and-restored coverage and retain the earliest supported issue.
- [x] Serve the finished UI's bundled fonts from the local server.
- [x] Align the local byte ceiling with the documented maximum valid Unicode input.
- [x] Recheck first-Tab focus, reduced motion, 390px overflow, three handoffs, and user-visible validation/configuration errors in local Edge.
- [x] Preserve the historical 80/100 release score and add a transparent current quality/security rubric.
- [x] Run the final post-audit suite (32/32 passing) and production build (five required files verified) once after changes.
- [ ] Complete physical-device and assisted-technology testing.
- [-] Verify post-refinement live SERV accuracy; not run because paid access was not authorized.
- [-] Verify revocation or rotation of the previously exposed key; credential changes remain a human action.
- [-] Verify an official submission receipt and final public URLs; no evidence was available in the repository.

## Controlled post-audit release

- [x] Review the complete uncommitted audit diff for accidental scope, credential candidates, and regressions; no staged files, public UI changes, credential candidates, or `diff --check` errors were found.
- [x] Re-run the complete deterministic suite against the reviewed tree (32/32 passing) and production build (five required files verified).
- [-] Confirm that post-submission deployment updates are permitted; the official event page and targeted official-source searches contain no explicit policy, and the submission form was not inspectable.
- [x] Record that continued pre-deadline development is explicitly authorized by the project owner, without claiming organizer approval or guaranteed eligibility.
- [ ] Commit and push the reviewed audit changes to the existing GitHub `main` branch.
- [ ] Stage, verify, and promote the reviewed release to the existing Vercel project without changing production environment variables.
- [ ] Verify the released homepage, bundled fonts, honest health status, and safe invalid-request behavior without a valid analysis request.
