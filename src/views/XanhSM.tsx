"use client";

import { CheckCircle2, Download, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SeoContentImage } from "@/components/SeoImage";
import { PageHero } from "@/components/evg/PageHero";
import { SeoLink } from "@/components/SeoLink";
import { XanhSmFaq } from "@/components/xanhsm/XanhSmFaq";
import { XanhSmCtaButton as CtaButton } from "@/components/xanhsm/XanhSmCtaButton";
import {
  XANHSM_HERO_INTRO,
  XANHSM_PAGE_H1,
  XANHSM_PARTNER_CONDITIONS,
  XANHSM_PARTNER_DOCUMENTS,
  XANHSM_PARTNER_INTRO,
  XANHSM_PARTNER_STEPS,
  XANHSM_PARTNER_SUPPORT,
} from "@/lib/content/xanhsm-page";
import { XANHSM_PARTNER_HUB_PATH } from "@/lib/content/xanhsm-partner-cities";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_HOURS_SUNDAY,
  CONTACT_HOURS_WEEKDAY,
  CONTACT_PHONE,
  CONTACT_ZALO_URL,
  GREEN_SM_APP_STORE_URL,
  GREEN_SM_GOOGLE_PLAY_URL,
} from "@/lib/contact";

export default function XanhSM() {
  return (
    <>
      <PageHero
        title={XANHSM_PAGE_H1}
        eyebrow="Xanh SM Partner Cần Thơ"
        crumbs={[{ href: "/dang-ky-xanhsm", label: "Đăng ký Xanh SM Partner" }]}
        image="/banner-homepage.webp"
        summary={
          <>
            <span className="block mb-6">{XANHSM_HERO_INTRO}</span>
            <CtaButton className="!bg-sky !text-dark hover:!bg-white" />
          </>
        }
      />

      <section className="p-body" aria-label="Hướng dẫn đăng ký Xanh SM Partner tại Cần Thơ">
        <div className="wrap"><div className="prose !pt-0">
          <article id="dang-ky-partner">
            <h2 className="text-2xl sm:text-3xl !mt-0">Xanh SM Partner là gì</h2>
            <p>{XANHSM_PARTNER_INTRO}</p>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">Điều kiện mở app</h2>
            <ul>
              {XANHSM_PARTNER_CONDITIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">Hồ sơ cần chuẩn bị</h2>
            <p>Chụp ảnh rõ nét, đủ hai mặt, gửi qua Zalo:</p>
            <ol>
              {XANHSM_PARTNER_DOCUMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p>
              Số điện thoại và email phải chưa từng đăng ký tài khoản Xanh SM hoặc Grab. Bị trùng
              thì báo Cần Thơ EV để được hướng dẫn xử lý.
            </p>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">Các bước mở app Xanh SM Partner và Grab</h2>
            <ol>
              {XANHSM_PARTNER_STEPS.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}.</strong> {step.description}
                </li>
              ))}
            </ol>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">Cần Thơ EV hỗ trợ gì</h2>
            <ul>
              {XANHSM_PARTNER_SUPPORT.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Muốn làm hồ sơ trực tiếp thì ghé văn phòng ở {CONTACT_ADDRESS} ({CONTACT_HOURS_WEEKDAY}), hoặc gọi{" "}
              <a href="tel:+84969991177" className="text-primary font-semibold hover:underline">
                {CONTACT_PHONE}
              </a>
              .
            </p>
            <p>
              Chưa có xe? Xem{" "}
              <SeoLink href="/san-pham/vf5" className="text-primary font-semibold hover:underline">
                VinFast VF 5
              </SeoLink>
              ,{" "}
              <SeoLink href="/san-pham/limo-green" className="text-primary font-semibold hover:underline">
                Limo Green
              </SeoLink>{" "}
              hoặc{" "}
              <SeoLink href="/san-pham" className="text-primary font-semibold hover:underline">
                các dòng ô tô VinFast
              </SeoLink>{" "}
              Cần Thơ EV đang bán.
            </p>
            <p>
              Ở tỉnh khác? Xem{" "}
              <SeoLink href={XANHSM_PARTNER_HUB_PATH} className="text-primary font-semibold hover:underline">
                các khu vực Cần Thơ EV hỗ trợ đăng ký Xanh SM Partner
              </SeoLink>{" "}
              (TP.HCM, Vũng Tàu, Phú Quốc và các tỉnh lân cận).
            </p>
            <div className="not-prose mt-4">
              <CtaButton />
            </div>
          </article>
        </div></div>
      </section>

      <section className="h-sec scroll-mt-24" id="faq-xanhsm">
        <div className="wrap">
          <p className="h-eyebrow">Hỏi đáp</p>
          <h2 className="text-dark">
            Câu hỏi về Xanh SM Partner
          </h2>
          <p className="text-steel mb-6">
            Những câu chủ xe VinFast hay hỏi trước khi mở app.
          </p>
          <XanhSmFaq />
        </div>
      </section>

      <section className="h-navy" aria-labelledby="lien-he-xanhsm">
        <div className="wrap">
          <p className="h-eyebrow">Liên hệ</p>
          <h2 id="lien-he-xanhsm">Liên hệ mở app</h2>
          <p>
            Nhắn Zalo hoặc gọi Cần Thơ EV để mở app Xanh SM Partner và Grab cho xe VinFast:
          </p>
          <ul className="max-w-xl space-y-3 mb-8 text-white/85">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#7CCBF8] shrink-0 mt-0.5" />
              <span>
                <strong>Hotline/Zalo:</strong>{" "}
                <a
                  href={CONTACT_ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-semibold hover:underline"
                >
                  {CONTACT_PHONE}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#7CCBF8] shrink-0 mt-0.5" />
              <span>
                <strong>Địa chỉ:</strong> {CONTACT_ADDRESS}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#7CCBF8] shrink-0 mt-0.5" />
              <span>
                <strong>Email:</strong> {CONTACT_EMAIL}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#7CCBF8] shrink-0 mt-0.5" />
              <span>
                <strong>Giờ làm việc:</strong> {CONTACT_HOURS_WEEKDAY}; {CONTACT_HOURS_SUNDAY}
              </span>
            </li>
          </ul>
          <CtaButton />
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <div className="bg-white rounded-xl border border-hairline overflow-hidden p-6 sm:p-10">
            <p className="h-eyebrow">Ứng dụng Xanh SM</p>
            <h2 className="text-dark">
              Khách đi xe: tải app Xanh SM
            </h2>
            <p className="text-steel mb-8 max-w-2xl">
              App đặt xe điện VinFast của Xanh SM, có trên App Store và Google Play.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ul className="space-y-3">
                {[
                  "Toàn bộ xe là xe điện VinFast",
                  "Xem trước giá cước khi đặt",
                ].map((item) => (
                  <li key={item} className="flex items-start text-ink">
                    <CheckCircle2 className="w-5 h-5 text-sky mr-2 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
                <li className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href={GREEN_SM_APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost flex-1"
                  >
                    <Download className="w-4 h-4" /> App Store
                  </a>
                  <a
                    href={GREEN_SM_GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn flex-1"
                  >
                    <Download className="w-4 h-4" /> Google Play
                  </a>
                </li>
              </ul>
              <div className="flex justify-center">
                <div className="relative w-56 h-[440px] bg-dark rounded-[3rem] border-[8px] border-dark overflow-hidden">
                  <SeoContentImage
                    src="/mockup-xanh-sm.jpg"
                    alt="App Green SM: Ứng dụng XanhSM đặt xe điện tại Cần Thơ"
                    width={400}
                    height={800}
                    className="w-full h-full object-cover"
                    sizes="224px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
