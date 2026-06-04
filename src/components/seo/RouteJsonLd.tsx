import { getRouteJsonLd } from "@/lib/json-ld";
import { JsonLdScript } from "./JsonLdScript";

type RouteJsonLdProps = {
  slug?: string[];
};

/** JSON-LD theo từng trang: Article, Product, BreadcrumbList… */
export function RouteJsonLd({ slug }: RouteJsonLdProps) {
  const data = getRouteJsonLd(slug);
  if (!data) {
    return null;
  }
  return <JsonLdScript data={data} />;
}
