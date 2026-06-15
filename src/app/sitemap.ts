import type { MetadataRoute } from "next";
import { buildSitemap } from "@/lib/sitemap";

/** Sinh /sitemap.xml — giúp Googlebot crawl toàn bộ URL trên site */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSitemap();
}
