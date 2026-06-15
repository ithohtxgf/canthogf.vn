import { getSessionSecret } from "@/lib/admin/auth-secret";

const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7;

export const ADMIN_SESSION_COOKIE = "admin_session";

function bufferToHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

/** Xác thực session cookie — tương thích Edge Runtime (middleware) */
export async function verifySessionTokenEdge(
  token: string | undefined,
): Promise<boolean> {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [time, random, sig] = parts;
  const payload = `${time}.${random}`;
  const encoder = new TextEncoder();

  let secret: string;
  try {
    secret = getSessionSecret();
  } catch {
    return false;
  }

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  const expected = bufferToHex(signature);

  if (sig.length !== expected.length) return false;

  let mismatch = 0;
  for (let i = 0; i < sig.length; i++) {
    mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (mismatch !== 0) return false;

  const issuedAt = Number(time);
  if (!Number.isFinite(issuedAt)) return false;

  const ageMs = Date.now() - issuedAt;
  return ageMs >= 0 && ageMs <= SESSION_MAX_AGE_SEC * 1000;
}
