import { isSupabaseEnabled } from "@/lib/db/config";

/** Email được phép vào /admin — tạo user tương ứng trong Supabase Auth */
export function getAdminAllowedEmails(): string[] {
  const raw = process.env.ADMIN_ALLOWED_EMAILS?.trim();
  if (!raw) return [];

  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmailAllowed(email: string | undefined | null): boolean {
  if (!email?.trim()) return false;

  const allowed = getAdminAllowedEmails();
  if (allowed.length === 0) {
    // Dev: chưa khai báo danh sách → cho phép mọi user Supabase Auth hợp lệ
    return process.env.NODE_ENV !== "production" && !process.env.VERCEL;
  }

  return allowed.includes(email.trim().toLowerCase());
}

export function isSupabaseAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

export function isAdminAuthConfigured(): boolean {
  if (!isSupabaseAuthConfigured() || !isSupabaseEnabled()) return false;

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    return getAdminAllowedEmails().length > 0;
  }

  return true;
}

export function getAdminAuthSetupMessage(): string | null {
  if (!isSupabaseAuthConfigured()) {
    return "Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY.";
  }
  if (!isSupabaseEnabled()) {
    return "Thiếu SUPABASE_SERVICE_ROLE_KEY — CMS cần Supabase đầy đủ.";
  }
  if (
    (process.env.NODE_ENV === "production" || process.env.VERCEL) &&
    getAdminAllowedEmails().length === 0
  ) {
    return "Thêm ADMIN_ALLOWED_EMAILS trên Vercel (email admin đã tạo trong Supabase Auth).";
  }
  return null;
}
