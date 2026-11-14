import { AppError, validateTraceRequest } from "./core.js";
import { traceWithServ } from "./serv.js";

export async function analyzePayload(payload, options = {}) {
  const input = validateTraceRequest(payload);
  const analysis = await traceWithServ(input, options);
  return {
    analysis,
    meta: {
      model: options.model ?? process.env.SERV_MODEL ?? "gpt-6-luna",
      evidencePolicy: "Exact source quotations are checked; classifications remain model interpretations for human review."
    }
  };
}

export function publicError(error) {
  if (error instanceof AppError) {
    const publicBody = { code: error.code, message: error.message };
    if (Number.isInteger(error.upstreamStatus)) publicBody.upstreamStatus = error.upstreamStatus;
    if (typeof error.upstreamCode === "string") publicBody.upstreamCode = error.upstreamCode;
    return { status: error.status, body: { error: publicBody } };
  }
  return {
    status: 500,
    body: { error: { code: "UNEXPECTED_ERROR", message: "Something unexpected happened. No result was created." } }
  };
}
