import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isSupabaseEnabled } from "@/lib/db/config";

declare global {
  // eslint-disable-next-line no-var
  var __canthogfSupabaseAdmin: SupabaseClient | undefined;
}

export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseEnabled()) {
    throw new Error(
      "Supabase chưa cấu hình. Thêm NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY vào .env",
    );
  }

  if (globalThis.__canthogfSupabaseAdmin) {
    return globalThis.__canthogfSupabaseAdmin;
  }

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/+$/, ""),
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );

  if (process.env.NODE_ENV !== "production") {
    globalThis.__canthogfSupabaseAdmin = client;
  }

  return client;
}
