import "server-only";

import { getSupabaseAdmin } from "@/lib/db/supabase-server";
import {
  getStorageBucket,
  isSupabaseStorageEnabled,
} from "@/lib/admin/image-storage-config";

export async function uploadBufferToSupabaseStorage(
  storagePath: string,
  buffer: Buffer,
  contentType = "image/webp",
): Promise<string> {
  if (!isSupabaseStorageEnabled()) {
    throw new Error("Supabase Storage chưa bật.");
  }

  const supabase = getSupabaseAdmin();
  const bucket = getStorageBucket();

  let path = storagePath.replace(/^\/+/, "");
  let attempt = 0;
  const ext = path.includes(".") ? path.slice(path.lastIndexOf(".")) : "";
  const stem = ext ? path.slice(0, -ext.length) : path;

  while (attempt < 20) {
    const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
      contentType,
      upsert: false,
      cacheControl: "31536000",
    });

    if (!error) {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      return data.publicUrl;
    }

    if (error.message?.includes("already exists") || error.message?.includes("Duplicate")) {
      attempt += 1;
      path = `${stem}-${attempt + 1}${ext}`;
      continue;
    }

    throw new Error(`[storage] upload: ${error.message}`);
  }

  throw new Error("[storage] Không thể tạo tên file duy nhất.");
}
