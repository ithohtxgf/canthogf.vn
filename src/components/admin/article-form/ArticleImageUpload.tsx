"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Sparkles } from "lucide-react";
import {
  AdminButton,
  AdminField,
  adminInputClass,
} from "@/components/admin/AdminShell";
import { suggestImageAlt } from "@/lib/admin/image-alt-suggest";
import type { ImageUploadKind } from "@/lib/admin/image-upload-service";

export type ImageUploadResult = {
  url: string;
  width?: number;
  height?: number;
  storage?: string;
};

type AdminImageUploadProps = {
  kind?: ImageUploadKind;
  entitySlug: string;
  primaryKeyword?: string;
  alt?: string;
  caption?: string;
  currentSrc?: string;
  nameHint?: string;
  altDescription?: string;
  requireAlt?: boolean;
  onAltChange?: (value: string) => void;
  onCaptionChange?: (value: string) => void;
  onUploaded: (result: ImageUploadResult) => void;
  onManualUrlChange?: (url: string) => void;
  showManualUrl?: boolean;
};

type ArticleImageUploadProps = Omit<
  AdminImageUploadProps,
  "kind" | "entitySlug" | "onUploaded"
> & {
  articleSlug?: string;
  entitySlug?: string;
  onUploaded: (url: string) => void;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function AdminImageUpload({
  kind = "article",
  entitySlug,
  primaryKeyword = "",
  alt = "",
  caption = "",
  currentSrc,
  nameHint = "image",
  altDescription = "",
  requireAlt,
  onAltChange,
  onCaptionChange,
  onUploaded,
  onManualUrlChange,
  showManualUrl = true,
}: AdminImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [lastMeta, setLastMeta] = useState("");

  const slugReady = Boolean(entitySlug.trim());
  const mustHaveAlt = requireAlt ?? kind === "article";
  const altReady = !mustHaveAlt || Boolean(alt.trim());

  async function handleUpload(file: File) {
    if (!slugReady) {
      setError(
        kind === "article"
          ? "Nhập slug hoặc tiêu đề bài trước khi upload."
          : "Nhập ID khuyến mãi trước khi upload.",
      );
      return;
    }
    if (!altReady) {
      setError("Điền Alt text trước khi upload (bắt buộc SEO).");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("kind", kind);
    formData.append("entitySlug", entitySlug.trim());
    if (alt.trim()) formData.append("alt", alt.trim());
    formData.append("nameHint", nameHint);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    const data = (await res.json()) as {
      url?: string;
      error?: string;
      sizeBytes?: number;
      width?: number;
      height?: number;
      filename?: string;
      storage?: string;
    };

    if (!res.ok || !data.url) {
      setError(data.error ?? "Upload thất bại.");
      return;
    }

    onUploaded({
      url: data.url,
      width: data.width,
      height: data.height,
      storage: data.storage,
    });

    const storageLabel =
      data.storage === "supabase" ? "Supabase CDN" : "local public/";
    setLastMeta(
      `${data.filename} · ${data.width}×${data.height}px · ${formatBytes(data.sizeBytes ?? 0)} · ${storageLabel}`,
    );
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void handleUpload(file);
    event.target.value = "";
  }

  return (
    <div className="space-y-3">
      {onAltChange && (
        <AdminField
          label={mustHaveAlt ? "Alt text *" : "Alt text (khuyến nghị)"}
          hint='Gợi ý: "Mô tả ảnh + từ khóa + Cần Thơ GF"'
        >
          <div className="flex gap-2">
            <input
              className={adminInputClass}
              value={alt}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder={
                kind === "promo"
                  ? "VD: Banner ưu đãi VinFast VF5 Cần Thơ GF"
                  : "VD: Lễ bàn giao VinFast VF5 tại showroom Cần Thơ GF"
              }
            />
            <AdminButton
              type="button"
              variant="secondary"
              className="shrink-0 whitespace-nowrap"
              onClick={() =>
                onAltChange(
                  suggestImageAlt(altDescription || alt, primaryKeyword),
                )
              }
            >
              <Sparkles className="w-4 h-4 mr-1 inline" />
              Gợi ý
            </AdminButton>
          </div>
        </AdminField>
      )}

      {onCaptionChange && (
        <AdminField label="Caption (tùy chọn)">
          <input
            className={adminInputClass}
            value={caption}
            onChange={(e) => onCaptionChange(e.target.value)}
          />
        </AdminField>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={onFileChange}
        />
        <AdminButton
          type="button"
          variant="secondary"
          disabled={uploading || !slugReady || !altReady}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-1 inline animate-spin" />
              Đang nén...
            </>
          ) : (
            <>
              <ImagePlus className="w-4 h-4 mr-1 inline" />
              Upload ảnh (.webp &lt;150KB)
            </>
          )}
        </AdminButton>
        {!slugReady && (
          <span className="text-xs text-amber-700">
            {kind === "article" ? "Cần slug bài viết" : "Cần ID khuyến mãi"}
          </span>
        )}
        {slugReady && !altReady && (
          <span className="text-xs text-amber-700">Điền Alt trước khi upload</span>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {lastMeta && (
        <p className="text-xs text-green-700">Đã lưu: {lastMeta}</p>
      )}

      {currentSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc}
          alt={alt || "preview"}
          className="max-h-48 rounded-lg border border-slate-200 object-cover"
        />
      )}

      {showManualUrl && onManualUrlChange && (
        <AdminField
          label="Hoặc dán URL ảnh"
          hint="CDN Supabase hoặc path /images/..."
        >
          <input
            className={adminInputClass}
            value={currentSrc ?? ""}
            onChange={(e) => onManualUrlChange(e.target.value)}
            placeholder="https://....supabase.co/storage/... hoặc /images/..."
          />
        </AdminField>
      )}
    </div>
  );
}

export function ArticleImageUpload({
  articleSlug,
  entitySlug,
  onUploaded,
  ...props
}: ArticleImageUploadProps) {
  return (
    <AdminImageUpload
      kind="article"
      entitySlug={entitySlug ?? articleSlug ?? ""}
      requireAlt
      onUploaded={(result) => onUploaded(result.url)}
      {...props}
    />
  );
}
