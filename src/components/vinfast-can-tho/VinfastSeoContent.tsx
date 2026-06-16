import { SeoLink } from "@/components/SeoLink";
import { VINFAST_CAN_THO_FAQ } from "@/lib/content/vinfast-can-tho";
import {
  VINFAST_SEO_INTRO,
  VINFAST_SEO_MODELS,
  VINFAST_SEO_WHY_US,
} from "@/lib/content/vinfast-can-tho-seo-content";

/**
 * Nội dung text HTML tĩnh — luôn hiển thị trong DOM cho crawler đọc,
 * không phụ thuộc tương tác JS.
 */
export function VinfastSeoContent() {
  return (
    <section
      className="py-12 sm:py-16 lg:py-20 bg-white border-t border-gray-100"
      aria-label="Thông tin đại lý VinFast Cần Thơ"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-headings:text-dark prose-headings:font-black prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700">

        <article>
          <h2 className="text-2xl sm:text-3xl !mt-0">
            {VINFAST_SEO_INTRO.heading}
          </h2>
          {VINFAST_SEO_INTRO.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </article>

        <article className="mt-10">
          <h2 className="text-2xl sm:text-3xl">{VINFAST_SEO_MODELS.heading}</h2>
          <p>{VINFAST_SEO_MODELS.intro}</p>
          {VINFAST_SEO_MODELS.models.map((model) => (
            <div key={model.name}>
              <h3 className="text-xl font-bold text-primary-dark !mt-6">
                {model.name}
              </h3>
              <p>{model.body}</p>
            </div>
          ))}
          <p>
            Xem chi tiết từng mẫu trong{" "}
            <SeoLink href="/san-pham" className="text-primary font-semibold hover:underline">
              danh mục ô tô VinFast
            </SeoLink>{" "}
            hoặc dùng bảng tính giá phía trên để so sánh giá lăn bánh theo từng
            dòng xe.
          </p>
        </article>

        <article className="mt-10">
          <h2 className="text-2xl sm:text-3xl">{VINFAST_SEO_WHY_US.heading}</h2>
          {VINFAST_SEO_WHY_US.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </article>

        <article className="mt-10" id="faq-noi-dung">
          <h2 className="text-2xl sm:text-3xl">
            Câu hỏi thường gặp về VinFast Cần Thơ
          </h2>
          <p>
            Dưới đây là các câu hỏi khách hàng thường đặt khi tìm hiểu{" "}
            <strong>đại lý VinFast Cần Thơ</strong> và{" "}
            <strong>giá xe VinFast tại Cần Thơ</strong> trong năm 2026:
          </p>
          <dl className="space-y-6 not-prose">
            {VINFAST_CAN_THO_FAQ.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-bold text-dark mb-2">
                  {item.question}
                </dt>
                <dd className="text-gray-700 leading-relaxed">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </section>
  );
}
