import Link from "next/link";

type Props = {
  title: string;
  eyebrow?: string;
  summary?: React.ReactNode;
  crumbs?: { href: string; label: string }[];
  meta?: React.ReactNode;
  image?: string;
};

/**
 * Đầu trang con (chép từ co-ev.vn): dải Navy cắt xiên cạnh dưới, ảnh thật hoà vào nền Navy.
 * Breadcrumb JSON-LD đã có trong RouteJsonLd nên không xuất thêm ở đây (tránh dữ liệu trùng).
 */
export function PageHero({ title, eyebrow, summary, crumbs, meta, image }: Props) {
  return (
    <header className={`p-hero${image ? " p-hero--img" : ""}`}>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="p-hero-bg" src={image} alt="" fetchPriority="high" />
      )}
      <div className="wrap">
        <nav className="p-crumbs" aria-label="Đường dẫn">
          <Link href="/">Trang chủ</Link>
          {crumbs?.map((c) => (
            <span key={c.href}>
              <i aria-hidden="true" />
              <Link href={c.href}>{c.label}</Link>
            </span>
          ))}
        </nav>
        {eyebrow && <p className="h-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {meta && <p className="p-meta">{meta}</p>}
        {summary && <p className="p-summary">{summary}</p>}
      </div>
    </header>
  );
}
