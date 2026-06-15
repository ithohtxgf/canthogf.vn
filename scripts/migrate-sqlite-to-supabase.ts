/**
 * Migrate dữ liệu từ SQLite (data/canthogf.db) lên Supabase.
 *
 * Yêu cầu .env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Chạy: npm run db:migrate
 */
import "dotenv/config";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { isSupabaseEnabled } from "../src/lib/db/config";
import { getSupabaseAdmin } from "../src/lib/db/supabase-server";
import {
  articleToSupabaseRow,
  rowToArticle,
  type ArticleRow,
} from "../src/lib/db/article-mapper";
import type { Promotion } from "../src/lib/content/promotions";

function getSqlitePath(): string {
  return path.join(process.cwd(), "data", "canthogf.db");
}

async function migrateArticles(): Promise<number> {
  const dbPath = getSqlitePath();
  if (!fs.existsSync(dbPath)) {
    console.log("⚠ Không tìm thấy SQLite — bỏ qua articles");
    return 0;
  }

  const db = new Database(dbPath, { readonly: true });
  const rows = db
    .prepare("SELECT * FROM articles ORDER BY updated_at DESC")
    .all() as ArticleRow[];

  if (rows.length === 0) {
    console.log("• SQLite articles: 0 dòng");
    return 0;
  }

  const supabase = getSupabaseAdmin();
  const payload = rows.map((row) => {
    const article = rowToArticle(row);
    const { createdAt, updatedAt, ...input } = article;
    return articleToSupabaseRow(input, createdAt, updatedAt);
  });

  const { error } = await supabase.from("articles").upsert(payload, {
    onConflict: "id",
  });

  if (error) throw new Error(`articles upsert: ${error.message}`);
  console.log(`✓ Articles: ${payload.length} bài`);
  return payload.length;
}

async function migratePromotions(): Promise<number> {
  const dbPath = getSqlitePath();
  if (!fs.existsSync(dbPath)) {
    return 0;
  }

  const db = new Database(dbPath, { readonly: true });
  const rows = db
    .prepare("SELECT * FROM promotions ORDER BY updated_at DESC")
    .all() as {
    id: string;
    data_json: string;
    is_active: number;
    updated_at: string;
  }[];

  if (rows.length === 0) {
    console.log("• SQLite promotions: 0 dòng");
    return 0;
  }

  const supabase = getSupabaseAdmin();
  const payload = rows.map((row) => {
    const data = JSON.parse(row.data_json) as Promotion;
    return {
      id: row.id,
      data: { ...data, id: row.id, isActive: row.is_active === 1 },
      is_active: row.is_active === 1,
      updated_at: row.updated_at,
    };
  });

  const { error } = await supabase.from("promotions").upsert(payload, {
    onConflict: "id",
  });

  if (error) throw new Error(`promotions upsert: ${error.message}`);
  console.log(`✓ Promotions: ${payload.length} KM`);
  return payload.length;
}

async function main() {
  if (!isSupabaseEnabled()) {
    console.error(
      "❌ Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env",
    );
    process.exit(1);
  }

  console.log("→ Migrate SQLite → Supabase...\n");
  const articleCount = await migrateArticles();
  const promoCount = await migratePromotions();

  if (articleCount === 0 && promoCount === 0) {
    console.log(
      "\n💡 DB SQLite trống? Chạy npm run db:seed để nạp từ file news.ts",
    );
  } else {
    console.log("\n✅ Migrate xong.");
  }
}

main().catch((err) => {
  console.error("❌", err);
  process.exit(1);
});
