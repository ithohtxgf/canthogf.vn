/** Mật khẩu admin — dùng chung cho verify + ký session (Node + Edge) */
export function getAdminPassword(): string {
  const fromEnv = process.env.ADMIN_PASSWORD?.trim();
  if (fromEnv) return fromEnv;

  if (process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_PASSWORD is required in production");
  }

  return "admin123";
}

export function getSessionSecret(): string {
  return getAdminPassword();
}

/** Chỉ cho phép redirect nội bộ sau login */
export function sanitizeAdminRedirect(next: string | null): string {
  const fallback = "/admin/articles";
  if (!next?.trim()) return fallback;

  const value = next.trim();
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  if (!value.startsWith("/admin")) return fallback;

  return value;
}
