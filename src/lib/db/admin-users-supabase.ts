import { getSupabaseAdmin } from "./supabase-server";
import {
  supabaseRowToAdminUser,
  type AdminUser,
  type AdminUserInput,
  type SupabaseAdminUserRow,
} from "./admin-user-mapper";

export async function countAdminUsersSupabase(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("admin_users")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  if (error) throw new Error(`[supabase] countAdminUsers: ${error.message}`);
  return count ?? 0;
}

export async function getAdminUserByEmailSupabase(
  email: string,
): Promise<AdminUser | undefined> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .ilike("email", email.trim())
    .maybeSingle();

  if (error) throw new Error(`[supabase] getAdminUserByEmail: ${error.message}`);
  if (!data) return undefined;

  return supabaseRowToAdminUser(data as SupabaseAdminUserRow);
}

export async function listAdminUsersSupabase(): Promise<AdminUser[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .order("email", { ascending: true });

  if (error) throw new Error(`[supabase] listAdminUsers: ${error.message}`);
  return (data as SupabaseAdminUserRow[]).map(supabaseRowToAdminUser);
}

export async function createAdminUserSupabase(
  input: AdminUserInput,
): Promise<AdminUser> {
  const supabase = getSupabaseAdmin();
  const email = input.email.trim().toLowerCase();
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email,
      password_hash: input.passwordHash,
      display_name: input.displayName ?? null,
      is_active: input.isActive !== false,
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) throw new Error(`[supabase] createAdminUser: ${error.message}`);
  return supabaseRowToAdminUser(data as SupabaseAdminUserRow);
}

export async function upsertAdminUserFromPasswordSupabase(options: {
  email: string;
  password: string;
  displayName?: string;
}): Promise<AdminUser> {
  const email = options.email.trim().toLowerCase();
  const existing = await getAdminUserByEmailSupabase(email);
  const { hashPassword } = await import("@/lib/admin/password");
  const passwordHash = hashPassword(options.password);
  const now = new Date().toISOString();

  if (existing) {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("admin_users")
      .update({
        password_hash: passwordHash,
        display_name: options.displayName ?? existing.displayName,
        is_active: true,
        updated_at: now,
      })
      .eq("id", existing.id)
      .select("*")
      .single();

    if (error) throw new Error(`[supabase] updateAdminUser: ${error.message}`);
    return supabaseRowToAdminUser(data as SupabaseAdminUserRow);
  }

  return createAdminUserSupabase({
    email,
    passwordHash,
    displayName: options.displayName,
    isActive: true,
  });
}
