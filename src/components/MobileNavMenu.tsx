"use client";

import { useEffect } from "react";
import {
  Car,
  ChevronRight,
  HandCoins,
  Info,
  Mail,
  Newspaper,
  Phone,
  PhoneCall,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT_PHONE, CONTACT_PHONE_TEL } from "@/lib/contact";
import { THUE_MUA_VINFAST_PAGE_PATH } from "@/lib/content/thue-mua-vinfast-page";
import { SeoLink } from "./SeoLink";
import { Logo, LOGO_FILL_CLASS } from "./Logo";
import { isNavLinkActive } from "@/lib/routes";

type NavItem = {
  name: string;
  path: string;
  icon: LucideIcon;
  accent?: string;
};

const MOBILE_NAV_ITEMS: NavItem[] = [
  { name: "Giới thiệu", path: "/gioi-thieu", icon: Info },
  {
    name: "Ô tô VinFast",
    path: "/san-pham",
    icon: Car,
    accent: "from-primary/15 to-primary/5",
  },
  {
    name: "Thuê mua VinFast",
    path: THUE_MUA_VINFAST_PAGE_PATH,
    icon: HandCoins,
    accent: "from-secondary/20 to-secondary/5",
  },
  {
    name: "Đăng ký XanhSM",
    path: "/dang-ky-xanhsm",
    icon: Sparkles,
    accent: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    name: "Xanh SM Partner theo khu vực",
    path: "/dang-ky-xanhsm-partner",
    icon: Sparkles,
    accent: "from-emerald-500/15 to-emerald-500/5",
  },
  { name: "Tin tức", path: "/tin-tuc", icon: Newspaper },
  { name: "Liên hệ", path: "/lien-he", icon: PhoneCall },
];

type MobileNavMenuProps = {
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
  onConsultation: () => void;
};

export function MobileNavMenu({
  isOpen,
  pathname,
  onClose,
  onConsultation,
}: MobileNavMenuProps) {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  function handleConsultation() {
    onClose();
    onConsultation();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-primary-dark/70 backdrop-blur-md"
            aria-label="Đóng menu"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[min(100%,22rem)] flex-col overflow-hidden bg-white shadow-2xl"
          >
            {/* Header gradient */}
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark px-5 pb-6 pt-5 text-white">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-secondary/25 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -bottom-6 left-1/4 h-24 w-24 rounded-full bg-white/10 blur-xl"
                aria-hidden
              />

              <div className="relative flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Cần Thơ GF
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                  aria-label="Đóng menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative mt-3 flex h-[4.25rem] w-full items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-2 shadow-lg">
                <Logo className={LOGO_FILL_CLASS} />
              </div>

              <p className="relative mt-4 text-sm leading-relaxed text-white/85">
                Đại lý VinFast &amp; XanhSM — tư vấn xe điện tại Cần Thơ
              </p>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-gray-400">
                Danh mục
              </p>
              <ul className="space-y-2">
                {MOBILE_NAV_ITEMS.map((link, index) => {
                  const active = isNavLinkActive(pathname, link.path);
                  const Icon = link.icon;

                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                    >
                      <SeoLink
                        href={link.path}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all active:scale-[0.98] ${
                          active
                            ? "border-primary/30 bg-gradient-to-r from-primary/10 to-primary/5 shadow-sm"
                            : "border-gray-100 bg-gray-50/80 hover:border-primary/20 hover:bg-white hover:shadow-md"
                        }`}
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                            active
                              ? "from-primary to-primary-dark text-white shadow-md"
                              : link.accent
                                ? `${link.accent} text-primary`
                                : "from-gray-100 to-gray-50 text-primary"
                          }`}
                        >
                          <Icon className="h-5 w-5" strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-[15px] font-semibold leading-snug ${
                              active ? "text-primary" : "text-gray-800"
                            }`}
                          >
                            {link.name}
                          </span>
                        </span>
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                            active ? "text-primary" : "text-gray-300"
                          }`}
                        />
                      </SeoLink>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer actions */}
            <div className="shrink-0 border-t border-gray-100 bg-gradient-to-t from-gray-50 to-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="mb-3 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/15 text-secondary-dark">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-gray-500">
                    Hotline tư vấn
                  </span>
                  <span className="block text-base font-bold text-primary">
                    {CONTACT_PHONE}
                  </span>
                </span>
              </a>

              <button
                type="button"
                onClick={handleConsultation}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-dark px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]"
              >
                <Mail className="h-5 w-5" />
                Đăng ký tư vấn miễn phí
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
