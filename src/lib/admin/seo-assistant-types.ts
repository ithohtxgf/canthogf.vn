import type { NewsCategory, NewsContentSection, NewsFaq } from "@/lib/content/news";

export type SeoAssistantRequest = {
  topic: string;
  primaryKeyword: string;
  category: NewsCategory;
};

export type SeoAssistantOutlineItem = {
  id: string;
  heading: string;
  level: 2 | 3;
  /** Gợi ý nội dung ngắn cho section */
  brief: string;
};

export type SeoAssistantInternalLink = {
  href: string;
  anchorText: string;
};

export type SeoAssistantSuggestion = {
  metaTitles: string[];
  metaDescriptions: string[];
  suggestedH1: string;
  suggestedSlug: string;
  lsiKeywords: string[];
  internalLinks: SeoAssistantInternalLink[];
  outline: SeoAssistantOutlineItem[];
  faqs: NewsFaq[];
  sapoHtml: string;
  conclusionHtml: string;
};

export type SeoAssistantApplyHandlers = {
  onApplyMetaTitle: (value: string) => void;
  onApplyMetaDescription: (value: string) => void;
  onApplyH1AndSlug: (title: string, slug: string) => void;
  onApplyKeywords: (keywords: string[]) => void;
  onApplyOutline: (sections: NewsContentSection[]) => void;
  onApplyFaqs: (faqs: NewsFaq[], mode: "replace" | "append") => void;
  onApplySapo: (html: string) => void;
  onApplyConclusion: (html: string) => void;
};

export function outlineToSections(
  outline: SeoAssistantOutlineItem[],
): NewsContentSection[] {
  return outline.map((item) => ({
    id: item.id,
    heading: item.heading,
    level: item.level,
    paragraphs: item.brief ? [item.brief] : [""],
  }));
}
