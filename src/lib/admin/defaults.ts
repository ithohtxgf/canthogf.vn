import type { ArticleInput } from "@/lib/db/article-mapper";
import type { NewsCategory } from "@/lib/content/news";

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const DEFAULT_AUTHOR = {
  name: "Ban biên tập Cần Thơ GF",
  role: "Chuyên gia tư vấn xe điện VinFast",
  bio: "Đội ngũ biên tập và tư vấn viên của Hợp tác xã vận tải Cần Thơ GF, với hơn 5 năm kinh nghiệm trong lĩnh vực xe điện VinFast, dịch vụ XanhSM và vận tải xanh tại Đồng bằng sông Cửu Long.",
};

export function createEmptyArticle(
  category: NewsCategory = "vinfast",
): ArticleInput {
  const today = new Date();
  const date = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

  return {
    id: "",
    title: "",
    metaTitle: "",
    excerpt: "",
    image: "",
    imageAlt: "",
    imageCaption: "",
    date,
    category,
    primaryKeyword: "",
    keywords: [],
    sapoHtml: "<p></p>",
    sections: [],
    faqs: [],
    author: { ...DEFAULT_AUTHOR },
    conclusionHtml: "<p></p>",
    cta: {
      title: "Liên hệ tư vấn",
      description: "Hotline 0969 99 11 77 — Cần Thơ GF hỗ trợ 24/7",
      label: "Đăng ký tư vấn miễn phí",
      href: "/lien-he",
    },
    status: "draft",
  };
}

export function createEmptyPromotion(): import("@/lib/content/promotions").Promotion {
  return {
    id: "",
    title: "",
    link: "/lien-he",
    position: "top",
    categoryTarget: "all",
    isActive: true,
    priority: 5,
    displayStyle: "strip",
    headline: "",
    ctaLabel: "Xem chi tiết",
    benefits: [],
    priceRows: [],
  };
}
