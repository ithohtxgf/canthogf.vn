/** Gợi ý alt SEO: mô tả + từ khóa + thương hiệu */
export function suggestImageAlt(
  description: string,
  primaryKeyword: string,
): string {
  const desc = description.trim();
  const keyword = primaryKeyword.trim();
  const brand = "Cần Thơ GF";

  if (desc && keyword) {
    return `${desc} — ${keyword} — ${brand}`.slice(0, 125);
  }
  if (keyword) {
    return `${keyword} tại showroom ${brand}`.slice(0, 125);
  }
  if (desc) {
    return `${desc} — ${brand}`.slice(0, 125);
  }
  return `Hình ảnh minh họa — ${brand}`;
}
