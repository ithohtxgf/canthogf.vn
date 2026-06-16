import { LIMO_GREEN_DETAIL } from "@/lib/content/products/limo-green";
import { VF3_DETAIL } from "@/lib/content/products/vf3";
import { VF5_DETAIL } from "@/lib/content/products/vf5";
import { VF6_DETAIL } from "@/lib/content/products/vf6";
import { MPV7_DETAIL } from "@/lib/content/products/mpv7";
import { VF7_DETAIL } from "@/lib/content/products/vf7";
import { VF8_DETAIL } from "@/lib/content/products/vf8";
import { VF8_ALL_NEW_DETAIL } from "@/lib/content/products/vf8-all-new";
import { VF9_DETAIL } from "@/lib/content/products/vf9";

export type ProductPriceVariant = {
  id: string;
  name: string;
  listPrice: number;
  promoPrice: number;
};

export type ProductSpecGroup = {
  id: string;
  heading: string;
  headingLevel: 2 | 3;
  specs: { label: string; value: string }[];
};

export type CompareSpecRow = {
  label: string;
  eco: string;
  plus: string;
};

export type CompareSpecTable = {
  id: string;
  heading: string;
  rows: CompareSpecRow[];
};

export type ProductFeatureSection = {
  id: string;
  heading: string;
  headingLevel?: 2 | 3;
  items: string[];
};

export type ExteriorColor = {
  id: string;
  name: string;
  nameVi: string;
  hex?: string;
};

export type RichProductDetail = {
  id: string;
  officialName: string;
  segment: string;
  shortName: string;
  slogan?: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  listPrice: number;
  listPriceLabel: string;
  promoPrice?: number;
  promoPriceLabel?: string;
  promoVoucherLabel?: string;
  depositAmount?: number;
  priceVariants?: ProductPriceVariant[];
  positioningHtml: string;
  highlights: string[];
  specGroups: ProductSpecGroup[];
  exteriorColors: ExteriorColor[];
  exteriorFeatureList?: string[];
  interiorFeatureList?: string[];
  chargingInfrastructure?: { label: string; value: string }[];
  features: string[];
  batteryHighlight?: string;
  batterySectionTitle?: string;
  compareSpecTables?: CompareSpecTable[];
  interiorColors?: ExteriorColor[];
  featureSections?: ProductFeatureSection[];
  warrantyItems?: string[];
  afterSalesItems?: string[];
  chargingSolutionItems?: string[];
  disclaimerNotes?: string[];
  targetAudience?: string[];
};

const RICH_PRODUCT_DETAILS: Record<string, RichProductDetail> = {
  "limo-green": LIMO_GREEN_DETAIL,
  vf3: VF3_DETAIL,
  vf5: VF5_DETAIL,
  vf6: VF6_DETAIL,
  vf7: VF7_DETAIL,
  vf8: VF8_DETAIL,
  "vf8-all-new": VF8_ALL_NEW_DETAIL,
  vf9: VF9_DETAIL,
  mpv7: MPV7_DETAIL,
};

export function getRichProductDetail(
  id: string,
): RichProductDetail | undefined {
  return RICH_PRODUCT_DETAILS[id];
}

export function formatProductVnd(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} VNĐ`;
}

export function getPromoVoucherAmount(detail: RichProductDetail): number {
  if (!detail.promoPrice) return 0;
  return detail.listPrice - detail.promoPrice;
}
