export type AdminUser = {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  display_name: string | null;
  is_active: number | boolean;
  created_at: string;
  updated_at: string;
};

export type SupabaseAdminUserRow = {
  id: string;
  email: string;
  password_hash: string;
  display_name: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminUserInput = {
  email: string;
  passwordHash: string;
  displayName?: string | null;
  isActive?: boolean;
};

export function rowToAdminUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    displayName: row.display_name,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function supabaseRowToAdminUser(row: SupabaseAdminUserRow): AdminUser {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    displayName: row.display_name,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
