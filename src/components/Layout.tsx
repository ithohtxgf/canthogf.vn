"use client";

import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Building2 } from "lucide-react";
import { CONTACT_TAX_ID } from "@/lib/contact";
import { SeoLink } from "./SeoLink";
import { Logo } from "./Logo";
import { ConsultationPopup } from "./ConsultationPopup";
import { motion, AnimatePresence } from "motion/react";
import { isNavLinkActive } from "@/lib/routes";

export default function Layout({
  children,
  activePathname,
}: {
  children: ReactNode;
  /** Từ server — nav active đúng ngay trên HTML SSR */
  activePathname?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const clientPathname = usePathname();
  const pathname = clientPathname || activePathname || "/";

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleOpenPopup = () => setIsPopupOpen(true);
    window.addEventListener('openConsultationPopup', handleOpenPopup);
    return () => window.removeEventListener('openConsultationPopup', handleOpenPopup);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Ô tô VinFast', path: '/san-pham' },
    { name: 'Đăng ký XanhSM', path: '/dang-ky-xanhsm' },
    { name: 'Tin tức', path: '/tin-tuc' },
    { name: 'Liên hệ', path: '/lien-he' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-primary-dark text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <span className="flex items-center"><Phone className="w-4 h-4 mr-2" /> Hotline: 0916 513 720</span>
            <span className="flex items-center"><Mail className="w-4 h-4 mr-2" /> Email: htxcanthogf@gmail.com</span>
          </div>
          <div className="flex space-x-4">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Cái Răng, Cần Thơ</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 gap-3">
            <div className="flex min-w-0 flex-1 items-center">
              <SeoLink href="/" className="flex min-w-0 max-w-full items-center" aria-label="Trang chủ Cần Thơ GF">
                <Logo className="h-8 w-auto max-w-[min(100%,9.5rem)] sm:h-10 sm:max-w-[10rem] md:h-14 md:max-w-[13.125rem] lg:max-w-none" />
              </SeoLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              {navLinks.map((link) => (
                <SeoLink
                  key={link.path}
                  href={link.path}
                  className={`font-semibold text-sm xl:text-base whitespace-nowrap transition-colors ${
                    isNavLinkActive(pathname, link.path) ? "text-primary" : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {link.name}
                </SeoLink>
              ))}
              <button
                onClick={() => setIsPopupOpen(true)}
                className="bg-primary hover:bg-primary-dark text-white px-4 xl:px-6 py-2 xl:py-2.5 rounded-full text-sm xl:text-base font-bold whitespace-nowrap transition-colors shadow-md"
              >
                Đăng ký tư vấn
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex shrink-0 items-center lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-primary focus:outline-none"
              >
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <SeoLink
                    key={link.path}
                    href={link.path}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${
                      isNavLinkActive(pathname, link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </SeoLink>
                ))}
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="w-full mt-4 bg-primary text-white px-3 py-3 rounded-md font-bold"
                >
                  Đăng ký tư vấn
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-gray-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <Logo className="h-8 w-auto max-w-[min(100%,9.5rem)] sm:h-10 sm:max-w-[10rem] md:h-14 md:max-w-[13.125rem] lg:max-w-none" />
              </div>
              <p className="text-gray-600 mb-6">
                Hợp tác xã vận tải Cần Thơ GF - Đối tác tin cậy cung cấp các dòng xe VinFast và dịch vụ XanhSM tại khu vực ĐBSCL.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.facebook.com/canthogf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-10 w-10 shrink-0 opacity-90 transition-opacity hover:opacity-100"
                  title="Facebook Cần Thơ GF"
                  aria-label="Facebook Cần Thơ GF"
                >
                  <Image
                    src="/logo_facebook.png"
                    alt="Facebook Cần Thơ GF"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </a>
                <a
                  href="https://zalo.me/0916513720"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-10 shrink-0 opacity-90 transition-opacity hover:opacity-100"
                  title="Zalo 0916 513 720"
                  aria-label="Zalo 0916 513 720"
                >
                  <Image
                    src="/logo_zalo.png"
                    alt="Zalo 0916 513 720"
                    width={80}
                    height={40}
                    className="h-10 w-auto max-w-[5.5rem] object-contain"
                  />
                </a>
                <a
                  href="https://www.tiktok.com/@sulinhctgf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-10 w-10 shrink-0 opacity-90 transition-opacity hover:opacity-100"
                  title="TikTok @sulinhctgf"
                  aria-label="TikTok @sulinhctgf"
                >
                  <Image
                    src="/logo_tiktok.png"
                    alt="TikTok @sulinhctgf"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900 uppercase tracking-wider">Liên kết nhanh</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <SeoLink href={link.path} className="text-gray-600 hover:text-primary-dark flex items-center transition-colors">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      {link.name}
                    </SeoLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900 uppercase tracking-wider">Sản phẩm & Dịch vụ</h3>
              <ul className="space-y-3">
                <li>
                  <SeoLink href="/san-pham/herio-green" className="text-gray-600 hover:text-primary-dark flex items-center transition-colors">
                    <ChevronRight className="w-4 h-4 mr-2" /> Xe điện VinFast Herio Green tại Cần Thơ
                  </SeoLink>
                </li>
                <li>
                  <SeoLink href="/san-pham/vf5" className="text-gray-600 hover:text-primary-dark flex items-center transition-colors">
                    <ChevronRight className="w-4 h-4 mr-2" /> Ô tô VinFast VF5 Cần Thơ
                  </SeoLink>
                </li>
                <li>
                  <SeoLink href="/san-pham/limo-green" className="text-gray-600 hover:text-primary-dark flex items-center transition-colors">
                    <ChevronRight className="w-4 h-4 mr-2" /> Xe điện VinFast Limo Green 7 chỗ
                  </SeoLink>
                </li>
                <li>
                  <SeoLink href="/san-pham/ec-van" className="text-gray-600 hover:text-primary-dark flex items-center transition-colors">
                    <ChevronRight className="w-4 h-4 mr-2" /> Xe điện VinFast EC Van vận tải
                  </SeoLink>
                </li>
                <li>
                  <SeoLink href="/dang-ky-xanhsm" className="text-gray-600 hover:text-primary-dark flex items-center transition-colors">
                    <ChevronRight className="w-4 h-4 mr-2" /> Đăng ký lái XanhSM Cần Thơ
                  </SeoLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900 uppercase tracking-wider">Thông tin liên hệ</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-600">59, Đường Số 10, KDC Diệu Hiền, Phường Cái Răng, TP Cần Thơ</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">0916 513 720</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">htxcanthogf@gmail.com</span>
                </li>
                <li className="flex items-center">
                  <Building2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-gray-600">MST: {CONTACT_TAX_ID}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hợp tác xã vận tải Cần Thơ GF. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6 text-sm">
              <SeoLink href="/chinh-sach-bao-mat" className="text-gray-500 hover:text-primary-dark transition-colors">
                Chính sách bảo mật Cần Thơ GF
              </SeoLink>
              <SeoLink href="/dieu-khoan-su-dung" className="text-gray-500 hover:text-primary-dark transition-colors">
                Điều khoản sử dụng website
              </SeoLink>
            </div>
          </div>
        </div>
      </footer>

      <ConsultationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
