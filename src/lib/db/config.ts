/** Supabase được bật khi có URL + service role key trên server */
export function isSupabaseEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

export function getDatabaseMode(): "supabase" | "sqlite" {
  return isSupabaseEnabled() ? "supabase" : "sqlite";
}

/** Production / Vercel — SQLite không dùng được (filesystem + native module) */
export function isProductionRuntime(): boolean {
  return (
    process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL)
  );
}

export type DatabaseSetupStatus = {
  mode: "supabase" | "sqlite" | "none";
  ready: boolean;
  message: string | null;
};

/** Kiểm tra cấu hình DB — dùng trên login + admin để tránh crash 500 */
export function getDatabaseSetupStatus(): DatabaseSetupStatus {
  if (isSupabaseEnabled()) {
    return { mode: "supabase", ready: true, message: null };
  }

  if (isProductionRuntime()) {
    const missing: string[] = [];
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) {
      missing.push("NEXT_PUBLIC_SUPABASE_URL");
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
      missing.push("SUPABASE_SERVICE_ROLE_KEY");
    }

    return {
      mode: "none",
      ready: false,
      message:
        missing.length > 0
          ? `Production cần Supabase. Thêm trên Vercel: ${missing.join(", ")} → Redeploy.`
          : "Production cần Supabase Postgres — SQLite không chạy trên Vercel.",
    };
  }

  return { mode: "sqlite", ready: true, message: null };
}

export function assertDatabaseReady(): void {
  const status = getDatabaseSetupStatus();
  if (!status.ready) {
    throw new Error(status.message ?? "Database chưa sẵn sàng");
  }
}
