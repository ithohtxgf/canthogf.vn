import { SeoLink } from "@/components/SeoLink";
import { getNewsById } from "@/lib/content/news";
import { VINFAST_SPOKE_ARTICLES } from "@/lib/content/vinfast-can-tho";
import { ArrowRight, BookOpen } from "lucide-react";

/**
 * Trang trụ /vinfast-can-tho dẫn xuống các bài vệ tinh (bài vệ tinh đã dẫn ngược lên trang trụ).
 * Chỉ hiện bài đang xuất bản trong danh mục bài (DB): bài chưa đăng thì không hiện,
 * để không tạo liên kết tới trang 404.
 */
export function VinfastSpokeArticles() {
  const articles = VINFAST_SPOKE_ARTICLES.filter((a) => getNewsById(a.id));
  if (articles.length === 0) return null;

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
        {articles.map((article) => (
          <li key={article.id}>
            <SeoLink
              href={`/tin-tuc/${article.id}`}
              className="group flex items-start gap-2 text-ink hover:text-primary"
            >
              <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-sky" />
              <span className="font-medium leading-snug underline-offset-2 group-hover:underline">
                {article.title}
              </span>
            </SeoLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
