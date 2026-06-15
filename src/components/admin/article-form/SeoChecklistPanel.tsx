"use client";

import type { SeoCheckItem } from "@/lib/admin/article-seo-checklist";
import { CheckCircle2, AlertCircle, Circle } from "lucide-react";

type SeoChecklistPanelProps = {
  items: SeoCheckItem[];
};

export function SeoChecklistPanel({ items }: SeoChecklistPanelProps) {
  const passed = items.filter((i) => i.ok).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900">Checklist SEO</h3>
        <span className="text-sm font-semibold text-primary">
          {passed}/{items.length}
        </span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-2 text-sm">
            {item.ok ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            ) : item.warn ? (
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
            )}
            <span
              className={
                item.ok
                  ? "text-slate-600"
                  : item.warn
                    ? "text-amber-700"
                    : "text-slate-800"
              }
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
