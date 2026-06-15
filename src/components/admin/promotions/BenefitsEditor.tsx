"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";
import { AdminButton, adminInputClass } from "@/components/admin/AdminShell";

type BenefitsEditorProps = {
  benefits: string[];
  onChange: (benefits: string[]) => void;
};

export function BenefitsEditor({ benefits, onChange }: BenefitsEditorProps) {
  function updateItem(index: number, value: string) {
    onChange(benefits.map((b, i) => (i === index ? value : b)));
  }

  function addItem() {
    onChange([...benefits, ""]);
  }

  function removeItem(index: number) {
    onChange(benefits.filter((_, i) => i !== index));
  }

  function moveItem(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= benefits.length) return;
    const next = [...benefits];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">Quyền lợi / ưu đãi</p>
        <AdminButton type="button" variant="secondary" onClick={addItem}>
          <Plus className="w-4 h-4 mr-1 inline" /> Thêm mục
        </AdminButton>
      </div>

      {benefits.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <GripVertical className="w-4 h-4 text-slate-300 shrink-0" />
          <input
            className={`${adminInputClass} flex-1`}
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="VD: Tặng 100% lệ phí trước bạ"
          />
          <AdminButton
            type="button"
            variant="secondary"
            className="!px-2"
            onClick={() => moveItem(index, -1)}
            disabled={index === 0}
          >
            ↑
          </AdminButton>
          <AdminButton
            type="button"
            variant="secondary"
            className="!px-2"
            onClick={() => moveItem(index, 1)}
            disabled={index === benefits.length - 1}
          >
            ↓
          </AdminButton>
          <AdminButton
            type="button"
            variant="danger"
            className="!px-2"
            onClick={() => removeItem(index)}
          >
            <Trash2 className="w-4 h-4" />
          </AdminButton>
        </div>
      ))}
    </div>
  );
}
