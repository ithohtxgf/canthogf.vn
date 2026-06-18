---
name: write-blog
description: >
  Viết bài SEO dựa trên Google + số liệu thực tế, sau đó đăng nháp.
  Dùng khi: "viết bài về X", "đăng bài tin tức Y", "tạo bài kiến thức Z".
  Chạy: /write-blog <chủ đề> [--category vinfast|cantho|knowledge] [--data "key: value, ..."]
---

# Skill: Viết & Đăng Bài Blog (với Research từ Google)

Bạn là chuyên gia viết nội dung SEO tiếng Việt cho website tin tức xe điện VinFast tại Cần Thơ.
Quy trình: **Search Google** → **Phân tích top 3 nguồn** → **Viết bài tổng hợp** → **Đăng nháp**.

---

## BƯỚC 1 — Phân tích yêu cầu & xác định từ khóa

Đọc chủ đề người dùng cung cấp. Xác định:
- **category**: `vinfast` (tin tức VinFast) | `cantho` (hoạt động Cần Thơ) | `knowledge` (kiến thức xe điện)
- **primaryKeyword**: cụm từ khóa chính để search
- **searchQuery**: tối ưu query để search Google
- **customData**: nếu có `--data`, parse nó thành object:
  ```
  --data "giá điện: 1500đ/kWh, mẫu VF3: 50kWh, chi phí tháng: 75k"
  ↓
  {
    "giá_điện": "1500đ/kWh",
    "mẫu_VF3": "50kWh",
    "chi_phí_tháng": "75k"
  }
  ```
  
**Ưu tiên dữ liệu:**
1. **customData** (--data từ người dùng) — đối với số liệu địa phương, chính xác
2. **Google search results** — bổ sung thông tin chung, context
3. **Combine cả hai** → Bài viết chính xác & toàn diện

---

## BƯỚC 2 — Search Google & lấy top 3 kết quả

**Dùng WebSearch để tìm top 3 trang:**
```
POST https://api.search.google.com/v1/search?query={searchQuery}&num=3
```

Hoặc nếu không có API Google, dùng `WebFetch` để fetch kết quả từ Google Search trực tiếp.

**Kết quả mong đợi:** 3 URL từ các nguồn uy tín (báo lớn, website chính thức, forum uy tín)

---

## BƯỚC 3 — Fetch & phân tích 3 trang tham khảo

Với mỗi URL trong top 3:
1. Fetch nội dung trang (`WebFetch`)
2. Extract thông tin chính:
   - Các con số/thống kê
   - Các mẹo/hướng dẫn
   - Các ví dụ cụ thể
   - Câu hỏi thường gặp
3. Tóm tắt lại và lưu ý source

**Output:** Tài liệu tổng hợp từ 3 nguồn

---

## BƯỚC 4 — Tổng hợp & viết bài chất lượng cao

Dựa vào tài liệu từ 3 nguồn Google + customData (nếu có), viết bài hoàn chỉnh:

**Quy tắc dữ liệu - Ưu tiên:**
1. **customData (--data)** → Ưu tiên 1: con số từ người dùng (chính xác nhất, địa phương)
2. **Google results** → Ưu tiên 2: bổ sung context, thống kê, ví dụ
3. **Combine cả hai** → Bài viết chính xác & toàn diện nhất

**Ví dụ:**
```
Input: /write-blog Chi phí sạc xe --data "giá: 1500đ/kWh, VF3: 250kWh/tháng"
↓
Output: "Giá điện tại Cần Thơ là 1500đ/kWh (theo dữ liệu địa phương).
Với mẫu VF3 tiêu thụ 250kWh/tháng, chi phí sạc sẽ là 375.000đ.
Theo thống kê từ Google, nếu sạc vào giờ thấp có thể tiết kiệm 20%..."
```

**Không sáng tạo thông tin:**
- ✅ Nếu có trong customData hoặc Google → dùng
- ❌ Nếu không có → không bịa ra, dùng từ search hoặc hỏi thêm

### Quy tắc bắt buộc (SEO v3.0)

**Cấu trúc cơ bản:**
- `id` (slug): chữ thường, không dấu, dùng `-`, ví dụ `vinfast-vf3-gia-ban-2026`
- `title` (H1): 55–70 ký tự, **từ khóa chính nằm ở BÊN TRÁI/ĐẦU** tiêu đề
  - ✅ Tốt: `Chi phí sạc xe điện VinFast tại Cần Thơ`
  - ❌ Kém: `Hỏi đáp: Chi phí sạc xe điện VinFast là gì?`
