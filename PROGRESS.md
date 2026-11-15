# Progress

## 2026-11-14 — Initial inspection

- Observed an empty repository containing only `.git`.
- `git status` reported no commits on `main`; `HEAD` did not exist.
- Found no framework, dependencies, entry points, UI, endpoints, SERV integration, validation, tests, environment configuration, deployment configuration, or documentation.
- Therefore, the previously reported prototype and ten unit tests do not exist in this checkout.
- Found none of the seven mandatory governance documents and created them before application implementation.
- Recorded that the referenced Serial Hackathon Winner Playbook is unavailable locally; no contents were invented.

## Verification status at initial inspection

At that point, no application tests, build, live SERV request, deployment, or submission had been performed.

## 2026-11-14 — Release candidate implementation

- Built a dependency-free Node.js web application with original-instruction input, two to eight ordered handoffs, responsive results, selectable requirement details, editable correction, copy, and JSON export.
- Implemented one-call SERV Reasoning integration using the officially documented chat-completions URL, bearer authentication, required system message, verified `gpt-6-luna` catalog ID, bounded output, and forced function output.
- Added request validation, 24,000-character combined limit, 30-second timeout, explicit upstream error mapping, in-memory throttling, security headers, stateless handling, and no user-content logging.
- Added strict response validation, exact substring evidence support flags, and local computation of each earliest problematic handoff.
- Added a 15-test deterministic suite. `npm.cmd test` passed 15/15 in 223 ms with no live API calls.
- Ran `npm.cmd run build`; it passed and created `dist/` after verifying four required production files.
- Started the local server and observed the home page return HTTP 200 with the Viandra title, `/api/health` report `ok: true` and `servConfigured: false`, and a valid analysis request without a key return HTTP 503 with `SERV_NOT_CONFIGURED`.
- Ran JavaScript syntax checks on the browser app, local server, and Vercel handler; all exited successfully.
- Searched source for exposed key assignments, unsafe HTML insertion, dynamic evaluation, old user-facing branding, and production localhost paths. No material issue was found; the only localhost strings are local-server construction/output.
- Verified official competition rules and SERV API behavior available on the named official sites; recorded unavailable eligibility/prohibition details as unknown.
- Completed a bounded adjacent-product review and prepared truthful submission copy and checklist.
- Applied current Vercel deployment guidance, verified `vercel.json` parses, observed Vercel CLI 65.11.0 is installed, and added serverless health-route parity. The project was not linked or deployed.

## Current verification limits

- No paid live SERV request was made; credit use remains unauthorized.
- No deployment, public repository change, X post, or hackathon submission was attempted.
- No automated browser/device runner was available. Responsive and accessibility behavior is implemented but still needs hands-on desktop, keyboard, and mobile QA.
- The referenced Serial Hackathon Winner Playbook remains unavailable locally.

## 2026-11-14 — Final release-blocker audit

- Re-read all seven governance documents and preserved the existing Playbook limitation without inventing unavailable content.
- Re-verified `gpt-6-luna` in the official OpenServ model catalog. Official chat-completions documentation states that the endpoint works with every catalog model and supports OpenAI-format `tools`, object-form forced `tool_choice`, and `tool_calls` completion behavior.
- Found no verified incompatibility in the existing SERV URL, model ID, forced function call, or `choices[0].message.tool_calls[].function.arguments` parser; those paths were not rewritten.
- Added a default 20-call hourly SERV budget per running process/serverless instance, applied only after request validation and before the paid call. This supplements the existing per-IP throttle and is explicitly not global or distributed protection.
- A public deployment still requires platform-level global rate limiting or access control.
- Ran the post-change verification once: `npm.cmd test` passed 18/18 tests with zero failures, and `npm.cmd run build` passed after verifying five required production files. No live SERV request was made.

## 2026-11-14 — SERV request rejection diagnosis

- Re-read all seven governance documents and preserved the existing Playbook limitation.
- Compared the exact request builder with the official SERV API overview, chat-completions reference, and current model catalog. The documented endpoint accepts the configured model, required system message, messages, completion limit, reasoning effort, tools, forced object-form tool choice, and forwarded OpenAI parameters; no request incompatibility was verified.
- Preserved the existing public error messages and HTTP mapping while retaining the actual upstream HTTP status as structured diagnostic metadata.
- Added allowlisted extraction for standard upstream error codes/types. Raw upstream messages, unknown codes, credentials, authorization headers, source instructions, and request bodies are never forwarded to browser users.
- Added deterministic coverage for HTTP 400, 403, 404, 422, unexpected structured responses, and unreadable error bodies. No live SERV request was made.
- Ran `node --test test/viandra.test.js` once: 25/25 tests passed with zero failures. Ran `npm.cmd run build` once: the production build passed and verified five required files.

