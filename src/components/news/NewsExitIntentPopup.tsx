"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Gift } from "lucide-react";
import {
  dispatchConsultationPopup,
  getPrimaryPromotion,
  type PromotionCategoryTarget,
} from "@/lib/content/promotions";
import { SeoLink } from "@/components/SeoLink";

type NewsExitIntentPopupProps = {
  targets: PromotionCategoryTarget[];
};

const STORAGE_KEY = "ctgf-exit-intent-shown";

/** Popup exit-intent — desktop: chuột rời viewport phía trên */
export function NewsExitIntentPopup({ targets }: NewsExitIntentPopupProps) {
  const promo = getPrimaryPromotion(targets, "popup");
  const [open, setOpen] = useState(false);
  const triggered = useRef(false);

  const tryShow = useCallback(() => {
    if (!promo) return;
    if (triggered.current) return;
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    triggered.current = true;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setOpen(true);
  }, [promo]);

  useEffect(() => {
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) tryShow();
    };

    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () =>
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
  }, [tryShow]);

  if (!promo) return null;

  const handleCta = () => {
    setOpen(false);
    if (promo.openPopup) dispatchConsultationPopup();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
          >
            <div className="bg-gradient-to-r from-primary-dark to-primary p-6 text-white relative">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                aria-label="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
              <Gift className="w-10 h-10 text-secondary mb-3" />
              <h2 id="exit-intent-title" className="text-2xl font-black mb-2">
                {promo.headline ?? promo.title}
              </h2>
              {promo.subline && (
                <p className="text-white/85 text-sm">{promo.subline}</p>
              )}
            </div>
            <div className="p-6 space-y-3">
              {promo.openPopup ? (
                <button
                  type="button"
                  onClick={handleCta}
                  className="w-full bg-secondary hover:bg-secondary-dark text-dark font-bold py-3.5 rounded-xl transition-colors"
                >
                  {promo.ctaLabel ?? promo.title}
                </button>
              ) : (
                <SeoLink
                  href={promo.link}
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-secondary hover:bg-secondary-dark text-dark font-bold py-3.5 rounded-xl transition-colors"
                >
                  {promo.ctaLabel ?? promo.title}
                </SeoLink>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-gray-500 text-sm py-2 hover:text-gray-700"
              >
                Không, cảm ơn — Tôi sẽ đọc tiếp
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
