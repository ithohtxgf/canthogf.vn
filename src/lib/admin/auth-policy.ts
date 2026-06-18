import { getDatabaseSetupStatus, isSupabaseEnabled } from "@/lib/db/config";
import { countActiveAdminUsers, isActiveAdminInDatabase } from "@/lib/db/admin-users";
import {
  getAdminAllowedEmails,
  isAdminEmailInEnvAllowlist,
} from "@/lib/admin/auth-allowlist";

export { getAdminAllowedEmails, isAdminEmailInEnvAllowlist } from "@/lib/admin/auth-allowlist";

/**
 * Email được phép vào admin:
 * 1) ADMIN_ALLOWED_EMAILS trong .env, hoặc
 * 2) Bản ghi active trong bảng admin_users
 */
export async function isAdminEmailAllowed(
  email: string | undefined | null,
): Promise<boolean> {
  if (!email?.trim()) return false;

  const normalized = email.trim().toLowerCase();

  if (isAdminEmailInEnvAllowlist(normalized)) return true;

  try {
    if (await isActiveAdminInDatabase(normalized)) return true;
  } catch {
    // DB chưa migrate — bỏ qua
  }

  const allowed = getAdminAllowedEmails();
  if (
    allowed.length === 0 &&
    process.env.NODE_ENV !== "production" &&
    !process.env.VERCEL
  ) {
    // Dev: chưa khai báo env và chưa có admin DB → cho mọi user Supabase Auth hợp lệ
    return true;
  }

  return false;
}

export function isSupabaseAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

export async function isDatabaseAuthAvailable(): Promise<boolean> {
  const dbStatus = getDatabaseSetupStatus();
  if (!dbStatus.ready) return false;

  try {
    const count = await countActiveAdminUsers();
    return count > 0;
  } catch {
    return false;
  }
}

export async function isAdminAuthConfigured(): Promise<boolean> {
  if (await isDatabaseAuthAvailable()) return true;

  if (!isSupabaseAuthConfigured() || !isSupabaseEnabled()) return false;

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    return getAdminAllowedEmails().length > 0;
  }

  return true;
}

export async function getAdminAuthSetupMessage(): Promise<string | null> {
  if (await isDatabaseAuthAvailable()) return null;

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
    return "Thêm admin vào bảng admin_users (npm run db:seed-admin) hoặc ADMIN_ALLOWED_EMAILS trên Vercel.";
  }
  return null;
}

export async function getAdminAuthModes(): Promise<Array<"database" | "supabase">> {
  const modes: Array<"database" | "supabase"> = [];

  if (await isDatabaseAuthAvailable()) modes.push("database");
  if (isSupabaseAuthConfigured() && isSupabaseEnabled()) modes.push("supabase");

  return modes;
}
