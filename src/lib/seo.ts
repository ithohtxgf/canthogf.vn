import type { Metadata } from "next";
import {
  CONTACT_ADDRESS_LOCALITY,
  CONTACT_ADDRESS_REGION,
  CONTACT_FACEBOOK_URL,
  CONTACT_GEO_LATITUDE,
  CONTACT_GEO_LONGITUDE,
  CONTACT_MAPS_SHARE_URL,
  CONTACT_PHONE_TEL,
  CONTACT_STREET_ADDRESS,
  CONTACT_TIKTOK_URL,
  CONTACT_YOUTUBE_URL,
  CONTACT_ZALO_URL,
  SCHEMA_OPENING_HOURS,
} from "@/lib/contact";

export const SITE_NAME = "Cần Thơ GF";
export const SITE_NAME_ALT = "Can Tho GF";
export const OG_SITE_NAME = "HTX Cần Thơ GF";
export const ORGANIZATION_NAME = "Hợp tác xã vận tải Cần Thơ GF";
export const LOCAL_BUSINESS_ENTITY_ID = "industrial-entity";

export const SCHEMA_LOGO_PATH = "/logo_cantho_gf.png";
export const SCHEMA_IMAGE_PATH = "/banner-homepage.webp";

export const SEO_KEYWORDS = [
  "can tho gf",
  "htx cần thơ gf",
  "hợp tác xã vận tải cần thơ",
  "ô tô vinfast cần thơ",
  "xanhsm cần thơ",
  "vinfast cần thơ",
  "vinfast cần thơ 2026",
  "mua xe vinfast 2026",
  "xe điện vinfast",
  "đại lý vinfast cần thơ",
] as const;

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Bắt buộc cho Metadata API — Next.js dùng để sinh URL tuyệt đối cho
 * canonical, og:url, og:image, twitter:image.
 * Cấu hình production: NEXT_PUBLIC_SITE_URL=https://domaincuaban.com
 */
export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

/** URL tuyệt đối (https://domain.../path) — dùng cho sitemap, canonical, OG */
export function getAbsoluteUrl(path: string = "/"): string {
  const siteUrl = getSiteUrl();
  const canonical = getCanonicalPath(path);
  return canonical === "/" ? siteUrl : `${siteUrl}${canonical}`;
}

/** @deprecated Dùng getAbsoluteUrl — giữ alias cho tương thích */
export function getSitemapUrl(path: string = "/"): string {
  return getAbsoluteUrl(path);
}

/** Chuẩn hóa ảnh OG: URL ngoài giữ nguyên, path nội bộ → tuyệt đối */
export function resolveMetadataImageUrl(imageUrl: string): string {
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }
  const path = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  return getAbsoluteUrl(path);
}

/** Locale chính của site (dùng cho hreflang) */
export const SITE_LOCALE = "vi-VN" as const;

/** Chuẩn hóa đường dẫn canonical (luôn bắt đầu bằng /) */
export function getCanonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Canonical + hreflang — nối với metadataBase thành URL tuyệt đối.
 * Site một ngôn ngữ: vi-VN và x-default trỏ cùng URL gốc.
 */
export function createAlternates(canonicalPath: string): NonNullable<Metadata["alternates"]> {
  const absoluteUrl = getAbsoluteUrl(canonicalPath);
  return {
    canonical: absoluteUrl,
    languages: {
      [SITE_LOCALE]: absoluteUrl,
      "x-default": absoluteUrl,
    },
  };
}

export const DEFAULT_DESCRIPTION =
  "HTX Cần Thơ GF - Đại lý ủy quyền ô tô điện VinFast tại Cần Thơ. Hỗ trợ trọn gói thủ tục gia nhập HTX, đăng ký chạy Xanh SM. Liên hệ ngay!";

export const HOME_TITLE =
  "Cần Thơ GF | Đại Lý Xe Điện VinFast & HTX Vận Tải";

/** Ảnh OG/Twitter mặc định — banner trang chủ được resize về 1200×630 qua /api/og */
export const DEFAULT_OG_IMAGE = "/api/og";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
export const DEFAULT_OG_IMAGE_ALT = `${ORGANIZATION_NAME} — ${SITE_NAME}`;

