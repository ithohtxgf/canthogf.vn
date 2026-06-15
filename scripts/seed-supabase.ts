/**
 * Seed Supabase từ dữ liệu tĩnh news.ts + promotions.ts (khi bảng trống).
 *
 * Chạy: npm run db:seed
 */
import "dotenv/config";
import { NEWS_ARTICLES } from "../src/lib/content/news";
import { PROMOTIONS } from "../src/lib/content/promotions";
import { isSupabaseEnabled } from "../src/lib/db/config";
import { getSupabaseAdmin } from "../src/lib/db/supabase-server";
import { articleToSupabaseRow } from "../src/lib/db/article-mapper";

async function seedArticles(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { count, error: countError } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true });

  if (countError) throw new Error(countError.message);
  if ((count ?? 0) > 0) {
    console.log(`• Articles: đã có ${count} bài — bỏ qua seed`);
    return;
  }

  const now = new Date().toISOString();
  const rows = NEWS_ARTICLES.map((article) =>
    articleToSupabaseRow({ ...article, status: "published" }, now, now),
  );

  const { error } = await supabase.from("articles").insert(rows);
  if (error) throw new Error(`seed articles: ${error.message}`);
  console.log(`✓ Seed ${rows.length} bài từ news.ts`);
}

async function seedPromotions(): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { count, error: countError } = await supabase
    .from("promotions")
    .select("*", { count: "exact", head: true });

  if (countError) throw new Error(countError.message);
  if ((count ?? 0) > 0) {
    console.log(`• Promotions: đã có ${count} KM — bỏ qua seed`);
    return;
  }

  const now = new Date().toISOString();
  const rows = PROMOTIONS.map((promo) => ({
    id: promo.id,
    data: promo,
    is_active: promo.isActive,
    updated_at: now,
  }));

  const { error } = await supabase.from("promotions").insert(rows);
  if (error) throw new Error(`seed promotions: ${error.message}`);
  console.log(`✓ Seed ${rows.length} KM từ promotions.ts`);
}

async function main() {
  if (!isSupabaseEnabled()) {
    console.error(
      "❌ Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env",
    );
    process.exit(1);
  }

  console.log("→ Seed Supabase...\n");
  await seedArticles();
  await seedPromotions();
  console.log("\n✅ Seed xong.");
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
