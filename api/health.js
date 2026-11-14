export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "GET") {
    return response.status(405).json({ error: { code: "METHOD_NOT_ALLOWED", message: "Use GET." } });
  }
  return response.status(200).json({ ok: true, servConfigured: Boolean(process.env.SERV_API_KEY) });
}
