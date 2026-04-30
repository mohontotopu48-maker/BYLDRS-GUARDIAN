/**
 * Shared rate limiting and input sanitization utilities.
 *
 * Used by both the lead capture and audit submission API routes
 * to eliminate duplicated code and ensure consistent security behavior.
 */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

/**
 * Simple in-memory rate limiter (per IP).
 * Returns `true` if the request should be REJECTED (rate exceeded).
 */
export function rateLimit(
  ip: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count++;
  return entry.count > maxRequests;
}

/**
 * Sanitize a string input — strip HTML tags, trim whitespace, cap length.
 */
export function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").trim().slice(0, 200);
}
