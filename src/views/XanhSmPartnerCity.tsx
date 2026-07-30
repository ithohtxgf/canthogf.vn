"use client";

import { motion } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import { SeoBannerImage } from "@/components/SeoImage";
import { SeoLink } from "@/components/SeoLink";
import { XanhSmFaq } from "@/components/xanhsm/XanhSmFaq";
import { XanhSmCtaButton } from "@/components/xanhsm/XanhSmCtaButton";
import { XANHSM_PAGE_PATH, XANHSM_PARTNER_DOCUMENTS } from "@/lib/content/xanhsm-page";
import {
  getPartnerCityBySlug,
  XANHSM_PARTNER_CITIES,
  XANHSM_PARTNER_HUB_PATH,
} from "@/lib/content/xanhsm-partner-cities";
import { CONTACT_PHONE, CONTACT_ZALO_URL } from "@/lib/contact";

export default function XanhSmPartnerCity({ citySlug }: { citySlug: string }) {
  const city = getPartnerCityBySlug(citySlug);

  if (!city) {
    return null;
  }

  const otherCities = XANHSM_PARTNER_CITIES.filter((item) => item.slug !== city.slug).slice(
    0,
    4,
  );

  return (
    <div className="bg-light min-h-screen pb-20">
      <section className="bg-primary-dark text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="/banner-homepage.webp"
            alt={`Đăng ký Xanh SM Partner tại ${city.displayName} — Cần Thơ GF`}
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="breadcrumb" className="text-sm text-gray-300 mb-4">
            <SeoLink href="/" className="hover:underline">
              Trang chủ
            </SeoLink>{" "}
            /{" "}
            <SeoLink href={XANHSM_PARTNER_HUB_PATH} className="hover:underline">
              Đăng ký Xanh SM Partner
            </SeoLink>{" "}
            / <span>{city.displayName}</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6"
          >
            {city.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            {city.intro}
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-headings:text-dark prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
          <article>
            <h2 className="text-2xl sm:text-3xl !mt-0">
              Hồ Sơ Cần Chuẩn Bị Để Đăng Ký Xanh SM Partner Tại {city.displayName}
            </h2>
            <ol>
              {XANHSM_PARTNER_DOCUMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p>
              <strong>Lưu ý:</strong> Số điện thoại và email dùng để đăng ký app Partner phải là
              số/email <strong>chưa từng đăng ký</strong> tài khoản Xanh SM hoặc Grab trước đó.
            </p>
            <blockquote className="border-l-4 border-secondary bg-secondary/5 px-4 py-3 not-italic text-gray-700">
              {city.localNote}
            </blockquote>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">
              Cần Thơ GF Hỗ Trợ Tài Xế Tại {city.displayName} Như Thế Nào?
            </h2>
            <p>
              Cần Thơ GF là hợp tác xã vận tải đặt trụ sở tại Cần Thơ, hỗ trợ tư vấn và hướng dẫn
              đăng ký Xanh SM Partner <strong>từ xa qua Zalo/hotline</strong> cho chủ xe VinFast
              tại {city.name} và nhiều tỉnh thành khác — hoàn toàn miễn phí, không cần đến tận
              văn phòng.
            </p>
            <ul>
              <li>Tư vấn 1-1 qua Zalo/điện thoại</li>
              <li>Hướng dẫn chuẩn bị hồ sơ, kiểm tra tránh sai sót</li>
              <li>Theo dõi tiến độ xét duyệt app Partner</li>
              <li>Hỗ trợ xử lý các vướng mắc trong quá trình đăng ký</li>
            </ul>
            <p>
              <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="text-primary font-semibold hover:underline">
                <Phone className="inline w-4 h-4 mr-1" />
                {CONTACT_PHONE}
              </a>{" "}
              hoặc{" "}
              <a
                href={CONTACT_ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                nhắn Zalo
              </a>{" "}
              để được tư vấn ngay.
            </p>
          </article>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-light" id={`faq-xanhsm-partner-${city.slug}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-3 text-center">
            Câu Hỏi Thường Gặp — Xanh SM Partner Tại {city.displayName}
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Giải đáp nhanh các thắc mắc phổ biến trước khi bạn đăng ký.
          </p>
          <XanhSmFaq items={city.faq} />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-dark mb-6">
            Khu Vực Khác Cần Thơ GF Cũng Hỗ Trợ
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {otherCities.map((item) => (
              <SeoLink
                key={item.slug}
                href={`/dang-ky-xanhsm-partner/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition-colors"
              >
                <MapPin className="w-4 h-4" />
                {item.displayName}
              </SeoLink>
            ))}
            <SeoLink
              href={XANHSM_PARTNER_HUB_PATH}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition-colors"
            >
              Xem tất cả khu vực
            </SeoLink>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Chưa có xe? Xem{" "}
            <SeoLink href={XANHSM_PAGE_PATH} className="text-primary font-semibold hover:underline">
              hướng dẫn đăng ký tài xế Xanh SM Cần Thơ
            </SeoLink>
            .
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">
            Đăng Ký Xanh SM Partner Tại {city.displayName} Ngay Hôm Nay
          </h2>
          <p className="text-gray-300 mb-8">
            Liên hệ Cần Thơ GF để được tư vấn miễn phí, hướng dẫn hồ sơ và theo dõi tiến độ đăng
            ký.
          </p>
          <XanhSmCtaButton />
        </div>
      </section>
    </div>
  );
}
