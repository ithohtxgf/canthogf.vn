"use client";

import { Plus, Trash2 } from "lucide-react";
import { AdminButton, AdminField, adminInputClass } from "@/components/admin/AdminShell";
import type { PromotionPriceRow } from "@/lib/content/promotions";

type PriceRowsEditorProps = {
  rows: PromotionPriceRow[];
  onChange: (rows: PromotionPriceRow[]) => void;
};

export function PriceRowsEditor({ rows, onChange }: PriceRowsEditorProps) {
  function updateRow(index: number, patch: Partial<PromotionPriceRow>) {
    onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function addRow() {
    onChange([...rows, { label: "", value: "" }]);
  }

  function removeRow(index: number) {
    onChange(rows.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Bảng giá (priceRows)</p>
        <AdminButton type="button" variant="secondary" onClick={addRow}>
          <Plus className="w-4 h-4 mr-1 inline" /> Thêm dòng
        </AdminButton>
      </div>

      {rows.length === 0 && (
        <p className="text-xs text-slate-400 italic">
          Dùng cho displayStyle &quot;table&quot; — VD: Giá niêm yết, Lệ phí trước bạ...
        </p>
      )}

      {rows.map((row, index) => (
        <div
          key={index}
          className="grid md:grid-cols-[1fr_1fr_auto_auto] gap-2 items-end bg-slate-50 rounded-lg p-3"
        >
          <AdminField label="Nhãn">
            <input
              className={adminInputClass}
              value={row.label}
              onChange={(e) => updateRow(index, { label: e.target.value })}
              placeholder="Giá niêm yết VF5"
            />
          </AdminField>
          <AdminField label="Giá trị">
            <input
              className={adminInputClass}
              value={row.value}
              onChange={(e) => updateRow(index, { value: e.target.value })}
              placeholder="529.000.000đ"
            />
          </AdminField>
          <label className="flex items-center gap-2 text-xs pb-2 whitespace-nowrap">
            <input
              type="checkbox"
              checked={row.highlight ?? false}
              onChange={(e) =>
                updateRow(index, { highlight: e.target.checked })
              }
            />
            Highlight
          </label>
          <AdminButton
            type="button"
            variant="danger"
            className="!px-2 !py-2 mb-0.5"
            onClick={() => removeRow(index)}
          >
            <Trash2 className="w-4 h-4" />
          </AdminButton>
        </div>
      ))}
    </div>
  );
}