## 2026-11-14 — HTTP 400 invalid-request diagnosis

- Re-read all seven governance documents and preserved the unavailable-Playbook limitation.
- Confirmed from official OpenServ documentation that chat completions accepts `reasoning_effort`, `max_completion_tokens`, OpenAI-format function tools, and forced object-form `tool_choice`, and that `gpt-6-luna` is in the SERV catalog.
- Confirmed from official OpenAI GPT-6 Luna documentation that Chat Completions function calling is supported only when `reasoning_effort` is `"none"`. Viandra was sending a forced function call with `"low"`, an objectively invalid model/endpoint combination capable of producing HTTP 400.
- Changed only `reasoning_effort` from `"low"` to `"none"`; retained the model, endpoint, completion cap, strict tool, forced tool choice, schema, and parser.
- Audited the complete strict schema: every object sets `additionalProperties: false`, every declared property is required, nullable evidence uses the supported union form, and the non-fine-tuned model supports the schema’s array limits. Added deterministic assertions for these invariants.
- Ran `node --test test/viandra.test.js` once: 25/25 tests passed. Ran `npm.cmd run build` once: the build passed and verified five required files. No live SERV request, deployment, or credit use occurred.
- A live success remains unverified. The generic historical 400 does not prove this incompatibility was the only rejection cause.

## 2026-11-14 — HTTP 400 offline re-verification

- Re-read all seven governance documents and re-audited the current serialized request against the current official OpenServ Chat Completions/model catalog and official OpenAI GPT-6 Luna, Chat Completions, function-calling, and Structured Outputs documentation.
- Reconfirmed the verified incompatibility recorded above: GPT-6 Luna Chat Completions function calling requires `reasoning_effort: "none"`; the current builder and deterministic test already contain that correction, so no further application change was justified.
- Reconfirmed that `max_completion_tokens: 2200`, strict function placement, forced nested `tool_choice`, and the complete schema are documented-compatible. Every schema object forbids additional properties, every property is required, the nullable evidence field uses a supported type union, and the array bounds are supported for this non-fine-tuned model.
- Ran `node --test test/viandra.test.js` once: 25/25 tests passed. Ran `npm.cmd run build` once: the build passed and verified five required files. No live SERV request, API credit use, deployment, UI change, or dependency change occurred.
- A live success remains unverified, and the available generic `invalid_request_error` does not establish whether the prior reasoning-effort mismatch was the only upstream rejection cause.

## 2026-11-14 — Final accuracy and submission-readiness review

- The user confirmed that one genuine live GPT-6 Luna request succeeded with `reasoning_effort: "none"`, returned three structured requirements, identified the payment and delivery problems at Handoff 2, and generated a correction. That live output also treated harmless wording too literally and treated a reported-ready state as missing.
- Refined only the system classification rubric: compare semantic meaning rather than word overlap; reserve `CHANGED` for material non-conflicting alterations and `CONTRADICTED` for direct conflicts; use `MISSING` only when no relevant statement exists; and treat reported readiness/completion as an unverified statement that may be `PRESERVED` or `UNCLEAR`, not automatically `MISSING` or verified fact.
- Preserved the five classifications, strict schema, exact quotation validation, local earliest-problem computation, and human-review boundary. Added no example-specific logic or deterministic classification override.
- Added deterministic coverage for the generic accuracy scenario, prompt invariants, exact evidence, earliest supported problem, malformed responses, server-side key exclusion from request/export bodies, and Vercel health/missing-key parity. These mocks validate application behavior and prompt structure, not future model accuracy.
- Bounded release review found no material reproducible defect in the responsive layout, native keyboard controls, copy correction, JSON export, safe error rendering, server-side key handling, or Vercel endpoint parity. Hands-on desktop, keyboard, and mobile QA remains outstanding.
- Secret scan found no nonempty API-key assignment, private-key block, non-example environment file, or browser-asset secret reference. One bearer-like literal is a deterministic dummy test fixture. The repository currently has zero tracked files and 31 untracked workspace files, so a clean initial commit and public-history review remain required.
- The user reported that a SERV key was exposed outside the application. Its safety is not assumed; revocation or rotation is mandatory before deployment or further use. No credential was printed, stored, committed, revoked, or modified during this review.
- Re-checked the official Edition 02 event page: public repository, demo link or video, short write-up, SERV Reasoning use, track selection, X post, and submission form remain required by November 15, 2026 at 23:59 UTC. The available inspection did not reveal the form's complete field list or additional kickoff-only rules.
- Ran the targeted accuracy/parity tests once: 4/4 passed. Ran the complete suite once: 28/28 passed. Ran the production build once: five required files verified. No live SERV request, credit consumption, deployment, GitHub push, social post, or submission occurred.
- The refined rubric has not been tested live. Semantic classifications remain model interpretations and may still be inconsistent or wrong; exact quotation support does not validate those interpretations.

