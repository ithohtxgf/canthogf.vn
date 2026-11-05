import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/admin/api-guard";
import type { NewsCategory } from "@/lib/content/news";
import { generateSeoAssistantSuggestions } from "@/lib/admin/seo-assistant-service";
import { sanitizeArticleHtml } from "@/lib/sanitize-html";

export const runtime = "nodejs";

const MAX_TOPIC_LENGTH = 300;
const MAX_KEYWORD_LENGTH = 120;
const CATEGORIES: NewsCategory[] = ["vinfast", "cantho", "knowledge"];

export async function POST(request: Request) {
  const denied = await denyIfNotAdmin();
  if (denied) return denied;

  let body: { topic?: string; primaryKeyword?: string; category?: NewsCategory };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const topic = body.topic?.trim() ?? "";
  const primaryKeyword = body.primaryKeyword?.trim() ?? "";
  const category = CATEGORIES.includes(body.category as NewsCategory)
    ? (body.category as NewsCategory)
    : "vinfast";

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
  if (topic.length > MAX_TOPIC_LENGTH || primaryKeyword.length > MAX_KEYWORD_LENGTH) {
    return NextResponse.json(
      {
        error: `Chủ đề tối đa ${MAX_TOPIC_LENGTH} ký tự, từ khóa tối đa ${MAX_KEYWORD_LENGTH} ký tự.`,
      },
      { status: 400 },
    );
  }

  try {
    const suggestion = await generateSeoAssistantSuggestions({
      topic,
      primaryKeyword,
      category,
    });

    // Output AI được chèn thẳng vào form/preview — lọc HTML như nội dung bài viết
    return NextResponse.json({
      suggestion: {
        ...suggestion,
        sapoHtml: sanitizeArticleHtml(suggestion.sapoHtml),
        conclusionHtml: sanitizeArticleHtml(suggestion.conclusionHtml),
        faqs: (suggestion.faqs ?? []).map((faq) => ({
          ...faq,
          answerHtml: sanitizeArticleHtml(faq.answerHtml),
        })),
      },
    });
  } catch (error) {
    // Ghi chi tiết ở log server, không trả nguyên văn lỗi Gemini cho trình duyệt
    console.error("[seo-assistant]", error);
    const message = error instanceof Error ? error.message : "";
    const friendly = /GEMINI_API_KEY/i.test(message)
      ? "Chưa cấu hình GEMINI_API_KEY cho trợ lý SEO."
      : "Trợ lý SEO đang gặp lỗi, thử lại sau ít phút.";
    return NextResponse.json({ error: friendly }, { status: 500 });
  }
}
