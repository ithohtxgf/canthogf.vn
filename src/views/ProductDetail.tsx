import { SeoLink } from '@/components/SeoLink';
import { SeoContentImage } from '@/components/SeoImage';
import { PromoBanner } from '@/components/ui/PromoBanner';
import { dispatchConsultationPopup } from '@/lib/content/promotions';
import { motion } from 'motion/react';
import { CheckCircle2, ArrowLeft, Zap, Shield } from 'lucide-react';

export default function ProductDetail({ id }: { id: string }) {

  // Mock data based on ID
  type ProductType = {
    name: string;
    price: string;
    image: string;
    desc: string;
    priceTiers?: { label: string; value: string }[];
    specs: { label: string; value: string }[];
    features: string[];
  };

  const productData: Record<string, ProductType> = {
    'herio-green': {
      name: 'Herio Green',
      price: 'Từ 479.000.000 VNĐ',
      image: 'https://picsum.photos/seed/heriogreendetail/1200/600',
      desc: 'Định nghĩa lại trải nghiệm xe dịch vụ thời đại xanh. Herio Green sở hữu thiết kế hiện đại, trẻ trung, cá tính và nổi bật với các lựa chọn phối màu nội ngoại thất, đảm bảo cá nhân hóa theo phong cách sống, cá tính và sở thích của mỗi khách hàng.',
      priceTiers: [
        { label: 'Tiêu chuẩn 2', value: '479.000.000 VNĐ' },
        { label: 'Tiêu chuẩn 1', value: '499.000.000 VNĐ' }
      ],
      specs: [
        { label: 'Dài x Rộng x Cao', value: '3967 x 1723 x 1579 mm' },
        { label: 'Chiều dài cơ sở', value: '2514 mm' },
        { label: 'Khoảng sáng gầm xe', value: '160 mm' },
        { label: 'Công suất tối đa', value: '100 kW' },
        { label: 'Mô men xoắn cực đại', value: '135 Nm' },
        { label: 'Quãng đường chạy (NEDC)', value: '326 km/lần sạc đầy' },
        { label: 'Dung lượng pin khả dụng', value: '37,23 kWh' },
        { label: 'Thời gian nạp pin (10%-70%)', value: '33 phút' },
        { label: 'Dẫn động', value: 'FWD/Cầu trước' },
        { label: 'Chế độ lái', value: 'Eco/Sport' },
        { label: 'Hệ thống treo (trước/sau)', value: 'MacPherson/Dầm xoắn' },
        { label: 'Hệ thống phanh (trước/sau)', value: 'Đĩa/Đĩa' },
        { label: 'Kích thước la-zăng', value: '16 inch' }
      ],
      features: [
        'Đèn chiếu sáng phía trước Bi-halogen, projector',
        'Đóng/mở cốp sau chỉnh cơ',
        'Hệ thống điều hòa chỉnh cơ',
        'Màn hình giải trí cảm ứng 10 inch',
        'Hệ thống 2 loa',
        'Ghế lái chỉnh cơ 4 hướng',
        'Tùy chọn bộ sạc tại nhà (kW)'
      ]
    },
    'vf5': {
      name: 'VF5',
      price: '529.000.000 VNĐ',
      image: 'https://picsum.photos/seed/vf5detail/1200/600',
      desc: 'Ngoại thất ấn tượng: Phong cách trẻ trung, năng động, cá tính. Nội thất tinh tế: Không gian rộng rãi, phối màu sành điệu, cuốn hút với các đường viền bắt mắt.',
      priceTiers: [
        { label: 'Giá niêm yết', value: '529.000.000 VNĐ' }
      ],
      specs: [
        { label: 'Dòng xe', value: 'A-SUV' },
        { label: 'Quãng đường di chuyển (chuẩn NEDC)', value: '326,4 km/lần sạc' },
        { label: 'Công suất tối đa', value: '134 hp' },
        { label: 'Mô men xoắn cực đại', value: '135 Nm' },
        { label: 'Dài x rộng x Cao (mm)', value: '3.967 x 1.723 x 1.579' },
        { label: 'Dung lượng pin khả dụng', value: '37,23 Kwh' },
        { label: 'Loại la-zăng', value: 'Hợp kim 17 inch' },
        { label: 'Mức tiêu thụ nhiên liệu công khai', value: '13 kWh/100 km' },
        { label: 'Số ghế ngồi', value: '5 ghế' },
        { label: 'Thời gian nạp pin nhanh nhất (10%-70%)', value: '33 phút' },
        { label: 'Túi khí', value: '6 túi khí' }
      ],
      features: [
        'Vận hành êm ái, công suất tối đa 134 mã lực, tương đương xe xăng 1,6L 4 xi lanh',
        'Mạnh mẽ, linh hoạt. Sẵn sàng cho mọi hành trình',
        'Bảo hành xe mới: 7 năm/160.000 km',
        'Bảo hành Pin cao áp (Mua lần đầu theo xe mới): 8 năm/160.000 km'
      ]
    },
    'limo-green': {
      name: 'Limo Green',
      price: '749.000.000 VNĐ',
      image: 'https://picsum.photos/seed/limodetail/1200/600',
      desc: 'Xe điện 7 chỗ - "rộng mở không gian, kéo dài hành trình" - xe gia đình, xe của nhà mình. Tăng kích cỡ, tăng kinh tế: Limo Green với tầm di chuyển rộng phù hợp cho những bác tài chuyên nghiệp, chạy đường dài, liên tỉnh. Với mức cước cao hơn, Limo Green cho dòng tiền tốt hơn, thu nhập cao hơn.',
      priceTiers: [
        { label: 'Giá niêm yết', value: '749.000.000 VNĐ' }
      ],
      specs: [
        { label: 'Dài x rộng x Cao (mm)', value: '4740 x 1872 x 1729' },
        { label: 'Chiều dài cơ sở', value: '2840 mm' },
        { label: 'Khoảng sáng gầm xe', value: '180 mm' },
        { label: 'Sức chứa', value: '7 chỗ' },
        { label: 'Công suất tối đa', value: '150 kW' },
        { label: 'Mô men xoắn cực đại', value: '280 Nm' },
        { label: 'Quãng đường chạy (NEDC)', value: '450 km/lần sạc đầy' },
        { label: 'Dung lượng pin khả dụng', value: '60.13 kWh' },
        { label: 'Công suất sạc nhanh DC tối đa', value: '80 kW' },
        { label: 'Thời gian nạp pin nhanh nhất', value: '30 phút (10%-70%)' },
        { label: 'Dẫn động', value: 'FWD/Cầu trước' },
        { label: 'Chế độ lái', value: 'Eco/Normal' },
        { label: 'Kích thước la-zăng', value: '18 inch' },
        { label: 'Hệ thống treo (trước/sau)', value: 'MacPherson/Đa liên kết' },
        { label: 'Hệ thống phanh (trước/sau)', value: 'Đĩa thông gió/Đĩa' }
      ],
      features: [
        'Tăng sức chứa, tăng không gian kết nối: phù hợp cho nhóm bạn, gia đình đông người, không gián đoạn tương tác',
        'Đèn chiếu sáng phía trước LED',
        'Ống/gáp cửa sổ Chỉnh cơ',
        'Hệ thống điều hòa Tự động 1 vùng',
        'Màn hình giải trí cảm ứng 10.1 inch',
        'Hệ thống 4 loa',
        'Ghế lái Chỉnh cơ 6 hướng'
      ]
    },
    'ec-van': {
      name: 'EC Van',
      price: '285.000.000 VNĐ',
      image: 'https://picsum.photos/seed/ecvandetail/1200/600',
      desc: 'Vận tải đa năng, tiện dụng, sinh lời. Linh hoạt lưu thông nội đô, vận hành êm ái, giảm chi phí vận hành, tối đa lợi nhuận.',
      priceTiers: [
        { label: 'Giá niêm yết', value: '285.000.000 VNĐ (Đã kèm Pin)' }
      ],
      specs: [
        { label: 'Dài x rộng x Cao (mm)', value: '3.767 x 1.680 x 1.790' },
        { label: 'Chiều dài cơ sở', value: '2.520 mm' },
        { label: 'Khoảng sáng gầm xe không tải', value: '165 mm' },
        { label: 'Bán kính quay vòng', value: '5,1 m' },
        { label: 'Dung tích khoang hành lý', value: '2,6 m3' },
        { label: 'Số chỗ ngồi', value: '02 chỗ' },
        { label: 'Công suất tối đa', value: '30 kW' },
        { label: 'Mô men xoắn cực đại', value: '110 Nm' },
        { label: 'Quãng đường di chuyển (NEDC)', value: '175 km/sạc đầy' },
        { label: 'Dung lượng pin khả dụng', value: '18,3 kWh' },
        { label: 'Công suất sạc nhanh DC tối đa', value: '24,2 kW' },
        { label: 'Thời gian nạp pin nhanh nhất', value: '42 phút (10% - 70%)' }
      ],
      features: [
        'Vận tải đa năng, tiện dụng, sinh lời',
        'Linh hoạt lưu thông nội đô',
        'Vận hành êm ái, giảm chi phí vận hành, tối đa lợi nhuận'
      ]
    }
  };

  const product = productData[id as keyof typeof productData];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-dark mb-4">Sản phẩm không tồn tại</h1>
        <p className="text-gray-600 mb-6">Xe VinFast bạn tìm không có trong danh mục Cần Thơ GF.</p>
        <SeoLink href="/san-pham" className="text-primary font-bold hover:text-primary-dark">
          Xem danh sách ô tô VinFast Cần Thơ
        </SeoLink>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SeoLink href="/san-pham" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách ô tô VinFast Cần Thơ
          </SeoLink>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4"
          >
            {product.name}
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-secondary"
          >
            {product.price}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image & Overview */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <SeoContentImage
                  src={product.image}
                  alt={`Hình ảnh xe điện VinFast ${product.name} tại Cần Thơ GF`}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h3 className="text-2xl font-bold text-dark mb-4 uppercase tracking-tight">Tổng quan</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.desc}
                </p>
                {product.priceTiers && (
                  <div className="mt-8">
                    <h4 className="text-xl font-bold text-dark mb-4 uppercase tracking-tight">Giá niêm yết</h4>
                    <ul className="space-y-4">
                      {product.priceTiers.map((tier, idx) => (
                        <li key={idx} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <span className="text-gray-600 font-medium">{tier.label}</span>
                          <span className="font-bold text-primary-dark text-lg">{tier.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <PromoBanner productId={id} position="product-detail" className="mt-8" />
            </motion.div>

            {/* Specs & Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Specifications */}
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <div className="flex items-center mb-6">
                  <Zap className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-dark uppercase tracking-tight">Thông số kỹ thuật</h3>
                </div>
                <div className="space-y-4">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <span className="text-gray-500">{spec.label}</span>
                      <span className="font-bold text-dark text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <div className="flex items-center mb-6">
                  <Shield className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-dark uppercase tracking-tight">Tính năng nổi bật</h3>
                </div>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700 font-medium">
                      <CheckCircle2 className="w-6 h-6 text-primary mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-primary-dark p-8 rounded-3xl text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Bạn quan tâm đến {product.name}?</h3>
                <p className="text-gray-300 mb-8">Liên hệ ngay với chúng tôi để nhận báo giá chi tiết và tư vấn các gói ưu đãi hiện có.</p>
                <button 
                  type="button"
                  onClick={dispatchConsultationPopup}
                  className="w-full bg-secondary hover:bg-secondary-dark text-dark font-bold py-4 rounded-xl transition-colors shadow-lg text-lg uppercase tracking-wider"
                >
                  Đăng ký nhận tư vấn
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
