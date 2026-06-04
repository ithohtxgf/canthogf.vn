import type { MetadataRoute } from "next";
import { NEWS_SEO } from "@/lib/content/news";
import { PRODUCTS_SEO } from "@/lib/content/products";
import { getAbsoluteUrl, SITEMAP_ROUTES } from "@/lib/seo";

/** Sitemap bắt buộc URL tuyệt đối — không chấp nhận path tương đối (/san-pham) */
function toAbsoluteSitemapUrl(path: string): string {
  const url = getAbsoluteUrl(path);
  if (!/^https?:\/\//i.test(url)) {
    throw new Error(
      `[sitemap] URL phải tuyệt đối (https://domain/...), nhận được: ${url}`,
    );
  }
  return url;
}

function parseNewsDate(date: string): Date {
  const [day, month, year] = date.split("/").map(Number);
  if (!day || !month || !year) return new Date();
  return new Date(year, month - 1, day);
}

/**
 * Danh sách URL cho Googlebot — dùng bởi app/sitemap.ts → /sitemap.xml
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export function buildSitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = SITEMAP_ROUTES.map((route) => ({
    url: toAbsoluteSitemapUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS_SEO.map((product) => ({
    url: toAbsoluteSitemapUrl(`/san-pham/${product.id}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const newsEntries: MetadataRoute.Sitemap = NEWS_SEO.map((article) => ({
    url: toAbsoluteSitemapUrl(`/tin-tuc/${article.id}`),
    lastModified: parseNewsDate(article.date),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...productEntries, ...newsEntries];
}
