/**
 * Giới hạn số lần đăng nhập sai theo IP và theo email.
 *
 * Lưu trong bộ nhớ của tiến trình: trên Vercel mỗi instance serverless đếm riêng,
 * nên đây là lớp chặn dò mật khẩu cơ bản chứ không tuyệt đối. Muốn chặn chặt hơn
 * giữa nhiều instance thì chuyển sang Upstash Redis hoặc bảng đếm trong Supabase.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS_PER_IP = 10;
const MAX_FAILS_PER_EMAIL = 5;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function read(key: string, now: number): Bucket | undefined {
  const bucket = buckets.get(key);
  if (bucket && bucket.resetAt <= now) {
    buckets.delete(key);
    return undefined;
  }
  return bucket;
}

function bump(key: string, now: number) {
  const bucket = read(key, now);
  if (bucket) bucket.count += 1;
  else buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });

  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Số giây còn bị khoá; 0 nếu được thử tiếp */
export function loginRetryAfterSeconds(ip: string, email: string): number {
  const now = Date.now();
  const ipBucket = read(`ip:${ip}`, now);
  const emailBucket = read(`email:${email}`, now);
  let until = 0;
  if (ipBucket && ipBucket.count >= MAX_FAILS_PER_IP) until = ipBucket.resetAt;
  if (emailBucket && emailBucket.count >= MAX_FAILS_PER_EMAIL) {
    until = Math.max(until, emailBucket.resetAt);
  }
  return until ? Math.ceil((until - now) / 1000) : 0;
}

export function recordLoginFailure(ip: string, email: string) {
  const now = Date.now();
  bump(`ip:${ip}`, now);
  bump(`email:${email}`, now);
}

export function clearLoginFailures(email: string) {
  buckets.delete(`email:${email}`);
}
