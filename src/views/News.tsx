"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { User, ArrowRight, Search, X } from "lucide-react";
import { PageHero } from "@/components/evg/PageHero";
import { SeoLink } from "@/components/SeoLink";
import { SeoContentImage } from "@/components/SeoImage";
import {
  getNewsArticles,
  getNewsCategoryLabel,
  type NewsArticle,
  type NewsCategory,
} from "@/lib/content/news";

export default function News({ articles: articlesProp }: { articles?: NewsArticle[] }) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<"all" | NewsCategory>("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q") ?? "";
    if (q) {
      setSearchInput(q);
      setSearchQuery(q);
    }
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchInput(value);
      setSearchQuery(value);
      const url = value.trim()
        ? `/tin-tuc?q=${encodeURIComponent(value.trim())}`
        : "/tin-tuc";
      router.replace(url, { scroll: false });
    },
    [router],
  );

  const categories = [
    { id: "all" as const, name: "Tất cả" },
    { id: "vinfast" as const, name: "Tin tức VinFast" },
    { id: "cantho" as const, name: "Hoạt động tại Cần Thơ" },
    { id: "knowledge" as const, name: "Kiến thức xe điện" },
  ];

  const allArticles = articlesProp ?? getNewsArticles();

  const filteredNews = allArticles.filter((a) => {
    const matchesCategory = activeCategory === "all" || a.category === activeCategory;
    if (!searchQuery.trim()) return matchesCategory;
    const q = searchQuery.toLowerCase();
    return matchesCategory && (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
    );
  });

  return (
    <>
      <PageHero
        title="Tin tức & Sự kiện"
        eyebrow="Tin tức"
        crumbs={[{ href: "/tin-tuc", label: "Tin tức" }]}
        image="/banner-homepage.webp"
        summary="Cập nhật những thông tin mới nhất về VinFast, hoạt động của Cần Thơ EV và kiến thức hữu ích về xe điện."
      />

      <section className="p-body">
        <div className="wrap">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo chuyên mục">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={activeCategory === cat.id}
                  className={`px-4 py-2 rounded-full font-semibold text-sm border transition-colors ${
                    activeCategory === cat.id
                      ? "bg-dark border-dark text-white"
                      : "bg-white text-dark border-hairline hover:border-sky"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-steel pointer-events-none" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Tìm kiếm bài viết VinFast, Cần Thơ EV..."
                aria-label="Tìm kiếm bài viết"
                className="w-full !pl-10 !pr-10"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => handleSearch("")}
                  aria-label="Xóa tìm kiếm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <h2 className="sr-only">Danh sách bài viết tin tức</h2>

          <ul className="h-news">
            {filteredNews.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SeoLink href={`/tin-tuc/${item.id}`} aria-label={`Đọc tin: ${item.title}`}>
                  <span className="h-news-art">
                    <SeoContentImage
                      src={item.image}
                      alt={item.imageAlt}
                      width={800}
                      height={500}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </span>
                  <time>{item.date}</time>
                  <span className="mx-[1.375rem] mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
                    {getNewsCategoryLabel(item.category)}
                  </span>
                  <h3 className="line-clamp-2 !mt-1.5">{item.title}</h3>
                  <span className="h-news-desc line-clamp-3 !mb-3">{item.excerpt}</span>
                  <span className="mx-[1.375rem] mb-5 mt-auto flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center text-steel">
                      <User className="w-4 h-4 mr-1" /> {item.author.name}
                    </span>
                    <span className="flex items-center font-semibold text-primary">
                      Đọc tiếp <ArrowRight className="ml-1.5 w-4 h-4" />
                    </span>
                  </span>
                </SeoLink>
              </motion.li>
            ))}
          </ul>

          {filteredNews.length === 0 && (
            <div className="text-center py-16 text-steel text-base">
              {searchQuery
                ? `Không tìm thấy bài viết nào cho "${searchQuery}".`
                : "Không tìm thấy bài viết nào trong danh mục này."}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
