# How to test

Viandra has no third-party runtime dependencies. It requires Node.js 20 or newer.

## Install and configure

```powershell
# No dependency download is required. This is optional if you want npm metadata initialized locally.
npm.cmd install --ignore-scripts

Copy-Item .env.example .env
```

Set `SERV_API_KEY` in the server environment. `.env` is ignored by Git, but the dependency-free server does not load `.env` automatically; either export the variable in your shell/platform or use your platform’s secret settings. `SERV_MODEL` defaults to `gpt-6-luna` and may be deliberately overridden with another ID from the official SERV catalog.

If a key has been exposed outside the application, revoke or rotate it in OpenServ before any deployment or further use. Do not reuse the exposed value.

`SERV_REQUESTS_PER_HOUR` defaults to 20 and caps paid SERV calls per running process/serverless instance. It supplements the per-IP throttle but is not global or distributed protection. A public production deployment should also configure platform-level global rate limiting or access control.

## Run locally

```powershell
$env:SERV_API_KEY = "your-server-side-key"
npm.cmd start
```

Open `http://localhost:3000`. The key never enters browser code. The health check at `/api/health` reports only whether SERV is configured, never the key.

## Run deterministic tests

```powershell
npm.cmd test
```

Tests use mocked SERV-format responses and spend no API credits. They cover input validation and limits, all five classifications, faithful paraphrase, first-problem detection, unsupported evidence, malformed and incomplete model output, missing credentials, upstream authentication/credit errors, report export structure, and secret non-disclosure.

## Run the production build

```powershell
npm.cmd run build
```

This verifies required application files and creates static assets in `dist/`.

## Test the real SERV workflow

1. Create an OpenServ account and API key at `https://console.openserv.ai/`.
2. Add funded credits and set `SERV_API_KEY` only in the server environment.
3. Start Viandra and open the browser.
4. Enter original instructions and at least two handoffs, then select **Trace instructions** once.
5. Confirm the returned timeline against the submitted source, including any “unsupported” evidence warning.

Each click makes one bounded request to the documented SERV chat-completions endpoint. It may consume paid SERV credits. Viandra never calls SERV on keystrokes and does not automatically retry. The user confirmed one genuine live GPT-6 Luna analysis on 2026-11-14; it returned three requirements and exposed an over-literal semantic classification issue. The prompt was refined afterward, but that refinement has not been tested live. No live request was made during the final accuracy review.

## Deploy

The included `vercel.json` and `api/analyze.js` support a Vercel deployment with the browser assets in `public/` and the analysis route as a serverless function:

```powershell
vercel.cmd link
vercel.cmd env add SERV_API_KEY production --type secret
vercel.cmd env add SERV_MODEL production --type config
vercel.cmd env add SERV_REQUESTS_PER_HOUR production --type config
vercel.cmd --prod
```

Rotate the exposed key before adding its replacement as the Production Secret. Do not reuse that production key for Preview or Development; use a separate limited credential if those environments need live SERV access. These commands are instructions only; deployment was not attempted. Check the target account, project, environment variables, global abuse controls, and billing before deploying. Other Node 20+ hosts can run `npm start` with the same server-side variables.

Before the initial public commit, stage only the 27 reviewed source and documentation files, then inspect `git status --short`, `git diff --cached --name-only`, and the staged content locally for secrets. `node_modules/`, `dist/`, `.env*` except `.env.example`, `.vercel/`, coverage, and logs are ignored. No initial commit or public repository has been created yet.

## Known limitations

- One user-confirmed live SERV analysis succeeded, but the refined semantic rubric has not been tested live and model accuracy remains case-dependent.
- A SERV API key was exposed outside the application and must be revoked or rotated before deployment or further use.
- No production URL exists yet.
- Automated browser or device testing was unavailable; responsive and keyboard behavior is implemented in source but still needs hands-on browser QA.
- The in-memory per-IP throttle and hourly SERV-call budget are per process/instance, not a distributed abuse-control system. Public production still needs platform-level global rate limiting or access control.
- Exact evidence matching is case- and whitespace-sensitive. A match proves quotation presence, not interpretation correctness.
- Proposed corrections are model drafts. Users must review them; Viandra cannot independently guarantee that a semantic statement was not inferred.
- The workflow is intentionally stateless and provides no accounts, saved investigations, collaboration, or audit certification.
- Competition eligibility and prohibited-practice details were not visible on the official event page and remain unknown.
- The referenced Serial Hackathon Winner Playbook was unavailable in the repository.

## What Viandra does

Viandra helps people identify important instructions that disappear, change, or become contradictory as work passes between people, teams, or AI agents. It traces each original requirement through successive handoff messages, identifies the earliest supported problem, and prepares a correction for human review.

It is industry-independent. It is not a generic chatbot, compliance or safety certification tool, autonomous approval system, or replacement for human judgment.

## Implementation status

### Implemented

- Original instructions and two to eight ordered handoffs.
- One explicit, bounded server-side SERV Reasoning request using the official OpenAI-compatible chat-completions contract.
- Forced structured tool output, schema checks, exact source-quotation checks, and safe failures.
- `PRESERVED`, `MISSING`, `CHANGED`, `CONTRADICTED`, and `UNCLEAR` timelines.
- Independently computed earliest problematic handoff from returned classifications.
- Editable proposed correction, copy action, and safe JSON report export.
- Input limits, bounded timeout, explicit upstream errors, security headers, no content persistence, and in-memory throttling.
- Responsive, accessible source-and-trace workspace with reduced-motion support.

### Tested

- 28 deterministic Node tests pass.
- Production asset build passes.
- Local page and health endpoint return successfully.
- Missing SERV configuration returns an honest HTTP 503 without fabricated results.
- One genuine live GPT-6 Luna analysis was reported by the user; it returned structured results but revealed a semantic accuracy issue that prompted the current instruction refinement.

### Not yet tested

- A post-refinement live SERV accuracy check.
- Automated end-to-end browser behavior and mobile device rendering.
- A real Vercel or other production deployment.

### Planned only if needed

- Distributed rate limiting for multi-instance production use.
- Optional user-controlled persistence and collaboration.
- Additional export formats after the core workflow is validated with users.

## SERV integration

The server sends one `POST` request to `https://inference-api.openserv.ai/v1/chat/completions` with `Authorization: Bearer $SERV_API_KEY`, a required system message, the selected catalog model, a bounded completion limit, and a forced `return_requirement_trace` function. The response must include the expected tool call and every handoff for every requirement. Model output is treated as untrusted throughout.

See `COMPETITION.md` for verified rules and uncertainties, and `SUBMISSION.md` for truthful draft submission materials.
