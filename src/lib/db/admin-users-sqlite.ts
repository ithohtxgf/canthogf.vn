import { randomUUID } from "crypto";
import { getDb } from "./connection";
import {
  rowToAdminUser,
  type AdminUser,
  type AdminUserInput,
  type AdminUserRow,
} from "./admin-user-mapper";
import { hashPassword } from "@/lib/admin/password";

export async function countAdminUsersSqlite(): Promise<number> {
  const db = getDb();
  const row = db
    .prepare("SELECT COUNT(*) AS count FROM admin_users WHERE is_active = 1")
    .get() as { count: number };
  return row.count;
}

export async function getAdminUserByEmailSqlite(
  email: string,
): Promise<AdminUser | undefined> {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM admin_users WHERE lower(email) = lower(?) LIMIT 1")
    .get(email.trim()) as AdminUserRow | undefined;
  return row ? rowToAdminUser(row) : undefined;
}

export async function listAdminUsersSqlite(): Promise<AdminUser[]> {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM admin_users ORDER BY email ASC")
    .all() as AdminUserRow[];
  return rows.map(rowToAdminUser);
}

export async function createAdminUserSqlite(
  input: AdminUserInput,
): Promise<AdminUser> {
  const db = getDb();
  const now = new Date().toISOString();
  const id = randomUUID();
  const email = input.email.trim().toLowerCase();

  db.prepare(
    `INSERT INTO admin_users (
      id, email, password_hash, display_name, is_active, created_at, updated_at
    ) VALUES (
      @id, @email, @password_hash, @display_name, @is_active, @created_at, @updated_at
    )`,
  ).run({
    id,
    email,
    password_hash: input.passwordHash,
    display_name: input.displayName ?? null,
    is_active: input.isActive === false ? 0 : 1,
    created_at: now,
    updated_at: now,
  });

  const created = await getAdminUserByEmailSqlite(email);
  if (!created) throw new Error("Không tạo được admin user");
  return created;
}

export async function upsertAdminUserFromPasswordSqlite(options: {
  email: string;
  password: string;
  displayName?: string;
}): Promise<AdminUser> {
  const email = options.email.trim().toLowerCase();
  const existing = await getAdminUserByEmailSqlite(email);
  const passwordHash = hashPassword(options.password);
  const now = new Date().toISOString();

  if (existing) {
    const db = getDb();
    db.prepare(
      `UPDATE admin_users SET
        password_hash = @password_hash,
        display_name = COALESCE(@display_name, display_name),
        is_active = 1,
        updated_at = @updated_at
      WHERE id = @id`,
    ).run({
      id: existing.id,
      password_hash: passwordHash,
      display_name: options.displayName ?? existing.displayName,
      updated_at: now,
    });
    const updated = await getAdminUserByEmailSqlite(email);
    if (!updated) throw new Error("Không cập nhật được admin user");
    return updated;
  }

  return createAdminUserSqlite({
    email,
    passwordHash,
    displayName: options.displayName,
    isActive: true,
  });
}
