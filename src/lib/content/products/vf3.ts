import type { RichProductDetail } from "@/lib/content/product-details";

export const VF3_DETAIL: RichProductDetail = {
  id: "vf3",
  officialName: "VinFast VF 3",
  segment: "Mini car điện hàng đầu thị trường Việt Nam",
  shortName: "VF 3",
  slogan: "Xe nhỏ, giá trị lớn",
  h1: "VinFast VF 3 Cần Thơ: Mini Car Điện — Giá Ưu Đãi & Thông Số 2026",
  metaTitle:
    "VinFast VF 3 Cần Thơ: Giá Eco & Plus, 7 Màu, Thông Số Kỹ Thuật",
  metaDescription:
    "VinFast VF 3 — mini car điện giá từ 268,78 triệu (Eco), 280,35 triệu (Plus). Quãng đường 215 km, sạc nhanh 36 phút, 7 màu ngoại thất. Đặt cọc 15 triệu tại Cần Thơ GF.",
  keywords: [
    "vinfast vf3",
    "vf3 cần thơ",
    "vf3 giá",
    "vf3 eco",
    "vf3 plus",
    "mua vf3 cần thơ",
    "xe điện mini vinfast",
    "vf3 đánh giá",
    "vf3 có tốt không",
    "vf3 eco vs plus",
    "vf3 pin thuê hay mua",
  ],
  image: "/vf3.jpg",
  imageAlt: "VinFast VF 3 — mini car điện tại Cần Thơ GF",
  listPrice: 302_000_000,
  listPriceLabel: "302.000.000 VNĐ (VF 3 Eco — giá gốc)",
  promoPrice: 268_780_000,
  promoPriceLabel: "268.780.000 VNĐ",
  promoVoucherLabel: "Ưu đãi VF 3 Eco",
  depositAmount: 15_000_000,
  positioningHtml: `<p><strong>VinFast VF 3</strong> là <em>mini car điện</em> tiên tiến kết hợp công nghệ và thiết kế sáng tạo — phù hợp di chuyển đô thị <strong>Cần Thơ</strong>, phố hẹp <strong>Ninh Kiều</strong>, <strong>Cái Răng</strong> với chi phí vận hành siêu rẻ.</p>`,
  highlights: [
    "Xe điện giá rẻ, phù hợp ngân sách đô thị",
    "Thiết kế nhỏ gọn, linh hoạt trong thành phố",
    "Chi phí vận hành siêu rẻ so với xe xăng",
    "Tính năng an toàn tiên tiến",
    "Hiệu suất vận hành linh hoạt — dẫn động RWD cầu sau",
  ],
  priceVariants: [
    {
      id: "vf3-eco",
      name: "VF 3 Eco",
      listPrice: 302_000_000,
      promoPrice: 268_780_000,
    },
    {
      id: "vf3-plus",
      name: "VF 3 Plus",
      listPrice: 315_000_000,
      promoPrice: 280_350_000,
    },
  ],
  specGroups: [
    {
      id: "dong-co",
      heading: "Động cơ & vận hành",
      headingLevel: 3,
      specs: [
        { label: "Động cơ", value: "1 Motor" },
        { label: "Công suất tối đa", value: "30 kW" },
        { label: "Mô-men xoắn cực đại", value: "110 Nm" },
        { label: "Hệ thống dẫn động", value: "RWD (Cầu sau)" },
        { label: "Sức chứa", value: "4 chỗ ngồi" },
        { label: "Kích thước la-zăng", value: "16 inch" },
      ],
    },
    {
      id: "pin-sac",
      heading: "Pin & sạc",
      headingLevel: 3,
      specs: [
        {
          label: "Quãng đường một lần sạc",
          value: "215 km",
        },
        {
          label: "Thời gian sạc nhanh (10% – 70%)",
          value: "36 phút",
        },
      ],
    },
  ],
  batteryHighlight:
    "215 km mỗi lần sạc — đủ cho di chuyển nội thành Cần Thơ cả ngày. Hệ thống trạm sạc VinFast phủ 34 tỉnh thành, khoảng cách trung bình chỉ 3,5 km giữa hai trạm trong thành phố.",
  batterySectionTitle: "Pin & Hạ Tầng Sạc Điện",
  exteriorColors: [
    {
      id: "summer-yellow",
      name: "Summer Yellow",
      nameVi: "Vàng hè",
      hex: "#F5D547",
    },
    { id: "rose-pink", name: "Rose Pink", nameVi: "Hồng hoa hồng", hex: "#E8A0B8" },
    {
      id: "zenith-grey",
      name: "Zenith Grey",
      nameVi: "Xám thiên zenith",
      hex: "#6B7280",
    },
    {
      id: "solar-ruby",
      name: "Solar Ruby",
      nameVi: "Đỏ ruby năng lượng mặt trời",
      hex: "#8B1A2B",
    },
    { id: "sky-blue", name: "Sky Blue", nameVi: "Xanh trời", hex: "#5B9BD5" },
    {
      id: "urban-mint",
      name: "Urban Mint",
      nameVi: "Bạc hà thành thị",
      hex: "#98D4BB",
    },
    {
      id: "infinity-blanc",
      name: "Infinity Blanc",
      nameVi: "Trắng vô cực",
      hex: "#F5F5F0",
    },
  ],
  exteriorFeatureList: [
    "La-zăng kích thước 16 inch — hiếm gặp trong phân khúc mini car",
    "Thiết kế tối giản, nhỏ gọn, cá tính, năng động",
    "Ốp la-zăng có thể tùy chọn thêm",
  ],
  interiorFeatureList: [
    "Không gian 4 chỗ ngồi thoải mái",
    "Thiết kế nội thất thông minh, tối ưu hóa",
    "Màu sắc nội thất trang nhã, trẻ trung",
    "Chất liệu thân thiện và đặc biệt",
  ],
  chargingInfrastructure: [
    { label: "Trạm sạc", value: "Trải dài 34 tỉnh và thành phố" },
    { label: "Tuyến quốc lộ", value: "106 tuyến có trạm sạc" },
    { label: "Thành phố", value: "80/85 thành phố đã lắp trạm sạc" },
    {
      label: "Khoảng cách trong thành phố",
      value: "Chỉ 3,5 km giữa 2 trạm sạc",
    },
  ],
  features: [
    "Mini car điện — phù hợp ngân sách gia đình trẻ tại Cần Thơ",
    "La-zăng 16 inch trong phân khúc",
    "Dẫn động RWD cầu sau — linh hoạt trong phố",
    "7 tùy chọn màu ngoại thất cá tính",
    "Chi phí sạc thấp — tiết kiệm so với xe xăng",
  ],
};
