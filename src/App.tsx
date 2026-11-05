"use client";

import { useEffect } from "react";
import Link from "next/link";
import Layout from "./components/Layout";
import type { PageInitialData } from "./lib/page-data";
import { hydrateNewsCatalog } from "./lib/content/news";
import { hydratePromotionsCatalog } from "./lib/content/promotions";
import type { MatchedRoute } from "./lib/routes";
import About from "./views/About";
import Contact from "./views/Contact";
import Home from "./views/Home";
import News from "./views/News";
import NewsDetail from "./views/NewsDetail";
import ProductDetail from "./views/ProductDetail";
import Products from "./views/Products";
import Privacy from "./views/Privacy";
import Terms from "./views/Terms";
import VinfastCanTho from "./views/VinfastCanTho";
import ThueMuaVinfast from "./views/ThueMuaVinfast";
import XanhSM from "./views/XanhSM";
import XanhSmPartnerHub from "./views/XanhSmPartnerHub";
import XanhSmPartnerCity from "./views/XanhSmPartnerCity";

function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-dark mb-4">Trang không tồn tại</h1>
      <p className="text-lg text-gray-600">
        Đường dẫn không hợp lệ hoặc trang đã được chuyển.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-primary px-6 py-3 font-semibold text-white">
          Về trang chủ
        </Link>
        <Link href="/san-pham" className="rounded-full border border-primary px-6 py-3 font-semibold text-primary">
          Xem các dòng xe
        </Link>
      </div>
    </div>
  );
}

function renderPage(route: MatchedRoute, initialData: PageInitialData) {
  switch (route.page) {
    case "home":
      return <Home newsArticles={initialData.newsArticles} />;
    case "about":
      return <About />;
    case "products":
      return <Products />;
    case "product":
      return <ProductDetail id={route.id} />;
    case "xanhsm":
      return <XanhSM />;
    case "xanhsmPartnerHub":
      return <XanhSmPartnerHub />;
    case "xanhsmPartnerCity":
      return <XanhSmPartnerCity citySlug={route.citySlug} />;
    case "thueMuaVinfast":
      return <ThueMuaVinfast />;
    case "vinfastCanTho":
      return <VinfastCanTho />;
    case "news":
      return <News articles={initialData.newsArticles} />;
    case "newsArticle":
      return (
        <NewsDetail
          id={route.id}
          article={initialData.newsArticle}
        />
      );
    case "contact":
      return <Contact />;
    case "privacy":
      return <Privacy />;
    case "terms":
      return <Terms />;
    default:
      return <NotFound />;
  }
}

const DEFAULT_INITIAL_DATA: PageInitialData = {
  pathname: "/",
  route: { page: "home" },
};

type AppProps = {
  initialData?: PageInitialData;
  /** Dùng cho app/not-found.tsx — luôn hiện trang 404 dù pathname khớp mẫu route */
  forceNotFound?: boolean;
};

export default function App({
  initialData = DEFAULT_INITIAL_DATA,
  forceNotFound = false,
}: AppProps) {
  // Dùng route server đã tính từ params (page.tsx). KHÔNG tính lại từ usePathname():
  // khi Vercel prerender trang catch-all, usePathname() trả đường dẫn bị mã hoá
  // (vd "/san-pham%2Fvf5") → mọi trang 2 cấp bị render thành "Trang không tồn tại"
  // trong HTML gửi cho Google. Mỗi lần chuyển trang, page.tsx gửi initialData mới.
  const route: MatchedRoute = forceNotFound ? { page: "notFound" } : initialData.route;

  // Hydrate đồng bộ trước render — catalog KM luôn khớp DB
  hydrateNewsCatalog(initialData.newsCatalog ?? initialData.newsArticles);
  hydratePromotionsCatalog(initialData.promotions);

  useEffect(() => {
    hydrateNewsCatalog(initialData.newsCatalog ?? initialData.newsArticles);
    hydratePromotionsCatalog(initialData.promotions);
  }, [
    initialData.newsCatalog,
    initialData.newsArticles,
    initialData.promotions,
  ]);

  return (
    <Layout activePathname={initialData.pathname}>
      {renderPage(route, initialData)}
    </Layout>
  );
}
