import { getDb } from "./connection";
import type { Promotion } from "@/lib/content/promotions";

export type PromotionRow = {
  id: string;
  data_json: string;
  is_active: number;
  updated_at: string;
};

function parsePromotion(row: PromotionRow): Promotion {
  const data = JSON.parse(row.data_json) as Promotion;
  return {
    ...data,
    id: row.id,
    isActive: row.is_active === 1,
  };
}

export async function listAllPromotionsSqlite(): Promise<Promotion[]> {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM promotions ORDER BY updated_at DESC")
    .all() as PromotionRow[];
  return rows.map(parsePromotion);
}

export async function getPromotionByIdSqlite(
  id: string,
): Promise<Promotion | undefined> {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM promotions WHERE id = ?")
    .get(id) as PromotionRow | undefined;
  return row ? parsePromotion(row) : undefined;
}

export async function createPromotionSqlite(
  promo: Promotion,
): Promise<Promotion> {
  const db = getDb();
  const now = new Date().toISOString();
  const payload = { ...promo, isActive: promo.isActive };

  db.prepare(
    `
    INSERT INTO promotions (id, data_json, is_active, updated_at)
    VALUES (@id, @data_json, @is_active, @updated_at)
  `,
  ).run({
    id: promo.id,
    data_json: JSON.stringify(payload),
    is_active: promo.isActive ? 1 : 0,
    updated_at: now,
  });

  return (await getPromotionByIdSqlite(promo.id))!;
}

export async function updatePromotionSqlite(
  id: string,
  promo: Promotion,
): Promise<Promotion | undefined> {
  const existing = await getPromotionByIdSqlite(id);
  if (!existing) return undefined;

  const db = getDb();
  const now = new Date().toISOString();
  const payload = { ...promo, id, isActive: promo.isActive };

  db.prepare(
    `
    UPDATE promotions SET
      data_json = @data_json,
      is_active = @is_active,
      updated_at = @updated_at
    WHERE id = @id
  `,
  ).run({
    id,
    data_json: JSON.stringify(payload),
    is_active: promo.isActive ? 1 : 0,
    updated_at: now,
  });

  return getPromotionByIdSqlite(id);
}

export async function deletePromotionSqlite(id: string): Promise<boolean> {
  const db = getDb();
  const result = db.prepare("DELETE FROM promotions WHERE id = ?").run(id);
  return result.changes > 0;
}
