import { SeoLink } from '@/components/SeoLink';
import { SeoContentImage } from '@/components/SeoImage';
import { PageHero } from '@/components/evg/PageHero';
import { PRODUCTS_SEO } from '@/lib/content/products';
import { getRichProductDetail } from '@/lib/content/product-details';
import { VINFAST_VEHICLES } from '@/lib/content/vinfast-can-tho';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

export default function Products() {
  const reviewBySlug = Object.fromEntries(
    VINFAST_VEHICLES.map((vehicle) => [
      vehicle.seoSlug ?? vehicle.id,
      vehicle.localReview,
    ]),
  );
  const fallbackFeaturesById: Record<string, string[]> = {
    'herio-green': ['Vận hành mạnh mẽ', 'Thiết kế khí động học'],
    'ec-van': ['Quãng đường 175 km/sạc', 'Sạc nhanh 10-70% trong 42p', 'Dung tích 2,6 m3'],
  };

  const products = PRODUCTS_SEO.map((product) => {
    const rich = getRichProductDetail(product.id);
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      desc: product.description,
      features: rich?.features?.slice(0, 4) ?? fallbackFeaturesById[product.id] ?? [],
      useCase: reviewBySlug[product.id]?.useCase,
      rating: reviewBySlug[product.id]?.rating,
    };
  });
  const COMMERCIAL_PRODUCT_IDS = new Set(["herio-green", "limo-green", "ec-van"]);
  const passengerProducts = products.filter(
    (product) => !COMMERCIAL_PRODUCT_IDS.has(product.id),
  );
  const commercialProducts = products.filter((product) =>
    COMMERCIAL_PRODUCT_IDS.has(product.id),
  );

  const renderProductGrid = (groupProducts: typeof products) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {groupProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="bg-white rounded-xl overflow-hidden border border-hairline hover:border-sky transition-colors flex flex-col h-full group"
        >
          <div className="relative h-56 overflow-hidden bg-tint">
            <SeoContentImage
              src={product.image}
              alt={`Xe điện VinFast ${product.name}: giá ${product.price}`}
              width={800}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end px-5 py-3">
              <SeoLink href={`/san-pham/${product.id}`} className="text-white font-semibold flex items-center text-sm">
                Xem chi tiết xe {product.name} <ArrowRight className="ml-2 w-4 h-4" />
              </SeoLink>
            </div>
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="text-xl font-semibold text-dark">{product.name}</h3>
              {product.rating && (
                <div className="flex items-center gap-1 text-sm font-semibold text-dark">
                  <Star className="w-4 h-4 text-sky fill-sky" />
                  {product.rating}/5
                </div>
              )}
            </div>
            <p className="text-primary font-semibold text-lg mb-3">{product.price}</p>
            {product.useCase && (
              <p className="text-xs font-semibold text-steel uppercase tracking-wider mb-2">
                {product.useCase}
              </p>
            )}
            <p className="text-steel text-sm leading-relaxed mb-5 flex-grow">{product.desc}</p>
            {product.features.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-dark mb-2">Tính năng chính</h4>
                <ul className="space-y-1.5">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-steel text-sm">
                      <CheckCircle2 className="w-4 h-4 text-sky mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <SeoLink
              href={`/san-pham/${product.id}`}
              className="btn w-full mt-auto"
              aria-label={`Xem chi tiết xe ${product.name}`}
            >
              Xem chi tiết
            </SeoLink>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <PageHero
        title="Ô tô VinFast"
        eyebrow="VinFast Cần Thơ"
        crumbs={[{ href: "/san-pham", label: "Ô tô VinFast" }]}
        image="/banner-homepage.webp"
        summary="Khám phá danh sách các dòng xe ô tô điện thông minh VinFast đang được phân phối chính hãng tại Cần Thơ EV."
      />

      {/* Product List */}
      <section className="p-body" aria-labelledby="product-list-heading">
        <div className="wrap">
          <h2 id="product-list-heading" className="sr-only">
            Danh sách xe điện VinFast tại Cần Thơ EV
          </h2>
          <div className="space-y-14">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-dark mb-6 flex items-center gap-3">
                <span aria-hidden className="inline-block w-4 h-2.5 bg-sky [clip-path:polygon(37%_0,100%_0,63%_100%,0_100%)]" />
                Dòng xe du lịch
              </h3>
              {renderProductGrid(passengerProducts)}
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-dark mb-6 flex items-center gap-3">
                <span aria-hidden className="inline-block w-4 h-2.5 bg-sky [clip-path:polygon(37%_0,100%_0,63%_100%,0_100%)]" />
                Dòng xe thương mại
              </h3>
              {renderProductGrid(commercialProducts)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
