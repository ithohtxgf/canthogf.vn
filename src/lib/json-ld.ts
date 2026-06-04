import { getNewsById, stripHtml, type NewsArticle } from "@/lib/content/news";
import { getProductById, PRODUCTS_SEO } from "@/lib/content/products";
import { STATIC_PAGE_METADATA } from "@/lib/metadata";
import { matchRouteFromSlug, type MatchedRoute } from "@/lib/routes";
import {
  DEFAULT_DESCRIPTION,
  HOME_TITLE,
  getOrganizationJsonLd,
  getSiteUrl,
  getSitemapUrl,
  getWebSiteJsonLd,
} from "@/lib/seo";

const SCHEMA_CONTEXT = "https://schema.org";

function parseNewsDateIso(date: string): string {
  const [day, month, year] = date.split("/").map(Number);
  if (!day || !month || !year) return new Date().toISOString();
  return new Date(year, month - 1, day).toISOString();
}

function parseVndPrice(price: string): number | undefined {
  const digits = price.replace(/\D/g, "");
  const value = Number.parseInt(digits, 10);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function organizationRef() {
  const siteUrl = getSiteUrl();
  return { "@id": `${siteUrl}/#organization` };
}

function websiteRef() {
  const siteUrl = getSiteUrl();
  return { "@id": `${siteUrl}/#website` };
}

function getBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getSitemapUrl(item.path),
    })),
  };
}

function getWebPageJsonLdForPath(
  path: string,
  name: string,
  description: string,
) {
  const url = getSitemapUrl(path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: websiteRef(),
    about: organizationRef(),
    inLanguage: "vi-VN",
  };
}

function getArticleJsonLd(article: NewsArticle, path: string) {
  const url = getSitemapUrl(path);
  const published = parseNewsDateIso(article.date);

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.metaTitle,
    description: article.excerpt,
    image: [article.image],
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      description: article.author.bio,
    },
    publisher: organizationRef(),
    datePublished: published,
    dateModified: published,
    inLanguage: "vi-VN",
    keywords: article.keywords.join(", "),
  };
}

function getFaqJsonLd(article: NewsArticle, path: string) {
  if (article.faqs.length === 0) return null;

  const url = getSitemapUrl(path);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(faq.answerHtml),
      },
    })),
  };
}

function getProductJsonLd(
  product: {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
  },
  path: string,
) {
  const url = getSitemapUrl(path);
  const price = parseVndPrice(product.price);

  return {
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: product.description,
    image: [product.image],
    url,
    brand: {
      "@type": "Brand",
      name: "VinFast",
    },
    category: "Ô tô điện VinFast",
    offers: price
      ? {
          "@type": "Offer",
          url,
          priceCurrency: "VND",
          price,
          availability: "https://schema.org/InStock",
          seller: organizationRef(),
        }
      : undefined,
  };
}

function getItemListJsonLd(
  path: string,
  name: string,
  items: { name: string; url: string }[],
) {
  return {
    "@type": "ItemList",
    "@id": `${getSitemapUrl(path)}#itemlist`,
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

function buildGraphForRoute(route: MatchedRoute): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = [];

  switch (route.page) {
    case "home": {
      graph.push(
        getWebPageJsonLdForPath("/", HOME_TITLE, DEFAULT_DESCRIPTION),
      );
      break;
    }
    case "about":
    case "xanhsm":
    case "contact":
    case "privacy":
    case "terms": {
      const pathMap = {
        about: "/gioi-thieu",
        xanhsm: "/dang-ky-xanhsm",
        contact: "/lien-he",
        privacy: "/chinh-sach-bao-mat",
        terms: "/dieu-khoan-su-dung",
      } as const;
      const path = pathMap[route.page];
      const meta = STATIC_PAGE_METADATA[path];
      graph.push(
        getWebPageJsonLdForPath(path, meta.title, meta.description),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: meta.title, path },
        ]),
      );
      break;
    }
    case "products": {
      const path = "/san-pham";
      const meta = STATIC_PAGE_METADATA[path];
      graph.push(
        getWebPageJsonLdForPath(path, meta.title, meta.description),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: meta.title, path },
        ]),
        getItemListJsonLd(
          path,
          "Danh mục xe điện VinFast Cần Thơ GF",
          PRODUCTS_SEO.map((p) => ({
            name: p.name,
            url: getSitemapUrl(`/san-pham/${p.id}`),
          })),
        ),
      );
      break;
    }
    case "product": {
      const product = getProductById(route.id);
      if (!product) break;
      const path = `/san-pham/${route.id}`;
      graph.push(
        getWebPageJsonLdForPath(
          path,
          `${product.name} — ${product.price}`,
          product.description,
        ),
        getProductJsonLd(product, path),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Ô tô VinFast", path: "/san-pham" },
          { name: product.name, path },
        ]),
      );
      break;
    }
    case "news": {
      const path = "/tin-tuc";
      const meta = STATIC_PAGE_METADATA[path];
      graph.push(
        getWebPageJsonLdForPath(path, meta.title, meta.description),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: meta.title, path },
        ]),
        {
          "@type": "Blog",
          "@id": `${getSitemapUrl(path)}#blog`,
          name: meta.title,
          description: meta.description,
          publisher: organizationRef(),
          inLanguage: "vi-VN",
        },
      );
      break;
    }
    case "newsArticle": {
      const article = getNewsById(route.id);
      if (!article) break;
      const path = `/tin-tuc/${route.id}`;
      graph.push(
        getWebPageJsonLdForPath(path, article.metaTitle, article.excerpt),
        getArticleJsonLd(article, path),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Tin tức", path: "/tin-tuc" },
          { name: article.title, path },
        ]),
      );
      const faqLd = getFaqJsonLd(article, path);
      if (faqLd) graph.push(faqLd);
      break;
    }
    default:
      break;
  }

  return graph;
}

/** JSON-LD theo route — Article, Product, Breadcrumb, WebPage… */
export function getRouteJsonLd(slug?: string[]): Record<string, unknown> | null {
  const route = matchRouteFromSlug(slug);
  if (route.page === "notFound") {
    return null;
  }

  const pageGraph = buildGraphForRoute(route);
  if (pageGraph.length === 0) {
    return null;
  }

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": pageGraph,
  };
}

/** JSON-LD toàn site — Organization + WebSite (layout) */
export function getSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": [getOrganizationJsonLd(), getWebSiteJsonLd()],
  };
}
