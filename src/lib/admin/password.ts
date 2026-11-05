import { randomBytes, scrypt, scryptSync, timingSafeEqual } from "crypto";

const KEY_LEN = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 } as const;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LEN, SCRYPT_OPTIONS);
  return `scrypt:${salt}:${hash.toString("hex")}`;
}

function scryptAsync(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LEN, SCRYPT_OPTIONS, (error, derived) => {
      if (error) reject(error);
      else resolve(derived);
    });
  });
}

/** Bản async — không chặn event loop khi có nhiều lượt đăng nhập cùng lúc */
export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;

  const [, salt, hashHex] = parts;
  if (!salt || !hashHex) return false;

  try {
    const expected = Buffer.from(hashHex, "hex");
    const derived = await scryptAsync(password, salt);
    if (expected.length !== derived.length) return false;
    return timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}

let dummyHash: string | undefined;

/** Hash giả để so khi email không tồn tại — giữ thời gian phản hồi như nhau */
export function getDummyPasswordHash(): string {
  dummyHash ??= hashPassword(randomBytes(12).toString("hex"));
  return dummyHash;
}
