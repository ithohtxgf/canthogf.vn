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
  const [discountPct, setDiscountPct] = useState(9);
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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-primary-dark px-5 py-4 flex items-center gap-3">
        <FileText className="w-5 h-5 text-secondary shrink-0" />
        <p className="text-white font-bold">Chiết Tính Mua Xe VinFast — Cần Thơ GF</p>
      </div>

      {/* Inputs */}
      <div className="px-5 py-4 border-b border-gray-100 space-y-3">
        {/* Vehicle */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label htmlFor="ct-model" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Dòng xe
            </label>
            <select
              id="ct-model"
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {CHIET_TINH_MODEL_LINES.map((line) => (
                <option key={line.id} value={line.id}>
                  {line.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="ct-variant" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Phiên bản
            </label>
            <select
              id="ct-variant"
              value={selectedVariant?.id ?? variantId}
              onChange={(e) => setVariantId(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
          <label htmlFor="ct-list-price" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Giá niêm yết (đã kèm pin)
          </label>
          <input
            id="ct-list-price"
            readOnly
            value={formatVnd(q.listPrice)}
            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm font-semibold text-primary-dark focus:outline-none"
          />
        </div>

        {/* Discount + Insurance exchange */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Ưu đãi (%)
            </label>
            <div className="relative">
              <input
                type="number"
                value={discountPct}
                min={0}
                max={50}
                step={0.5}
                onChange={(e) => setDiscountPct(clampPercent(Number(e.target.value), 50))}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-8 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">%</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Quy đổi bảo hiểm (đ)
            </label>
            <input
              type="number"
              value={insExchange}
              min={0}
              step={500_000}
              onChange={(e) => setInsExchange(clampNonNegative(Number(e.target.value)))}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Toggle fees */}
        <button
          type="button"
          onClick={() => setShowFees((v) => !v)}
          aria-expanded={showFees}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 transition-all text-left shadow-sm ${
            showFees
              ? "border-primary/30 bg-primary/5 hover:bg-primary/10"
              : "border-secondary/50 bg-secondary/10 hover:bg-secondary/15 hover:border-secondary/70"
          }`}
        >
          <span className="text-xs sm:text-sm font-bold leading-snug text-primary-dark">
            {showFees
              ? "Thu gọn — ẩn các khoản phí tùy chỉnh"
              : "Bấm vào đây để tùy chỉnh phí lăn bánh (trước bạ, đăng ký, bảo hiểm…)"}
          </span>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              showFees ? "bg-primary/10 text-primary" : "bg-secondary/20 text-primary-dark"
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
                <label className="text-xs text-gray-500">{label}</label>
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
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  {suffix && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">{suffix}</span>
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
            <tr className="bg-[#4472C4] text-white">
              <th className="w-10 px-3 py-2.5 text-center font-bold border border-[#3a62b0]">STT</th>
              <th className="px-3 py-2.5 text-center font-bold border border-[#3a62b0]">LOẠI XE</th>
              <th className="px-3 py-2.5 text-center font-bold border border-[#3a62b0]">PHIÊN BẢN</th>
              <th className="px-3 py-2.5 text-center font-bold border border-[#3a62b0] whitespace-nowrap">THÀNH TIỀN</th>
            </tr>
          </thead>
          <tbody>
            {/* Vehicle row */}
            <tr className="border-b border-gray-200">
              <td className="px-3 py-2 text-center border border-gray-200"></td>
              <td className="px-3 py-2 text-center font-medium border border-gray-200">
                {selectedVariant?.modelName ?? modelLine.name}
              </td>
              <td className="px-3 py-2 text-center border border-gray-200">
                {selectedVariant?.variantName ?? "—"}
              </td>
              <td className="px-3 py-2 text-right font-medium border border-gray-200 whitespace-nowrap">
                {formatVnd(q.listPrice)}
              </td>
            </tr>

            {/* Discount row */}
            {q.discountAmt > 0 && (
              <tr className="border-b border-gray-200">
                <td className="px-3 py-2 border border-gray-200"></td>
                <td colSpan={2} className="px-3 py-2 text-center font-bold text-red-600 border border-gray-200">
                  Ưu đãi {discountPct}%
                </td>
                <td className="px-3 py-2 text-right font-bold text-red-600 border border-gray-200 whitespace-nowrap">
                  − {formatVnd(q.discountAmt)}
                </td>
              </tr>
            )}

            {/* Empty separator */}
            <tr className="border-b border-gray-200 h-2">
              <td colSpan={4} className="border border-gray-200"></td>
            </tr>

            {/* Insurance exchange row */}
            {q.insExchange > 0 && (
              <tr className="border-b border-gray-200">
                <td className="px-3 py-2 border border-gray-200"></td>
                <td colSpan={2} className="px-3 py-2 text-center font-bold text-red-600 border border-gray-200">
                  Quy đổi bảo hiểm
                </td>
                <td className="px-3 py-2 text-right font-bold text-red-600 border border-gray-200 whitespace-nowrap">
                  − {formatVnd(q.insExchange)}
                </td>
              </tr>
            )}

            {/* Car value row — green */}
            <tr className="bg-[#92D050]/30 border-b border-gray-200">
              <td className="px-3 py-2.5 text-center font-bold border border-gray-200">1</td>
              <td colSpan={2} className="px-3 py-2.5 font-bold border border-gray-200">
                Giá trị xe (đã có VAT):
              </td>
              <td className="px-3 py-2.5 text-right font-black text-primary-dark border border-gray-200 whitespace-nowrap underline underline-offset-2">
                {formatVnd(q.carValue)}
              </td>
            </tr>

            {/* Phu luc header row */}
            <tr className="border-b border-gray-200">
              <td className="px-3 py-2.5 text-center font-bold border border-gray-200">1</td>
              <td colSpan={2} className="px-3 py-2.5 font-bold border border-gray-200">
                Phụ Lục{" "}
                <span className="font-normal text-gray-500 text-xs">
                  (Đăng kí xe tạm tính, quyết toán theo chứng từ thực tế)
                </span>
              </td>
              <td className="px-3 py-2.5 text-right font-black text-dark border border-gray-200 whitespace-nowrap underline underline-offset-2">
                {formatVnd(q.phuLucFees)}
              </td>
            </tr>

            {/* Phu luc sub-rows */}
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 italic text-gray-600 border border-gray-200">+ Phí trước bạ (tạm tính):</td>
              <td className="px-3 py-1.5 text-center text-gray-500 border border-gray-200">{registrationPct}%</td>
              <td className="px-3 py-1.5 text-right text-gray-600 border border-gray-200 whitespace-nowrap">
                {q.regFee > 0 ? formatVnd(q.regFee) : "— VNĐ"}
              </td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 italic text-gray-600 border border-gray-200">+ Phí đăng kí</td>
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 text-right text-gray-600 border border-gray-200 whitespace-nowrap">{phiDangKi.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 italic text-gray-600 border border-gray-200">+ Phí ép biển số (không có chứng từ)</td>
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 text-right text-gray-600 border border-gray-200 whitespace-nowrap">{phiEpBien.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 italic text-gray-600 border border-gray-200">+ Phí đăng kiểm:</td>
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 text-right text-gray-600 border border-gray-200 whitespace-nowrap">{phiDangKiem.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 italic text-gray-600 border border-gray-200">+ Phí dịch vụ:</td>
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 text-right text-gray-600 border border-gray-200 whitespace-nowrap">{phiDichVu.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 italic text-gray-600 border border-gray-200">+ Phí BH trách nhiệm dân sự 1 năm:</td>
              <td className="px-3 py-1.5 text-center text-gray-500 text-xs border border-gray-200">DL 7 chỗ</td>
              <td className="px-3 py-1.5 text-right text-gray-600 border border-gray-200 whitespace-nowrap">{phiBhTnds.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/60">
              <td className="border border-gray-200"></td>
              <td className="px-3 py-1.5 italic text-gray-600 border border-gray-200">+ Phí bảo trì đường bộ (tạm tính)</td>
              <td className="px-3 py-1.5 text-center text-gray-500 text-xs border border-gray-200">Cá nhân, 12 tháng</td>
              <td className="px-3 py-1.5 text-right text-gray-600 border border-gray-200 whitespace-nowrap">{phiDuongBo.toLocaleString("vi-VN")}  VNĐ</td>
            </tr>

            {/* Body insurance */}
            <tr className="border-b border-gray-200">
              <td className="px-3 py-2 text-center font-bold border border-gray-200">2</td>
              <td colSpan={2} className="px-3 py-2 border border-gray-200">
                Bảo hiểm thân xe 1 năm{" "}
                <span className="text-gray-500 text-xs">(tạm tính)</span>
              </td>
              <td className="px-3 py-2 text-right font-medium text-gray-700 border border-gray-200 whitespace-nowrap">
                {formatVnd(q.bodyIns)}
              </td>
            </tr>

            {/* Total cash — green */}
            <tr className="bg-[#92D050]/30">
              <td colSpan={3} className="px-4 py-3 text-center font-black uppercase text-sm tracking-wide border border-gray-300">
                Tổng thanh toán: Giá trị xe + Phụ lục + BH thân xe
              </td>
              <td className="px-4 py-3 text-right font-black text-primary-dark text-base border border-gray-300 whitespace-nowrap underline underline-offset-2">
                {formatVnd(q.totalCash)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <div className="mx-5 mb-4 flex items-start gap-2 rounded-lg border border-amber-200/80 bg-amber-50 px-3 py-2.5">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden />
        <p className="text-xs leading-relaxed text-amber-950">
          <span className="font-bold">Lưu ý:</span> Giá niêm yết đã kèm pin. Phí thủ tục tạm tính — quyết toán theo chứng từ thực tế tại thời điểm đăng kí.
        </p>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5 flex flex-col sm:flex-row gap-3">
        <a
          href={CONTACT_ZALO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-dark font-bold py-3 px-5 rounded-xl transition-colors shadow-sm text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Nhận báo giá qua Zalo
        </a>
        <a
          href={`tel:${CONTACT_PHONE_TEL}`}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-5 rounded-xl transition-colors shadow-sm text-sm"
        >
          <Phone className="w-4 h-4" />
          Gọi ngay {CONTACT_PHONE}
        </a>
      </div>
    </div>
  );
}
