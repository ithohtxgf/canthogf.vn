import Image from "next/image";

type SeoBannerImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** Ảnh nền full-width (banner) — bắt buộc có alt, dùng next/image */
export function SeoBannerImage({
  src,
  alt,
  className = "object-cover",
  priority = false,
}: SeoBannerImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes="100vw"
      priority={priority}
    />
  );
}

type SeoContentImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Ảnh nội dung — bắt buộc có alt, dùng next/image */
export function SeoContentImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
}: SeoContentImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
    />
  );
}
