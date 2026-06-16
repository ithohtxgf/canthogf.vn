export type ProductSeo = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
};

export const PRODUCTS_SEO: ProductSeo[] = [
  {
    id: "vf3",
    name: "VinFast VF 3",
    description:
      "VinFast VF 3 — mini car điện tại Cần Thơ: VF 3 Eco từ 268,78 triệu, VF 3 Plus từ 280,35 triệu. Quãng đường 215 km, 7 màu, đặt cọc 15 triệu. Tư vấn tại Cần Thơ GF.",
    metaTitle:
      "VinFast VF 3 Cần Thơ: Giá Eco & Plus, 7 Màu, Thông Số Kỹ Thuật",
    metaDescription:
      "VinFast VF 3 — mini car điện giá từ 268,78 triệu (Eco), 280,35 triệu (Plus). Quãng đường 215 km, sạc nhanh 36 phút, 7 màu ngoại thất. Đặt cọc 15 triệu tại Cần Thơ GF.",
    image: "/vf3.jpg",
    price: "Từ 268.780.000 VNĐ",
    keywords: [
      "vinfast vf3",
      "vf3 cần thơ",
      "vf3 giá",
      "vf3 eco",
      "vf3 plus",
      "mua vf3 cần thơ",
    ],
  },
  {
    id: "herio-green",
    name: "Herio Green",
    description:
      "Định nghĩa lại trải nghiệm xe dịch vụ thời đại xanh. Herio Green — thiết kế hiện đại, quãng đường 326 km, giá từ 479 triệu tại Cần Thơ GF.",
    image: "/herio-green.png",
    price: "Từ 479.000.000 VNĐ",
  },
  {
    id: "vf5",
    name: "VinFast VF 5",
    description:
      "VinFast VF 5 tại Cần Thơ — A-SUV điện giá 529 triệu (kèm pin). Quãng đường 326 km, 6 túi khí, ADAS, trợ lý ảo ViVi. Bán chạy nhất phân khúc. Tư vấn tại Cần Thơ GF.",
    metaTitle:
      "VinFast VF 5 Cần Thơ: Giá 529 Triệu, Thông Số, 8 Màu & ViVi AI",
    metaDescription:
      "VinFast VF 5 tại Cần Thơ — giá 529 triệu (kèm pin). Quãng đường 326 km, 6 túi khí, ADAS, trợ lý ảo ViVi. A-SUV điện lý tưởng cho đô thị. Tư vấn tại Cần Thơ GF.",
    image: "/vf5.webp",
    price: "529.000.000 VNĐ (kèm pin)",
    keywords: [
      "vinfast vf5",
      "vf5 cần thơ",
      "vf5 giá",
      "mua vf5 cần thơ",
      "a-suv điện vinfast",
      "xe điện xanhsm",
    ],
  },
  {
    id: "vf6",
    name: "VinFast VF 6",
    description:
      "VinFast VF 6 — SUV điện hạng C tại Cần Thơ: Eco từ 613,21 triệu, Plus từ 663,05 triệu. Quãng đường 485 km, ADAS, 7 túi khí. Tư vấn tại Cần Thơ GF.",
    metaTitle:
      "VinFast VF 6 Cần Thơ: Giá Eco & Plus, ADAS, Thông Số Kỹ Thuật",
    metaDescription:
      "VinFast VF 6 tại Cần Thơ — VF 6 Eco từ 613,21 triệu, VF 6 Plus từ 663,05 triệu. Quãng đường 485 km, ADAS thông minh, 7 túi khí. Đặt cọc 30 triệu tại Cần Thơ GF.",
    image: "/vf6.webp",
    price: "Từ 613.210.000 VNĐ",
    keywords: [
      "vinfast vf6",
      "vf6 cần thơ",
      "vf6 eco",
      "vf6 plus",
      "suv điện vinfast",
      "mua vf6 cần thơ",
    ],
  },
  {
    id: "vf7",
    name: "VinFast VF 7",
    description:
      "VinFast VF 7 tại Cần Thơ: Eco từ 678,54 triệu, Plus từ 764,54 triệu. C-SUV coupe thiết kế Vũ Trụ Phi Đối Xứng, ADAS 20 tính năng, bảo hành 10 năm, miễn phí sạc đến 10/02/2029.",
    metaTitle:
      "VinFast VF 7 Cần Thơ: Giá Eco & Plus, AWD 349 hp, ADAS 20 Tính Năng",
    metaDescription:
      "VinFast VF 7 Cần Thơ — giá ưu đãi Eco từ 678,54 triệu, Plus từ 764,54 triệu. Bản AWD 349 hp, mô-men xoắn 500 Nm, bảo hành 10 năm/200.000 km, miễn phí sạc đến 10/02/2029.",
    image: "/vf7.webp",
    price: "Từ 678.540.000 VNĐ",
    keywords: [
      "vinfast vf7",
      "vf7 cần thơ",
      "vf7 eco",
      "vf7 plus",
      "vf7 awd",
      "mua vf7 cần thơ",
    ],
  },
  {
    id: "mpv7",
    name: "VinFast VF MPV 7",
    description:
      "VinFast VF MPV 7 tại Cần Thơ — MPV điện 7 chỗ duy nhất của VinFast. Quãng đường 450 km NEDC, công suất 150 kW, miễn phí sạc đến 06/2027. Tư vấn tại Cần Thơ GF.",
    metaTitle:
      "VinFast VF MPV 7 Cần Thơ: MPV Điện 7 Chỗ, 450 km, Thông Số Kỹ Thuật",
    metaDescription:
      "VinFast VF MPV 7 tại Cần Thơ — MPV điện 7 chỗ duy nhất của VinFast. Quãng đường 450 km NEDC, công suất 150 kW, miễn phí sạc đến 06/2027. Tư vấn tại Cần Thơ GF.",
    image: "/mpv7.webp",
    price: "Liên hệ đại lý — giá chính thức đang cập nhật",
    keywords: [
      "vinfast vf mpv 7",
      "mpv7 cần thơ",
      "vf mpv 7",
      "mpv điện 7 chỗ vinfast",
      "xe điện 7 chỗ cần thơ",
    ],
  },
  {
    id: "vf8",
    name: "VinFast VF 8",
    description:
      "VinFast VF 8 tại Cần Thơ: Eco từ 866,15 triệu, Plus từ 1.019,15 tỷ. D-SUV điện cao cấp, Plus 402 hp và 620 Nm, 11 túi khí, ADAS nâng cao, ViVi 2.0 AI.",
    metaTitle:
      "VinFast VF 8 Cần Thơ: Giá Eco & Plus, 402 hp, 11 Túi Khí, ViVi 2.0",
    metaDescription:
      "VinFast VF 8 Cần Thơ — Eco từ 866,15 triệu, Plus từ 1.019,15 tỷ. Quãng đường 562 km (Eco), sạc nhanh 31 phút, bản Plus AWD 402 hp, 11 túi khí và công nghệ ViVi 2.0.",
    image: "/vf8.webp",
    price: "Từ 866.150.000 VNĐ",
    keywords: [
      "vinfast vf8",
      "vf8 cần thơ",
      "vf8 eco",
      "vf8 plus",
      "xe điện d-suv vinfast",
      "mua vf8 cần thơ",
    ],
  },
  {
    id: "vf8-all-new",
    name: "VinFast VF 8 All New 2026",
    description:
      "VinFast VF 8 All New 2026 tại Cần Thơ — D-SUV điện thế hệ mới theo triết lý Tech Fluid. Công suất 170 kW, pin 60,13 kWh, quãng đường 480-500 km NEDC, sạc nhanh dưới 30 phút.",
    metaTitle:
      "VinFast VF 8 All New 2026 Cần Thơ: 170 kW, 500 km, ADAS, OTA",
    metaDescription:
      "VF 8 Thế Hệ Mới 2026 tại Cần Thơ: SUV điện cỡ D thiết kế Tech Fluid, pin 60,13 kWh, quãng đường 480-500 km NEDC, ADAS nâng cao, kết nối thông minh và cập nhật OTA.",
    image: "/vf8-all-new.png",
    price: "Liên hệ đại lý — giá cập nhật 2026",
    keywords: [
      "vinfast vf8 all new",
      "vf8 thế hệ mới",
      "vf8 all new 2026",
      "vf8 all new cần thơ",
      "mua vf8 all new",
    ],
  },
  {
    id: "vf9",
    name: "VinFast VF 9",
    description:
      "VinFast VF 9 tại Cần Thơ — SUV điện 7 chỗ hạng sang. Giá Eco 1,499 tỷ, Plus 1,699 tỷ (đã VAT), pin 123 kWh, quãng đường WLTP đến 626 km, ADAS cấp độ 2, bảo hành 10 năm.",
    metaTitle:
      "VinFast VF 9 Cần Thơ: Giá Eco/Plus, SUV Điện 7 Chỗ Hạng Sang",
    metaDescription:
      "VinFast VF 9 Cần Thơ — Eco 1.499.000.000 đ, Plus 1.699.000.000 đ, đặt cọc 50.000.000 đ. SUV điện 7 chỗ hạng sang với pin 123 kWh, ADAS cấp độ 2 và bảo hành 10 năm/200.000 km.",
    image: "/vf9.webp",
    price: "Từ 1.499.000.000 VNĐ",
    keywords: [
      "vinfast vf9",
      "vf9 cần thơ",
      "vf9 eco",
      "vf9 plus",
      "suv điện 7 chỗ vinfast",
      "mua vf9 cần thơ",
    ],
  },
  {
    id: "limo-green",
    name: "VinFast Limo Green",
    description:
      "VinFast Limo Green — xe thương mại dịch vụ xanh, ô tô điện 7 chỗ, giá kèm pin 749 triệu, ưu đãi từ 666,61 triệu. Quãng đường 450 km NEDC. Tư vấn tại Cần Thơ GF.",
    metaTitle:
      "VinFast Limo Green Cần Thơ: Giá Kèm Pin, Thông Số & Màu Sắc 2026",
    metaDescription:
      "VinFast Limo Green — xe điện 7 chỗ dịch vụ xanh, giá kèm pin từ 749 triệu, ưu đãi từ 666,61 triệu. Quãng đường 450 km NEDC, sạc nhanh 30 phút. Tư vấn tại Cần Thơ GF.",
    image: "/Limo-Green.png",
    price: "749.000.000 VNĐ (kèm pin)",
    keywords: [
      "vinfast limo green",
      "limo green cần thơ",
      "xe điện 7 chỗ vinfast",
      "limo green giá",
      "mua limo green cần thơ",
    ],
  },
  {
    id: "ec-van",
    name: "EC Van",
    description:
      "EC Van — xe điện vận tải đa năng, tiết kiệm chi phí vận hành, dung tích 2,6 m³. Giá từ 285 triệu tại Cần Thơ GF.",
    image: "/ecvan.webp",
    price: "285.000.000 VNĐ",
  },
];

export const PRODUCTS_BY_ID = Object.fromEntries(
  PRODUCTS_SEO.map((p) => [p.id, p]),
) as Record<string, ProductSeo>;

export function getProductById(id: string): ProductSeo | undefined {
  return PRODUCTS_BY_ID[id];
}
