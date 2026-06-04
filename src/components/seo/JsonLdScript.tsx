type JsonLdScriptProps = {
  data: Record<string, unknown>;
};

/** JSON-LD theo trang — cùng pattern dangerouslySetInnerHTML như JsonLd */
export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
