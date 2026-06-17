export const THUE_MUA_VINFAST_PAGE_PATH = "/thue-mua-vinfast";

export const THUE_MUA_VINFAST_META_TITLE =
  "Thuê Mua Xe VinFast Cần Thơ 2026 – Chạy Dịch Vụ Grab, Be, Xanh SM | Cần Thơ GF";

export const THUE_MUA_VINFAST_META_DESCRIPTION =
  "Chương trình thuê mua xe VinFast tại Cần Thơ: chỉ cần đối ứng, nhận xe 7–10 ngày, hỗ trợ mở Grab/Be/Xanh SM. Herio Green, VF5, VF6, Limo Green — sở hữu sau 5 năm. Tư vấn miễn phí!";

export const THUE_MUA_VINFAST_KEYWORDS = [
  "thuê mua xe vinfast cần thơ",
  "thuê xe vinfast chạy grab cần thơ",
  "mua xe vinfast chạy dịch vụ",
  "xe vf5 chạy be xanh sm",
  "thuê thương quyền xe điện",
  "thuê mua vinfast đbscl",
  "xe điện chạy xanhsm cần thơ",
];

export const THUE_MUA_VINFAST_PAGE_H1 =
  "Thuê Mua Xe VinFast Chạy Dịch Vụ — Không Phát Sinh Chi Phí";

export const THUE_MUA_VINFAST_HERO_INTRO =
  "Chỉ cần đối ứng, nhận xe trong 7–10 ngày. Hỗ trợ đăng ký Grab, Be, Xanh SM ngay. Sở hữu hoàn toàn sau 5 năm.";

export const THUE_MUA_VINFAST_STATS = [
  { value: "5 năm", label: "Thuê sở hữu" },
  { value: "4 dòng xe", label: "Herio – VF5 – VF6 – Limo" },
  { value: "3 app", label: "Grab · Be · Xanh SM" },
  { value: "0 VNĐ", label: "Phí phát sinh thêm" },
] as const;

export type ThueMuaYearRate = {
  label: string;
  monthly: string;
  barPercent: number;
};

export type ThueMuaCarPlan = {
  id: string;
  name: string;
  priceLabel: string;
  downPaymentLabel: string;
  years: ThueMuaYearRate[];
  totalLabel: string;
  featured?: boolean;
  badge?: string;
};

export const THUE_MUA_MAIN_PLANS: ThueMuaCarPlan[] = [
  {
    id: "herio-green",
    name: "Herio Green",
    priceLabel: "Giá xe: 479tr",
    downPaymentLabel: "Đối ứng: 98tr",
    years: [
      { label: "Năm 1", monthly: "12tr", barPercent: 100 },
      { label: "Năm 2", monthly: "11.5tr", barPercent: 96 },
      { label: "Năm 3", monthly: "11tr", barPercent: 92 },
      { label: "Năm 4", monthly: "10.5tr", barPercent: 88 },
      { label: "Năm 5", monthly: "10tr", barPercent: 83 },
    ],
    totalLabel: "Tổng 5 năm: 660tr",
  },
  {
    id: "vf5-plus",
    name: "VF5 Plus",
    priceLabel: "Giá xe: 529tr",
    downPaymentLabel: "Đối ứng: 108tr",
    featured: true,
    badge: "Phổ biến nhất",
    years: [
      { label: "Năm 1", monthly: "13tr", barPercent: 100 },
      { label: "Năm 2", monthly: "12.5tr", barPercent: 96 },
      { label: "Năm 3", monthly: "12tr", barPercent: 92 },
      { label: "Năm 4", monthly: "11tr", barPercent: 85 },
      { label: "Năm 5", monthly: "10.5tr", barPercent: 81 },
    ],
    totalLabel: "Tổng 5 năm: 726tr",
  },
  {
    id: "vf6-eco",
    name: "VF6 Eco",
    priceLabel: "Giá xe: 689tr",
    downPaymentLabel: "Đối ứng: 138tr",
    years: [
      { label: "Năm 1", monthly: "16.5tr", barPercent: 100 },
      { label: "Năm 2", monthly: "15.5tr", barPercent: 94 },
      { label: "Năm 3", monthly: "15tr", barPercent: 91 },
      { label: "Năm 4", monthly: "14.5tr", barPercent: 88 },
      { label: "Năm 5", monthly: "13.5tr", barPercent: 82 },
    ],
    totalLabel: "Tổng 5 năm: 900tr",
  },
  {
    id: "vf6-plus-limo",
    name: "VF6 Plus / Limo Green",
    priceLabel: "Giá xe: 749tr",
    downPaymentLabel: "Đối ứng: 150tr",
    years: [
      { label: "Năm 1", monthly: "18tr", barPercent: 100 },
      { label: "Năm 2", monthly: "17tr", barPercent: 94 },
      { label: "Năm 3", monthly: "16tr", barPercent: 89 },
      { label: "Năm 4", monthly: "15tr", barPercent: 83 },
      { label: "Năm 5", monthly: "14tr", barPercent: 78 },
    ],
    totalLabel: "Tổng 5 năm: 960tr",
  },
];

