import { SeoLink } from "@/components/SeoLink";
import { SeoBannerImage } from "@/components/SeoImage";
import { NewsArticleBody } from "@/components/news/NewsArticleBody";
import { NewsArticleCro } from "@/components/news/NewsArticleCro";
import { getNewsById } from "@/lib/content/news";
import { motion } from "motion/react";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function NewsDetail({ id }: { id: string }) {
  const article = id ? getNewsById(id) : undefined;

  if (!article) {
    return (
      <div className="bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-dark mb-4">
            Bài viết không tồn tại
          </h1>
          <SeoLink
            href="/tin-tuc"
            className="text-primary hover:text-primary-dark font-bold underline"
          >
            Quay lại trang tin tức VinFast & Cần Thơ GF
          </SeoLink>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-h-screen pb-24 md:pb-20">
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src={article.image}
            alt={article.imageAlt}
            className="object-cover opacity-20"
          />
        </div>
        <div className="absolute inset-0 bg-primary-dark/80 z-0" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SeoLink
            href="/tin-tuc"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại trang tin tức
          </SeoLink>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black tracking-tight mb-6"
          >
            {article.title}
          </motion.h1>
          <div className="flex items-center text-gray-300 text-sm md:text-base space-x-6">
            <span className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" /> {article.date}
            </span>
            <span className="flex items-center">
              <User className="w-5 h-5 mr-2" /> {article.author.name}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <NewsArticleBody article={article} />

            <div className="mt-12 pt-8 border-t border-gray-100">
              <SeoLink
                href="/tin-tuc"
                className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Xem thêm tin tức VinFast
                & Cần Thơ GF
              </SeoLink>
            </div>
          </div>
        </div>
      </section>

      <NewsArticleCro article={article} />
    </div>
  );
}
