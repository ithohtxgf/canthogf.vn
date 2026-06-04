import type { NewsArticle, NewsCategory, NewsContentSection } from "./news";

/** Danh mục nhắm mục tiêu — độc lập với category bài viết */
export type PromotionCategoryTarget = "all" | "vinfast" | "xanhsm";

/** Vị trí hiển thị — tin tức & trang sản phẩm */
export type PromotionPosition =
  | "top"
  | "middle"
  | "policy"
  | "bottom"
  | "popup"
  | "sticky"
  | "product-detail";

export type PromotionDisplayStyle =
  | "image"
  | "strip"
  | "card"
  | "table"
  | "closing"
  | "product-list";

/** Slug sản phẩm (/san-pham/{id}) hoặc "all" cho mọi xe */
export type PromotionProductTarget = string;

export type PromotionPriceRow = {
  label: string;
  value: string;
  highlight?: boolean;
};

/**
 * Trung tâm quản lý khuyến mãi — chỉnh tại đây, tin tức & trang sản phẩm tự cập nhật.
 */
export type Promotion = {
  id: string;
  title: string;
  link: string;
  openPopup?: boolean;
  position: PromotionPosition;
  categoryTarget: PromotionCategoryTarget;
  /** Chỉ hiển thị trên trang chi tiết sản phẩm — slug xe hoặc "all" */
  productTarget?: PromotionProductTarget;
  isActive: boolean;
  validUntil?: string;
  priority?: number;
  displayStyle: PromotionDisplayStyle;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  badge?: string;
  headline?: string;
  subline?: string;
  highlight?: string;
  showCountdown?: boolean;
  ctaLabel?: string;
  voucherText?: string;
  priceRows?: PromotionPriceRow[];
  benefits?: string[];
};

