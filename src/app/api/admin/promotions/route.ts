import { NextResponse } from "next/server";
import { denyIfNotAdmin } from "@/lib/admin/api-guard";
import {
  createPromotion,
  getPromotionById,
  listAllPromotions,
} from "@/lib/db/promotions-db";
import type { Promotion } from "@/lib/content/promotions";
import { revalidatePromotionPaths } from "@/lib/admin/revalidate-content";

export const runtime = "nodejs";

export async function GET() {
  const denied = await denyIfNotAdmin();
  if (denied) return denied;

  const promotions = await listAllPromotions();
  return NextResponse.json({ promotions });
}

export async function POST(request: Request) {
  const denied = await denyIfNotAdmin();
  if (denied) return denied;

  const body = (await request.json()) as Promotion;

  if (!body.id?.trim() || !body.title?.trim()) {
    return NextResponse.json(
      { error: "ID và tiêu đề là bắt buộc" },
      { status: 400 },
    );
  }

  if (await getPromotionById(body.id)) {
    return NextResponse.json({ error: "ID khuyến mãi đã tồn tại" }, { status: 409 });
  }

  try {
    const promotion = await createPromotion(body);
    revalidatePromotionPaths();
    return NextResponse.json({ promotion }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lưu thất bại";
    const statusCode = message.includes("tồn tại") ? 409 : 500;
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
