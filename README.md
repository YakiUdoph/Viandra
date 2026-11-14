# How to test

Viandra requires Node.js 20 or newer and has no third-party runtime dependencies.

```powershell
npm.cmd test
npm.cmd run build
npm.cmd start
```

Open `http://localhost:3000`, select **Load example**, and trace the two handoffs. Without `SERV_API_KEY`, the interface and deterministic test suite work, while analysis returns an honest configuration error and makes no paid request. A real SERV run is optional, paid, and should only use a newly rotated key supplied to the server environment.

# Viandra

Every handoff. Every detail. Accounted for.

Viandra traces important instructions as work moves between people, teams, and AI agents. It shows where meaning was preserved, materially changed, directly contradicted, omitted, or left genuinely unclear—and identifies the earliest handoff where a supported problem appeared.

## The problem

Instructions rarely fail all at once. A payment condition becomes “send immediately,” a required approval disappears from a summary, or a careful constraint turns into an ambiguous shortcut. By the time the final output looks wrong, the decisive drift may be several handoffs back.

Comparing only the first and last message hides that origin. Generic text comparison also confuses faithful paraphrase with meaningful change.

## The product

Viandra turns an original instruction set and two to eight ordered handoffs into an evidence-backed requirement timeline. For every requirement it provides:

- a classification at each handoff: `PRESERVED`, `CHANGED`, `CONTRADICTED`, `MISSING`, or `UNCLEAR`;
- an exact quotation from the relevant source text, or an explicit unsupported-evidence warning;
- the earliest problematic handoff, computed locally from the validated classifications; and
- an editable proposed correction for human review, copying, and JSON export.

Viandra is a focused investigation tool, not a generic chatbot, autonomous approval system, or compliance certificate.

## An illustrative example

Original instruction: “Do not dispatch until payment is confirmed.”

Handoff 1: “Wait for payment confirmation before dispatch.” This preserves the meaning even though the wording changes.

Handoff 2: “Dispatch immediately.” This directly conflicts with the original condition. Viandra should surface Handoff 2 as the first problematic handoff and quote the exact supporting text. This example describes the intended workflow; it is not presented as a fabricated live SERV result.

## The user journey

1. Paste the original instructions.
2. Add the handoffs in chronological order.
3. Select **Trace instructions** once.
4. Review each requirement’s evidence and classification timeline.
5. Inspect the earliest supported issue.
6. Edit the proposed correction, copy it, or export the investigation as JSON.

## Why it matters

Instruction drift creates rework, avoidable risk, and slow root-cause analysis wherever decisions cross organizational or agent boundaries. Viandra gives operators, reviewers, and builders a shared explanation of what changed and where to look first. Its value is the traceable investigation—not a claim that a model can replace accountable human judgment.

## How SERV Reasoning enables it

The server makes one bounded request to OpenServ’s OpenAI-compatible chat-completions endpoint. A forced `return_requirement_trace` function asks the selected SERV Reasoning model to extract requirements, compare every ordered handoff, and return structured evidence and explanations.

The model does the semantic reasoning; Viandra enforces the contract. It validates the tool-call structure, checks every evidence quote against the exact submitted source, rejects missing handoffs or malformed classifications, and independently selects the earliest problematic handoff. Model output is always treated as untrusted.

## What makes Viandra different

- It traces the full chain instead of comparing only endpoints.
- It distinguishes faithful paraphrase from material change.
- It requires source-grounded evidence rather than unsupported conclusions.
- It computes first-problem selection outside the model.
- It keeps the correction editable and the final decision with the user.
- It is industry-independent and intentionally small enough to understand and audit.

## Verified functionality

- Original instructions plus two to eight ordered handoffs.
- Structured SERV response parsing and all five classification states.
- Exact source-quotation validation and unsupported-evidence handling.
- Deterministic earliest-issue selection.
- Editable correction, copy action, and safe JSON export.
- Missing-credential handling without a network request.
- Input limits, bounded timeout, safe rendering, security headers, and per-instance throttles.
- Responsive workspace, keyboard skip navigation, and reduced-motion support.
- 29 deterministic automated tests and a production asset build.

The tests use mocks and fixtures and spend no SERV credits. One earlier live GPT-6 Luna analysis was reported as successful and revealed an overly literal classification issue; the rubric was refined afterward. That refinement has not yet received an authorized live accuracy check.

## Setup and testing

### Local interface without live SERV

```powershell
npm.cmd start
```

Visit `http://localhost:3000`. Loading the example is free. Attempting an analysis without a configured key returns a clear `503` configuration response rather than invented results.

### Deterministic verification

```powershell
npm.cmd test
npm.cmd run build
```

The build verifies required application files and creates static assets in `dist/`. Generated output is ignored by Git.

### Optional real SERV workflow

Only perform this after rotating the previously exposed credential and explicitly authorizing a paid check:

```powershell
$env:SERV_API_KEY = "a-new-server-side-key"
npm.cmd start
```

Each **Trace instructions** action makes one bounded SERV request. The key must remain server-side; `.env` is ignored and is not loaded automatically by this dependency-free server. `SERV_MODEL` defaults to `gpt-6-luna`. `SERV_REQUESTS_PER_HOUR` is a per-process budget, not global abuse protection.

## Deployment status

- Source: [github.com/YakiUdoph/Viandra](https://github.com/YakiUdoph/Viandra)
- Protected production: [viandra.vercel.app](https://viandra.vercel.app)
- Vercel Authentication is enabled for all deployments, including production.
- No `SERV_API_KEY` is configured in Vercel, so live analysis is intentionally disabled.

The production deployment is access-controlled and is not an anonymous judge demo. A public demo link or real application video must be supplied separately before submission.

## Limitations

- The refined semantic rubric has not been verified with a new authorized live SERV run.
- A previously exposed SERV key must be revoked or rotated before any future use; it was not copied into Vercel.
- Exact quote matching proves that quoted text exists, not that the interpretation is correct.
- Proposed corrections are model drafts and require human review.
- Per-instance throttles are not distributed global abuse protection.
- The current protected production URL is not sufficient as an anonymous public demo.
- Hands-on physical-device QA and final real-footage recording remain human tasks.
- The available repository does not contain the referenced Serial Hackathon Winner Playbook, so no unavailable guidance has been reconstructed.

Verified event requirements and uncertainties are tracked in [COMPETITION.md](COMPETITION.md). Judge-ready copy, video guidance, and the X draft are in [SUBMISSION.md](SUBMISSION.md). The evidence-scored release gates are in [READINESS.md](READINESS.md).
