#!/usr/bin/env node
/**
 * post-article.js — Đăng bài lên canthogf.vn qua API
 * Dùng: node scripts/post-article.js article.json
 */

const fs = require("fs");
const path = require("path");

// ─── Load .env.local ────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ Không tìm thấy .env.local");
    console.error("   Chạy: copy .env.example .env.local  rồi điền thông tin");
    process.exit(1);
  }
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq < 0) continue;
    const key = t.slice(0, eq).trim();
    const val = t.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv();

const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://canthogf.vn").replace(/\/$/, "");
const ADMIN_EMAIL    = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("❌ Thiếu ADMIN_EMAIL hoặc ADMIN_PASSWORD trong .env.local");
  process.exit(1);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Gộp tất cả Set-Cookie headers thành một chuỗi Cookie để gửi lại.
 * Supabase SSR có thể trả nhiều cookie: sb-xxx-auth-token.0, .1, ...
 */
function extractCookies(response) {
  const raw = response.headers.getSetCookie?.() ?? [];
  // Node 18+: getSetCookie() trả mảng
  if (raw.length === 0) {
    // Fallback: parse Set-Cookie từ headers thông thường
    const single = response.headers.get("set-cookie");
    if (single) return single.split(",").map(c => c.split(";")[0].trim()).join("; ");
    return "";
  }
  return raw.map(c => c.split(";")[0].trim()).join("; ");
}

// ─── Login ───────────────────────────────────────────────────────────────────
async function login() {
  const res = await fetch(`${SITE_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  let body = {};
  try { body = await res.json(); } catch {}

  if (!res.ok) {
    const msg = body.error || res.statusText;
    if (res.status === 403) {
      throw new Error(`Email "${ADMIN_EMAIL}" không có quyền admin trên ${SITE_URL}`);
    }
    throw new Error(`Login thất bại (${res.status}): ${msg}`);
  }

  const cookies = extractCookies(res);
  if (!cookies) {
    throw new Error("Đăng nhập thành công nhưng không nhận được session cookie");
  }

  return cookies;
}

// ─── Create article ──────────────────────────────────────────────────────────
async function createArticle(article, cookies) {
  const res = await fetch(`${SITE_URL}/api/admin/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": cookies,
    },
    body: JSON.stringify(article),
  });

  let body = {};
  try { body = await res.json(); } catch {}

  if (!res.ok) {
    const detail = typeof body === "object" ? JSON.stringify(body) : body;
    throw new Error(`Tạo bài thất bại (${res.status}): ${detail}`);
  }

  return body;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  // Đọc file JSON
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Cách dùng: node post-article.js <article.json>");
    process.exit(1);
  }

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File không tồn tại: ${filePath}`);
    process.exit(1);
  }

  let article;
  try {
    article = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (e) {
    console.error("❌ JSON không hợp lệ:", e.message);
    process.exit(1);
  }

  console.log(`\n🌐 Website : ${SITE_URL}`);
  console.log(`📧 Email   : ${ADMIN_EMAIL}`);
  console.log(`📝 Bài viết: "${article.title}"\n`);

  // Login
  process.stdout.write("🔐 Đang đăng nhập... ");
  const cookies = await login();
  console.log("✅ OK");

  // Post article
  process.stdout.write("📤 Đang đăng bài... ");
  const result = await createArticle(article, cookies);
  console.log("✅ OK\n");

  console.log("═══════════════════════════════════════");
  console.log(`✅ Bài viết đăng thành công!`);
  console.log(`📰 Tiêu đề : ${article.title}`);
  console.log(`🔗 URL     : ${SITE_URL}/tin-tuc/${article.id}`);
  console.log(`📊 Danh mục: ${article.category}`);
  console.log(`📅 Ngày    : ${article.date}`);
  console.log(`📌 Trạng thái: ${article.status}`);
  console.log("═══════════════════════════════════════\n");

  if (Object.keys(result).length > 0) {
    console.log("Server response:", JSON.stringify(result, null, 2));
  }
}

main().catch(err => {
  console.error("\n❌ Lỗi:", err.message);
  process.exit(1);
});
