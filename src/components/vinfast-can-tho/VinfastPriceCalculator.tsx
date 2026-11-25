"use client";

import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { Calculator, MessageCircle, Minus, Plus } from "lucide-react";
import {
  VINFAST_PROCEDURE_FEES,
  VINFAST_VEHICLES,
  VINFAST_VOUCHERS,
  calculateDetailedRollingPrice,
  formatVnd,
} from "@/lib/content/vinfast-can-tho";
import { CONTACT_ZALO_URL } from "@/lib/contact";

const DEFAULT_VEHICLE_ID = VINFAST_VEHICLES[1]?.id ?? "vf5-plus";

const DEFAULT_FEES = new Set(
  Object.values(VINFAST_PROCEDURE_FEES)
    .filter((f) => f.id !== "registration")
    .map((fee) => fee.id),
);

const DEFAULT_VOUCHERS = new Set([
  "voucher-truoc-ba",
  "voucher-can-tho-ev",
]);

export function VinfastPriceCalculator() {
  const [selectedVehicleId, setSelectedVehicleId] = useState(DEFAULT_VEHICLE_ID);
  const [selectedFees, setSelectedFees] = useState<Set<string>>(
    () => new Set(DEFAULT_FEES),
  );
  const [selectedVouchers, setSelectedVouchers] = useState<Set<string>>(
    () => new Set(DEFAULT_VOUCHERS),
  );

  const selectedVehicle = useMemo(
    () =>
      VINFAST_VEHICLES.find((v) => v.id === selectedVehicleId) ??
      VINFAST_VEHICLES[0],
    [selectedVehicleId],
  );

  const { lineItems, feesTotal, vouchersTotal, rollingPrice } = useMemo(
    () =>
      calculateDetailedRollingPrice(
        selectedVehicle.listPrice,
        selectedFees,
        selectedVouchers,
      ),
    [selectedVehicle.listPrice, selectedFees, selectedVouchers],
  );

  function toggleInSet(
    setter: Dispatch<SetStateAction<Set<string>>>,
    id: string,
  ) {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-white rounded-xl border border-hairline overflow-hidden">
      <div className="bg-tint-strong border-b border-hairline px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center">
            <Calculator className="w-6 h-6 text-dark" />
          </div>
          <div>
            <p className="h-eyebrow !mb-1">
              Minh bạch chi phí
            </p>
            <p className="text-dark font-semibold text-lg sm:text-xl">
              Bảng Ước Tính Giá Lăn Bánh Chi Tiết Tại Cần Thơ
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div>
          <label
            htmlFor="vinfast-vehicle-select"
            className="block text-sm font-semibold text-dark mb-2"
          >
            Chọn dòng xe VinFast
          </label>
          <select
            id="vinfast-vehicle-select"
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-tint px-4 py-3.5 text-dark font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-shadow"
          >
            {VINFAST_VEHICLES.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}: {formatVnd(vehicle.listPrice)}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-steel">
            Tất cả giá niêm yết đã bao gồm pin, không áp dụng chính sách thuê
            pin.
          </p>
        </div>

        <fieldset>
          <legend className="block text-sm font-semibold text-dark mb-3">
            Chi phí thủ tục tại Cần Thơ
          </legend>
          <div className="space-y-3">
            {Object.values(VINFAST_PROCEDURE_FEES).map((fee) => {
              const displayAmount =
                "dynamicPercent" in fee && fee.dynamicPercent
                  ? Math.round(selectedVehicle.listPrice * fee.dynamicPercent)
                  : fee.amount;
              return (
                <label
                  key={fee.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-hairline bg-tint hover:bg-tint/80 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedFees.has(fee.id)}
                    onChange={() => toggleInSet(setSelectedFees, fee.id)}
                    className="w-5 h-5 mt-0.5 rounded border-hairline text-primary focus:ring-primary"
                  />
                  <span className="flex-1">
                    <span className="block text-ink font-medium">
                      {fee.label}
                    </span>
                    {"note" in fee && fee.note && (
                      <span className="block text-xs text-steel mt-0.5">
                        {fee.note}
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-dark shrink-0">
                    {displayAmount > 0
                      ? `+ ${formatVnd(displayAmount)}`
                      : "Tùy chọn"}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="block text-sm font-semibold text-dark mb-3">
            Voucher &amp; ưu đãi CanThoEV (trừ vào giá lăn bánh)
          </legend>
          <div className="space-y-3">
            {VINFAST_VOUCHERS.map((voucher) => {
              const displayAmount =
                voucher.id === "voucher-truoc-ba"
                  ? Math.round(selectedVehicle.listPrice * 0.1)
                  : voucher.amount;
              return (
                <label
                  key={voucher.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-hairline bg-tint hover:bg-tint-strong cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedVouchers.has(voucher.id)}
                    onChange={() => toggleInSet(setSelectedVouchers, voucher.id)}
                    className="w-5 h-5 mt-0.5 rounded border-hairline text-sky focus:ring-sky"
                  />
                  <span className="flex-1">
                    <span className="block text-ink font-medium">
                      {voucher.label}
                    </span>
                    <span className="block text-xs text-steel mt-0.5">
                      {voucher.description}
                    </span>
                  </span>
                  <span className="font-semibold text-primary shrink-0">
                    − {formatVnd(displayAmount)}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Bảng chi tiết từng khoản */}
        <div className="rounded-xl border border-hairline overflow-hidden">
          <div className="bg-tint px-4 py-3 border-b border-hairline">
            <p className="font-semibold text-dark text-sm uppercase tracking-wider">
              Bảng giá lăn bánh chi tiết: {selectedVehicle.name}
            </p>
          </div>
          <table className="w-full text-sm">
            <caption className="sr-only">
              Bảng ước tính giá lăn bánh VinFast {selectedVehicle.name} tại Cần
              Thơ
            </caption>
            <thead>
              <tr className="border-b border-hairline">
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-semibold text-steel"
                >
                  Khoản mục
                </th>
                <th
                  scope="col"
                  className="text-right px-4 py-3 font-semibold text-steel"
                >
                  Số tiền
                </th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-50 ${
                    item.type === "voucher" ? "bg-tint" : ""
                  }`}
                >
                  <td className="px-4 py-3 text-ink">
                    <span className="inline-flex items-center gap-1.5">
                      {item.type === "fee" && (
                        <Plus className="w-3.5 h-3.5 text-primary" />
                      )}
                      {item.type === "voucher" && (
                        <Minus className="w-3.5 h-3.5 text-primary" />
                      )}
                      {item.label}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-semibold ${
                      item.type === "voucher"
                        ? "text-primary"
                        : item.type === "base"
                          ? "text-dark"
                          : "text-ink"
                    }`}
                  >
                    {item.type === "voucher"
                      ? `− ${formatVnd(Math.abs(item.amount))}`
                      : formatVnd(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-dark text-white">
                <td className="px-4 py-4 font-semibold">
                  Giá lăn bánh tạm tính tại Cần Thơ
                </td>
                <td className="px-4 py-4 text-right font-semibold text-xl text-white">
                  {formatVnd(rollingPrice)}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="px-4 py-3 bg-tint text-xs text-steel border-t border-hairline">
            Phí thủ tục: +{formatVnd(feesTotal)} · Voucher: −
            {formatVnd(vouchersTotal)} · Chưa bao gồm bảo hiểm vật chất và phụ
            kiện tùy chọn.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <p className="text-sm text-steel max-w-md">
            Khác với trang chính hãng chỉ hiển thị giá niêm yết, bảng tính này
            giúp bạn nắm rõ toàn bộ chi phí lăn bánh tại Cần Thơ trước khi quyết
            định.
          </p>
          <a
            href={CONTACT_ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-6 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-5 h-5" />
            Nhận báo giá chi tiết qua Zalo
          </a>
        </div>
      </div>
    </div>
  );
}
