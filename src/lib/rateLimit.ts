import "server-only";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Fixed-window rate limiter backed by Upstash Redis, shared by every
// serverless instance — unlike an in-memory counter, limits hold under
// concurrent instances and survive cold starts.

// Lazy singletons: constructed on first use (not at module load, which
// Next's build-time page-data collection also imports) so a missing config
// fails with a clear error on the first request, not on `next build`.
let redis: Redis | undefined;
function getRedis(): Redis {
  if (!redis) {
    // Vercel's "Storage" tab still provisions the legacy Vercel KV variable
    // names for a connected Redis database; UPSTASH_REDIS_REST_* is the
    // name used when Upstash is configured directly. Accept either.
    const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
    if (!url || !token) {
      throw new Error(
        "Redis isn't configured — set UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN in .env.local.",
      );
    }
    redis = new Redis({ url, token });
  }
  return redis;
}

// One Ratelimit instance per distinct (limit, window) pair, reused across
// calls — cheap to construct, but no need to repeat it every request.
const limiters = new Map<string, Ratelimit>();

function getLimiter(limit: number, windowMs: number): Ratelimit {
  const cacheKey = `${limit}:${windowMs}`;
  let limiter = limiters.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.fixedWindow(limit, `${windowMs} ms`),
      prefix: "cookai",
    });
    limiters.set(cacheKey, limiter);
  }
  return limiter;
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  try {
    const result = await getLimiter(limit, windowMs).limit(key);
    if (result.success) return { ok: true };
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
    };
  } catch (err) {
    // Covers both a Redis hiccup and Upstash being unconfigured — either
    // way this is abuse insurance, not a security boundary, so fail open
    // (allow the request) rather than take the whole demo down.
    console.error("rate limit check failed, allowing request:", err);
    return { ok: true };
  }
}

// Best-effort client identity behind Vercel's proxy. Falls back to a shared
// key, which still caps total abuse when no forwarding header exists.
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