## 2026-11-14 — Final release-preparation verification

- Re-read all seven governance documents. The referenced Serial Hackathon Winner Playbook remains unavailable locally, so no missing content was reconstructed.
- Verified the current classification rubric, strict function schema, exact contiguous-substring evidence check, safe model-output parsing, and deterministic earliest-problem computation. No classification or evidence defect was reproduced.
- Performed a static interface review: native controls, labels, skip link, visible focus states, live status/error regions, responsive one-column breakpoints, long-text wrapping, reduced-motion handling, and text-only model rendering remain present. No browser or browser-automation runtime is installed, so hands-on desktop, keyboard, mobile, and horizontal-overflow QA remains unverified.
- Verified `.gitignore` excludes dependencies, generated assets, local environment files, Vercel metadata, coverage, and logs while retaining `.env.example`. The repository still has no `HEAD`, zero tracked files, zero staged files, and 27 reviewed prospective commit files.
- A non-disclosing workspace scan found no nonempty API-key assignments, private-key blocks, non-example environment files, or browser secret references. The only bearer-like literal is the deterministic test fixture. Because the key was exposed outside the repository, it still must be revoked or rotated and is not considered safe.
- Verified Vercel's conventional `public/` assets and `api/analyze.js`/`api/health.js` functions, security headers, server-only environment access, and deterministic endpoint-parity coverage. Updated deployment instructions to store the rotated production key as a Vercel Secret and non-sensitive model/budget values as Config variables. Per-instance throttles remain insufficient global protection for an exposed funded public endpoint.
- Ran `npm.cmd test` once: 28/28 tests passed with zero failures. Ran `npm.cmd run build` once: five required production files were verified. No defect required an application-code change.
- No live SERV request, paid API use, deployment, Git staging or commit, GitHub push, public post, or hackathon submission occurred.

## 2026-11-14 — Protected Vercel production deployment

- Verified that local `main` was clean and exactly matched published GitHub `main` commit `59d87df39da9e3d6b25265091c8dba78057882cc` before deployment.
- Confirmed Vercel CLI 65.11.0 was installed and authenticated as `yakiudoph`.
- Created the `viandra` Vercel project without a Git-triggered deployment, enabled Vercel Authentication with `deploymentType: "all"`, and independently verified that setting before deploying.
- Ran `npm.cmd run build` once; the production build passed and verified five required files.
- Verified that the Vercel production environment contained no environment variables. The exposed SERV key was not read, copied, reused, or configured; live SERV analysis remains disabled.
- Deployed the clean GitHub-matching checkout to production. Deployment `dpl_FiSb6zhtdbkuf3H9sJppYcFGNU6B` reached `READY` and was aliased to `https://viandra.vercel.app` with Vercel Authentication reported on the deployment.
- Used authenticated Vercel access to verify the homepage and `/api/health`; the health response was `{"ok":true,"servConfigured":false}`. An unauthenticated request redirected to Vercel Authentication. `/api/analyze` was not invoked, and no SERV credits were spent.
- The protected deployment is not an anonymous public demo. Key rotation, any future replacement secret, hands-on browser QA, post-refinement live accuracy testing, and hackathon submission remain incomplete.

## 2026-11-14 — Premium visual transformation

- Studied the supplied Glaze motion reference locally and used only general presentation cues: large editorial hierarchy, airy composition, staged entrances, a compact floating header, and timeline-to-statement choreography. No Glaze branding, artwork, objects, video, or proprietary asset was added to the product.
- Updated `DESIGN.md` and `TASKS.md` before implementation, preserving the unavailable-Playbook limitation and all existing product boundaries.
- Added an original landing journey with the required headline and direct workspace CTA, an explicitly illustrative source-to-contradiction hero, a responsive evidence story, and a premium restyle of the functional investigation workspace.
- Self-hosted official SIL Open Font License files for Inter Tight and IBM Plex Mono; added no package or runtime dependency.
- Preserved all existing analysis controls, DOM IDs, API behavior, SERV configuration, validation, evidence handling, copy/export actions, and security controls. No live SERV request or paid API call was made.
- Automated Edge checks verified a true 390px viewport with no horizontal overflow, a visible primary CTA that reaches the workspace, successful example loading with two handoffs, skip-link first focus, and visible reduced-motion content without reveal choreography. Representative desktop and compact visual captures were inspected. Hands-on physical-device and full manual interaction QA remain incomplete.
- Added a deterministic landing/workspace contract test. `npm.cmd test` passed 29/29 tests, and `npm.cmd run build` passed with five required production files verified.
- No deployment was performed. The existing protected Vercel production deployment does not include this visual transformation yet.

