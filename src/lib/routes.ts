export type MatchedRoute =
  | { page: "home" }
  | { page: "about" }
  | { page: "products" }
  | { page: "product"; id: string }
  | { page: "xanhsm" }
  | { page: "news" }
  | { page: "newsArticle"; id: string }
  | { page: "contact" }
  | { page: "privacy" }
  | { page: "terms" }
  | { page: "notFound" };

export function matchRouteFromSlug(slug?: string[]): MatchedRoute {
  const pathname = slug?.length ? `/${slug.join("/")}` : "/";
  return matchRoute(pathname);
}

export function matchRoute(pathname: string): MatchedRoute {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { page: "home" };
  }

  const [first, second] = segments;

  switch (first) {
    case "gioi-thieu":
      return segments.length === 1 ? { page: "about" } : { page: "notFound" };
    case "san-pham":
      if (segments.length === 1) return { page: "products" };
      if (segments.length === 2) return { page: "product", id: second };
      return { page: "notFound" };
    case "dang-ky-xanhsm":
      return segments.length === 1 ? { page: "xanhsm" } : { page: "notFound" };
    case "tin-tuc":
      if (segments.length === 1) return { page: "news" };
      if (segments.length === 2) return { page: "newsArticle", id: second };
      return { page: "notFound" };
    case "lien-he":
      return segments.length === 1 ? { page: "contact" } : { page: "notFound" };
    case "chinh-sach-bao-mat":
      return segments.length === 1 ? { page: "privacy" } : { page: "notFound" };
    case "dieu-khoan-su-dung":
      return segments.length === 1 ? { page: "terms" } : { page: "notFound" };
    default:
      return { page: "notFound" };
  }
}

/** Kiểm tra mục menu đang active (kể cả trang con, ví dụ /san-pham/vf5) */
export function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
