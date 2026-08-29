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
          Bảng giá niêm yết VinFast {product.shortName} tại Cần Thơ GF
        </caption>
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-500 text-xs uppercase tracking-wider">
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
            <tr key={variant.id} className="border-b border-gray-100">
              <th scope="row" className="py-4 text-left font-bold text-dark pr-4">
                {variant.name}
              </th>
              <td
                className={`py-4 text-right font-black text-primary-dark text-lg ${
                  showPromoColumn ? "text-gray-500 line-through pr-4 font-normal text-base" : ""
                }`}
              >
                {formatProductVnd(variant.listPrice)}
              </td>
              {showPromoColumn && (
                <td className="py-4 text-right font-black text-secondary-dark text-lg">
                  {formatProductVnd(variant.promoPrice)}
                </td>
              )}
            </tr>
          ))}
          {product.depositAmount && (
            <tr className="bg-gray-50">
              <th scope="row" className="py-4 text-left text-gray-700 font-medium pr-4">
                Đặt cọc
              </th>
              <td colSpan={showPromoColumn ? 2 : 1} className="py-4 text-right font-bold text-primary-dark">
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
        Bảng giá VinFast {product.shortName} tại Cần Thơ GF
      </caption>
      <tbody>
        <tr className="border-b border-gray-100">
          <th
            scope="row"
            className="py-4 text-left text-gray-600 font-medium pr-4"
          >
            Giá niêm yết
          </th>
          <td className="py-4 text-right font-bold text-primary-dark text-lg">
            {product.listPriceLabel}
          </td>
        </tr>
        {product.promoPriceLabel && voucherAmount > 0 && (
          <>
            <tr className="border-b border-gray-100 bg-green-50/50">
              <th
                scope="row"
                className="py-4 text-left text-gray-700 font-medium pr-4 pl-2"
              >
                {product.promoVoucherLabel ?? "Voucher ưu đãi chương trình"}
              </th>
              <td className="py-4 text-right font-bold text-green-700">
                − {formatProductVnd(voucherAmount)}
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="py-4 text-left text-dark font-bold pr-4"
              >
                Giá ưu đãi từ
              </th>
              <td className="py-4 text-right font-black text-secondary-dark text-xl">
                {product.promoPriceLabel}
              </td>
            </tr>
          </>
        )}
        {product.depositAmount && (
          <tr className="border-t border-gray-100 bg-gray-50">
            <th scope="row" className="py-4 text-left text-gray-700 font-medium pr-4">
              Đặt cọc
            </th>
            <td className="py-4 text-right font-bold text-primary-dark">
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
    <div className="bg-light min-h-screen pb-20">
      <section className="bg-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SeoLink
            href="/san-pham"
            className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors text-sm"
          >
            ← Quay lại danh mục ô tô VinFast Cần Thơ
          </SeoLink>
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-3">
            {product.segment}
          </p>
          {product.slogan && (
            <p className="text-gray-300 italic mb-3 text-lg">
              &ldquo;{product.slogan}&rdquo;
            </p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
          >
            {product.h1}
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mb-6" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap items-baseline gap-x-4 gap-y-2"
          >
            {heroPromoLabel && (
              <p className="text-lg">
                Giá ưu đãi từ{" "}
                <span className="text-2xl font-bold text-secondary">
                  {heroPromoLabel}
                </span>
              </p>
            )}
            {product.depositAmount && (
              <p className="text-gray-300 text-sm">
                Đặt cọc: {formatProductVnd(product.depositAmount)}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
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

              <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-xl sm:text-2xl font-bold text-dark mb-4">
                  Giới Thiệu {product.officialName}
                </h2>
                <div
                  className="text-gray-600 leading-relaxed prose prose-sm max-w-none mb-6"
                  dangerouslySetInnerHTML={{ __html: product.positioningHtml }}
                />
                <h3 className="text-lg font-bold text-dark mb-3">
                  Lợi Thế Chính
                </h3>
                <ul className="space-y-3">
                  {product.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-gray-700 text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Tag className="w-7 h-7 text-primary" />
                  <h2 className="text-xl sm:text-2xl font-bold text-dark">
                    Giá Bán
                  </h2>
                </div>
                <PriceTable product={product} />
                <p className="text-xs text-gray-500 mt-4">
                  * Giá ưu đãi phụ thuộc chương trình khuyến mãi hiện hành tại
                  Cần Thơ GF.
                </p>
                <SeoLink
                  href="/vinfast-can-tho#tinh-gia-lan-banh"
                  className="inline-flex items-center gap-1 mt-4 text-primary font-semibold text-sm hover:underline"
                >
                  Tính giá lăn bánh tại Cần Thơ →
                </SeoLink>
              </article>

              {product.batteryHighlight && (
                <article className="bg-gradient-to-br from-primary-dark to-primary p-6 sm:p-8 rounded-3xl text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <BatteryCharging className="w-8 h-8 text-secondary" />
                    <h2 className="text-xl font-bold">
                      {product.batterySectionTitle ?? "Pin & Sạc"}
                    </h2>
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-4">
                    {product.batteryHighlight}
                  </p>
                  {product.chargingSolutionItems &&
                    product.chargingSolutionItems.length > 0 && (
                      <ul className="space-y-2 mt-4 pt-4 border-t border-white/20 text-sm text-gray-200">
                        {product.chargingSolutionItems.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
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
                            <dt className="text-gray-400 text-xs">
                              {item.label}
                            </dt>
                            <dd className="text-white font-semibold text-sm">
                              {item.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  <div className="flex items-center gap-2 text-secondary text-sm font-semibold mt-4">
                    <MapPin className="w-4 h-4" />
                    Tư vấn {product.shortName} tại Cần Thơ GF
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
            <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-dark">
                  Thông Số Kỹ Thuật {product.officialName}
                </h2>
              </div>

              {product.compareSpecTables &&
                product.compareSpecTables.length > 0 && (
                  <div className="space-y-10">
                    {product.compareSpecTables.map((table) => (
                      <div key={table.id}>
                        <h3 className="text-lg font-bold text-primary-dark mb-4">
                          {table.heading}
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                          <table className="w-full text-sm min-w-[480px]">
                            <caption className="sr-only">
                              So sánh {table.heading} {compareLeftLabel} và{" "}
                              {compareRightLabel}
                            </caption>
                            <thead>
                              <tr className="bg-gray-50 text-left">
                                <th
                                  scope="col"
                                  className="px-4 py-3 font-semibold text-gray-600"
                                >
                                  Thông số
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 font-semibold text-gray-600"
                                >
                                  {compareLeftLabel}
                                </th>
                                <th
                                  scope="col"
                                  className="px-4 py-3 font-semibold text-gray-600"
                                >
                                  {compareRightLabel}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row) => (
                                <tr
                                  key={row.label}
                                  className="border-t border-gray-100"
                                >
                                  <th
                                    scope="row"
                                    className="px-4 py-3 text-gray-600 font-medium"
                                  >
                                    {row.label}
                                  </th>
                                  <td className="px-4 py-3 font-semibold text-dark">
                                    {row.eco}
                                  </td>
                                  <td className="px-4 py-3 font-semibold text-primary-dark">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                  {product.specGroups.map((group) => {
                    const HeadingTag =
                      group.headingLevel === 2 ? "h2" : "h3";
                    return (
                      <div key={group.id}>
                        <HeadingTag className="text-lg font-bold text-primary-dark mb-4 pb-2 border-b border-gray-100">
                          {group.heading}
                        </HeadingTag>
                        <dl className="space-y-3">
                          {group.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="flex justify-between gap-4 text-sm"
                            >
                              <dt className="text-gray-500">{spec.label}</dt>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.exteriorFeatureList && (
                <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Car className="w-7 h-7 text-primary" />
                    <h2 className="text-xl font-bold text-dark">
                      Tính Năng Ngoại Thất
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.exteriorFeatureList.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-700 text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
              {product.interiorFeatureList && (
                <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Home className="w-7 h-7 text-primary" />
                    <h2 className="text-xl font-bold text-dark">
                      Tính Năng Nội Thất
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.interiorFeatureList.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-700 text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          )}

          <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-dark">
                Màu Ngoại Thất ({product.exteriorColors.length} màu)
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {product.exteriorColors.map((color) => (
                <div
                  key={color.id}
                  className="rounded-2xl border border-gray-100 overflow-hidden text-center"
                >
                  <div
                    className="h-20 w-full border-b border-gray-100"
                    style={{ backgroundColor: color.hex ?? "#ccc" }}
                    role="img"
                    aria-label={`Màu ngoại thất ${color.nameVi} — ${color.name}`}
                  />
                  <div className="p-3">
                    <p className="font-bold text-dark text-sm">{color.name}</p>
                    <p className="text-gray-500 text-xs">{color.nameVi}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {product.interiorColors && product.interiorColors.length > 0 && (
            <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Home className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-dark">
                  Màu Nội Thất ({product.interiorColors.length} màu)
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl">
                {product.interiorColors.map((color) => (
                  <div
                    key={color.id}
                    className="rounded-2xl border border-gray-100 overflow-hidden text-center"
                  >
                    <div
                      className="h-20 w-full border-b border-gray-100"
                      style={{ backgroundColor: color.hex ?? "#ccc" }}
                      role="img"
                      aria-label={`Màu nội thất ${color.nameVi} — ${color.name}`}
                    />
                    <div className="p-3">
                      <p className="font-bold text-dark text-sm">{color.name}</p>
                      <p className="text-gray-500 text-xs">{color.nameVi}</p>
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
                className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100"
              >
                <HeadingTag className="text-xl sm:text-2xl font-bold text-dark mb-6">
                  {section.heading}
                </HeadingTag>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-gray-700 text-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          {(product.warrantyItems?.length ||
            product.afterSalesItems?.length) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.warrantyItems && (
                <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-7 h-7 text-primary" />
                    <h2 className="text-xl font-bold text-dark">
                      Chính Sách Bảo Hành
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.warrantyItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-700 text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
              {product.afterSalesItems && (
                <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-7 h-7 text-secondary-dark" />
                    <h2 className="text-xl font-bold text-dark">
                      Dịch Vụ Hậu Mãi
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {product.afterSalesItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-700 text-sm"
                      >
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
          )}

          {product.targetAudience && product.targetAudience.length > 0 && (
            <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-dark">
                  Phân Khúc &amp; Đối Tượng Khách Hàng
                </h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.targetAudience.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-gray-700 text-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}

          <article className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-dark mb-6">
              Điểm Nổi Bật {product.shortName}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>

          {product.disclaimerNotes && product.disclaimerNotes.length > 0 && (
            <article className="bg-amber-50 border border-amber-200 p-6 sm:p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
                <h2 className="text-lg font-bold text-dark">Lưu Ý Quan Trọng</h2>
              </div>
              <ul className="space-y-3">
                {product.disclaimerNotes.map((note) => (
                  <li
                    key={note}
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </article>
          )}

          <div className="bg-primary-dark p-8 sm:p-10 rounded-3xl text-white text-center">
            <h2 className="text-2xl font-bold mb-3">
              Đặt {product.officialName} Tại Cần Thơ GF
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nhận báo giá ưu đãi, hỗ trợ trả góp và đặt cọc
              {product.depositAmount
                ? ` ${formatProductVnd(product.depositAmount)}`
                : ""}{" "}
              — bàn giao xe tại Cần Thơ.
            </p>
            <button
              type="button"
              onClick={dispatchConsultationPopup}
              className="bg-secondary hover:bg-secondary-dark text-dark font-bold py-4 px-10 rounded-full transition-colors shadow-lg text-lg"
            >
              Đăng ký tư vấn {product.shortName}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