## 2026-11-14 — Final release and submission pass

- Re-read and audited all seven governance documents plus the competition and submission records. Preserved the complete recorded project history and the explicit limitation that the Serial Hackathon Winner Playbook is unavailable; no missing guidance was reconstructed.
- Rewrote the README around an immediately executable three-command test path followed by the product problem, mechanism, evidence-first differentiation, SERV role, verified behavior, deployment state, and limitations.
- Updated the current architecture, verified competition gates, judge-facing submission description, 105-second real-footage narration and shot list, X draft, and evidence-weighted readiness assessment. No customer, revenue, live-result, public-video, X-post, or submission claim was invented.
- Ran deterministic local Edge QA without SERV access. It verified blank-input validation, the initial two handoffs, adding a third handoff, the missing-credential failure, `PRESERVED` and `CONTRADICTED` rendering, exact quotations, earliest issue, correction editing, copy, downloaded JSON export, first-Tab skip-link focus, and no horizontal overflow at 390px. The result fixture was explicitly local; paid SERV calls were zero.
- Ran `npm.cmd test` once: 29/29 tests passed with zero failures. Ran `npm.cmd run build` once: five required production files were verified.
- Confirmed local `HEAD` and published GitHub `main` both identified redesign commit `e3851cf0653ac0be12788d082b5a09c2a0178fbc`; application source was unchanged during this pass.
- Re-verified the existing Vercel `viandra` project, Vercel Authentication with `deploymentType: "all"`, and an empty production environment-variable set before deployment. The exposed key was not read, reused, or configured.
- Deployed the verified redesign revision to the existing project. Deployment `dpl_H2CisNJJAGChs9krd1fWy1c4shos` reached `READY`, reported Vercel Authentication, and was aliased to `https://viandra.vercel.app`.
- Through authenticated Vercel access, verified the production headline “Every handoff. Every detail. Accounted for.” and `/api/health` response `{"ok":true,"servConfigured":false}`. `/api/analyze` was not invoked.
- Readiness is 80/100. Remaining human gates are key revocation/rotation, one authorized post-refinement live check, real-footage recording and publication, the X post, and the official form.

## 2026-11-14 — Focused post-submission quality and security audit

- Re-read the complete governance and release record before changing application code. The referenced Serial Hackathon Winner Playbook remains unavailable; no retroactive guidance was invented.
- Confirmed that the prior 80/100 score was a release-preparation snapshot. No submission receipt, final demo URL, or X-post URL was available, so current external submission status remains NOT VERIFIED.
- Found and fixed three bounded defects: the local server did not serve the redesign's bundled fonts; its 32 KiB raw-body ceiling rejected some valid Unicode inputs within the documented character limits; and omitted or wrongly typed model evidence was silently normalized instead of rejected.
- Added deterministic regression coverage for a three-handoff requirement that is preserved, dropped, and restored; valid missing evidence; stable earliest-issue selection; malformed evidence; local font delivery; and maximum valid multibyte input. These fixtures validate application behavior, not live SERV semantic accuracy.
- Ran guarded local Edge checks with `/api/health` confirming `servConfigured: false` before the error-path request. First Tab focused the skip link; reduced-motion mode produced automatic scrolling and visible, untransformed reveal content; a 390px viewport had no horizontal overflow; three handoffs rendered; and blank-input and missing-credential errors were visible.
- Physical-device and assisted-technology testing remain NOT VERIFIED. Per-IP and per-instance throttles remain non-distributed and insufficient for an anonymously accessible funded endpoint. Key revocation/rotation and post-refinement live accuracy remain NOT VERIFIED.
- Ran the complete deterministic suite once after changes: 32/32 tests passed with zero failures. Ran the production build once: five required files were verified.
- No SERV call, deployment, credential change, social post, or submission mutation was performed.

## 2026-11-14 — Controlled post-audit release gate

- Reviewed the complete audit diff before release. The ten-file audit scope contains no staged changes or public UI asset edits; `git diff --check` reported no content errors, and a non-disclosing scan found no credential candidates.
- Re-ran the complete deterministic suite against the reviewed working tree: 32/32 tests passed with zero failures. Re-ran the production build: five required files were verified.
- Checked the official Edition 02 page, its submission instructions, and targeted official-source searches for a rule allowing deployment updates after form submission. No explicit permission or prohibition was found, and the official Typeform was not inspectable through the available tooling.
- Because post-submission update permission could not be confirmed, stopped before commit, push, or Vercel deployment as required. No production request, SERV request, environment change, X-post change, or form resubmission occurred.
