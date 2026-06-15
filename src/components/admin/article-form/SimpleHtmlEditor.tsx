"use client";

import { useRef } from "react";
import { Bold, Italic, Link2 } from "lucide-react";
import { AdminField, adminTextareaClass } from "@/components/admin/AdminShell";
import { INTERNAL_LINK_PRESETS } from "@/lib/admin/article-form-config";

type SimpleHtmlEditorProps = {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
};

export function SimpleHtmlEditor({
  label,
  hint,
  value,
  onChange,
  rows = 5,
  required,
}: SimpleHtmlEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  function wrapSelection(before: string, after: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end) || "văn bản";
    const next =
      value.slice(0, start) + before + selected + after + value.slice(end);
    onChange(next);
  }

  function insertInternalLink(href: string) {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = value.slice(start, end) || "liên kết nội bộ";
    const tag = `<a href="${href}" class="text-primary font-semibold hover:underline">${text}</a>`;
    onChange(value.slice(0, start) + tag + value.slice(end));
  }

  return (
    <AdminField label={label} hint={hint}>
      <div className="border border-slate-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary">
        <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 bg-slate-50 border-b border-slate-200">
          <button
            type="button"
            title="In đậm"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
            onClick={() => wrapSelection("<strong>", "</strong>")}
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="In nghiêng"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
            onClick={() => wrapSelection("<em>", "</em>")}
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Link ngoài"
            className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
            onClick={() =>
              wrapSelection(
                '<a href="https://vinfastauto.com" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold hover:underline">',
                "</a>",
              )
            }
          >
            <Link2 className="w-4 h-4" />
          </button>
          <span className="w-px h-5 bg-slate-300 mx-1" />
          {INTERNAL_LINK_PRESETS.map((link) => (
            <button
              key={link.href}
              type="button"
              className="text-xs px-2 py-1 rounded bg-white border border-slate-200 hover:border-primary text-slate-600"
              onClick={() => insertInternalLink(link.href)}
            >
              + {link.label}
            </button>
          ))}
        </div>
        <textarea
          ref={ref}
          className={`${adminTextareaClass} border-0 rounded-none focus:ring-0`}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      </div>
    </AdminField>
  );
}
