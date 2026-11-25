import { VINFAST_SPOKE_ARTICLES } from "@/lib/content/vinfast-can-tho";
import { ArrowRight, BookOpen } from "lucide-react";

export function VinfastSpokeArticles() {
  return (
    <div className="bg-white rounded-xl border border-hairline p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-tint-strong flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-dark">
          Kiến thức VinFast Cần Thơ: Đọc thêm
        </h3>
      </div>
      <ul className="space-y-3">
        {VINFAST_SPOKE_ARTICLES.map((article) => (
          <li key={article.id}>
            <div className="group flex items-start gap-2 text-ink">
              <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-sky" />
              <span className="font-medium leading-snug">{article.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
