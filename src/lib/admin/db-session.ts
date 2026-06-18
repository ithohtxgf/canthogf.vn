const COOKIE_NAME = "admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  email: string;
  exp: number;
};

function getSessionSecret(): string {
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (secret) return secret;

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    throw new Error("Thiếu ADMIN_SESSION_SECRET hoặc SUPABASE_SERVICE_ROLE_KEY");
  }

  return "dev-insecure-admin-session";
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacSign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return toBase64Url(new Uint8Array(signature));
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function getAdminSessionCookieName(): string {
  return COOKIE_NAME;
}

export function getAdminSessionMaxAge(): number {
  return MAX_AGE_SECONDS;
}

export async function createDbSessionToken(email: string): Promise<string> {
  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS,
  };
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const signature = await hmacSign(payloadB64);
  return `${payloadB64}.${signature}`;
}

export async function verifyDbSessionToken(
  token: string | undefined | null,
): Promise<string | null> {
  if (!token?.trim()) return null;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expected = await hmacSign(payloadB64);
  if (!timingSafeEqualStrings(signature, expected)) return null;

  try {
    const json = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload = JSON.parse(json) as SessionPayload;
    if (!payload.email || typeof payload.exp !== "number") return null;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload.email;
  } catch {
    return null;
  }
}

export type AdminSessionCookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
};

export function getAdminSessionCookieOptions(): AdminSessionCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  };
}
