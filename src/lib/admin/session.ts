import {
  isAdminAuthConfigured,
  isAdminEmailAllowed,
} from "@/lib/admin/auth-policy";
import {
  getAdminSessionCookieName,
  passwordFingerprint,
  verifyDbSession,
} from "@/lib/admin/db-session";
import { getAdminUserByEmail } from "@/lib/db/admin-users";
import { createSupabaseAuthServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

/**
 * Email trong cookie phiên còn hợp lệ không:
 * - vẫn được phép (ADMIN_ALLOWED_EMAILS hoặc admin_users đang active), và
 * - với tài khoản trong admin_users: token phải khớp dấu vân tay mật khẩu hiện tại
 *   (đổi mật khẩu / vô hiệu hoá là phiên cũ mất hiệu lực ngay).
 */
async function getValidSessionEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminSessionCookieName())?.value;
  const session = await verifyDbSession(token);
  if (!session) return null;

  let dbUser: Awaited<ReturnType<typeof getAdminUserByEmail>>;
  try {
    dbUser = await getAdminUserByEmail(session.email);
  } catch {
    dbUser = undefined;
  }

  if (dbUser) {
    if (!dbUser.isActive) return null;
    const expected = await passwordFingerprint(dbUser.passwordHash);
    // Token của tài khoản DB luôn mang dấu vân tay mật khẩu lúc đăng nhập.
    // Không khớp (đổi mật khẩu, token cũ không có v) → phiên mất hiệu lực.
    if (session.fingerprint !== expected) return null;
  }

  return (await isAdminEmailAllowed(session.email)) ? session.email : null;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!(await isAdminAuthConfigured())) return false;

  try {
    const supabase = await createSupabaseAuthServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email && (await isAdminEmailAllowed(user.email))) {
      return true;
    }
  } catch {
    // Supabase chưa cấu hình
  }

  try {
    if (await getValidSessionEmail()) {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

export async function requireAdminSession(): Promise<void> {
  const ok = await isAdminAuthenticated();
  if (!ok) {
    throw new Error("UNAUTHORIZED");
  }
}

export async function getAdminUserEmail(): Promise<string | null> {
  try {
    const supabase = await createSupabaseAuthServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.email && (await isAdminEmailAllowed(user.email))) {
      return user.email;
    }
  } catch {
    // Supabase chưa cấu hình
  }

  try {
    const email = await getValidSessionEmail();
    if (email) {
      return email;
    }
  } catch {
    return null;
  }

  return null;
}

/** Dùng ở đầu mỗi trang admin (server component) — không chỉ dựa vào middleware */
export async function requireAdminPage(): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    const { redirect } = await import("next/navigation");
    redirect("/admin/login");
  }
}
