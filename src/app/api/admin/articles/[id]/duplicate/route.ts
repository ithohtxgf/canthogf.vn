import { NextResponse } from "next/server";
import {
  createArticle,
  getArticleById,
} from "@/lib/db/articles";
import { slugify } from "@/lib/admin/defaults";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const source = await getArticleById(id);

  if (!source) {
    return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });
  }

  const baseId = `${slugify(source.id)}-ban-sao`;
  let newId = baseId;
  let suffix = 2;

  while (await getArticleById(newId)) {
    newId = `${baseId}-${suffix}`;
    suffix += 1;
  }

  const { createdAt: _c, updatedAt: _u, ...input } = source;

  try {
    const article = await createArticle({
      ...input,
      id: newId,
      title: `${source.title} (bản sao)`,
      status: "draft",
    });

    return NextResponse.json({ article }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nhân bản thất bại";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
