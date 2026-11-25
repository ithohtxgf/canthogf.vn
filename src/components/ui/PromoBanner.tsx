"use client";

import { SeoLink } from "@/components/SeoLink";
import { SeoContentImage } from "@/components/SeoImage";
import { PromoCountdown } from "@/components/news/PromoCountdown";
import {
  dispatchConsultationPopup,
  getActivePromotions,
  getActiveProductPromotions,
  getPromoCountdownEnd,
  type Promotion,
  type PromotionCategoryTarget,
  type PromotionPosition,
} from "@/lib/content/promotions";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Gift, Sparkles, Tag } from "lucide-react";

type PromoBannerProps =
  | {
      targets: PromotionCategoryTarget[];
      position: Exclude<PromotionPosition, "product-detail">;
      className?: string;
    }
  | {
      productId: string;
      position: "product-detail";
      className?: string;
    };

function PromoCtaButton({
  promo,
  size = "md",
  pulse = false,
}: {
  promo: Promotion;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}) {
  const label = promo.ctaLabel ?? promo.title;
  const sizeClass =
    size === "lg"
      ? "py-3.5 px-7 text-base"
      : size === "sm"
        ? "py-2 px-4 text-sm"
        : "py-3 px-6 text-base";

  const className = `inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors ${sizeClass}`;

  const inner = (
    <>
      {label}
      <ArrowRight className="w-4 h-4 ml-2" />
    </>
  );

  if (promo.openPopup) {
    return (
      <motion.button
        type="button"
        onClick={dispatchConsultationPopup}
        className={className}
        animate={pulse ? { scale: [1, 1.03, 1] } : undefined}
        transition={pulse ? { repeat: Infinity, duration: 2 } : undefined}
      >
        {inner}
      </motion.button>
    );
  }

  return (
    <motion.span
      animate={pulse ? { scale: [1, 1.03, 1] } : undefined}
      transition={pulse ? { repeat: Infinity, duration: 2 } : undefined}
    >
      <SeoLink href={promo.link} className={className}>
        {inner}
      </SeoLink>
    </motion.span>
  );
}

