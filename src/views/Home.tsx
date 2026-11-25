/**
 * Trang chủ theo bố cục co-ev.vn (website/src/app/(site)/page.tsx): hero xe chạy,
 * bốn thẻ hồ sơ, dải Navy cắt xiên, con số, thẻ có ảnh, quy trình, tin tức, kêu gọi.
 * Nội dung là của Cần Thơ EV; giữ các cụm từ khoá chính của trang chủ.
 */
import { SeoLink } from "@/components/SeoLink";
import { getNewsArticles, type NewsArticle } from "@/lib/content/news";
import { PRODUCTS_SEO } from "@/lib/content/products";
import { XANHSM_PARTNER_CITIES } from "@/lib/content/xanhsm-partner-cities";
import { CONTACT_PHONE, dispatchConsultationPopup } from "@/lib/contact";
import { HeroMotion } from "@/components/evg/HeroMotion";
import { Icon, LineIcon, type LineIconName } from "@/components/evg/Icons";

const PLATE_ITEMS = [
  { t: "Biển số vàng", d: "Đăng ký xe kinh doanh vận tải", icon: "plate" },
  { t: "Phù hiệu vận tải", d: "Theo loại hình: taxi, hợp đồng hoặc xe tải", icon: "badge" },
  { t: "Thiết bị định vị", d: "Lắp theo quy định của từng loại hình", icon: "pin" },
  { t: "Đăng ký Xanh SM", d: "Hỗ trợ hồ sơ chạy nền tảng Xanh SM", icon: "app" },
] as const;

const STEPS: { t: string; d: string; icon: LineIconName }[] = [
  { t: "Gọi tổng đài hoặc để lại số", d: "Nói cho chúng tôi biết bạn mua xe gia đình hay chạy dịch vụ.", icon: "phone" },
  { t: "Chọn xe, tính giá lăn bánh", d: "So sánh các dòng VinFast, tính giá lăn bánh tại Cần Thơ, trả góp.", icon: "car" },
  { t: "Làm hồ sơ vận doanh", d: "Biển số, phù hiệu, định vị, đăng ký Xanh SM qua hợp tác xã.", icon: "docs" },
  { t: "Nhận xe và bắt đầu chạy", d: "Bàn giao xe tại Cần Thơ, hướng dẫn sạc và vận hành.", icon: "callback" },
];

function formatDate(date: string) {
  return date;
}

