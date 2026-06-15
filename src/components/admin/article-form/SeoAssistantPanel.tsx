"use client";

import { useEffect, useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { AdminButton, AdminField, adminInputClass } from "@/components/admin/AdminShell";
import type { NewsCategory, NewsContentSection, NewsFaq } from "@/lib/content/news";
import type { SeoAssistantSuggestion } from "@/lib/admin/seo-assistant-types";
import { outlineToSections } from "@/lib/admin/seo-assistant-types";
import { NEWS_CATEGORY_LABELS } from "@/lib/content/news";

type SeoAssistantPanelProps = {
  topic: string;
  primaryKeyword: string;
  category: NewsCategory;
  onApplyMetaTitle: (value: string) => void;
  onApplyMetaDescription: (value: string) => void;
  onApplyH1AndSlug: (title: string, slug: string) => void;
  onApplyKeywords: (keywords: string[]) => void;
  onApplyOutline: (sections: NewsContentSection[]) => void;
  onApplyFaqs: (faqs: NewsFaq[], mode: "replace" | "append") => void;
  onApplySapo: (html: string) => void;
  onApplyConclusion: (html: string) => void;
};

function SuggestionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-slate-100 rounded-xl p-4 space-y-2">
      <p className="text-sm font-bold text-slate-800">{title}</p>
      {children}
    </div>
  );
}

