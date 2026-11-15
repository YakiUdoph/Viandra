import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  AppError,
  buildServRequest,
  createExportReport,
  parseServResponse,
  validateTraceRequest
} from "../src/core.js";
import { publicError } from "../src/handler.js";
import { traceWithServ } from "../src/serv.js";
import { checkServRequestBudget, resetRateLimitsForTest } from "../src/rate-limit.js";
import analyzeHandler from "../api/analyze.js";
import healthHandler from "../api/health.js";

const input = validateTraceRequest({
  original: [
    "Do not dispatch until payment is confirmed.",
    "Use recycled packaging.",
    "Delivery is due Friday.",
    "Customer prefers a morning delivery.",
    "Call the customer before arrival.",
    "Include the signed invoice."
  ].join(" "),
  handoffs: [
    "Wait for payment confirmation before dispatch. Use recycled boxes. Delivery remains due Friday. Morning delivery requested. Call before arrival. Include the signed invoice.",
    "Package ready. Dispatch immediately. Use standard boxes. Delivery is due Monday. Morning may work. Include the signed invoice."
  ]
});

test("premium landing remains illustrative and preserves the functional workspace contract", () => {
  const html = readFileSync("public/index.html", "utf8");
  const css = readFileSync("public/styles.css", "utf8");
  const browser = readFileSync("public/app.js", "utf8");

  assert.match(html, /Every handoff[.]\s*<\/span><span>Every detail[.]/);
  assert.match(html, /Example only · not a live analysis/);
  assert.match(html, /href="#workspace">\s*<span>Start tracing/);
  for (const id of ["original", "handoff-list", "trace-form", "trace-button", "results-panel", "requirement-list", "detail-panel", "correction-text", "copy-correction", "export-report"]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.equal(/Glaze/i.test(html + css + browser), false);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(browser, /IntersectionObserver/);
});

const modelTrace = {
  requirements: [
    {
      id: "payment",
      title: "Payment before dispatch",
      originalEvidence: "Do not dispatch until payment is confirmed.",
      importance: "Prevents dispatch before a required condition is confirmed.",
      handoffs: [
        { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Wait for payment confirmation before dispatch.", explanation: "A faithful paraphrase preserves the condition." },
        { handoffId: "handoff-2", classification: "CONTRADICTED", evidence: "Dispatch immediately.", explanation: "Immediate dispatch conflicts with waiting for confirmation." }
      ]
    },
    {
      id: "packaging",
      title: "Recycled packaging",
      originalEvidence: "Use recycled packaging.",
      importance: "Preserves an explicit material restriction.",
      handoffs: [
        { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Use recycled boxes.", explanation: "The material preference is preserved by paraphrase." },
        { handoffId: "handoff-2", classification: "CHANGED", evidence: "Use standard boxes.", explanation: "The specified recycled material is changed." }
      ]
    },
    {
      id: "deadline",
      title: "Friday deadline",
      originalEvidence: "Delivery is due Friday.",
      importance: "States the delivery deadline.",
      handoffs: [
        { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Delivery remains due Friday.", explanation: "The deadline is intact." },
        { handoffId: "handoff-2", classification: "CONTRADICTED", evidence: "Delivery is due Monday.", explanation: "Monday directly conflicts with the Friday deadline." }
      ]
    },
    {
      id: "customer-call",
      title: "Call before arrival",
      originalEvidence: "Call the customer before arrival.",
      importance: "Preserves a required confirmation step.",
      handoffs: [
        { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Call before arrival.", explanation: "The call remains required." },
        { handoffId: "handoff-2", classification: "MISSING", evidence: null, explanation: "No call instruction appears in this handoff." }
      ]
    },
    {
      id: "morning",
      title: "Morning preference",
      originalEvidence: "Customer prefers a morning delivery.",
      importance: "Captures a customer preference.",
      handoffs: [
        { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Morning delivery requested.", explanation: "The preference is preserved." },
        { handoffId: "handoff-2", classification: "UNCLEAR", evidence: "Morning may work.", explanation: "The tentative wording does not clearly preserve or reject the preference." }
      ]
    },
    {
      id: "invoice",
      title: "Signed invoice",
      originalEvidence: "Include the signed invoice.",
      importance: "Requires a specific document.",
      handoffs: [
        { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Include the signed invoice.", explanation: "Exact requirement remains." },
        { handoffId: "handoff-2", classification: "PRESERVED", evidence: "Include the signed invoice.", explanation: "Exact requirement remains." }
      ]
    }
  ],
  proposedCorrection: "Do not dispatch until payment confirmation is received. Use recycled packaging, deliver by Friday in the morning if possible, call before arrival, and include the signed invoice."
};

function servResponse(trace = modelTrace) {
  return {
    choices: [{
      message: {
        tool_calls: [{
          function: { name: "return_requirement_trace", arguments: JSON.stringify(trace) }
        }]
      }
    }]
  };
}

function mockVercelResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; }
  };
}

async function rejectedError(promise) {
  let rejection;
  try {
    await promise;
  } catch (error) {
    rejection = error;
  }
  assert.ok(rejection, "Expected promise to reject");
  return rejection;
}

test("validates and normalizes an original with successive handoffs", () => {
  const result = validateTraceRequest({ original: "  Keep this  ", handoffs: [" First ", { text: " Second " }] });
  assert.deepEqual(result, {
    original: "Keep this",
    handoffs: [
      { id: "handoff-1", label: "Handoff 1", text: "First" },
      { id: "handoff-2", label: "Handoff 2", text: "Second" }
    ]
  });
});

test("rejects a missing original", () => {
  assert.throws(() => validateTraceRequest({ original: "", handoffs: ["a", "b"] }), { code: "ORIGINAL_REQUIRED" });
});

test("rejects fewer than two handoffs", () => {
  assert.throws(() => validateTraceRequest({ original: "a", handoffs: ["b"] }), { code: "HANDOFFS_REQUIRED" });
});

test("enforces individual and combined input limits", () => {
  assert.throws(() => validateTraceRequest({ original: "x".repeat(8_001), handoffs: ["a", "b"] }), { code: "ORIGINAL_TOO_LARGE" });
  assert.throws(() => validateTraceRequest({ original: "x".repeat(8_000), handoffs: ["a".repeat(6_000), "b".repeat(6_000), "c".repeat(4_001)] }), { code: "INPUT_TOO_LARGE" });
});

test("builds one bounded SERV chat request with a forced structured tool", () => {
  const request = buildServRequest(input);
  assert.equal(request.model, "gpt-6-luna");
  assert.equal(request.max_completion_tokens, 2_200);
  assert.equal(request.reasoning_effort, "none");
  assert.equal(request.messages[0].role, "system");
  assert.equal(request.tools[0].function.name, "return_requirement_trace");
  assert.equal(request.tool_choice.function.name, "return_requirement_trace");

  const schema = request.tools[0].function.parameters;
  assert.equal(request.tools[0].function.strict, true);
  assert.equal(schema.additionalProperties, false);
  assert.deepEqual(new Set(schema.required), new Set(Object.keys(schema.properties)));

  const requirement = schema.properties.requirements.items;
  assert.equal(requirement.additionalProperties, false);
  assert.deepEqual(new Set(requirement.required), new Set(Object.keys(requirement.properties)));

  const handoff = requirement.properties.handoffs.items;
  assert.equal(handoff.additionalProperties, false);
  assert.deepEqual(new Set(handoff.required), new Set(Object.keys(handoff.properties)));
  assert.deepEqual(handoff.properties.evidence.type, ["string", "null"]);
});

test("defines a semantic accuracy rubric without example-specific shortcuts", () => {
  const systemPrompt = buildServRequest(input).messages[0].content;
  assert.match(systemPrompt, /semantic meaning rather than word overlap/i);
  assert.match(systemPrompt, /harmless wording changes/i);
  assert.match(systemPrompt, /reports? that required work is ready or complete/i);
  assert.match(systemPrompt, /not as independently verified fulfillment/i);
  assert.match(systemPrompt, /UNCLEAR rather than MISSING/i);
  assert.equal(systemPrompt.includes("blue order"), false);
});

test("distinguishes paraphrase, conflicting conditions, and unverified completion reports", () => {
  const accuracyInput = validateTraceRequest({
    original: "Prepare the quarterly report. Do not publish until approval is confirmed. Deliver by Friday.",
    handoffs: [
      "Prepare the report. Wait for approval confirmation before publishing. Deliver by Friday.",
      "The quarterly report is ready. Publish immediately and arrange delivery for Monday."
    ]
  });
  const accuracyTrace = {
    requirements: [
      {
        id: "report",
        title: "Prepare the quarterly report",
        originalEvidence: "Prepare the quarterly report.",
        importance: "Tracks the requested preparation work.",
        handoffs: [
          { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Prepare the report.", explanation: "A faithful paraphrase preserves the preparation requirement." },
          { handoffId: "handoff-2", classification: "UNCLEAR", evidence: "The quarterly report is ready.", explanation: "This reports readiness but does not independently verify that preparation occurred." }
        ]
      },
      {
        id: "approval",
        title: "Approval before publishing",
        originalEvidence: "Do not publish until approval is confirmed.",
        importance: "Preserves the approval condition.",
        handoffs: [
          { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Wait for approval confirmation before publishing.", explanation: "The condition is preserved." },
          { handoffId: "handoff-2", classification: "CONTRADICTED", evidence: "Publish immediately", explanation: "Immediate publication conflicts with waiting for approval." }
        ]
      },
      {
        id: "deadline",
        title: "Friday delivery deadline",
        originalEvidence: "Deliver by Friday.",
        importance: "Tracks the requested deadline.",
        handoffs: [
          { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Deliver by Friday.", explanation: "The deadline is preserved." },
          { handoffId: "handoff-2", classification: "CONTRADICTED", evidence: "delivery for Monday", explanation: "Monday conflicts with the Friday deadline." }
        ]
      }
    ],
    proposedCorrection: "Keep the report preparation requirement, wait for confirmed approval before publishing, and deliver by Friday."
  };

  const result = parseServResponse(servResponse(accuracyTrace), accuracyInput);
  assert.equal(result.requirements[0].handoffs[0].classification, "PRESERVED");
  assert.equal(result.requirements[0].handoffs[1].classification, "UNCLEAR");
  assert.equal(result.requirements[0].handoffs[1].evidence.quote, "The quarterly report is ready.");
  assert.equal(result.requirements[0].handoffs[1].evidence.supported, true);
  assert.equal(result.requirements[0].firstProblematicHandoff, null);
  assert.equal(result.requirements[1].handoffs[1].classification, "CONTRADICTED");
  assert.deepEqual(result.requirements[1].firstProblematicHandoff, { id: "handoff-2", label: "Handoff 2" });
  assert.equal(result.requirements[2].handoffs[1].classification, "CONTRADICTED");
  assert.deepEqual(result.requirements[2].firstProblematicHandoff, { id: "handoff-2", label: "Handoff 2" });
});

test("supports preserved, missing, contradicted, changed, unclear and correct paraphrase results", () => {
  const result = parseServResponse(servResponse(), input);
  assert.deepEqual(result.requirements.map((item) => item.handoffs[1].classification), [
    "CONTRADICTED", "CHANGED", "CONTRADICTED", "MISSING", "UNCLEAR", "PRESERVED"
  ]);
  assert.equal(result.requirements[0].handoffs[0].classification, "PRESERVED");
  assert.equal(result.requirements[0].handoffs[0].evidence.quote, "Wait for payment confirmation before dispatch.");
});

test("finds the first problematic handoff from the trace rather than trusting model metadata", () => {
  const result = parseServResponse(servResponse(), input);
  assert.deepEqual(result.requirements[0].firstProblematicHandoff, { id: "handoff-2", label: "Handoff 2" });
  assert.equal(result.requirements[5].firstProblematicHandoff, null);
});

test("keeps the earliest dropped requirement when a third handoff restores it", () => {
  const threeHandoffs = validateTraceRequest({
    original: "Include the signed invoice.",
    handoffs: [
      "Include the signed invoice.",
      "Package the order for dispatch.",
      "Include the signed invoice with the order."
    ]
  });
  const trace = {
    requirements: [{
      id: "invoice",
      title: "Signed invoice",
      originalEvidence: "Include the signed invoice.",
      importance: "Preserves a required document.",
      handoffs: [
        { handoffId: "handoff-3", classification: "PRESERVED", evidence: "Include the signed invoice with the order.", explanation: "The requirement is restored." },
        { handoffId: "handoff-1", classification: "PRESERVED", evidence: "Include the signed invoice.", explanation: "The requirement is preserved." },
        { handoffId: "handoff-2", classification: "MISSING", evidence: null, explanation: "The invoice requirement is absent." }
      ]
    }],
    proposedCorrection: "Include the signed invoice with the order."
  };

  const result = parseServResponse(servResponse(trace), threeHandoffs);
  const requirement = result.requirements[0];
  assert.deepEqual(requirement.handoffs.map((item) => item.handoffId), ["handoff-1", "handoff-2", "handoff-3"]);
  assert.deepEqual(requirement.handoffs[1].evidence, { quote: null, supported: false });
  assert.deepEqual(requirement.firstProblematicHandoff, { id: "handoff-2", label: "Handoff 2" });
});

test("marks an invented evidence quotation unsupported", () => {
  const altered = structuredClone(modelTrace);
  altered.requirements[0].handoffs[1].evidence = "Payment was definitely received.";
  const result = parseServResponse(servResponse(altered), input);
  assert.equal(result.requirements[0].handoffs[1].evidence.supported, false);
  assert.equal(result.requirements[0].handoffs[1].evidence.quote, "Payment was definitely received.");
});

test("rejects malformed model JSON", () => {
  const response = servResponse();
  response.choices[0].message.tool_calls[0].function.arguments = "{not-json";
  assert.throws(() => parseServResponse(response, input), { code: "INVALID_SERV_RESPONSE" });
});

test("rejects omitted or wrongly typed model evidence", () => {
  const omitted = structuredClone(modelTrace);
  delete omitted.requirements[0].handoffs[0].evidence;
  assert.throws(() => parseServResponse(servResponse(omitted), input), { code: "INVALID_SERV_RESPONSE" });

  const wrongType = structuredClone(modelTrace);
  wrongType.requirements[0].originalEvidence = { quote: "Do not dispatch until payment is confirmed." };
  assert.throws(() => parseServResponse(servResponse(wrongType), input), { code: "INVALID_SERV_RESPONSE" });
});

test("rejects incomplete findings that omit a handoff", () => {
  const altered = structuredClone(modelTrace);
  altered.requirements[0].handoffs.pop();
  assert.throws(() => parseServResponse(servResponse(altered), input), { code: "INVALID_SERV_RESPONSE" });
});

test("fails safely when the API key is missing without making a request", async () => {
  let called = false;
  await assert.rejects(
    traceWithServ(input, { apiKey: "", fetchImpl: async () => { called = true; } }),
    { code: "SERV_NOT_CONFIGURED" }
  );
  assert.equal(called, false);
});

test("maps SERV authentication and credit errors to specific safe messages", async () => {
  await assert.rejects(traceWithServ(input, { apiKey: "secret", fetchImpl: async () => ({ ok: false, status: 401 }) }), { code: "SERV_AUTH" });
  await assert.rejects(traceWithServ(input, { apiKey: "secret", fetchImpl: async () => ({ ok: false, status: 402 }) }), { code: "SERV_CREDITS" });
});

test("preserves safe diagnostics for HTTP 400, 403, 404, and 422 rejections", async (context) => {
  const cases = [
    { status: 400, body: { error: { type: "invalid_request_error", message: "Unsupported field contained private source text." } }, expectedCode: "invalid_request_error" },
    { status: 403, body: { error: { message: "Forbidden for account secret-account-id." } }, expectedCode: undefined },
    { status: 404, body: { error: { code: "model_not_found", message: "Private model details." } }, expectedCode: "model_not_found" },
    { status: 422, body: { error: { code: "unprocessable_entity", message: "Private validation details." } }, expectedCode: "unprocessable_entity" }
  ];

  for (const item of cases) {
    await context.test(`HTTP ${item.status}`, async () => {
      const error = await rejectedError(traceWithServ(input, {
        apiKey: "secret",
        fetchImpl: async () => ({ ok: false, status: item.status, json: async () => item.body })
      }));
      assert.equal(error.code, "SERV_REQUEST_FAILED");
      assert.equal(error.upstreamStatus, item.status);
      assert.equal(error.upstreamCode, item.expectedCode);

      const exposed = publicError(error);
      assert.equal(exposed.status, 502);
      assert.equal(exposed.body.error.upstreamStatus, item.status);
      assert.equal(exposed.body.error.upstreamCode, item.expectedCode);
      assert.equal(JSON.stringify(exposed.body).includes(item.body.error.message), false);
    });
  }
});

test("preserves status but exposes no arbitrary data from an unexpected upstream response", async () => {
  const privateText = "Bearer serv-private-key and original user instructions";
  const error = await rejectedError(traceWithServ(input, {
    apiKey: "secret",
    fetchImpl: async () => ({
      ok: false,
      status: 418,
      json: async () => ({ error: { code: privateText, message: privateText } })
    })
  }));
  const exposed = publicError(error);
  assert.equal(error.upstreamStatus, 418);
  assert.equal(error.upstreamCode, undefined);
  assert.equal(exposed.body.error.upstreamStatus, 418);
  assert.equal(JSON.stringify(exposed.body).includes(privateText), false);
});

test("handles an unreadable upstream error body without replacing its HTTP status", async () => {
  const error = await rejectedError(traceWithServ(input, {
    apiKey: "secret",
    fetchImpl: async () => ({ ok: false, status: 400, json: async () => { throw new Error("not json"); } })
  }));
  assert.equal(error.upstreamStatus, 400);
  assert.equal(error.upstreamCode, undefined);
  assert.equal(publicError(error).body.error.upstreamStatus, 400);
});

test("does not expose a secret in a public unexpected error", () => {
  const secret = "serv-super-secret-value";
  const result = publicError(new Error(`upstream failed with ${secret}`));
  assert.equal(result.status, 500);
  assert.equal(JSON.stringify(result.body).includes(secret), false);
});

test("creates an export report with provenance, notice, source and analysis", () => {
  const analysis = parseServResponse(servResponse(), input);
  const report = createExportReport(input, analysis, "2026-11-14T12:00:00.000Z");
  assert.equal(report.product, "Viandra");
  assert.equal(report.generatedAt, "2026-11-14T12:00:00.000Z");
  assert.equal(report.source.handoffs.length, 2);
  assert.equal(report.analysis.requirements.length, 6);
  assert.match(report.notice, /human review/i);
});

test("parses a genuine-format mocked SERV response without leaking the key into the request body", async () => {
  const key = "serv-test-key-never-log";
  let captured;
  const result = await traceWithServ(input, {
    apiKey: key,
    fetchImpl: async (_url, options) => {
      captured = options;
      return { ok: true, status: 200, json: async () => servResponse() };
    }
  });
  assert.equal(result.requirements[0].firstProblematicHandoff.label, "Handoff 2");
  assert.equal(captured.headers.Authorization, `Bearer ${key}`);
  assert.equal(captured.body.includes(key), false);
  assert.equal(JSON.stringify(createExportReport(input, result)).includes(key), false);
});

test("keeps Vercel health and missing-key behavior aligned with the local endpoint", async () => {
  resetRateLimitsForTest();
  const previousKey = process.env.SERV_API_KEY;
  delete process.env.SERV_API_KEY;
  try {
    const healthResponse = mockVercelResponse();
    healthHandler({ method: "GET" }, healthResponse);
    assert.equal(healthResponse.statusCode, 200);
    assert.deepEqual(healthResponse.body, { ok: true, servConfigured: false });

    const analyzeResponse = mockVercelResponse();
    await analyzeHandler({
      method: "POST",
      headers: {},
      socket: { remoteAddress: "test-client" },
      body: { original: "Keep approval required.", handoffs: ["Approval remains required.", "Approval remains required."] }
    }, analyzeResponse);
    assert.equal(analyzeResponse.statusCode, 503);
    assert.equal(analyzeResponse.body.error.code, "SERV_NOT_CONFIGURED");
  } finally {
    if (previousKey === undefined) delete process.env.SERV_API_KEY;
    else process.env.SERV_API_KEY = previousKey;
    resetRateLimitsForTest();
  }
});

test("enforces the per-instance SERV request budget", () => {
  resetRateLimitsForTest();
  assert.equal(checkServRequestBudget(1_000, 2, 60_000), true);
  assert.equal(checkServRequestBudget(2_000, 2, 60_000), true);
  assert.equal(checkServRequestBudget(3_000, 2, 60_000), false);
  assert.equal(checkServRequestBudget(62_000, 2, 60_000), true);
  resetRateLimitsForTest();
});

test("checks the SERV budget only after request validation", async () => {
  let reservations = 0;
  const { analyzePayload } = await import("../src/handler.js");
  await assert.rejects(
    analyzePayload({ original: "", handoffs: ["one", "two"] }, {
      reserveServRequest: () => { reservations += 1; return true; },
      apiKey: "unused"
    }),
    { code: "ORIGINAL_REQUIRED" }
  );
  assert.equal(reservations, 0);
});

test("stops before the SERV network call when the per-instance budget is exhausted", async () => {
  let called = false;
  await assert.rejects(
    traceWithServ(input, {
      apiKey: "configured",
      reserveServRequest: () => false,
      fetchImpl: async () => { called = true; }
    }),
    { code: "LOCAL_CREDIT_BUDGET" }
  );
  assert.equal(called, false);
});

test("local server serves bundled fonts and accepts valid multibyte input", async () => {
  const previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "test";
  const { server } = await import("../src/server.js");
  if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = previousNodeEnv;

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  try {
    const fontResponse = await fetch(`${baseUrl}/fonts/InterTight-Variable.ttf`);
    assert.equal(fontResponse.status, 200);
    assert.equal(fontResponse.headers.get("content-type"), "font/ttf");

    const multibyte = "\u0800";
    const response = await fetch(`${baseUrl}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        original: multibyte.repeat(8_000),
        handoffs: [multibyte.repeat(6_000), multibyte.repeat(6_000), multibyte.repeat(4_000)]
      })
    });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).error.code, "SERV_NOT_CONFIGURED");
  } finally {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
