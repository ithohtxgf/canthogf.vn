import { getSiteJsonLd } from "@/lib/json-ld";

/**
 * JSON-LD toàn site (Organization + WebSite).
 * Render bằng dangerouslySetInnerHTML — chuẩn Google / Next.js.
 */
export function JsonLd() {
  const structuredData = getSiteJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
