"use client";

/**
 * Menu đầu trang theo co-ev.vn (website/src/components/site/SiteNav.tsx), đổi sang mục menu
 * của canthogf.vn. Đường dẫn đang xem lấy từ server (activePathname) vì usePathname()
 * bị mã hoá khi prerender trang catch-all.
 */
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/contact";
import { isNavLinkActive } from "@/lib/routes";

export type NavItem = { href: string; label: string; icon: MenuIconName };

// Biểu tượng menu điện thoại: nét Navy 1.8, một chi tiết Sky (class "acc") làm điểm nhấn.
const MENU_ICONS = {
  about: (
    <>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-6h6v6" />
      <path className="acc" d="M3 20h18" />
    </>
  ),
  car: (
    <>
      <path d="M3 15.5V12l2.2-4.6A2 2 0 0 1 7 6.2h10a2 2 0 0 1 1.8 1.2L21 12v3.5a1 1 0 0 1-1 1h-1.2M5.2 16.5H4a1 1 0 0 1-1-1" />
      <circle cx="7.5" cy="16.5" r="2" /><circle cx="16.5" cy="16.5" r="2" />
      <path className="acc" d="M12.6 8.6l-2 3h2.8l-2 3" />
    </>
  ),
  steps: (
    <>
      <path d="M4 19h4v-4h4v-4h4V7h4" />
      <path className="acc" d="M16 4l4 3-4 3" />
    </>
  ),
  wheel: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle className="acc" cx="12" cy="12" r="2.2" />
      <path d="M3.8 10.5c2.6-.8 5.4-1.2 8.2-1.2s5.6.4 8.2 1.2M10 14l-3.6 5.4M14 14l3.6 5.4" />
    </>
  ),
  news: (
    <>
      <path d="M5 4h11v16H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1z" />
      <path d="M16 9h3a1 1 0 0 1 1 1v8a2 2 0 0 1-4 0" />
      <path className="acc" d="M7.5 8h5" /><path d="M7.5 12h5M7.5 15.5h3.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path className="acc" d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  advice: (
    <>
      <path d="M4 5h16v11H10l-4.5 3.5V16H4z" />
      <path className="acc" d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.1 2A16.4 16.4 0 0 1 4.5 5.6a2 2 0 0 1 2.1-2.1z" />
  ),
};
export type MenuIconName = keyof typeof MENU_ICONS;

function MenuIcon({ name }: { name: MenuIconName }) {
  return (
    <svg className="md-icon" viewBox="0 0 24 24" aria-hidden="true">
      {MENU_ICONS[name]}
    </svg>
  );
}

export function DesktopNav({ items, pathname }: { items: NavItem[]; pathname: string }) {
  return (
    <nav className="nav" aria-label="Menu chính">
      {items.map((i) => (
        <Link key={i.href} href={i.href} aria-current={isNavLinkActive(pathname, i.href) ? "page" : undefined}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav({
  items,
  pathname,
  onConsultation,
}: {
  items: NavItem[];
  pathname: string;
  onConsultation: () => void;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);
  // Menu phủ toàn màn hình: khoá cuộn trang phía sau khi đang mở.
  function onToggle() {
    document.documentElement.classList.toggle("menu-open", !!ref.current?.open);
  }
  useEffect(() => () => document.documentElement.classList.remove("menu-open"), []);
  return (
    <details className="nav-toggle" ref={ref} onToggle={onToggle}>
      <summary aria-label="Menu">
        {/* Ba nét xiên như nét logo; nét cuối màu Sky. Mở menu thì hai nét ngoài thành dấu X. */}
        <svg className="menu-icon" viewBox="0 0 28 28" aria-hidden="true">
          <rect className="mi mi-1" x="4" y="6.5" width="20" height="3" />
          <rect className="mi mi-2" x="4" y="12.5" width="13" height="3" />
          <rect className="mi mi-3" x="4" y="18.5" width="20" height="3" />
        </svg>
      </summary>
      <nav className="nav-drop" aria-label="Menu chính trên điện thoại">
        <ol className="md-list">
          {items.map((i, n) => (
            <li key={i.href} style={{ "--i": n } as React.CSSProperties}>
              <Link href={i.href} aria-current={isNavLinkActive(pathname, i.href) ? "page" : undefined}>
                <span className="md-tile"><MenuIcon name={i.icon} /></span>
                <span className="md-label">{i.label}</span>
                <span className="md-num" aria-hidden="true">{String(n + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="md-actions" style={{ "--i": items.length } as React.CSSProperties}>
          <a className="md-call" href={`tel:${CONTACT_PHONE_TEL}`}>
            <MenuIcon name="phone" />
            <span><small>Tổng đài tư vấn</small>{CONTACT_PHONE}</span>
          </a>
          <button
            type="button"
            className="md-driver"
            onClick={() => {
              if (ref.current) ref.current.open = false;
              onConsultation();
            }}
          >
            <MenuIcon name="advice" />
            <span>Đăng ký tư vấn</span>
          </button>
        </div>
      </nav>
    </details>
  );
}

/** Đánh dấu đầu trang khi đã cuộn, để đầu trang trong suốt trên hero hiện lại nền trắng. */
export function HeadScrollState() {
  useEffect(() => {
    const head = document.querySelector<HTMLElement>(".site-head");
    if (!head) return;
    const update = () => head.toggleAttribute("data-scrolled", window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return null;
}
