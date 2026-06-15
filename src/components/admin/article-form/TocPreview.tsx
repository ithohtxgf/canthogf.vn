"use client";

import type { NewsContentSection } from "@/lib/content/news";
import { slugify } from "@/lib/admin/defaults";

type TocPreviewProps = {
  sections: NewsContentSection[];
  hasFaqs: boolean;
};

export function TocPreview({ sections, hasFaqs }: TocPreviewProps) {
  const h2Items = sections.filter((s) => s.level === 2);

  if (h2Items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-sm text-slate-500">
        Thêm section H2 để xem preview mục lục.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
      <p className="font-bold text-dark text-lg mb-4">📋 Mục lục (preview)</p>
      <ol className="space-y-2 list-decimal list-inside text-gray-700 text-sm">
        {h2Items.map((section) => (
          <li key={section.id}>
            <span className="text-primary font-medium">{section.heading}</span>
            <span className="text-xs text-slate-400 ml-2 font-mono">
              #{section.id || slugify(section.heading)}
            </span>
          </li>
        ))}
        {hasFaqs && (
          <li>
            <span className="text-primary font-medium">Câu hỏi thường gặp</span>
          </li>
        )}
        <li>
          <span className="text-primary font-medium">Kết luận</span>
        </li>
      </ol>
    </div>
  );
}
