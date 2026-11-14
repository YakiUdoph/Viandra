# SERV Hackathon 02 compliance record

Checked against the official Edition 02 event page and official OpenServ documentation on 2026-11-14; the submission form itself did not expose its field list to the available read-only inspection.

## Verified requirements

- Event/build period: November 2–15, 2026.
- Submission deadline: November 15, 2026 at 23:59 UTC.
- Intended track: Open Track — any domain and stack, built on SERV Reasoning.
- Every track must use SERV Reasoning.
- Submission deliverables: public code repository, demo link or video, and a short write-up explaining the project, SERV use, and selected track.
- An X post is required by the deadline and its link must be included in the form.
- Existing projects are allowed if the write-up explains the meaningful feature built during the hackathon and how SERV powers it.
- Published judging criteria: creativity, user readiness, and revenue potential.
- An OpenServ account and API key are required. Registration is free; the page states pre-registered participants receive starter credits.

Official sources:

- https://www.openserv.ai/hackathon-2
- https://docs.openserv.ai/serv-reasoning/api
- https://docs.openserv.ai/serv-reasoning/api/chat-completions
- https://docs.openserv.ai/serv-reasoning/models

## Unknown from accessible official material

- Detailed participant eligibility restrictions.
- Additional challenge rules announced at kickoff but not present on the event page.
- A complete list of prohibited or restricted practices.
- Whether the submission form requests fields beyond those described publicly.
- Exact demo hosting or video-duration requirements.

These items must be checked in the live submission form and organizer channels before submission. Viandra does not claim full compliance while they remain unknown.

## Current evidence of alignment

- The server integration uses the documented SERV base URL, bearer authentication, required system prompt, universal chat-completions endpoint, and a verified catalog model.
- SERV Reasoning performs the core semantic requirement tracing; it is not decorative or replaceable by a hardcoded success response.
- The user reports one genuine live SERV analysis completed on 2026-11-14. The final prompt refinement has not been tested live.
- The public-repository, live-demo/video, write-up, X-post, and submission-form actions remain external tasks for the user.

## Bounded adjacent-product review

This review is directional, not exhaustive market research:

- Scribe describes automated creation of step-by-step process documentation. Viandra does not create SOPs; it compares a source instruction with later messages.
- Atlassian’s requirements traceability template links requirements to tasks, test cases, deliverables, and dependencies. Jira marketplace products similarly focus on structured requirements and lifecycle relationships.
- Viandra’s proposed distinction is a lightweight, industry-independent investigation of semantic drift across successive free-text handoffs, with exact evidence and the earliest problematic message.

Sources:

- https://get.scribehow.com/process-documentation-1/
- https://www.atlassian.com/software/jira/templates/requirements-traceability-matrix
- https://marketplace.atlassian.com/apps/1231062/tracecloud-projects-requirements

No guarantee of market originality or uniqueness is made.
