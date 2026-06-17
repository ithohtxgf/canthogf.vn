import { getRichProductDetail } from "@/lib/content/product-details";
import { getProductById } from "@/lib/content/products";

export type ChietTinhVariant = {
  id: string;
  variantName: string;
  listPrice: number;
};

export type ChietTinhModelLine = {
  id: string;
  name: string;
  variants: ChietTinhVariant[];
};

/** Dòng xe hiển thị trong form chiết tính — map tới trang /san-pham */
const CHIET_TINH_PRODUCT_IDS = [
  "vf3",
  "vf5",
  "vf6",
  "vf7",
  "vf8",
  "vf9",
  "limo-green",
  "herio-green",
  "ec-van",
] as const;

function parseListPriceFromProductPrice(price: string): number | undefined {
  const digits = price.replace(/[^\d]/g, "");
  if (!digits) return undefined;
  const amount = Number(digits);
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

function variantsForProduct(productId: string): ChietTinhVariant[] {
  const rich = getRichProductDetail(productId);

  if (rich?.priceVariants?.length) {
    return rich.priceVariants.map((variant) => ({
      id: variant.id,
      variantName: variant.name,
      listPrice: variant.listPrice,
    }));
  }

  if (rich && rich.listPrice > 0) {
    const variantName =
      productId === "vf5"
        ? "VF 5 Plus"
        : productId === "limo-green"
          ? "Limo Green"
          : rich.shortName;
    return [
      {
        id: `${productId}-default`,
        variantName,
        listPrice: rich.listPrice,
      },
    ];
  }

  const product = getProductById(productId);
  const listPrice = product?.price
    ? parseListPriceFromProductPrice(product.price)
    : undefined;

  if (listPrice) {
    return [
      {
        id: `${productId}-default`,
        variantName: product?.name ?? productId,
        listPrice,
      },
    ];
  }

  return [];
}

function modelLineDisplayName(
  productId: string,
  rich: ReturnType<typeof getRichProductDetail>,
  product: ReturnType<typeof getProductById>,
): string {
  if (rich?.shortName) return rich.shortName;
  const raw = product?.name ?? productId;
  return raw.replace(/^VinFast\s+/i, "").trim();
}

function buildChietTinhModelLines(): ChietTinhModelLine[] {
  return CHIET_TINH_PRODUCT_IDS.flatMap((productId) => {
    const product = getProductById(productId);
    const rich = getRichProductDetail(productId);
    const variants = variantsForProduct(productId);
    if (variants.length === 0) return [];

    return [
      {
        id: productId,
        name: modelLineDisplayName(productId, rich, product),
        variants,
      },
    ];
  });
}

export const CHIET_TINH_MODEL_LINES: ChietTinhModelLine[] = buildChietTinhModelLines();

export function getChietTinhModelLine(modelId: string): ChietTinhModelLine | undefined {
  return CHIET_TINH_MODEL_LINES.find((line) => line.id === modelId);
}

export function getChietTinhVariant(
  modelId: string,
  variantId: string,
): (ChietTinhVariant & { modelId: string; modelName: string }) | undefined {
  const line = getChietTinhModelLine(modelId);
  if (!line) return undefined;
  const variant = line.variants.find((item) => item.id === variantId) ?? line.variants[0];
  if (!variant) return undefined;
  return { ...variant, modelId: line.id, modelName: line.name };
}

export const DEFAULT_CHIET_TINH_MODEL_ID = "limo-green";

export function getDefaultChietTinhSelection(): { modelId: string; variantId: string } {
  const line =
    getChietTinhModelLine(DEFAULT_CHIET_TINH_MODEL_ID) ?? CHIET_TINH_MODEL_LINES[0];
  return {
    modelId: line.id,
    variantId: line.variants[0]?.id ?? line.id,
  };
}