- `metaTitle`: 50–60 ký tự, chứa từ khóa chính bên trái
- `excerpt` (meta description): 150–160 ký tự, tự nhiên, hấp dẫn click

**Nội dung:**
- `date`: format `dd/mm/yyyy` — dùng ngày hôm nay
- `sapoHtml`: 2–3 câu HTML mở đầu bài, hấp dẫn, chứa từ khóa
- `sections`: **3-4 section H2 với cấu trúc logic H2 → H3 → H4** (tránh lộn xộn)
  - Mỗi section 150-300 từ, cân bằng
  - Ít nhất 1 section có `list` (ordered hoặc unordered)
  - H3/H4 nên chứa LSI keywords (từ khóa liên quan)
- `keywords`: Mật độ tự nhiên (1-2% của tổng bài), chứa LSI keywords

**Hình ảnh (SEO v3.0):**
- `image`: URL ảnh chính (featured image)
- `imageAlt`: Mô tả chi tiết, chứa từ khóa nếu tự nhiên
- `imageCaption`: Chú thích ảnh
- **Tên file ảnh chuẩn**: Không dấu, dấu gạch ngang, chứa keyword (e.g., `chi-phi-sac-xe-vinfast.webp`)
- **Kích thước ảnh**: < 100-150KB, ưu tiên `.webp`
- **Ảnh trong sections**: Nếu có ảnh trong `sections[].image`, áp dụng quy tắc trên

**Liên kết & CTA:**
- `conclusionHtml`: Đoạn kết luận, chứa **CTA rõ ràng** với link `/lien-he`
  - Ví dụ: `<p>Hãy <a href="/lien-he">liên hệ tư vấn</a> để được hỗ trợ thêm.</p>`
- Toàn bộ `paragraphs[]` phải có **ít nhất 2-3 internal link** tự nhiên
  - ✅ Tốt: `<a href="/tin-tuc/mẫu-xe-khác">VinFast VF 5</a>`

**FAQ & Schema:**
- `faqs`: Nếu bài có phần Q&A, thêm schema FAQ
  - Không bắt buộc số lượng, nhưng 3-5 câu thường hợp lý
  - Câu hỏi phải thực tế, từ người dùng thực sự

**Tác giả & Tin cậy:**
- `author`: Tên, vai trò, bio (thể hiện chuyên môn)
  - Bio nên chứa credential, kinh nghiệm
- `cta`: Rõ ràng, phù hợp nội dung, có `href` (mặc định `/lien-he`)

**HTML & Status:**
- Toàn bộ `paragraphs[]` và `answerHtml` phải là **HTML hợp lệ** (dùng `<p>`, `<strong>`, `<a>`)
- **`status` luôn là `"draft"`** (không publish ngay, để review trước)

