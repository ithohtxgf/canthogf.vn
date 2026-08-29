import type { RichProductDetail } from "@/lib/content/product-details";

export const LIMO_GREEN_DETAIL: RichProductDetail = {
  id: "limo-green",
  officialName: "VinFast Limo Green",
  segment: "Xe thương mại dịch vụ xanh — Ô tô điện 7 chỗ",
  shortName: "Limo Green",
  h1: "VinFast Limo Green: Ô Tô Điện 7 Chỗ Dịch Vụ Xanh Tại Cần Thơ",
  metaTitle:
    "VinFast Limo Green Cần Thơ: Giá Kèm Pin, Thông Số & Màu Sắc 2026",
  metaDescription:
    "VinFast Limo Green — xe điện 7 chỗ dịch vụ xanh, giá niêm yết 699 triệu (đã kèm pin). Quãng đường 450 km NEDC, sạc nhanh 30 phút. Tư vấn tại Cần Thơ GF.",
  keywords: [
    "vinfast limo green",
    "limo green cần thơ",
    "xe điện 7 chỗ vinfast",
    "limo green giá",
    "mua limo green cần thơ",
    "xe dịch vụ xanh vinfast",
  ],
  image: "/Limo-Green.png",
  imageAlt:
    "VinFast Limo Green — ô tô điện 7 chỗ dịch vụ xanh tại Cần Thơ GF",
  listPrice: 699_000_000,
  listPriceLabel: "699.000.000 VNĐ (đã kèm pin)",
  positioningHtml: `<p><strong>VinFast Limo Green</strong> thuộc phân khúc <em>xe thương mại dịch vụ xanh — ô tô điện 7 chỗ</em>, được thiết kế tối ưu tăng kích cỡ để tăng hiệu quả kinh tế cho bác tài chuyên nghiệp chạy đường dài, liên tỉnh, dịch vụ cao cấp và gia đình đông người tại <strong>Cần Thơ</strong> và <strong>Miền Tây</strong>.</p>`,
  highlights: [
    "Ô tô điện 7 chỗ — không gian rộng cho gia đình đông người và dịch vụ cao cấp",
    "Quãng đường 450 km (NEDC) — lý tưởng chạy liên tỉnh từ Cần Thơ đi các tỉnh Miền Tây",
    "Tối ưu cho bác tài chuyên nghiệp: đường dài, cước cao, dòng tiền tốt hơn",
    "Giá kèm pin — không áp dụng chính sách thuê pin",
    "Sạc nhanh DC 80 kW — 10% đến 70% chỉ 30 phút",
  ],
  specGroups: [
    {
      id: "kich-thuoc",
      heading: "Kích thước & khung gầm",
      headingLevel: 3,
      specs: [
        {
          label: "Kích thước tổng thể (Dài x Rộng x Cao)",
          value: "4.740 x 1.872 x 1.729 mm",
        },
        { label: "Chiều dài cơ sở", value: "2.840 mm" },
        { label: "Khoảng sáng gầm xe", value: "180 mm" },
        { label: "Sức chứa", value: "7 chỗ" },
        { label: "Kích thước la-zăng", value: "18 inch" },
      ],
    },
    {
      id: "dong-co",
      heading: "Động cơ & vận hành",
      headingLevel: 3,
      specs: [
        { label: "Công suất tối đa", value: "150 kW" },
        { label: "Mô-men xoắn cực đại", value: "280 Nm" },
        { label: "Hệ thống dẫn động", value: "FWD (Cầu trước)" },
        { label: "Chế độ lái", value: "Eco / Normal" },
        {
          label: "Hệ thống treo (trước / sau)",
          value: "MacPherson / Đa liên kết",
        },
        {
          label: "Hệ thống phanh (trước / sau)",
          value: "Đĩa thông gió / Đĩa",
        },
      ],
    },
    {
      id: "pin-sac",
      heading: "Hệ thống pin & sạc",
      headingLevel: 3,
      specs: [
        { label: "Dung lượng pin khả dụng", value: "60,13 kWh" },
        {
          label: "Quãng đường tối đa (NEDC)",
          value: "450 km / lần sạc đầy",
        },
        {
          label: "Thời gian sạc nhanh nhất (10% – 70%)",
          value: "30 phút",
        },
        { label: "Công suất sạc nhanh DC tối đa", value: "80 kW" },
      ],
    },
  ],
  batteryHighlight:
    "450 km theo chuẩn NEDC — đủ tầm để chạy liên tỉnh từ Cần Thơ đến An Giang, Kiên Giang, Cà Mau hoặc TP.HCM mà không lo hết pin giữa đường.",
  exteriorColors: [
    { id: "jet-black", name: "Jet Black", nameVi: "Đen", hex: "#1a1a1a" },
    {
      id: "desat-silver",
      name: "Desat Silver",
      nameVi: "Bạc / Xám bạc",
      hex: "#a8a9ad",
    },
    { id: "solar-ruby", name: "Solar Ruby", nameVi: "Đỏ", hex: "#8b1a2b" },
    {
      id: "infinity-blanc",
      name: "Infinity Blanc",
      nameVi: "Trắng",
      hex: "#f5f5f0",
    },
  ],
  features: [
    "Tăng sức chứa, tăng không gian kết nối — phù hợp nhóm bạn, gia đình đông người",
    "Đèn chiếu sáng phía trước LED",
    "Hệ thống điều hòa tự động 1 vùng",
    "Màn hình giải trí cảm ứng 10,1 inch",
    "Hệ thống 4 loa",
    "Ghế lái chỉnh cơ 6 hướng",
    "Ống / gáp cửa sổ chỉnh cơ",
  ],
};
