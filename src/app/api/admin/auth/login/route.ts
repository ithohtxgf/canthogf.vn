import { NextResponse } from "next/server";
import {
  getAdminAuthSetupMessage,
  isAdminAuthConfigured,
  isAdminEmailAllowed,
  isSupabaseAuthConfigured,
} from "@/lib/admin/auth-policy";
import {
  createDbSessionToken,
  getAdminSessionCookieName,
  getAdminSessionCookieOptions,
  passwordFingerprint,
} from "@/lib/admin/db-session";
import {
  clearLoginFailures,
  getClientIp,
  loginRetryAfterSeconds,
  recordLoginFailure,
} from "@/lib/admin/login-rate-limit";
import { getDummyPasswordHash, verifyPassword } from "@/lib/admin/password";
import { getAdminUserByEmail } from "@/lib/db/admin-users";
import { getDatabaseSetupStatus } from "@/lib/db/config";
import { createSupabaseAuthServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const INVALID_CREDENTIALS = "Email hoặc mật khẩu không đúng";

/**
 * Trạng thái cho trang đăng nhập. Endpoint này công khai nên chỉ trả chi tiết
 * cấu hình khi CHƯA cấu hình xong (lúc cài đặt) — không lộ hạ tầng khi site đã chạy thật.
 */
export async function GET() {
  const database = getDatabaseSetupStatus();
  const configured = database.ready && (await isAdminAuthConfigured());

  if (configured) {
    return NextResponse.json({ configured: true, database: { ready: true } });
  }

  return NextResponse.json({
    configured: false,
    setupMessage: database.ready ? await getAdminAuthSetupMessage() : null,
    database: { ready: database.ready, message: database.message },
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

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const ip = getClientIp(request);

  if (!email || !password) {
    return NextResponse.json(
      { error: "Vui lòng nhập email và mật khẩu" },
      { status: 400 },
    );
  }

  if (email.length > 254 || password.length > 512) {
    return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 });
  }

  const retryAfter = loginRetryAfterSeconds(ip, email);
  if (retryAfter > 0) {
    return NextResponse.json(
      {
        error: `Đăng nhập sai quá nhiều lần. Thử lại sau ${Math.ceil(retryAfter / 60)} phút.`,
      },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  // Cùng một thông báo cho "email không có quyền" và "sai mật khẩu" — không cho dò email admin
  const fail = () => {
    recordLoginFailure(ip, email);
    return NextResponse.json({ error: INVALID_CREDENTIALS }, { status: 401 });
  };

  if (!(await isAdminEmailAllowed(email))) {
    await verifyPassword(password, getDummyPasswordHash());
    return fail();
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
          clearLoginFailures(email);
          const dbUser = await getAdminUserByEmail(user.email).catch(() => undefined);
          const token = await createDbSessionToken(
            user.email,
            dbUser ? await passwordFingerprint(dbUser.passwordHash) : undefined,
          );
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
  const passwordOk = await verifyPassword(
    password,
    adminUser?.passwordHash ?? getDummyPasswordHash(),
  );

  if (adminUser?.isActive && passwordOk) {
    clearLoginFailures(email);
    const token = await createDbSessionToken(
      adminUser.email,
      await passwordFingerprint(adminUser.passwordHash),
    );
    const response = NextResponse.json({
      ok: true,
      email: adminUser.email,
      authMode: "database",
    });
    response.cookies.set(getAdminSessionCookieName(), token, getAdminSessionCookieOptions());
    return response;
  }

  return fail();
}
