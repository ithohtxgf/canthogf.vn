"use client";

import { Car } from "lucide-react";
import { PageHero } from "@/components/evg/PageHero";
import { LineIcon } from "@/components/evg/Icons";
import { VinfastSeoContent } from "@/components/vinfast-can-tho/VinfastSeoContent";
import { VinfastProductShowcase } from "@/components/vinfast-can-tho/VinfastProductShowcase";
import { VinfastFinancing } from "@/components/vinfast-can-tho/VinfastFinancing";
import { VinfastLeadForm } from "@/components/vinfast-can-tho/VinfastLeadForm";
import { VinfastSpokeArticles } from "@/components/vinfast-can-tho/VinfastSpokeArticles";
import { VinfastChietTinhForm } from "@/components/vinfast-can-tho/VinfastChietTinhForm";
import { VinfastFaq } from "@/components/vinfast-can-tho/VinfastFaq";
import { dispatchConsultationPopup } from "@/lib/contact";
import { VINFAST_CAN_THO_PAGE_H1 } from "@/lib/content/vinfast-can-tho";

export default function VinfastCanTho() {
  return (
    <>
      {/* Hero: H1 duy nhất */}
      <PageHero
        title={VINFAST_CAN_THO_PAGE_H1}
        eyebrow="Tổng hợp giá lăn bánh minh bạch: CanThoEV"
        crumbs={[{ href: "/vinfast-can-tho", label: "VinFast Cần Thơ" }]}
        image="/banner-homepage.webp"
        summary={
          <>
            <span className="block mb-6">
              CanThoEV tổng hợp bảng tính giá lăn bánh chi tiết tại Cần Thơ, bao gồm phí biển số, phí đường bộ, bảo
              hiểm TNDS. Hỗ trợ trả góp 85%, lái thử tận nhà.
            </span>
            <span className="flex flex-col sm:flex-row gap-3">
              <a href="#tinh-gia-lan-banh" className="h-pill">
                Nhận Báo Giá Lăn Bánh <LineIcon name="arrow" />
              </a>
              <button
                type="button"
                onClick={dispatchConsultationPopup}
                className="h-pill !bg-transparent !text-white border border-white/40 hover:!bg-white/10"
              >
                <Car className="w-4 h-4" />
                Đăng Ký Lái Thử
              </button>
            </span>
          </>
        }
      />

      {/* H2: Chiết tính báo giá chi tiết, thay thế bảng tính cũ */}
      <section
        id="tinh-gia-lan-banh"
        className="p-body scroll-mt-24"
        aria-labelledby="chiet-tinh-heading"
      >
        <div className="wrap">
          <div className="mb-8 max-w-3xl">
            <h2
              id="chiet-tinh-heading"
              className="text-2xl sm:text-3xl font-semibold text-dark mb-3"
            >
              Chiết Tính Mua Xe VinFast: Báo Giá Trả Góp Chi Tiết
            </h2>
            <p className="text-steel text-sm sm:text-base">
              Nhập thông số xe và tỷ lệ vay, xem ngay toàn bộ chi phí
              tiền mặt, khoản trả trước và góp hàng tháng minh bạch từng dòng.
            </p>
          </div>
          <VinfastChietTinhForm />
        </div>
      </section>

      <VinfastSeoContent />

      {/* H2: Đánh giá & so sánh */}
      <section
        className="h-sec"
        aria-labelledby="reviews-heading"
      >
        <div className="wrap">
          <div className="mb-8 max-w-3xl">
            <h2
              id="reviews-heading"
              className="text-dark"
            >
              Giá Các Mẫu VinFast Đang Bán Tại Cần Thơ EV
            </h2>
            <p className="text-steel">
              VF3 nhỏ gọn chạy phố, VF5 Plus chạy dịch vụ XanhSM, EC Van giao
              hàng nội đô: đánh giá thực tế từ đội ngũ CanThoEV phục vụ khách
              hàng Miền Tây.
            </p>
          </div>
          <VinfastProductShowcase />
        </div>
      </section>

      {/* H2: Trả góp */}
      <section
        className="h-sec"
        aria-labelledby="financing-heading"
      >
        <div className="wrap">
          <h2 id="financing-heading" className="text-dark mb-6">
            Chính Sách Trả Góp Mua Xe VinFast Tại Cần Thơ
          </h2>
          <VinfastFinancing />
        </div>
      </section>

      {/* FAQ: thẻ details, nội dung trùng với FAQPage trong JSON-LD */}
      <section
        className="h-sec"
        aria-labelledby="faq-heading"
      >
        <div className="wrap">
          <h2
            id="faq-heading"
            className="text-dark mb-6"
          >
            Câu Hỏi Thường Gặp Về VinFast Cần Thơ
          </h2>
          <VinfastFaq />
        </div>
      </section>

      {/* Form + Spoke articles */}
      <section
        id="dang-ky-tu-van"
        className="h-sec scroll-mt-24"
        aria-labelledby="lead-form-heading"
      >
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2
                  id="lead-form-heading"
                  className="text-dark"
                >
                  Đăng Ký Nhận Báo Giá VinFast Cần Thơ
                </h2>
              </div>
              <VinfastLeadForm />
            </div>
            <div className="lg:col-span-1">
              <VinfastSpokeArticles />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