export function SeoAssistantPanel({
  topic: initialTopic,
  primaryKeyword,
  category,
  onApplyMetaTitle,
  onApplyMetaDescription,
  onApplyH1AndSlug,
  onApplyKeywords,
  onApplyOutline,
  onApplyFaqs,
  onApplySapo,
  onApplyConclusion,
}: SeoAssistantPanelProps) {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState(initialTopic);
  const [topicTouched, setTopicTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<SeoAssistantSuggestion | null>(null);

  useEffect(() => {
    if (!topicTouched && initialTopic) {
      setTopic(initialTopic);
    }
  }, [initialTopic, topicTouched]);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setResult(null);

    const res = await fetch("/api/admin/seo-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, primaryKeyword, category }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Gợi ý thất bại");
      return;
    }

    const data = (await res.json()) as { suggestion: SeoAssistantSuggestion };
    setResult(data.suggestion);
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-primary/20 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900">Trợ lý SEO (AI)</p>
            <p className="text-xs text-slate-500">
              Gợi ý meta, outline, FAQ — bạn chọn &quot;Áp dụng&quot;, không ghi đè tự động
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-primary/10 bg-white/60">
          <div className="grid md:grid-cols-3 gap-3 pt-4">
            <AdminField label="Chủ đề bài viết">
              <input
                className={adminInputClass}
                value={topic}
                onChange={(e) => {
                  setTopicTouched(true);
                  setTopic(e.target.value);
                }}
                placeholder="VD: Đánh giá VinFast VF5 tại Cần Thơ"
              />
            </AdminField>
            <AdminField label="Từ khóa chính (từ tab SEO)">
              <input
                className={adminInputClass}
                value={primaryKeyword}
                readOnly
                placeholder="Nhập ở tab SEO trước"
              />
            </AdminField>
            <AdminField label="Danh mục">
              <input
                className={adminInputClass}
                value={NEWS_CATEGORY_LABELS[category]}
                readOnly
              />
            </AdminField>
          </div>

          <AdminButton
            type="button"
            onClick={handleGenerate}
            disabled={loading || !topic.trim() || !primaryKeyword.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                Đang gợi ý...
              </>
            ) : (
              "Tạo gợi ý SEO"
            )}
          </AdminButton>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {result && (
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              <SuggestionBlock title="Meta Title (chọn 1)">
                {result.metaTitles.map((title, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-2 text-sm bg-slate-50 rounded-lg p-2"
                  >
                    <span>
                      <span className="text-slate-400 mr-2">{title.length} ký tự</span>
                      {title}
                    </span>
                    <AdminButton
                      type="button"
                      variant="secondary"
                      className="!py-1 !px-2 text-xs shrink-0"
                      onClick={() => onApplyMetaTitle(title)}
                    >
                      Áp dụng
                    </AdminButton>
                  </div>
                ))}
              </SuggestionBlock>

              <SuggestionBlock title="Meta Description (chọn 1)">
                {result.metaDescriptions.map((desc, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-2 text-sm bg-slate-50 rounded-lg p-2"
                  >
                    <span>
                      <span className="text-slate-400 mr-2">{desc.length} ký tự</span>
                      {desc}
                    </span>
                    <AdminButton
                      type="button"
                      variant="secondary"
                      className="!py-1 !px-2 text-xs shrink-0"
                      onClick={() => onApplyMetaDescription(desc)}
                    >
                      Áp dụng
                    </AdminButton>
                  </div>
                ))}
              </SuggestionBlock>

              <SuggestionBlock title="H1 & Slug">
                <p className="text-sm text-slate-700">{result.suggestedH1}</p>
                <p className="text-xs font-mono text-slate-400">
                  /tin-tuc/{result.suggestedSlug}
                </p>
                <AdminButton
                  type="button"
                  variant="secondary"
                  className="!py-1 !px-3 text-xs"
                  onClick={() =>
                    onApplyH1AndSlug(result.suggestedH1, result.suggestedSlug)
                  }
                >
                  Áp dụng H1 + Slug
                </AdminButton>
              </SuggestionBlock>

              <SuggestionBlock title="LSI Keywords">
                <p className="text-sm text-slate-600">
                  {result.lsiKeywords.join(", ")}
                </p>
                <AdminButton
                  type="button"
                  variant="secondary"
                  className="!py-1 !px-3 text-xs"
                  onClick={() => onApplyKeywords(result.lsiKeywords)}
                >
                  Áp dụng từ khóa phụ
                </AdminButton>
              </SuggestionBlock>

              <SuggestionBlock title="Internal link gợi ý">
                <ul className="text-sm text-slate-600 space-y-1">
                  {result.internalLinks.map((link, i) => (
                    <li key={i}>
                      <code className="text-xs bg-slate-100 px-1 rounded">
                        {link.href}
                      </code>{" "}
                      — {link.anchorText}
                    </li>
                  ))}
                </ul>
              </SuggestionBlock>

              <SuggestionBlock title={`Outline (${result.outline.length} section)`}>
                <ul className="text-sm text-slate-600 space-y-1 mb-2">
                  {result.outline.map((item) => (
                    <li key={item.id}>
                      <span className="font-semibold">H{item.level}</span> {item.heading}
                    </li>
                  ))}
                </ul>
                <AdminButton
                  type="button"
                  variant="secondary"
                  className="!py-1 !px-3 text-xs"
                  onClick={() => onApplyOutline(outlineToSections(result.outline))}
                >
                  Áp dụng outline → Sections
                </AdminButton>
              </SuggestionBlock>

              <SuggestionBlock title="FAQ (2 câu)">
                {result.faqs.map((faq, i) => (
                  <p key={i} className="text-sm text-slate-600">
                    <strong>{faq.question}</strong>
                  </p>
                ))}
                <div className="flex gap-2">
                  <AdminButton
                    type="button"
                    variant="secondary"
                    className="!py-1 !px-3 text-xs"
                    onClick={() => onApplyFaqs(result.faqs, "replace")}
                  >
                    Thay FAQ
                  </AdminButton>
                  <AdminButton
                    type="button"
                    variant="secondary"
                    className="!py-1 !px-3 text-xs"
                    onClick={() => onApplyFaqs(result.faqs, "append")}
                  >
                    Thêm vào FAQ
                  </AdminButton>
                </div>
              </SuggestionBlock>

              <SuggestionBlock title="Sapo">
                <div
                  className="text-sm text-slate-700 border-l-4 border-primary pl-3"
                  dangerouslySetInnerHTML={{ __html: result.sapoHtml }}
                />
                <AdminButton
                  type="button"
                  variant="secondary"
                  className="!py-1 !px-3 text-xs mt-2"
                  onClick={() => onApplySapo(result.sapoHtml)}
                >
                  Áp dụng Sapo
                </AdminButton>
              </SuggestionBlock>

              <SuggestionBlock title="Kết luận">
                <div
                  className="text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: result.conclusionHtml }}
                />
                <AdminButton
                  type="button"
                  variant="secondary"
                  className="!py-1 !px-3 text-xs mt-2"
                  onClick={() => onApplyConclusion(result.conclusionHtml)}
                >
                  Áp dụng kết luận
                </AdminButton>
              </SuggestionBlock>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
