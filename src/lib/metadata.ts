import type { Metadata } from "next";
import {
  loadPublishedArticleById,
  loadPublishedArticleIds,
} from "@/lib/server/content-store";
import { getNewsArticleKeywords } from "@/lib/content/news";
import { getProductById, PRODUCTS_SEO } from "@/lib/content/products";
import { getRichProductDetail } from "@/lib/content/product-details";
import {
  THUE_MUA_FAQ,
  THUE_MUA_VINFAST_META_DESCRIPTION,
  THUE_MUA_VINFAST_META_TITLE,
  THUE_MUA_VINFAST_PAGE_H1,
  THUE_MUA_VINFAST_KEYWORDS,
} from "@/lib/content/thue-mua-vinfast-page";
import {
  XANHSM_META_DESCRIPTION,
  XANHSM_META_TITLE,
  XANHSM_KEYWORDS,
} from "@/lib/content/xanhsm-page";
import {
  getPartnerCityBySlug,
  XANHSM_PARTNER_CITIES,
  XANHSM_PARTNER_HUB_PATH,
} from "@/lib/content/xanhsm-partner-cities";
import {
  VINFAST_CAN_THO_META_TITLE,
  VINFAST_CAN_THO_PAGE_DESCRIPTION,
} from "@/lib/content/vinfast-can-tho";
import {
  createAlternates,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  getAbsoluteUrl,
  HOME_TITLE,
  OG_SITE_NAME,
  resolveMetadataImageUrl,
  SEO_KEYWORDS,
  SITE_NAME,
  baseMetadata,
  homePageMetadata,
} from "@/lib/seo";

type StaticPageConfig = {
  title: string;
  description: string;
  keywords?: string[];
  /** Không áp dụng template `%s | Cần Thơ GF` — tránh lặp title */
  absoluteTitle?: boolean;
};

/** Metadata tĩnh cho các trang cố định (1.1) */
export const STATIC_PAGE_METADATA: Record<string, StaticPageConfig> = {
  "/gioi-thieu": {
    title: "Giới thiệu HTX Vận Tải Cần Thơ GF",
    description:
      "Câu chuyện HTX Vận Tải Cần Thơ GF — hành trình xanh cùng bác tài: xe VinFast, phù hiệu HTX, app Xanh SM. Vững tay lái, trọn niềm tin, xanh tương lai.",
    keywords: [
      "giới thiệu cần thơ gf",
      "hợp tác xã vận tải cần thơ",
      "htx vận tải cần thơ gf",
      "xe vinfast cần thơ",
      "xanhsm cần thơ",
    ],
  },
  "/san-pham": {
    title: "Ô tô VinFast Cần Thơ",
    description:
      "Danh mục xe điện VinFast tại Cần Thơ GF: VF 3, Herio Green, VF5, Limo Green, EC Van. Tư vấn giá, khuyến mãi và trả góp.",
    keywords: [
      "ô tô vinfast cần thơ",
      "xe điện vinfast",
      "mua xe vinfast cần thơ",
      "bảng giá xe vinfast cần thơ",
      "xe điện cần thơ",
      "danh mục xe vinfast 2026",
      "xe vinfast trả góp cần thơ",
    ],
  },
  "/vinfast-can-tho": {
    title: VINFAST_CAN_THO_META_TITLE,
    absoluteTitle: true,
    description: VINFAST_CAN_THO_PAGE_DESCRIPTION,
    keywords: [
      "vinfast cần thơ",
      "vinfast cần thơ 2026",
      "bảng giá vinfast cần thơ",
      "xe điện vinfast cần thơ",
      "mua xe vinfast cần thơ",
      "đại lý vinfast cần thơ",
      "giá lăn bánh vinfast",
      "vinfast trả góp cần thơ",
      "xe thương mại vinfast cần thơ",
      "herio green cần thơ",
      "ec van cần thơ",
    ],
  },
  "/dang-ky-xanhsm": {
    title: XANHSM_META_TITLE,
    absoluteTitle: true,
    description: XANHSM_META_DESCRIPTION,
    keywords: [...XANHSM_KEYWORDS],
  },
  [XANHSM_PARTNER_HUB_PATH]: {
    title: "Đăng Ký Xanh SM Partner Theo Khu Vực – Cần Thơ GF",
    absoluteTitle: true,
    description:
      "Chủ xe VinFast muốn đăng ký Xanh SM Partner tại TPHCM, Vũng Tàu, Phú Quốc và nhiều tỉnh thành? Cần Thơ GF hướng dẫn thủ tục, hồ sơ, tư vấn online miễn phí.",
    keywords: [
      "đăng ký xanh sm partner",
      "xanh sm partner theo khu vực",
      "đăng ký đối tác xanh sm",
    ],
  },
  "/thue-mua-xe-vinfast": {
    title: THUE_MUA_VINFAST_META_TITLE,
    absoluteTitle: true,
    description: THUE_MUA_VINFAST_META_DESCRIPTION,
    keywords: [...THUE_MUA_VINFAST_KEYWORDS],
  },
  "/tin-tuc": {
    title: "Tin tức",
    description:
      "Cập nhật tin tức VinFast, hoạt động Cần Thơ GF, kiến thức xe điện và XanhSM tại Đồng bằng sông Cửu Long.",
    keywords: [
      "tin tức vinfast",
      "tin tức cần thơ gf",
      "cập nhật xe điện",
    ],
  },
  "/lien-he": {
    title: "Liên hệ",
    description:
      "Liên hệ Cần Thơ GF — showroom Cần Thơ, hotline 0916 513 720, email htxcanthogf@gmail.com. Tư vấn mua xe VinFast và XanhSM.",
    keywords: ["liên hệ cần thơ gf", "showroom vinfast cần thơ"],
  },
  "/chinh-sach-bao-mat": {
    title: "Chính sách bảo mật",
    description:
      "Chính sách bảo mật thông tin khách hàng của website Hợp tác xã vận tải Cần Thơ GF.",
  },
  "/dieu-khoan-su-dung": {
    title: "Điều khoản sử dụng",
    description:
      "Điều khoản sử dụng website và dịch vụ của Hợp tác xã vận tải Cần Thơ GF.",
  },
};

