/** Chỉ đọc env — an toàn cho Edge middleware (không import DB/SQLite) */

export function getAdminAllowedEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS?.trim();
  if (!raw) return [];

  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmailInEnvAllowlist(
  email: string | undefined | null,
): boolean {
  if (!email?.trim()) return false;

  const allowed = getAdminAllowedEmails();
  if (allowed.length === 0) return false;

  return allowed.includes(email.trim().toLowerCase());
}
