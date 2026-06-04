"use client";

import { usePathname } from "next/navigation";
import Layout from "./components/Layout";
import type { PageInitialData } from "./lib/page-data";
import { matchRoute, type MatchedRoute } from "./lib/routes";
import About from "./views/About";
import Contact from "./views/Contact";
import Home from "./views/Home";
import News from "./views/News";
import NewsDetail from "./views/NewsDetail";
import ProductDetail from "./views/ProductDetail";
import Products from "./views/Products";
import Privacy from "./views/Privacy";
import Terms from "./views/Terms";
import XanhSM from "./views/XanhSM";

function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-dark mb-4">Trang không tồn tại</h1>
      <p className="text-lg text-gray-600">
        Đường dẫn không hợp lệ. Vui lòng quay về trang chủ Cần Thơ GF.
      </p>
    </div>
  );
}

function renderPage(route: MatchedRoute) {
  switch (route.page) {
    case "home":
      return <Home />;
    case "about":
      return <About />;
    case "products":
      return <Products />;
    case "product":
      return <ProductDetail id={route.id} />;
    case "xanhsm":
      return <XanhSM />;
    case "news":
      return <News />;
    case "newsArticle":
      return <NewsDetail id={route.id} />;
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
};

export default function App({ initialData = DEFAULT_INITIAL_DATA }: AppProps) {
  const pathname = usePathname();
  const route = matchRoute(pathname || initialData.pathname);

  return <Layout activePathname={pathname || initialData.pathname}>{renderPage(route)}</Layout>;
}
