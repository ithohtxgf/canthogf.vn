export type VinfastVehicleCategory = "passenger" | "commercial";

export type VinfastVehicle = {
  id: string;
  name: string;
  listPrice: number;
  image: string;
  description: string;
  category: VinfastVehicleCategory;
  seoSlug?: string;
  /** Đánh giá địa phương — dùng cho H3 trong section so sánh */
  localReview: {
    district: string;
    useCase: string;
    rating: number;
    verdict: string;
  };
};

/** Giá niêm yết đã bao gồm pin — cập nhật theo chính sách VinFast mới nhất */
export const VINFAST_VEHICLES: VinfastVehicle[] = [
  {
    id: "vf3",
    name: "VF 3",
    listPrice: 302_000_000,
    image: "/vf3.jpg",
    description:
      "VinFast VF 3 — mini car điện \"Xe nhỏ, giá trị lớn\". VF 3 Eco từ 268,78 triệu, quãng đường 215 km — lý tưởng phố Ninh Kiều, Cần Thơ.",
    category: "passenger",
    seoSlug: "vf3",
    localReview: {
      district: "Ninh Kiều",
      useCase: "Chạy phố hẹp, đỗ xe dễ",
      rating: 4.8,
      verdict:
        "Mini car điện giá tốt nhất — lý tưởng luồn phố đông đúc Ninh Kiều, chi phí sạc thấp, la-zăng 16 inch hiếm có trong phân khúc.",
    },
  },
  {
    id: "vf5-plus",
    name: "VF 5 Plus",
    listPrice: 529_000_000,
    image: "/vf5.webp",
    description:
      "SUV điện cỡ B bán chạy nhất Cần Thơ — phù hợp gia đình trẻ, chạy dịch vụ XanhSM và kinh doanh vận tải nội thành.",
    category: "passenger",
    seoSlug: "vf5",
    localReview: {
      district: "Cái Răng",
      useCase: "XanhSM, taxi công nghệ",
      rating: 4.9,
      verdict:
        "Lựa chọn số 1 của tài xế XanhSM khu Cái Răng — quãng đường 326 km, chi phí vận hành thấp, thu hồi vốn nhanh.",
    },
  },
  {
    id: "vf6",
    name: "VF 6",
    listPrice: 689_000_000,
    image: "/vf6.webp",
    description:
      "VinFast VF 6 — SUV điện hạng C thiết kế Torino Design. Eco 485 km, Plus 201 hp + ADAS. Lý tưởng gia đình trẻ tại Bình Thủy, Cần Thơ.",
    category: "passenger",
    seoSlug: "vf6",
    localReview: {
      district: "Bình Thủy",
      useCase: "Gia đình, đi làm xa",
      rating: 4.7,
      verdict:
        "SUV điện hạng C cân bằng giá-trang bị — VF 6 Plus với ADAS và 7 túi khí là lựa chọn an toàn cho gia đình Cần Thơ.",
    },
  },
  {
    id: "vf7",
    name: "VF 7",
    listPrice: 799_000_000,
    image: "/vf7.webp",
    description:
      "SUV điện cỡ C sang trọng, quãng đường dài — phù hợp doanh nhân và gia đình tại Bình Thủy, Ô Môn, Phong Điền.",
    category: "passenger",
    seoSlug: "vf7",
    localReview: {
      district: "Ô Môn",
      useCase: "Đi liên huyện, doanh nhân",
      rating: 4.6,
      verdict:
        "SUV cỡ C với ADAS — hợp lý cho khách hàng Ô Môn, Phong Điền thường xuyên di chuyển Cần Thơ ↔ huyện ngoại.",
    },
  },
  {
    id: "vf8",
    name: "VF 8",
    listPrice: 1_079_000_000,
    image: "/vf8.webp",
    description:
      "SUV điện cao cấp, công nghệ ADAS tiên tiến — đẳng cấp cho khách hàng VinFast tại Cần Thơ và khu vực lân cận.",
    category: "passenger",
    seoSlug: "vf8",
    localReview: {
      district: "Ninh Kiều",
      useCase: "Doanh nhân, SUV cao cấp",
      rating: 4.8,
      verdict:
        "Đẳng cấp và công nghệ hàng đầu — khách hàng doanh nghiệp tại trung tâm Ninh Kiều ưa chuộng nhờ trang bị ADAS và không gian sang.",
    },
  },
  {
    id: "vf9",
    name: "VF 9",
    listPrice: 1_499_000_000,
    image: "/vf9.webp",
    description:
      "SUV điện 7 chỗ flagship VinFast — không gian sang trọng cho gia đình đông người và doanh nghiệp tại Miền Tây.",
    category: "passenger",
    seoSlug: "vf9",
    localReview: {
      district: "Cái Răng",
      useCase: "Gia đình đông người, VIP",
      rating: 4.7,
      verdict:
        "7 chỗ rộng rãi — phù hợp gia đình đa thế hệ hoặc doanh nghiệp đưa đón đối tác tại khu Cái Răng và ven sông Hậu.",
    },
  },
  {
    id: "limo-green",
    name: "VinFast Limo Green",
    listPrice: 749_000_000,
    image: "/Limo-Green.png",
    description:
      "VinFast Limo Green — xe thương mại dịch vụ xanh, ô tô điện 7 chỗ. Quãng đường 450 km NEDC, tối ưu chạy liên tỉnh Miền Tây và dịch vụ cao cấp tại Cần Thơ.",
    category: "commercial",
    seoSlug: "limo-green",
    localReview: {
      district: "Toàn TP. Cần Thơ",
      useCase: "Vận tải liên tỉnh, dịch vụ cao cấp, gia đình 7 chỗ",
      rating: 4.9,
      verdict:
        "Quãng đường 450 km — lý tưởng tuyến Cần Thơ ↔ TP.HCM, An Giang. Giá kèm pin 749 triệu, ưu đãi từ 666,61 triệu qua CanThoGF.",
    },
  },
  {
    id: "herio-green",
    name: "Herio Green",
    listPrice: 479_000_000,
    image: "/herio-green.png",
    description:
      "Xe dịch vụ xanh quãng đường 326 km — giải pháp kinh doanh vận tải hiệu quả cho HTX và đối tác XanhSM Cần Thơ.",
    category: "commercial",
    seoSlug: "herio-green",
    localReview: {
      district: "Cái Răng & Ninh Kiều",
      useCase: "XanhSM, HTX vận tải",
      rating: 4.8,
      verdict:
        "Giá vào thấp hơn VF5 Plus — lựa chọn thông minh cho HTX và tài xế mới gia nhập XanhSM tại Cần Thơ.",
    },
  },
  {
    id: "ec-van",
    name: "EC Van",
    listPrice: 285_000_000,
    image: "/ecvan.webp",
    description:
      "Xe điện vận tải 2,6 m³ — tiết kiệm chi phí logistics cho doanh nghiệp giao hàng nội đô Cần Thơ và Miền Tây.",
    category: "commercial",
    seoSlug: "ec-van",
    localReview: {
      district: "Bình Thủy & Ô Môn",
      useCase: "Giao hàng, logistics",
      rating: 4.7,
      verdict:
        "Thùng 2,6 m³ vừa phố vừa khu công nghiệp — doanh nghiệp logistics Bình Thủy, Ô Môn tiết kiệm 40–60% chi phí nhiên liệu.",
    },
  },
];

