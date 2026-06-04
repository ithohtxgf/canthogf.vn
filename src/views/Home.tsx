import { useRef, useState, type MouseEvent } from 'react';
import { SeoLink } from '@/components/SeoLink';
import { getNewsArticles, getNewsCategoryLabel } from '@/lib/content/news';
import { SeoBannerImage, SeoContentImage } from '@/components/SeoImage';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Zap, Shield, BatteryCharging } from 'lucide-react';
import { dispatchConsultationPopup } from '@/lib/contact';

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 10) {
      setHasDragged(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClickCapture = (e: MouseEvent) => {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const featuredCars = [
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

  const news = getNewsArticles().slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    date: item.date,
    category: getNewsCategoryLabel(item.category),
  }));

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt="Ô tô VinFast Cần Thơ — Hợp tác xã vận tải Cần Thơ GF"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/80 to-dark/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase tracking-tight">
              <span className="text-secondary">Cần Thơ GF</span> — Tiên phong kiến tạo <br />
              tương lai xanh
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl">
              <strong>Hợp tác xã vận tải Cần Thơ</strong> (Can Tho GF) — đại lý{' '}
              <strong>ô tô VinFast Cần Thơ</strong>, tư vấn mua xe điện và hỗ trợ đăng ký{' '}
              <strong>XanhSM Cần Thơ</strong> tại Đồng bằng sông Cửu Long.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <SeoLink
                href="/san-pham"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg flex items-center justify-center"
              >
                Khám phá ô tô VinFast Cần Thơ <ArrowRight className="ml-2 w-5 h-5" />
              </SeoLink>
              <button
                type="button"
                onClick={dispatchConsultationPopup}
                className="bg-white hover:bg-gray-100 text-primary-dark px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg flex items-center justify-center"
              >
                Đăng ký lái XanhSM Cần Thơ
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Giới thiệu SEO — nội dung chính cho từ khóa trang chủ */}
      <section className="py-16 bg-light border-y border-gray-100" aria-labelledby="about-cantho-gf">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 id="about-cantho-gf" className="text-2xl md:text-3xl font-bold text-dark mb-6">
              Hợp tác xã vận tải Cần Thơ GF
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              <strong>Cần Thơ GF</strong> (Can Tho GF) là{' '}
              <strong>hợp tác xã vận tải Cần Thơ</strong> chuyên phân phối{' '}
              <SeoLink href="/san-pham" className="text-primary font-semibold hover:text-primary-dark">
                ô tô VinFast Cần Thơ
              </SeoLink>
              , bảo dưỡng và tư vấn trọn gói. Chúng tôi hỗ trợ đăng ký{' '}
              <SeoLink href="/dang-ky-xanhsm" className="text-primary font-semibold hover:text-primary-dark">
                XanhSM Cần Thơ
              </SeoLink>{' '}
              cho tài xế muốn kinh doanh vận tải bằng xe điện tại khu vực miền Tây.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6 uppercase tracking-tight">
              Tại sao chọn Cần Thơ GF?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg">
              <strong>Can tho GF</strong> là địa chỉ tin cậy cho khách hàng tìm{' '}
              <strong>ô tô VinFast Cần Thơ</strong>, hỗ trợ thủ tục và đồng hành cùng tài xế{' '}
              <strong>XanhSM Cần Thơ</strong> trên mọi hành trình.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: <Shield className="w-12 h-12 text-primary" />, title: 'Uy tín hàng đầu', desc: 'Đối tác chính thức của VinFast và XanhSM tại khu vực miền Tây.' },
              { icon: <Zap className="w-12 h-12 text-secondary-dark" />, title: 'Hỗ trợ nhanh chóng', desc: 'Đội ngũ tư vấn viên nhiệt tình, hỗ trợ thủ tục mua xe và đăng ký nhanh gọn.' },
              { icon: <BatteryCharging className="w-12 h-12 text-primary-dark" />, title: 'Dịch vụ toàn diện', desc: 'Từ bán xe, bảo dưỡng đến hỗ trợ đăng ký chạy dịch vụ XanhSM.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-light p-8 rounded-2xl text-center hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-dark mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 uppercase tracking-tight">
                Ô tô VinFast Cần Thơ — Các dòng xe nổi bật
              </h2>
              <div className="w-24 h-1 bg-primary mb-6"></div>
              <p className="text-gray-600 max-w-2xl">
                Khám phá các mẫu xe điện VinFast tại showroom Cần Thơ GF: thông minh, thân thiện môi
                trường, phù hợp kinh doanh vận tải và gia đình.
              </p>
            </div>
            <SeoLink href="/san-pham" className="text-primary font-bold hover:text-primary-dark flex items-center mt-4 md:mt-0">
              Xem tất cả ô tô VinFast Cần Thơ <ArrowRight className="ml-1 w-4 h-4" />
            </SeoLink>
          </div>

          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onClickCapture={handleClickCapture}
            className={`flex overflow-x-auto gap-6 sm:gap-8 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 ${isDragging ? 'cursor-grabbing select-none snap-none' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
          >
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col w-[85vw] sm:w-[350px] lg:w-[calc(33.333%-1.5rem)] flex-shrink-0 snap-start`}
              >
                <div className="relative h-64 overflow-hidden group">
                  <SeoContentImage
                    src={car.image}
                    alt={`Xe điện VinFast ${car.name} tại Cần Thơ GF`}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 85vw, 350px"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-dark font-bold px-3 py-1 rounded-full text-sm shadow-md z-10">
                    Mới
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <SeoLink href={`/san-pham/${car.id}`} className="text-white font-bold flex items-center hover:text-secondary">
                      Xem chi tiết xe {car.name} <ArrowRight className="ml-2 w-5 h-5" />
                    </SeoLink>
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-dark mb-2">{car.name}</h3>
                  <p className="text-primary-dark font-bold text-xl mb-4">{car.price}</p>
                  <p className="text-gray-600 mb-6 flex-grow">{car.desc}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
                      Tính năng nổi bật {car.name}
                    </h4>
                    <ul className="space-y-2">
                      {car.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <SeoLink
                    href={`/san-pham/${car.id}`}
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

      {/* CTA XanhSM */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="https://picsum.photos/seed/xanhsm/1920/1080?blur=1"
            alt="Đăng ký lái XanhSM Cần Thơ — Hợp tác xã vận tải Cần Thơ GF"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-dark/90 mix-blend-multiply"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
              XanhSM Cần Thơ — Trở thành đối tác <span className="text-secondary">XanhSM</span>
            </h2>
            <p className="text-xl text-gray-200 mb-10">
              Gia nhập cộng đồng tài xế XanhSM Cần Thơ qua Hợp tác xã vận tải Cần Thơ GF để nhận ưu
              đãi và thu nhập ổn định cùng xe điện VinFast.
            </p>
            <button
              type="button"
              onClick={dispatchConsultationPopup}
              className="inline-block bg-secondary hover:bg-secondary-dark text-dark px-10 py-4 rounded-full font-bold text-xl transition-colors shadow-xl"
            >
              Đăng ký lái XanhSM Cần Thơ ngay
            </button>
          </motion.div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 uppercase tracking-tight">Tin tức mới nhất</h2>
              <div className="w-24 h-1 bg-primary mb-6"></div>
            </div>
            <SeoLink href="/tin-tuc" className="text-primary font-bold hover:text-primary-dark flex items-center mt-4 md:mt-0">
              Xem tất cả tin tức VinFast & Cần Thơ GF <ArrowRight className="ml-1 w-4 h-4" />
            </SeoLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SeoLink href={`/tin-tuc/${item.id}`} className="group cursor-pointer block">
                  <div className="relative h-60 rounded-2xl overflow-hidden mb-6">
                    <SeoContentImage
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-dark font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                  <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </SeoLink>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
