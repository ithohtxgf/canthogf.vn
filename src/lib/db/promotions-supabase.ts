import type { Promotion } from "@/lib/content/promotions";
import { getSupabaseAdmin } from "./supabase-server";

type SupabasePromotionRow = {
  id: string;
  data: Promotion;
  is_active: boolean;
  updated_at: string;
};

function parsePromotion(row: SupabasePromotionRow): Promotion {
  const data = row.data;
  return {
    ...data,
    id: row.id,
    isActive: row.is_active,
  };
}

export async function listAllPromotionsSupabase(): Promise<Promotion[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw new Error(`[supabase] listPromotions: ${error.message}`);
  return (data as SupabasePromotionRow[]).map(parsePromotion);
}

export async function getPromotionByIdSupabase(
  id: string,
): Promise<Promotion | undefined> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`[supabase] getPromotion: ${error.message}`);
  if (!data) return undefined;

  return parsePromotion(data as SupabasePromotionRow);
}

export async function createPromotionSupabase(
  promo: Promotion,
): Promise<Promotion> {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const payload = { ...promo, isActive: promo.isActive };

  const { data, error } = await supabase
    .from("promotions")
    .insert({
      id: promo.id,
      data: payload,
      is_active: promo.isActive,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("ID khuyến mãi đã tồn tại");
    }
    throw new Error(`[supabase] createPromotion: ${error.message}`);
  }

  return parsePromotion(data as SupabasePromotionRow);
}

export async function updatePromotionSupabase(
  id: string,
  promo: Promotion,
): Promise<Promotion | undefined> {
  const existing = await getPromotionByIdSupabase(id);
  if (!existing) return undefined;

  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const payload = { ...promo, id, isActive: promo.isActive };

  const { data, error } = await supabase
    .from("promotions")
    .update({
      data: payload,
      is_active: promo.isActive,
      updated_at: now,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(`[supabase] updatePromotion: ${error.message}`);

  return parsePromotion(data as SupabasePromotionRow);
}

export async function deletePromotionSupabase(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { error, count } = await supabase
    .from("promotions")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) throw new Error(`[supabase] deletePromotion: ${error.message}`);
  return (count ?? 0) > 0;
}

export async function upsertPromotionsSupabase(
  rows: { id: string; data: Promotion; is_active: boolean; updated_at: string }[],
): Promise<void> {
  if (rows.length === 0) return;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("promotions").upsert(rows, {
    onConflict: "id",
  });
  if (error) throw new Error(`[supabase] upsertPromotions: ${error.message}`);
}
