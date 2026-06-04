export type ProductSeo = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
};

export const PRODUCTS_SEO: ProductSeo[] = [
  {
    id: "herio-green",
    name: "Herio Green",
    description:
      "Định nghĩa lại trải nghiệm xe dịch vụ thời đại xanh. Herio Green — thiết kế hiện đại, quãng đường 326 km, giá từ 479 triệu tại Cần Thơ GF.",
    image: "https://picsum.photos/seed/heriogreendetail/1200/630",
    price: "Từ 479.000.000 VNĐ",
  },
  {
    id: "vf5",
    name: "VF5",
    description:
      "VinFast VF5 — xe điện trẻ trung, nội thất rộng rãi, quãng đường 326 km/lần sạc. Mua xe tại đại lý Cần Thơ GF.",
    image: "https://picsum.photos/seed/vf5detail/1200/630",
    price: "529.000.000 VNĐ",
  },
  {
    id: "limo-green",
    name: "Limo Green",
    description:
      "Limo Green — xe điện 7 chỗ, quãng đường 450 km, phù hợp chạy dịch vụ đường dài. Tư vấn tại Hợp tác xã Cần Thơ GF.",
    image: "https://picsum.photos/seed/limodetail/1200/630",
    price: "749.000.000 VNĐ",
  },
  {
    id: "ec-van",
    name: "EC Van",
    description:
      "EC Van — xe điện vận tải đa năng, tiết kiệm chi phí vận hành, dung tích 2,6 m³. Giá từ 285 triệu tại Cần Thơ GF.",
    image: "https://picsum.photos/seed/ecvandetail/1200/630",
    price: "285.000.000 VNĐ",
  },
];

export const PRODUCTS_BY_ID = Object.fromEntries(
  PRODUCTS_SEO.map((p) => [p.id, p]),
) as Record<string, ProductSeo>;

export function getProductById(id: string): ProductSeo | undefined {
  return PRODUCTS_BY_ID[id];
}
