import { SeoLink } from "@/components/SeoLink";
import { VINFAST_SPOKE_ARTICLES } from "@/lib/content/vinfast-can-tho";
import { ArrowRight, BookOpen } from "lucide-react";

export function VinfastSpokeArticles() {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-dark">
          Kiến thức VinFast Cần Thơ — Đọc thêm
        </h3>
      </div>
      <ul className="space-y-3">
        {VINFAST_SPOKE_ARTICLES.map((article) => (
          <li key={article.id}>
            <SeoLink
              href={`/tin-tuc/${article.id}`}
              className="group flex items-start gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-secondary group-hover:translate-x-0.5 transition-transform" />
              <span className="font-medium leading-snug">{article.title}</span>
            </SeoLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