function buildOpenGraphImage(url: string, alt: string) {
  return [
    {
      url: resolveMetadataImageUrl(url),
      width: DEFAULT_OG_IMAGE_WIDTH,
      height: DEFAULT_OG_IMAGE_HEIGHT,
      alt,
    },
  ];
}

function buildDefaultOpenGraphImages() {
  return [
    {
      url: resolveMetadataImageUrl(DEFAULT_OG_IMAGE),
      width: DEFAULT_OG_IMAGE_WIDTH,
      height: DEFAULT_OG_IMAGE_HEIGHT,
      alt: DEFAULT_OG_IMAGE_ALT,
    },
  ];
}

function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  absoluteTitle?: boolean;
}): Metadata {
  const ogImages = options.image
    ? buildOpenGraphImage(
        options.image,
        options.imageAlt ?? options.title,
      )
    : buildDefaultOpenGraphImages();

  return {
    title: options.absoluteTitle ? { absolute: options.title } : options.title,
    description: options.description,
    keywords: options.keywords ?? [...SEO_KEYWORDS],
    alternates: createAlternates(options.path),
    openGraph: {
      type: options.type ?? "website",
      locale: "vi_VN",
      url: getAbsoluteUrl(options.path),
      siteName: OG_SITE_NAME,
      title: options.title,
      description: options.description,
      images: ogImages,
      ...(options.type === "article" && options.publishedTime
        ? { publishedTime: options.publishedTime }
        : {}),
      ...(options.authors?.length ? { authors: options.authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: options.image
        ? [resolveMetadataImageUrl(options.image)]
        : [resolveMetadataImageUrl(DEFAULT_OG_IMAGE)],
    },
  };
}

function parseNewsDate(date: string): string | undefined {
  const [day, month, year] = date.split("/").map(Number);
  if (!day || !month || !year) return undefined;
  return new Date(year, month - 1, day).toISOString();
}

/** Metadata động theo slug URL (1.2) */
export async function resolveMetadataFromSlug(
  slug?: string[],
): Promise<Metadata> {
  const segments = slug ?? [];
  const path =
    segments.length === 0 ? "/" : `/${segments.join("/")}`;

  if (segments.length === 0) {
    return homePageMetadata;
  }

  if (segments.length === 1) {
    const staticMeta = STATIC_PAGE_METADATA[path];
    if (staticMeta) {
      return buildPageMetadata({
        title: staticMeta.title,
        description: staticMeta.description,
        path,
        keywords: staticMeta.keywords,
        absoluteTitle: staticMeta.absoluteTitle,
      });
    }
  }

  if (segments.length === 2 && segments[0] === "san-pham") {
    const productId = segments[1];
    const rich = getRichProductDetail(productId);
    const product = getProductById(productId);
    if (product) {
      const title =
        rich?.metaTitle ?? product.metaTitle ?? `${product.name} — ${product.price}`;
      const description =
        rich?.metaDescription ?? product.metaDescription ?? product.description;
      const keywords = rich?.keywords ?? product.keywords ?? [
        product.name.toLowerCase(),
        "vinfast cần thơ",
        "mua xe vinfast",
      ];
      return buildPageMetadata({
        title,
        description,
        path,
        keywords,
        image: product.image,
        imageAlt: rich?.imageAlt ?? `${product.name} — ${SITE_NAME}`,
      });
    }
  }

  if (segments.length === 2 && segments[0] === "dang-ky-xanhsm-partner") {
    const city = getPartnerCityBySlug(segments[1]);
    if (city) {
      return buildPageMetadata({
        title: city.metaTitle,
        description: city.metaDescription,
        path,
        keywords: city.keywords,
        absoluteTitle: true,
      });
    }
  }

  if (segments.length === 2 && segments[0] === "tin-tuc") {
    const article = await loadPublishedArticleById(segments[1]);
    if (article) {
      return buildPageMetadata({
        title: article.metaTitle,
        description: article.excerpt,
        path,
        keywords: getNewsArticleKeywords(article),
        image: article.image,
        imageAlt: article.imageAlt,
        type: "article",
        publishedTime: parseNewsDate(article.date),
        authors: [article.author.name],
      });
    }
  }

  return {
    title: "Không tìm thấy trang",
    description: DEFAULT_DESCRIPTION,
    robots: { index: false, follow: false },
  };
}

/** Pre-render các URL tĩnh và động cho SEO */
export async function getMetadataStaticParams(): Promise<
  { slug?: string[] }[]
> {
  const staticSlugs = Object.keys(STATIC_PAGE_METADATA).map((path) => ({
    slug: path.slice(1).split("/"),
  }));

  const productSlugs = PRODUCTS_SEO.map((p) => ({
    slug: ["san-pham", p.id],
  }));

  const newsSlugs = (await loadPublishedArticleIds()).map((id) => ({
    slug: ["tin-tuc", id],
  }));

  const partnerCitySlugs = XANHSM_PARTNER_CITIES.map((city) => ({
    slug: ["dang-ky-xanhsm-partner", city.slug],
  }));

  return [{}, ...staticSlugs, ...productSlugs, ...newsSlugs, ...partnerCitySlugs];
}
