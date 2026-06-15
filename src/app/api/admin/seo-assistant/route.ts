import { NextResponse } from "next/server";
import type { NewsCategory } from "@/lib/content/news";
import { generateSeoAssistantSuggestions } from "@/lib/admin/seo-assistant-service";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      topic?: string;
      primaryKeyword?: string;
      category?: NewsCategory;
    };

    const topic = body.topic?.trim() ?? "";
    const primaryKeyword = body.primaryKeyword?.trim() ?? "";
    const category = body.category ?? "vinfast";

    if (!topic) {
      return NextResponse.json(
        { error: "Vui lòng nhập chủ đề bài viết" },
        { status: 400 },
      );
    }
    if (!primaryKeyword) {
      return NextResponse.json(
        { error: "Vui lòng nhập từ khóa chính (tab SEO)" },
        { status: 400 },
      );
    }

    const suggestion = await generateSeoAssistantSuggestions({
      topic,
      primaryKeyword,
      category,
    });

    return NextResponse.json({ suggestion });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Trợ lý SEO gặp lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
