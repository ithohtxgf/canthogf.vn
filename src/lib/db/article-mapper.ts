import type {
  NewsArticle,
  NewsAuthorInfo,
  NewsCategory,
  NewsContentSection,
  NewsFaq,
} from "@/lib/content/news";

export type ArticleStatus = "draft" | "published";

export type AdminArticle = NewsArticle & {
  status: ArticleStatus;
  createdAt: string;
  updatedAt: string;
};

export type ArticleRow = {
  id: string;
  title: string;
  meta_title: string;
  excerpt: string;
  image: string;
  image_alt: string;
  image_caption: string | null;
  date: string;
  category: string;
  primary_keyword: string;
  keywords_json: string;
  sapo_html: string;
  sections_json: string;
  faqs_json: string;
  author_json: string;
  conclusion_html: string;
  cta_json: string;
  status: ArticleStatus;
  created_at: string;
  updated_at: string;
};

export type ArticleInput = Omit<AdminArticle, "createdAt" | "updatedAt">;

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function rowToArticle(row: ArticleRow): AdminArticle {
  return {
    id: row.id,
    title: row.title,
    metaTitle: row.meta_title,
    excerpt: row.excerpt,
    image: row.image,
    imageAlt: row.image_alt,
    imageCaption: row.image_caption ?? undefined,
    date: row.date,
    category: row.category as NewsCategory,
    primaryKeyword: row.primary_keyword,
    keywords: parseJson<string[]>(row.keywords_json, []),
    sapoHtml: row.sapo_html,
    sections: parseJson<NewsContentSection[]>(row.sections_json, []),
    faqs: parseJson<NewsFaq[]>(row.faqs_json, []),
    author: parseJson<NewsAuthorInfo>(row.author_json, {
      name: "",
      role: "",
      bio: "",
    }),
    conclusionHtml: row.conclusion_html,
    cta: parseJson(row.cta_json, {
      title: "",
      description: "",
      label: "",
      href: "/lien-he",
    }),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function articleToRow(
  article: ArticleInput,
  createdAt: string,
  updatedAt: string,
): ArticleRow {
  return {
    id: article.id,
    title: article.title,
    meta_title: article.metaTitle,
    excerpt: article.excerpt,
    image: article.image,
    image_alt: article.imageAlt,
    image_caption: article.imageCaption ?? null,
    date: article.date,
    category: article.category,
    primary_keyword: article.primaryKeyword,
    keywords_json: JSON.stringify(article.keywords ?? []),
    sapo_html: article.sapoHtml,
    sections_json: JSON.stringify(article.sections ?? []),
    faqs_json: JSON.stringify(article.faqs ?? []),
    author_json: JSON.stringify(article.author),
    conclusion_html: article.conclusionHtml,
    cta_json: JSON.stringify(article.cta),
    status: article.status,
    created_at: createdAt,
    updated_at: updatedAt,
  };
}

export function toPublicArticle(article: AdminArticle): NewsArticle {
  const { status: _s, createdAt: _c, updatedAt: _u, ...publicArticle } = article;
  return publicArticle;
}

/** Row shape từ Supabase Postgres (jsonb đã parse) */
export type SupabaseArticleRow = {
  id: string;
  title: string;
  meta_title: string;
  excerpt: string;
  image: string;
  image_alt: string;
  image_caption: string | null;
  date: string;
  category: string;
  primary_keyword: string;
  keywords: string[];
  sapo_html: string;
  sections: NewsContentSection[];
  faqs: NewsFaq[];
  author: NewsAuthorInfo;
  conclusion_html: string;
  cta: NewsArticle["cta"];
  status: ArticleStatus;
  created_at: string;
  updated_at: string;
};

export function supabaseRowToArticle(row: SupabaseArticleRow): AdminArticle {
  return {
    id: row.id,
    title: row.title,
    metaTitle: row.meta_title,
    excerpt: row.excerpt,
    image: row.image,
    imageAlt: row.image_alt,
    imageCaption: row.image_caption ?? undefined,
    date: row.date,
    category: row.category as NewsCategory,
    primaryKeyword: row.primary_keyword,
    keywords: row.keywords ?? [],
    sapoHtml: row.sapo_html,
    sections: row.sections ?? [],
    faqs: row.faqs ?? [],
    author: row.author ?? { name: "", role: "", bio: "" },
    conclusionHtml: row.conclusion_html,
    cta: row.cta ?? { title: "", description: "", label: "", href: "/lien-he" },
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function articleToSupabaseRow(
  article: ArticleInput,
  createdAt: string,
  updatedAt: string,
): SupabaseArticleRow {
  return {
    id: article.id,
    title: article.title,
    meta_title: article.metaTitle,
    excerpt: article.excerpt,
    image: article.image,
    image_alt: article.imageAlt,
    image_caption: article.imageCaption ?? null,
    date: article.date,
    category: article.category,
    primary_keyword: article.primaryKeyword,
    keywords: article.keywords ?? [],
    sapo_html: article.sapoHtml,
    sections: article.sections ?? [],
    faqs: article.faqs ?? [],
    author: article.author,
    conclusion_html: article.conclusionHtml,
    cta: article.cta,
    status: article.status,
    created_at: createdAt,
    updated_at: updatedAt,
  };
}
