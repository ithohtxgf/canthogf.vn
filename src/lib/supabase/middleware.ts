import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminEmailInEnvAllowlist } from "@/lib/admin/auth-allowlist";
import {
  getAdminSessionCookieName,
  verifyDbSessionToken,
} from "@/lib/admin/db-session";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

export async function updateAdminSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  let supabaseUserEmail: string | null = null;

  try {
    const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {
      supabaseUserEmail = user.email;
    }
  } catch {
    // Supabase chưa cấu hình
  }

  const sessionToken = request.cookies.get(getAdminSessionCookieName())?.value;
  const dbSessionEmail = await verifyDbSessionToken(sessionToken);

  let isAdmin = Boolean(dbSessionEmail);

  if (!isAdmin && supabaseUserEmail) {
    if (isAdminEmailInEnvAllowlist(supabaseUserEmail)) {
      isAdmin = true;
    } else if (
      process.env.NODE_ENV !== "production" &&
      !process.env.VERCEL &&
      !process.env.ADMIN_ALLOWED_EMAILS?.trim()
    ) {
      // Dev: chưa khai báo env — tin Supabase Auth session
      isAdmin = true;
    }
  }

  return { response, user: supabaseUserEmail ?? dbSessionEmail, isAdmin };
}
