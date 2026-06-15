"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Eye, ExternalLink } from "lucide-react";
import {
  AdminButton,
  AdminField,
  adminInputClass,
} from "@/components/admin/AdminShell";
import { SeoChecklistPanel } from "@/components/admin/article-form/SeoChecklistPanel";
import { SectionBuilder } from "@/components/admin/article-form/SectionBuilder";
import { ArticleImageUpload } from "@/components/admin/article-form/ArticleImageUpload";
import { SimpleHtmlEditor } from "@/components/admin/article-form/SimpleHtmlEditor";
import { TocPreview } from "@/components/admin/article-form/TocPreview";
import { SeoAssistantPanel } from "@/components/admin/article-form/SeoAssistantPanel";
import type { ArticleInput } from "@/lib/db/article-mapper";
import { NEWS_CATEGORY_LABELS, type NewsCategory, type NewsFaq } from "@/lib/content/news";
import { slugify } from "@/lib/admin/defaults";
import {
  ARTICLE_FORM_TABS,
  AUTHOR_PRESETS,
  CTA_HREF_OPTIONS,
  type ArticleFormTabId,
} from "@/lib/admin/article-form-config";
import {
  buildSeoChecklist,
  validateForPublish,
} from "@/lib/admin/article-seo-checklist";

type ArticleFormProps = {
  initial: ArticleInput;
  mode: "create" | "edit";
};

function charCountClass(length: number, min: number, max: number): string {
  if (length >= min && length <= max) return "text-green-600";
  if (length > max) return "text-red-600";
  return "text-amber-600";
}

