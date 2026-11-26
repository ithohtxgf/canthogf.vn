import { SeoLink } from "@/components/SeoLink";
import { PageHero } from "@/components/evg/PageHero";
import { NewsArticleBody } from "@/components/news/NewsArticleBody";
import { NewsArticleCro } from "@/components/news/NewsArticleCro";
import { NewsRelated } from "@/components/news/NewsRelated";
import { getNewsById, type NewsArticle } from "@/lib/content/news";
import { Calendar, User, ArrowLeft } from "lucide-react";

export default function NewsDetail({
  id,
  article: articleProp,
}: {
  id: string;
  article?: NewsArticle;
}) {
  const article = articleProp ?? (id ? getNewsById(id) : undefined);

  if (!article) {
    return (
      <div className="wrap py-24 text-center">
        <h1 className="text-2xl font-semibold text-dark mb-4">Bài viết không tồn tại</h1>
        <SeoLink href="/tin-tuc" className="text-primary hover:text-primary-dark font-semibold underline">
          Quay lại trang tin tức VinFast & Cần Thơ EV
        </SeoLink>
      </div>
    );
  }

  return (
    <div className="pb-24 md:pb-0">
      <PageHero
        title={article.title}
        eyebrow="Tin tức"
        crumbs={[{ href: "/tin-tuc", label: "Tin tức" }]}
        image={article.image}
        meta={
          <>
            <Calendar className="inline w-3.5 h-3.5 mr-1 -mt-0.5" aria-hidden /> {article.date}
            <span className="mx-2" aria-hidden>·</span>
            <User className="inline w-3.5 h-3.5 mr-1 -mt-0.5" aria-hidden /> {article.author.name}
          </>
        }
      />

      <section className="p-body">
        <div className="wrap">
          <div className="max-w-[48rem]">
            <NewsArticleBody article={article} />

            <NewsRelated article={article} />

            <div className="mt-12 pt-8 border-t border-hairline">
              <SeoLink href="/tin-tuc" className="btn btn-ghost">
                <ArrowLeft className="w-4 h-4" /> Xem thêm tin tức VinFast & Cần Thơ EV
              </SeoLink>
            </div>
          </div>
        </div>
      </section>

      <NewsArticleCro article={article} />
    </div>
  );
}
