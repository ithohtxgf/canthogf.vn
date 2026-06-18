import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

const KEY_LEN = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 } as const;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LEN, SCRYPT_OPTIONS);
  return `scrypt:${salt}:${hash.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;

  const [, salt, hashHex] = parts;
  if (!salt || !hashHex) return false;

  try {
    const expected = Buffer.from(hashHex, "hex");
    const derived = scryptSync(password, salt, KEY_LEN, SCRYPT_OPTIONS);
    if (expected.length !== derived.length) return false;
    return timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}
