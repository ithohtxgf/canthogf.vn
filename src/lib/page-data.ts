import type { NewsArticle } from "@/lib/content/news";
import type { Promotion } from "@/lib/content/promotions";
import {
  loadAllPromotions,
  loadPublishedArticleById,
  loadPublishedArticles,
} from "@/lib/server/content-store";
import { getNewsById } from "@/lib/content/news";
import { getProductById } from "@/lib/content/products";
import { matchRouteFromSlug, type MatchedRoute } from "@/lib/routes";

/** Dữ liệu route resolve trên server — truyền xuống client để SSR/hydration khớp */
export type PageInitialData = {
  pathname: string;
  route: MatchedRoute;
  /** Toàn bộ bài đã xuất bản — dùng hydrate catalog client */
  newsCatalog?: NewsArticle[];
  /** Subset hiển thị (trang chủ = 3 bài) */
  newsArticles?: NewsArticle[];
  /** Bài chi tiết khi route = newsArticle */
  newsArticle?: NewsArticle;
  /** Catalog khuyến mãi (từ DB hoặc fallback file) */
  promotions?: Promotion[];
};

export function getPathnameFromSlug(slug?: string[]): string {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

/**
 * Resolve trang từ slug trên server (CatchAllPage).
 * Load tin tức / KM từ SQLite khi có.
 */
export async function loadPageDataFromSlug(
  slug?: string[],
): Promise<PageInitialData> {
  const pathname = getPathnameFromSlug(slug);
  const route = matchRouteFromSlug(slug);
  const promotions = await loadAllPromotions();
  const newsCatalog = await loadPublishedArticles();

  let newsArticles: NewsArticle[] | undefined;
  let newsArticle: NewsArticle | undefined;

  if (route.page === "home") {
    newsArticles = newsCatalog.slice(0, 3);
  } else if (route.page === "news") {
    newsArticles = newsCatalog;
  } else if (route.page === "newsArticle") {
    newsArticle = await loadPublishedArticleById(route.id);
    newsArticles = newsCatalog;
  }

  return {
    pathname,
    route,
    newsCatalog,
    newsArticles,
    newsArticle,
    promotions,
  };
}

/** @deprecated Dùng loadPageDataFromSlug — giữ sync cho tương thích */
export function getPageDataFromSlug(slug?: string[]): PageInitialData {
  const pathname = getPathnameFromSlug(slug);
  const route = matchRouteFromSlug(slug);
  return { pathname, route };
}

/** Kiểm tra slug dynamic có entity hợp lệ (product / article) */
export function isPageDataValid(data: PageInitialData): boolean {
  if (data.route.page === "product") {
    return Boolean(getProductById(data.route.id));
  }
  if (data.route.page === "newsArticle") {
    return Boolean(
      data.newsArticle ?? getNewsById(data.route.id),
    );
  }
  return data.route.page !== "notFound";
}
