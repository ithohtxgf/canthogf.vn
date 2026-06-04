import type { Metadata, ResolvingMetadata } from "next";
import { RouteJsonLd } from "@/components/seo/RouteJsonLd";
import {
  getMetadataStaticParams,
  resolveMetadataFromSlug,
} from "@/lib/metadata";
import { getPageDataFromSlug } from "@/lib/page-data";
import AppClient from "./AppClient";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

/** Metadata động theo đường dẫn (slug / ID sản phẩm / bài viết) */
export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  return resolveMetadataFromSlug(slug);
}

export function generateStaticParams() {
  return getMetadataStaticParams();
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const pageData = getPageDataFromSlug(slug);

  return (
    <>
      <RouteJsonLd slug={slug} />
      <AppClient initialData={pageData} />
    </>
  );
}
