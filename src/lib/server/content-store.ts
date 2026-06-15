import {
  listPublishedArticles,
  getPublishedArticleById,
} from "@/lib/db/articles";
import { listAllPromotions } from "@/lib/db/promotions-db";
import {
  NEWS_ARTICLES,
  type NewsArticle,
  type NewsCategory,
} from "@/lib/content/news";
import { PROMOTIONS, type Promotion } from "@/lib/content/promotions";

async function safeAsync<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("[content-store]", error);
    return fallback;
  }
}

export async function loadPublishedArticles(
  category?: NewsCategory,
): Promise<NewsArticle[]> {
  return safeAsync(async () => {
    const fromDb = await listPublishedArticles(category);
    if (fromDb.length > 0) return fromDb;
    if (category) {
      return NEWS_ARTICLES.filter((a) => a.category === category);
    }
    return [...NEWS_ARTICLES];
  }, category ? NEWS_ARTICLES.filter((a) => a.category === category) : [...NEWS_ARTICLES]);
}

export async function loadPublishedArticleById(
  id: string,
): Promise<NewsArticle | undefined> {
  return safeAsync(async () => {
    const fromDb = await getPublishedArticleById(id);
    if (fromDb) return fromDb;
    return NEWS_ARTICLES.find((a) => a.id === id);
  }, NEWS_ARTICLES.find((a) => a.id === id));
}

export async function loadAllPromotions(): Promise<Promotion[]> {
  return safeAsync(async () => {
    const fromDb = await listAllPromotions();
    if (fromDb.length > 0) return fromDb;
    return [...PROMOTIONS];
  }, [...PROMOTIONS]);
}

export async function loadPublishedArticleIds(): Promise<string[]> {
  const articles = await loadPublishedArticles();
  return articles.map((a) => a.id);
}
