import { NextResponse } from "next/server";
import {
  ALLOWED_IMAGE_MIME_TYPES,
  processAndSaveImage,
  type ImageUploadKind,
} from "@/lib/admin/image-upload-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const kind = (String(formData.get("kind") ?? "article").trim() ||
      "article") as ImageUploadKind;

    const entitySlug = String(
      formData.get("entitySlug") ??
        formData.get("articleSlug") ??
        formData.get("promoId") ??
        "",
    ).trim();

    const alt = String(formData.get("alt") ?? "").trim();
    const nameHint = String(formData.get("nameHint") ?? "image").trim();

    if (kind !== "article" && kind !== "promo") {
      return NextResponse.json({ error: "kind không hợp lệ." }, { status: 400 });
    }

    if (!entitySlug) {
      return NextResponse.json(
        {
          error:
            kind === "article"
              ? "Thiếu slug bài viết."
              : "Thiếu ID khuyến mãi.",
        },
        { status: 400 },
      );
    }

    if (kind === "article" && !alt) {
      return NextResponse.json(
        { error: "Bắt buộc điền Alt text trước khi upload ảnh bài viết." },
        { status: 400 },
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Thiếu file ảnh." }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Định dạng không hỗ trợ. Dùng JPG, PNG, WebP hoặc GIF." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await processAndSaveImage(buffer, {
      kind,
      entitySlug,
      nameHint,
    });

    return NextResponse.json({
      url: saved.url,
      filename: saved.filename,
      sizeBytes: saved.sizeBytes,
      width: saved.width,
      height: saved.height,
      storage: saved.storage,
      alt: alt || undefined,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload ảnh thất bại.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
