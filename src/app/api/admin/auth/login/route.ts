import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminPasswordConfigured } from "@/lib/admin/auth-secret";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  getSessionCookieOptions,
  verifyAdminPassword,
} from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    configured: isAdminPasswordConfigured(),
  });
}

export async function POST(request: Request) {
  if (!isAdminPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "Server chưa cấu hình ADMIN_PASSWORD. Thêm biến này trong Vercel → Settings → Environment Variables (Production) rồi Redeploy.",
      },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const password = body.password ?? "";

  if (!password.trim()) {
    return NextResponse.json(
      { error: "Vui lòng nhập mật khẩu" },
      { status: 400 },
    );
  }

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Mật khẩu không đúng" }, { status: 401 });
  }

  try {
    const token = createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, token, getSessionCookieOptions());

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không tạo được phiên đăng nhập";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
