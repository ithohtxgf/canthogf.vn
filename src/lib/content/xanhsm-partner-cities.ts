import type { XanhSmFaqItem } from "@/lib/content/xanhsm-page";

export const XANHSM_PARTNER_HUB_PATH = "/dang-ky-xanhsm-partner";

export type PartnerCity = {
  slug: string;
  /** Tên đầy đủ, dùng trong văn bản */
  name: string;
  /** Tên ngắn, dùng trong H1/title */
  displayName: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  localNote: string;
  faq: XanhSmFaqItem[];
};

export const XANHSM_PARTNER_CITIES: PartnerCity[] = [
  {
    slug: "phu-quoc",
    name: "Phú Quốc",
    displayName: "Phú Quốc",
    region: "Đồng bằng sông Cửu Long",
    metaTitle:
      "Đăng Ký Xanh SM Partner Phú Quốc 2026 – Hướng Dẫn Chủ Xe",
    metaDescription:
      "Chủ xe VinFast tại Phú Quốc muốn đăng ký Xanh SM Partner? Cần Thơ EV hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí toàn quốc.",
    keywords: [
      "đăng ký xanh sm partner phú quốc",
      "xanh sm partner phú quốc",
      "đăng ký đối tác xanh sm phú quốc",
      "chủ xe vinfast chạy xanh sm phú quốc",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Phú Quốc – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Phú Quốc là đảo du lịch với lượng khách quốc tế và nội địa lớn quanh năm, nhu cầu di chuyển bằng xe điện ngày càng tăng nhờ hình ảnh xanh, sạch phù hợp định hướng du lịch bền vững của đảo. Nếu bạn có xe điện VinFast tại Phú Quốc, Cần Thơ EV hỗ trợ hướng dẫn đăng ký Xanh SM Partner từ xa qua Zalo/hotline.",
    localNote:
      "Vì là địa bàn đảo, một số giấy tờ (như lý lịch tư pháp, xác nhận cư trú) có thể mất thời gian xử lý lâu hơn đất liền, nên chuẩn bị hồ sơ sớm để không ảnh hưởng tiến độ kích hoạt app.",
    faq: [
      {
        question: "Ở đảo Phú Quốc có đăng ký Xanh SM Partner từ xa được không?",
        answer:
          "Được. Bạn chỉ cần gửi hồ sơ scan/chụp ảnh qua Zalo, Cần Thơ EV hướng dẫn và theo dõi tiến độ hộ bạn, không cần di chuyển vào đất liền.",
      },
      {
        question: "Xe VinFast chạy Xanh SM Partner ở Phú Quốc có phù hợp chở khách du lịch không?",
        answer:
          "Rất phù hợp. Nhiều đối tác tại Phú Quốc chọn chạy khung giờ cao điểm đón/trả sân bay và khu du lịch.",
      },
      {
        question: "Chi phí vận chuyển xe ra đảo Phú Quốc để đăng ký Partner có tốn kém không?",
        answer:
          "Nếu xe đã có sẵn tại Phú Quốc thì không phát sinh chi phí này. Trường hợp mua xe từ đất liền, bạn cần tính thêm phí vận chuyển qua phà hoặc cảng, Cần Thơ EV có thể tư vấn phương án ít tốn kém.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Phú Quốc có ổn định quanh năm không?",
        answer:
          "Phú Quốc có lượng khách du lịch quanh năm nên nhu cầu tương đối ổn định, cao điểm nhất vào mùa khô (tháng 11–4) và các kỳ nghỉ lễ. Tài xế có thể đạt 15–22 triệu đồng/tháng tùy khung giờ chạy.",
      },
      {
        question: "Xe điện VinFast có gặp khó khăn gì khi chạy trên đảo Phú Quốc không?",
        answer:
          "Không. Hạ tầng trạm sạc VinFast tại Phú Quốc đã phủ các khu vực trung tâm và điểm du lịch chính, đủ đáp ứng nhu cầu sạc hàng ngày của tài xế Partner.",
      },
    ],
  },
  {
    slug: "tien-giang",
    name: "Tiền Giang",
    displayName: "Tiền Giang",
    region: "Đồng bằng sông Cửu Long",
    metaTitle:
      "Đăng Ký Xanh SM Partner Tiền Giang 2026 – Hướng Dẫn Chủ Xe",
    metaDescription:
      "Chủ xe VinFast tại Tiền Giang muốn đăng ký Xanh SM Partner, Grab? Cần Thơ EV hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí.",
    keywords: [
      "đăng ký xanh sm partner tiền giang",
      "xanh sm partner tiền giang",
      "đăng ký đối tác xanh sm tiền giang",
      "chủ xe vinfast chạy xanh sm tiền giang",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Tiền Giang – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Tiền Giang nằm trên trục Quốc lộ 1A nối TPHCM với các tỉnh miền Tây, lượng khách di chuyển và du lịch miệt vườn quanh năm khá ổn định. Nếu bạn có xe điện VinFast tại Tiền Giang và muốn đăng ký Xanh SM Partner, Cần Thơ EV, đơn vị hoạt động tại khu vực Đồng bằng sông Cửu Long, sẽ hướng dẫn bạn hoàn tất thủ tục từ xa.",
    localNote:
      "Khu vực TP Mỹ Tho và các trục quốc lộ chính thường có nhu cầu đặt xe ổn định hơn các xã vùng sâu, nên khai đúng khu vực hoạt động khi đăng ký.",
    faq: [
      {
        question: "Cần Thơ EV có hỗ trợ trực tiếp tại Tiền Giang không?",
        answer:
          "Cần Thơ EV hỗ trợ tư vấn và xử lý hồ sơ từ xa qua Zalo/hotline cho tài xế tại Tiền Giang, không yêu cầu bạn phải đến văn phòng tại Cần Thơ.",
      },
      {
        question: "Tôi cần chuẩn bị gì trước khi liên hệ đăng ký?",
        answer:
          "Chuẩn bị CCCD, cavet xe, giấy phép lái xe (2 mặt) và số điện thoại/email chưa từng đăng ký app để quá trình xử lý nhanh hơn.",
      },
      {
        question: "Xanh SM đã phủ sóng đầy đủ khu vực Tiền Giang chưa?",
        answer:
          "Xanh SM đang tiếp tục mở rộng vùng phủ sóng. Liên hệ Cần Thơ EV để được cập nhật tình trạng phủ sóng mới nhất tại khu vực bạn dự định chạy trước khi nộp hồ sơ.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Tiền Giang khoảng bao nhiêu mỗi tháng?",
        answer:
          "Khu vực TP Mỹ Tho và trục Quốc lộ 1A có nhu cầu đặt xe ổn định, tài xế Partner có thể đạt 10–16 triệu đồng/tháng tùy khung giờ hoạt động.",
      },
      {
        question: "Xe VinFast tại Tiền Giang có cần chạy thử trước khi được duyệt Partner không?",
        answer:
          "Không bắt buộc chạy thử. Sau khi hồ sơ được duyệt và tài khoản kích hoạt, xe có thể nhận chuyến ngay theo khu vực đã đăng ký.",
      },
    ],
  },
];

export function getPartnerCityBySlug(slug: string): PartnerCity | undefined {
  return XANHSM_PARTNER_CITIES.find((city) => city.slug === slug);
}
