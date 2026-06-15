import {
  isAdminAuthConfigured,
  isAdminEmailAllowed,
} from "@/lib/admin/auth-policy";
import { createSupabaseAuthServerClient } from "@/lib/supabase/server";

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!isAdminAuthConfigured()) return false;

  try {
    const supabase = await createSupabaseAuthServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return Boolean(user && isAdminEmailAllowed(user.email));
  } catch {
    return false;
  }
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
    if (!user?.email || !isAdminEmailAllowed(user.email)) return null;
    return user.email;
  } catch {
    return null;
  }
}
