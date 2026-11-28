// Báo cho Bing, Yandex, Naver… (qua IndexNow) rằng các trang đã đổi, để chúng ghé lại sớm.
// Chạy SAU khi Vercel build xong và trang đã lên mạng:
//   npx tsx scripts/indexnow.ts https://canthogf.vn/tin-tuc/<slug> https://canthogf.vn/tin-tuc
// Đường dẫn bắt đầu bằng "/" được hiểu là trên canthogf.vn. Khóa nằm ở public/<KEY>.txt.

const HOST = "canthogf.vn";
const KEY = "ea69197b93f50e529b82e146f593ce7e";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Cách dùng: npx tsx scripts/indexnow.ts <url> [url...]");
    process.exit(1);
  }

  const urlList = args.map((a) => (a.startsWith("/") ? `https://${HOST}${a}` : a));
  const sai = urlList.filter((u) => {
    try {
      return new URL(u).host !== HOST;
    } catch {
      return true;
    }
  });
  if (sai.length > 0) {
    console.error(`URL không thuộc ${HOST}:\n  ${sai.join("\n  ")}`);
    process.exit(1);
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  const text = await res.text();

  // 200: đã nhận; 202: đã nhận, đang kiểm tra khóa. Còn lại là lỗi (400 sai định dạng, 403 khóa sai, 422 URL sai host, 429 gửi quá nhiều).
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow nhận ${urlList.length} URL (HTTP ${res.status}):\n  ${urlList.join("\n  ")}`);
  } else {
    console.error(`IndexNow trả lỗi HTTP ${res.status}${text ? `: ${text}` : ""}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export {};