export const VINFAST_PROCEDURE_FEES = {
  licensePlate: {
    id: "license-plate",
    label: "Phí biển số Cần Thơ",
    amount: 1_000_000,
  },
  roadFee: {
    id: "road-fee",
    label: "Phí đường bộ (1 năm)",
    amount: 1_560_000,
  },
  insurance: {
    id: "insurance",
    label: "Bảo hiểm TNDS (bắt buộc)",
    amount: 480_000,
  },
  registration: {
    id: "registration",
    label: "Lệ phí trước bạ (ước tính 10%)",
    amount: 0,
    dynamicPercent: 0.1,
    note: "Xe điện VinFast thường được miễn 100% — tích để ước tính nếu không áp dụng ưu đãi",
  },
} as const;

export type VinfastVoucher = {
  id: string;
  label: string;
  amount: number;
  description: string;
};

/** Voucher / ưu đãi có thể trừ trong bảng tính giá lăn bánh */
export const VINFAST_VOUCHERS: VinfastVoucher[] = [
  {
    id: "voucher-truoc-ba",
    label: "Miễn 100% lệ phí trước bạ (xe điện)",
    amount: 0,
    description:
      "Áp dụng chính sách miễn lệ phí trước bạ cho ô tô điện — giá trị tương đương 10% giá xe",
  },
  {
    id: "voucher-can-tho-gf",
    label: "Voucher ưu đãi CanThoGF",
    amount: 5_000_000,
    description: "Giảm trực tiếp khi đặt cọc qua Cần Thơ GF trong tháng",
  },
  {
    id: "voucher-phu-kien",
    label: "Tặng gói phụ kiện cơ bản",
    amount: 2_000_000,
    description: "Thảm sàn, phim cách nhiệt, camera hành trình",
  },
];

