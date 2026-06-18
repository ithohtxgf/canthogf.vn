import { slugify } from "@/lib/admin/defaults";
import type { ArticleInput } from "@/lib/db/article-mapper";
import type { NewsContentSection, NewsFaq } from "@/lib/content/news";

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

const EXTERNAL_DOMAINS = ["vinfastauto.com", "xanhsm.com"];

const KEYWORD_DENSITY_MIN = 1;
const KEYWORD_DENSITY_MAX = 2;
const KEYWORD_DENSITY_WARN_LOW = 0.5;
const KEYWORD_DENSITY_WARN_HIGH = 3;
const TOC_MIN_WORDS = 500;
const IMAGE_SIZE_HINT_KB = 150;

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

function getArticleTextBlob(article: ArticleInput): string {
  return [
    article.sapoHtml,
    article.conclusionHtml,
    ...article.sections.flatMap((s) => [
      s.heading,
      ...s.paragraphs,
      ...(s.list?.items ?? []),
    ]),
    ...article.faqs.map((f) => `${f.question} ${f.answerHtml}`),
  ].join(" ");
}

function keywordNearStartOfTitle(title: string, keyword: string): boolean {
  if (!keyword.trim()) return false;
  const normalizedTitle = stripHtml(title).toLowerCase();
  const normalizedKeyword = keyword.trim().toLowerCase();
  const index = normalizedTitle.indexOf(normalizedKeyword);
  if (index === -1) return false;
  const earlyWindow = Math.min(25, Math.ceil(normalizedTitle.length * 0.35));
  return index <= earlyWindow;
}

function hasLogicalHeadingStructure(sections: NewsContentSection[]): boolean {
  if (sections.length === 0) return false;

  const h2Count = sections.filter((s) => s.level === 2).length;
  if (h2Count < 1) return false;

  const firstH2Index = sections.findIndex((s) => s.level === 2);
  const h3BeforeFirstH2 = sections
    .slice(0, firstH2Index)
    .some((s) => s.level === 3);
  if (h3BeforeFirstH2) return false;

  return true;
}

function hasValidFaqSchema(faqs: NewsFaq[]): boolean {
  if (faqs.length === 0) return true;
  return faqs.every(
    (faq) => faq.question.trim().length > 0 && stripHtml(faq.answerHtml).length > 0,
  );
}

function extractFilenameFromUrl(url: string): string {
  try {
    const pathname = new URL(url, "http://localhost").pathname;
    return pathname.split("/").pop() ?? "";
  } catch {
    return url.split("/").pop() ?? "";
  }
}

function isSeoFriendlyImageFilename(filename: string, keyword: string): boolean {
  const name = filename.toLowerCase().trim();
  if (!name) return false;

  const stem = name.replace(/\.[a-z0-9]+$/i, "");
  if (!stem || !/^[a-z0-9][a-z0-9.-]*$/.test(name)) return false;
  if (stem.includes("_")) return false;

  const keywordParts = slugify(keyword)
    .split("-")
    .filter((part) => part.length > 2);
  if (keywordParts.length === 0) return stem.includes("-") || stem.length >= 3;

  return keywordParts.some((part) => stem.includes(part));
}

function isModernImageFormat(url: string): boolean {
  const filename = extractFilenameFromUrl(url).toLowerCase();
  return filename.endsWith(".webp") || filename.endsWith(".avif");
}

function countInternalLinks(article: ArticleInput): number {
  const blob = getArticleTextBlob(article);
  return INTERNAL_PATHS.filter(
    (path) => blob.includes(`href="${path}`) || blob.includes(`href='${path}`),
  ).length;
}

function hasExternalLink(article: ArticleInput): boolean {
  const blob = getArticleTextBlob(article);
  return EXTERNAL_DOMAINS.some((domain) => blob.includes(domain));
}

function allImagesHaveAlt(article: ArticleInput): boolean {
  if (!article.imageAlt.trim()) return false;
  return article.sections.every((s) => !s.image || s.image.alt.trim());
}

function countKeywordOccurrences(text: string, keyword: string): number {
  const normalizedText = stripHtml(text).toLowerCase();
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) return 0;

  let count = 0;
  let position = 0;
  while ((position = normalizedText.indexOf(normalizedKeyword, position)) !== -1) {
    count += 1;
    position += normalizedKeyword.length;
  }
  return count;
}

function getKeywordDensityPercent(article: ArticleInput): number {
  const words = countWords(getArticleTextBlob(article));
  if (words === 0 || !article.primaryKeyword.trim()) return 0;

  const occurrences = countKeywordOccurrences(
    getArticleTextBlob(article),
    article.primaryKeyword,
  );
  const keywordWordCount =
    article.primaryKeyword.trim().split(/\s+/).filter(Boolean).length *
    occurrences;

  return (keywordWordCount / words) * 100;
}

function hasLsiKeywords(article: ArticleInput): boolean {
  const secondary = article.keywords
    .map((k) => k.trim())
    .filter(Boolean)
    .filter(
      (k) => k.toLowerCase() !== article.primaryKeyword.trim().toLowerCase(),
    );

  if (secondary.length === 0) return false;

  const h3Text = article.sections
    .filter((s) => s.level === 3)
    .map((s) => s.heading)
    .join(" ");
  const body = getArticleTextBlob(article);

  return secondary.some(
    (keyword) => containsKeyword(h3Text, keyword) || containsKeyword(body, keyword),
  );
}

function hasTocStructure(article: ArticleInput): boolean {
  const h2Count = article.sections.filter((s) => s.level === 2).length;
  const totalWords = countWords(getArticleTextBlob(article));

  if (totalWords < TOC_MIN_WORDS) return true;
  return h2Count >= 2;
}