export default function Home({ newsArticles: newsArticlesProp }: { newsArticles?: NewsArticle[] }) {
  const news = (newsArticlesProp ?? getNewsArticles()).slice(0, 3);
  const cars = PRODUCTS_SEO;

  return (
    <>
      <section className="hero hero--motion">
        <div className="wrap">
          <div className="hero-title">
            <h1>
              <span>Ô tô điện</span> <span>VinFast</span> <span>tại Cần Thơ</span>
            </h1>
            <p className="hero-title-tag">Hợp tác xã vận tải Cần Thơ EV</p>
          </div>
        </div>
        <HeroMotion />
      </section>

      {/* Mở đầu: tiêu đề hai cột và bốn thẻ hồ sơ vận doanh */}
      <section className="h-sec h-intro" aria-labelledby="ho-so">
        <div className="wrap">
          <div className="h-head">
            <div>
              <p className="h-eyebrow">Cần Thơ EV hỗ trợ</p>
              <h2 id="ho-so">
                Mua xe và chạy dịch vụ
                <br />
                bằng ô tô điện
              </h2>
            </div>
            <p className="h-lead">
              <strong>Cần Thơ EV</strong> là <strong>hợp tác xã vận tải Cần Thơ</strong>, tư vấn{" "}
              <SeoLink href="/vinfast-can-tho">ô tô VinFast Cần Thơ</SeoLink> và hỗ trợ đăng ký{" "}
              <SeoLink href="/dang-ky-xanhsm">Xanh SM Cần Thơ</SeoLink> cho tài xế miền Tây.
            </p>
          </div>
          <ul className="h-cards4">
            {PLATE_ITEMS.map((i) => (
              <li key={i.t}>
                <span className="h-badge"><Icon name={i.icon} /></span>
                <strong>{i.t}</strong>
                <span>{i.d}</span>
              </li>
            ))}
          </ul>
          <p className="h-note">
            Cần Thơ EV hỗ trợ chuẩn bị hồ sơ. Việc cấp biển, phù hiệu hay chấp thuận tham gia do cơ quan có thẩm quyền và
            từng nền tảng quyết định.
          </p>
        </div>
      </section>

      {/* Dải Navy cắt xiên: trang tổng hợp giá lăn bánh */}
      <section className="h-navy" aria-labelledby="gia-lan-banh">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-bg" src="/images/nen/doi-xe-bai-sac.webp" alt="" loading="lazy" decoding="async" />
        <div className="wrap">
          <div>
            <p className="h-eyebrow">VinFast Cần Thơ</p>
            <h2 id="gia-lan-banh">
              Bảng tính giá lăn bánh
              <br />
              minh bạch tại Cần Thơ
            </h2>
            <p>
              Ước tính chi phí lăn bánh tại Cần Thơ: giá xe, phí biển số, phí đường bộ, bảo hiểm trách
              nhiệm dân sự, không cần gọi mới biết giá.
            </p>
            <SeoLink className="h-pill" href="/vinfast-can-tho">
              Xem bảng giá VinFast Cần Thơ <LineIcon name="arrow" />
            </SeoLink>
          </div>
        </div>
      </section>

      {/* Con số: chỉ dùng dữ kiện có thật */}
      <section className="h-sec h-stats" aria-label="Cần Thơ EV trong vài con số">
        <div className="wrap">
          <div>
            <p className="h-eyebrow">Hợp tác xã Cần Thơ EV</p>
            <h2>
              Một tổng đài
              <br />
              cho mọi việc về xe
            </h2>
          </div>
          <dl>
            <div><LineIcon name="car" /><dt>Dòng xe VinFast</dt><dd>{String(cars.length).padStart(2, "0")}</dd></div>
            <div><LineIcon name="coop" /><dt>Khu vực Xanh SM Partner</dt><dd>{String(XANHSM_PARTNER_CITIES.length).padStart(2, "0")}</dd></div>
            <div><LineIcon name="steps" /><dt>Bước đến lúc xe chạy</dt><dd>{String(STEPS.length).padStart(2, "0")}</dd></div>
            <div><LineIcon name="headset" /><dt>Tổng đài tư vấn</dt><dd className="num">{CONTACT_PHONE}</dd></div>
          </dl>
        </div>
      </section>

      {/* Các dòng xe */}
      <section className="h-sec" aria-labelledby="dong-xe">
        <div className="wrap">
          <div className="h-row">
            <div>
              <p className="h-eyebrow">Ô tô VinFast Cần Thơ</p>
              <h2 id="dong-xe">Các dòng xe điện VinFast</h2>
            </div>
            <SeoLink className="h-more" href="/san-pham">
              Xem tất cả dòng xe <LineIcon name="arrow" />
            </SeoLink>
          </div>
          <ul className="h-svc">
            {cars.map((car) => (
              <li key={car.id}>
                <SeoLink href={`/san-pham/${car.id}`}>
                  <span className="h-svc-art h-svc-art--car">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={car.image} alt={`${car.name} tại Cần Thơ`} loading="lazy" decoding="async" />
                  </span>
                  <span className="h-tag">{car.price}</span>
                  <strong>{car.name}</strong>
                  <span className="h-svc-desc">{car.description}</span>
                </SeoLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quy trình: khối Navy cắt xiên bên trái, dòng thời gian bốn bước bên phải */}
      <section className="h-sec h-process" aria-labelledby="quy-trinh">
        <div className="h-process-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-bg" src="/images/nen/tai-xe-cam-sac.webp" alt="" loading="lazy" decoding="async" />
          <div>
            <p className="h-eyebrow">Quy trình</p>
            <h2 id="quy-trinh">Từ cuộc gọi đầu tiên đến lúc xe chạy</h2>
            <p>Mỗi người chạy một kiểu, nên xe và hồ sơ được chọn sau khi nhân viên nghe bạn mô tả cách làm việc.</p>
            <SeoLink className="h-pill" href="/dang-ky-xanhsm">
              Đăng ký chạy Xanh SM <LineIcon name="arrow" />
            </SeoLink>
          </div>
        </div>
        <ol className="h-timeline">
          {STEPS.map((st, n) => (
            <li key={st.t}>
              <span className="h-dot"><LineIcon name={st.icon} /></span>
              <span className="h-step-n">{String(n + 1).padStart(2, "0")}</span>
              <strong>{st.t}</strong>
              <span>{st.d}</span>
            </li>
          ))}
        </ol>
      </section>

      {news.length > 0 && (
        <section className="h-sec" aria-labelledby="tin-moi">
          <div className="wrap">
            <div className="h-row">
              <div>
                <p className="h-eyebrow">Tin tức</p>
                <h2 id="tin-moi">Tin xe điện VinFast tại Cần Thơ</h2>
              </div>
              <SeoLink className="h-more" href="/tin-tuc">
                Tất cả tin tức <LineIcon name="arrow" />
              </SeoLink>
            </div>
            <ul className="h-news">
              {news.map((n) => (
                <li key={n.id}>
                  <SeoLink href={`/tin-tuc/${n.id}`}>
                    <span className="h-news-art">
                      {n.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={n.image} alt={n.imageAlt || n.title} loading="lazy" decoding="async" />
                      ) : (
                        <><i /><i /><i /></>
                      )}
                    </span>
                    <time>{formatDate(n.date)}</time>
                    <h3>{n.title}</h3>
                    <span className="h-news-desc">{n.excerpt}</span>
                  </SeoLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="h-sec">
        <div className="wrap">
          <div className="h-cta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="h-bg" src="/images/nen/tai-xe-dien-thoai.webp" alt="" loading="lazy" decoding="async" />
            <div>
              <p className="h-eyebrow">Tư vấn miễn phí</p>
              <h2>Chưa biết chọn xe nào?</h2>
              <p>
                Để lại số điện thoại, nhân viên Cần Thơ EV gọi lại tư vấn dòng xe, giá lăn bánh và cách đăng ký chạy dịch vụ.
              </p>
            </div>
            <button type="button" className="h-pill h-pill--solid" onClick={() => dispatchConsultationPopup()}>
              Đăng ký tư vấn <LineIcon name="arrow" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