export const PROMOTIONS: Promotion[] = [
  {
    id: "promo-vf5-truoc-ba-top",
    title: "Tặng 100% trước bạ VinFast VF5",
    link: "/san-pham/vf5",
    openPopup: true,
    position: "top",
    categoryTarget: "vinfast",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "strip",
    badge: "🔥 ƯU ĐÃI THÁNG 6",
    headline:
      "VinFast VF5 tặng 100% trước bạ — Chỉ áp dụng trong tháng này tại Cần Thơ GF!",
    showCountdown: true,
    ctaLabel: "Nhận ưu đãi ngay",
  },
  {
    id: "promo-kiem-tra-pin-top",
    title: "Kiểm tra pin xe điện miễn phí",
    link: "/lien-he",
    openPopup: true,
    position: "top",
    categoryTarget: "all",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 5,
    displayStyle: "strip",
    badge: "🔋 MIỄN PHÍ",
    headline:
      "Kiểm tra pin VinFast miễn phí — Dành cho khách hàng Cần Thơ GF tháng 6!",
    showCountdown: true,
    ctaLabel: "Đặt lịch kiểm tra",
  },
  {
    id: "promo-xanhsm-tuyen-top",
    title: "Tuyển tài xế XanhSM Cần Thơ",
    link: "/dang-ky-xanhsm",
    position: "top",
    categoryTarget: "xanhsm",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "strip",
    badge: "🚕 TUYỂN TÀI XẾ",
    headline:
      "Gia nhập XanhSM Cần Thơ — Hỗ trợ 100% thủ tục + Ưu đãi xe VF5 tháng 6!",
    showCountdown: true,
    ctaLabel: "Đăng ký tài xế",
  },
  {
    id: "promo-vf5-tra-gop-middle",
    title: "Mua VF5 trả góp 0%",
    link: "/san-pham/vf5",
    openPopup: true,
    position: "middle",
    categoryTarget: "vinfast",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "card",
    badge: "⚡ TRẢ GÓP 0%",
    headline: "Mua VF5 ngay hôm nay chỉ với 50 triệu trả trước",
    subline: "Trả góp 0% · Thủ tục nhanh 24h tại Cần Thơ GF",
    highlight: "50 triệu trả trước · Trả góp 0%",
    showCountdown: true,
    ctaLabel: "Nhận báo giá VF5",
  },
  {
    id: "promo-xanhsm-thu-nhap-middle",
    title: "Chạy XanhSM với VF5",
    link: "/dang-ky-xanhsm",
    position: "middle",
    categoryTarget: "xanhsm",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "card",
    badge: "💵 THU NHẬP ỔN ĐỊNH",
    headline: "Chạy XanhSM với VF5 — Trả trước chỉ 50 triệu",
    subline: "Hỗ trợ trả góp · HTX Cần Thơ GF đồng hành",
    highlight: "50 triệu trả trước · Hỗ trợ trọn gói",
    showCountdown: true,
    ctaLabel: "Đăng ký XanhSM",
  },
  {
    id: "promo-tiet-kiem-middle",
    title: "Tiết kiệm chi phí xe điện",
    link: "/san-pham",
    position: "middle",
    categoryTarget: "all",
    isActive: true,
    priority: 3,
    displayStyle: "card",
    badge: "💰 ĐẦU TƯ THÔNG MINH",
    headline: "VF5 — Hoàn vốn sau 2–3 năm nhờ tiết kiệm nhiên liệu",
    subline: "Mua ngay chỉ 50 triệu trả trước · Trả góp 0% tại Cần Thơ GF",
    highlight: "Tiết kiệm 30–50% chi phí/100km",
    ctaLabel: "Xem danh mục xe",
  },
  {
    id: "promo-vf5-bang-gia-policy",
    title: "Bảng giá lăn bánh VF5",
    link: "/lien-he",
    openPopup: true,
    position: "policy",
    categoryTarget: "vinfast",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "table",
    headline: "Bảng giá lăn bánh VinFast VF5 — Cần Thơ GF",
    subline: "Giá tham khảo · Liên hệ hotline để nhận ưu đãi mới nhất",
    priceRows: [
      { label: "Giá niêm yết VF5", value: "529.000.000đ" },
      { label: "Lệ phí trước bạ", value: "Miễn 100%", highlight: true },
      { label: "Trả trước (20%)", value: "~105 triệu" },
      { label: "Trả góp ưu đãi", value: "Từ 50 triệu trả trước", highlight: true },
    ],
    benefits: [
      "Bàn giao xe trong 7–14 ngày",
      "Hỗ trợ vay ngân hàng liên kết",
      "Bảo hành chính hãng VinFast",
    ],
    ctaLabel: "Tư vấn trả góp VF5",
  },
  {
    id: "promo-xanhsm-quyen-loi-policy",
    title: "Quyền lợi tài xế XanhSM",
    link: "/dang-ky-xanhsm",
    position: "policy",
    categoryTarget: "xanhsm",
    isActive: true,
    priority: 10,
    displayStyle: "table",
    headline: "Quyền lợi tài xế XanhSM — Hợp tác xã Cần Thơ GF",
    subline: "Chính sách dành riêng cho tài xế đăng ký qua HTX",
    priceRows: [
      { label: "Hỗ trợ thủ tục đăng ký", value: "100% miễn phí", highlight: true },
      { label: "Vay mua xe VF5", value: "Trả trước từ 50 triệu" },
      { label: "Đào tạo vận hành", value: "Miễn phí" },
      { label: "Hỗ trợ kỹ thuật 24/7", value: "Hotline ưu tiên", highlight: true },
    ],
    benefits: [
      "Tư vấn chọn xe phù hợp tuyến chạy",
      "Hướng dẫn sạc pin tiết kiệm chi phí",
      "Cộng đồng tài xế HTX hỗ trợ lẫn nhau",
    ],
    ctaLabel: "Đăng ký lái XanhSM",
  },
  {
    id: "promo-chinh-sach-chung-policy",
    title: "Chính sách ưu đãi Cần Thơ GF",
    link: "/lien-he",
    openPopup: true,
    position: "policy",
    categoryTarget: "all",
    isActive: true,
    priority: 5,
    displayStyle: "table",
    headline: "Chính sách ưu đãi — Cần Thơ GF",
    subline: "Áp dụng tháng 6/2026",
    priceRows: [
      { label: "Lệ phí trước bạ", value: "Miễn 100%", highlight: true },
      { label: "Trả trước tối thiểu", value: "Từ 50 triệu" },
      { label: "Lãi suất trả góp", value: "0% · 12 tháng đầu", highlight: true },
    ],
    benefits: [
      "Tư vấn miễn phí",
      "Hỗ trợ đăng ký XanhSM",
      "Bảo hành chính hãng VinFast",
    ],
    ctaLabel: "Đăng ký nhận ưu đãi",
  },
  {
    id: "promo-voucher-bottom",
    title: "Voucher 5 triệu khi lái thử",
    link: "/lien-he",
    openPopup: true,
    position: "bottom",
    categoryTarget: "all",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "closing",
    badge: "🎁 VOUCHER 5 TRIỆU",
    headline: "Đăng ký lái thử ngay — Nhận Voucher 5 triệu",
    subline: "Ưu đãi có hạn — Chỉ dành cho 50 khách hàng đầu tiên trong tháng",
    voucherText: "Voucher 5.000.000đ",
    ctaLabel: "Điền form đăng ký",
  },
  {
    id: "promo-exit-intent-vinfast",
    title: "Báo giá ưu đãi VinFast",
    link: "/lien-he",
    openPopup: true,
    position: "popup",
    categoryTarget: "vinfast",
    isActive: true,
    priority: 10,
    displayStyle: "closing",
    headline: "Khoan đã! Bạn đã nhận báo giá ưu đãi VF5 hôm nay chưa?",
    subline: "Để lại SĐT — Cần Thơ GF gọi tư vấn miễn phí trong 15 phút",
    ctaLabel: "Nhận báo giá ngay",
  },
  {
    id: "promo-exit-intent-xanhsm",
    title: "Đăng ký XanhSM",
    link: "/dang-ky-xanhsm",
    position: "popup",
    categoryTarget: "xanhsm",
    isActive: true,
    priority: 10,
    displayStyle: "closing",
    headline: "Khoan đã! Bạn muốn tìm hiểu thu nhập tài xế XanhSM?",
    subline: "Đăng ký qua Cần Thơ GF — Hỗ trợ thủ tục 100% miễn phí",
    ctaLabel: "Đăng ký XanhSM",
  },
  {
    id: "promo-exit-intent-all",
    title: "Tư vấn miễn phí",
    link: "/lien-he",
    openPopup: true,
    position: "popup",
    categoryTarget: "all",
    isActive: true,
    priority: 1,
    displayStyle: "closing",
    headline: "Khoan đã! Bạn đã nhận báo giá ưu đãi hôm nay chưa?",
    subline: "Để lại SĐT — Cần Thơ GF gọi tư vấn miễn phí trong 15 phút",
    ctaLabel: "Nhận báo giá ngay",
  },
  {
    id: "promo-sticky-vinfast",
    title: "Nhận khuyến mãi VinFast",
    link: "/lien-he",
    openPopup: true,
    position: "sticky",
    categoryTarget: "vinfast",
    isActive: true,
    priority: 10,
    displayStyle: "strip",
    ctaLabel: "Nhận khuyến mãi",
  },
  {
    id: "promo-sticky-xanhsm",
    title: "Đăng ký XanhSM",
    link: "/dang-ky-xanhsm",
    position: "sticky",
    categoryTarget: "xanhsm",
    isActive: true,
    priority: 10,
    displayStyle: "strip",
    ctaLabel: "Đăng ký XanhSM",
  },
  {
    id: "promo-sticky-all",
    title: "Nhận khuyến mãi",
    link: "/lien-he",
    openPopup: true,
    position: "sticky",
    categoryTarget: "all",
    isActive: true,
    priority: 1,
    displayStyle: "strip",
    ctaLabel: "Nhận khuyến mãi",
  },
  {
    id: "promo-vf5-banner-image",
    title: "Banner khuyến mãi VF5 tháng 6",
    link: "/san-pham/vf5",
    position: "middle",
    categoryTarget: "vinfast",
    isActive: false,
    validUntil: "2026-06-30T23:59:59",
    priority: 20,
    displayStyle: "image",
    imageUrl: "https://picsum.photos/seed/vf5-banner-ngang/800/400",
    imageWidth: 800,
    imageHeight: 400,
  },

  // ── Trang chi tiết sản phẩm (product-detail) ──
  {
    id: "promo-herio-green-product",
    title: "Khuyến mãi Herio Green",
    link: "/lien-he",
    openPopup: true,
    position: "product-detail",
    categoryTarget: "vinfast",
    productTarget: "herio-green",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "product-list",
    headline: "Chương trình khuyến mãi tháng 6/2026",
    benefits: [
      "Hỗ trợ lãi suất 0% trong 2 năm đầu tiên",
      "Tặng gói bảo dưỡng miễn phí 3 năm",
      "Tặng bộ phụ kiện chính hãng trị giá 10 triệu đồng",
    ],
    ctaLabel: "Đăng ký nhận ưu đãi Herio Green",
  },
  {
    id: "promo-vf5-product",
    title: "Khuyến mãi VinFast VF5",
    link: "/lien-he",
    openPopup: true,
    position: "product-detail",
    categoryTarget: "vinfast",
    productTarget: "vf5",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "product-list",
    headline: "Chương trình khuyến mãi tháng 6/2026",
    benefits: [
      "Ưu đãi đặc quyền giảm trực tiếp 30 triệu đồng",
      "Miễn phí 1 năm sạc pin tại trạm sạc công cộng V-GREEN",
      "Trả góp linh hoạt với lãi suất cố định ưu đãi",
    ],
    ctaLabel: "Đăng ký nhận ưu đãi VF5",
  },
  {
    id: "promo-limo-green-product",
    title: "Khuyến mãi Limo Green",
    link: "/lien-he",
    openPopup: true,
    position: "product-detail",
    categoryTarget: "vinfast",
    productTarget: "limo-green",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "product-list",
    headline: "Chương trình khuyến mãi tháng 6/2026",
    benefits: [
      "Hỗ trợ vay lên đến 80% giá trị xe",
      "Tặng gói bảo hiểm thân vỏ 1 năm",
      "Combo quà tặng phụ kiện đặc biệt dành cho xe chạy dịch vụ",
    ],
    ctaLabel: "Đăng ký nhận ưu đãi Limo Green",
  },
  {
    id: "promo-ec-van-product",
    title: "Khuyến mãi EC Van",
    link: "/lien-he",
    openPopup: true,
    position: "product-detail",
    categoryTarget: "vinfast",
    productTarget: "ec-van",
    isActive: true,
    validUntil: "2026-06-30T23:59:59",
    priority: 10,
    displayStyle: "product-list",
    headline: "Chương trình khuyến mãi tháng 6/2026",
    benefits: [
      "Hỗ trợ chi phí biển số và trước bạ",
      "Gói hỗ trợ tài chính đặc biệt dành cho doanh nghiệp và hợp tác xã",
      "Voucher sạc pin trị giá 5.000.000 VNĐ",
    ],
    ctaLabel: "Đăng ký nhận ưu đãi EC Van",
  },
];

