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
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-hairline px-3 py-2.5"
      role="complementary"
      aria-label="Liên hệ nhanh"
    >
      <div className="flex gap-2 max-w-lg mx-auto">
        <a
          href="tel:0969991177"
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-3 rounded-lg text-sm transition-colors"
        >
          <Phone className="w-4 h-4 shrink-0" />
          Gọi ngay
        </a>
        <button
          type="button"
          onClick={handlePromoClick}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-primary text-primary hover:bg-tint-strong font-semibold py-3 px-3 rounded-lg text-sm transition-colors"
        >
          <Gift className="w-4 h-4 shrink-0" />
          {promoLabel}
        </button>
      </div>
    </div>
  );
}
