"use client";

import { motion } from "motion/react";
import { CheckCircle2, Download, MapPin, Phone, Mail, Clock } from "lucide-react";
import { SeoBannerImage, SeoContentImage } from "@/components/SeoImage";
import { SeoLink } from "@/components/SeoLink";
import { XanhSmFaq } from "@/components/xanhsm/XanhSmFaq";
import { XanhSmCtaButton as CtaButton } from "@/components/xanhsm/XanhSmCtaButton";
import {
  XANHSM_BASIC_REQUIREMENTS,
  XANHSM_DOCUMENTS,
  XANHSM_DRIVER_BENEFITS,
  XANHSM_INCOME_ROWS,
  XANHSM_ONLINE_STEPS,
  XANHSM_PAGE_H1,
  XANHSM_PARTNER_DOCUMENTS,
  XANHSM_PARTNER_INTRO,
  XANHSM_WHY_GF_BENEFITS,
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
    <div className="bg-light min-h-screen pb-20">
      <section className="bg-primary-dark text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="/banner-homepage.webp"
            alt="Đăng ký tài xế Xanh SM Cần Thơ — Cần Thơ GF"
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
            {XANHSM_PAGE_H1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto"
          >
            Bạn muốn trở thành tài xế Xanh SM tại Cần Thơ nhưng chưa biết bắt đầu từ đâu?{" "}
            <strong>Hợp tác xã vận tải Cần Thơ GF</strong> – đối tác chính thức của Xanh SM tại khu
            vực Đồng bằng Sông Cửu Long – sẽ hướng dẫn bạn toàn bộ quy trình{" "}
            <strong>đăng ký tài xế Xanh SM Cần Thơ</strong> từ A đến Z, hoàn toàn miễn phí.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <CtaButton />
          </motion.div>
        </div>
      </section>

      <section
        className="py-12 sm:py-16 lg:py-20 bg-white border-b border-gray-100"
        aria-label="Hướng dẫn đăng ký tài xế Xanh SM Cần Thơ"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-headings:text-dark prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">
          <article>
            <h2 className="text-2xl sm:text-3xl !mt-0">Tại Sao Nên Đăng Ký Qua Cần Thơ GF?</h2>
            <p>
              Khác với việc đăng ký trực tiếp qua website Xanh SM, khi đăng ký qua Cần Thơ GF bạn
              được hưởng thêm nhiều quyền lợi đặc biệt:
            </p>
            <ul>
              {XANHSM_WHY_GF_BENEFITS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">Thu Nhập Tài Xế Xanh SM Cần Thơ Thực Tế</h2>
            <p>Đây là câu hỏi nhiều người quan tâm nhất trước khi quyết định đăng ký.</p>
            <div className="not-prose overflow-x-auto rounded-xl border border-gray-200 my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary-dark text-white">
                    <th className="px-4 py-3 text-left font-bold">Loại hình</th>
                    <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
                      Thu nhập trung bình/tháng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {XANHSM_INCOME_ROWS.map((row) => (
                    <tr key={row.type} className="border-t border-gray-100 even:bg-gray-50/60">
                      <td className="px-4 py-3 text-gray-700">{row.type}</td>
                      <td className="px-4 py-3 font-semibold text-primary-dark whitespace-nowrap">
                        {row.income}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <blockquote className="border-l-4 border-secondary bg-secondary/5 px-4 py-3 not-italic text-gray-700">
              <strong>Lưu ý:</strong> Thu nhập thực tế phụ thuộc vào giờ cao điểm, khu vực hoạt
              động và mức độ hoàn thành chuyến đi. Cần Thơ GF sẽ tư vấn lịch chạy tối ưu nhất cho
              bạn.
            </blockquote>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">Điều Kiện Đăng Ký Tài Xế Xanh SM Cần Thơ</h2>
            <p>Trước khi nộp hồ sơ, bạn cần đáp ứng các yêu cầu sau:</p>
            <h3 className="text-xl font-bold text-primary-dark">Điều Kiện Cơ Bản</h3>
            <ul>
              {XANHSM_BASIC_REQUIREMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="text-xl font-bold text-primary-dark">Hồ Sơ Cần Chuẩn Bị</h3>
            <ol>
              {XANHSM_DOCUMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p>
              <strong>Mẹo:</strong> Cần Thơ GF hỗ trợ hướng dẫn xin giấy khám sức khỏe đúng mẫu,
              tránh phải đi lại nhiều lần.
            </p>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">
              Hướng Dẫn Đăng Ký Tài Xế Xanh SM Cần Thơ Step-by-Step
            </h2>
            <h3 className="text-xl font-bold text-primary-dark">
              Cách 1 – Đăng Ký Online Qua Cần Thơ GF (Nhanh Nhất)
            </h3>
            <ol>
              {XANHSM_ONLINE_STEPS.map((step, index) => (
                <li key={step}>
                  <strong>Bước {index + 1}:</strong> {step}
                </li>
              ))}
            </ol>
            <h3 className="text-xl font-bold text-primary-dark">
              Cách 2 – Đến Trực Tiếp Văn Phòng Cần Thơ GF
            </h3>
            <ul>
              <li>
                <strong>Địa chỉ:</strong> {CONTACT_ADDRESS}
              </li>
              <li>
                <strong>Giờ làm việc:</strong> {CONTACT_HOURS_WEEKDAY}
              </li>
              <li>
                <strong>Điện thoại:</strong>{" "}
                <a href="tel:+84969991177" className="text-primary font-semibold hover:underline">
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </article>

          <article className="mt-10">
            <h2 className="text-2xl sm:text-3xl">Quyền Lợi Tài Xế Xanh SM Cần Thơ</h2>
            <p>Khi chính thức trở thành đối tác tài xế Xanh SM, bạn được hưởng:</p>
            <ul>
              {XANHSM_DRIVER_BENEFITS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Cần xe điện VinFast để chạy dịch vụ? Xem{" "}
              <SeoLink href="/san-pham/vf5" className="text-primary font-semibold hover:underline">
                VinFast VF 5
              </SeoLink>
              ,{" "}
              <SeoLink
                href="/san-pham/herio-green"
                className="text-primary font-semibold hover:underline"
              >
                Herio Green
              </SeoLink>{" "}
              và{" "}
              <SeoLink href="/san-pham" className="text-primary font-semibold hover:underline">
                danh mục xe VinFast
              </SeoLink>{" "}
              tại Cần Thơ GF.
            </p>
          </article>

          <article className="mt-10" id="dang-ky-partner">
            <h2 className="text-2xl sm:text-3xl">
              Đăng Ký Xanh SM Partner — Dành Cho Chủ Xe VinFast
            </h2>
            <p>{XANHSM_PARTNER_INTRO}</p>
            <h3 className="text-xl font-bold text-primary-dark">
              Hồ Sơ Cần Chuẩn Bị Để Đăng Ký App Partner
            </h3>
            <ol>
              {XANHSM_PARTNER_DOCUMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p>
              <strong>Lưu ý:</strong> Số điện thoại và email dùng để đăng ký app Partner phải là
              số/email <strong>chưa từng đăng ký</strong> tài khoản Xanh SM hoặc Grab trước đó.
              Cần Thơ GF sẽ hỗ trợ bạn kiểm tra và xử lý các trường hợp trùng thông tin.
            </p>
            <p>
              Đây là hình thức phù hợp cho chủ xe muốn tự vận hành xe của mình để chạy dịch vụ mà
              không cần thuê xe từ hợp tác xã. Liên hệ Cần Thơ GF để được hướng dẫn từng bước đăng
              ký Partner cho cả hai nền tảng Xanh SM và Grab tại Cần Thơ.
            </p>
            <p>
              Không ở Cần Thơ? Xem{" "}
              <SeoLink
                href={XANHSM_PARTNER_HUB_PATH}
                className="text-primary font-semibold hover:underline"
              >
                danh sách khu vực Cần Thơ GF hỗ trợ đăng ký Xanh SM Partner
              </SeoLink>{" "}
              (TPHCM, Vũng Tàu, Phú Quốc và các tỉnh lân cận).
            </p>
            <div className="not-prose mt-4">
              <CtaButton />
            </div>
          </article>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-light" id="faq-xanhsm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-dark mb-3 text-center">
            Câu Hỏi Thường Gặp Về Đăng Ký Xanh SM Cần Thơ
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Giải đáp nhanh các thắc mắc phổ biến trước khi bạn nộp hồ sơ tài xế.
          </p>
          <XanhSmFaq />
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-primary-dark text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">Liên Hệ Đăng Ký Ngay Hôm Nay</h2>
          <p className="text-gray-300 mb-8">
            Đừng để cơ hội tăng thu nhập bị bỏ lỡ. Hãy liên hệ Cần Thơ GF ngay hôm nay:
          </p>
          <ul className="text-left max-w-md mx-auto space-y-3 mb-10 text-gray-200">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Hotline/Zalo:</strong>{" "}
                <a
                  href={CONTACT_ZALO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:underline"
                >
                  {CONTACT_PHONE}
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Địa chỉ:</strong> {CONTACT_ADDRESS}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Email:</strong> {CONTACT_EMAIL}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>
                <strong>Giờ làm việc:</strong> {CONTACT_HOURS_WEEKDAY}; {CONTACT_HOURS_SUNDAY}
              </span>
            </li>
          </ul>
          <CtaButton />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-black text-dark mb-4 text-center">
              Khách Hàng — Tải Ứng Dụng XanhSM
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Trải nghiệm dịch vụ di chuyển 5 sao với dàn xe điện VinFast 100% mới, không mùi, không
              tiếng ồn động cơ.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <ul className="space-y-3">
                {[
                  "100% xe điện VinFast cao cấp, êm ái",
                  "Không mùi xăng dầu, không tiếng ồn",
                  "Tài xế chuyên nghiệp, thân thiện",
                  "Giá cước minh bạch, nhiều ưu đãi",
                ].map((item) => (
                  <li key={item} className="flex items-start text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-2 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
                <li className="flex flex-col sm:flex-row gap-3 pt-4">
                  <a
                    href={GREEN_SM_APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-dark hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" /> App Store
                  </a>
                  <a
                    href={GREEN_SM_GOOGLE_PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 mr-2" /> Google Play
                  </a>
                </li>
              </ul>
              <div className="flex justify-center">
                <div className="relative w-56 h-[440px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
                  <SeoContentImage
                    src="/mockup-xanh-sm.jpg"
                    alt="App Green SM — Ứng dụng XanhSM đặt xe điện tại Cần Thơ"
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
    </div>
  );
}
