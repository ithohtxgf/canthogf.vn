import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAdminEmailAllowed } from "@/lib/admin/auth-policy";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

export async function updateAdminSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  let supabase;
  try {
    supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
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
  } catch {
    return { response, user: null, isAdmin: false };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = Boolean(user && isAdminEmailAllowed(user.email));

  return { response, user, isAdmin };
}
