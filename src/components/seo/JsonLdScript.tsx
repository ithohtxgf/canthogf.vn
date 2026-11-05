type JsonLdScriptProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Chuỗi JSON an toàn khi nhúng vào <script>: thoát "<", ">", "&"
 * để dữ liệu từ DB (meta title, FAQ…) không thể đóng thẻ </script> rồi chèn mã.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/** JSON-LD theo trang */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializeJsonLd(data),
      }}
    />
  );
}
