"use client";

import { useEffect } from "react";
import { NewsArticleBody } from "@/components/news/NewsArticleBody";
import type { NewsArticle } from "@/lib/content/news";
import {
  hydratePromotionsCatalog,
  type Promotion,
} from "@/lib/content/promotions";

type AdminArticlePreviewBodyProps = {
  article: NewsArticle;
  promotions: Promotion[];
};

export function AdminArticlePreviewBody({
  article,
  promotions,
}: AdminArticlePreviewBodyProps) {
  useEffect(() => {
    hydratePromotionsCatalog(promotions);
  }, [promotions]);

  return <NewsArticleBody article={article} />;
}
