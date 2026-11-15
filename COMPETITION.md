# SERV Hackathon 02 compliance record

Checked against the official Edition 02 event page on 2026-11-14. The live submission form and any kickoff-only material were not available for complete inspection. The alignment table below is a release-preparation snapshot; no later submission receipt was available in the repository.

The official page does not state whether a deployed project may be updated after its form submission. Continued pre-deadline development is therefore not recorded as organizer-approved or guaranteed eligible; it proceeds under the project owner's explicit authorization and the absence of an identified prohibition.

## Verified official requirements

- Event period: November 2–15, 2026.
- Submission deadline: November 15, 2026 at 23:59 UTC.
- Selected track: Open Track—any domain and stack, built on SERV Reasoning.
- Every track must use SERV Reasoning.
- Required deliverables: a public code repository, a demo link or video, and a short write-up explaining the project, SERV use, and selected track.
- An X post is required by the deadline, and its URL must be included in the submission form.
- Existing projects are allowed when the write-up explains the meaningful feature built during the hackathon and how SERV powers it.
- Published judging criteria: creativity, user readiness, and revenue potential.
- An OpenServ account and API key are required. The event page states that pre-registered participants receive starter credits.

Official source:

- https://www.openserv.ai/hackathon-2

Supporting SERV documentation used by the implementation:

- https://docs.openserv.ai/serv-reasoning/api
- https://docs.openserv.ai/serv-reasoning/api/chat-completions
- https://docs.openserv.ai/serv-reasoning/models

## 2026-11-14 release-preparation alignment snapshot

| Requirement | Gate | Evidence |
| --- | --- | --- |
| Open Track project using SERV Reasoning | PASS | SERV performs the core semantic trace through a structured chat-completions request; it is not decorative. |
| Public repository | PASS | https://github.com/YakiUdoph/Viandra |
| Short project write-up | PASS | Judge-ready copy is prepared in `SUBMISSION.md`. |
| Explanation of SERV usage | PASS | `README.md`, `ARCHITECTURE.md`, and `SUBMISSION.md` describe the reasoning boundary and local validation. |
| Demo link or video | FAIL | The production URL requires Vercel Authentication; no public video has been recorded or published. |
| X post | FAIL | A draft exists, but nothing has been published. |
| X post URL in form | FAIL | No X post URL exists and the form has not been submitted. |
| Submission before deadline | NOT VERIFIED | No submission receipt was available in the repository. |

## Honest implementation evidence

- The application uses the documented SERV base URL, bearer authentication, required system message, catalog model, and chat-completions format.
- The user reported one genuine live SERV analysis on 2026-11-14. It returned structured output and exposed an overly literal semantic classification issue.
- The classification rubric was refined afterward. That revised rubric has not been checked with another authorized paid request.
- Deterministic tests validate the application contract and safety behavior, not future model accuracy.
- The current protected Vercel deployment contains no SERV credential and cannot perform live analysis.
- The public repository is available, but a protected deployment is not represented as an anonymous demo.

## Unknown from accessible official material

- Detailed participant eligibility restrictions.
- Additional rules announced only at kickoff.
- A complete list of prohibited practices.
- Submission form fields beyond those described publicly.
- Exact demo-hosting or video-duration requirements.

These items must be checked in the live form and organizer channels before submission. Viandra does not claim full compliance while they remain unknown.

## Positioning and business relevance

Viandra addresses semantic instruction drift across successive free-text handoffs. The immediate users are operators, reviewers, and builders who need to locate where a requirement changed—not merely prove that the first and last texts differ. The business case is reduced investigation time and rework in workflows where approvals, restrictions, deadlines, or customer intent pass across multiple people or agents.

This is a positioning hypothesis, not a claim of customers, revenue, traction, or market uniqueness. Adjacent products commonly document processes or link structured requirements to tasks and tests; Viandra’s narrower distinction is an evidence-grounded, earliest-handoff investigation of semantic drift.
