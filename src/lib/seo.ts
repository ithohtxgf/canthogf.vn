import type { Metadata } from "next";

export const SITE_NAME = "Cần Thơ GF";
export const SITE_NAME_ALT = "Can Tho GF";
export const ORGANIZATION_NAME = "Hợp tác xã vận tải Cần Thơ GF";

export const SEO_KEYWORDS = [
  "can tho gf",
  "htx cần thơ gf",
  "hợp tác xã vận tải cần thơ",
  "ô tô vinfast cần thơ",
  "xanhsm cần thơ",
  "vinfast cần thơ",
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
  "Hợp tác xã vận tải Cần Thơ GF (Can Tho GF) — đại lý ô tô VinFast Cần Thơ, tư vấn mua xe điện và đăng ký XanhSM Cần Thơ. Hotline 0916 513 720.";

export const HOME_TITLE =
  "Cần Thơ GF | Hợp tác xã vận tải Cần Thơ — Ô tô VinFast & XanhSM";

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
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: resolveMetadataImageUrl("/logo_cantho_gf.png"),
        width: 512,
        height: 512,
        alt: `${ORGANIZATION_NAME} — ${SITE_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [resolveMetadataImageUrl("/logo_cantho_gf.png")],
  },
};

export const homePageMetadata: Metadata = {
  ...baseMetadata,
  title: HOME_TITLE,
  alternates: createAlternates("/"),
};

export function getOrganizationJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@type": "AutoDealer",
    "@id": `${siteUrl}/#organization`,
    name: ORGANIZATION_NAME,
    alternateName: [SITE_NAME, SITE_NAME_ALT, "CanThoGF", "can tho gf"],
    description: DEFAULT_DESCRIPTION,
    url: siteUrl,
    logo: `${siteUrl}/logo_cantho_gf.png`,
    image: `${siteUrl}/logo_cantho_gf.png`,
    telephone: "+84916513720",
    email: "htxcanthogf@gmail.com",
    taxID: "1801807608",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cái Răng",
      addressLocality: "Cần Thơ",
      addressRegion: "Cần Thơ",
      addressCountry: "VN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Đồng bằng sông Cửu Long",
    },
    knowsAbout: [
      "Ô tô VinFast Cần Thơ",
      "Xe điện VinFast",
      "XanhSM Cần Thơ",
      "Hợp tác xã vận tải Cần Thơ",
    ],
  };
}

export function getWebSiteJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_NAME,
    alternateName: [SITE_NAME_ALT, "can tho gf", "cần thơ gf"],
    url: siteUrl,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "vi-VN",
    publisher: { "@id": `${siteUrl}/#organization` },
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
  { path: "/dang-ky-xanhsm", changeFrequency: "weekly" as const, priority: 0.9 },
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
