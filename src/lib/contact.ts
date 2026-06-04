import { ORGANIZATION_NAME } from "./seo";

export { ORGANIZATION_NAME };

export const CONTACT_ADDRESS =
  "59, Đường Số 10, KDC Diệu Hiền, Phường Cái Răng, TP Cần Thơ";

export const CONTACT_PHONE = "0916 513 720";
export const CONTACT_PHONE_TEL = "+84916513720";
export const CONTACT_EMAIL = "htxcanthogf@gmail.com";
export const CONTACT_TAX_ID = "1801807608";
export const CONTACT_ZALO_URL = "https://zalo.me/0916513720";
export const CONTACT_FACEBOOK_URL = "https://www.facebook.com/canthogf";
export const CONTACT_TIKTOK_URL = "https://www.tiktok.com/@sulinhctgf";

export const CONTACT_HOURS_WEEKDAY = "Thứ 2 – Thứ 7: 08:00 – 17:30";
export const CONTACT_HOURS_SUNDAY = "Chủ nhật: 08:00 – 12:00";
export const CONTACT_RESPONSE_PROMISE =
  "Chúng tôi thường phản hồi trong vòng 15 phút — Hotline & Zalo hỗ trợ 24/7";

export const CONTACT_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d982.287304834181!2d105.79074292127355!3d10.004530519224737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a063dc2df92e1f%3A0x76e2d9ad0836811f!2zSFRYIFbhuq1uIFThuqBpIEPhuqduIFRoxqEgR0Y!5e0!3m2!1svi!2s!4v1779978540577!5m2!1svi!2s";

export const CONTACT_MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Hợp+tác+xã+vận+tải+Cần+Thơ+GF";

export const CONTACT_FAQ_ITEMS = [
  {
    question: "Tôi có thể mua xe VinFast trả góp không?",
    answer:
      "Có. Cần Thơ GF hỗ trợ tư vấn gói vay qua ngân hàng đối tác, thủ tục gọn và báo giá minh bạch trước khi ký hợp đồng.",
  },
  {
    question: "Đăng ký tài xế XanhSM qua HTX mất bao lâu?",
    answer:
      "Thông thường 1–3 ngày làm việc sau khi đủ hồ sơ. Nhân viên HTX hỗ trợ hoàn tất thủ tục và hướng dẫn tải ứng dụng.",
  },
  {
    question: "Có được lái thử xe trước khi mua không?",
    answer:
      "Có. Bạn đăng ký lái thử miễn phí qua hotline 0916 513 720 hoặc form liên hệ — chúng tôi sắp lịch và chuẩn bị xe phù hợp.",
  },
  {
    question: "Showroom mở cửa những ngày nào?",
    answer:
      "Thứ 2 – Thứ 7: 08:00 – 17:30; Chủ nhật: 08:00 – 12:00. Ngoài giờ vẫn có thể nhắn Zalo, chúng tôi phản hồi sớm nhất có thể.",
  },
  {
    question: "Bảo hành xe VinFast thực hiện ở đâu?",
    answer:
      "Xe bảo hành chính hãng tại hệ thống VinFast. Cần Thơ GF tư vấn lịch bảo dưỡng và hỗ trợ đặt lịch tại xưởng ủy quyền gần bạn.",
  },
] as const;

export function dispatchConsultationPopup(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationPopup"));
  }
}
