import { NextResponse } from "next/server";
import {
  deleteArticle,
  getArticleById,
  updateArticle,
} from "@/lib/db/articles";
import type { ArticleInput } from "@/lib/db/article-mapper";
import { validateForPublish } from "@/lib/admin/article-seo-checklist";
import {
  revalidateArticlePaths,
  shouldRevalidateArticles,
} from "@/lib/admin/revalidate-content";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const article = await getArticleById(id);

  if (!article) {
    return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as ArticleInput;
  const existing = await getArticleById(id);
  const status = body.status ?? "draft";

  if (status === "published") {
    const validation = validateForPublish({ ...body, id, status });
    if (!validation.canPublish) {
      return NextResponse.json(
        { error: validation.errors.join(" "), warnings: validation.warnings },
        { status: 400 },
      );
    }
  }

  try {
    const updated = await updateArticle(id, {
      ...body,
      id,
      status,
    });

    if (!updated) {
      return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
    }

    if (shouldRevalidateArticles(updated.status, existing?.status)) {
      revalidateArticlePaths(updated.id);
      if (existing && existing.id !== updated.id) {
        revalidateArticlePaths(existing.id);
      }
    }

    return NextResponse.json({
      article: updated,
      publicUrl:
        updated.status === "published" ? `/tin-tuc/${updated.id}` : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lưu thất bại";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const existing = await getArticleById(id);
  const deleted = await deleteArticle(id);

  if (!deleted) {
    return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
  }

  if (existing?.status === "published") {
    revalidateArticlePaths(existing.id);
  }

  return NextResponse.json({ ok: true });
}
