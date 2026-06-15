import { NextResponse } from "next/server";
import {
  deletePromotion,
  getPromotionById,
  updatePromotion,
} from "@/lib/db/promotions-db";
import type { Promotion } from "@/lib/content/promotions";
import {
  revalidatePromotionPaths,
  shouldRevalidatePromotions,
} from "@/lib/admin/revalidate-content";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const promotion = await getPromotionById(id);

  if (!promotion) {
    return NextResponse.json({ error: "Không tìm thấy khuyến mãi" }, { status: 404 });
  }

  return NextResponse.json({ promotion });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json()) as Promotion;
  const existing = await getPromotionById(id);

  try {
    const updated = await updatePromotion(id, { ...body, id });

    if (!updated) {
      return NextResponse.json({ error: "Không tìm thấy khuyến mãi" }, { status: 404 });
    }

    if (
      shouldRevalidatePromotions(updated.isActive, existing?.isActive)
    ) {
      revalidatePromotionPaths();
    }

    return NextResponse.json({ promotion: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Lưu thất bại";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const existing = await getPromotionById(id);
  const deleted = await deletePromotion(id);

  if (!deleted) {
    return NextResponse.json({ error: "Không tìm thấy khuyến mãi" }, { status: 404 });
  }

  if (existing?.isActive) {
    revalidatePromotionPaths();
  }

  return NextResponse.json({ ok: true });
}
