import { getNewsById } from "@/lib/content/news";
import { getProductById } from "@/lib/content/products";
import { matchRouteFromSlug, type MatchedRoute } from "@/lib/routes";

/** Dữ liệu route resolve trên server — truyền xuống client để SSR/hydration khớp */
export type PageInitialData = {
  pathname: string;
  route: MatchedRoute;
};

export function getPathnameFromSlug(slug?: string[]): string {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

/**
 * Resolve trang từ slug trên server (CatchAllPage).
 * Không fetch API — dùng cùng nguồn content với metadata/JSON-LD.
 */
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
    return Boolean(getNewsById(data.route.id));
  }
  return data.route.page !== "notFound";
}
