"use client";

import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
import { SeoBannerImage } from "@/components/SeoImage";
import { SeoLink } from "@/components/SeoLink";
import { XanhSmCtaButton } from "@/components/xanhsm/XanhSmCtaButton";
import {
  XANHSM_PAGE_PATH,
  XANHSM_PARTNER_DOCUMENTS,
  XANHSM_PARTNER_INTRO,
} from "@/lib/content/xanhsm-page";
import { XANHSM_PARTNER_CITIES } from "@/lib/content/xanhsm-partner-cities";

export default function XanhSmPartnerHub() {
  return (
    <div className="bg-light min-h-screen pb-20">
      <section className="bg-primary-dark text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="/banner-homepage.webp"
            alt="Đăng ký Xanh SM Partner theo khu vực — Cần Thơ GF"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
          >
            Đăng Ký Xanh SM Partner — Chọn Khu Vực Của Bạn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            {XANHSM_PARTNER_INTRO} Cần Thơ GF hỗ trợ tư vấn từ xa qua Zalo/hotline cho chủ xe
            VinFast trên toàn quốc.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <XanhSmCtaButton />
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-3 text-center">
            Khu Vực Cần Thơ GF Hỗ Trợ Đăng Ký Xanh SM Partner
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Chọn tỉnh/thành của bạn để xem hướng dẫn thủ tục và hồ sơ chi tiết.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {XANHSM_PARTNER_CITIES.map((city) => (
              <SeoLink
                key={city.slug}
                href={`/dang-ky-xanhsm-partner/${city.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-primary transition-all"
              >
                <span className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-bold text-dark">{city.displayName}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </SeoLink>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-headings:text-dark prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
          <h2 className="text-2xl sm:text-3xl">Hồ Sơ Cần Chuẩn Bị Để Đăng Ký App Partner</h2>
          <p>Dù ở tỉnh/thành nào, hồ sơ cần chuẩn bị cho Xanh SM Partner đều gồm:</p>
          <ol>
            {XANHSM_PARTNER_DOCUMENTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <p>
            Bạn đang ở Cần Thơ? Xem thêm{" "}
            <SeoLink href={XANHSM_PAGE_PATH} className="text-primary font-semibold hover:underline">
              hướng dẫn đăng ký tài xế Xanh SM Cần Thơ
            </SeoLink>{" "}
            dành cho người chưa có xe.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">
            Chưa Tìm Thấy Khu Vực Của Bạn?
          </h2>
          <p className="text-gray-300 mb-8">
            Cần Thơ GF vẫn có thể hỗ trợ tư vấn đăng ký Xanh SM Partner từ xa. Liên hệ ngay để
            được hướng dẫn.
          </p>
          <XanhSmCtaButton />
        </div>
      </section>
    </div>
  );
}
