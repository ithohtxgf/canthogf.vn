import type Database from "better-sqlite3";
import { NEWS_ARTICLES } from "@/lib/content/news";
import { PROMOTIONS } from "@/lib/content/promotions";
import { articleToRow, type ArticleRow } from "./article-mapper";

export function seedDatabaseIfEmpty(db: Database.Database): void {
  const articleCount = db
    .prepare("SELECT COUNT(*) AS count FROM articles")
    .get() as { count: number };

  if (articleCount.count === 0 && NEWS_ARTICLES.length > 0) {
    const now = new Date().toISOString();
    const insert = db.prepare(`
      INSERT INTO articles (
        id, title, meta_title, excerpt, image, image_alt, image_caption,
        date, category, primary_keyword, keywords_json, sapo_html,
        sections_json, faqs_json, author_json, conclusion_html, cta_json,
        status, created_at, updated_at
      ) VALUES (
        @id, @title, @meta_title, @excerpt, @image, @image_alt, @image_caption,
        @date, @category, @primary_keyword, @keywords_json, @sapo_html,
        @sections_json, @faqs_json, @author_json, @conclusion_html, @cta_json,
        @status, @created_at, @updated_at
      )
    `);

    const seedMany = db.transaction((rows: ArticleRow[]) => {
      for (const row of rows) {
        insert.run(row);
      }
    });

    seedMany(
      NEWS_ARTICLES.map((article) =>
        articleToRow({ ...article, status: "published" }, now, now),
      ),
    );
  }

  const promoCount = db
    .prepare("SELECT COUNT(*) AS count FROM promotions")
    .get() as { count: number };

  if (promoCount.count === 0 && PROMOTIONS.length > 0) {
    const now = new Date().toISOString();
    const insert = db.prepare(`
      INSERT INTO promotions (id, data_json, is_active, updated_at)
      VALUES (@id, @data_json, @is_active, @updated_at)
    `);

    const seedMany = db.transaction(() => {
      for (const promo of PROMOTIONS) {
        insert.run({
          id: promo.id,
          data_json: JSON.stringify(promo),
          is_active: promo.isActive ? 1 : 0,
          updated_at: now,
        });
      }
    });

    seedMany();
  }
}
