import { NextResponse } from "next/server";
import {
  getAdminAuthSetupMessage,
  isAdminAuthConfigured,
  isAdminEmailAllowed,
} from "@/lib/admin/auth-policy";
import { getDatabaseSetupStatus } from "@/lib/db/config";
import { createSupabaseAuthServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  const database = getDatabaseSetupStatus();
  const setupMessage = getAdminAuthSetupMessage();

  return NextResponse.json({
    configured: isAdminAuthConfigured(),
    authMode: "supabase",
    setupMessage,
    database,
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

  const setupMessage = getAdminAuthSetupMessage();
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      {
        error:
          setupMessage ??
          "Chưa cấu hình Supabase Auth. Xem hướng dẫn trong .env.example.",
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

  if (!isAdminEmailAllowed(email)) {
    return NextResponse.json(
      { error: "Email này không có quyền truy cập admin" },
      { status: 403 },
    );
  }

  try {
    const supabase = await createSupabaseAuthServerClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const message =
        error.message === "Invalid login credentials"
          ? "Email hoặc mật khẩu không đúng"
          : error.message;
      return NextResponse.json({ error: message }, { status: 401 });
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !isAdminEmailAllowed(user.email)) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { error: "Email này không có quyền truy cập admin" },
        { status: 403 },
      );
    }

    return NextResponse.json({ ok: true, email: user.email });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Không tạo được phiên đăng nhập";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