function hasClearCta(article: ArticleInput): boolean {
  const { cta } = article;
  return Boolean(
    cta.title?.trim() &&
      cta.description?.trim() &&
      cta.label?.trim() &&
      cta.href?.trim(),
  );
}

function hasAuthorBox(article: ArticleInput): boolean {
  const { author } = article;
  return Boolean(
    author.name?.trim() &&
      author.role?.trim() &&
      author.bio?.trim() &&
      author.bio.trim().length >= 40,
  );
}

export function buildSeoChecklist(article: ArticleInput): SeoCheckItem[] {
  const keyword = article.primaryKeyword;
  const keywordInTitle = containsKeyword(article.title, keyword);
  const keywordAtTitleStart = keywordNearStartOfTitle(article.title, keyword);
  const keywordInH2 = article.sections.some(
    (s) => s.level === 2 && containsKeyword(s.heading, keyword),
  );
  const density = getKeywordDensityPercent(article);
  const densityRounded = Math.round(density * 10) / 10;
  const featuredImageFilename = extractFilenameFromUrl(article.image);
  const totalWords = countWords(getArticleTextBlob(article));
  const h2Count = article.sections.filter((s) => s.level === 2).length;
  const h3Count = article.sections.filter((s) => s.level === 3).length;
  const secondaryKeywords = article.keywords.filter(
    (k) => k.trim() && k.toLowerCase() !== keyword.trim().toLowerCase(),
  );

  return [
    {
      id: "keyword-h1",
      label:
        "Từ khóa chính ở đầu H1 (title) — càng sát trái càng tốt",
      ok: keywordAtTitleStart,
      warn: keywordInTitle && !keywordAtTitleStart,
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
      id: "heading-structure",
      label: `Cấu trúc heading logic (H2, H3) — hiện: ${h2Count} H2, ${h3Count} H3`,
      ok: hasLogicalHeadingStructure(article.sections),
    },
    {
      id: "faq-schema",
      label: "Có Schema FAQ (nếu có phần câu hỏi thường gặp)",
      ok: hasValidFaqSchema(article.faqs),
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
      id: "image-format",
      label: `Ảnh đại diện .webp/.avif, ưu tiên < ${IMAGE_SIZE_HINT_KB}KB (upload CMS tự nén)`,
      ok: Boolean(article.image.trim()) && isModernImageFormat(article.image),
      warn: Boolean(article.image.trim()) && !isModernImageFormat(article.image),
    },
    {
      id: "image-filename",
      label: "Tên file ảnh chuẩn SEO (không dấu, gạch ngang, có từ khóa)",
      ok:
        Boolean(featuredImageFilename) &&
        isSeoFriendlyImageFilename(featuredImageFilename, keyword),
      warn:
        Boolean(featuredImageFilename) &&
        !isSeoFriendlyImageFilename(featuredImageFilename, keyword),
    },
    {
      id: "keyword-density",
      label: `Mật độ từ khóa chính 1–2% (hiện: ~${densityRounded}%)`,
      ok: density >= KEYWORD_DENSITY_MIN && density <= KEYWORD_DENSITY_MAX,
      warn:
        (density >= KEYWORD_DENSITY_WARN_LOW && density < KEYWORD_DENSITY_MIN) ||
        (density > KEYWORD_DENSITY_MAX && density <= KEYWORD_DENSITY_WARN_HIGH),
    },
    {
      id: "lsi-keywords",
      label: "Từ khóa phụ / LSI trong H3 hoặc nội dung",
      ok: secondaryKeywords.length > 0 && hasLsiKeywords(article),
      warn: secondaryKeywords.length === 0,
    },
    {
      id: "table-of-contents",
      label: `Mục lục tự động (bài ≥ ${TOC_MIN_WORDS} từ cần ≥ 2 H2)`,
      ok: hasTocStructure(article),
      warn: totalWords >= TOC_MIN_WORDS && h2Count < 2,
    },
    {
      id: "cta",
      label: "CTA rõ ràng (tiêu đề, mô tả, nút, liên kết)",
      ok: hasClearCta(article),
    },
    {
      id: "author-box",
      label: "Thông tin tác giả (Author Box) đầy đủ",
      ok: hasAuthorBox(article),
    },
    {
      id: "sapo-length",
      label: `Sapo 50–100 từ (hiện: ~${countWords(article.sapoHtml)} từ)`,
      ok:
        countWords(article.sapoHtml) >= 50 && countWords(article.sapoHtml) <= 100,
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
  if (!hasLogicalHeadingStructure(article.sections)) {
    errors.push(
      "Cấu trúc heading chưa hợp lý — cần ít nhất 1 H2, H3 không đặt trước H2.",
    );
  }
  if (article.faqs.length > 0 && !hasValidFaqSchema(article.faqs)) {
    errors.push("FAQ cần đủ câu hỏi và câu trả lời để sinh Schema FAQ.");
  }
  if (!containsKeyword(article.sapoHtml, article.primaryKeyword)) {
    errors.push("Sapo chưa chứa từ khóa chính.");
  }
  if (article.sections.length === 0) errors.push("Chưa có nội dung section.");
  if (!hasClearCta(article)) {
    errors.push("CTA chưa đầy đủ — cần tiêu đề, mô tả, nhãn nút và liên kết.");
  }
  if (!hasAuthorBox(article)) {
    warnings.push("Author Box chưa đầy đủ — nên có tên, vai trò và bio ≥ 40 ký tự.");
  }

  const density = getKeywordDensityPercent(article);
  if (density > KEYWORD_DENSITY_WARN_HIGH) {
    warnings.push(
      `Mật độ từ khóa ~${Math.round(density * 10) / 10}% — có dấu hiệu nhồi nhét.`,
    );
  }

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