export const VINFAST_CAN_THO_HUB_PATH = "/vinfast-can-tho";

export const VINFAST_CAN_THO_META_TITLE =
  "VinFast Cần Thơ | Cần Thơ GF — Đại Lý Chính Hãng & XanhSM";

export const VINFAST_CAN_THO_PAGE_H1 =
  "VinFast Cần Thơ — Đại Lý Chính Hãng tại Cần Thơ GF";

export const VINFAST_CAN_THO_CALCULATOR_H2 =
  "Bảng Giá Lăn Bánh Chi Tiết Tháng 6/2026";

/** @deprecated Dùng VINFAST_CAN_THO_META_TITLE hoặc VINFAST_CAN_THO_PAGE_H1 */
export const VINFAST_CAN_THO_PAGE_TITLE = VINFAST_CAN_THO_META_TITLE;

export const VINFAST_CAN_THO_PAGE_DESCRIPTION =
  "Bảng tính giá lăn bánh VinFast tại Cần Thơ minh bạch: giá xe kèm pin, phí biển số, phí đường bộ, BHTNDS, voucher ưu đãi. Đánh giá VF3, VF5, VF6 phù hợp đường phố Cần Thơ — CanThoGF.";

/** Bài viết vệ tinh (Spoke) liên kết về Hub */
export const VINFAST_SPOKE_ARTICLES = [
  {
    id: "chi-phi-sac-xe-dien-vinfast-can-tho-1-thang",
    title: "Chi phí sạc xe điện VinFast tại Cần Thơ hết bao nhiêu tiền 1 tháng?",
  },
  {
    id: "ban-do-tram-sac-vinfast-ninh-kieu-cai-rang",
    title: "Bản đồ các trạm sạc VinFast tại quận Ninh Kiều và Cái Răng",
  },
  {
    id: "thu-tuc-vay-ngan-hang-mua-vf3-tra-gop-can-tho",
    title: "Thủ tục vay ngân hàng mua xe VF3 trả góp tại Cần Thơ",
  },
  {
    id: "bang-gia-lan-banh-vinfast-vf5-can-tho-2026",
    title: "Bảng giá lăn bánh VinFast VF5 tại Cần Thơ — Cập nhật 2026",
  },
  {
    id: "so-sanh-vf3-vf5-chay-pho-can-tho",
    title: "So sánh VF3 và VF5: Xe nào phù hợp chạy phố Cần Thơ?",
  },
] as const;

export const VINFAST_CAN_THO_FAQ = [
  {
    question: "Giá lăn bánh VinFast tại Cần Thơ gồm những khoản nào?",
    answer:
      "Giá lăn bánh bao gồm giá niêm yết (đã kèm pin), phí đăng ký biển số Cần Thơ, phí đường bộ, bảo hiểm TNDS bắt buộc và lệ phí trước bạ (nếu áp dụng theo chính sách), sau đó trừ các voucher ưu đãi đang có hiệu lực. CanThoGF minh bạch từng khoản trên bảng tính giá xe VinFast tại Cần Thơ ngay trên trang — bạn không cần gọi điện mới biết tổng chi phí sở hữu xe.",
  },
  {
    question: "Xe VinFast nào phù hợp chạy phố Ninh Kiều, Cần Thơ?",
    answer:
      "VinFast VF 3 là lựa chọn tối ưu nhờ kích thước nhỏ gọn, bán kính quay vòng nhỏ và dễ tìm chỗ đỗ trên các tuyến phố hẹp Ninh Kiều. VF 5 Plus cũng phù hợp nếu bạn cần không gian rộng hơn cho gia đình hoặc chạy dịch vụ XanhSM, trong khi VF 6 hướng đến khách cần SUV hạng C với ADAS khi thường xuyên di chuyển liên quận.",
  },
  {
    question: "Mua xe VinFast Cần Thơ 2026 qua CanThoGF có ưu đãi gì?",
    answer:
      "Khi mua xe VinFast Cần Thơ 2026 qua đại lý CanThoGF, khách hàng được hỗ trợ voucher giảm giá (theo chính sách từng thời điểm), tư vấn miễn giảm lệ phí trước bạ nếu đủ điều kiện, trả góp 80–85% qua ngân hàng đối tác, lái thử tận nhà và thủ tục đăng ký biển số trọn gói tại Cần Thơ — tiết kiệm thời gian so với tự làm thủ tục.",
  },
  {
    question: "Có được trả góp khi mua xe VinFast tại Cần Thơ không?",
    answer:
      "Có. CanThoGF hỗ trợ tư vấn gói vay qua các ngân hàng liên kết với tỷ lệ trả trước từ 15–20%, thời hạn vay linh hoạt. Nhân viên tư vấn sẽ giải thích rõ lãi suất, khoản trả hàng tháng và tổng giá lăn bánh trước khi bạn ký hợp đồng — đảm bảo minh bạch khi mua xe VinFast Cần Thơ 2026 theo hình thức trả góp.",
  },
  {
    question: "Làm sao để nhận báo giá chính xác từ đại lý VinFast Cần Thơ?",
    answer:
      "Bạn có thể dùng bảng tính giá lăn bánh trên trang này để ước tính nhanh, sau đó liên hệ hotline 0916 513 720 hoặc Zalo CanThoGF để nhận báo giá chi tiết theo mẫu xe, màu sơn và chính sách ưu đãi mới nhất. Đội ngũ đại lý VinFast Cần Thơ sẽ phản hồi trong vòng 15 phút và hỗ trợ đặt lịch lái thử nếu bạn cần trải nghiệm thực tế trước khi quyết định.",
  },
] as const;

