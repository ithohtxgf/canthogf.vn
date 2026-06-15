import { getDb } from "./connection";
import type { NewsArticle, NewsCategory } from "@/lib/content/news";
import {
  articleToRow,
  rowToArticle,
  toPublicArticle,
  type AdminArticle,
  type ArticleInput,
  type ArticleRow,
  type ArticleStatus,
} from "./article-mapper";

export async function listArticlesSqlite(options?: {
  status?: ArticleStatus;
  category?: NewsCategory;
  search?: string;
}): Promise<AdminArticle[]> {
  const db = getDb();
  const conditions: string[] = [];
  const params: Record<string, string> = {};

  if (options?.status) {
    conditions.push("status = @status");
    params.status = options.status;
  }
  if (options?.category) {
    conditions.push("category = @category");
    params.category = options.category;
  }
  if (options?.search?.trim()) {
    conditions.push(
      "(title LIKE @search OR id LIKE @search OR primary_keyword LIKE @search)",
    );
    params.search = `%${options.search.trim()}%`;
  }

  const where =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const rows = db
    .prepare(`SELECT * FROM articles ${where} ORDER BY updated_at DESC`)
    .all(params) as ArticleRow[];

  return rows.map(rowToArticle);
}

export async function getArticleByIdSqlite(
  id: string,
): Promise<AdminArticle | undefined> {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM articles WHERE id = ?")
    .get(id) as ArticleRow | undefined;
  return row ? rowToArticle(row) : undefined;
}

export async function createArticleSqlite(
  input: ArticleInput,
): Promise<AdminArticle> {
  const db = getDb();
  const now = new Date().toISOString();
  const row = articleToRow(input, now, now);

  db.prepare(
    `
    INSERT INTO articles (
      id, title, meta_title, excerpt, image, image_alt, image_caption,
      date, category, primary_keyword, keywords_json, sapo_html,
      sections_json, faqs_json, author_json, conclusion_html, cta_json,
      status, created_at, updated_at
    ) VALUES (
      @id, @title, @meta_title, @excerpt, @image, @image_alt, @image_caption,
      @date, @category, @primary_keyword, @keywords_json, @sapo_html,
      @sections_json, @faqs_json, @author_json, @conclusion_html, @cta_json,
      @status, @created_at, @updated_at
    )
  `,
  ).run(row);

  return rowToArticle(row);
}

export async function updateArticleSqlite(
  id: string,
  input: ArticleInput,
): Promise<AdminArticle | undefined> {
  const db = getDb();
  const existing = await getArticleByIdSqlite(id);
  if (!existing) return undefined;

  const now = new Date().toISOString();
  const row = articleToRow({ ...input, id }, existing.createdAt, now);

  db.prepare(
    `
    UPDATE articles SET
      title = @title,
      meta_title = @meta_title,
      excerpt = @excerpt,
      image = @image,
      image_alt = @image_alt,
      image_caption = @image_caption,
      date = @date,
      category = @category,
      primary_keyword = @primary_keyword,
      keywords_json = @keywords_json,
      sapo_html = @sapo_html,
      sections_json = @sections_json,
      faqs_json = @faqs_json,
      author_json = @author_json,
      conclusion_html = @conclusion_html,
      cta_json = @cta_json,
      status = @status,
      updated_at = @updated_at
    WHERE id = @id
  `,
  ).run(row);

  return rowToArticle(row);
}

export async function deleteArticleSqlite(id: string): Promise<boolean> {
  const db = getDb();
  const result = db.prepare("DELETE FROM articles WHERE id = ?").run(id);
  return result.changes > 0;
}

export async function listPublishedArticlesSqlite(
  category?: NewsCategory,
): Promise<NewsArticle[]> {
  return (await listArticlesSqlite({ status: "published", category })).map(
    toPublicArticle,
  );
}

export async function getPublishedArticleByIdSqlite(
  id: string,
): Promise<NewsArticle | undefined> {
  const article = await getArticleByIdSqlite(id);
  if (!article || article.status !== "published") return undefined;
  return toPublicArticle(article);
}

export async function countArticlesSqlite(): Promise<number> {
  const db = getDb();
  const row = db
    .prepare("SELECT COUNT(*) AS count FROM articles")
    .get() as { count: number };
  return row.count;
}
