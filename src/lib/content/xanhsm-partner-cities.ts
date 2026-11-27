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
    region: "An Giang",
    metaTitle:
      "Đăng ký Xanh SM Partner Phú Quốc (An Giang) cho chủ xe VinFast",
    metaDescription:
      "Chủ xe ô tô VinFast ở đặc khu Phú Quốc, An Giang đăng ký Xanh SM Partner (Green SM) qua Cần Thơ EV: gửi hồ sơ qua Zalo, phí mở app miễn phí, xe biển trắng được hỗ trợ đổi biển vàng.",
    keywords: [
      "đăng ký xanh sm partner phú quốc",
      "xanh sm partner phú quốc",
      "đăng ký đối tác xanh sm phú quốc",
      "chủ xe vinfast chạy xanh sm phú quốc",
    ],
    h1:
      "Đăng ký Xanh SM Partner tại Phú Quốc cho chủ xe VinFast",
    intro:
      "Từ 01/7/2025, Phú Quốc là đặc khu thuộc tỉnh An Giang (trước đó thuộc Kiên Giang). Chủ xe ô tô VinFast ở Phú Quốc đăng ký Xanh SM Partner (nay là Green SM Partner) qua Cần Thơ EV mà không cần vào đất liền: hồ sơ gửi qua Zalo, phí mở app miễn phí.",
    localNote:
      "Xe chạy app phải mang biển vàng. Xe đang biển trắng thì hợp tác xã hỗ trợ làm thủ tục đổi sang biển vàng; hỏi trước khi nộp hồ sơ để biết giấy tờ cần mang theo.",
    faq: [
      {
        question: "Ở Phú Quốc có đăng ký Xanh SM Partner từ xa được không?",
        answer:
          "Được. Anh chị chụp hồ sơ gửi qua Zalo; Cần Thơ EV kiểm giấy tờ, nộp hồ sơ và báo tiến độ duyệt app.",
      },
      {
        question: "Phú Quốc nay thuộc tỉnh nào, khai hồ sơ ghi thế nào?",
        answer:
          "Từ 01/7/2025 Phú Quốc là đặc khu thuộc tỉnh An Giang. Giấy tờ cũ còn ghi Kiên Giang vẫn dùng được; khi khai khu vực chạy xe thì ghi đặc khu Phú Quốc, tỉnh An Giang.",
      },
      {
        question: "Đăng ký mở app có mất phí không?",
        answer:
          "Không. Phí đăng ký app Green SM Partner và Grab qua hợp tác xã là miễn phí.",
      },
      {
        question: "Xe biển trắng có chạy Partner được không?",
        answer:
          "Xe phải biển vàng. Xe biển trắng thì hợp tác xã hỗ trợ đổi sang biển vàng trước khi kích hoạt app.",
      },
      {
        question: "Mua xe ở đất liền rồi đưa ra đảo thì có tốn thêm không?",
        answer:
          "Có thêm phí đưa xe qua phà hoặc tàu. Xe đã có sẵn ở Phú Quốc thì không phát sinh khoản này.",
      },
    ],
  },
  {
    slug: "tien-giang",
    name: "Tiền Giang",
    displayName: "Tiền Giang",
    region: "Đồng Tháp",
    metaTitle:
      "Đăng ký Xanh SM Partner Tiền Giang cũ (Đồng Tháp) cho chủ xe VinFast",
    metaDescription:
      "Chủ xe ô tô VinFast ở Mỹ Tho, Gò Công, Cai Lậy (Tiền Giang cũ, nay thuộc Đồng Tháp) đăng ký Xanh SM Partner (Green SM), Grab qua Cần Thơ EV: hồ sơ qua Zalo, mở app miễn phí.",
    keywords: [
      "đăng ký xanh sm partner tiền giang",
      "xanh sm partner tiền giang",
      "đăng ký đối tác xanh sm tiền giang",
      "chủ xe vinfast chạy xanh sm tiền giang",
    ],
    h1:
      "Đăng ký Xanh SM Partner tại Tiền Giang cũ (nay thuộc Đồng Tháp)",
    intro:
      "Từ 01/7/2025, Tiền Giang sáp nhập vào tỉnh Đồng Tháp. Chủ xe ô tô VinFast ở Mỹ Tho, Gò Công, Cai Lậy và các xã của Tiền Giang cũ đăng ký Xanh SM Partner (nay là Green SM Partner) hoặc Grab qua Cần Thơ EV. Hồ sơ gửi qua Zalo, không phải lên văn phòng ở Cần Thơ, và phí mở app là miễn phí.",
    localNote:
      "Xe chạy app phải mang biển vàng. Xe đang biển trắng thì hợp tác xã hỗ trợ đổi sang biển vàng. Khi khai khu vực chạy xe, ghi theo tên mới (tỉnh Đồng Tháp) cho khớp địa chỉ trên app.",
    faq: [
      {
        question: "Cần Thơ EV có hỗ trợ tài xế ở Tiền Giang cũ không?",
        answer:
          "Có. Cần Thơ EV nhận hồ sơ qua Zalo hoặc hotline, anh chị không phải lên văn phòng ở Cần Thơ.",
      },
      {
        question: "Tiền Giang nay thuộc tỉnh nào, khai hồ sơ ghi thế nào?",
        answer:
          "Từ 01/7/2025 Tiền Giang thuộc tỉnh Đồng Tháp. Giấy tờ cũ còn ghi Tiền Giang vẫn dùng được; khu vực chạy xe thì ghi tỉnh Đồng Tháp.",
      },
      {
        question: "Cần chuẩn bị gì trước khi liên hệ?",
        answer:
          "CCCD, cà vẹt xe, giấy phép lái xe (chụp 2 mặt), cùng số điện thoại và email chưa từng đăng ký app Xanh SM hay Grab.",
      },
      {
        question: "Xe biển trắng có chạy được không?",
        answer:
          "Xe phải biển vàng. Xe biển trắng thì hợp tác xã hỗ trợ đổi sang biển vàng trước khi kích hoạt app.",
      },
      {
        question: "Duyệt xong có phải chạy thử không?",
        answer:
          "Không bắt buộc. Tài khoản kích hoạt xong là xe nhận chuyến theo khu vực đã đăng ký.",
      },
    ],
  },
];

export function getPartnerCityBySlug(slug: string): PartnerCity | undefined {
  return XANHSM_PARTNER_CITIES.find((city) => city.slug === slug);
}
