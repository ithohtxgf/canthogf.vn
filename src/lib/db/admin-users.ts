import { isSupabaseEnabled } from "@/lib/db/config";
import type { AdminUser, AdminUserInput } from "./admin-user-mapper";

export type { AdminUser, AdminUserInput } from "./admin-user-mapper";

async function useSqlite() {
  return import("./admin-users-sqlite");
}

async function useSupabase() {
  return import("./admin-users-supabase");
}

export async function countActiveAdminUsers(): Promise<number> {
  return isSupabaseEnabled()
    ? (await useSupabase()).countAdminUsersSupabase()
    : (await useSqlite()).countAdminUsersSqlite();
}

export async function getAdminUserByEmail(
  email: string,
): Promise<AdminUser | undefined> {
  return isSupabaseEnabled()
    ? (await useSupabase()).getAdminUserByEmailSupabase(email)
    : (await useSqlite()).getAdminUserByEmailSqlite(email);
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  return isSupabaseEnabled()
    ? (await useSupabase()).listAdminUsersSupabase()
    : (await useSqlite()).listAdminUsersSqlite();
}

export async function createAdminUser(
  input: AdminUserInput,
): Promise<AdminUser> {
  return isSupabaseEnabled()
    ? (await useSupabase()).createAdminUserSupabase(input)
    : (await useSqlite()).createAdminUserSqlite(input);
}

export async function upsertAdminUserFromPassword(options: {
  email: string;
  password: string;
  displayName?: string;
}): Promise<AdminUser> {
  return isSupabaseEnabled()
    ? (await useSupabase()).upsertAdminUserFromPasswordSupabase(options)
    : (await useSqlite()).upsertAdminUserFromPasswordSqlite(options);
}

export async function isActiveAdminInDatabase(
  email: string,
): Promise<boolean> {
  const user = await getAdminUserByEmail(email);
  return Boolean(user?.isActive);
}
