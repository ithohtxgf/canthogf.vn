import Image from "next/image";

/** Kích thước gốc public/logo_cantho_gf.png — giữ đúng tỷ lệ cho next/image */
const LOGO_WIDTH = 694;
const LOGO_HEIGHT = 302;

export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/logo_cantho_gf.png"
      alt="Logo Cần Thơ GF — Hợp tác xã vận tải Cần Thơ"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes="(max-width: 640px) 130px, (max-width: 1024px) 160px, 210px"
      className={`block shrink-0 object-contain object-left ${className}`}
      priority
    />
  );
}
