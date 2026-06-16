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
      "Xe điện VinFast được miễn lệ phí trước bạ theo chính sách nhà nước — tiết kiệm đến 10% giá xe khi đặt qua CanThoGF.",
  },
  {
    icon: Gift,
    title: "Voucher giảm giá độc quyền",
    description:
      "Giảm trực tiếp 5 triệu đồng + gói phụ kiện cơ bản khi đặt cọc trong tháng — chỉ áp dụng tại Cần Thơ GF, không có trên website chính hãng.",
  },
  {
    icon: ShieldCheck,
    title: "Trả góp 80% – 85% · Vay đến 8 năm",
    description:
      "Liên kết Vietcombank, BIDV, Agribank tại Cần Thơ — duyệt hồ sơ nhanh, hỗ trợ chứng minh thu nhập cho tài xế XanhSM.",
  },
  {
    icon: Home,
    title: "Lái thử tận nhà miễn phí",
    description:
      "Không cần đến showroom Hà Nội hay TP.HCM — đội ngũ CanThoGF mang xe đến Ninh Kiều, Cái Răng, Bình Thủy để bạn trải nghiệm.",
  },
  {
    icon: CarFront,
    title: "Thủ tục biển số Cần Thơ trọn gói",
    description:
      "Hỗ trợ đăng ký biển số, đăng kiểm, bảo hiểm TNDS — bàn giao xe sẵn sàng lăn bánh, không phải tự làm thủ tục.",
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
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-secondary/40 hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center mb-4">
              <offer.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">{offer.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {offer.description}
            </p>
          </article>
        ))}
      </div>

      <div className="bg-gradient-to-r from-primary-dark to-primary rounded-3xl p-8 sm:p-10 text-white text-center">
        <p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-2">
          Ưu đãi chỉ có tại CanThoGF
        </p>
        <p className="text-xl sm:text-2xl font-bold mb-6 max-w-2xl mx-auto">
          Đặt xe VinFast qua CanThoGF để nhận voucher, hỗ trợ trả góp và thủ
          tục biển số Cần Thơ trọn gói — tiết kiệm thời gian hơn mua trực tiếp
          tại showroom chính hãng.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={dispatchConsultationPopup}
            className="bg-secondary hover:bg-secondary-dark text-dark font-bold py-4 px-8 rounded-full transition-colors shadow-lg"
          >
            Nhận ưu đãi CanThoGF ngay
          </button>
          <SeoLink
            href="/san-pham"
            className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-4 px-8 rounded-full transition-colors"
          >
            Xem danh mục xe VinFast
          </SeoLink>
        </div>
      </div>
    </div>
  );
}
