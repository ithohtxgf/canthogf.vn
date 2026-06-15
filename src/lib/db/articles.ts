import type { NewsArticle, NewsCategory } from "@/lib/content/news";
import { isSupabaseEnabled } from "@/lib/db/config";
import type {
  AdminArticle,
  ArticleInput,
  ArticleStatus,
} from "./article-mapper";
import {
  countArticlesSqlite,
  createArticleSqlite,
  deleteArticleSqlite,
  getArticleByIdSqlite,
  getPublishedArticleByIdSqlite,
  listArticlesSqlite,
  listPublishedArticlesSqlite,
  updateArticleSqlite,
} from "./articles-sqlite";
import {
  countArticlesSupabase,
  createArticleSupabase,
  deleteArticleSupabase,
  getArticleByIdSupabase,
  getPublishedArticleByIdSupabase,
  listArticlesSupabase,
  listPublishedArticlesSupabase,
  updateArticleSupabase,
} from "./articles-supabase";

export type {
  AdminArticle,
  ArticleInput,
  ArticleStatus,
} from "./article-mapper";

export async function listArticles(options?: {
  status?: ArticleStatus;
  category?: NewsCategory;
  search?: string;
}): Promise<AdminArticle[]> {
  return isSupabaseEnabled()
    ? listArticlesSupabase(options)
    : listArticlesSqlite(options);
}

export async function getArticleById(
  id: string,
): Promise<AdminArticle | undefined> {
  return isSupabaseEnabled()
    ? getArticleByIdSupabase(id)
    : getArticleByIdSqlite(id);
}

export async function createArticle(
  input: ArticleInput,
): Promise<AdminArticle> {
  return isSupabaseEnabled()
    ? createArticleSupabase(input)
    : createArticleSqlite(input);
}

export async function updateArticle(
  id: string,
  input: ArticleInput,
): Promise<AdminArticle | undefined> {
  return isSupabaseEnabled()
    ? updateArticleSupabase(id, input)
    : updateArticleSqlite(id, input);
}

export async function deleteArticle(id: string): Promise<boolean> {
  return isSupabaseEnabled()
    ? deleteArticleSupabase(id)
    : deleteArticleSqlite(id);
}

export async function listPublishedArticles(
  category?: NewsCategory,
): Promise<NewsArticle[]> {
  return isSupabaseEnabled()
    ? listPublishedArticlesSupabase(category)
    : listPublishedArticlesSqlite(category);
}

export async function getPublishedArticleById(
  id: string,
): Promise<NewsArticle | undefined> {
  return isSupabaseEnabled()
    ? getPublishedArticleByIdSupabase(id)
    : getPublishedArticleByIdSqlite(id);
}

export async function countArticles(): Promise<number> {
  return isSupabaseEnabled()
    ? countArticlesSupabase()
    : countArticlesSqlite();
}