export const baseMetadata: Metadata = {
  /** Bắt buộc — sinh canonical / Open Graph dạng URL tuyệt đối */
  metadataBase: getMetadataBase(),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: ORGANIZATION_NAME }],
  creator: ORGANIZATION_NAME,
  publisher: ORGANIZATION_NAME,
  category: "Ô tô điện VinFast",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: createAlternates("/"),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: getAbsoluteUrl("/"),
    siteName: OG_SITE_NAME,
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: resolveMetadataImageUrl(DEFAULT_OG_IMAGE),
        width: DEFAULT_OG_IMAGE_WIDTH,
        height: DEFAULT_OG_IMAGE_HEIGHT,
        alt: DEFAULT_OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [resolveMetadataImageUrl(DEFAULT_OG_IMAGE)],
  },
};

export const homePageMetadata: Metadata = {
  ...baseMetadata,
  title: { absolute: HOME_TITLE },
  alternates: createAlternates("/"),
};

export function getLocalBusinessEntityRef() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return { "@id": `${siteUrl}/#${LOCAL_BUSINESS_ENTITY_ID}` };
}

export function getLocalBusinessJsonLd() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  const telephone = CONTACT_PHONE_TEL.replace(
    /^\+84(\d{3})(\d{3})(\d{3,4})$/,
    "+84-$1-$2-$3",
  );

  return {
    "@type": [
      "LocalBusiness",
      "AutomotiveBusiness",
      "AutoDealer",
      "AutoRental",
    ],
    "@id": `${siteUrl}/#${LOCAL_BUSINESS_ENTITY_ID}`,
    name: OG_SITE_NAME,
    url: `${siteUrl}/`,
    logo: `${siteUrl}${SCHEMA_LOGO_PATH}`,
    image: `${siteUrl}${SCHEMA_IMAGE_PATH}`,
    telephone,
    priceRange: "302.000.000đ - 1.499.000.000đ",
    hasMap: CONTACT_MAPS_SHARE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_STREET_ADDRESS,
      addressLocality: CONTACT_ADDRESS_LOCALITY,
      addressRegion: CONTACT_ADDRESS_REGION,
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACT_GEO_LATITUDE,
      longitude: CONTACT_GEO_LONGITUDE,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "17:30",
      },
    ],
    openingHours: SCHEMA_OPENING_HOURS,
    sameAs: [
      CONTACT_FACEBOOK_URL,
      CONTACT_TIKTOK_URL,
      CONTACT_YOUTUBE_URL,
      CONTACT_ZALO_URL,
    ],
    knowsAbout: [
      "Hợp tác xã vận tải ô tô",
      "Ô tô điện VinFast",
      "Dịch vụ cho thuê xe ô tô",
      "Thủ tục gia nhập tài xế Xanh SM",
    ],
  };
}

/** @deprecated Dùng getLocalBusinessJsonLd */
export function getOrganizationJsonLd() {
  return getLocalBusinessJsonLd();
}

export function getWebSiteJsonLd() {
  const siteUrl = getSiteUrl().replace(/\/$/, "");
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: OG_SITE_NAME,
    alternateName: ["Cần Thơ GF", "Can Thơ GF Transport"],
    url: `${siteUrl}/`,
    publisher: getLocalBusinessEntityRef(),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/tin-tuc?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Đường dẫn không cho Googlebot index (admin, nội bộ, API…) */
export const ROBOTS_DISALLOW_PATHS = [
  "/private/",
  "/admin/",
  "/api/",
] as const;

export const SITEMAP_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/gioi-thieu", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/san-pham", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/vinfast-can-tho", changeFrequency: "weekly" as const, priority: 0.95 },
  { path: "/dang-ky-xanhsm", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/thue-mua-vinfast", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/tin-tuc", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/lien-he", changeFrequency: "monthly" as const, priority: 0.8 },
  {
    path: "/chinh-sach-bao-mat",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
  {
    path: "/dieu-khoan-su-dung",
    changeFrequency: "yearly" as const,
    priority: 0.3,
  },
];
