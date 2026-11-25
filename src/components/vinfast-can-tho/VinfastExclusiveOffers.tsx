import { SeoLink } from "@/components/SeoLink";
import {
  BadgePercent,
  CarFront,
  Gift,
  Home,
  ShieldCheck,
} from "lucide-react";
import { dispatchConsultationPopup } from "@/lib/contact";

const EXCLUSIVE_OFFERS = [
  {
    icon: BadgePercent,
    title: "Miễn 100% lệ phí trước bạ",
    description:
      "Xe điện VinFast được miễn lệ phí trước bạ theo chính sách nhà nước, tiết kiệm đến 10% giá xe khi đặt qua CanThoEV.",
  },
  {
    icon: Gift,
    title: "Voucher giảm giá độc quyền",
    description:
      "Giảm trực tiếp 5 triệu đồng + gói phụ kiện cơ bản khi đặt cọc trong tháng, chỉ áp dụng tại Cần Thơ EV, không có trên website chính hãng.",
  },
  {
    icon: ShieldCheck,
    title: "Trả góp 80% – 85% · Vay đến 8 năm",
    description:
      "Liên kết Vietcombank, BIDV, Agribank tại Cần Thơ, duyệt hồ sơ nhanh, hỗ trợ chứng minh thu nhập cho tài xế XanhSM.",
  },
  {
    icon: Home,
    title: "Lái thử tận nhà miễn phí",
    description:
      "Không cần đến showroom Hà Nội hay TP.HCM, đội ngũ CanThoEV mang xe đến Ninh Kiều, Cái Răng, Bình Thủy để bạn trải nghiệm.",
  },
  {
    icon: CarFront,
    title: "Thủ tục biển số Cần Thơ trọn gói",
    description:
      "Hỗ trợ đăng ký biển số, đăng kiểm, bảo hiểm TNDS, bàn giao xe sẵn sàng lăn bánh, không phải tự làm thủ tục.",
  },
  {
    icon: ShieldCheck,
    title: "Xe biển vàng: miễn phí hợp tác xã & đăng ký vận doanh Xanh SM",
    description:
      "Hỗ trợ hồ sơ xe biển vàng, miễn phí hợp tác xã và đăng ký vận doanh trên Xanh SM cho khách hàng đủ điều kiện.",
  },
] as const;

export function VinfastExclusiveOffers() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {EXCLUSIVE_OFFERS.map((offer) => (
          <article
            key={offer.title}
            className="bg-white rounded-xl p-6 border border-hairline hover:border-sky transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-tint-strong flex items-center justify-center mb-4">
              <offer.icon className="w-6 h-6 text-dark" />
            </div>
            <h3 className="text-lg font-semibold text-dark mb-2">{offer.title}</h3>
            <p className="text-steel text-sm leading-relaxed">
              {offer.description}
            </p>
          </article>
        ))}
      </div>

      <div className="h-cta">
        <div>
        <p className="h-eyebrow">
          Ưu đãi chỉ có tại CanThoEV
        </p>
        <p className="!text-dark text-xl sm:text-2xl font-semibold !max-w-none">
          Đặt xe VinFast qua CanThoEV để tiết kiệm thời gian.
        </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={dispatchConsultationPopup}
            className="h-pill h-pill--solid"
          >
            Nhận ưu đãi CanThoEV ngay
          </button>
          <SeoLink
            href="/san-pham"
            className="h-pill !bg-white border border-hairline hover:!border-sky"
          >
            Xem danh mục xe VinFast
          </SeoLink>
        </div>
      </div>
    </div>
  );
}
