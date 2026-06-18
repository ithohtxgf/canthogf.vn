import {
  isAdminAuthConfigured,
  isAdminEmailAllowed,
} from "@/lib/admin/auth-policy";
import {
  getAdminSessionCookieName,
  verifyDbSessionToken,
} from "@/lib/admin/db-session";
import { createSupabaseAuthServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

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
    const cookieStore = await cookies();
    const token = cookieStore.get(getAdminSessionCookieName())?.value;
    const email = await verifyDbSessionToken(token);
    if (email && (await isAdminEmailAllowed(email))) {
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
    const cookieStore = await cookies();
    const token = cookieStore.get(getAdminSessionCookieName())?.value;
    const email = await verifyDbSessionToken(token);
    if (email && (await isAdminEmailAllowed(email))) {
      return email;
    }
  } catch {
    return null;
  }

  return null;
}