export function ArticleForm({ initial, mode }: ArticleFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ArticleFormTabId>("seo");
  const [form, setForm] = useState<ArticleInput>(initial);
  const [keywordsText, setKeywordsText] = useState(initial.keywords.join(", "));
  const [ctaHrefMode, setCtaHrefMode] = useState<string>(() => {
    const match = CTA_HREF_OPTIONS.find((o) => o.value === initial.cta.href);
    return match ? match.value : "__custom__";
  });
  const [error, setError] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const slugPreview = useMemo(
    () => form.id || slugify(form.title),
    [form.id, form.title],
  );

  const draftPayload = useMemo((): ArticleInput => {
    return {
      ...form,
      id: (form.id || slugify(form.title)).trim(),
      keywords: keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      imageCaption: form.imageCaption || undefined,
    };
  }, [form, keywordsText]);

  const seoChecklist = useMemo(
    () => buildSeoChecklist(draftPayload),
    [draftPayload],
  );

  function updateField<K extends keyof ArticleInput>(
    key: K,
    value: ArticleInput[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateFaq(index: number, patch: Partial<NewsFaq>) {
    updateField(
      "faqs",
      form.faqs.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    );
  }

  function addFaq() {
    updateField("faqs", [...form.faqs, { question: "", answerHtml: "" }]);
  }

  function removeFaq(index: number) {
    updateField(
      "faqs",
      form.faqs.filter((_, i) => i !== index),
    );
  }

  async function saveArticle(
    status: ArticleInput["status"],
    options?: { redirect?: boolean; openPreview?: boolean },
  ): Promise<string | null> {
    setSaving(true);
    setError("");
    setWarnings([]);

    const payload: ArticleInput = {
      ...draftPayload,
      status,
    };

    if (status === "published") {
      const validation = validateForPublish(payload);
      setWarnings(validation.warnings);
      if (!validation.canPublish) {
        setError(validation.errors.join(" "));
        setSaving(false);
        setActiveTab("seo");
        return null;
      }
    }

    const url =
      mode === "create"
        ? "/api/admin/articles"
        : `/api/admin/articles/${encodeURIComponent(initial.id)}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = (await res.json()) as {
        error?: string;
        warnings?: string[];
      };
      if (data.warnings?.length) setWarnings(data.warnings);
      setError(data.error ?? "Lưu thất bại");
      return null;
    }

    const data = (await res.json()) as {
      article?: ArticleInput;
      publicUrl?: string;
    };
    const savedId = payload.id;
    const publicUrl = data.publicUrl ?? `/tin-tuc/${encodeURIComponent(savedId)}`;

    if (status === "published") {
      window.open(publicUrl, "_blank", "noopener,noreferrer");
    }

    if (options?.openPreview) {
      window.open(`/admin/articles/${encodeURIComponent(savedId)}/preview`, "_blank");
    }

    if (options?.redirect !== false) {
      router.push("/admin/articles");
      router.refresh();
    } else if (mode === "create") {
      router.replace(`/admin/articles/${encodeURIComponent(savedId)}/edit`);
      router.refresh();
    }

    return savedId;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await saveArticle(form.status);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      {warnings.length > 0 && (
        <div className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-4 py-3 space-y-1">
          {warnings.map((w) => (
            <p key={w}>⚠ {w}</p>
          ))}
        </div>
      )}

      <SeoAssistantPanel
        topic={form.title || form.primaryKeyword}
        primaryKeyword={form.primaryKeyword}
        category={form.category}
        onApplyMetaTitle={(v) => updateField("metaTitle", v)}
        onApplyMetaDescription={(v) => updateField("excerpt", v)}
        onApplyH1AndSlug={(title, slug) => {
          updateField("title", title);
          if (mode === "create") updateField("id", slug);
        }}
        onApplyKeywords={(keywords) => {
          const merged = [
            ...new Set([
              ...keywordsText.split(",").map((k) => k.trim()).filter(Boolean),
              ...keywords,
            ]),
          ];
          setKeywordsText(merged.join(", "));
        }}
        onApplyOutline={(sections) => updateField("sections", sections)}
        onApplyFaqs={(faqs, faqMode) => {
          updateField(
            "faqs",
            faqMode === "append" ? [...form.faqs, ...faqs] : faqs,
          );
        }}
        onApplySapo={(html) => {
          updateField("sapoHtml", html);
          setActiveTab("sapo");
        }}
        onApplyConclusion={(html) => {
          updateField("conclusionHtml", html);
          setActiveTab("faq");
        }}
      />

      <div className="flex flex-wrap gap-1 border-b border-slate-200 pb-1">
        {ARTICLE_FORM_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${
              activeTab === tab.id
                ? "bg-white text-primary border border-slate-200 border-b-white -mb-px"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "seo" && (
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="H1 — Tiêu đề bài viết">
                <input
                  className={adminInputClass}
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
              </AdminField>
              <AdminField
                label="Slug (URL)"
                hint={`Preview: /tin-tuc/${slugPreview}`}
              >
                <input
                  className={adminInputClass}
                  value={form.id}
                  onChange={(e) => updateField("id", slugify(e.target.value))}
                  placeholder={slugify(form.title)}
                  disabled={mode === "edit"}
                />
              </AdminField>
            </div>

            <AdminField
              label={
                <span>
                  Meta Title{" "}
                  <span
                    className={charCountClass(form.metaTitle.length, 50, 60)}
                  >
                    ({form.metaTitle.length}/60)
                  </span>
                </span>
              }
              hint="Mục tiêu 50–60 ký tự, từ khóa chính ở đầu"
            >
              <input
                className={adminInputClass}
                value={form.metaTitle}
                onChange={(e) => updateField("metaTitle", e.target.value)}
                required
              />
            </AdminField>

            <AdminField
              label={
                <span>
                  Meta Description{" "}
                  <span
                    className={charCountClass(form.excerpt.length, 150, 160)}
                  >
                    ({form.excerpt.length}/160)
                  </span>
                </span>
              }
            >
              <textarea
                className={adminInputClass}
                rows={3}
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                required
              />
            </AdminField>

            <div className="grid md:grid-cols-3 gap-4">
              <AdminField label="Từ khóa chính">
                <input
                  className={adminInputClass}
                  value={form.primaryKeyword}
                  onChange={(e) => updateField("primaryKeyword", e.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Từ khóa phụ" hint="Phân cách dấu phẩy">
                <input
                  className={adminInputClass}
                  value={keywordsText}
                  onChange={(e) => setKeywordsText(e.target.value)}
                />
              </AdminField>
              <AdminField label="Danh mục">
                <select
                  className={adminInputClass}
                  value={form.category}
                  onChange={(e) =>
                    updateField("category", e.target.value as NewsCategory)
                  }
                >
                  {Object.entries(NEWS_CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </AdminField>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="Ngày đăng (dd/mm/yyyy)">
                <input
                  className={adminInputClass}
                  value={form.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  required
                />
              </AdminField>
              <AdminField label="Trạng thái">
                <select
                  className={adminInputClass}
                  value={form.status}
                  onChange={(e) =>
                    updateField("status", e.target.value as ArticleInput["status"])
                  }
                >
                  <option value="draft">Nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </AdminField>
            </div>

            <hr className="border-slate-100" />
            <h4 className="font-semibold text-slate-800">Ảnh đại diện OG (1200×630)</h4>
            <ArticleImageUpload
              articleSlug={slugPreview}
              primaryKeyword={form.primaryKeyword}
              alt={form.imageAlt}
              caption={form.imageCaption ?? ""}
              currentSrc={form.image}
              nameHint={form.primaryKeyword || "hero"}
              altDescription={form.title}
              onAltChange={(value) => updateField("imageAlt", value)}
              onCaptionChange={(value) => updateField("imageCaption", value)}
              onUploaded={(url) => updateField("image", url)}
              onManualUrlChange={(url) => updateField("image", url)}
            />
          </div>
          <SeoChecklistPanel items={seoChecklist} />
        </div>
      )}

      {activeTab === "sapo" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <SimpleHtmlEditor
              label="Đoạn Sapo (HTML)"
              hint="50–100 từ. In đậm từ khóa chính bằng nút B trên toolbar."
              value={form.sapoHtml}
              onChange={(v) => updateField("sapoHtml", v)}
              rows={8}
              required
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600 mb-2">Preview Sapo</p>
            <div
              className="text-lg text-gray-700 leading-relaxed border-l-4 border-primary pl-6 bg-white rounded-2xl border border-slate-200 p-6"
              dangerouslySetInnerHTML={{ __html: form.sapoHtml }}
            />
          </div>
        </div>
      )}

      {activeTab === "sections" && (
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div>
            <SectionBuilder
              sections={form.sections}
              articleSlug={slugPreview}
              primaryKeyword={form.primaryKeyword}
              onChange={(sections) => updateField("sections", sections)}
            />
          </div>
          <TocPreview sections={form.sections} hasFaqs={form.faqs.length > 0} />
        </div>
      )}

      {activeTab === "faq" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">FAQ (tối thiểu 2 câu)</h3>
              <AdminButton type="button" onClick={addFaq}>
                + Thêm câu hỏi
              </AdminButton>
            </div>
            {form.faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-100 rounded-xl p-4 space-y-3"
              >
                <div className="flex justify-between items-start gap-2">
                  <AdminField label={`Câu hỏi ${index + 1}`}>
                    <input
                      className={adminInputClass}
                      value={faq.question}
                      onChange={(e) =>
                        updateFaq(index, { question: e.target.value })
                      }
                    />
                  </AdminField>
                  <AdminButton
                    type="button"
                    variant="danger"
                    className="!px-2 mt-6"
                    onClick={() => removeFaq(index)}
                  >
                    Xóa
                  </AdminButton>
                </div>
                <SimpleHtmlEditor
                  label="Trả lời (HTML, 2–3 câu)"
                  value={faq.answerHtml}
                  onChange={(v) => updateFaq(index, { answerHtml: v })}
                  rows={3}
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <SimpleHtmlEditor
              label="Kết luận (HTML)"
              hint="Tóm tắt giá trị + nhắc từ khóa chính"
              value={form.conclusionHtml}
              onChange={(v) => updateField("conclusionHtml", v)}
              rows={5}
              required
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-bold text-slate-900">Call to Action (CTA)</h3>
            <AdminField label="Tiêu đề CTA">
              <input
                className={adminInputClass}
                value={form.cta.title}
                onChange={(e) =>
                  updateField("cta", { ...form.cta, title: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Mô tả">
              <textarea
                className={adminInputClass}
                rows={2}
                value={form.cta.description}
                onChange={(e) =>
                  updateField("cta", {
                    ...form.cta,
                    description: e.target.value,
                  })
                }
              />
            </AdminField>
            <AdminField label="Nhãn nút">
              <input
                className={adminInputClass}
                value={form.cta.label}
                onChange={(e) =>
                  updateField("cta", { ...form.cta, label: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Liên kết CTA">
              <select
                className={adminInputClass}
                value={ctaHrefMode}
                onChange={(e) => {
                  setCtaHrefMode(e.target.value);
                  if (e.target.value !== "__custom__") {
                    updateField("cta", { ...form.cta, href: e.target.value });
                  }
                }}
              >
                {CTA_HREF_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {ctaHrefMode === "__custom__" && (
                <input
                  className={`${adminInputClass} mt-2`}
                  value={form.cta.href}
                  onChange={(e) =>
                    updateField("cta", { ...form.cta, href: e.target.value })
                  }
                  placeholder="/duong-dan-tuy-chinh"
                />
              )}
            </AdminField>
          </div>
        </div>
      )}

      {activeTab === "author" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 max-w-2xl">
          <div className="flex flex-wrap gap-2">
            <AdminButton
              type="button"
              variant="secondary"
              onClick={() => updateField("author", AUTHOR_PRESETS.editor)}
            >
              Ban biên tập Cần Thơ GF
            </AdminButton>
            <AdminButton
              type="button"
              variant="secondary"
              onClick={() => updateField("author", AUTHOR_PRESETS.tech)}
            >
              Đội kỹ thuật Cần Thơ GF
            </AdminButton>
          </div>
          <AdminField label="Tên tác giả">
            <input
              className={adminInputClass}
              value={form.author.name}
              onChange={(e) =>
                updateField("author", { ...form.author, name: e.target.value })
              }
            />
          </AdminField>
          <AdminField label="Vai trò / chức danh">
            <input
              className={adminInputClass}
              value={form.author.role}
              onChange={(e) =>
                updateField("author", { ...form.author, role: e.target.value })
              }
            />
          </AdminField>
          <AdminField label="Mô tả chuyên môn (E-E-A-T)">
            <textarea
              className={adminInputClass}
              rows={4}
              value={form.author.bio}
              onChange={(e) =>
                updateField("author", { ...form.author, bio: e.target.value })
              }
            />
          </AdminField>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-200">
        <AdminButton type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          disabled={saving}
          onClick={() => saveArticle("draft")}
        >
          Lưu nháp
        </AdminButton>
        <AdminButton
          type="button"
          disabled={saving}
          onClick={() => saveArticle("published")}
        >
          Xuất bản
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          disabled={saving}
          onClick={async () => {
            await saveArticle("draft", { redirect: false, openPreview: true });
          }}
        >
          <Eye className="w-4 h-4 mr-1 inline" />
          Lưu & xem trước
        </AdminButton>
        {mode === "edit" && (
          <>
            <Link
              href={`/admin/articles/${encodeURIComponent(form.id)}/preview`}
              target="_blank"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <Eye className="w-4 h-4 mr-1" /> Preview
            </Link>
            {form.status === "published" && (
              <Link
                href={`/tin-tuc/${form.id}`}
                target="_blank"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4 mr-1" /> Xem trên site
              </Link>
            )}
          </>
        )}
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/articles")}
        >
          Hủy
        </AdminButton>
      </div>
    </form>
  );
}