export type ThueMuaLimoProgram = {
  id: string;
  name: string;
  description: string;
  years: ThueMuaYearRate[];
  totalLabel: string;
  featured?: boolean;
  badge?: string;
};

export const THUE_MUA_LIMO_PROGRAMS: ThueMuaLimoProgram[] = [
  {
    id: "limo-1",
    name: "Chương trình 1",
    description: "Đối ứng 80tr. Phần còn lại chia đều 24 tháng (cộng vào tiền thuê)",
    years: [
      { label: "Năm 1–2", monthly: "21tr", barPercent: 100 },
      { label: "Năm 3", monthly: "16tr", barPercent: 76 },
      { label: "Năm 4", monthly: "15tr", barPercent: 71 },
      { label: "Năm 5", monthly: "14tr", barPercent: 67 },
    ],
    totalLabel: "Tổng: ~1.05 tỷ",
  },
  {
    id: "limo-2",
    name: "Chương trình 2",
    description: "Đối ứng 80tr. Thanh toán phần còn lại một lần khi nhận xe",
    years: [
      { label: "Năm 1", monthly: "18tr", barPercent: 100 },
      { label: "Năm 2", monthly: "17tr", barPercent: 94 },
      { label: "Năm 3", monthly: "16tr", barPercent: 89 },
      { label: "Năm 4", monthly: "15tr", barPercent: 83 },
      { label: "Năm 5", monthly: "14tr", barPercent: 78 },
    ],
    totalLabel: "Tổng: ~960tr",
  },
  {
    id: "limo-3",
    name: "Chương trình 3",
    description: "Đối ứng 80tr. Tiền thuê cố định mỗi tháng suốt 5 năm",
    years: [{ label: "Năm 1–5", monthly: "18tr", barPercent: 100 }],
    totalLabel: "Tổng: ~1.16 tỷ",
  },
  {
    id: "limo-4",
    name: "Chương trình 4",
    description: "Đối ứng 150tr. Tiền thuê giảm dần từng năm",
    featured: true,
    badge: "Tiết kiệm nhất",
    years: [
      { label: "Năm 1", monthly: "18tr", barPercent: 100 },
      { label: "Năm 2", monthly: "17tr", barPercent: 94 },
      { label: "Năm 3", monthly: "16tr", barPercent: 89 },
      { label: "Năm 4", monthly: "15tr", barPercent: 83 },
      { label: "Năm 5", monthly: "14tr", barPercent: 78 },
    ],
    totalLabel: "Tổng: ~960tr — đối ứng cao hơn, tiền thuê ít hơn",
  },
];

