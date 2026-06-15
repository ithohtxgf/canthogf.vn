import type { NewsArticle, NewsCategory } from "@/lib/content/news";
import {
  articleToSupabaseRow,
  supabaseRowToArticle,
  toPublicArticle,
  type AdminArticle,
  type ArticleInput,
  type ArticleStatus,
  type SupabaseArticleRow,
} from "./article-mapper";
import { getSupabaseAdmin } from "./supabase-server";

export async function listArticlesSupabase(options?: {
  status?: ArticleStatus;
  category?: NewsCategory;
  search?: string;
}): Promise<AdminArticle[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase.from("articles").select("*").order("updated_at", {
    ascending: false,
  });

  if (options?.status) {
    query = query.eq("status", options.status);
  }
  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.search?.trim()) {
    const q = `%${options.search.trim()}%`;
    query = query.or(
      `title.ilike.${q},id.ilike.${q},primary_keyword.ilike.${q}`,
    );
  }

  const { data, error } = await query;
  if (error) throw new Error(`[supabase] listArticles: ${error.message}`);

  return (data as SupabaseArticleRow[]).map(supabaseRowToArticle);
}

export async function getArticleByIdSupabase(
  id: string,
): Promise<AdminArticle | undefined> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`[supabase] getArticleById: ${error.message}`);
  if (!data) return undefined;

  return supabaseRowToArticle(data as SupabaseArticleRow);
}

export async function createArticleSupabase(
  input: ArticleInput,
): Promise<AdminArticle> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const row = articleToSupabaseRow(input, now, now);

  const { data, error } = await supabase
    .from("articles")
    .insert(row)
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Slug đã tồn tại");
    }
    throw new Error(`[supabase] createArticle: ${error.message}`);
  }

  return supabaseRowToArticle(data as SupabaseArticleRow);
}

export async function updateArticleSupabase(
  id: string,
  input: ArticleInput,
): Promise<AdminArticle | undefined> {
  const existing = await getArticleByIdSupabase(id);
  if (!existing) return undefined;

  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const row = articleToSupabaseRow({ ...input, id }, existing.createdAt, now);

  const { data, error } = await supabase
    .from("articles")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(`[supabase] updateArticle: ${error.message}`);

  return supabaseRowToArticle(data as SupabaseArticleRow);
}

export async function deleteArticleSupabase(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { error, count } = await supabase
    .from("articles")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) throw new Error(`[supabase] deleteArticle: ${error.message}`);
  return (count ?? 0) > 0;
}

export async function listPublishedArticlesSupabase(
  category?: NewsCategory,
): Promise<NewsArticle[]> {
  return (await listArticlesSupabase({ status: "published", category })).map(
    toPublicArticle,
  );
}

export async function getPublishedArticleByIdSupabase(
  id: string,
): Promise<NewsArticle | undefined> {
  const article = await getArticleByIdSupabase(id);
  if (!article || article.status !== "published") return undefined;
  return toPublicArticle(article);
}

export async function countArticlesSupabase(): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  if (error) throw new Error(`[supabase] countArticles: ${error.message}`);
  return count ?? 0;
}

/** Upsert hàng loạt — dùng cho migrate/seed */
export async function upsertArticlesSupabase(
  rows: SupabaseArticleRow[],
): Promise<void> {
  if (rows.length === 0) return;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("articles").upsert(rows, {
    onConflict: "id",
  });
  if (error) throw new Error(`[supabase] upsertArticles: ${error.message}`);
}
