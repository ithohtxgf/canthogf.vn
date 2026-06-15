"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import {
  AdminButton,
  AdminField,
  adminInputClass,
} from "@/components/admin/AdminShell";
import { PromotionPreview } from "@/components/ui/PromoBanner";
import { BenefitsEditor } from "@/components/admin/promotions/BenefitsEditor";
import { PriceRowsEditor } from "@/components/admin/promotions/PriceRowsEditor";
import { PromotionPositionGuide } from "@/components/admin/promotions/PromotionPositionGuide";
import { AdminImageUpload } from "@/components/admin/article-form/ArticleImageUpload";
import type { Promotion, PromotionPosition } from "@/lib/content/promotions";
import { slugify } from "@/lib/admin/defaults";
import {
  PROMOTION_FORM_TABS,
  PROMOTION_CATEGORY_OPTIONS,
  PROMOTION_DISPLAY_OPTIONS,
  PROMOTION_LINK_PRESETS,
  PROMOTION_POSITION_OPTIONS,
  PROMOTION_PRODUCT_OPTIONS,
  datetimeLocalToIso,
  isoToDatetimeLocal,
  suggestedDisplayStyle,
  type PromotionFormTabId,
} from "@/lib/admin/promotion-form-config";

type PromotionFormProps = {
  initial: Promotion;
  mode: "create" | "edit";
};

