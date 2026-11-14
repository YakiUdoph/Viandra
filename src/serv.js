import { AppError, buildServRequest, parseServResponse } from "./core.js";

const SERV_URL = "https://inference-api.openserv.ai/v1/chat/completions";
const SAFE_UPSTREAM_CODES = new Set([
  "authentication_error",
  "insufficient_credits",
  "invalid_model",
  "invalid_request",
  "invalid_request_error",
  "model_not_found",
  "not_found_error",
  "rate_limit_error",
  "unsupported_model",
  "unprocessable_entity"
]);

function sanitizedUpstreamCode(body) {
  const candidate = body?.error?.code ?? body?.error?.type ?? body?.code ?? body?.type;
  if (typeof candidate !== "string") return null;
  const normalized = candidate.trim().toLowerCase();
  return SAFE_UPSTREAM_CODES.has(normalized) ? normalized : null;
}

async function upstreamDiagnostic(response) {
  const diagnostic = { upstreamStatus: Number.isInteger(response?.status) ? response.status : 502 };
  let body = null;
  try {
    if (typeof response?.text === "function") {
      const raw = await response.text();
      if (typeof raw === "string" && raw.length <= 4_096) body = JSON.parse(raw);
    } else if (typeof response?.json === "function") {
      body = await response.json();
    }
  } catch {
    // Status remains useful even when an upstream body is absent, oversized, or malformed.
  }
  const upstreamCode = sanitizedUpstreamCode(body);
  if (upstreamCode) diagnostic.upstreamCode = upstreamCode;
  return diagnostic;
}

export async function traceWithServ(input, options = {}) {
  const apiKey = options.apiKey ?? process.env.SERV_API_KEY;
  const model = options.model ?? process.env.SERV_MODEL ?? "gpt-6-luna";
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeoutMs = options.timeoutMs ?? 30_000;

  if (!apiKey) {
    throw new AppError("SERV_NOT_CONFIGURED", "SERV is not configured. Add SERV_API_KEY on the server before tracing.", 503);
  }
  if (options.reserveServRequest && !options.reserveServRequest()) {
    throw new AppError("LOCAL_CREDIT_BUDGET", "The temporary analysis budget has been reached. Try again later.", 429);
  }

  let response;
  try {
    response = await fetchImpl(SERV_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(buildServRequest(input, model)),
      signal: AbortSignal.timeout(timeoutMs)
    });
  } catch (error) {
    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      throw new AppError("SERV_TIMEOUT", "SERV took too long to respond. No result was created; try again manually.", 504);
    }
    throw new AppError("SERV_UNAVAILABLE", "SERV could not be reached. No result was created; check the connection and retry.", 502);
  }

  if (!response.ok) {
    const diagnostic = await upstreamDiagnostic(response);
    if (response.status === 401) throw new AppError("SERV_AUTH", "SERV rejected the server API key.", 502, diagnostic);
    if (response.status === 402) throw new AppError("SERV_CREDITS", "SERV reports insufficient credits for this request.", 402, diagnostic);
    if (response.status === 429) throw new AppError("SERV_RATE_LIMIT", "SERV is rate limiting requests. Wait before retrying.", 429, diagnostic);
    if (response.status >= 500) throw new AppError("SERV_UPSTREAM", "SERV is temporarily unavailable. No result was created.", 502, diagnostic);
    throw new AppError("SERV_REQUEST_FAILED", "SERV rejected the analysis request. No result was created.", 502, diagnostic);
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new AppError("INVALID_SERV_RESPONSE", "SERV returned a response that could not be read.", 502);
  }
  return parseServResponse(body, input);
}
