#!/usr/bin/env node
/**
 * validate-article.js v3.0
 * Kiểm tra bài viết JSON theo SEO Checklist chuẩn webadmin.
 * Áp dụng cả tiêu chí bắt buộc & nên có.
 * Chạy: node scripts/validate-article.js article.json
 */

const fs = require("fs");

function countWords(html) {
  return html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

function hasKeyword(html, kw) {
  return html.toLowerCase().includes(kw.toLowerCase());
}

function getKeywordDensity(text, keyword) {
  if (!keyword) return 0;
  const words = text.replace(/<[^>]+>/g, " ").toLowerCase().split(/\s+/).filter(Boolean);
  const keywordCount = text.toLowerCase().match(new RegExp(keyword.toLowerCase(), "g"))?.length || 0;
  return words.length > 0 ? ((keywordCount / words.length) * 100).toFixed(2) : 0;
}

function validate(article) {
  const errors = [];
  const warnings = [];
  const seoChecks = {
    titleLeft: false,
    headingLogic: false,
    keywordDensity: false,
    lsiKeywords: false,
    imageOptimized: false,
    internalLinks: false,
    cta: false,
    authorBox: false,
    faqs: false,
  };

  // ============ REQUIRED FIELDS ============
  const required = ["id", "title", "metaTitle", "excerpt", "image", "imageAlt", "date", "category", "primaryKeyword", "sapoHtml", "conclusionHtml"];
  for (const field of required) {
    if (!article[field]) errors.push(`Thiếu field: ${field}`);
  }

  // ============ TITLE & H1 SEO ============
  if (article.title) {
    const titleLen = article.title.length;
    if (titleLen < 55 || titleLen > 70) {
      warnings.push(`Title dài ${titleLen} ký tự (khuyến nghị 55-70)`);
    }

    // Từ khóa bên trái (MUST HAVE)
    if (article.primaryKeyword) {
      const titleLower = article.title.toLowerCase();
      const kwIndex = titleLower.indexOf(article.primaryKeyword.toLowerCase());

      if (kwIndex === -1) {
        errors.push(`Title không chứa primaryKeyword: "${article.primaryKeyword}"`);
      } else if (kwIndex > 30) {
        // Từ khóa ở xa bên trái
        warnings.push(`⚠️  Từ khóa bên TRÁI: Nên đặt từ khóa ở vị trí ${kwIndex + 1} (gần đầu tiêu đề)`);
      } else {
        seoChecks.titleLeft = true;
      }
    }
  }

  // ============ META TAGS ============
  if (article.metaTitle) {
    const metaLen = article.metaTitle.length;
    if (metaLen < 50 || metaLen > 60) {
      warnings.push(`metaTitle dài ${metaLen} ký tự (khuyến nghị 50-60)`);
    }
    if (article.primaryKeyword && !hasKeyword(article.metaTitle, article.primaryKeyword)) {
      errors.push("metaTitle không chứa primaryKeyword");
    }
  }

  if (article.excerpt) {
    const excerptLen = article.excerpt.length;
    if (excerptLen < 150 || excerptLen > 160) {
      warnings.push(`excerpt dài ${excerptLen} ký tự (khuyến nghị 150-160)`);
    }
  }

  // ============ HEADING STRUCTURE ============
  if (Array.isArray(article.sections)) {
    if (article.sections.length < 3) {
      errors.push(`Sections quá ít: ${article.sections.length} (cần ≥ 3)`);
    } else {
      const levels = article.sections.map(s => s.level);
      const h2Count = levels.filter(l => l === 2).length;
      const hasH3 = levels.includes(3);

      if (h2Count < 3) {
        warnings.push(`Chỉ có ${h2Count} H2 (khuyến nghị ≥ 3)`);
      }

      // Kiểm tra cấu trúc logic H2 → H3 → H4
      let logicCheck = true;
      for (let i = 0; i < levels.length - 1; i++) {
        const jump = levels[i + 1] - levels[i];
        if (jump > 1 || jump < -2) {
          logicCheck = false;
          break;
        }
      }

      if (logicCheck) {
        seoChecks.headingLogic = true;
      } else {
        warnings.push("⚠️  Cấu trúc Heading: Nên dùng H2 → H3 → H4 logic (không bỏ mức)");
      }
    }
  }

  // ============ KEYWORD DENSITY & LSI ============
  if (article.primaryKeyword && article.sections) {
    const allSectionText = (article.sections || [])
      .map(s => (s.paragraphs || []).join(" "))
      .join(" ");

    const density = getKeywordDensity(allSectionText, article.primaryKeyword);

    if (density < 1 || density > 2) {
      warnings.push(`Keyword Density: ${density}% (tự nhiên là 1-2%)`);
    } else {
      seoChecks.keywordDensity = true;
    }

    // LSI Keywords: kiểm tra xem H2/H3 có chứa keyword phụ không
    const hasLSI = (article.keywords || []).some(kw =>
      allSectionText.toLowerCase().includes(kw.toLowerCase())
    );
    if (hasLSI) {
      seoChecks.lsiKeywords = true;
    } else if (article.keywords && article.keywords.length > 0) {
      warnings.push("LSI Keywords: Nên thêm từ khóa phụ vào H2/H3 hoặc paragraphs");
    }
  }

  // ============ HÌNH ẢNH OPTIMIZATION (SEO v3.0) ============
  let imageOpts = 0;

  // Kiểm tra tên file ảnh
  if (article.image) {
    const fileName = article.image.split("/").pop();
    if (fileName && /^[a-z0-9-]+\.(webp|jpg|png|jpeg)$/.test(fileName)) {
      imageOpts++;
    } else {
      warnings.push(`📷 Tên file ảnh: "${fileName}" nên không dấu, dấu gạch ngang, .webp`);
    }
  }

  // Kiểm tra alt text
  if (article.imageAlt && article.imageAlt.length > 20) {
    imageOpts++;
  }

  // Kiểm tra ảnh trong sections
  let sectionImages = 0;
  if (Array.isArray(article.sections)) {
    article.sections.forEach(sec => {
      if (sec.image) {
        const imgFile = sec.image.src?.split("/").pop();
        if (imgFile && /^[a-z0-9-]+\.(webp|jpg|png)$/.test(imgFile)) {
          sectionImages++;
        }
      }
    });
  }

  if (imageOpts >= 2) {
    seoChecks.imageOptimized = true;
  } else {
    warnings.push(`🖼️  Ảnh: Hãy kiểm tra kích thước (<150KB), định dạng (.webp), tên file chuẩn`);
  }

  // ============ INTERNAL LINKS ============
  let internalLinkCount = 0;
  let externalLinkCount = 0;

  if (Array.isArray(article.sections)) {
    article.sections.forEach(sec => {
      (sec.paragraphs || []).forEach(p => {
        const internalMatches = (p.match(/href="\/tin-tuc\/[^"]+"/g) || []).length;
        const externalMatches = (p.match(/href="https?:\/\/[^"]+"/g) || []).length;
        internalLinkCount += internalMatches;
        externalLinkCount += externalMatches;
      });
    });
  }

  if (internalLinkCount >= 2) {
    seoChecks.internalLinks = true;
  } else {
    errors.push(`Internal Links: Cần ≥ 2 link nội bộ (/tin-tuc/), hiện có ${internalLinkCount}`);
  }

  // ============ CTA (CALL TO ACTION) ============
  if (article.conclusionHtml && article.conclusionHtml.includes('href="/lien-he"')) {
    seoChecks.cta = true;
  } else if (article.cta?.href) {
    seoChecks.cta = true;
  } else {
    warnings.push("CTA: Nên có nút/link hành động rõ ràng (e.g., 'Liên hệ tư vấn')");
  }

  // ============ AUTHOR BOX ============
  if (article.author?.name && article.author?.bio && article.author?.bio.length > 20) {
    seoChecks.authorBox = true;
  } else {
    warnings.push("👤 Author Box: Nên có tên, vai trò, và bio chi tiết để tăng EEAT");
  }

  // ============ FAQ SCHEMA ============
  if (Array.isArray(article.faqs) && article.faqs.length >= 3) {
    seoChecks.faqs = true;
  } else if (Array.isArray(article.faqs) && article.faqs.length > 0) {
    warnings.push(`❓ FAQ: ${article.faqs.length} câu (nên 3-5 để schema tối ưu)`);
  }

  // ============ CONTENT LENGTH ============
  let totalWords = 0;
  if (Array.isArray(article.sections)) {
    article.sections.forEach(sec => {
      (sec.paragraphs || []).forEach(p => {
        totalWords += countWords(p);
      });
    });
  }

  if (totalWords < 800) {
    warnings.push(`📝 Nội dung: ${totalWords} từ (khuyến nghị ≥ 800)`);
  }

  // ============ MISC CHECKS ============
  if (article.category && !["vinfast", "cantho", "knowledge"].includes(article.category)) {
    errors.push(`Category không hợp lệ: "${article.category}"`);
  }

  if (article.date && !/^\d{2}\/\d{2}\/\d{4}$/.test(article.date)) {
    errors.push(`Date format: "${article.date}" (dùng dd/mm/yyyy)`);
  }

  if (article.status !== "draft") {
    warnings.push("⚠️  Status: Nên đăng nháp (draft) để review trước publish");
  }

  return { errors, warnings, seoChecks, contentStats: { totalWords, internalLinks: internalLinkCount } };
}

// Main
const filePath = process.argv[2];
if (!filePath) {
  console.error("Cách dùng: node validate-article.js <article.json>");
  process.exit(1);
}

const raw = fs.readFileSync(filePath, "utf8");
let article;
try {
  article = JSON.parse(raw);
} catch (e) {
  console.error("❌ JSON không hợp lệ:", e.message);
  process.exit(1);
}

const { errors, warnings, seoChecks, contentStats } = validate(article);

console.log(`\n📄 Bài viết: "${article.title || article.id}"\n`);

// SEO Score
const seoScore = Object.values(seoChecks).filter(Boolean).length;
const seoTotal = Object.keys(seoChecks).length;
console.log(`📊 SEO Score: ${seoScore}/${seoTotal} (${Math.round((seoScore / seoTotal) * 100)}%)\n`);

// SEO Checks Detail
console.log("SEO Checklist:");
console.log(`  ${seoChecks.titleLeft ? "✅" : "❌"} Từ khóa bên trái (H1)`);
console.log(`  ${seoChecks.headingLogic ? "✅" : "⚠️ "} Cấu trúc heading H2→H3→H4`);
console.log(`  ${seoChecks.keywordDensity ? "✅" : "⚠️ "} Keyword density 1-2%`);
console.log(`  ${seoChecks.lsiKeywords ? "✅" : "⚠️ "} LSI keywords`);
console.log(`  ${seoChecks.imageOptimized ? "✅" : "⚠️ "} Ảnh tối ưu (tên, size, format)`);
console.log(`  ${seoChecks.internalLinks ? "✅" : "❌"} Internal links (≥2)`);
console.log(`  ${seoChecks.cta ? "✅" : "⚠️ "} CTA rõ ràng`);
console.log(`  ${seoChecks.authorBox ? "✅" : "⚠️ "} Author box chi tiết`);
console.log(`  ${seoChecks.faqs ? "✅" : "⚠️ "} FAQ schema (3-5 Q&A)\n`);

// Content Stats
console.log(`📈 Thống kê nội dung:`);
console.log(`  - Tổng từ: ${contentStats.totalWords} (khuyến nghị ≥800)`);
console.log(`  - Internal links: ${contentStats.internalLinks} (cần ≥2)\n`);

if (warnings.length > 0) {
  console.log("⚠️  Cảnh báo:");
  for (const w of warnings) console.log(`   ${w}`);
  console.log();
}

if (errors.length > 0) {
  console.log("❌ LỖI (cần sửa trước khi đăng):");
  for (const e of errors) console.log(`   ${e}`);
  console.log(`\n🔴 Bài viết CHƯA đủ điều kiện đăng (${errors.length} lỗi)\n`);
  process.exit(1);
} else {
  console.log(`✅ Bài viết hợp lệ — sẵn sàng đăng!\n`);
}
