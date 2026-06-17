import { SeoLink } from '@/components/SeoLink';
import { SeoBannerImage, SeoContentImage } from '@/components/SeoImage';
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
    'herio-green': ['Động cơ tối ưu', 'Vận hành mạnh mẽ', 'Thiết kế khí động học'],
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {groupProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col h-full"
        >
          <div className="relative h-64 overflow-hidden group">
            <SeoContentImage
              src={product.image}
              alt={`Xe điện VinFast ${product.name} — giá ${product.price}`}
              width={800}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <SeoLink href={`/san-pham/${product.id}`} className="text-white font-bold flex items-center hover:text-secondary">
                Xem chi tiết xe {product.name} <ArrowRight className="ml-2 w-5 h-5" />
              </SeoLink>
            </div>
          </div>
          
          <div className="p-8 flex-grow flex flex-col">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-2xl font-bold text-dark">{product.name}</h3>
              {product.rating && (
                <div className="flex items-center gap-1 text-sm font-bold text-dark">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {product.rating}/5
                </div>
              )}
            </div>
            <p className="text-primary-dark font-bold text-xl mb-4">{product.price}</p>
            {product.useCase && (
              <p className="text-xs font-semibold text-secondary-dark uppercase tracking-wider mb-2">
                {product.useCase}
              </p>
            )}
            <p className="text-gray-600 mb-6 flex-grow">{product.desc}</p>
            {product.features.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Tính năng nổi bật</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <SeoLink
              href={`/san-pham/${product.id}`}
              className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors mt-auto"
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
    <div className="bg-light min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="/banner-homepage.webp"
            alt="Danh mục ô tô VinFast Cần Thơ tại Cần Thơ GF"
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-primary-dark/80 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6"
          >
            Ô tô VinFast
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Khám phá danh sách các dòng xe ô tô điện thông minh VinFast đang được phân phối chính hãng tại Cần Thơ GF.
          </motion.p>
        </div>
      </section>

      {/* Product List */}
      <section className="py-20" aria-labelledby="product-list-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="product-list-heading" className="sr-only">
            Danh sách xe điện VinFast tại Cần Thơ GF
          </h2>
          <div className="space-y-14">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-dark uppercase tracking-tight">
                  Dòng xe du lịch
                </h3>
                <div className="w-20 h-1 bg-primary mt-3"></div>
              </div>
              {renderProductGrid(passengerProducts)}
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-dark uppercase tracking-tight">
                  Dòng xe thương mại
                </h3>
                <div className="w-20 h-1 bg-secondary mt-3"></div>
              </div>
              {renderProductGrid(commercialProducts)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
