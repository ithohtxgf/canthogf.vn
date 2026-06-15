"use client";

import type { PromotionPosition } from "@/lib/content/promotions";
import { PROMOTION_POSITION_OPTIONS } from "@/lib/admin/promotion-form-config";

type PositionGuideProps = {
  selected: PromotionPosition;
  onSelect?: (position: PromotionPosition) => void;
};

const ARTICLE_BLOCKS: {
  id: string;
  label: string;
  positions: PromotionPosition[];
  golden?: boolean;
}[] = [
  { id: "h1", label: "H1 + Meta", positions: [] },
  { id: "sapo", label: "Sapo", positions: [] },
  { id: "toc", label: "Mục lục", positions: [] },
  { id: "top", label: "★ Banner TOP (mồi nhử)", positions: ["top"], golden: true },
  { id: "h2-1", label: "H2 — Bối cảnh", positions: [] },
  { id: "h2-2", label: "H2 — Thân bài chi tiết", positions: [] },
  { id: "middle", label: "★ Banner MIDDLE (cảm xúc)", positions: ["middle"], golden: true },
  { id: "h3", label: "H3 — Chi tiết con", positions: [] },
  { id: "policy", label: "★ H2 Chính sách + POLICY", positions: ["policy"], golden: true },
  { id: "faq", label: "FAQ", positions: [] },
  { id: "bottom", label: "★ Kết luận + BOTTOM (chốt)", positions: ["bottom"], golden: true },
];

export function PromotionPositionGuide({
  selected,
  onSelect,
}: PositionGuideProps) {
  const selectedMeta = PROMOTION_POSITION_OPTIONS.find(
    (p) => p.value === selected,
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
      <div>
        <h3 className="font-bold text-slate-900 text-sm">4 vị trí vàng — Bài tin tức</h3>
        <p className="text-xs text-slate-500 mt-1">
          Click block để chọn vị trí. Popup & Sticky hiển thị toàn trang (không nằm trong flow bài).
        </p>
      </div>

      <div className="space-y-1">
        {ARTICLE_BLOCKS.map((block) => {
          const isActive = block.positions.includes(selected);
          const clickable = block.positions.length === 1 && onSelect;

          return (
            <button
              key={block.id}
              type="button"
              disabled={!clickable}
              onClick={() =>
                clickable && onSelect!(block.positions[0] as PromotionPosition)
              }
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                isActive
                  ? "bg-primary text-white font-semibold ring-2 ring-primary/30"
                  : block.golden
                    ? "bg-secondary/15 text-slate-800 border border-secondary/30 hover:bg-secondary/25"
                    : "bg-slate-50 text-slate-500 border border-transparent"
              } ${clickable ? "cursor-pointer" : "cursor-default"}`}
            >
              {block.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
        {(["popup", "sticky", "product-detail"] as PromotionPosition[]).map(
          (pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => onSelect?.(pos)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                selected === pos
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-600 border-slate-200 hover:border-primary"
              }`}
            >
              {pos}
            </button>
          ),
        )}
      </div>

      {selectedMeta && (
        <p className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-100">
          <strong>{selectedMeta.label}:</strong> {selectedMeta.hint}
        </p>
      )}
    </div>
  );
}
