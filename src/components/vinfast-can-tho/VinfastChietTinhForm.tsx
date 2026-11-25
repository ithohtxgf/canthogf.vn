"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, FileText, Info, MessageCircle, Phone } from "lucide-react";
import {
  CHIET_TINH_MODEL_LINES,
  getChietTinhModelLine,
  getChietTinhVariant,
  getDefaultChietTinhSelection,
} from "@/lib/content/vinfast-chiet-tinh-catalog";
import { formatVnd } from "@/lib/content/vinfast-can-tho";
import {
  clampNonNegative,
  clampPercent,
  computeVinfastChietTinhQuote,
} from "@/lib/vinfast-chiet-tinh";
import { CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_ZALO_URL } from "@/lib/contact";

const defaultSelection = getDefaultChietTinhSelection();

export function VinfastChietTinhForm() {
  const [modelId, setModelId] = useState(defaultSelection.modelId);
  const [variantId, setVariantId] = useState(defaultSelection.variantId);
  const discountPct = 0;
  const [insExchange, setInsExchange] = useState(15_000_000);
  const [registrationPct, setRegistrationPct] = useState(0);
  const [phiDangKi, setPhiDangKi] = useState(200_000);
  const [phiEpBien, setPhiEpBien] = useState(600_000);
  const [phiDangKiem, setPhiDangKiem] = useState(140_000);
  const [phiDichVu, setPhiDichVu] = useState(3_000_000);
  const [phiBhTnds, setPhiBhTnds] = useState(1_200_000);
  const [phiDuongBo, setPhiDuongBo] = useState(2_160_000);
  const [phiBhThanXe, setPhiBhThanXe] = useState(11_332_030);
  const [showFees, setShowFees] = useState(false);

  const modelLine = useMemo(
    () => getChietTinhModelLine(modelId) ?? CHIET_TINH_MODEL_LINES[0],
    [modelId],
  );

  const selectedVariant = useMemo(
    () => getChietTinhVariant(modelId, variantId),
    [modelId, variantId],
  );

  useEffect(() => {
    const firstVariant = modelLine?.variants[0];
    if (!firstVariant) return;
    const stillValid = modelLine.variants.some((variant) => variant.id === variantId);
    if (!stillValid) setVariantId(firstVariant.id);
  }, [modelLine, variantId]);

  const q = useMemo(
    () =>
      computeVinfastChietTinhQuote({
        listPrice: selectedVariant?.listPrice ?? 0,
        discountPct,
        insExchange,
        registrationPct,
        phiDangKi,
        phiEpBien,
        phiDangKiem,
        phiDichVu,
        phiBhTnds,
        phiDuongBo,
        phiBhThanXe,
      }),
    [
      selectedVariant,
      discountPct,
      insExchange,
      registrationPct,
      phiDangKi,
      phiEpBien,
      phiDangKiem,
      phiDichVu,
      phiBhTnds,
      phiDuongBo,
      phiBhThanXe,
    ],
  );

  return (
    <div className="bg-white rounded-xl border border-hairline overflow-hidden">
      {/* Header */}
      <div className="bg-tint-strong border-b border-hairline px-5 py-4 flex items-center gap-3">
        <FileText className="w-5 h-5 text-primary shrink-0" />
        <p className="text-dark font-semibold">Chiết Tính Mua Xe VinFast: Cần Thơ EV</p>
      </div>

      {/* Inputs */}
      <div className="px-5 py-4 border-b border-hairline space-y-3">
        {/* Vehicle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="ct-model" className="text-xs font-semibold text-steel uppercase tracking-wide">
              Dòng xe
            </label>
            <select
              id="ct-model"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-tint px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {CHIET_TINH_MODEL_LINES.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ct-variant" className="text-xs font-semibold text-steel uppercase tracking-wide">
              Phiên bản
            </label>
            <select
              id="ct-variant"
              value={selectedVariant?.id ?? variantId}
              onChange={(e) => setVariantId(e.target.value)}
              className="w-full rounded-lg border border-hairline bg-tint px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {modelLine.variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.variantName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="ct-list-price" className="text-xs font-semibold text-steel uppercase tracking-wide">
            Giá niêm yết
          </label>
          <input
            id="ct-list-price"
            readOnly
            value={formatVnd(q.listPrice)}
            className="w-full rounded-lg border border-hairline bg-tint px-3 py-2.5 text-sm font-semibold text-dark focus:outline-none"
          />
        </div>

        {/* Insurance exchange */}
        <div className="grid grid-cols-1 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-steel uppercase tracking-wide">
              Quy đổi bảo hiểm (đ)
            </label>
            <input
              type="number"
              value={insExchange}
              min={0}
              step={500_000}
              onChange={(e) => setInsExchange(clampNonNegative(Number(e.target.value)))}
              className="w-full rounded-lg border border-hairline bg-tint px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Toggle fees */}
        <button
          type="button"
          onClick={() => setShowFees((v) => !v)}
          aria-expanded={showFees}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
            showFees
              ? "border-hairline bg-tint hover:bg-tint-strong"
              : "border-hairline bg-tint-strong hover:bg-tint-strong hover:border-sky"
          }`}
        >
          <span className="text-xs sm:text-sm font-semibold leading-snug text-dark">
            {showFees
              ? "Thu gọn: ẩn các khoản phí tùy chỉnh"
              : "Bấm vào đây để tùy chỉnh phí lăn bánh (trước bạ, đăng ký, bảo hiểm…)"}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              showFees ? "bg-tint-strong text-primary" : "bg-tint-strong text-dark"
            }`}
          >
            {showFees ? (
              <ChevronUp className="w-4 h-4" aria-hidden />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden />
            )}
          </span>
        </button>

        {showFees && (
          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              { label: "Trước bạ (%)", value: registrationPct, set: setRegistrationPct, step: 0.5, suffix: "%" },
              { label: "Phí đăng kí (đ)", value: phiDangKi, set: setPhiDangKi, step: 50_000 },
              { label: "Phí ép biển số (đ)", value: phiEpBien, set: setPhiEpBien, step: 50_000 },
              { label: "Phí đăng kiểm (đ)", value: phiDangKiem, set: setPhiDangKiem, step: 10_000 },
              { label: "Phí dịch vụ (đ)", value: phiDichVu, set: setPhiDichVu, step: 100_000 },
              { label: "BH TNDS 1 năm (đ)", value: phiBhTnds, set: setPhiBhTnds, step: 50_000 },
              { label: "Phí đường bộ (đ)", value: phiDuongBo, set: setPhiDuongBo, step: 100_000 },
              { label: "BH thân xe 1 năm (đ)", value: phiBhThanXe, set: setPhiBhThanXe, step: 100_000 },
            ].map(({ label, value, set, step, suffix }) => (
              <div key={label} className="flex flex-col gap-1">
                <label className="text-xs text-steel">{label}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={value}
                    min={0}
                    step={step}
                    onChange={(e) => {
                      const n = Number(e.target.value);
                      if (suffix === "%") set(clampPercent(n));
                      else set(clampNonNegative(n));
                    }}
                    className="w-full rounded-lg border border-hairline bg-white px-3 py-2 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  {suffix && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-steel">{suffix}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quote table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-dark text-white">
              <th className="w-10 px-3 py-2.5 text-center font-semibold border border-white/15">STT</th>
              <th className="px-3 py-2.5 text-center font-semibold border border-white/15">LOẠI XE</th>
              <th className="px-3 py-2.5 text-center font-semibold border border-white/15">PHIÊN BẢN</th>
              <th className="px-3 py-2.5 text-center font-semibold border border-white/15 whitespace-nowrap">THÀNH TIỀN</th>
            </tr>
          </thead>
          <tbody>
            {/* Vehicle row */}
            <tr className="border-b border-hairline">
              <td className="px-3 py-2 text-center border border-hairline"></td>
              <td className="px-3 py-2 text-center font-medium border border-hairline">
                {selectedVariant?.modelName ?? modelLine.name}
              </td>
              <td className="px-3 py-2 text-center border border-hairline">
                {selectedVariant?.variantName ?? "—"}
              </td>
              <td className="px-3 py-2 text-right font-medium border border-hairline whitespace-nowrap">
                {formatVnd(q.listPrice)}
              </td>
            </tr>

            {/* Discount row */}
            {q.discountAmt > 0 && (
              <tr className="border-b border-hairline">
                <td className="px-3 py-2 border border-hairline"></td>
                <td colSpan={2} className="px-3 py-2 text-center font-semibold text-red-600 border border-hairline">
                  Ưu đãi {discountPct}%
                </td>
                <td className="px-3 py-2 text-right font-semibold text-red-600 border border-hairline whitespace-nowrap">
                  − {formatVnd(q.discountAmt)}
                </td>
              </tr>
            )}

            {/* Empty separator */}
            <tr className="border-b border-hairline h-2">
              <td colSpan={4} className="border border-hairline"></td>
            </tr>

            {/* Insurance exchange row */}
            {q.insExchange > 0 && (
              <tr className="border-b border-hairline">
                <td className="px-3 py-2 border border-hairline"></td>
                <td colSpan={2} className="px-3 py-2 text-center font-semibold text-red-600 border border-hairline">
                  Quy đổi bảo hiểm
                </td>
                <td className="px-3 py-2 text-right font-semibold text-red-600 border border-hairline whitespace-nowrap">
                  − {formatVnd(q.insExchange)}
                </td>
              </tr>
            )}

            {/* Car value row: highlight */}
            <tr className="bg-tint-strong border-b border-hairline">
              <td className="px-3 py-2.5 text-center font-semibold border border-hairline">1</td>
              <td colSpan={2} className="px-3 py-2.5 font-semibold border border-hairline">
                Giá trị xe (đã có VAT):
              </td>
              <td className="px-3 py-2.5 text-right font-semibold text-dark border border-hairline whitespace-nowrap underline underline-offset-2">
                {formatVnd(q.carValue)}
              </td>
            </tr>

            {/* Phu luc header row */}
            <tr className="border-b border-hairline">
              <td className="px-3 py-2.5 text-center font-semibold border border-hairline">1</td>
              <td colSpan={2} className="px-3 py-2.5 font-semibold border border-hairline">
                Phụ Lục{" "}
                <span className="font-normal text-steel text-xs">
                  (Đăng kí xe tạm tính, quyết toán theo chứng từ thực tế)
                </span>
              </td>
              <td className="px-3 py-2.5 text-right font-semibold text-dark border border-hairline whitespace-nowrap underline underline-offset-2">
                {formatVnd(q.phuLucFees)}
              </td>
            </tr>

            {/* Phu luc sub-rows */}
            <tr className="border-b border-hairline bg-tint">
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 italic text-steel border border-hairline">+ Phí trước bạ (tạm tính):</td>
              <td className="px-3 py-1.5 text-center text-steel border border-hairline">{registrationPct}%</td>
              <td className="px-3 py-1.5 text-right text-steel border border-hairline whitespace-nowrap">
                {q.regFee > 0 ? formatVnd(q.regFee) : "— VNĐ"}
              </td>
            </tr>
            <tr className="border-b border-hairline bg-tint">
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 italic text-steel border border-hairline">+ Phí đăng kí</td>
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 text-right text-steel border border-hairline whitespace-nowrap">{phiDangKi.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-hairline bg-tint">
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 italic text-steel border border-hairline">+ Phí ép biển số (không có chứng từ)</td>
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 text-right text-steel border border-hairline whitespace-nowrap">{phiEpBien.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-hairline bg-tint">
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 italic text-steel border border-hairline">+ Phí đăng kiểm:</td>
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 text-right text-steel border border-hairline whitespace-nowrap">{phiDangKiem.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-hairline bg-tint">
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 italic text-steel border border-hairline">+ Phí dịch vụ:</td>
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 text-right text-steel border border-hairline whitespace-nowrap">{phiDichVu.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-hairline bg-tint">
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 italic text-steel border border-hairline">+ Phí BH trách nhiệm dân sự 1 năm:</td>
              <td className="px-3 py-1.5 text-center text-steel text-xs border border-hairline">DL 7 chỗ</td>
              <td className="px-3 py-1.5 text-right text-steel border border-hairline whitespace-nowrap">{phiBhTnds.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-hairline bg-tint">
              <td className="border border-hairline"></td>
              <td className="px-3 py-1.5 italic text-steel border border-hairline">+ Phí bảo trì đường bộ (tạm tính)</td>
              <td className="px-3 py-1.5 text-center text-steel text-xs border border-hairline">Cá nhân, 12 tháng</td>
              <td className="px-3 py-1.5 text-right text-steel border border-hairline whitespace-nowrap">{phiDuongBo.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>

            {/* Body insurance */}
            <tr className="border-b border-hairline">
              <td className="px-3 py-2 text-center font-semibold border border-hairline">2</td>
              <td colSpan={2} className="px-3 py-2 border border-hairline">
                Bảo hiểm thân xe 1 năm{" "}
                <span className="text-steel text-xs">(tạm tính)</span>
              </td>
              <td className="px-3 py-2 text-right font-medium text-ink border border-hairline whitespace-nowrap">
                {formatVnd(q.bodyIns)}
              </td>
            </tr>

            {/* Total cash: highlight */}
            <tr className="bg-tint-strong">
              <td colSpan={3} className="px-4 py-3 text-center font-semibold uppercase text-sm tracking-wide border border-hairline">
                Tổng thanh toán: Giá trị xe + Phụ lục + BH thân xe
              </td>
              <td className="px-4 py-3 text-right font-semibold text-dark text-base border border-hairline whitespace-nowrap underline underline-offset-2">
                {formatVnd(q.totalCash)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="mx-5 mb-4 flex items-start gap-2 rounded-lg border border-hairline bg-tint px-3 py-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
        <p className="text-xs leading-relaxed text-ink">
          <span className="font-semibold">Lưu ý:</span> Phí thủ tục tạm tính: quyết toán theo chứng từ thực tế tại thời điểm đăng kí.
        </p>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3">
        <a
          href={CONTACT_ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-white border border-primary text-primary hover:bg-tint-strong font-semibold py-3 px-5 rounded-lg transition-colors text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Nhận báo giá qua Zalo
        </a>
        <a
          href={`tel:${CONTACT_PHONE_TEL}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-5 rounded-lg transition-colors text-sm"
        >
          <Phone className="w-4 h-4" />
          Gọi ngay {CONTACT_PHONE}
        </a>
      </div>
    </div>
  );
}
