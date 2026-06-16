import Image from "next/image";

const LOGO_WIDTH = 210;
const LOGO_HEIGHT = 56;

export const Logo = ({ className = "w-48" }: { className?: string }) => (
  <span
    className={`relative inline-block max-w-full ${className}`}
    style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}
  >
    <Image
      src="/logo_cantho_gf.png"
      alt="Logo Cần Thơ GF — Hợp tác xã vận tải Cần Thơ"
      fill
      sizes="(max-width: 640px) 130px, (max-width: 1024px) 160px, 210px"
      className="object-contain object-left"
      priority
    />
  </span>
);
