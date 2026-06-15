import { NextResponse } from "next/server";
import {
  createPromotion,
  getPromotionById,
} from "@/lib/db/promotions-db";
import { slugify } from "@/lib/admin/defaults";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const source = await getPromotionById(id);

  if (!source) {
    return NextResponse.json(
      { error: "Không tìm thấy khuyến mãi" },
      { status: 404 },
    );
  }

  const baseId = `${slugify(source.id)}-ban-sao`;
  let newId = baseId;
  let suffix = 2;

  while (await getPromotionById(newId)) {
    newId = `${baseId}-${suffix}`;
    suffix += 1;
  }

  try {
    const promotion = await createPromotion({
      ...source,
      id: newId,
      title: `${source.title} (bản sao)`,
      isActive: false,
    });

    return NextResponse.json({ promotion }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Nhân bản thất bại";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
