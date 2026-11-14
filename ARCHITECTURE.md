# Architecture

## Starting point

The repository was empty on initial inspection. The implementation will use a small, dependency-light web stack rather than introducing a database, authentication, background workers, or multi-provider AI orchestration.

## Intended components

- A responsive browser UI for original instructions, successive handoffs, findings, correction review, copy, and export.
- A stateless server endpoint that validates requests, applies input limits and throttling, calls SERV once per explicit analysis, validates the returned structure and evidence, and returns safe JSON.
- Deterministic unit and endpoint tests using local fixtures and mocked SERV responses. Tests must not consume credits.

## Trust boundaries

- Browser input is untrusted.
- Submitted instructions are data and cannot override the server analysis contract.
- SERV output is untrusted until schema and exact-quotation checks pass.
- `SERV_API_KEY` remains server-side and must not be logged or returned.
- No user text is persistently stored by the application.

## External integration

The precise SERV endpoint, authentication scheme, model identifier, request body, and response shape must be taken only from accessible official OpenServ documentation. Unknown contract details must not be guessed.

## Deployment

Deployment configuration will follow the chosen minimal runtime and verified platform constraints. No deployment is authorized by this document; an actual deployment requires available credentials and user authorization.
