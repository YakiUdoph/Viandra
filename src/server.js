import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzePayload, publicError } from "./handler.js";
import { checkRateLimit, checkServRequestBudget } from "./rate-limit.js";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const port = Number(process.env.PORT) || 3000;
const maxBodyBytes = 256 * 1024;
const allowedFiles = new Set([
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/favicon.svg",
  "/fonts/InterTight-Variable.ttf",
  "/fonts/IBMPlexMono-Regular.ttf"
]);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".ttf": "font/ttf" };
const hourlyServBudget = positiveInteger(process.env.SERV_REQUESTS_PER_HOUR, 20);

function positiveInteger(value, fallback) {
  const number = Number.parseInt(value, 10);
  return Number.isSafeInteger(number) && number > 0 ? number : fallback;
}

function setSecurityHeaders(response) {
  response.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.setHeader("Cache-Control", "no-store");
}

function json(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodyBytes) {
      const error = new Error("Request too large");
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Invalid JSON");
    error.status = 400;
    throw error;
  }
}

const server = createServer(async (request, response) => {
  setSecurityHeaders(response);
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && url.pathname === "/api/health") {
    return json(response, 200, { ok: true, servConfigured: Boolean(process.env.SERV_API_KEY) });
  }

  if (request.method === "POST" && url.pathname === "/api/analyze") {
    const client = request.socket.remoteAddress || "unknown";
    if (!checkRateLimit(client)) return json(response, 429, { error: { code: "LOCAL_RATE_LIMIT", message: "Too many trace requests. Wait before trying again." } });
    try {
      const result = await analyzePayload(await readJson(request), {
        reserveServRequest: () => checkServRequestBudget(Date.now(), hourlyServBudget)
      });
      return json(response, 200, result);
    } catch (error) {
      if (error?.status === 413) return json(response, 413, { error: { code: "REQUEST_TOO_LARGE", message: "The request is too large." } });
      if (error?.status === 400 && error.message === "Invalid JSON") return json(response, 400, { error: { code: "INVALID_JSON", message: "The request body is not valid JSON." } });
      const result = publicError(error);
      return json(response, result.status, result.body);
    }
  }

  if (request.method === "GET" && allowedFiles.has(url.pathname)) {
    const relative = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    try {
      const data = await readFile(join(publicDir, relative));
      response.writeHead(200, { "Content-Type": mime[extname(relative)] || "application/octet-stream" });
      return response.end(data);
    } catch {
      return json(response, 404, { error: { code: "NOT_FOUND", message: "Not found." } });
    }
  }

  return json(response, 404, { error: { code: "NOT_FOUND", message: "Not found." } });
});

if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => {
    console.log(`Viandra is running on http://localhost:${port}`);
  });
}

export { server };