function PromotionRenderer({ promo }: { promo: Promotion }) {
  const countdownEnd = getPromoCountdownEnd(promo.validUntil);

  if (promo.displayStyle === "image" && promo.imageUrl) {
    return (
      <aside
        aria-label={promo.title}
        className="my-8 rounded-xl overflow-hidden border border-hairline hover:border-sky transition-colors"
      >
        <SeoLink href={promo.link} className="block">
          <SeoContentImage
            src={promo.imageUrl}
            alt={promo.title}
            width={promo.imageWidth ?? 800}
            height={promo.imageHeight ?? 400}
            className="w-full h-auto object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </SeoLink>
      </aside>
    );
  }

  if (promo.displayStyle === "strip") {
    return (
      <aside
        aria-label={promo.title}
        className="mb-10 rounded-xl overflow-hidden border border-hairline"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-tint-strong px-4 py-3 sm:py-2.5">
          {promo.badge && (
            <span className="shrink-0 inline-flex items-center gap-1 bg-dark text-white text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
              <Tag className="w-3 h-3" />
              {promo.badge}
            </span>
          )}
          <p className="flex-1 text-sm md:text-base font-semibold text-dark leading-snug">
            {promo.headline ?? promo.title}
          </p>
          <div className="flex items-center gap-3 shrink-0">
            {promo.showCountdown && (
              <PromoCountdown endDate={countdownEnd} />
            )}
            <PromoCtaButton promo={promo} size="sm" pulse />
          </div>
        </div>
      </aside>
    );
  }

  if (promo.displayStyle === "card") {
    return (
      <aside
        aria-label={promo.title}
        className="my-10 rounded-xl overflow-hidden"
      >
        <div className="bg-dark p-6 md:p-8 text-white relative">
          <div className="relative">
            {promo.badge && (
              <span className="inline-flex items-center gap-1 bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-sky" />
                {promo.badge}
              </span>
            )}
            <p className="text-2xl md:text-3xl font-semibold mb-2 leading-tight !text-white">
              {promo.headline ?? promo.title}
            </p>
            {promo.subline && (
              <p className="text-white/85 mb-4">{promo.subline}</p>
            )}
            {promo.highlight && (
              <p className="inline-block bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white font-semibold text-lg mb-6">
                {promo.highlight}
              </p>
            )}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <PromoCtaButton promo={promo} size="lg" pulse />
              {promo.showCountdown && (
                <PromoCountdown
                  endDate={countdownEnd}
                  className="!text-white [&_span]:!text-white/90 [&_.bg-red-600]:!bg-white/20"
                />
              )}
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (promo.displayStyle === "product-list") {
    return (
      <aside
        aria-label={promo.title}
        className="bg-tint p-7 rounded-xl border border-hairline"
      >
        <div className="flex items-center mb-6">
          <Gift className="w-8 h-8 text-primary mr-3 shrink-0" />
          <h3 className="text-xl font-semibold text-dark">
            {promo.headline ?? promo.title}
          </h3>
        </div>
        {promo.benefits && promo.benefits.length > 0 && (
          <ul className="space-y-4 mb-6">
            {promo.benefits.map((item, idx) => (
              <li key={idx} className="flex items-start text-ink font-medium">
                <CheckCircle2 className="w-5 h-5 text-sky mr-3 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
        {promo.showCountdown && (
          <div className="mb-4">
            <PromoCountdown endDate={countdownEnd} />
          </div>
        )}
        <PromoCtaButton promo={promo} pulse />
      </aside>
    );
  }

  if (promo.displayStyle === "table") {
    return (
      <aside
        aria-label={promo.title}
        className="my-8 rounded-xl border border-hairline overflow-hidden bg-white"
      >
        <div className="bg-tint-strong px-5 py-4 border-b border-hairline">
          <p className="font-semibold text-dark text-lg">
            {promo.headline ?? promo.title}
          </p>
          {promo.subline && (
            <p className="text-sm text-steel mt-1">{promo.subline}</p>
          )}
        </div>
        {promo.priceRows && promo.priceRows.length > 0 && (
          <div className="divide-y divide-hairline">
            {promo.priceRows.map((row, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center px-5 py-3 text-sm ${
                  row.highlight ? "bg-tint font-semibold" : ""
                }`}
              >
                <span className="text-ink">{row.label}</span>
                <span
                  className={
                    row.highlight
                      ? "text-primary font-semibold"
                      : "text-dark font-semibold"
                  }
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}
        {promo.benefits && promo.benefits.length > 0 && (
          <ul className="px-5 py-4 bg-tint space-y-2 border-t border-hairline">
            {promo.benefits.map((b, idx) => (
              <li key={idx} className="flex items-center text-sm text-ink">
                <span className="text-primary mr-2">✓</span>
                {b}
              </li>
            ))}
          </ul>
        )}
        <div className="px-5 py-4 bg-white border-t border-hairline text-center">
          <PromoCtaButton promo={promo} pulse />
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label={promo.title}
      className="rounded-xl overflow-hidden"
    >
      <div className="bg-dark p-6 md:p-10 text-center text-white">
        {promo.badge && (
          <span className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            <Gift className="w-4 h-4" />
            {promo.badge}
          </span>
        )}
        {promo.voucherText && (
          <p className="text-3xl md:text-4xl font-semibold text-sky mb-3">
            {promo.voucherText}
          </p>
        )}
        <p className="text-xl md:text-2xl font-semibold mb-3">
          {promo.headline ?? promo.title}
        </p>
        {promo.subline && (
          <p className="text-white/85 mb-8 max-w-lg mx-auto">{promo.subline}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PromoCtaButton promo={promo} size="lg" pulse />
          <a
            href="tel:0969991177"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-3.5 px-7 rounded-lg transition-colors"
          >
            Gọi Hotline 0969 99 11 77
          </a>
        </div>
      </div>
    </aside>
  );
}

/**
 * Banner khuyến mãi tái sử dụng — tự lọc từ Trung tâm khuyến mãi (promotions.ts).
 */
export function PromotionPreview({ promo }: { promo: Promotion }) {
  return <PromotionRenderer promo={promo} />;
}

export function PromoBanner(props: PromoBannerProps) {
  const activePromos =
    "productId" in props
      ? getActiveProductPromotions(props.productId, props.position)
      : getActivePromotions(props.targets, props.position);

  if (activePromos.length === 0) return null;

  const className = props.className;

  return (
    <div className={className}>
      <PromotionRenderer promo={activePromos[0]} />
    </div>
  );
}
