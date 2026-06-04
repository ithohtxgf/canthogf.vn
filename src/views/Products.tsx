import { SeoLink } from '@/components/SeoLink';
import { SeoBannerImage, SeoContentImage } from '@/components/SeoImage';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Products() {
  const products = [
    {
      id: 'herio-green',
      name: 'Herio Green',
      image: 'https://picsum.photos/seed/heriogreen/800/500',
      price: 'Từ 479.000.000 VNĐ',
      desc: 'Dòng xe xanh thân thiện môi trường, tối ưu hóa cho di chuyển đường dài và tiết kiệm năng lượng cực tốt.',
      features: ['Động cơ tối ưu', 'Vận hành mạnh mẽ', 'Thiết kế khí động học'],
    },
    {
      id: 'vf5',
      name: 'VF5',
      image: 'https://picsum.photos/seed/vf5/800/500',
      price: '529.000.000 VNĐ',
      desc: 'Ngoại thất ấn tượng, trẻ trung. Không gian rộng rãi, vận hành êm ái mạnh mẽ',
      features: ['Quãng đường 326,4 km/lần sạc', 'Sạc nhanh 10-70% trong 33p', 'Bảo hành xe mới 7 năm/160.000 km'],
    },
    {
      id: 'limo-green',
      name: 'Limo Green',
      image: 'https://picsum.photos/seed/limogreen/800/500',
      price: '749.000.000 VNĐ',
      desc: 'Xe điện 7 chỗ - "rộng mở không gian, kéo dài hành trình". Tăng kích cỡ, tăng kinh tế với tầm di chuyển rộng phù hợp cho chạy đường dài.',
      features: ['Quãng đường 450 km/lần sạc', 'Sạc nhanh 10-70% trong 30p', 'Sức chứa 7 chỗ rộng rãi'],
    },
    {
      id: 'ec-van',
      name: 'EC Van',
      image: 'https://picsum.photos/seed/ecvan/800/500',
      price: '285.000.000 VNĐ',
      desc: 'Vận tải đa năng, tiện dụng, sinh lời. Linh hoạt lưu thông nội đô, vận hành êm ái, giảm chi phí vận hành, tối đa lợi nhuận',
      features: ['Quãng đường 175 km/sạc', 'Sạc nhanh 10-70% trong 42p', 'Dung tích 2,6 m3'],
    },
  ];

  return (
    <div className="bg-light min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="https://images.unsplash.com/photo-1503377218671-5917865cbb66?auto=format&fit=crop&q=80&w=1920&h=600"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
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
                  <h3 className="text-2xl font-bold text-dark mb-2">{product.name}</h3>
                  <p className="text-primary-dark font-bold text-xl mb-4">{product.price}</p>
                  <p className="text-gray-600 mb-6 flex-grow">{product.desc}</p>
                  
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
                  
                  <SeoLink
                    href={`/san-pham/${product.id}`}
                    className="block w-full text-center bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-colors mt-auto"
                  >
                    Xem chi tiết
                  </SeoLink>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
