# Architecture

## Historical starting point

The repository was empty at initial inspection on 2026-11-14. Viandra was deliberately implemented as a small, dependency-free Node.js application rather than introducing a framework, database, authentication system, background worker, or multi-provider orchestration layer. This section records that origin; the sections below describe the current system.

## Current system

### Browser application

`public/index.html`, `public/styles.css`, and `public/app.js` provide the responsive landing experience and investigation workspace. The browser collects original instructions and two to eight ordered handoffs, sends one explicit analysis request, renders validated results as text, and supports correction editing, copying, and JSON export.

No API key is sent to browser code. No user content is persistently stored by the application.

### Shared analysis core

`src/core.js` owns the request limits, classification contract, strict function-tool schema, SERV request construction, model-output parsing, exact source-quotation checks, and deterministic first-problem selection. Both server runtimes use this shared core so local and Vercel behavior do not drift.

The supported classifications are:

- `PRESERVED`: faithful meaning, including valid paraphrase;
- `CHANGED`: a material non-conflicting alteration;
- `CONTRADICTED`: a direct conflict;
- `MISSING`: relevant meaning is absent;
- `UNCLEAR`: genuine ambiguity prevents a stronger conclusion.

### Local server

`server.js` serves the browser assets and exposes `GET /api/health` and `POST /api/analyze`. It validates the request, applies input and rate limits, calls the shared handler, and returns security-conscious JSON errors.

### Vercel functions

`api/health.js` and `api/analyze.js` provide equivalent serverless routes. `vercel.json` defines routing and security headers. Production uses conventional `public/` static assets and does not depend on the generated local `dist/` directory.

### SERV Reasoning boundary

The server makes one bounded `POST` request to the documented SERV chat-completions endpoint for each explicit analysis. The request uses a required system message, `gpt-6-luna` by default, `reasoning_effort: "none"`, a completion limit, and a forced strict `return_requirement_trace` function.

SERV performs semantic extraction and comparison. Viandra does not trust the response automatically: the function call, nested arrays, classifications, handoff coverage, and evidence fields must satisfy local validation before rendering.

## Trust boundaries

- Browser input is untrusted and length-bounded.
- Submitted instructions are treated as data and cannot replace the system contract.
- SERV output is untrusted until structural and exact-quotation validation succeeds.
- Evidence marked supported must be an exact contiguous substring of the corresponding submitted source.
- The earliest problematic handoff is computed locally from validated classifications, not accepted from the model.
- `SERV_API_KEY` remains server-side and must never be logged, returned, embedded, or committed.
- Errors expose allowlisted diagnostic metadata, not raw upstream responses or user instructions.
- Copy and export are explicit user actions; rendering uses text, not unsafe HTML.
- The application is stateless and does not claim audit certification or semantic infallibility.

## Request flow

1. The browser validates basic completeness and sends the original plus ordered handoffs.
2. The server validates structure, count, individual size, and combined size.
3. Per-IP and per-instance limits are checked.
4. If no server-side credential exists, the server returns `503 SERV_NOT_CONFIGURED` before any external request.
5. One SERV request asks for strict function output.
6. Viandra parses and validates the response, verifies quotations, and computes first-problem positions.
7. The browser renders the safe result and keeps the proposed correction editable.

## Verification strategy

Deterministic Node tests use mocked SERV-format responses and local fixtures; they never spend credits. They cover request validation, tool-schema invariants, model parsing, all classifications, evidence checking, first-problem selection, failure mapping, export structure, secret isolation, Vercel parity, and the landing/workspace contract.

Browser QA uses deterministic interception where needed so copy, export, classifications, and earliest-issue rendering can be exercised without a paid call. A live semantic check is a separate, explicitly authorized activity.

## Deployment and protection

The public source repository is `https://github.com/YakiUdoph/Viandra`. The existing Vercel project is `viandra`; Vercel Authentication protects all deployments, including production. No `SERV_API_KEY` is configured there, so production analysis is intentionally disabled.

The in-memory throttles are per process or serverless instance. They are not global distributed abuse protection. Any future anonymously accessible funded endpoint requires an appropriate platform-level control and a newly rotated credential.
