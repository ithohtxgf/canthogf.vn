/** Chỉ cho phép redirect nội bộ sau login */
export function sanitizeAdminRedirect(next: string | null): string {
  const fallback = "/admin";
  if (!next?.trim()) return fallback;

  const value = next.trim();
  if (!value.startsWith("/") || value.startsWith("//")) return fallback;
  if (!value.startsWith("/admin")) return fallback;

  return value;
}
