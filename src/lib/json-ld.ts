import { stripHtml, type NewsArticle } from "@/lib/content/news";
import { loadPublishedArticleById } from "@/lib/server/content-store";
import { getRichProductDetail } from "@/lib/content/product-details";
import { getProductById, PRODUCTS_SEO } from "@/lib/content/products";
import {
  VINFAST_CAN_THO_FAQ,
  VINFAST_CAN_THO_PAGE_DESCRIPTION,
  VINFAST_CAN_THO_PAGE_H1,
} from "@/lib/content/vinfast-can-tho";
import { XANHSM_FAQ, XANHSM_META_DESCRIPTION, XANHSM_PAGE_H1 } from "@/lib/content/xanhsm-page";
import {
  THUE_MUA_FAQ,
  THUE_MUA_VINFAST_META_DESCRIPTION,
  THUE_MUA_VINFAST_PAGE_H1,
  THUE_MUA_VINFAST_PAGE_PATH,
} from "@/lib/content/thue-mua-vinfast-page";
import {
  CONTACT_ADDRESS_LOCALITY,
  CONTACT_ADDRESS_REGION,
  CONTACT_EMAIL,
  CONTACT_FACEBOOK_URL,
  CONTACT_PHONE_TEL,
  CONTACT_STREET_ADDRESS,
  CONTACT_TIKTOK_URL,
  CONTACT_YOUTUBE_URL,
  CONTACT_ZALO_URL,
  SCHEMA_OPENING_HOURS,
} from "@/lib/contact";
import { STATIC_PAGE_METADATA } from "@/lib/metadata";
import { matchRouteFromSlug, type MatchedRoute } from "@/lib/routes";
import {
  DEFAULT_DESCRIPTION,
  HOME_TITLE,
  OG_SITE_NAME,
  getLocalBusinessEntityRef,
  getLocalBusinessJsonLd,
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
  // Chỉ khớp số có dấu chấm phân nhóm hàng nghìn (ví dụ "299.000.000"),
  // tránh lấy nhầm số rời rạc như năm "2026" trong các chuỗi "liên hệ đại lý".
  const match = price.match(/\d{1,3}(?:\.\d{3}){2,}/);
  if (!match) return undefined;
  const value = Number.parseInt(match[0].replace(/\./g, ""), 10);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

function getPriceValidUntil(): string {
  const now = new Date();
  return `${now.getFullYear()}-12-31`;
}

function organizationRef() {
  return getLocalBusinessEntityRef();
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

function getAboutPageJsonLd(path: string) {
  const url = getSitemapUrl(path);

  return {
    "@type": "AboutPage",
    "@id": `${url}#about-page`,
    url,
    name: "Giới thiệu về HTX Cần Thơ GF",
    description:
      "Tìm hiểu về lịch sử hình thành, sứ mệnh và các dịch vụ vận tải, phân phối ô tô điện VinFast của HTX Cần Thơ GF.",
    mainEntity: {
      "@type": ["LocalBusiness", "AutomotiveBusiness"],
      ...getLocalBusinessEntityRef(),
      name: OG_SITE_NAME,
    },
  };
}

function getContactPageJsonLd(path: string) {
  const url = getSitemapUrl(path);
  const telephone = CONTACT_PHONE_TEL.replace(
    /^\+84(\d{3})(\d{3})(\d{3,4})$/,
    "+84-$1-$2-$3",
  );

  return {
    "@type": "ContactPage",
    "@id": `${url}#contact-page`,
    url,
    name: "Liên hệ HTX Cần Thơ GF",
    description:
      "Trang thông tin liên hệ chính thức của HTX Cần Thơ GF. Hỗ trợ thủ tục gia nhập HTX, mua xe VinFast và thuê xe ô tô.",
    mainEntity: {
      ...getLocalBusinessEntityRef(),
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
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
    "@type": "NewsArticle",
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
    sku: product.id,
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
          priceValidUntil: getPriceValidUntil(),
          itemCondition: "https://schema.org/NewCondition",
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

function getVinfastCanThoAutoDealerJsonLd(path: string) {
  const url = getSitemapUrl(path);
  const telephone = CONTACT_PHONE_TEL.replace(/^\+84/, "0");

  return {
    "@type": "AutoDealer",
    "@id": `${url}#autodealer`,
    name: "Cần Thơ GF — VinFast Cần Thơ",
    url,
    telephone,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_STREET_ADDRESS,
      addressLocality: CONTACT_ADDRESS_LOCALITY,
      addressRegion: CONTACT_ADDRESS_REGION,
      addressCountry: "VN",
    },
    openingHours: SCHEMA_OPENING_HOURS,
    priceRange: "302.000.000đ - 1.499.000.000đ",
    sameAs: [
      CONTACT_FACEBOOK_URL,
      CONTACT_TIKTOK_URL,
      CONTACT_YOUTUBE_URL,
      CONTACT_ZALO_URL,
    ],
    description: VINFAST_CAN_THO_PAGE_DESCRIPTION,
    image: `${getSiteUrl()}/banner-homepage.webp`,
    logo: `${getSiteUrl()}/logo_cantho_gf.png`,
  };
}

function getVinfastCanThoFaqJsonLd(path: string) {
  const url = getSitemapUrl(path);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: VINFAST_CAN_THO_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function getThueMuaVinfastFaqJsonLd(path: string) {
  const url = getSitemapUrl(path);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: THUE_MUA_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function getXanhSmFaqJsonLd(path: string) {
  const url = getSitemapUrl(path);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    mainEntity: XANHSM_FAQ.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** @deprecated Dùng getVinfastCanThoAutoDealerJsonLd */
function getVinfastCanThoLocalBusinessJsonLd(path: string) {
  return getVinfastCanThoAutoDealerJsonLd(path);
}

async function buildGraphForRoute(
  route: MatchedRoute,
): Promise<Record<string, unknown>[]> {
  const graph: Record<string, unknown>[] = [];

  switch (route.page) {
    case "home": {
      graph.push(
        getLocalBusinessJsonLd(),
        getWebSiteJsonLd(),
        getWebPageJsonLdForPath("/", HOME_TITLE, DEFAULT_DESCRIPTION),
      );
      break;
    }
    case "about": {
      const path = "/gioi-thieu";
      const meta = STATIC_PAGE_METADATA[path];
      graph.push(
        getAboutPageJsonLd(path),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: meta.title, path },
        ]),
      );
      break;
    }
    case "contact": {
      const path = "/lien-he";
      const meta = STATIC_PAGE_METADATA[path];
      graph.push(
        getContactPageJsonLd(path),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: meta.title, path },
        ]),
      );
      break;
    }
    case "xanhsm": {
      const path = "/dang-ky-xanhsm";
      graph.push(
        getWebPageJsonLdForPath(path, XANHSM_PAGE_H1, XANHSM_META_DESCRIPTION),
        getLocalBusinessJsonLd(),
        getXanhSmFaqJsonLd(path),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Đăng ký XanhSM", path },
        ]),
      );
      break;
    }
    case "thueMuaVinfast": {
      const path = THUE_MUA_VINFAST_PAGE_PATH;
      graph.push(
        getWebPageJsonLdForPath(path, THUE_MUA_VINFAST_PAGE_H1, THUE_MUA_VINFAST_META_DESCRIPTION),
        getLocalBusinessJsonLd(),
        getThueMuaVinfastFaqJsonLd(path),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Thuê mua VinFast", path },
        ]),
      );
      break;
    }
    case "privacy":
    case "terms": {
      const pathMap = {
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
    case "vinfastCanTho": {
      const path = "/vinfast-can-tho";
      graph.push(
        getWebPageJsonLdForPath(
          path,
          VINFAST_CAN_THO_PAGE_H1,
          VINFAST_CAN_THO_PAGE_DESCRIPTION,
        ),
        getVinfastCanThoAutoDealerJsonLd(path),
        getVinfastCanThoFaqJsonLd(path),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "VinFast Cần Thơ", path },
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
      const rich = getRichProductDetail(route.id);
      const path = `/san-pham/${route.id}`;
      const pageTitle =
        rich?.metaTitle ?? product.metaTitle ?? `${product.name} — ${product.price}`;
      const pageDescription =
        rich?.metaDescription ?? product.metaDescription ?? product.description;
      graph.push(
        getWebPageJsonLdForPath(path, pageTitle, pageDescription),
        getProductJsonLd(
          {
            id: route.id,
            name: rich?.officialName ?? product.name,
            description: pageDescription,
            image: product.image,
            price: product.price,
          },
          path,
        ),
        getBreadcrumbJsonLd([
          { name: "Trang chủ", path: "/" },
          { name: "Ô tô VinFast", path: "/san-pham" },
          { name: rich?.shortName ?? product.name, path },
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
      const article = await loadPublishedArticleById(route.id);
      if (!article) break;
      const path = `/tin-tuc/${route.id}`;
      graph.push(
        getLocalBusinessJsonLd(),
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
export async function getRouteJsonLd(
  slug?: string[],
): Promise<Record<string, unknown> | null> {
  const route = matchRouteFromSlug(slug);
  if (route.page === "notFound") {
    return null;
  }

  const pageGraph = await buildGraphForRoute(route);
  if (pageGraph.length === 0) {
    return null;
  }

  return {
    "@context": SCHEMA_CONTEXT,
    "@graph": pageGraph,
  };
}
