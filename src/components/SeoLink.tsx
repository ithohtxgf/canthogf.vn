"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

type SeoLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
};

/**
 * Liên kết nội bộ chuẩn SEO — dùng anchor text rõ nghĩa, có prefetch.
 * @example
 * <SeoLink href="/tin-tuc/1">Đọc tin: VinFast ra mắt xe điện mới</SeoLink>
 */
export function SeoLink({ href, children, prefetch = true, ...rest }: SeoLinkProps) {
  return (
    <NextLink href={href} prefetch={prefetch} {...rest}>
      {children}
    </NextLink>
  );
}
