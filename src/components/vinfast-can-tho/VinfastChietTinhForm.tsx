"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, FileText, MessageCircle, Phone } from "lucide-react";
import { VINFAST_VEHICLES, formatVnd } from "@/lib/content/vinfast-can-tho";
import { CONTACT_PHONE, CONTACT_PHONE_TEL, CONTACT_ZALO_URL } from "@/lib/contact";

export function VinfastChietTinhForm() {
  const [vehicleId, setVehicleId] = useState("limo-green");
  const [discountPct, setDiscountPct] = useState(9);
  const [insExchange, setInsExchange] = useState(15_000_000);
  const [registrationPct, setRegistrationPct] = useState(0);
  const [phiDangKi, setPhiDangKi] = useState(200_000);
  const [phiEpBien, setPhiEpBien] = useState(600_000);
  const [phiDangKiem, setPhiDangKiem] = useState(140_000);
  const [phiDichVu, setPhiDichVu] = useState(3_000_000);
  const [phiBhTnds, setPhiBhTnds] = useState(1_200_000);
  const [phiDuongBo, setPhiDuongBo] = useState(2_160_000);
  const [phiBhThanXe, setPhiBhThanXe] = useState(11_000_000);
  const [showFees, setShowFees] = useState(false);

  const vehicle = useMemo(
    () => VINFAST_VEHICLES.find((v) => v.id === vehicleId) ?? VINFAST_VEHICLES[0],
    [vehicleId],
  );

  const q = useMemo(() => {
    const listPrice = vehicle.listPrice;
    const discountAmt = Math.round((listPrice * discountPct) / 100);
    const carValue = Math.max(listPrice - discountAmt - insExchange, 0);
    const regFee = Math.round((carValue * registrationPct) / 100);
    const bodyIns = Math.max(phiBhThanXe, 0);
    const phuLuc =
      regFee + phiDangKi + phiEpBien + phiDangKiem + phiDichVu + phiBhTnds + phiDuongBo + bodyIns;
    const totalCash = carValue + phuLuc;
    return { listPrice, discountAmt, carValue, regFee, bodyIns, phuLuc, totalCash };
  }, [vehicle, discountPct, insExchange, registrationPct, phiDangKi, phiEpBien, phiDangKiem, phiDichVu, phiBhTnds, phiDuongBo, phiBhThanXe]);

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
        <div className="flex flex-col gap-1">
          <label htmlFor="ct-vehicle" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Loại xe / Phiên bản
          </label>
          <select
            id="ct-vehicle"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            {VINFAST_VEHICLES.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — {formatVnd(v.listPrice)}
              </option>
            ))}
          </select>
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
                onChange={(e) => setDiscountPct(Number(e.target.value))}
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
              onChange={(e) => setInsExchange(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        </div>

        {/* Toggle fees */}
        <button
          type="button"
          onClick={() => setShowFees((v) => !v)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors text-xs font-semibold text-gray-600"
        >
          <span>Tùy chỉnh phí thủ tục & bảo hiểm</span>
          {showFees ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
                    onChange={(e) => set(Number(e.target.value))}
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
              <td className="px-3 py-2 text-center font-medium border border-gray-200">{vehicle.name}</td>
              <td className="px-3 py-2 text-center border border-gray-200">
                {vehicleId === "limo-green" ? "Limo Green" : vehicle.name}
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
                  {q.discountAmt.toLocaleString("vi-VN")}
                </td>
              </tr>
            )}

            {/* Empty separator */}
            <tr className="border-b border-gray-200 h-2">
              <td colSpan={4} className="border border-gray-200"></td>
            </tr>

            {/* Insurance exchange row */}
            {insExchange > 0 && (
              <tr className="border-b border-gray-200">
                <td className="px-3 py-2 border border-gray-200"></td>
                <td colSpan={2} className="px-3 py-2 text-center font-bold text-red-600 border border-gray-200">
                  Quy đổi bảo hiểm
                </td>
                <td className="px-3 py-2 text-right font-bold text-red-600 border border-gray-200 whitespace-nowrap">
                  {insExchange.toLocaleString("vi-VN")}
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
                {formatVnd(q.phuLuc)}
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
                Tổng số tiền thanh toán tiền mặt: Tiền xe + Phụ lục
              </td>
              <td className="px-4 py-3 text-right font-black text-primary-dark text-base border border-gray-300 whitespace-nowrap underline underline-offset-2">
                {formatVnd(q.totalCash)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Disclaimer */}
      <p className="px-5 py-3 text-xs text-gray-500 border-t border-gray-100">
        Giá niêm yết đã kèm pin. Phí thủ tục tạm tính — quyết toán theo chứng từ thực tế tại thời điểm đăng kí.
      </p>

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
