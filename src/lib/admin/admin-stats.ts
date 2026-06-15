import { isSupabaseEnabled, getDatabaseMode } from "@/lib/db/config";
import { assertDatabaseReady } from "@/lib/db/config";
import { listArticles } from "@/lib/db/articles";
import { listAllPromotions } from "@/lib/db/promotions-db";
import { isPromotionExpired } from "@/lib/admin/promotion-form-config";

export type AdminDashboardStats = {
  databaseMode: "supabase" | "sqlite";
  articlesTotal: number;
  articlesPublished: number;
  articlesDraft: number;
  promotionsTotal: number;
  promotionsActive: number;
  promotionsExpired: number;
  usingStaticFallback: boolean;
};

export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  assertDatabaseReady();

  const [articles, promotions] = await Promise.all([
    listArticles(),
    listAllPromotions(),
  ]);

  const articlesPublished = articles.filter((a) => a.status === "published").length;
  const promotionsActive = promotions.filter(
    (p) => p.isActive && !isPromotionExpired(p.validUntil),
  ).length;
  const promotionsExpired = promotions.filter((p) =>
    isPromotionExpired(p.validUntil),
  ).length;

  const dbEmpty = articles.length === 0 && promotions.length === 0;

  return {
    databaseMode: getDatabaseMode(),
    articlesTotal: articles.length,
    articlesPublished,
    articlesDraft: articles.length - articlesPublished,
    promotionsTotal: promotions.length,
    promotionsActive,
    promotionsExpired,
    usingStaticFallback: dbEmpty && isSupabaseEnabled(),
  };
}
