"use client";

import { SeoLink } from "@/components/SeoLink";
import { SeoContentImage } from "@/components/SeoImage";
import { PromoBanner } from "@/components/ui/PromoBanner";
import {
  formatProductVnd,
  getPromoVoucherAmount,
  type RichProductDetail,
} from "@/lib/content/product-details";
import { dispatchConsultationPopup } from "@/lib/content/promotions";
import { motion } from "motion/react";
import { PageHero } from "@/components/evg/PageHero";
import { LineIcon } from "@/components/evg/Icons";
import {
  BatteryCharging,
  Car,
  CheckCircle2,
  Home,
  MapPin,
  Palette,
  Shield,
  Tag,
  Users,
  Zap,
  AlertTriangle,
} from "lucide-react";

type RichProductDetailViewProps = {
  product: RichProductDetail;
};

function PriceTable({ product }: { product: RichProductDetail }) {
  const voucherAmount = getPromoVoucherAmount(product);
  const variants = product.priceVariants ?? [];
  const showPromoColumn = variants.some((v) => v.promoPrice < v.listPrice);

  if (variants.length) {
    return (
      <table className="w-full text-sm">
        <caption className="sr-only">
          Bảng giá niêm yết VinFast {product.shortName} tại Cần Thơ EV
        </caption>
        <thead>
          <tr className="border-b border-hairline text-left text-steel text-xs uppercase tracking-wider">
            <th scope="col" className="py-3 pr-4 font-semibold">
              Phiên bản
            </th>
            <th
              scope="col"
              className={`py-3 font-semibold text-right ${showPromoColumn ? "pr-4" : ""}`}
            >
              Giá niêm yết
            </th>
            {showPromoColumn && (
              <th scope="col" className="py-3 font-semibold text-right">
                Giá ưu đãi
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant.id} className="border-b border-hairline">
              <th scope="row" className="py-4 text-left font-semibold text-dark pr-4">
                {variant.name}
              </th>
              <td
                className={`py-4 text-right font-semibold text-dark text-lg ${
                  showPromoColumn ? "text-steel line-through pr-4 font-normal text-base" : ""
                }`}
              >
                {formatProductVnd(variant.listPrice)}
              </td>
              {showPromoColumn && (
                <td className="py-4 text-right font-semibold text-primary text-lg">
                  {formatProductVnd(variant.promoPrice)}
                </td>
              )}
            </tr>
          ))}
          {product.depositAmount && (
            <tr className="bg-tint">
              <th scope="row" className="py-4 text-left text-ink font-medium pr-4">
                Đặt cọc
              </th>
              <td colSpan={showPromoColumn ? 2 : 1} className="py-4 text-right font-semibold text-dark">
                {formatProductVnd(product.depositAmount)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  return (
    <table className="w-full text-sm">
      <caption className="sr-only">
        Bảng giá VinFast {product.shortName} tại Cần Thơ EV
      </caption>
      <tbody>
        <tr className="border-b border-hairline">
          <th
            scope="row"
            className="py-4 text-left text-steel font-medium pr-4"
          >
            Giá niêm yết
          </th>
          <td className="py-4 text-right font-semibold text-dark text-lg">
            {product.listPriceLabel}
          </td>
        </tr>
        {product.promoPriceLabel && voucherAmount > 0 && (
          <>
            <tr className="border-b border-hairline bg-tint">
              <th
                scope="row"
                className="py-4 text-left text-ink font-medium pr-4 pl-2"
              >
                {product.promoVoucherLabel ?? "Voucher ưu đãi chương trình"}
              </th>
              <td className="py-4 text-right font-semibold text-primary">
                − {formatProductVnd(voucherAmount)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="py-4 text-left text-dark font-semibold pr-4"
              >
                Giá ưu đãi từ
              </th>
              <td className="py-4 text-right font-semibold text-primary text-xl">
                {product.promoPriceLabel}
              </td>
            </tr>
          </>
        )}
        {product.depositAmount && (
          <tr className="border-t border-hairline bg-tint">
            <th scope="row" className="py-4 text-left text-ink font-medium pr-4">
              Đặt cọc
            </th>
            <td className="py-4 text-right font-semibold text-dark">
              {formatProductVnd(product.depositAmount)}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export function RichProductDetailView({ product }: RichProductDetailViewProps) {
  const heroPromoLabel =
    product.priceVariants?.[0]
      ? formatProductVnd(
          product.priceVariants[0].promoPrice < product.priceVariants[0].listPrice
            ? product.priceVariants[0].promoPrice
            : product.priceVariants[0].listPrice,
        )
      : product.promoPrice && product.promoPrice < product.listPrice
        ? product.promoPriceLabel
        : product.listPriceLabel;
  const compareLeftLabel =
    product.priceVariants?.[0]?.name ?? `${product.shortName} Eco`;
  const compareRightLabel =
    product.priceVariants?.[1]?.name ?? `${product.shortName} Plus`;

  return (
    <>
      <PageHero
        title={product.h1}
        eyebrow={product.segment}
        crumbs={[
          { href: "/san-pham", label: "Ô tô VinFast" },
          { href: `/san-pham/${product.id}`, label: product.shortName },
        ]}
        image={product.image}
        meta={
          heroPromoLabel || product.depositAmount ? (
            <>
              {heroPromoLabel && <>Giá ưu đãi từ {heroPromoLabel}</>}
              {heroPromoLabel && product.depositAmount && <span className="mx-2" aria-hidden>·</span>}
              {product.depositAmount && <>Đặt cọc: {formatProductVnd(product.depositAmount)}</>}
            </>
          ) : undefined
        }
        summary={
          <>
            {product.slogan && <span className="block mb-3">&ldquo;{product.slogan}&rdquo;</span>}
            <SeoLink href="/san-pham" className="text-sm">
              ← Quay lại danh mục ô tô VinFast Cần Thơ
            </SeoLink>
          </>
        }
      />

      <section className="p-body">
        <div className="wrap space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="rounded-xl overflow-hidden border border-hairline mb-6">
                <SeoContentImage
                  src={product.image}
                  alt={product.imageAlt}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
                <h2 className="text-xl sm:text-2xl font-semibold text-dark mb-4">
                  Giới Thiệu {product.officialName}
                </h2>
                <div
                  className="text-steel leading-relaxed prose prose-sm max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: product.positioningHtml }}
                />
                <h3 className="text-lg font-semibold text-dark mb-3">
                  Lợi Thế Chính
                </h3>
                <ul className="space-y-3">
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-ink text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-6 h-6 text-dark" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-dark">
                    Giá Bán
                  </h2>
                </div>
                <PriceTable product={product} />
                <p className="text-xs text-steel mt-4">
                  * Giá ưu đãi phụ thuộc chương trình khuyến mãi hiện hành tại
                  Cần Thơ EV.
                </p>
                <SeoLink
                  href="/vinfast-can-tho#tinh-gia-lan-banh"
                  className="inline-flex items-center gap-1 mt-4 text-primary font-semibold text-sm hover:underline"
                >
                  Tính giá lăn bánh tại Cần Thơ →
                </SeoLink>
              </article>

              {product.batteryHighlight && (
                <article className="bg-dark p-6 sm:p-8 rounded-xl text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <BatteryCharging className="w-7 h-7 text-sky" />
                    <h2 className="text-xl font-semibold !text-white">
                      {product.batterySectionTitle ?? "Pin & Sạc"}
                    </h2>
                  </div>
                  <p className="text-white/80 leading-relaxed mb-4">
                    {product.batteryHighlight}
                  </p>
                  {product.chargingSolutionItems &&
                    product.chargingSolutionItems.length > 0 && (
                      <ul className="space-y-2 mt-4 pt-4 border-t border-white/20 text-sm text-white/80">
                        {product.chargingSolutionItems.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-sky shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  {product.chargingInfrastructure &&
                    product.chargingInfrastructure.length > 0 && (
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/20">
                        {product.chargingInfrastructure.map((item) => (
                          <div key={item.label}>
                            <dt className="text-white/60 text-xs">
                              {item.label}
                            </dt>
                            <dd className="text-white font-semibold text-sm">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  <div className="flex items-center gap-2 text-[#7CCBF8] text-sm font-semibold mt-4">
                    <MapPin className="w-4 h-4" />
                    Tư vấn {product.shortName} tại Cần Thơ EV
                  </div>
                </article>
              )}

              <PromoBanner
                productId={product.id}
                position="product-detail"
              />
            </motion.div>
          </div>

          {(product.compareSpecTables?.length ||
            product.specGroups.length > 0) && (
            <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-6 h-6 text-dark" />
                <h2 className="text-2xl font-semibold text-dark">
                  Thông Số Kỹ Thuật {product.officialName}
                </h2>
              </div>

              {product.compareSpecTables &&
                product.compareSpecTables.length > 0 && (
                  <div className="space-y-10">
                    {product.compareSpecTables.map((table) => (
                      <div key={table.id}>
                        <h3 className="text-lg font-semibold text-dark mb-4">
                          {table.heading}
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-hairline">
                          <table className="w-full text-sm min-w-[480px]">
                            <caption className="sr-only">
                              So sánh {table.heading} {compareLeftLabel} và{" "}
                              {compareRightLabel}
                            </caption>
                            <thead>
                              <tr className="bg-tint text-left">
                                <th
                                  scope="col"
                                  className="px-4 py-3 font-semibold text-steel"
                                >
                                  Thông số
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 font-semibold text-steel"
                                >
                                  {compareLeftLabel}
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 font-semibold text-steel"
                                >
                                  {compareRightLabel}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row) => (
                                <tr
                                  key={row.label}
                                  className="border-t border-hairline"
                                >
                                  <th
                                    scope="row"
                                    className="px-4 py-3 text-steel font-medium"
                                  >
                                    {row.label}
                                  </th>
                                  <td className="px-4 py-3 font-semibold text-dark">
                                    {row.eco}
                                  </td>
                                  <td className="px-4 py-3 font-semibold text-dark">
                                    {row.plus}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              {product.specGroups.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {product.specGroups.map((group) => {
                    const HeadingTag =
                      group.headingLevel === 2 ? "h2" : "h3";
                    return (
                      <div key={group.id}>
                        <HeadingTag className="text-lg font-semibold text-dark mb-4 pb-2 border-b border-hairline">
                          {group.heading}
                        </HeadingTag>
                        <dl className="space-y-3">
                          {group.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="flex justify-between gap-4 text-sm"
                            >
                              <dt className="text-steel">{spec.label}</dt>
                              <dd className="font-semibold text-dark text-right">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          )}

          {(product.exteriorFeatureList?.length ||
            product.interiorFeatureList?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.exteriorFeatureList && (
                <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
                  <div className="flex items-center gap-3 mb-6">
                    <Car className="w-6 h-6 text-dark" />
                    <h2 className="text-xl font-semibold text-dark">
                      Tính Năng Ngoại Thất
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.exteriorFeatureList.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-ink text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
              {product.interiorFeatureList && (
                <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
                  <div className="flex items-center gap-3 mb-6">
                    <Home className="w-6 h-6 text-dark" />
                    <h2 className="text-xl font-semibold text-dark">
                      Tính Năng Nội Thất
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.interiorFeatureList.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-ink text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          )}

          <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-dark" />
              <h2 className="text-2xl font-semibold text-dark">
                Màu Ngoại Thất ({product.exteriorColors.length} màu)
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {product.exteriorColors.map((color) => (
                <div
                  key={color.id}
                  className="rounded-xl border border-hairline overflow-hidden text-center"
                >
                  <div
                    className="h-20 w-full border-b border-hairline"
                    style={{ backgroundColor: color.hex ?? "#ccc" }}
                    role="img"
                    aria-label={`Màu ngoại thất ${color.nameVi}: ${color.name}`}
                  />
                  <div className="p-3">
                    <p className="font-semibold text-dark text-sm">{color.name}</p>
                    <p className="text-steel text-xs">{color.nameVi}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {product.interiorColors && product.interiorColors.length > 0 && (
            <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
              <div className="flex items-center gap-3 mb-6">
                <Home className="w-6 h-6 text-dark" />
                <h2 className="text-2xl font-semibold text-dark">
                  Màu Nội Thất ({product.interiorColors.length} màu)
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
                {product.interiorColors.map((color) => (
                  <div
                    key={color.id}
                    className="rounded-xl border border-hairline overflow-hidden text-center"
                  >
                    <div
                      className="h-20 w-full border-b border-hairline"
                      style={{ backgroundColor: color.hex ?? "#ccc" }}
                      role="img"
                      aria-label={`Màu nội thất ${color.nameVi}: ${color.name}`}
                    />
                    <div className="p-3">
                      <p className="font-semibold text-dark text-sm">{color.name}</p>
                      <p className="text-steel text-xs">{color.nameVi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )}

          {product.featureSections?.map((section) => {
            const HeadingTag = section.headingLevel === 3 ? "h3" : "h2";
            return (
              <article
                key={section.id}
                className="bg-white p-6 sm:p-8 rounded-xl border border-hairline"
              >
                <HeadingTag className="text-xl sm:text-2xl font-semibold text-dark mb-6">
                  {section.heading}
                </HeadingTag>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-ink text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          {(product.warrantyItems?.length ||
            product.afterSalesItems?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.warrantyItems && (
                <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-dark" />
                    <h2 className="text-xl font-semibold text-dark">
                      Chính Sách Bảo Hành
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.warrantyItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-ink text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
              {product.afterSalesItems && (
                <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-dark" />
                    <h2 className="text-xl font-semibold text-dark">
                      Dịch Vụ Hậu Mãi
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.afterSalesItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-ink text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          )}

          {product.targetAudience && product.targetAudience.length > 0 && (
            <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-dark" />
                <h2 className="text-2xl font-semibold text-dark">
                  Phân Khúc &amp; Đối Tượng Khách Hàng
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.targetAudience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-ink text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}

          <article className="bg-white p-6 sm:p-8 rounded-xl border border-hairline">
            <h2 className="text-2xl font-semibold text-dark mb-6">
              Điểm Nổi Bật {product.shortName}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-ink"
                >
                  <CheckCircle2 className="w-5 h-5 text-sky shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          {product.disclaimerNotes && product.disclaimerNotes.length > 0 && (
            <article className="bg-tint-strong border border-hairline p-6 sm:p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-dark" />
                <h2 className="text-lg font-semibold text-dark">Lưu Ý Quan Trọng</h2>
              </div>
              <ul className="space-y-3">
                {product.disclaimerNotes.map((note) => (
                  <li
                    key={note}
                    className="text-sm text-ink leading-relaxed"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </article>
          )}

          <div className="h-cta">
            <div>
              <p className="h-eyebrow">Tư vấn miễn phí</p>
              <h2 className="text-dark">
                Đặt {product.officialName} Tại Cần Thơ EV
              </h2>
              <p>
                Nhận báo giá ưu đãi, hỗ trợ trả góp và đặt cọc
                {product.depositAmount
                  ? ` ${formatProductVnd(product.depositAmount)}`
                  : ""}
                , bàn giao xe tại Cần Thơ.
              </p>
            </div>
            <button
              type="button"
              onClick={dispatchConsultationPopup}
              className="h-pill h-pill--solid"
            >
              Đăng ký tư vấn {product.shortName} <LineIcon name="arrow" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
