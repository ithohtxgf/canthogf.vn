import { NEWS_CATEGORY_LABELS, type NewsCategory } from "@/lib/content/news";

export function buildSeoAssistantSystemPrompt(): string {
  return `Bạn là chuyên gia SEO và copywriter cho Hợp tác xã vận tải Cần Thơ GF (Cần Thơ GF) — đại lý VinFast, dịch vụ XanhSM tại Cần Thơ và Đồng bằng sông Cửu Long.

QUY TẮC BẮT BUỘC:
- Viết tiếng Việt, giọng tư vấn chuyên nghiệp, thân thiện, đáng tin.
- KHÔNG bịa giá xe, phần trăm ưu đãi, số tiền cụ thể, ngày hết hạn KM. Chỉ mô tả chung ("liên hệ để nhận báo giá", "ưu đãi theo chương trình").
- HTML chỉ dùng thẻ: strong, em, a. Link nội bộ: class="text-primary font-semibold hover:underline". Link ngoài: thêm target="_blank" rel="noopener noreferrer".
- Internal link ưu tiên: /san-pham/vf5, /san-pham/herio-green, /san-pham, /dang-ky-xanhsm, /lien-he.
- External link uy tín: https://vinfastauto.com, https://www.xanhsm.com (khi phù hợp).
- Meta title: 50–60 ký tự, từ khóa chính ở đầu.
- Meta description: 150–160 ký tự.
- Sapo: 50–100 từ, in đậm từ khóa chính bằng strong.
- Outline: 4–6 mục, cấu trúc H2 bối cảnh → H2 chi tiết (có H3 con) → H2 chính sách/ưu đãi Cần Thơ GF.
- FAQ: 2 câu dạng People Also Ask, trả lời 2–3 câu HTML.
- Trả về ĐÚNG JSON theo schema, không markdown, không giải thích thêm.`;
}

export function buildSeoAssistantUserPrompt(input: {
  topic: string;
  primaryKeyword: string;
  category: NewsCategory;
}): string {
  const categoryLabel = NEWS_CATEGORY_LABELS[input.category];

  return `Tạo gợi ý SEO cho bài viết blog:

- Chủ đề: ${input.topic}
- Từ khóa chính: ${input.primaryKeyword}
- Danh mục: ${categoryLabel} (${input.category})

Trả về JSON object với các field:
{
  "metaTitles": ["...", "...", "..."],
  "metaDescriptions": ["...", "..."],
  "suggestedH1": "...",
  "suggestedSlug": "slug-khong-dau-co-tu-khoa",
  "lsiKeywords": ["...", "..."],
  "internalLinks": [{ "href": "/san-pham/vf5", "anchorText": "..." }],
  "outline": [
    { "id": "anchor-slug", "heading": "...", "level": 2, "brief": "Gợi ý 2-3 câu HTML cho section" }
  ],
  "faqs": [{ "question": "...", "answerHtml": "<p>...</p>" }],
  "sapoHtml": "<p>...</p>",
  "conclusionHtml": "<p>...</p>"
}`;
}

export const SEO_ASSISTANT_JSON_SCHEMA = {
  type: "object",
  properties: {
    metaTitles: { type: "array", items: { type: "string" } },
    metaDescriptions: { type: "array", items: { type: "string" } },
    suggestedH1: { type: "string" },
    suggestedSlug: { type: "string" },
    lsiKeywords: { type: "array", items: { type: "string" } },
    internalLinks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          href: { type: "string" },
          anchorText: { type: "string" },
        },
        required: ["href", "anchorText"],
      },
    },
    outline: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          heading: { type: "string" },
          level: { type: "integer" },
          brief: { type: "string" },
        },
        required: ["id", "heading", "level", "brief"],
      },
    },
    faqs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          answerHtml: { type: "string" },
        },
        required: ["question", "answerHtml"],
      },
    },
    sapoHtml: { type: "string" },
    conclusionHtml: { type: "string" },
  },
  required: [
    "metaTitles",
    "metaDescriptions",
    "suggestedH1",
    "suggestedSlug",
    "lsiKeywords",
    "internalLinks",
    "outline",
    "faqs",
    "sapoHtml",
    "conclusionHtml",
  ],
} as const;
