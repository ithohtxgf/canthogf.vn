import Image from "next/image";

export const Logo = ({ className = "w-48 h-auto" }: { className?: string }) => (
  <Image
    src="/logo_cantho_gf.png"
    alt="Logo Cần Thơ GF — Hợp tác xã vận tải Cần Thơ"
    width={210}
    height={56}
    sizes="(max-width: 640px) 130px, (max-width: 1024px) 160px, 210px"
    className={`block max-w-full object-contain object-left ${className}`}
    priority
  />
);
