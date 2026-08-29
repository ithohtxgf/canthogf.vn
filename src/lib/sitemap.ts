import type { MetadataRoute } from "next";
import { loadPublishedArticles } from "@/lib/server/content-store";
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
export async function buildSitemap(): Promise<MetadataRoute.Sitemap> {
  // Không gán lastModified cho trang tĩnh/sản phẩm — chưa có dữ liệu ngày sửa
  // thật theo từng trang; gán new Date() ở mọi lần build sẽ báo sai với Google
  // rằng nội dung "vừa thay đổi", làm giảm độ tin cậy tín hiệu lastmod.
  const staticEntries: MetadataRoute.Sitemap = SITEMAP_ROUTES.map((route) => ({
    url: toAbsoluteSitemapUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productEntries: MetadataRoute.Sitemap = PRODUCTS_SEO.map((product) => ({
    url: toAbsoluteSitemapUrl(`/san-pham/${product.id}`),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const newsEntries: MetadataRoute.Sitemap = (
    await loadPublishedArticles()
  ).map(
    (article) => ({
      url: toAbsoluteSitemapUrl(`/tin-tuc/${article.id}`),
      lastModified: parseNewsDate(article.date),
      changeFrequency: "monthly",
      priority: 0.65,
    }),
  );

  return [...staticEntries, ...productEntries, ...newsEntries];
}
