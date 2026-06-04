"use client";

import {
  dispatchConsultationPopup,
  getPrimaryPromotion,
  type PromotionCategoryTarget,
} from "@/lib/content/promotions";
import { Phone, Gift } from "lucide-react";

type NewsStickyBarProps = {
  targets: PromotionCategoryTarget[];
};

/** Thanh CTA cố định đáy màn hình — chỉ hiện trên mobile */
export function NewsStickyBar({ targets }: NewsStickyBarProps) {
  const promo = getPrimaryPromotion(targets, "sticky");
  const promoLabel = promo?.ctaLabel ?? promo?.title ?? "Nhận khuyến mãi";

  const handlePromoClick = () => {
    if (promo?.openPopup) {
      dispatchConsultationPopup();
      return;
    }
    if (promo?.link) {
      window.location.href = promo.link;
    } else {
      dispatchConsultationPopup();
    }
  };

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] px-3 py-2.5"
      role="complementary"
      aria-label="Liên hệ nhanh"
    >
      <div className="flex gap-2 max-w-lg mx-auto">
        <a
          href="tel:0916513720"
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-3 rounded-xl text-sm transition-colors"
        >
          <Phone className="w-4 h-4 shrink-0" />
          Gọi ngay
        </a>
        <button
          type="button"
          onClick={handlePromoClick}
          className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-dark font-bold py-3 px-3 rounded-xl text-sm transition-colors"
        >
          <Gift className="w-4 h-4 shrink-0" />
          {promoLabel}
        </button>
      </div>
    </div>
  );
}
