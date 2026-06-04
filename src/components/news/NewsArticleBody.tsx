"use client";

import { SeoContentImage } from "@/components/SeoImage";
import { PromoBanner } from "@/components/ui/PromoBanner";
import type { NewsArticle } from "@/lib/content/news";
import {
  getArticlePromotionTargets,
  isEmotionalBreakSection,
  isPolicySection,
} from "@/lib/content/promotions";

type NewsArticleBodyProps = {
  article: NewsArticle;
};

function RichHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function NewsArticleBody({ article }: NewsArticleBodyProps) {
  const targets = getArticlePromotionTargets(article);
  const tocItems = article.sections.filter((s) => s.level === 2);
  let h2Index = -1;

  return (
    <article>
      <RichHtml
        html={article.sapoHtml}
        className="text-lg text-gray-700 leading-relaxed mb-8 border-l-4 border-primary pl-6"
      />

      {tocItems.length > 0 && (
        <nav
          aria-label="Mục lục bài viết"
          className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-6 border border-gray-100"
        >
          <p className="font-bold text-dark text-lg mb-4">📋 Mục lục</p>
          <ol className="space-y-2 list-decimal list-inside text-gray-700">
            {tocItems.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-primary hover:text-primary-dark font-medium hover:underline"
                >
                  {section.heading}
                </a>
              </li>
            ))}
            {article.faqs.length > 0 && (
              <li>
                <a
                  href="#cau-hoi-thuong-gap"
                  className="text-primary hover:text-primary-dark font-medium hover:underline"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
            )}
            <li>
              <a
                href="#ket-luan"
                className="text-primary hover:text-primary-dark font-medium hover:underline"
              >
                Kết luận
              </a>
            </li>
          </ol>
        </nav>
      )}

      <PromoBanner targets={targets} position="top" />

      <SeoContentImage
        src={article.image}
        alt={article.imageAlt}
        width={1200}
        height={630}
        className="w-full h-auto rounded-xl shadow-md mb-4 object-cover max-h-[500px]"
        sizes="(max-width: 896px) 100vw, 896px"
        priority
      />
      {article.imageCaption && (
        <p className="text-sm text-gray-500 text-center italic mb-10">
          {article.imageCaption}
        </p>
      )}

      <div className="prose prose-lg max-w-none text-gray-700">
        {article.sections.map((section) => {
          const HeadingTag = section.level === 2 ? "h2" : "h3";
          const currentH2Index =
            section.level === 2 ? ++h2Index : h2Index;
          const showPolicyPromo = isPolicySection(section);
          const showEmotionalAfter = isEmotionalBreakSection(
            section,
            currentH2Index,
          );

          return (
            <div key={section.id}>
              <section id={section.id} className="mb-10 scroll-mt-24">
                <HeadingTag className="text-2xl font-bold text-dark mb-4">
                  {section.heading}
                </HeadingTag>

                {section.paragraphs.map((para, idx) => (
                  <RichHtml
                    key={idx}
                    html={`<p class="mb-4 leading-relaxed">${para}</p>`}
                  />
                ))}

                {section.list &&
                  (section.list.ordered ? (
                    <ol className="list-decimal list-inside space-y-2 mb-6 ml-2">
                      {section.list.items.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <RichHtml html={item} className="inline" />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="list-disc list-inside space-y-2 mb-6 ml-2">
                      {section.list.items.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <RichHtml html={item} className="inline" />
                        </li>
                      ))}
                    </ul>
                  ))}

                {showPolicyPromo && (
                  <PromoBanner targets={targets} position="policy" />
                )}

                {section.image && (
                  <figure className="my-8">
                    <SeoContentImage
                      src={section.image.src}
                      alt={section.image.alt}
                      width={1200}
                      height={630}
                      className="w-full h-auto rounded-xl shadow-md object-cover"
                      sizes="(max-width: 896px) 100vw, 896px"
                    />
                    <figcaption className="text-sm text-gray-500 text-center italic mt-3">
                      {section.image.caption}
                    </figcaption>
                  </figure>
                )}
              </section>

              {showEmotionalAfter && (
                <PromoBanner targets={targets} position="middle" />
              )}
            </div>
          );
        })}

        {article.faqs.length > 0 && (
          <section id="cau-hoi-thuong-gap" className="mb-10 scroll-mt-24">
            <h2 className="text-2xl font-bold text-dark mb-6">
              ❓ Câu hỏi thường gặp
            </h2>
            {article.faqs.map((faq, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="text-xl font-bold text-dark mb-2">
                  {faq.question}
                </h3>
                <RichHtml
                  html={`<p class="leading-relaxed text-gray-700">${faq.answerHtml}</p>`}
                />
              </div>
            ))}
          </section>
        )}

        <section id="ket-luan" className="mb-10 scroll-mt-24">
          <h2 className="text-2xl font-bold text-dark mb-4">Kết luận</h2>
          <RichHtml
            html={article.conclusionHtml}
            className="leading-relaxed text-gray-700 mb-8"
          />
          <PromoBanner targets={targets} position="bottom" />
        </section>
      </div>

      <aside className="mt-12 pt-8 border-t border-gray-100">
        <div className="flex items-start gap-4 bg-gray-50 rounded-2xl p-6">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <p className="font-bold text-dark text-lg">{article.author.name}</p>
            <p className="text-primary text-sm font-semibold mb-2">
              {article.author.role}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </div>
      </aside>
    </article>
  );
}
