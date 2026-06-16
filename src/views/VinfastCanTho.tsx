"use client";

import { motion } from "motion/react";
import { ArrowRight, Car, Sparkles } from "lucide-react";
import { SeoBannerImage } from "@/components/SeoImage";
import { VinfastPriceCalculator } from "@/components/vinfast-can-tho/VinfastPriceCalculator";
import { VinfastProductShowcase } from "@/components/vinfast-can-tho/VinfastProductShowcase";
import { VinfastExclusiveOffers } from "@/components/vinfast-can-tho/VinfastExclusiveOffers";
import { VinfastFinancing } from "@/components/vinfast-can-tho/VinfastFinancing";
import { VinfastLeadForm } from "@/components/vinfast-can-tho/VinfastLeadForm";
import { VinfastSpokeArticles } from "@/components/vinfast-can-tho/VinfastSpokeArticles";
import { VinfastFaq } from "@/components/vinfast-can-tho/VinfastFaq";
import { dispatchConsultationPopup } from "@/lib/contact";
import { VINFAST_CAN_THO_PAGE_TITLE } from "@/lib/content/vinfast-can-tho";

export default function VinfastCanTho() {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero — H1 duy nhất */}
      <section className="relative bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="https://images.unsplash.com/photo-1593941707889-a5bba14938c7?auto=format&fit=crop&q=80&w=1920&h=800"
            alt="Showroom VinFast Cần Thơ — xe ô tô điện Cần Thơ GF"
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark/95 to-black/80" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-secondary text-sm font-semibold">
                Tổng hợp giá lăn bánh minh bạch — CanThoGF
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6"
            >
              {VINFAST_CAN_THO_PAGE_TITLE}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl"
            >
              Khác với trang chính hãng chỉ hiển thị giá niêm yết, CanThoGF tổng
              hợp bảng tính giá lăn bánh chi tiết tại Cần Thơ — bao gồm phí biển
              số, phí đường bộ, bảo hiểm TNDS và voucher ưu đãi. Hỗ trợ trả góp
              85%, lái thử tận nhà.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#tinh-gia-lan-banh"
                className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-dark font-bold py-4 px-8 rounded-full transition-colors shadow-lg text-base sm:text-lg"
              >
                Nhận Báo Giá Lăn Bánh
                <ArrowRight className="w-5 h-5" />
              </a>
              <button
                type="button"
                onClick={dispatchConsultationPopup}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-4 px-8 rounded-full transition-colors text-base sm:text-lg backdrop-blur-sm"
              >
                <Car className="w-5 h-5" />
                Đăng Ký Lái Thử
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* H2: Bảng tính giá lăn bánh */}
      <section
        id="tinh-gia-lan-banh"
        className="py-12 sm:py-16 lg:py-20 -mt-8 sm:-mt-12 relative z-20"
        aria-labelledby="calculator-heading"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              id="calculator-heading"
              className="text-2xl sm:text-3xl font-black text-dark mb-3"
            >
              Bảng Ước Tính Giá Lăn Bánh Chi Tiết Tại Cần Thơ
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Giá xe (kèm pin) + phí biển số + phí đường bộ + BHTNDS − voucher
              ưu đãi — minh bạch từng khoản, không cần liên hệ mới biết giá.
            </p>
          </div>
          <VinfastPriceCalculator />
        </div>
      </section>

      {/* H2: Đánh giá & so sánh */}
      <section
        className="py-12 sm:py-16 lg:py-20 bg-gray-50"
        aria-labelledby="reviews-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2
              id="reviews-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-dark mb-4"
            >
              Đánh Giá Các Dòng Xe VinFast Phù Hợp Với Đường Phố Cần Thơ
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-4" />
            <p className="text-gray-600 max-w-3xl mx-auto">
              VF3 nhỏ gọn chạy phố, VF5 Plus chạy dịch vụ XanhSM, EC Van giao
              hàng nội đô — đánh giá thực tế từ đội ngũ CanThoGF phục vụ khách
              hàng Miền Tây.
            </p>
          </div>
          <VinfastProductShowcase />
        </div>
      </section>

      {/* H2: Ưu đãi độc quyền */}
      <section
        className="py-12 sm:py-16 lg:py-20"
        aria-labelledby="offers-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2
              id="offers-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-black text-dark mb-4"
            >
              Ưu Đãi Độc Quyền Khi Đặt Xe VinFast Qua CanThoGF
            </h2>
            <div className="w-24 h-1 bg-secondary mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lợi thế so với mua trực tiếp tại showroom chính hãng — voucher, hỗ
              trợ tài chính và thủ tục biển số trọn gói tại Cần Thơ.
            </p>
          </div>
          <VinfastExclusiveOffers />

          <div className="mt-14">
            <h3 className="text-xl sm:text-2xl font-bold text-dark text-center mb-8">
              Chính Sách Trả Góp Mua Xe VinFast Tại Cần Thơ
            </h3>
            <VinfastFinancing />
          </div>
        </div>
      </section>

      {/* FAQ — khớp FAQPage Schema */}
      <section
        className="py-12 sm:py-16 bg-white"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-black text-dark text-center mb-8"
          >
            Câu Hỏi Thường Gặp Về Giá Lăn Bánh VinFast Cần Thơ
          </h2>
          <VinfastFaq />
        </div>
      </section>

      {/* Form + Spoke articles */}
      <section
        id="dang-ky-tu-van"
        className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-light"
        aria-labelledby="lead-form-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="text-center lg:text-left mb-8">
                <h2
                  id="lead-form-heading"
                  className="text-2xl sm:text-3xl font-black text-dark mb-3"
                >
                  Đăng Ký Nhận Báo Giá VinFast Cần Thơ
                </h2>
                <div className="w-24 h-1 bg-secondary mb-4 mx-auto lg:mx-0" />
              </div>
              <VinfastLeadForm />
            </div>
            <div className="lg:col-span-1">
              <VinfastSpokeArticles />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
