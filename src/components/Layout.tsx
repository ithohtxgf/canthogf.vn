"use client";

/**
 * Khung trang công khai theo co-ev.vn (website/src/app/(site)/layout.tsx):
 * đầu trang trắng mỏng, menu điện thoại "Bến xe", chân trang Navy cắt xiên.
 */
import { useState, useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_FACEBOOK_URL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_TAX_ID,
  CONTACT_TIKTOK_URL,
  CONTACT_YOUTUBE_URL,
  CONTACT_ZALO_URL,
  CONTACT_MAPS_SHARE_URL,
} from "@/lib/contact";
import { THUE_MUA_VINFAST_PAGE_PATH } from "@/lib/content/thue-mua-vinfast-page";
import { ConsultationPopup } from "./ConsultationPopup";
import { FloatingContactButtons } from "./FloatingContactButtons";
import { DesktopNav, HeadScrollState, MobileNav, type NavItem } from "./evg/SiteNav";

const NAV_ITEMS: NavItem[] = [
  { href: "/gioi-thieu", label: "Giới thiệu", icon: "about" },
  { href: "/san-pham", label: "Ô tô VinFast", icon: "car" },
  { href: THUE_MUA_VINFAST_PAGE_PATH, label: "Thuê mua VinFast", icon: "steps" },
  { href: "/dang-ky-xanhsm", label: "Đăng ký Xanh SM", icon: "wheel" },
  { href: "/tin-tuc", label: "Tin tức", icon: "news" },
  { href: "/lien-he", label: "Liên hệ", icon: "mail" },
];

const PRODUCT_LINKS = [
  { href: "/vinfast-can-tho", label: "Bảng giá lăn bánh VinFast Cần Thơ" },
  { href: "/san-pham/herio-green", label: "VinFast Herio Green chạy dịch vụ" },
  { href: "/san-pham/vf5", label: "VinFast VF 5" },
  { href: "/san-pham/limo-green", label: "VinFast Limo Green 7 chỗ" },
  { href: "/san-pham/ec-van", label: "VinFast EC Van chở hàng" },
  { href: "/dang-ky-xanhsm-partner", label: "Xanh SM Partner theo khu vực" },
];

export default function Layout({
  children,
  activePathname,
}: {
  children: ReactNode;
  /** Từ server — nav active đúng ngay trên HTML SSR */
  activePathname?: string;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const clientPathname = usePathname();
  // Ưu tiên đường dẫn từ server: usePathname() bị mã hoá khi prerender trang catch-all
  const pathname = activePathname || clientPathname || "/";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const handleOpenPopup = () => setIsPopupOpen(true);
    window.addEventListener("openConsultationPopup", handleOpenPopup);
    return () => window.removeEventListener("openConsultationPopup", handleOpenPopup);
  }, []);

  return (
    <div className="site">
      <a className="skip" href="#noi-dung">Chuyển tới nội dung</a>
      <header className="site-head">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Cần Thơ EV, về trang chủ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-dark" src="/logo-ctev.png" alt="CTEV, Hợp tác xã vận tải Cần Thơ EV" width={741} height={240} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-light" src="/logo-ctev-trang.png" alt="" width={741} height={240} />
          </Link>
          <DesktopNav items={NAV_ITEMS} pathname={pathname} />
          <MobileNav items={NAV_ITEMS} pathname={pathname} onConsultation={() => setIsPopupOpen(true)} />
        </div>
        <HeadScrollState />
      </header>

      <main id="noi-dung">{children}</main>

      <footer className="site-foot">
        <div className="wrap foot-main">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="foot-logo" src="/logo-ctev-trang.png" alt="CTEV, Hợp tác xã vận tải Cần Thơ EV" width={741} height={240} />
            <a className="foot-phone" href={`tel:${CONTACT_PHONE_TEL}`}>{CONTACT_PHONE}</a>
            <p>
              Hợp tác xã vận tải Cần Thơ EV
              <br />
              {CONTACT_ADDRESS}
              <br />
              MST {CONTACT_TAX_ID} · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <br />
              <a href={CONTACT_MAPS_SHARE_URL} target="_blank" rel="noopener noreferrer">Bản đồ</a>
              {" · "}
              <a href={CONTACT_ZALO_URL} target="_blank" rel="noopener noreferrer">Zalo</a>
              {" · "}
              <a href={CONTACT_FACEBOOK_URL} target="_blank" rel="noopener noreferrer">Facebook</a>
              {" · "}
              <a href={CONTACT_TIKTOK_URL} target="_blank" rel="noopener noreferrer">TikTok</a>
              {" · "}
              <a href={CONTACT_YOUTUBE_URL} target="_blank" rel="noopener noreferrer">YouTube</a>
            </p>
            <h2>Hệ thống EV Green</h2>
            <ul>
              <li>
                Thành viên hệ thống hợp tác xã vận tải ô tô điện{" "}
                <a href="https://co-ev.vn" target="_blank" rel="noopener">EV Green</a>
              </li>
            </ul>
          </div>
          <div>
            <h2>Trang trên website</h2>
            <ul>
              <li><Link href="/">Trang chủ</Link></li>
              {NAV_ITEMS.map((i) => (
                <li key={i.href}><Link href={i.href}>{i.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Xe và dịch vụ</h2>
            <ul>
              {PRODUCT_LINKS.map((i) => (
                <li key={i.href}><Link href={i.href}>{i.label}</Link></li>
              ))}
              <li><Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link></li>
              <li><Link href="/dieu-khoan-su-dung">Điều khoản sử dụng</Link></li>
            </ul>
          </div>
        </div>
        <div className="wrap foot-legal">
          © {new Date().getFullYear()} Hợp tác xã vận tải Cần Thơ EV. Thành viên hệ thống EV Green.
        </div>
      </footer>

      <ConsultationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      <FloatingContactButtons />
    </div>
  );
}
