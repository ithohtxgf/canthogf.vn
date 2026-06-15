import type { ArticleInput } from "@/lib/db/article-mapper";

export type SeoCheckItem = {
  id: string;
  label: string;
  ok: boolean;
  warn?: boolean;
};

const INTERNAL_PATHS = [
  "/san-pham",
  "/lien-he",
  "/dang-ky-xanhsm",
  "/tin-tuc",
  "/gioi-thieu",
];

const EXTERNAL_DOMAINS = [
  "vinfastauto.com",
  "xanhsm.com",
];

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countWords(html: string): number {
  const text = stripHtml(html);
  if (!text) return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function containsKeyword(text: string, keyword: string): boolean {
  if (!keyword.trim()) return false;
  return stripHtml(text).toLowerCase().includes(keyword.trim().toLowerCase());
}

function countInternalLinks(article: ArticleInput): number {
  const blob = [
    article.sapoHtml,
    article.conclusionHtml,
    ...article.sections.flatMap((s) => [
      ...s.paragraphs,
      ...(s.list?.items ?? []),
    ]),
    ...article.faqs.map((f) => f.answerHtml),
  ].join(" ");

  return INTERNAL_PATHS.filter((path) => blob.includes(`href="${path}`) || blob.includes(`href='${path}`)).length;
}

function hasExternalLink(article: ArticleInput): boolean {
  const blob = [
    article.sapoHtml,
    article.conclusionHtml,
    ...article.sections.flatMap((s) => [
      ...s.paragraphs,
      ...(s.list?.items ?? []),
    ]),
    ...article.faqs.map((f) => f.answerHtml),
  ].join(" ");

  return EXTERNAL_DOMAINS.some((domain) => blob.includes(domain));
}

function allImagesHaveAlt(article: ArticleInput): boolean {
  if (!article.imageAlt.trim()) return false;
  return article.sections.every((s) => !s.image || s.image.alt.trim());
}

export function buildSeoChecklist(article: ArticleInput): SeoCheckItem[] {
  const h2Count = article.sections.filter((s) => s.level === 2).length;
  const keyword = article.primaryKeyword;
  const keywordInH2 = article.sections.some(
    (s) => s.level === 2 && containsKeyword(s.heading, keyword),
  );

  return [
    {
      id: "keyword-h1",
      label: "Từ khóa chính có trong H1 (title)",
      ok: containsKeyword(article.title, keyword),
    },
    {
      id: "keyword-sapo",
      label: "Từ khóa chính có trong Sapo (100 từ đầu)",
      ok: containsKeyword(article.sapoHtml, keyword),
    },
    {
      id: "keyword-h2",
      label: "Từ khóa chính có trong ít nhất 1 H2",
      ok: keywordInH2,
    },
    {
      id: "meta-title",
      label: `Meta Title 50–60 ký tự (hiện: ${article.metaTitle.length})`,
      ok: article.metaTitle.length >= 50 && article.metaTitle.length <= 60,
      warn: article.metaTitle.length > 60 && article.metaTitle.length <= 65,
    },
    {
      id: "meta-desc",
      label: `Meta Description 150–160 ký tự (hiện: ${article.excerpt.length})`,
      ok: article.excerpt.length >= 150 && article.excerpt.length <= 160,
      warn:
        (article.excerpt.length >= 120 && article.excerpt.length < 150) ||
        (article.excerpt.length > 160 && article.excerpt.length <= 170),
    },
    {
      id: "h2-sections",
      label: "Có ít nhất 1 section H2",
      ok: h2Count >= 1,
    },
    {
      id: "faqs",
      label: "Có ít nhất 2 FAQ",
      ok: article.faqs.length >= 2,
    },
    {
      id: "internal-links",
      label: "Có ít nhất 2 internal link",
      ok: countInternalLinks(article) >= 2,
    },
    {
      id: "external-link",
      label: "Có ít nhất 1 external link uy tín",
      ok: hasExternalLink(article),
    },
    {
      id: "image-alt",
      label: "Ảnh đại diện + section có Alt text",
      ok: allImagesHaveAlt(article),
    },
    {
      id: "sapo-length",
      label: `Sapo 50–100 từ (hiện: ~${countWords(article.sapoHtml)} từ)`,
      ok: countWords(article.sapoHtml) >= 50 && countWords(article.sapoHtml) <= 100,
      warn:
        countWords(article.sapoHtml) >= 40 && countWords(article.sapoHtml) < 50,
    },
  ];
}

export type PublishValidation = {
  canPublish: boolean;
  errors: string[];
  warnings: string[];
};

export function validateForPublish(article: ArticleInput): PublishValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const slug = article.id.trim();

  if (!slug || /[^a-z0-9-]/.test(slug)) {
    errors.push("Slug không hợp lệ (chỉ chữ thường, số, gạch ngang).");
  }
  if (!article.metaTitle.trim()) errors.push("Meta Title không được để trống.");
  if (article.metaTitle.length > 65) {
    warnings.push("Meta Title dài hơn 65 ký tự — Google có thể cắt.");
  }
  if (article.excerpt.length < 120) {
    warnings.push("Meta Description ngắn hơn 120 ký tự.");
  }
  if (article.excerpt.length > 170) {
    warnings.push("Meta Description dài hơn 170 ký tự.");
  }
  if (!article.imageAlt.trim()) errors.push("Thiếu Alt text ảnh đại diện.");
  if (!article.image.trim()) errors.push("Thiếu ảnh đại diện (upload hoặc URL).");
  if (article.sections.filter((s) => s.level === 2).length === 0) {
    errors.push("Bài viết cần ít nhất 1 section H2.");
  }
  if (article.faqs.length < 2) errors.push("Cần ít nhất 2 câu FAQ.");
  if (!containsKeyword(article.sapoHtml, article.primaryKeyword)) {
    errors.push("Sapo chưa chứa từ khóa chính.");
  }
  if (article.sections.length === 0) errors.push("Chưa có nội dung section.");

  const checklist = buildSeoChecklist(article);
  const failedRequired = checklist.filter((c) => !c.ok && !c.warn);
  if (failedRequired.length > 0 && errors.length === 0) {
    warnings.push(
      `${failedRequired.length} mục checklist SEO chưa đạt — nên xem lại trước khi publish.`,
    );
  }

  return {
    canPublish: errors.length === 0,
    errors,
    warnings,
  };
}
