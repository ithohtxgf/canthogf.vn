import type {
  PromotionCategoryTarget,
  PromotionDisplayStyle,
  PromotionPosition,
} from "@/lib/content/promotions";
import { PRODUCTS_SEO } from "@/lib/content/products";

export const PROMOTION_FORM_TABS = [
  { id: "config", label: "Cấu hình" },
  { id: "content", label: "Nội dung hiển thị" },
  { id: "preview", label: "Xem trước" },
] as const;

export type PromotionFormTabId = (typeof PROMOTION_FORM_TABS)[number]["id"];

export const PROMOTION_POSITION_OPTIONS: {
  value: PromotionPosition;
  label: string;
  hint: string;
  articleSlot?: "golden";
}[] = [
  {
    value: "top",
    label: "Top — Mồi nhử",
    hint: "Dưới mục lục, banner ngang mỏng. KM sốc, FOMO.",
    articleSlot: "golden",
  },
  {
    value: "middle",
    label: "Middle — Điểm rơi cảm xúc",
    hint: "Sau H2 thân bài thứ 2. Poster lớn, trả góp/giá.",
    articleSlot: "golden",
  },
  {
    value: "policy",
    label: "Policy — Giải quyết rào cản",
    hint: "Trong H2 chính sách/ưu đãi. Bảng giá, quyền lợi.",
    articleSlot: "golden",
  },
  {
    value: "bottom",
    label: "Bottom — Chốt sale",
    hint: "Phần kết luận. Box voucher + CTA lớn.",
    articleSlot: "golden",
  },
  {
    value: "popup",
    label: "Popup — Exit intent",
    hint: "Desktop: chuột rời trang. Chỉ 1 lần/session.",
  },
  {
    value: "sticky",
    label: "Sticky — Mobile bar",
    hint: "Thanh cố định đáy màn hình trên mobile.",
  },
  {
    value: "product-detail",
    label: "Product detail",
    hint: "Trang /san-pham/{slug} — dùng productTarget.",
  },
];

export const PROMOTION_CATEGORY_OPTIONS: {
  value: PromotionCategoryTarget;
  label: string;
}[] = [
  { value: "all", label: "Tất cả bài viết" },
  { value: "vinfast", label: "VinFast / Cần Thơ (tin xe)" },
  { value: "xanhsm", label: "XanhSM (bài có từ khóa XanhSM)" },
];

export const PROMOTION_DISPLAY_OPTIONS: {
  value: PromotionDisplayStyle;
  label: string;
  hint: string;
}[] = [
  { value: "strip", label: "Strip", hint: "Banner ngang mỏng — vị trí top" },
  { value: "card", label: "Card", hint: "Poster gradient lớn — middle" },
  { value: "table", label: "Table", hint: "Bảng giá + benefits — policy" },
  { value: "closing", label: "Closing", hint: "Voucher + hotline — bottom" },
  { value: "product-list", label: "Product list", hint: "Danh sách ưu đãi — trang SP" },
  { value: "image", label: "Image", hint: "Banner ảnh tĩnh" },
];

export const PROMOTION_LINK_PRESETS = [
  { value: "/lien-he", label: "Liên hệ tư vấn" },
  { value: "/san-pham/vf5", label: "VinFast VF5" },
  { value: "/san-pham/herio-green", label: "Herio Green" },
  { value: "/san-pham", label: "Danh mục xe" },
  { value: "/dang-ky-xanhsm", label: "Đăng ký XanhSM" },
  { value: "__custom__", label: "URL tùy chỉnh..." },
] as const;

export const PROMOTION_PRODUCT_OPTIONS = [
  { value: "", label: "— Không (chỉ tin tức) —" },
  { value: "all", label: "Mọi sản phẩm" },
  ...PRODUCTS_SEO.map((p) => ({ value: p.id, label: p.name })),
];

/** Gợi ý displayStyle theo vị trí */
export function suggestedDisplayStyle(
  position: PromotionPosition,
): PromotionDisplayStyle {
  switch (position) {
    case "top":
      return "strip";
    case "middle":
      return "card";
    case "policy":
      return "table";
    case "bottom":
      return "closing";
    case "product-detail":
      return "product-list";
    default:
      return "strip";
  }
}

export function isoToDatetimeLocal(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function datetimeLocalToIso(local: string): string | undefined {
  if (!local.trim()) return undefined;
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

export function isPromotionExpired(validUntil?: string): boolean {
  if (!validUntil) return false;
  return new Date(validUntil) <= new Date();
}