export const THUE_MUA_BENEFITS = [
  {
    title: "Nhận xe nhanh",
    description: "7–10 ngày sau khi đối ứng, xe giao tận nơi đầy đủ giấy tờ",
  },
  {
    title: "Phim cách nhiệt 3M",
    description: "Dán full xe toàn bộ, trị giá 5–8 triệu — HTX tặng",
  },
  {
    title: "Mở 3 app trong 24h",
    description: "Grab, Be, Xanh SM — HTX ký hợp đồng liên kết, cam kết chạy ngay",
  },
  {
    title: "Camera hành trình",
    description: "Lắp sẵn hộp đen, thiết bị định vị theo quy định kinh doanh vận tải",
  },
  {
    title: "Phù hiệu HTX 6 năm",
    description: "Giấy phép kinh doanh vận tải — đăng ký biển vàng hợp pháp",
  },
  {
    title: "Thanh toán sớm",
    description: "Sau 2 năm có thể tất toán sớm — không tính phí phạt",
  },
  {
    title: "Thủ tục sang tên",
    description: "HTX lo hồ sơ pháp lý sang tên cho khách hàng cuối hợp đồng",
  },
  {
    title: "Thảm lót sàn full xe",
    description: "Bộ thảm lót cao cấp bảo vệ nội thất — tặng kèm khi nhận xe",
  },
] as const;

export const THUE_MUA_DOCUMENTS = [
  "CCCD công chứng",
  "GPLX công chứng",
  "Đăng ký tạm trú / thường trú (VNeID)",
  "Khám sức khoẻ (4 loại chất cấm)",
  "Lý lịch tư pháp số 1",
  "Sim chính chủ",
  "Thông tin người thân trên VNeID",
] as const;

/**
 * Bài viết blog nội bộ hiển thị ở mục "Bài viết liên quan".
 * Chỉ dùng `articleId` (slug tin tức) — link dạng /tin-tuc/{articleId}.
 *
 * Ví dụ thêm bài:
 * { keyword: "thuê mua VF5", title: "...", articleId: "slug-bai-viet" }
 */
export type ThueMuaRelatedArticle = {
  keyword: string;
  title: string;
  articleId: string;
};

export const THUE_MUA_RELATED_ARTICLES: ThueMuaRelatedArticle[] = [];

export type ThueMuaFaqItem = {
  question: string;
  answer: string;
};

export const THUE_MUA_FAQ: ThueMuaFaqItem[] = [
  {
    question: "Thuê thương quyền xe VinFast là gì?",
    answer:
      "Thuê thương quyền (franchise leasing) là mô hình bạn đặt một khoản đối ứng ban đầu, sử dụng xe trong 5 năm với tiền thuê giảm dần theo năm, và tự động sở hữu hoàn toàn xe sau hợp đồng — không cần vay ngân hàng, không lãi suất, không phát sinh thêm chi phí ngoài hợp đồng.",
  },
  {
    question: "Chi phí đối ứng ban đầu là bao nhiêu?",
    answer:
      "Tùy dòng xe: Herio Green cần 98 triệu, VF5 Plus cần 108 triệu, VF6 Eco cần 138 triệu, Limo Green cần từ 80–150 triệu tùy chương trình. Sau khi đối ứng, nhận xe trong 7–10 ngày làm việc.",
  },
  {
    question: "Có thể chạy Grab, Be, Xanh SM không?",
    answer:
      "Có. HTX Cần Thơ GF đã ký liên kết trực tiếp với Grab, Be và Xanh SM Platform. Khách hàng được hỗ trợ mở tài khoản 3 app trong vòng 24 giờ sau khi nhận xe và hoàn tất thủ tục biển vàng.",
  },
  {
    question: "Có thể trả xe sớm trước 5 năm không?",
    answer:
      "Có. Sau 2 năm hợp đồng, khách hàng có quyền thanh toán tất toán sớm để sở hữu xe mà không bị tính phí phạt. HTX hỗ trợ toàn bộ thủ tục pháp lý sang tên.",
  },
  {
    question: "VF5 Plus hay Limo Green phù hợp chạy dịch vụ hơn?",
    answer:
      "VF5 Plus phù hợp bác tài mới bắt đầu — chi phí đối ứng thấp (108tr), tiền thuê tháng từ 10.5–13tr, dễ hoàn vốn. Limo Green (749tr) phù hợp khách hàng muốn chạy phân khúc cao cấp Xanh SM 5 chỗ, thu nhập cao hơn nhưng chi phí ban đầu lớn hơn.",
  },
];
