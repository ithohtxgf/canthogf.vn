"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Calculator,
  CalendarCheck,
  Car,
  FileText,
  Fingerprint,
  HeartPulse,
  Home,
  MapPin,
  Receipt,
  Shield,
  Smartphone,
  Users,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SeoBannerImage } from "@/components/SeoImage";
import { SeoLink } from "@/components/SeoLink";
import { ThueMuaFaq } from "@/components/thue-mua-vinfast/ThueMuaFaq";
import { ThueMuaPriceSection } from "@/components/thue-mua-vinfast/ThueMuaPriceSection";
import {
  THUE_MUA_BENEFITS,
  THUE_MUA_DOCUMENTS,
  THUE_MUA_RELATED_ARTICLES,
  THUE_MUA_VINFAST_HERO_INTRO,
  THUE_MUA_VINFAST_PAGE_H1,
  THUE_MUA_VINFAST_STATS,
} from "@/lib/content/thue-mua-vinfast-page";
import {
  CONTACT_ADDRESS,
  CONTACT_PHONE,
  CONTACT_ZALO_URL,
  dispatchConsultationPopup,
} from "@/lib/contact";

const BENEFIT_ICONS: LucideIcon[] = [
  CalendarCheck,
  Shield,
  Smartphone,
  Video,
  BadgeCheck,
  Receipt,
  FileText,
  Home,
];

const DOCUMENT_ICONS: LucideIcon[] = [
  Fingerprint,
  Car,
  MapPin,
  HeartPulse,
  FileText,
  Smartphone,
  Users,
];

function CtaButton({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={dispatchConsultationPopup}
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg text-base sm:text-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default function ThueMuaVinfast() {
  return (
    <div className="bg-light min-h-screen pb-20">
      <section className="relative bg-gradient-to-br from-primary-dark via-primary to-green-600 text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="/banner-homepage.webp"
            alt="Thuê mua xe VinFast Cần Thơ — Cần Thơ GF"
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-1.5 mb-6 text-sm"
          >
            <Award className="w-4 h-4" />
            HTX Vận Tải Cần Thơ GF – Chính Hãng
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
          >
            {THUE_MUA_VINFAST_PAGE_H1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            {THUE_MUA_VINFAST_HERO_INTRO}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <a
              href="#bang-gia-thue-mua"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg"
            >
              <Car className="w-5 h-5" />
              Xem bảng giá ngay
            </a>
          </motion.div>
        </div>
      </section>

      <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {THUE_MUA_VINFAST_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-50 rounded-2xl px-4 py-5 text-center border border-gray-100"
              >
                <div className="text-xl sm:text-2xl font-black text-primary-dark">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ThueMuaPriceSection />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-1">HTX hỗ trợ toàn diện</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            8 quyền lợi bao gồm trong hợp đồng — không phát sinh thêm
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {THUE_MUA_BENEFITS.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index] ?? Shield;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-4 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark text-base mb-1.5">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-1">Giấy tờ cần chuẩn bị</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            7 loại giấy tờ đơn giản — không yêu cầu chứng minh tài chính phức tạp
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {THUE_MUA_DOCUMENTS.map((doc, index) => {
              const Icon = DOCUMENT_ICONS[index] ?? FileText;
              return (
                <div
                  key={doc}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-4 text-base text-dark border border-gray-100"
                >
                  <Icon className="w-6 h-6 text-primary shrink-0" />
                  {doc}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-1">Bài viết liên quan</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-8">
            Kiến thức xe điện, chạy dịch vụ và chương trình thuê mua từ blog Cần Thơ GF
          </p>
          {THUE_MUA_RELATED_ARTICLES.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {THUE_MUA_RELATED_ARTICLES.map((item) => (
                <article
                  key={item.articleId}
                  className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
                >
                  <span className="inline-block text-[10px] font-semibold bg-green-50 text-green-800 px-2 py-0.5 rounded-full mb-2">
                    {item.keyword}
                  </span>
                  <h3 className="font-bold text-dark text-sm leading-snug mb-3">{item.title}</h3>
                  <SeoLink
                    href={`/tin-tuc/${item.articleId}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Đọc bài viết
                    <ArrowRight className="w-3.5 h-3.5" />
                  </SeoLink>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200 px-6 py-8 text-center">
              Các bài viết liên quan sẽ được cập nhật trên{" "}
              <SeoLink href="/tin-tuc" className="text-primary font-semibold hover:underline">
                tin tức Cần Thơ GF
              </SeoLink>
              .
            </p>
          )}
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-1 text-center">
            Câu hỏi thường gặp
          </h2>
          <p className="text-gray-600 text-sm text-center mb-8">
            Tối ưu cho Google featured snippets với từ khóa tìm kiếm cao
          </p>
          <ThueMuaFaq />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-4">Sẵn sàng bắt đầu hành trình?</h2>
          <p className="text-gray-300 mb-2 flex items-center justify-center gap-2 flex-wrap">
            <MapPin className="w-4 h-4 text-secondary shrink-0" />
            {CONTACT_ADDRESS}
          </p>
          <p className="text-gray-300 mb-8">
            Hotline/Zalo:{" "}
            <a
              href={CONTACT_ZALO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-semibold hover:underline"
            >
              {CONTACT_PHONE}
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton>
              <Calculator className="w-5 h-5" />
              Tư vấn hoàn vốn VF5 Plus
              <ArrowRight className="w-5 h-5" />
            </CtaButton>
            <button
              type="button"
              onClick={dispatchConsultationPopup}
              className="inline-flex items-center justify-center gap-2 border border-white/40 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-colors"
            >
              So sánh chương trình Limo
            </button>
          </div>
          <p className="mt-8 text-sm text-gray-400">
            Muốn chạy Xanh SM? Xem thêm{" "}
            <SeoLink href="/dang-ky-xanhsm" className="text-secondary hover:underline font-semibold">
              hướng dẫn đăng ký tài xế Xanh SM Cần Thơ
            </SeoLink>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
