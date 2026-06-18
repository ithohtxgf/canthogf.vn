import { NextResponse } from "next/server";
import {
  getAdminSessionCookieName,
  getAdminSessionCookieOptions,
} from "@/lib/admin/db-session";
import { createSupabaseAuthServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    const supabase = await createSupabaseAuthServerClient();
    await supabase.auth.signOut();
  } catch {
    // Supabase chưa cấu hình
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminSessionCookieName(), "", {
    ...getAdminSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
