"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PageHero } from "@/components/evg/PageHero";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  Zap,
  MessageCircle,
} from "lucide-react";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_FACEBOOK_URL,
  CONTACT_FAQ_ITEMS,
  CONTACT_HOURS_SUNDAY,
  CONTACT_HOURS_WEEKDAY,
  CONTACT_MAPS_DIRECTIONS_URL,
  CONTACT_MAPS_EMBED_URL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_RESPONSE_PROMISE,
  CONTACT_TAX_ID,
  CONTACT_TIKTOK_URL,
  CONTACT_YOUTUBE_URL,
  CONTACT_ZALO_URL,
  ORGANIZATION_NAME,
  dispatchConsultationPopup,
} from "@/lib/contact";

function ContactFaq() {
  return (
    <div className="p-faq">
      {CONTACT_FAQ_ITEMS.map((item, index) => (
        <details key={item.question} open={index === 0}>
          <summary>
            <span className="p-faq-n">{String(index + 1).padStart(2, "0")}</span>
            <span>{item.question}</span>
            <i aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        title={`Kết nối với ${ORGANIZATION_NAME}`}
        eyebrow="Liên hệ"
        crumbs={[{ href: "/lien-he", label: "Liên hệ" }]}
        summary="Tư vấn VinFast, đăng ký XanhSM và hỗ trợ sau bán, đội ngũ Cần Thơ EV sẵn sàng đồng hành cùng bạn tại ĐBSCL."
        meta={
          <span className="inline-flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" aria-hidden />
            {CONTACT_RESPONSE_PROMISE}
          </span>
        }
      />

      <section className="p-body">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Cột CTA liên hệ nhanh */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl border border-hairline p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-tint-strong">
                  <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-steel leading-relaxed">
                    <strong className="text-dark">{CONTACT_RESPONSE_PROMISE}</strong>
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-dark mb-2">Liên hệ ngay</h2>
                <p className="text-steel mb-8 text-sm flex-grow">
                  Gọi hotline, nhắn Zalo hoặc xem đầy đủ thông tin tư vấn viên trong một bước.
                </p>

                <div className="space-y-3 mt-auto">
                  <motion.a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    whileTap={{ scale: 0.98 }}
                    className="btn w-full !min-h-[3.25rem] !text-base touch-manipulation"
                  >
                    <Phone className="w-5 h-5" />
                    Gọi {CONTACT_PHONE}
                  </motion.a>

                  <motion.a
                    href={CONTACT_ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-ghost w-full !min-h-[3.25rem] !text-base touch-manipulation"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white">
                      <Image
                        src="/logo_zalo.png"
                        alt=""
                        width={24}
                        height={24}
                        className="object-contain"
                        aria-hidden
                      />
                    </span>
                    Kết nối Zalo tư vấn viên
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={dispatchConsultationPopup}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-ghost w-full !min-h-[3.25rem] !text-base touch-manipulation"
                  >
                    Xem thông tin liên hệ
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Cột thông tin doanh nghiệp */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl border border-hairline p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-dark mb-4">Thông tin doanh nghiệp</h2>
                <p className="font-semibold text-dark text-lg mb-6">{ORGANIZATION_NAME}</p>

                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint-strong">
                      <MapPin className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-1">
                        Địa chỉ
                      </p>
                      <p className="text-ink leading-relaxed">{CONTACT_ADDRESS}</p>
                      <a
                        href={CONTACT_MAPS_DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm font-semibold text-primary hover:text-primary-dark"
                      >
                        Chỉ đường Google Maps →
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint-strong">
                      <Phone className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-1">
                        Hotline
                      </p>
                      <a
                        href={`tel:${CONTACT_PHONE_TEL}`}
                        className="text-xl font-semibold text-dark hover:text-primary transition-colors"
                      >
                        {CONTACT_PHONE}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint-strong">
                      <Building2 className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-1">
                        Mã số thuế
                      </p>
                      <p className="text-ink font-semibold">{CONTACT_TAX_ID}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint-strong">
                      <Mail className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-ink font-medium hover:text-primary break-all"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-tint-strong">
                      <Clock className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-1">
                        Giờ làm việc
                      </p>
                      <p className="text-ink">{CONTACT_HOURS_WEEKDAY}</p>
                      <p className="text-ink">{CONTACT_HOURS_SUNDAY}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <p className="text-xs font-semibold uppercase tracking-wider text-steel mb-4">
                    Mạng xã hội
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href={CONTACT_FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                      className="block h-10 w-10 opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src="/logo_facebook.png"
                        alt="Facebook Cần Thơ EV"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </a>
                    <a
                      href={CONTACT_ZALO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Zalo"
                      className="block h-10 w-10 shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src="/logo_zalo.png"
                        alt="Zalo"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </a>
                    <a
                      href={CONTACT_TIKTOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="TikTok"
                      className="block h-10 w-10 shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src="/logo_tiktok.png"
                        alt="TikTok"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </a>
                    <a
                      href={CONTACT_YOUTUBE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="YouTube @sulinhvf"
                      className="block h-10 w-10 shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src="/logo_youtube.svg"
                        alt="YouTube @sulinhvf"
                        width={40}
                        height={40}
                        unoptimized
                        className="h-10 w-10 object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-hairline">
                <div className="bg-tint-strong px-4 py-3 flex items-center justify-between gap-2">
                  <p className="text-dark text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Vị trí showroom
                  </p>
                  <a
                    href={CONTACT_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors whitespace-nowrap"
                  >
                    Mở Maps
                  </a>
                </div>
                <div className="relative aspect-[4/3] sm:aspect-video bg-tint [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:grayscale-[25%] [&_iframe]:contrast-[1.05] [&_iframe]:sepia-[15%] [&_iframe]:hue-rotate-[185deg] [&_iframe]:saturate-[0.85]">
                  <iframe
                    src={CONTACT_MAPS_EMBED_URL}
                    title={`Bản đồ ${ORGANIZATION_NAME}`}
                    className="border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="h-eyebrow">Hỏi đáp</p>
            <h2 className="text-dark">Câu hỏi thường gặp</h2>
            <p className="text-steel mb-6 text-sm">
              Giải đáp nhanh: liên hệ hotline hoặc Zalo nếu cần hỗ trợ thêm.
            </p>
            <ContactFaq />
          </motion.div>
        </div>
      </section>
    </>
  );
}
