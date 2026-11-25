"use client";

import { MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/evg/PageHero";
import { SeoLink } from "@/components/SeoLink";
import { XanhSmFaq } from "@/components/xanhsm/XanhSmFaq";
import { XanhSmCtaButton } from "@/components/xanhsm/XanhSmCtaButton";
import {
  XANHSM_PAGE_PATH,
  XANHSM_PARTNER_DOCUMENTS,
  XANHSM_PARTNER_STEPS,
} from "@/lib/content/xanhsm-page";
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

  // Liệt kê toàn bộ khu vực còn lại — đảm bảo mesh internal link phủ đều 6/6,
  // tránh các trang cuối mảng (vd. Đồng Nai) bị thiệt link chéo so với đầu mảng.
  const otherCities = XANHSM_PARTNER_CITIES.filter((item) => item.slug !== city.slug);

  return (
    <>
      <PageHero
        title={city.h1}
        eyebrow="Xanh SM Partner"
        crumbs={[
          { href: XANHSM_PARTNER_HUB_PATH, label: "Đăng ký Xanh SM Partner" },
          { href: `${XANHSM_PARTNER_HUB_PATH}/${city.slug}`, label: city.displayName },
        ]}
        image="/banner-homepage.webp"
        summary={
          <>
            <span className="block mb-6">{city.intro}</span>
            <XanhSmCtaButton className="!bg-sky !text-dark hover:!bg-white" />
          </>
        }
      />

      <section className="p-body">
        <div className="wrap"><div className="prose !pt-0">
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
            <blockquote className="not-italic">
              {city.localNote}
            </blockquote>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">
              Quy Trình Đăng Ký Xanh SM Partner Tại {city.displayName}, Từng Bước
            </h2>
            <ol>
              {XANHSM_PARTNER_STEPS.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}.</strong> {step.description}
                </li>
              ))}
            </ol>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">
              Cần Thơ EV Hỗ Trợ Tài Xế Tại {city.displayName} Như Thế Nào?
            </h2>
            <p>
              Cần Thơ EV là hợp tác xã vận tải đặt trụ sở tại Cần Thơ, hỗ trợ tư vấn và hướng dẫn
              đăng ký Xanh SM Partner <strong>từ xa qua Zalo/hotline</strong> cho chủ xe VinFast
              tại {city.name} và nhiều tỉnh thành khác: hoàn toàn miễn phí, không cần đến tận
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
        </div></div>
      </section>

      <section className="h-sec scroll-mt-24" id={`faq-xanhsm-partner-${city.slug}`}>
        <div className="wrap">
          <p className="h-eyebrow">Hỏi đáp</p>
          <h2 className="text-dark">
            Câu Hỏi Thường Gặp: Xanh SM Partner Tại {city.displayName}
          </h2>
          <p className="text-steel mb-6">
            Giải đáp nhanh các thắc mắc phổ biến trước khi bạn đăng ký.
          </p>
          <XanhSmFaq items={city.faq} />
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <p className="h-eyebrow">Khu vực</p>
          <h2 className="text-dark">
            Khu Vực Khác Cần Thơ EV Cũng Hỗ Trợ
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCities.map((item) => (
              <SeoLink
                key={item.slug}
                href={`/dang-ky-xanhsm-partner/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-4 py-2 text-sm font-semibold text-dark hover:border-sky hover:text-primary transition-colors"
              >
                <MapPin className="w-4 h-4 text-sky" />
                {item.displayName}
              </SeoLink>
            ))}
            <SeoLink
              href={XANHSM_PARTNER_HUB_PATH}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
            >
              Xem tất cả khu vực
            </SeoLink>
          </div>
          <p className="text-steel text-sm mt-6">
            Chưa có xe? Xem{" "}
            <SeoLink href={XANHSM_PAGE_PATH} className="text-primary font-semibold hover:underline">
              hướng dẫn đăng ký tài xế Xanh SM Cần Thơ
            </SeoLink>
            .
          </p>
        </div>
      </section>

      <section className="h-sec">
        <div className="wrap">
          <div className="h-cta">
            <div>
              <p className="h-eyebrow">Tư vấn miễn phí</p>
              <h2 className="text-dark">
                Đăng Ký Xanh SM Partner Tại {city.displayName} Ngay Hôm Nay
              </h2>
              <p>
                Liên hệ Cần Thơ EV để được tư vấn miễn phí, hướng dẫn hồ sơ và theo dõi tiến độ đăng
                ký.
              </p>
            </div>
            <XanhSmCtaButton />
          </div>
        </div>
      </section>
    </>
  );
}
