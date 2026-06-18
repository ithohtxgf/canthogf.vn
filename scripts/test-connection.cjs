#!/usr/bin/env node
/**
 * test-connection.js
 * Kiểm tra kết nối tới website admin trước khi dùng skill.
 * Chạy: node scripts/test-connection.js
 */

const fs = require("fs");
const path = require("path");

function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ Không tìm thấy .env.local");
    console.error("   Chạy: cp .env.example .env.local  rồi điền thông tin");
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

loadEnv();

const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

async function main() {
  console.log("🔍 Kiểm tra cấu hình...\n");

  // Kiểm tra env
  const missing = [];
  if (!SITE_URL) missing.push("SITE_URL (hoặc NEXT_PUBLIC_SITE_URL)");
  if (!ADMIN_EMAIL) missing.push("ADMIN_EMAIL");
  if (!ADMIN_PASSWORD) missing.push("ADMIN_PASSWORD");

  if (missing.length > 0) {
    console.error("❌ Thiếu biến môi trường:", missing.join(", "));
    process.exit(1);
  }

  console.log(`✅ SITE_URL       = ${SITE_URL}`);
  console.log(`✅ ADMIN_EMAIL    = ${ADMIN_EMAIL}`);
  console.log(`✅ ADMIN_PASSWORD = ${"*".repeat(ADMIN_PASSWORD.length)}\n`);

  // Kiểm tra website ping
  console.log("🌐 Kiểm tra website...");
  try {
    const res = await fetch(SITE_URL, { method: "HEAD" });
    console.log(`✅ Website phản hồi: ${res.status} ${res.statusText}\n`);
  } catch (err) {
    console.error(`❌ Không kết nối được: ${err.message}`);
    process.exit(1);
  }

  // Kiểm tra đăng nhập
  console.log("🔐 Thử đăng nhập admin...");
  try {
    const res = await fetch(`${SITE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });

    if (res.ok) {
      const cookie = res.headers.get("set-cookie");
      console.log(`✅ Đăng nhập thành công (${res.status})`);
      console.log(`✅ Session cookie: ${cookie ? "có" : "không tìm thấy"}\n`);

      if (!cookie) {
        console.warn("⚠️  Không nhận được session cookie — API có thể dùng cơ chế khác");
      }
    } else {
      const body = await res.text();
      console.error(`❌ Đăng nhập thất bại (${res.status}): ${body}`);
      process.exit(1);
    }
  } catch (err) {
    console.error(`❌ Lỗi gọi API login: ${err.message}`);
    process.exit(1);
  }

  console.log("🎉 Tất cả kiểm tra đã qua! Skill sẵn sàng hoạt động.");
  console.log(`\nDùng skill: /write-blog <chủ đề bài viết>`);
}

main().catch((err) => {
  console.error("Lỗi không xử lý được:", err);
  process.exit(1);
});