export function PromotionForm({ initial, mode }: PromotionFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PromotionFormTabId>("config");
  const [form, setForm] = useState<Promotion>(() => ({
    ...initial,
    benefits: initial.benefits ?? [],
    priceRows: initial.priceRows ?? [],
    priority: initial.priority ?? 5,
  }));
  type LinkPresetValue = (typeof PROMOTION_LINK_PRESETS)[number]["value"];

  const [linkMode, setLinkMode] = useState<LinkPresetValue>(() => {
    const match = PROMOTION_LINK_PRESETS.find((o) => o.value === initial.link);
    return match ? match.value : "__custom__";
  });
  const [validUntilLocal, setValidUntilLocal] = useState(
    isoToDatetimeLocal(initial.validUntil),
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [imageAltDraft, setImageAltDraft] = useState(
    () => initial.headline ?? initial.title ?? "",
  );

  const promoIdPreview = useMemo(
    () => (form.id || slugify(form.title)).trim(),
    [form.id, form.title],
  );

  const previewPromo = useMemo((): Promotion => {
    return {
      ...form,
      id: form.id || slugify(form.title),
      benefits: form.benefits?.filter(Boolean),
      priceRows: form.priceRows?.filter((r) => r.label || r.value),
      validUntil: datetimeLocalToIso(validUntilLocal) ?? form.validUntil,
    };
  }, [form, validUntilLocal]);

  function updateField<K extends keyof Promotion>(key: K, value: Promotion[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePositionChange(position: PromotionPosition) {
    setForm((prev) => ({
      ...prev,
      position,
      displayStyle:
        prev.displayStyle === suggestedDisplayStyle(prev.position)
          ? suggestedDisplayStyle(position)
          : prev.displayStyle,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload: Promotion = {
      ...form,
      id: (form.id || slugify(form.title)).trim(),
      benefits: (form.benefits ?? []).map((b) => b.trim()).filter(Boolean),
      priceRows: (form.priceRows ?? []).filter((r) => r.label && r.value),
      validUntil: datetimeLocalToIso(validUntilLocal),
      productTarget: form.productTarget?.trim() || undefined,
    };

    if (payload.position === "product-detail" && !payload.productTarget) {
      setError("Vị trí product-detail cần chọn sản phẩm (productTarget).");
      setSaving(false);
      setActiveTab("config");
      return;
    }

    const url =
      mode === "create"
        ? "/api/admin/promotions"
        : `/api/admin/promotions/${encodeURIComponent(initial.id)}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Lưu thất bại");
      return;
    }

    router.push("/admin/promotions");
    router.refresh();
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-1 border-b border-slate-200 pb-1">
        {PROMOTION_FORM_TABS.map((tab) => (
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

      {activeTab === "config" && (
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="ID khuyến mãi" hint="Không dấu, duy nhất">
                <input
                  className={adminInputClass}
                  value={form.id}
                  onChange={(e) => updateField("id", slugify(e.target.value))}
                  disabled={mode === "edit"}
                  required
                />
              </AdminField>
              <AdminField label="Tiêu đề nội bộ (admin)">
                <input
                  className={adminInputClass}
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                />
              </AdminField>
            </div>

            <AdminField label="Vị trí hiển thị">
              <select
                className={adminInputClass}
                value={form.position}
                onChange={(e) =>
                  handlePositionChange(e.target.value as PromotionPosition)
                }
              >
                {PROMOTION_POSITION_OPTIONS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
            </AdminField>

            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="Nhắm danh mục bài viết">
                <select
                  className={adminInputClass}
                  value={form.categoryTarget}
                  onChange={(e) =>
                    updateField(
                      "categoryTarget",
                      e.target.value as Promotion["categoryTarget"],
                    )
                  }
                >
                  {PROMOTION_CATEGORY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField
                label="Sản phẩm (productTarget)"
                hint="Bắt buộc nếu vị trí = product-detail"
              >
                <select
                  className={adminInputClass}
                  value={form.productTarget ?? ""}
                  onChange={(e) =>
                    updateField("productTarget", e.target.value || undefined)
                  }
                >
                  {PROMOTION_PRODUCT_OPTIONS.map((p) => (
                    <option key={p.value || "none"} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </AdminField>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="Độ ưu tiên" hint="Số cao hơn = ưu tiên hiển thị">
                <input
                  type="number"
                  min={0}
                  max={100}
                  className={adminInputClass}
                  value={form.priority ?? 5}
                  onChange={(e) =>
                    updateField("priority", Number(e.target.value) || 0)
                  }
                />
              </AdminField>
              <AdminField label="Hết hạn">
                <input
                  type="datetime-local"
                  className={adminInputClass}
                  value={validUntilLocal}
                  onChange={(e) => setValidUntilLocal(e.target.value)}
                />
              </AdminField>
            </div>

            <AdminField label="Link CTA">
              <select
                className={adminInputClass}
                value={linkMode}
                onChange={(e) => {
                  const value = e.target.value as LinkPresetValue;
                  setLinkMode(value);
                  if (value !== "__custom__") {
                    updateField("link", value);
                  }
                }}
              >
                {PROMOTION_LINK_PRESETS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {linkMode === "__custom__" && (
                <input
                  className={`${adminInputClass} mt-2`}
                  value={form.link}
                  onChange={(e) => updateField("link", e.target.value)}
                  required
                />
              )}
            </AdminField>

            <div className="flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => updateField("isActive", e.target.checked)}
                />
                Đang bật
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.openPopup ?? false}
                  onChange={(e) => updateField("openPopup", e.target.checked)}
                />
                Mở popup tư vấn
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.showCountdown ?? false}
                  onChange={(e) =>
                    updateField("showCountdown", e.target.checked)
                  }
                />
                Countdown FOMO
              </label>
            </div>
          </div>

          <PromotionPositionGuide
            selected={form.position}
            onSelect={handlePositionChange}
          />
        </div>
      )}

      {activeTab === "content" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
          <AdminField
            label="Kiểu hiển thị"
            hint={
              PROMOTION_DISPLAY_OPTIONS.find((d) => d.value === form.displayStyle)
                ?.hint
            }
          >
            <select
              className={adminInputClass}
              value={form.displayStyle}
              onChange={(e) =>
                updateField(
                  "displayStyle",
                  e.target.value as Promotion["displayStyle"],
                )
              }
            >
              {PROMOTION_DISPLAY_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label} — {s.hint}
                </option>
              ))}
            </select>
          </AdminField>

          <div className="grid md:grid-cols-2 gap-4">
            <AdminField label="Badge">
              <input
                className={adminInputClass}
                value={form.badge ?? ""}
                onChange={(e) => updateField("badge", e.target.value)}
                placeholder="🔥 ƯU ĐÃI THÁNG 6"
              />
            </AdminField>
            <AdminField label="Nhãn nút CTA">
              <input
                className={adminInputClass}
                value={form.ctaLabel ?? ""}
                onChange={(e) => updateField("ctaLabel", e.target.value)}
              />
            </AdminField>
          </div>

          <AdminField label="Headline">
            <input
              className={adminInputClass}
              value={form.headline ?? ""}
              onChange={(e) => updateField("headline", e.target.value)}
            />
          </AdminField>
          <AdminField label="Subline">
            <input
              className={adminInputClass}
              value={form.subline ?? ""}
              onChange={(e) => updateField("subline", e.target.value)}
            />
          </AdminField>
          <AdminField label="Highlight">
            <input
              className={adminInputClass}
              value={form.highlight ?? ""}
              onChange={(e) => updateField("highlight", e.target.value)}
            />
          </AdminField>
          <AdminField
            label="Voucher text"
            hint="Dùng cho displayStyle closing — VD: Voucher 5 triệu"
          >
            <input
              className={adminInputClass}
              value={form.voucherText ?? ""}
              onChange={(e) => updateField("voucherText", e.target.value)}
            />
          </AdminField>

          <div className="border-t border-slate-100 pt-4 space-y-4">
            <h4 className="font-semibold text-slate-800">Ảnh banner KM</h4>
            <AdminImageUpload
              kind="promo"
              entitySlug={promoIdPreview}
              primaryKeyword={form.headline || form.title}
              alt={imageAltDraft}
              altDescription={form.headline || form.title}
              requireAlt={false}
              onAltChange={setImageAltDraft}
              currentSrc={form.imageUrl}
              nameHint={form.displayStyle === "image" ? "banner" : "poster"}
              onUploaded={({ url, width, height }) => {
                updateField("imageUrl", url);
                if (width) updateField("imageWidth", width);
                if (height) updateField("imageHeight", height);
              }}
              onManualUrlChange={(url) =>
                updateField("imageUrl", url || undefined)
              }
            />
            <div className="grid md:grid-cols-2 gap-4">
              <AdminField label="Chiều rộng hiển thị (px)" hint="Tự điền sau upload">
                <input
                  type="number"
                  className={adminInputClass}
                  value={form.imageWidth ?? 800}
                  onChange={(e) =>
                    updateField("imageWidth", Number(e.target.value) || undefined)
                  }
                />
              </AdminField>
              <AdminField label="Chiều cao hiển thị (px)">
                <input
                  type="number"
                  className={adminInputClass}
                  value={form.imageHeight ?? 400}
                  onChange={(e) =>
                    updateField("imageHeight", Number(e.target.value) || undefined)
                  }
                />
              </AdminField>
            </div>
          </div>

          <BenefitsEditor
            benefits={form.benefits ?? []}
            onChange={(benefits) => updateField("benefits", benefits)}
          />

          <PriceRowsEditor
            rows={form.priceRows ?? []}
            onChange={(priceRows) => updateField("priceRows", priceRows)}
          />
        </div>
      )}

      {activeTab === "preview" && (
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 min-h-[200px]">
            <p className="text-xs text-slate-500 mb-4">
              Preview render giống frontend — vị trí{" "}
              <code className="bg-white px-1 rounded">{form.position}</code>
            </p>
            <PromotionPreview promo={previewPromo} />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-sm space-y-2">
            <p className="font-bold text-slate-800">Tóm tắt cấu hình</p>
            <p>
              <span className="text-slate-500">Target:</span>{" "}
              {form.categoryTarget}
              {form.productTarget ? ` / ${form.productTarget}` : ""}
            </p>
            <p>
              <span className="text-slate-500">Style:</span> {form.displayStyle}
            </p>
            <p>
              <span className="text-slate-500">Priority:</span> {form.priority}
            </p>
            <p>
              <span className="text-slate-500">Trạng thái:</span>{" "}
              {form.isActive ? "Bật" : "Tắt"}
            </p>
            {validUntilLocal && (
              <p>
                <span className="text-slate-500">Hết hạn:</span>{" "}
                {new Date(validUntilLocal).toLocaleString("vi-VN")}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-200">
        <AdminButton type="submit" disabled={saving}>
          {saving ? "Đang lưu..." : "Lưu khuyến mãi"}
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => setActiveTab("preview")}
        >
          Xem trước
        </AdminButton>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/promotions")}
        >
          Hủy
        </AdminButton>
      </div>
    </form>
  );
}
