import { SeoLink } from "@/components/SeoLink";
import { getNewsArticles, type NewsArticle } from "@/lib/content/news";
import { ArrowRight } from "lucide-react";

/** Trang trụ của từng chuyên mục: mỗi bài dẫn lên trang trụ của nó (mô hình trụ – vệ tinh). */
const TRANG_TRU: Record<NewsArticle["category"], { href: string; label: string }> = {
  vinfast: { href: "/vinfast-can-tho", label: "Bảng giá lăn bánh VinFast tại Cần Thơ" },
  cantho: { href: "/dang-ky-xanhsm", label: "Đăng ký chạy Xanh SM ở Cần Thơ" },
  knowledge: { href: "/vinfast-can-tho", label: "Bảng giá lăn bánh VinFast tại Cần Thơ" },
};

/**
 * Khối "Bài liên quan" cuối bài: 3 bài, ưu tiên cùng chuyên mục rồi tới bài mới nhất,
 * kèm một liên kết lên trang trụ của chuyên mục. Lấy từ danh mục bài đang xuất bản.
 */
export function NewsRelated({ article }: { article: NewsArticle }) {
  const khac = getNewsArticles().filter((a) => a.id !== article.id);
  const cungMuc = khac.filter((a) => a.category === article.category);
  const lienQuan = [...cungMuc, ...khac.filter((a) => a.category !== article.category)].slice(0, 3);
  const tru = TRANG_TRU[article.category];

  return (
    <aside aria-labelledby="bai-lien-quan" className="mt-12 pt-8 border-t border-hairline">
      <h2 id="bai-lien-quan" className="text-xl font-semibold text-dark mb-4">
        Bài liên quan
      </h2>
      {lienQuan.length > 0 && (
        <ul className="space-y-3 mb-6">
          {lienQuan.map((a) => (
            <li key={a.id}>
              <SeoLink href={`/tin-tuc/${a.id}`} className="group flex items-start gap-2 text-ink hover:text-primary">
                <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-sky" aria-hidden />
                <span className="font-medium leading-snug group-hover:underline">{a.title}</span>
              </SeoLink>
            </li>
          ))}
        </ul>
      )}
      {tru && (
        <p className="text-ink">
          Xem thêm:{" "}
          <SeoLink href={tru.href} className="text-primary font-semibold underline">
            {tru.label}
          </SeoLink>
        </p>
      )}
    </aside>
  );
}