export function formatVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")}đ`;
}

export function getVehicleById(id: string): VinfastVehicle | undefined {
  return VINFAST_VEHICLES.find((v) => v.id === id);
}

export function getPassengerVehicles(): VinfastVehicle[] {
  return VINFAST_VEHICLES.filter((v) => v.category === "passenger");
}

export function getCommercialVehicles(): VinfastVehicle[] {
  return VINFAST_VEHICLES.filter((v) => v.category === "commercial");
}

export type PriceLineItem = {
  id: string;
  label: string;
  amount: number;
  type: "base" | "fee" | "voucher";
};

export function calculateDetailedRollingPrice(
  listPrice: number,
  selectedFeeIds: Set<string>,
  selectedVoucherIds: Set<string>,
): {
  listPrice: number;
  lineItems: PriceLineItem[];
  feesTotal: number;
  vouchersTotal: number;
  rollingPrice: number;
} {
  const lineItems: PriceLineItem[] = [
    {
      id: "list-price",
      label: "Giá niêm yết (đã kèm pin)",
      amount: listPrice,
      type: "base",
    },
  ];

  let feesTotal = 0;
  for (const fee of Object.values(VINFAST_PROCEDURE_FEES)) {
    if (!selectedFeeIds.has(fee.id)) continue;
    const amount =
      "dynamicPercent" in fee && fee.dynamicPercent
        ? Math.round(listPrice * fee.dynamicPercent)
        : fee.amount;
    if (amount > 0) {
      lineItems.push({ id: fee.id, label: fee.label, amount, type: "fee" });
      feesTotal += amount;
    }
  }

  let vouchersTotal = 0;
  for (const voucher of VINFAST_VOUCHERS) {
    if (!selectedVoucherIds.has(voucher.id)) continue;
    let amount = voucher.amount;
    if (voucher.id === "voucher-truoc-ba") {
      amount = Math.round(listPrice * 0.1);
    }
    if (amount > 0) {
      lineItems.push({
        id: voucher.id,
        label: voucher.label,
        amount: -amount,
        type: "voucher",
      });
      vouchersTotal += amount;
    }
  }

  const rollingPrice = listPrice + feesTotal - vouchersTotal;

  return {
    listPrice,
    lineItems,
    feesTotal,
    vouchersTotal,
    rollingPrice: Math.max(rollingPrice, 0),
  };
}

/** @deprecated Dùng calculateDetailedRollingPrice */
export function calculateRollingPrice(
  listPrice: number,
  selectedFeeIds: Set<string>,
): { listPrice: number; feesTotal: number; rollingPrice: number } {
  const result = calculateDetailedRollingPrice(
    listPrice,
    selectedFeeIds,
    new Set(),
  );
  return {
    listPrice: result.listPrice,
    feesTotal: result.feesTotal,
    rollingPrice: result.rollingPrice,
  };
}
