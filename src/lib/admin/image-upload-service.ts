import fs from "fs";
import path from "path";
import sharp from "sharp";
import { slugify } from "@/lib/admin/defaults";
import { isSupabaseStorageEnabled } from "@/lib/admin/image-storage-config";
import { uploadBufferToSupabaseStorage } from "@/lib/admin/supabase-storage";

const MAX_WIDTH = 1200;
const MAX_BYTES = 150 * 1024;
const MAX_INPUT_BYTES = 12 * 1024 * 1024;

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export type ImageUploadKind = "article" | "promo";

export type ProcessedImage = {
  url: string;
  filename: string;
  sizeBytes: number;
  width: number;
  height: number;
  storage: "local" | "supabase";
};

export function buildImageFilename(
  entitySlug: string,
  nameHint: string,
): string {
  const slug = slugify(entitySlug) || "asset";
  const hint = slugify(nameHint) || "image";
  const base = `${slug}-${hint}`.replace(/^-+|-+$/g, "").slice(0, 96);
  return `${base || slug}.webp`;
}

function getLocalDirectory(kind: ImageUploadKind, entitySlug: string): string {
  const slug = slugify(entitySlug) || "misc";
  const segment = kind === "article" ? "articles" : "promos";
  return path.join(process.cwd(), "public", "images", segment, slug);
}

function getStorageObjectPath(
  kind: ImageUploadKind,
  entitySlug: string,
  filename: string,
): string {
  const slug = slugify(entitySlug) || "misc";
  const segment = kind === "article" ? "articles" : "promos";
  return `${segment}/${slug}/${filename}`;
}

function resolveUniqueFilePath(dir: string, filename: string): string {
  const ext = path.extname(filename);
  const stem = path.basename(filename, ext);
  let candidate = path.join(dir, filename);
  let counter = 2;

  while (fs.existsSync(candidate)) {
    candidate = path.join(dir, `${stem}-${counter}${ext}`);
    counter += 1;
  }

  return candidate;
}

async function encodeUnderBudget(
  input: Buffer,
  maxWidth: number,
): Promise<{ buffer: Buffer; width: number; height: number }> {
  let quality = 82;
  let width = maxWidth;

  while (width >= 480) {
    while (quality >= 40) {
      const buffer = await sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 4 })
        .toBuffer();

      if (buffer.length <= MAX_BYTES) {
        const meta = await sharp(buffer).metadata();
        return {
          buffer,
          width: meta.width ?? width,
          height: meta.height ?? 0,
        };
      }

      quality -= 5;
    }

    width -= 200;
    quality = 82;
  }

  const buffer = await sharp(input)
    .rotate()
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 40, effort: 4 })
    .toBuffer();
  const meta = await sharp(buffer).metadata();

  return {
    buffer,
    width: meta.width ?? 480,
    height: meta.height ?? 0,
  };
}

async function saveImageLocally(
  buffer: Buffer,
  kind: ImageUploadKind,
  entitySlug: string,
  filename: string,
): Promise<{ url: string; filename: string }> {
  const dir = getLocalDirectory(kind, entitySlug);
  fs.mkdirSync(dir, { recursive: true });

  const absolutePath = resolveUniqueFilePath(dir, filename);
  fs.writeFileSync(absolutePath, buffer);

  const url = absolutePath
    .replace(path.join(process.cwd(), "public"), "")
    .replace(/\\/g, "/");

  return { url, filename: path.basename(absolutePath) };
}

/** Nén WebP + lưu local hoặc Supabase Storage (CDN) */
export async function processAndSaveImage(
  fileBuffer: Buffer,
  options: {
    kind: ImageUploadKind;
    entitySlug: string;
    nameHint: string;
  },
): Promise<ProcessedImage> {
  if (fileBuffer.length > MAX_INPUT_BYTES) {
    throw new Error("Ảnh gốc quá lớn (tối đa 12MB).");
  }

  const entitySlug = slugify(options.entitySlug);
  if (!entitySlug) {
    throw new Error(
      options.kind === "article"
        ? "Slug bài viết không hợp lệ — nhập slug trước khi upload."
        : "ID khuyến mãi không hợp lệ — nhập ID trước khi upload.",
    );
  }

  const baseFilename = buildImageFilename(entitySlug, options.nameHint);
  const { buffer, width, height } = await encodeUnderBudget(
    fileBuffer,
    MAX_WIDTH,
  );

  if (isSupabaseStorageEnabled()) {
    const storagePath = getStorageObjectPath(
      options.kind,
      entitySlug,
      baseFilename,
    );
    const url = await uploadBufferToSupabaseStorage(storagePath, buffer);
    return {
      url,
      filename: path.basename(storagePath),
      sizeBytes: buffer.length,
      width,
      height,
      storage: "supabase",
    };
  }

  const saved = await saveImageLocally(
    buffer,
    options.kind,
    entitySlug,
    baseFilename,
  );

  return {
    url: saved.url,
    filename: saved.filename,
    sizeBytes: buffer.length,
    width,
    height,
    storage: "local",
  };
}

/** @deprecated Dùng processAndSaveImage */
export async function processAndSaveArticleImage(
  fileBuffer: Buffer,
  options: { articleSlug: string; nameHint: string },
) {
  const result = await processAndSaveImage(fileBuffer, {
    kind: "article",
    entitySlug: options.articleSlug,
    nameHint: options.nameHint,
  });
  return {
    publicPath: result.url,
    filename: result.filename,
    sizeBytes: result.sizeBytes,
    width: result.width,
    height: result.height,
  };
}
