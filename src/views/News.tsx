"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, User, ArrowRight } from "lucide-react";
import { SeoLink } from "@/components/SeoLink";
import { SeoBannerImage, SeoContentImage } from "@/components/SeoImage";
import {
  getNewsArticles,
  getNewsCategoryLabel,
  type NewsCategory,
} from "@/lib/content/news";

export default function News() {
  const [activeCategory, setActiveCategory] = useState<"all" | NewsCategory>(
    "all",
  );

  const categories = [
    { id: "all" as const, name: "Tất cả" },
    { id: "vinfast" as const, name: "Tin tức VinFast" },
    { id: "cantho" as const, name: "Hoạt động tại Cần Thơ" },
    { id: "knowledge" as const, name: "Kiến thức xe điện" },
  ];

  const filteredNews =
    activeCategory === "all"
      ? getNewsArticles()
      : getNewsArticles(activeCategory);

  return (
    <div className="bg-light min-h-screen pb-20">
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=1920&h=600"
            alt="Tin tức VinFast và hoạt động Cần Thơ GF"
            className="object-cover opacity-30"
          />
        </div>
        <div className="absolute inset-0 bg-primary-dark/80 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6"
          >
            Tin tức & Sự kiện
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Cập nhật những thông tin mới nhất về VinFast, hoạt động của Cần
            Thơ GF và kiến thức hữu ích về xe điện.
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <h2 className="sr-only">Danh sách bài viết tin tức</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredNews.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SeoLink
                  href={`/tin-tuc/${item.id}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col h-full group cursor-pointer block"
                  aria-label={`Đọc tin: ${item.title}`}
                >
                  <div className="relative h-60 overflow-hidden">
                    <SeoContentImage
                      src={item.image}
                      alt={item.imageAlt}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary-dark font-bold px-3 py-1 rounded-md text-xs uppercase tracking-wider">
                      {getNewsCategoryLabel(item.category)}
                    </div>
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" /> {item.date}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1" /> {item.author.name}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mb-6 flex-grow line-clamp-3">
                      {item.excerpt}
                    </p>

                    <div className="text-primary font-bold flex items-center mt-auto group-hover:text-primary-dark transition-colors">
                      Đọc tiếp <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </SeoLink>
              </motion.div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20 text-gray-500 text-lg">
              Không tìm thấy bài viết nào trong danh mục này.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
