"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  ChevronDown,
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
  CONTACT_ZALO_URL,
  ORGANIZATION_NAME,
  dispatchConsultationPopup,
} from "@/lib/contact";

function BrandIllustration() {
  return (
    <svg
      viewBox="0 0 400 280"
      className="w-full max-w-md mx-auto text-primary/90"
      aria-hidden
    >
      <defs>
        <linearGradient id="contact-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#103B7C" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00B5B8" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect x="20" y="40" width="360" height="200" rx="24" fill="url(#contact-grad)" />
      <rect x="48" y="72" width="120" height="8" rx="4" fill="currentColor" opacity="0.35" />
      <rect x="48" y="92" width="200" height="6" rx="3" fill="currentColor" opacity="0.2" />
      <rect x="48" y="108" width="160" height="6" rx="3" fill="currentColor" opacity="0.2" />
      <path
        d="M240 160h80l20 40H220l20-40z M200 200h160v16H200z M220 176h40l-8 24h-24l-8-24z"
        fill="currentColor"
        opacity="0.45"
      />
      <circle cx="230" cy="216" r="14" fill="#103B7C" opacity="0.5" />
      <circle cx="330" cy="216" r="14" fill="#103B7C" opacity="0.5" />
      <rect x="280" y="88" width="72" height="48" rx="8" fill="#00B5B8" opacity="0.35" />
      <path
        d="M48 200 Q120 140 200 180 T360 160"
        stroke="#00B5B8"
        strokeWidth="3"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {CONTACT_FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-dark hover:bg-gray-50 transition-colors"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-primary transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="bg-light min-h-screen pb-16">
      <section className="relative overflow-hidden bg-primary-dark text-white py-16 md:py-20">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #00B5B8 0%, transparent 45%),
              radial-gradient(circle at 80% 20%, #103B7C 0%, transparent 50%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
                Liên hệ
              </p>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                Kết nối với {ORGANIZATION_NAME}
              </h1>
              <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                Tư vấn VinFast, đăng ký XanhSM và hỗ trợ sau bán — đội ngũ Cần Thơ GF sẵn sàng
                đồng hành cùng bạn tại ĐBSCL.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm">
                <Zap className="w-4 h-4 text-secondary shrink-0" />
                <span>{CONTACT_RESPONSE_PROMISE}</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="hidden sm:block"
            >
              <BrandIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Cột CTA liên hệ nhanh */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-6 p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
                  <MessageCircle className="w-5 h-5 text-secondary-dark shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <strong className="text-dark">{CONTACT_RESPONSE_PROMISE}</strong>
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-dark mb-2">Liên hệ ngay</h2>
                <p className="text-gray-600 mb-8 text-sm flex-grow">
                  Gọi hotline, nhắn Zalo hoặc xem đầy đủ thông tin tư vấn viên trong một bước.
                </p>

                <div className="space-y-4 mt-auto">
                  <motion.a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg text-lg min-h-[3.5rem] touch-manipulation"
                  >
                    <Phone className="w-5 h-5" />
                    Gọi {CONTACT_PHONE}
                  </motion.a>

                  <motion.a
                    href={CONTACT_ZALO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-3 bg-[#0068FF] hover:bg-[#0058d9] text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-md min-h-[3.5rem] touch-manipulation"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                      <Image
                        src="/logo_zalo.png"
                        alt=""
                        width={28}
                        height={28}
                        className="h-6 w-auto object-contain"
                        aria-hidden
                      />
                    </span>
                    Kết nối Zalo tư vấn viên
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={dispatchConsultationPopup}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-secondary hover:bg-secondary-dark text-dark font-black py-4 px-8 rounded-xl transition-colors shadow-lg text-lg uppercase tracking-wide min-h-[3.5rem] touch-manipulation"
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
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-dark mb-6">Thông tin doanh nghiệp</h2>
                <p className="font-bold text-primary-dark text-lg mb-6">{ORGANIZATION_NAME}</p>

                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <MapPin className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Địa chỉ
                      </p>
                      <p className="text-gray-700 leading-relaxed">{CONTACT_ADDRESS}</p>
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
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Phone className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Hotline
                      </p>
                      <a
                        href={`tel:${CONTACT_PHONE_TEL}`}
                        className="text-xl font-bold text-primary-dark hover:text-primary transition-colors"
                      >
                        {CONTACT_PHONE}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Building2 className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Mã số thuế
                      </p>
                      <p className="text-gray-700 font-semibold">{CONTACT_TAX_ID}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Mail className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="text-gray-700 font-medium hover:text-primary break-all"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Clock className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                        Giờ làm việc
                      </p>
                      <p className="text-gray-700">{CONTACT_HOURS_WEEKDAY}</p>
                      <p className="text-gray-700">{CONTACT_HOURS_SUNDAY}</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
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
                        alt="Facebook Cần Thơ GF"
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
                      className="block h-10 shrink-0 opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src="/logo_zalo.png"
                        alt="Zalo"
                        width={80}
                        height={40}
                        className="h-10 w-auto max-w-[5.5rem] object-contain"
                      />
                    </a>
                    <a
                      href={CONTACT_TIKTOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="TikTok"
                      className="block h-10 w-10 opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src="/logo_tiktok.png"
                        alt="TikTok"
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-primary/15 ring-4 ring-primary/5">
                <div className="bg-primary-dark px-4 py-3 flex items-center justify-between gap-2">
                  <p className="text-white text-sm font-semibold flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-secondary" />
                    Vị trí showroom
                  </p>
                  <a
                    href={CONTACT_MAPS_DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-secondary hover:text-white transition-colors whitespace-nowrap"
                  >
                    Mở Maps
                  </a>
                </div>
                <div className="relative aspect-[4/3] sm:aspect-video bg-gray-100 [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:grayscale-[25%] [&_iframe]:contrast-[1.05] [&_iframe]:sepia-[15%] [&_iframe]:hue-rotate-[185deg] [&_iframe]:saturate-[0.85]">
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

      <section className="py-12 md:py-16 bg-gray-50/80 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-dark text-center mb-2">
              Câu hỏi thường gặp
            </h2>
            <p className="text-gray-600 text-center mb-8 text-sm">
              Giải đáp nhanh — liên hệ hotline hoặc Zalo nếu cần hỗ trợ thêm.
            </p>
            <ContactFaq />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
