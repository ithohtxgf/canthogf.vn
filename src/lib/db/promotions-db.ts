import type { Promotion } from "@/lib/content/promotions";
import { isSupabaseEnabled } from "@/lib/db/config";
import {
  createPromotionSqlite,
  deletePromotionSqlite,
  getPromotionByIdSqlite,
  listAllPromotionsSqlite,
  updatePromotionSqlite,
} from "./promotions-sqlite";
import {
  createPromotionSupabase,
  deletePromotionSupabase,
  getPromotionByIdSupabase,
  listAllPromotionsSupabase,
  updatePromotionSupabase,
} from "./promotions-supabase";

export async function listAllPromotions(): Promise<Promotion[]> {
  return isSupabaseEnabled()
    ? listAllPromotionsSupabase()
    : listAllPromotionsSqlite();
}

export async function getPromotionById(
  id: string,
): Promise<Promotion | undefined> {
  return isSupabaseEnabled()
    ? getPromotionByIdSupabase(id)
    : getPromotionByIdSqlite(id);
}

export async function createPromotion(promo: Promotion): Promise<Promotion> {
  return isSupabaseEnabled()
    ? createPromotionSupabase(promo)
    : createPromotionSqlite(promo);
}

export async function updatePromotion(
  id: string,
  promo: Promotion,
): Promise<Promotion | undefined> {
  return isSupabaseEnabled()
    ? updatePromotionSupabase(id, promo)
    : updatePromotionSqlite(id, promo);
}

export async function deletePromotion(id: string): Promise<boolean> {
  return isSupabaseEnabled()
    ? deletePromotionSupabase(id)
    : deletePromotionSqlite(id);
}
