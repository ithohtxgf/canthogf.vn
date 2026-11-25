"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/evg/PageHero";
import { SeoLink } from "@/components/SeoLink";
import { XanhSmCtaButton } from "@/components/xanhsm/XanhSmCtaButton";
import {
  XANHSM_PAGE_PATH,
  XANHSM_PARTNER_DOCUMENTS,
  XANHSM_PARTNER_INTRO,
} from "@/lib/content/xanhsm-page";
import { XANHSM_PARTNER_CITIES, XANHSM_PARTNER_HUB_PATH } from "@/lib/content/xanhsm-partner-cities";

export default function XanhSmPartnerHub() {
  return (
    <>
      <PageHero
        title="Đăng Ký Xanh SM Partner: Chọn Khu Vực Của Bạn"
        eyebrow="Xanh SM Partner"
        crumbs={[{ href: XANHSM_PARTNER_HUB_PATH, label: "Đăng ký Xanh SM Partner" }]}
        image="/banner-homepage.webp"
        summary={
          <>
            <span className="block mb-6">
              {XANHSM_PARTNER_INTRO} Cần Thơ EV hỗ trợ tư vấn từ xa qua Zalo/hotline cho chủ xe
              VinFast trên toàn quốc.
            </span>
            <XanhSmCtaButton className="!bg-sky !text-dark hover:!bg-white" />
          </>
        }
      />

      <section className="p-body">
        <div className="wrap">
          <p className="h-eyebrow">Khu vực</p>
          <h2 className="text-dark">
            Khu Vực Cần Thơ EV Hỗ Trợ Đăng Ký Xanh SM Partner
          </h2>
          <p className="text-steel mb-8 max-w-2xl">
            Chọn tỉnh/thành của bạn để xem hướng dẫn thủ tục và hồ sơ chi tiết.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {XANHSM_PARTNER_CITIES.map((city) => (
              <SeoLink
                key={city.slug}
                href={`/dang-ky-xanhsm-partner/${city.slug}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-hairline bg-white p-5 hover:border-sky transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-tint-strong flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-dark" />
                  </span>
                  <span className="font-semibold text-dark">{city.displayName}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
              </SeoLink>
            ))}
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <div className="prose !pt-0">
            <h2 className="!mt-0">Hồ Sơ Cần Chuẩn Bị Để Đăng Ký App Partner</h2>
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
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <div className="h-cta">
            <div>
              <p className="h-eyebrow">Tư vấn từ xa</p>
              <h2 className="text-dark">Chưa Tìm Thấy Khu Vực Của Bạn?</h2>
              <p>
                Cần Thơ EV vẫn có thể hỗ trợ tư vấn đăng ký Xanh SM Partner từ xa. Liên hệ ngay để
                được hướng dẫn.
              </p>
            </div>
            <XanhSmCtaButton />
          </div>
        </div>
      </section>
    </>
  );
}
