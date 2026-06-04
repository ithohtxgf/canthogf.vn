"use client";

import { NewsStickyBar } from "@/components/news/NewsStickyBar";
import { NewsExitIntentPopup } from "@/components/news/NewsExitIntentPopup";
import type { NewsArticle } from "@/lib/content/news";
import { getArticlePromotionTargets } from "@/lib/content/promotions";

type NewsArticleCroProps = {
  article: NewsArticle;
};

/** Sticky bar (mobile) + Exit-intent popup (desktop) — lấy KM từ promotions.ts */
export function NewsArticleCro({ article }: NewsArticleCroProps) {
  const targets = getArticlePromotionTargets(article);

  return (
    <>
      <NewsStickyBar targets={targets} />
      <NewsExitIntentPopup targets={targets} />
    </>
  );
}
