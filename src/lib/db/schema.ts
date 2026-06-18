import type Database from "better-sqlite3";

export function runMigrations(db: Database.Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      meta_title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      image TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      image_caption TEXT,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      primary_keyword TEXT NOT NULL,
      keywords_json TEXT NOT NULL DEFAULT '[]',
      sapo_html TEXT NOT NULL,
      sections_json TEXT NOT NULL DEFAULT '[]',
      faqs_json TEXT NOT NULL DEFAULT '[]',
      author_json TEXT NOT NULL,
      conclusion_html TEXT NOT NULL,
      cta_json TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
    CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
    CREATE INDEX IF NOT EXISTS idx_articles_updated ON articles(updated_at DESC);

    CREATE TABLE IF NOT EXISTS promotions (
      id TEXT PRIMARY KEY,
      data_json TEXT NOT NULL,
      is_active INTEGER NOT NULL DEFAULT 1,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_promotions_active ON promotions(is_active);

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      display_name TEXT,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);
  `);
}
