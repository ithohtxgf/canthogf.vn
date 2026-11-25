import { revalidatePath } from "next/cache";
import { PRODUCTS_SEO } from "@/lib/content/products";
import type { ArticleStatus } from "@/lib/db/article-mapper";

const STATIC_PROMO_PATHS = [
  "/",
  "/tin-tuc",
  "/san-pham",
  "/dang-ky-xanhsm",
  "/gioi-thieu",
  "/lien-he",
] as const;

/** Làm mới các trang public có banner KM / tin tức */
export function revalidatePublicSitePaths(articleSlug?: string) {
  for (const path of STATIC_PROMO_PATHS) {
    revalidatePath(path);
  }

  for (const product of PRODUCTS_SEO) {
    revalidatePath(`/san-pham/${product.id}`);
  }

  if (articleSlug) {
    revalidatePath(`/tin-tuc/${articleSlug}`);
  }

  revalidatePath("/sitemap.xml");
}

/** Làm mới cache sau thay đổi bài viết */
export function revalidateArticlePaths(slug: string) {
  revalidatePublicSitePaths(slug);
}

/** Làm mới cache sau thay đổi khuyến mãi */
export function revalidatePromotionPaths() {
  revalidatePublicSitePaths();
}

export function shouldRevalidateArticles(
  nextStatus: ArticleStatus,
  previousStatus?: ArticleStatus,
): boolean {
  return nextStatus === "published" || previousStatus === "published";
}

export function shouldRevalidatePromotions(
  nextActive: boolean,
  previousActive?: boolean,
): boolean {
  return nextActive || previousActive === true;
}
