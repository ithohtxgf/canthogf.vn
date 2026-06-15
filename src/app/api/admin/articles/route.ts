import { NextResponse } from "next/server";
import {
  createArticle,
  getArticleById,
  listArticles,
} from "@/lib/db/articles";
import type { ArticleInput } from "@/lib/db/article-mapper";
import { validateForPublish } from "@/lib/admin/article-seo-checklist";
import {
  revalidateArticlePaths,
  shouldRevalidateArticles,
} from "@/lib/admin/revalidate-content";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as ArticleInput["status"] | null;
  const category = searchParams.get("category") as ArticleInput["category"] | null;
  const search = searchParams.get("search") ?? undefined;

  const articles = await listArticles({
    status: status ?? undefined,
    category: category ?? undefined,
    search,
  });

  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const body = (await request.json()) as ArticleInput;

  if (!body.id?.trim() || !body.title?.trim()) {
    return NextResponse.json(
      { error: "Slug và tiêu đề là bắt buộc" },
      { status: 400 },
    );
  }

  if (await getArticleById(body.id)) {
    return NextResponse.json({ error: "Slug đã tồn tại" }, { status: 409 });
  }

  const status = body.status ?? "draft";

  if (status === "published") {
    const validation = validateForPublish({ ...body, id: body.id.trim(), status });
    if (!validation.canPublish) {
      return NextResponse.json(
        { error: validation.errors.join(" "), warnings: validation.warnings },
        { status: 400 },
      );
    }
  }

  try {
    const article = await createArticle({
      ...body,
      id: body.id.trim(),
      status,
    });

    if (shouldRevalidateArticles(article.status)) {
      revalidateArticlePaths(article.id);
    }

    return NextResponse.json(
      {
        article,
        publicUrl:
          article.status === "published" ? `/tin-tuc/${article.id}` : undefined,
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lưu thất bại";
    const statusCode = message.includes("tồn tại") ? 409 : 500;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
