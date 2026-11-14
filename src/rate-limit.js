const buckets = new Map();
let servRequests = [];

export function checkRateLimit(key, now = Date.now(), limit = 5, windowMs = 10 * 60 * 1000) {
  const safeKey = String(key || "unknown").slice(0, 200);
  const recent = (buckets.get(safeKey) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  buckets.set(safeKey, recent);
  if (buckets.size > 1_000) {
    for (const [entryKey, times] of buckets) {
      if (times.every((time) => now - time >= windowMs)) buckets.delete(entryKey);
    }
  }
  return true;
}

export function checkServRequestBudget(now = Date.now(), limit = 20, windowMs = 60 * 60 * 1000) {
  servRequests = servRequests.filter((time) => now - time < windowMs);
  if (servRequests.length >= limit) return false;
  servRequests.push(now);
  return true;
}

export function resetRateLimitsForTest() {
  buckets.clear();
  servRequests = [];
}
