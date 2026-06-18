import type { Metadata, ResolvingMetadata } from "next";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import { getMetadataStaticParams, resolveMetadataFromSlug } from "@/lib/metadata";
import { loadPageDataFromSlug } from "@/lib/page-data";
import AppClient from "./AppClient";

/** KM & bài viết đổi qua admin — luôn đọc DB mới, không bake HTML lúc build */
export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

/** Metadata động theo đường dẫn (slug / ID sản phẩm / bài viết) */
export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  return await resolveMetadataFromSlug(slug);
}

export async function generateStaticParams() {
  return getMetadataStaticParams();
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await loadPageDataFromSlug(slug);

  return (
    <>
      <RouteJsonLd slug={slug} />
      <AppClient initialData={pageData} />
    </>
  );
}
