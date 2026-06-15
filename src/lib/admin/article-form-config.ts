import type { NewsAuthorInfo } from "@/lib/content/news";

export const CTA_HREF_OPTIONS = [
  { value: "/lien-he", label: "Liên hệ tư vấn (/lien-he)" },
  { value: "/san-pham", label: "Danh mục xe (/san-pham)" },
  { value: "/san-pham/vf5", label: "VinFast VF5 (/san-pham/vf5)" },
  { value: "/san-pham/herio-green", label: "Herio Green (/san-pham/herio-green)" },
  { value: "/dang-ky-xanhsm", label: "Đăng ký XanhSM (/dang-ky-xanhsm)" },
  { value: "__custom__", label: "URL tùy chỉnh..." },
] as const;

export const AUTHOR_PRESETS: Record<string, NewsAuthorInfo> = {
  editor: {
    name: "Ban biên tập Cần Thơ GF",
    role: "Chuyên gia tư vấn xe điện VinFast",
    bio: "Đội ngũ biên tập và tư vấn viên của Hợp tác xã vận tải Cần Thơ GF, với hơn 5 năm kinh nghiệm trong lĩnh vực xe điện VinFast, dịch vụ XanhSM và vận tải xanh tại Đồng bằng sông Cửu Long.",
  },
  tech: {
    name: "Đội kỹ thuật Cần Thơ GF",
    role: "Kỹ thuật viên bảo dưỡng xe điện VinFast",
    bio: "Chuyên gia kỹ thuật pin và hệ thống điện xe VinFast tại showroom Cần Thơ GF, am hiểu quy trình sạc, bảo dưỡng và vận hành xe điện trong điều kiện khí hậu miền Tây.",
  },
};

export const INTERNAL_LINK_PRESETS = [
  { href: "/san-pham/vf5", label: "VinFast VF5" },
  { href: "/san-pham/herio-green", label: "Herio Green" },
  { href: "/san-pham", label: "Danh mục xe" },
  { href: "/dang-ky-xanhsm", label: "Đăng ký XanhSM" },
  { href: "/lien-he", label: "Liên hệ" },
] as const;

export const ARTICLE_FORM_TABS = [
  { id: "seo", label: "SEO & Xuất bản" },
  { id: "sapo", label: "Mở bài" },
  { id: "sections", label: "Nội dung chính" },
  { id: "faq", label: "FAQ & Kết luận" },
  { id: "author", label: "Tác giả" },
] as const;

export type ArticleFormTabId = (typeof ARTICLE_FORM_TABS)[number]["id"];
