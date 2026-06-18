import { NextResponse } from "next/server";
import {
  getAdminAuthModes,
  getAdminAuthSetupMessage,
  isAdminAuthConfigured,
  isAdminEmailAllowed,
  isSupabaseAuthConfigured,
} from "@/lib/admin/auth-policy";
import {
  createDbSessionToken,
  getAdminSessionCookieName,
  getAdminSessionCookieOptions,
} from "@/lib/admin/db-session";
import { verifyPassword } from "@/lib/admin/password";
import { getAdminUserByEmail } from "@/lib/db/admin-users";
import { getDatabaseSetupStatus } from "@/lib/db/config";
import { createSupabaseAuthServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const database = getDatabaseSetupStatus();
  const setupMessage = await getAdminAuthSetupMessage();
  const authModes = await getAdminAuthModes();

  return NextResponse.json({
    configured: await isAdminAuthConfigured(),
    authModes,
    setupMessage,
    database,
    supabaseAuth: isSupabaseAuthConfigured(),
  });
}

export async function POST(request: Request) {
  const database = getDatabaseSetupStatus();
  if (!database.ready) {
    return NextResponse.json(
      {
        error:
          database.message ??
          "Database chưa sẵn sàng. Cấu hình Supabase trên Vercel rồi Redeploy.",
      },
      { status: 503 },
    );
  }

  const setupMessage = await getAdminAuthSetupMessage();
  if (!(await isAdminAuthConfigured())) {
    return NextResponse.json(
      {
        error:
          setupMessage ??
          "Chưa cấu hình đăng nhập. Chạy npm run db:seed-admin hoặc xem .env.example.",
      },
      { status: 503 },
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = (await request.json()) as { email?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json(
      { error: "Vui lòng nhập email và mật khẩu" },
      { status: 400 },
    );
  }

  if (!(await isAdminEmailAllowed(email))) {
    return NextResponse.json(
      { error: "Email này không có quyền truy cập admin" },
      { status: 403 },
    );
  }

  // 1) Supabase Auth (nếu đã cấu hình)
  if (isSupabaseAuthConfigured()) {
    try {
      const supabase = await createSupabaseAuthServerClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (!error) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email && (await isAdminEmailAllowed(user.email))) {
          const token = await createDbSessionToken(user.email);
          const response = NextResponse.json({
            ok: true,
            email: user.email,
            authMode: "supabase",
          });
          response.cookies.set(
            getAdminSessionCookieName(),
            token,
            getAdminSessionCookieOptions(),
          );
          return response;
        }

        await supabase.auth.signOut();
      }
    } catch {
      // Fallback sang DB auth
    }
  }

  // 2) Database auth — email + password_hash trong admin_users
  const adminUser = await getAdminUserByEmail(email);
  if (
    adminUser?.isActive &&
    verifyPassword(password, adminUser.passwordHash)
  ) {
    const token = await createDbSessionToken(adminUser.email);
    const response = NextResponse.json({
      ok: true,
      email: adminUser.email,
      authMode: "database",
    });
    response.cookies.set(getAdminSessionCookieName(), token, getAdminSessionCookieOptions());
    return response;
  }

  return NextResponse.json(
    { error: "Email hoặc mật khẩu không đúng" },
    { status: 401 },
  );
}
