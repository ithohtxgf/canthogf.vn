import "server-only";
import sanitizeHtml from "sanitize-html";

/**
 * Lọc HTML do admin / trợ lý AI soạn trước khi lưu và trước khi hiển thị.
 * Chỉ giữ các thẻ định dạng bài viết; bỏ <script>, thuộc tính on*, javascript: URL…
 */
const ARTICLE_HTML_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "strong", "b", "em", "i", "u", "s", "mark", "small", "sub", "sup",
    "a", "ul", "ol", "li", "blockquote", "code", "pre",
    "h2", "h3", "h4", "span", "table", "thead", "tbody", "tr", "th", "td",
    "img", "figure", "figcaption", "hr",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel", "class"],
    img: ["src", "alt", "title", "width", "height", "loading", "class"],
    "*": ["class"],
    td: ["colspan", "rowspan", "class"],
    th: ["colspan", "rowspan", "scope", "class"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel", "zalo"],
  allowedSchemesByTag: { img: ["http", "https"] },
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => {
      if (attribs.target === "_blank") {
        return {
          tagName,
          attribs: { ...attribs, rel: "noopener noreferrer" },
        };
      }
      return { tagName, attribs };
    },
  },
};

export function sanitizeArticleHtml(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html, ARTICLE_HTML_OPTIONS);
}

type HtmlBearingArticle = {
  sapoHtml: string;
  conclusionHtml: string;
  sections: Array<{ paragraphs: string[] }>;
  faqs: Array<{ answerHtml: string }>;
};

/** Lọc mọi trường HTML của một bài viết */
export function sanitizeArticleFields<T extends HtmlBearingArticle>(article: T): T {
  return {
    ...article,
    sapoHtml: sanitizeArticleHtml(article.sapoHtml),
    conclusionHtml: sanitizeArticleHtml(article.conclusionHtml),
    sections: (article.sections ?? []).map((section) => ({
      ...section,
      paragraphs: (section.paragraphs ?? []).map((p) => sanitizeArticleHtml(p)),
    })),
    faqs: (article.faqs ?? []).map((faq) => ({
      ...faq,
      answerHtml: sanitizeArticleHtml(faq.answerHtml),
    })),
  };
}
