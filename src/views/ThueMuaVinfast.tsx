"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
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
import { PageHero } from "@/components/evg/PageHero";
import { SeoLink } from "@/components/SeoLink";
import { ThueMuaFaq } from "@/components/thue-mua-vinfast/ThueMuaFaq";
import { ThueMuaPriceSection } from "@/components/thue-mua-vinfast/ThueMuaPriceSection";
import {
  THUE_MUA_BENEFITS,
  THUE_MUA_DOCUMENTS,
  THUE_MUA_RELATED_ARTICLES,
  THUE_MUA_VINFAST_HERO_INTRO,
  THUE_MUA_VINFAST_PAGE_H1,
  THUE_MUA_VINFAST_PAGE_PATH,
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
      className={`h-pill h-pill--solid ${className}`}
    >
      {children}
    </button>
  );
}

export default function ThueMuaVinfast() {
  return (
    <>
      <PageHero
        title={THUE_MUA_VINFAST_PAGE_H1}
        eyebrow="HTX Vận Tải Cần Thơ EV – Chính Hãng"
        crumbs={[{ href: THUE_MUA_VINFAST_PAGE_PATH, label: "Thuê mua VinFast" }]}
        image="/banner-homepage.webp"
        summary={
          <>
            <span className="block mb-6">{THUE_MUA_VINFAST_HERO_INTRO}</span>
            <a href="#bang-gia-thue-mua" className="h-pill">
              <Car className="w-4 h-4" />
              Xem bảng giá ngay
            </a>
          </>
        }
      />

      <section className="p-body">
        <div className="wrap">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {THUE_MUA_VINFAST_STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl px-4 py-5 text-center border border-hairline flex flex-col"
              >
                <dd className="order-1 text-xl sm:text-2xl font-semibold text-dark tabular-nums">{stat.value}</dd>
                <dt className="order-2 text-xs sm:text-sm text-steel mt-1">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="h-sec !pt-12">
        <div className="wrap">
          <ThueMuaPriceSection />
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <p className="h-eyebrow">Quyền lợi</p>
          <h2 className="text-dark">HTX hỗ trợ toàn diện</h2>
          <p className="text-steel text-sm sm:text-base mb-8">
            8 quyền lợi bao gồm trong hợp đồng, không phát sinh thêm
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {THUE_MUA_BENEFITS.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index] ?? Shield;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.05 }}
                  className="bg-white rounded-xl border border-hairline hover:border-sky transition-colors p-5"
                >
                  <div className="w-11 h-11 rounded-lg bg-tint-strong flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-dark" />
                  </div>
                  <h3 className="font-semibold text-dark text-base mb-1.5">{benefit.title}</h3>
                  <p className="text-sm text-steel leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <p className="h-eyebrow">Hồ sơ</p>
          <h2 className="text-dark">Giấy tờ cần chuẩn bị</h2>
          <p className="text-steel text-sm sm:text-base mb-8">
            7 loại giấy tờ đơn giản: không yêu cầu chứng minh tài chính phức tạp
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {THUE_MUA_DOCUMENTS.map((doc, index) => {
              const Icon = DOCUMENT_ICONS[index] ?? FileText;
              return (
                <div
                  key={doc}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-4 text-base text-dark border border-hairline"
                >
                  <span className="w-9 h-9 rounded-lg bg-tint-strong flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-dark" />
                  </span>
                  {doc}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <p className="h-eyebrow">Tin tức</p>
          <h2 className="text-dark">Bài viết liên quan</h2>
          <p className="text-steel text-sm sm:text-base mb-8">
            Kiến thức xe điện, chạy dịch vụ và chương trình thuê mua từ blog Cần Thơ EV
          </p>
          {THUE_MUA_RELATED_ARTICLES.length > 0 ? (
            <div className="index">
              {THUE_MUA_RELATED_ARTICLES.map((item) => (
                <SeoLink key={item.articleId} href={`/tin-tuc/${item.articleId}`}>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">{item.keyword}</span>
                  <h3 className="index-title !text-[0.9375rem] !m-0">{item.title}</h3>
                  <span className="index-desc">Đọc bài viết</span>
                </SeoLink>
              ))}
            </div>
          ) : (
            <p className="text-sm text-steel bg-white rounded-xl border border-dashed border-hairline px-6 py-8 text-center">
              Các bài viết liên quan sẽ được cập nhật trên{" "}
              <SeoLink href="/tin-tuc" className="text-primary font-semibold hover:underline">
                tin tức Cần Thơ EV
              </SeoLink>
              .
            </p>
          )}
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <p className="h-eyebrow">Hỏi đáp</p>
          <h2 className="text-dark">Câu hỏi thường gặp</h2>
          <p className="text-steel text-sm mb-8">
            Tối ưu cho Google featured snippets với từ khóa tìm kiếm cao
          </p>
          <ThueMuaFaq />
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <div className="h-cta">
            <div>
              <p className="h-eyebrow">Thuê mua VinFast</p>
              <h2 className="text-dark">Sẵn sàng bắt đầu hành trình?</h2>
              <p className="flex items-center gap-2 flex-wrap mb-1">
                <MapPin className="w-4 h-4 text-sky shrink-0" />
                {CONTACT_ADDRESS}
              </p>
              <p className="mb-1">
                Hotline/Zalo:{" "}
                <a
                  href={CONTACT_ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:underline"
                >
                  {CONTACT_PHONE}
                </a>
              </p>
              <p className="text-sm">
                Muốn chạy Xanh SM? Xem thêm{" "}
                <SeoLink href="/dang-ky-xanhsm" className="text-primary hover:underline font-semibold">
                  hướng dẫn đăng ký tài xế Xanh SM Cần Thơ
                </SeoLink>
                .
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <CtaButton>
                <Calculator className="w-4 h-4" />
                Tư vấn hoàn vốn VF5 Plus
                <ArrowRight className="w-4 h-4" />
              </CtaButton>
              <button type="button" onClick={dispatchConsultationPopup} className="btn btn-ghost !rounded-full">
                So sánh chương trình Limo
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
