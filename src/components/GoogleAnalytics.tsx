import Script from "next/script";

const GA_MEASUREMENT_ID = "G-CBFQ1ZV1QX";

/** Google tag (gtag.js) — chỉ mount một lần tại root layout. */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');

          // Đếm lượt khách bấm gọi điện / Zalo / email — site không có form nên đây là "lead".
          // Trong GA4: Admin → Events → đánh dấu "contact_click" là Key event để báo cáo chuyển đổi.
          document.addEventListener('click', function (e) {
            var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!a) return;
            var href = a.getAttribute('href') || '';
            var method = /^tel:/i.test(href) ? 'phone'
              : /zalo\\.me\\//i.test(href) ? 'zalo'
              : /^mailto:/i.test(href) ? 'email'
              : null;
            if (!method) return;
            gtag('event', 'contact_click', {
              method: method,
              link_url: href,
              link_text: (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 100),
              page_path: location.pathname
            });
          }, true);
        `}
      </Script>
    </>
  );
}