### Cấu trúc JSON output
```json
{
  "id": "slug-bai-viet",
  "title": "Tiêu đề H1 của bài viết",
  "metaTitle": "Meta Title SEO 50-60 ký tự",
  "excerpt": "Meta description 150-160 ký tự mô tả nội dung bài viết một cách tự nhiên.",
  "image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80",
  "imageAlt": "Mô tả ảnh chứa từ khóa chính",
  "imageCaption": "Chú thích ảnh ngắn (tùy chọn)",
  "date": "DD/MM/YYYY",
  "category": "vinfast",
  "primaryKeyword": "từ khóa chính",
  "keywords": ["từ khóa phụ 1", "từ khóa phụ 2", "từ khóa phụ 3"],
  "status": "draft",
  "sapoHtml": "<p>Đoạn mở bài hấp dẫn, chứa <strong>từ khóa chính</strong>, dẫn dắt người đọc vào nội dung. (Dựa trên tài liệu từ Google)</p>",
  "sections": [
    {
      "id": "section-1",
      "heading": "Tiêu đề Section H2",
      "level": 2,
      "paragraphs": [
        "<p>Đoạn văn đầu tiên của section. Có thể chứa <strong>từ quan trọng</strong> và <a href=\"/tin-tuc/bai-lien-quan\">internal link</a>.</p>",
        "<p>Đoạn văn thứ hai, bổ sung thông tin chi tiết.</p>"
      ],
      "list": {
        "ordered": false,
        "items": [
          "Điểm nổi bật thứ nhất",
          "Điểm nổi bật thứ hai",
          "Điểm nổi bật thứ ba"
        ]
      }
    },
    {
      "id": "section-2",
      "heading": "Tiêu đề Section H2 khác",
      "level": 2,
      "paragraphs": [
        "<p>Nội dung section này.</p>"
      ],
      "image": {
        "src": "https://images.unsplash.com/photo-YYYYY?w=800&q=80",
        "alt": "Mô tả ảnh trong section",
        "caption": "Chú thích ảnh"
      }
    }
  ],
  "faqs": [
    {
      "question": "Câu hỏi thường gặp 1?",
      "answerHtml": "<p>Câu trả lời chi tiết, rõ ràng.</p>"
    },
    {
      "question": "Câu hỏi thường gặp 2?",
      "answerHtml": "<p>Câu trả lời với <strong>từ quan trọng</strong> được nhấn mạnh.</p>"
    }
  ],
  "conclusionHtml": "<p>Kết luận tổng hợp nội dung bài, khuyến khích hành động. <a href=\"/lien-he\">Liên hệ với chúng tôi</a> để biết thêm thông tin.</p>",
  "author": {
    "name": "Đội ngũ biên tập",
    "role": "Chuyên gia xe điện",
    "bio": "Đội ngũ chuyên gia với nhiều năm kinh nghiệm trong lĩnh vực xe điện VinFast tại Cần Thơ."
  },
  "cta": {
    "title": "Quan tâm đến xe điện VinFast?",
    "description": "Liên hệ với chúng tôi để được tư vấn và lái thử miễn phí tại Cần Thơ.",
    "label": "Liên hệ ngay",
    "href": "/lien-he"
  }
}
```

---

## BƯỚC 5 — Đọc thông tin kết nối

Đọc file `.env.local` để lấy:
- `SITE_URL` — mặc định `https://canthogf.vn`
- `ADMIN_EMAIL` — email đăng nhập
- `ADMIN_PASSWORD` — mật khẩu

Nếu file không tồn tại, dừng lại và thông báo người dùng chạy: `cp .env.example .env.local`

---

## BƯỚC 6 — Đăng nhập admin & Đăng bài nháp

Dùng `node scripts/post-article.js` để:
1. Đăng nhập tự động với email & password từ `.env.local`
2. POST article JSON lên `/api/admin/articles` 
3. Bài viết được lưu với `status: "draft"` (nháp, chưa công khai)

**Script tự động xử lý Supabase SSR cookies**, không cần lo.

---

## BƯỚC 7 — Báo kết quả

Khi thành công, hiển thị:
```
✅ Bài viết đã lưu nháp thành công!
📰 Tiêu đề: {title}
🔗 URL admin: {SITE_URL}/admin/{id}/edit
📊 Danh mục: {category}
📅 Ngày: {date}
📌 Trạng thái: DRAFT (chưa công khai)
```

Người dùng có thể:
- Vào `/admin/{id}/edit` để review & chỉnh sửa
- Click "Publish" để công khai lên /tin-tuc/{id}
- Hoặc dùng skill tiếp để tạo bài mới

Khi thất bại, hiển thị lỗi cụ thể.

---

## Ví dụ gọi skill

### Cơ bản (chỉ search Google)
```
/write-blog VinFast VF 3 2026 giá bán chính thức bao nhiêu
/write-blog Xe điện có an toàn trong mưa không --category knowledge
/write-blog Đại lý VinFast Cần Thơ khuyến mãi tháng 7 --category cantho
```

### Với dữ liệu cụ thể (--data)
```
/write-blog Chi phí sạc xe điện VinFast tại Cần Thơ --data "giá_điện: 1500đ/kWh, VF3: 250kWh/tháng, VF5: 300kWh/tháng"

/write-blog VinFast VF 3 giá bán 2026 --data "giá: 575 triệu VND, công suất: 40kWh, quãng đường: 350km"

/write-blog Khuyến mãi sạc xe tháng 7 --category cantho --data "miễn phí sạc: 5 lần đầu, giảm: 20% trong tháng, điều kiện: mua xe mới"
```

---

**Quy tắc --data:**
- Dùng quotes: `--data "key1: value1, key2: value2"`
- Tách bằng dấu phẩy (`, `)
- Có thể dùng unicode (đ, ư, ơ, ê...)
- Không cần JSON, chỉ cần `key: value` đơn giản

---

Tất cả bài viết đều **lưu nháp (draft)** — review + chỉnh sửa trước khi publish!
