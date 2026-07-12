// Fixed-window in-memory rate limiter. Per serverless instance, so limits
// reset on cold starts — this is abuse insurance for the AI endpoints, not
// precise accounting. Swap for a Redis-backed limiter if that ever matters.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 5000;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();

  // Keep the map bounded: drop expired windows once it grows large.
  if (buckets.size >= MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (now >= b.resetAt) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { ok: true };
}

// Best-effort client identity behind Vercel's proxy. Falls back to a shared
// key, which still caps total abuse when no forwarding header exists.
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
