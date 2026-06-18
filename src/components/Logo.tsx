import Image from "next/image";

/** Kích thước gốc public/logo_cantho_gf.png — giữ đúng tỷ lệ cho next/image */
const LOGO_WIDTH = 694;
const LOGO_HEIGHT = 302;

/** Header & footer — mobile ưu tiên đọc rõ (h-11 ≈ 44px, trước h-8 ≈ 32px) */
export const LOGO_NAV_CLASS =
  "h-11 w-auto max-w-[min(100%,11.5rem)] sm:h-12 sm:max-w-[12.5rem] md:h-14 md:max-w-[14rem] lg:h-16 lg:max-w-none";

/** Lấp đầy khung cha (menu overlay, banner…) */
export const LOGO_FILL_CLASS =
  "h-full w-full max-h-full max-w-full object-contain object-center";

export function Logo({ className = LOGO_NAV_CLASS }: { className?: string }) {
  const fillsFrame = className.includes("h-full") || className.includes("w-full");

  return (
    <Image
      src="/logo_cantho_gf.png"
      alt="Logo Cần Thơ GF — Hợp tác xã vận tải Cần Thơ"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes={
        fillsFrame
          ? "100vw"
          : "(max-width: 640px) 184px, (max-width: 1024px) 200px, 256px"
      }
      className={
        fillsFrame
          ? `block object-contain ${className}`
          : `block shrink-0 object-contain object-left ${className}`
      }
      priority
    />
  );
}
