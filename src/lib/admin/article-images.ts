import type { ArticleInput } from "@/lib/db/article-mapper";
import type { NewsContentSection } from "@/lib/content/news";

const SHORT_ARTICLE_MAX_WORDS = 500;
const LONG_ARTICLE_MIN_WORDS = 1000;

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function countArticleWords(article: Pick<ArticleInput, "sapoHtml" | "conclusionHtml" | "sections" | "faqs">): number {
  const blob = [
    article.sapoHtml,
    article.conclusionHtml,
    ...article.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.list?.items ?? []),
    ]),
    ...article.faqs.map((f) => `${f.question} ${f.answerHtml}`),
  ].join(" ");

  const text = stripHtml(blob);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

/** Số ảnh minh họa section khuyến nghị (không tính ảnh đại diện) */
export function getRecommendedSectionImageCount(totalWords: number): number {
  if (totalWords < SHORT_ARTICLE_MAX_WORDS) return 2;
  if (totalWords < LONG_ARTICLE_MIN_WORDS) return 2;
  return 3;
}

export function countSectionImages(sections: NewsContentSection[]): number {
  return sections.filter((s) => Boolean(s.image)).length;
}

export function countSectionImagesUploaded(sections: NewsContentSection[]): number {
  return sections.filter((s) => Boolean(s.image?.src?.trim())).length;
}

/** Chọn index các H2 nên có ảnh — phân bổ đều trong bài */
export function getRecommendedImageSectionIndexes(
  sections: NewsContentSection[],
  targetCount: number,
): number[] {
  const h2Indexes = sections
    .map((section, index) => ({ section, index }))
    .filter(({ section }) => section.level === 2)
    .map(({ index }) => index);

  if (h2Indexes.length === 0 || targetCount <= 0) return [];

  const count = Math.min(targetCount, h2Indexes.length);
  if (count === 1) return [h2Indexes[0]];

  const picks: number[] = [];
  for (let i = 0; i < count; i++) {
    const slot = Math.round((i * (h2Indexes.length - 1)) / (count - 1));
    picks.push(h2Indexes[slot]);
  }

  return [...new Set(picks)];
}

export function getSectionImageGuidance(article: Pick<ArticleInput, "sapoHtml" | "conclusionHtml" | "sections" | "faqs">) {
  const totalWords = countArticleWords(article);
  const recommended = getRecommendedSectionImageCount(totalWords);
  const configured = countSectionImages(article.sections);
  const uploaded = countSectionImagesUploaded(article.sections);
  const recommendedIndexes = getRecommendedImageSectionIndexes(
    article.sections,
    recommended,
  );

  return {
    totalWords,
    recommended,
    configured,
    uploaded,
    recommendedIndexes,
    isComplete: uploaded >= recommended,
  };
}