function isPromotionValid(promo: Promotion, now = new Date()): boolean {
  if (!promo.isActive) return false;
  if (promo.validUntil && new Date(promo.validUntil) <= now) return false;
  return true;
}

/** KM cho tin tức / bài viết — loại trừ KM gắn riêng sản phẩm */
export function getActivePromotions(
  targets: PromotionCategoryTarget[],
  position: PromotionPosition,
  now = new Date(),
): Promotion[] {
  return PROMOTIONS.filter(
    (promo) =>
      isPromotionValid(promo, now) &&
      promo.position === position &&
      !promo.productTarget &&
      (promo.categoryTarget === "all" ||
        targets.includes(promo.categoryTarget)),
  ).sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

/** KM cho trang chi tiết sản phẩm (/san-pham/{id}) */
export function getActiveProductPromotions(
  productId: string,
  position: PromotionPosition = "product-detail",
  now = new Date(),
): Promotion[] {
  return PROMOTIONS.filter(
    (promo) =>
      isPromotionValid(promo, now) &&
      promo.position === position &&
      (promo.productTarget === productId ||
        promo.productTarget === "all"),
  ).sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export function getPrimaryProductPromotion(
  productId: string,
  position: PromotionPosition = "product-detail",
): Promotion | null {
  return getActiveProductPromotions(productId, position)[0] ?? null;
}

export function getPrimaryPromotion(
  targets: PromotionCategoryTarget[],
  position: PromotionPosition,
): Promotion | null {
  return getActivePromotions(targets, position)[0] ?? null;
}

export function getArticlePromotionTargets(
  article: NewsArticle,
): PromotionCategoryTarget[] {
  const targets: PromotionCategoryTarget[] = ["all"];

  if (article.category === "vinfast" || article.category === "cantho") {
    targets.push("vinfast");
  }

  const context = `${article.id} ${article.title} ${article.keywords.join(" ")}`.toLowerCase();
  if (context.includes("xanhsm") || context.includes("xanh sm")) {
    targets.push("xanhsm");
  }

  return targets;
}

export function getPromotionTargetsFromCategory(
  category: NewsCategory | string,
  context = "",
): PromotionCategoryTarget[] {
  const targets: PromotionCategoryTarget[] = ["all"];
  if (category === "vinfast" || category === "cantho") {
    targets.push("vinfast");
  }
  const lower = context.toLowerCase();
  if (lower.includes("xanhsm") || lower.includes("xanh sm")) {
    targets.push("xanhsm");
  }
  return targets;
}

export function isEmotionalBreakSection(
  section: NewsContentSection,
  h2Index: number,
): boolean {
  return section.level === 2 && h2Index === 1;
}

export function isPolicySection(section: NewsContentSection): boolean {
  if (section.level !== 2) return false;
  const heading = section.heading.toLowerCase();
  return (
    heading.includes("chính sách") ||
    heading.includes("ưu đãi") ||
    section.id.includes("uu-dai") ||
    section.id.includes("chinh-sach")
  );
}

export function getPromoCountdownEnd(validUntil?: string): Date {
  if (validUntil) return new Date(validUntil);
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

export { dispatchConsultationPopup } from "@/lib/contact";
