import type { MetadataRoute } from "next";
import { getSiteUrl, ROBOTS_DISALLOW_PATHS } from "@/lib/seo";

/** Sinh /robots.txt — quy tắc crawl cho Googlebot và bot khác */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...ROBOTS_DISALLOW_PATHS],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
