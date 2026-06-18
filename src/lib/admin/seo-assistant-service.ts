import { GoogleGenAI } from "@google/genai";
import type { NewsCategory } from "@/lib/content/news";
import {
  buildSeoAssistantSystemPrompt,
  buildSeoAssistantUserPrompt,
  SEO_ASSISTANT_JSON_SCHEMA,
} from "@/lib/admin/seo-assistant-prompt";
import type { SeoAssistantSuggestion } from "@/lib/admin/seo-assistant-types";

function getApiKey(): string | undefined {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
}

function getModel(): string {
  return process.env.GEMINI_MODEL || "gemini-2.0-flash";
}

function parseJsonText(raw: string): unknown {
  const trimmed = raw.trim();
  const fenceMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i);
  const jsonText = fenceMatch ? fenceMatch[1].trim() : trimmed;
  return JSON.parse(jsonText);
}

function normalizeSuggestion(data: unknown): SeoAssistantSuggestion {
  const obj = data as Record<string, unknown>;

  const metaTitles = Array.isArray(obj.metaTitles)
    ? obj.metaTitles.map(String).slice(0, 3)
    : [];
  const metaDescriptions = Array.isArray(obj.metaDescriptions)
    ? obj.metaDescriptions.map(String).slice(0, 2)
    : [];

  return {
    metaTitles,
    metaDescriptions,
    suggestedH1: String(obj.suggestedH1 ?? ""),
    suggestedSlug: String(obj.suggestedSlug ?? "")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, ""),
    lsiKeywords: Array.isArray(obj.lsiKeywords)
      ? obj.lsiKeywords.map(String)
      : [],
    internalLinks: Array.isArray(obj.internalLinks)
      ? (obj.internalLinks as SeoAssistantSuggestion["internalLinks"])
      : [],
    outline: Array.isArray(obj.outline)
      ? (obj.outline as SeoAssistantSuggestion["outline"]).map((item) => ({
          ...item,
          level: item.level === 3 ? 3 : 2,
          needsImage: Boolean(item.needsImage),
          imageAltHint: item.imageAltHint ? String(item.imageAltHint) : undefined,
          imageCaptionHint: item.imageCaptionHint
            ? String(item.imageCaptionHint)
            : undefined,
        }))
      : [],
    faqs: Array.isArray(obj.faqs)
      ? (obj.faqs as SeoAssistantSuggestion["faqs"])
      : [],
    sapoHtml: String(obj.sapoHtml ?? ""),
    conclusionHtml: String(obj.conclusionHtml ?? ""),
  };
}

export async function generateSeoAssistantSuggestions(input: {
  topic: string;
  primaryKeyword: string;
  category: NewsCategory;
}): Promise<SeoAssistantSuggestion> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error(
      "Chưa cấu hình GEMINI_API_KEY. Thêm vào file .env để dùng Trợ lý SEO.",
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: getModel(),
    contents: buildSeoAssistantUserPrompt(input),
    config: {
      systemInstruction: buildSeoAssistantSystemPrompt(),
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
      responseSchema: SEO_ASSISTANT_JSON_SCHEMA,
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("AI không trả về nội dung. Vui lòng thử lại.");
  }

  try {
    return normalizeSuggestion(parseJsonText(text));
  } catch {
    throw new Error("Không parse được phản hồi AI. Vui lòng thử lại.");
  }
}
