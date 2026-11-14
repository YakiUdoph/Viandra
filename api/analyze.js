import { analyzePayload, publicError } from "../src/handler.js";
import { checkRateLimit, checkServRequestBudget } from "../src/rate-limit.js";

function hourlyBudget() {
  const number = Number.parseInt(process.env.SERV_REQUESTS_PER_HOUR, 10);
  return Number.isSafeInteger(number) && number > 0 ? number : 20;
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "POST") return response.status(405).json({ error: { code: "METHOD_NOT_ALLOWED", message: "Use POST." } });

  const client = request.headers["x-forwarded-for"]?.split(",")[0]?.trim() || request.socket?.remoteAddress || "unknown";
  if (!checkRateLimit(client)) return response.status(429).json({ error: { code: "LOCAL_RATE_LIMIT", message: "Too many trace requests. Wait before trying again." } });

  try {
    const result = await analyzePayload(request.body, {
      reserveServRequest: () => checkServRequestBudget(Date.now(), hourlyBudget())
    });
    return response.status(200).json(result);
  } catch (error) {
    const result = publicError(error);
    return response.status(result.status).json(result.body);
  }
}
