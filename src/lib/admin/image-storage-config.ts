import { isSupabaseEnabled } from "@/lib/db/config";

export const DEFAULT_STORAGE_BUCKET = "canthogf-media";

/** Bật Supabase Storage khi đã cấu hình Supabase (tắt: SUPABASE_STORAGE_ENABLED=false) */
export function isSupabaseStorageEnabled(): boolean {
  if (process.env.SUPABASE_STORAGE_ENABLED === "false") return false;
  return isSupabaseEnabled();
}

export function getStorageBucket(): string {
  return process.env.SUPABASE_STORAGE_BUCKET?.trim() || DEFAULT_STORAGE_BUCKET;
}

export function getSupabaseProjectHostname(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!raw) return undefined;
  try {
    return new URL(raw.replace(/\/+$/, "")).hostname;
  } catch {
    return undefined;
  }
}
