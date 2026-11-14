# Viandra submission kit

Draft only. Nothing in this file has been posted to X or submitted to the official form.

## Submission description

Important instructions rarely disappear in one obvious step. They drift as work passes between people, teams, tools, and AI agents: an approval becomes optional, a restriction is softened, or a careful condition is replaced by an ambiguous shortcut. Comparing only the first and last message shows that something changed, but not where the problem began.

Viandra is an evidence-backed instruction-drift investigator. A user provides the original instructions and two or more ordered handoffs. Viandra traces each requirement across the chain, classifies its meaning as preserved, materially changed, directly contradicted, missing, or genuinely unclear, and highlights the earliest problematic handoff. Every supported finding is tied to an exact quotation from the submitted source. The user can inspect the timeline, edit a proposed correction, copy it, and export the investigation as JSON.

SERV Reasoning powers the semantic work that a keyword diff cannot do: recognizing faithful paraphrases, distinguishing a material change from a direct conflict, and reasoning across the full handoff sequence. Viandra wraps that reasoning in a strict function contract, validates every returned handoff and quotation, and independently computes the earliest issue instead of trusting a model-supplied conclusion.

That combination makes the result useful for human review while keeping its boundaries clear. Viandra does not certify compliance, send corrections automatically, or claim model infallibility. It gives operators and builders a faster, inspectable starting point for root-cause analysis wherever work crosses organizational or agent boundaries.

Viandra fits the Open Track because the mechanism is industry-independent: the same evidence-first trace can examine operational instructions, customer requirements, approval conditions, or multi-agent task handoffs. Its business relevance is reduced rework and investigation time—not an invented claim of customers or revenue.

## Short version

Viandra traces important instructions across successive human and AI handoffs, identifies the first point where meaning materially changed, conflicted, disappeared, or became unclear, and ties every supported finding to exact source evidence. SERV Reasoning performs the semantic comparison; Viandra validates the structured result, verifies quotations, and keeps corrections under human control.

## How SERV is used

- One explicit server-side SERV chat-completions request analyzes the original and all ordered handoffs.
- A forced strict function asks for requirements, classifications, evidence, explanations, and a proposed correction.
- SERV supplies semantic interpretation that simple text similarity cannot.
- Viandra validates the returned structure and complete handoff coverage.
- Supported evidence must match the submitted source exactly.
- Earliest-problem selection is recomputed locally from validated classifications.
- The browser never receives the API key, and the application does not retry automatically.
- The current Vercel production environment has no SERV key, so it cannot spend credits.

## Meaningful hackathon work

The repository history records that the checkout was empty at initial inspection on 2026-11-14. During the hackathon pass, Viandra’s application, SERV integration, evidence validation, deterministic tests, release documentation, deployment configuration, and visual experience were created and verified. This statement describes repository history; it does not reconstruct unavailable kickoff guidance or the missing Serial Hackathon Winner Playbook.

## Demo narration and real-footage shot list

Target length: approximately 105 seconds. Record the real application. Do not composite a fake result or describe a deterministic fixture as a live SERV response.

| Time | Real application footage | Narration |
| --- | --- | --- |
| 0–10s | Open the redesigned landing page and scroll through the headline. | “Important instructions rarely fail all at once. They drift as work passes between people, teams, and AI agents.” |
| 10–23s | Select **Start tracing** and show the empty workspace. | “Viandra traces that chain and shows not only what changed, but the earliest handoff where the problem appeared.” |
| 23–38s | Select **Load example**. Show the original payment condition and both ordered handoffs. | “Here, dispatch must wait for confirmed payment. The first handoff preserves that condition. The second says to dispatch immediately.” |
| 38–51s | Select **Trace instructions** during an explicitly authorized live run. Keep any credential and developer tooling off-screen. | “One bounded SERV Reasoning request compares the meaning across the full sequence and returns a structured requirement trace.” |
| 51–70s | Show the actual returned requirement cards and classifications. | “This is semantic reasoning, not a keyword diff: faithful paraphrases can remain preserved, while direct conflicts are separated from material non-conflicting changes.” |
| 70–84s | Open the relevant requirement and point to exact quotations and **First issue**. | “Every supported finding must quote the submitted source exactly. Viandra validates those quotations and computes the first problematic handoff locally.” |
| 84–98s | Edit the proposed correction, then use **Copy correction** and **Export JSON**. | “The correction stays editable and under human control. The investigation can be copied or exported for the next review step.” |
| 98–105s | Return to the closing statement or repository page. | “Viandra makes instruction drift visible, evidence-backed, and actionable—before it becomes another downstream failure.” |

Recording rules:

- Rotate the exposed key before the authorized live run.
- Record only an actual post-refinement result. If a live run is not authorized or fails, do not substitute a fixture and call it live.
- Ensure the browser contains no account email, token, request headers, local file paths, or unrelated tabs.
- Keep the first and final frames long enough to read.
- Confirm the recorded narration matches what the footage actually shows.
- Publish the resulting video at an accessible URL and replace the placeholder below.

## X post draft

> Built Viandra for the OpenServ SERV Hackathon 02 Open Track. It traces how important instructions survive—or drift—across human and AI handoffs, pinpoints the first problematic message, and grounds every supported finding in source evidence.
>
> Demo: [DEMO_OR_VIDEO_URL]
>
> Code: https://github.com/YakiUdoph/Viandra
>
> #SERVHackathon

Do not publish until the demo/video URL is real and accessible. Adjust the OpenServ account mention or required hashtag only after checking the current organizer guidance.

## Submission links

| Item | URL | Status |
| --- | --- | --- |
| Public repository | https://github.com/YakiUdoph/Viandra | Available |
| Protected production | https://viandra.vercel.app | Available only with Vercel Authentication; not an anonymous demo |
| Demo video | `[DEMO_OR_VIDEO_URL]` | Missing |
| X post | `[X_POST_URL]` | Missing |
| Official rules/form entry point | https://www.openserv.ai/hackathon-2 | Available |

## Final submission checklist

- [ ] Revoke or rotate the exposed SERV API key before any further live use.
- [ ] Perform one explicitly authorized post-refinement live SERV check with synthetic data.
- [ ] Record the actual application footage using the verified result.
- [ ] Publish the video at a judge-accessible URL and replace the placeholder.
- [ ] Recheck organizer eligibility, kickoff-only rules, hashtags, and the live form fields.
- [ ] Publish the X post with the real demo/video and repository links.
- [ ] Complete the official form, including Open Track, write-up, repository, demo/video, SERV explanation, and X-post URL.
- [ ] Submit before November 15, 2026 at 23:59 UTC.
