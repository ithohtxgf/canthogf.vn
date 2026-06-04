export type NewsCategory = "vinfast" | "cantho" | "knowledge";

export type NewsFaq = {
  question: string;
  answerHtml: string;
};

export type NewsContentImage = {
  src: string;
  alt: string;
  caption: string;
};

export type NewsContentSection = {
  id: string;
  heading: string;
  level: 2 | 3;
  paragraphs: string[];
  list?: { ordered: boolean; items: string[] };
  image?: NewsContentImage;
};

export type NewsAuthorInfo = {
  name: string;
  role: string;
  bio: string;
};

export type NewsArticle = {
  /** Slug URL — ngắn gọn, không dấu, có từ khóa chính */
  id: string;
  /** H1 — gần giống metaTitle, chứa từ khóa chính */
  title: string;
  /** Meta Title SEO — 50–60 ký tự */
  metaTitle: string;
  /** Meta Description — 150–160 ký tự */
  excerpt: string;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  date: string;
  category: NewsCategory;
  keywords: string[];
  primaryKeyword: string;
  sapoHtml: string;
  sections: NewsContentSection[];
  faqs: NewsFaq[];
  author: NewsAuthorInfo;
  conclusionHtml: string;
  cta: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

/** @deprecated Dùng NewsArticle — giữ alias cho metadata cũ */
export type NewsSeo = NewsArticle;

export const NEWS_CATEGORY_LABELS: Record<NewsCategory, string> = {
  vinfast: "Tin tức VinFast",
  cantho: "Hoạt động tại Cần Thơ",
  knowledge: "Kiến thức xe điện",
};

export const NEWS_ARTICLE_FALLBACK_KEYWORDS = [
  "tin tức vinfast",
  "tin tức cần thơ gf",
  "cập nhật xe điện",
] as const;

const EDITOR_AUTHOR: NewsAuthorInfo = {
  name: "Ban biên tập Cần Thơ GF",
  role: "Chuyên gia tư vấn xe điện VinFast",
  bio: "Đội ngũ biên tập và tư vấn viên của Hợp tác xã vận tải Cần Thơ GF, với hơn 5 năm kinh nghiệm trong lĩnh vực xe điện VinFast, dịch vụ XanhSM và vận tải xanh tại Đồng bằng sông Cửu Long.",
};

const TECH_AUTHOR: NewsAuthorInfo = {
  name: "Đội kỹ thuật Cần Thơ GF",
  role: "Kỹ thuật viên bảo dưỡng xe điện VinFast",
  bio: "Chuyên gia kỹ thuật pin và hệ thống điện xe VinFast tại showroom Cần Thơ GF, am hiểu quy trình sạc, bảo dưỡng và vận hành xe điện trong điều kiện khí hậu miền Tây.",
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "vinfast-ra-mat-xe-dien-moi-2026",
    title: "VinFast ra mắt xe điện mới 2026: Cập nhật tại Cần Thơ GF",
    metaTitle: "VinFast ra mắt xe điện mới 2026: Cập nhật tại Cần Thơ GF",
    excerpt:
      "VinFast ra mắt xe điện mới 2026 với thiết kế thông minh, pin dung lượng lớn. Cần Thơ GF cập nhật giá, ưu đãi trả góp và hỗ trợ lái thử tại showroom Cần Thơ.",
    image: "https://picsum.photos/seed/vinfast-ra-mat-xe-dien-moi-2026/1200/630",
    imageAlt:
      "Hình ảnh xe điện VinFast mới ra mắt tại đại lý Cần Thơ GF",
    imageCaption:
      "Mẫu xe điện VinFast mới nhất trưng bày tại showroom Hợp tác xã Cần Thơ GF",
    date: "15/05/2026",
    category: "vinfast",
    primaryKeyword: "VinFast ra mắt xe điện mới",
    keywords: [
      "vinfast ra mắt xe mới",
      "xe điện vinfast 2026",
      "mua xe vinfast cần thơ",
    ],
    sapoHtml: `<p>Thị trường <strong>VinFast ra mắt xe điện mới</strong> năm 2026 đang thu hút sự chú ý lớn tại miền Tây. Nhiều khách hàng Cần Thơ đặt câu hỏi: mẫu xe mới có gì khác biệt, giá bán ra sao và nên mua ở đâu uy tín? Trong bài viết này, <em>Hợp tác xã Cần Thơ GF</em> tổng hợp thông tin chính thức, đánh giá thực tế và chính sách ưu đãi để bạn quyết định dễ dàng hơn.</p>`,
    sections: [
      {
        id: "tai-sao-vinfast-ra-mat-xe-moi-gay-sot",
        heading: "Tại sao VinFast ra mắt xe điện mới gây sốt tại Cần Thơ?",
        level: 2,
        paragraphs: [
          `Xu hướng chuyển dịch sang <strong>xe ô tô điện</strong> tại Đồng bằng sông Cửu Long ngày càng mạnh mẽ. VinFast tiếp tục bổ sung dòng sản phẩm với công nghệ pin cải tiến, hệ thống trợ lái thông minh và mức giá cạnh tranh trong phân khúc xe điện đô thị.`,
          `Tại Cần Thơ, nhu cầu mua xe chạy dịch vụ XanhSM, kinh doanh vận tải và sử dụng cá nhân đều tăng. Mẫu xe mới được kỳ vọng đáp ứng cả ba nhóm khách hàng này với chi phí vận hành thấp và chính sách bảo hành pin dài hạn.`,
        ],
        list: {
          ordered: false,
          items: [
            "Thiết kế hiện đại, tối ưu cho di chuyển đô thị và chạy dịch vụ",
            "Quãng đường di chuyển mỗi lần sạc được cải thiện so với thế hệ trước",
            "Tích hợp công nghệ kết nối thông minh, hỗ trợ quản lý xe từ xa",
            "Chính sách trả góp linh hoạt tại <a href=\"/san-pham\" class=\"text-primary font-semibold hover:underline\">showroom Cần Thơ GF</a>",
          ],
        },
      },
      {
        id: "danh-gia-chi-tiet-thiet-ke",
        heading: "Đánh giá chi tiết thiết kế và trang bị xe điện VinFast mới",
        level: 2,
        paragraphs: [
          `Theo thông tin từ <a href=\"https://vinfastauto.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-primary font-semibold hover:underline\">VinFast Auto</a>, mẫu xe mới hướng đến trải nghiệm lái êm ái, an toàn và tiết kiệm. Dưới đây là các điểm nổi bật được đội ngũ Cần Thơ GF ghi nhận khi trưng bày tại showroom.`,
        ],
      },
      {
        id: "ngoai-that-hien-dai",
        heading: "Ngoại thất nhỏ gọn, hiện đại",
        level: 3,
        paragraphs: [
          `Thiết kế ngoại thất mang phong cách trẻ trung với đèn LED ban ngày sắc nét, la-zăng hợp kim và tỷ lệ thân xe cân đối. Đây là lựa chọn phù hợp cho <strong>xe điện thông minh</strong> cỡ nhỏ — dễ luồn lách trong phố và dễ dàng đậu xe tại khu vực trung tâm Cần Thơ.`,
          `Màu sắc đa dạng, phù hợp cả khách mua xe gia đình lẫn tài xế chạy dịch vụ công nghệ.`,
        ],
      },
      {
        id: "noi-that-thong-minh",
        heading: "Nội thất thông minh, tối ưu không gian",
        level: 3,
        paragraphs: [
          `Khoang cabin rộng rãi hơn nhiều đối thủ cùng phân khúc <strong>xe ô tô điện cỡ A</strong>. Màn hình giải trí cảm ứng kích thước lớn, kết nối smartphone, hỗ trợ điều hòa tự động và ghế êm ái cho hành trình dài.`,
          `Hệ thống an toàn gồm cảnh báo va chạm, camera lùi và phanh ABS/EBD tiêu chuẩn — yếu tố quan trọng với tài xế chạy <a href=\"/dang-ky-xanhsm\" class=\"text-primary font-semibold hover:underline\">XanhSM Cần Thơ</a> hàng ngày.`,
        ],
        image: {
          src: "https://picsum.photos/seed/noi-that-vinfast-moi-2026/1200/630",
          alt: "Nội thất xe điện VinFast mới tại showroom Cần Thơ GF",
          caption: "Khoang nội thất thông minh, tối ưu cho lái xe đô thị và chạy dịch vụ",
        },
      },
      {
        id: "chinh-sach-uu-dai-can-tho-gf",
        heading: "Chính sách ưu đãi khi mua xe VinFast tại Cần Thơ GF",
        level: 2,
        paragraphs: [
          `<strong>Hợp tác xã Cần Thơ GF</strong> là đại lý ủy quyền VinFast, cung cấp tư vấn trọn gói từ chọn mẫu xe, làm thủ tục đăng ký đến hỗ trợ vay trả góp. Khách hàng mua xe trong tháng 5/2026 được hưởng nhiều ưu đãi hấp dẫn.`,
        ],
        list: {
          ordered: true,
          items: [
            "Tư vấn miễn phí và hỗ trợ <strong>đăng ký lái thử</strong> tại showroom",
            "Hỗ trợ vay trả góp lãi suất ưu đãi — <em>mua xe VinFast trả góp</em> dễ dàng",
            "Quà tặng phụ kiện chính hãng và bảo dưỡng miễn phí giai đoạn đầu",
            "Hỗ trợ thủ tục đăng ký XanhSM cho tài xế có nhu cầu chạy dịch vụ",
          ],
        },
        image: {
          src: "https://picsum.photos/seed/uu-dai-vinfast-can-tho-gf/1200/630",
          alt: "Chính sách ưu đãi mua xe VinFast tại Hợp tác xã Cần Thơ GF",
          caption: "Cần Thơ GF — đại lý VinFast uy tín, hỗ trợ trả góp và tư vấn XanhSM",
        },
      },
    ],
    faqs: [
      {
        question: "Mua xe VinFast mới ở Cần Thơ được hỗ trợ những gì?",
        answerHtml:
          "Khách hàng tại Cần Thơ GF được tư vấn chọn mẫu xe phù hợp, hỗ trợ vay trả góp, làm thủ tục đăng ký xe và bảo hành chính hãng VinFast. Hotline <strong>0916 513 720</strong> hỗ trợ 24/7.",
      },
      {
        question: "Có được lái thử xe điện VinFast trước khi mua không?",
        answerHtml:
          'Có. Bạn có thể <a href="/lien-he" class="text-primary font-semibold hover:underline">đăng ký lái thử</a> miễn phí tại showroom Cần Thơ GF hoặc tham gia các ngày hội lái thử định kỳ.',
      },
    ],
    author: EDITOR_AUTHOR,
    conclusionHtml: `<p><strong>VinFast ra mắt xe điện mới</strong> mở ra cơ hội sở hữu xe xanh với chi phí hợp lý cho người dân Cần Thơ. Với kinh nghiệm tư vấn xe điện và hỗ trợ XanhSM, Cần Thơ GF sẵn sàng đồng hành cùng bạn từ khâu chọn xe đến vận hành lâu dài.</p>`,
    cta: {
      title: "Đăng ký tư vấn mua xe VinFast ngay hôm nay",
      description:
        "Liên hệ Cần Thơ GF để nhận báo giá mới nhất, ưu đãi tháng 5/2026 và lịch lái thử xe điện VinFast.",
      label: "Đăng ký tư vấn miễn phí",
      href: "/lien-he",
    },
  },
  {
    id: "ban-giao-vinfast-vf5-can-tho",
    title: "Cần Thơ GF bàn giao 50 xe VinFast VF5 cho đối tác chiến lược",
    metaTitle: "Bàn giao 50 xe VF5 tại Cần Thơ GF: Cột mốc mới",
    excerpt:
      "Cần Thơ GF bàn giao 50 xe VinFast VF5 cho đối tác vận tải. Xe điện VF5 chất lượng, giá tốt, hỗ trợ trả góp nhanh — liên hệ hotline 0916 513 720 để đặt xe.",
    image: "https://picsum.photos/seed/ban-giao-vinfast-vf5-can-tho/1200/630",
    imageAlt:
      "Lễ bàn giao 50 xe VinFast VF5 tại showroom Hợp tác xã Cần Thơ GF",
    imageCaption:
      "Lễ bàn giao lô 50 xe VinFast VF5 — minh chứng uy tín của Cần Thơ GF",
    date: "10/05/2026",
    category: "cantho",
    primaryKeyword: "bàn giao VinFast VF5 Cần Thơ",
    keywords: [
      "bàn giao vf5 cần thơ",
      "cần thơ gf",
      "vinfast vf5 đối tác",
    ],
    sapoHtml: `<p>Sáng 10/05/2026, <strong>bàn giao VinFast VF5 Cần Thơ</strong> đã diễn ra thành công tại showroom Hợp tác xã Cần Thơ GF với lô 50 xe giao cho đối tác chiến lược. Sự kiện đánh dấu bước tiến mới trong hợp tác cung ứng <em>xe điện VinFast</em> phục vụ vận tải và dịch vụ công nghệ tại miền Tây. Cùng tìm hiểu chi tiết về mẫu VF5 và lý do đối tác tin chọn Cần Thơ GF.</p>`,
    sections: [
      {
        id: "bien-ban-giao-50-xe-vf5",
        heading: "Tại sao lễ bàn giao 50 xe VF5 tại Cần Thơ GF thu hút sự chú ý?",
        level: 2,
        paragraphs: [
          `VinFast <a href="/san-pham/vf5" class="text-primary font-semibold hover:underline">VF5</a> là mẫu <strong>xe điện cỡ A</strong> bán chạy nhất phân khúc, phù hợp chạy taxi công nghệ XanhSM, kinh doanh vận tải nội thành và sử dụng cá nhân. Việc bàn giao đồng loạt 50 xe cho thấy nhu cầu thị trường Cần Thơ đang tăng mạnh.`,
          `Đối tác đánh giá cao quy trình giao xe nhanh, minh bạch và dịch vụ hậu mãi của Cần Thơ GF — từ kiểm tra chất lượng, bàn giao hồ sơ đến hướng dẫn sử dụng ban đầu.`,
        ],
        list: {
          ordered: false,
          items: [
            "50 xe VF5 mới 100%, bảo hành chính hãng VinFast",
            "Hỗ trợ đăng ký biển số và thủ tục hành chính trọn gói",
            "Tư vấn vận hành, sạc pin và bảo dưỡng định kỳ",
            "Chính sách tài chính linh hoạt cho đối tác mua số lượng lớn",
          ],
        },
      },
      {
        id: "danh-gia-vinfast-vf5",
        heading: "Đánh giá chi tiết VinFast VF5 — mẫu xe chủ lực của đợt bàn giao",
        level: 2,
        paragraphs: [
          `VF5 sở hữu thiết kế trẻ trung, quãng đường 326 km/lần sạc và mức giá cạnh tranh. Đây là lựa chọn hàng đầu cho ai đang tìm <strong>mua xe VF5 trả góp</strong> để kinh doanh hoặc chạy dịch vụ.`,
        ],
      },
      {
        id: "vf5-ngoai-that",
        heading: "Ngoại thất VF5 — nhỏ gọn, linh hoạt trong phố",
        level: 3,
        paragraphs: [
          `Kích thước nhỏ gọn giúp VF5 dễ di chuyển tại các tuyến đường hẹp ở trung tâm Cần Thơ. Đèn LED, cản trước/sau thể thao tạo diện mạo hiện đại, phù hợp hình ảnh thương hiệu <em>XanhSM Cần Thơ</em>.`,
        ],
      },
      {
        id: "vf5-noi-that",
        heading: "Nội thất VF5 — rộng rãi, tiện nghi cho tài xế",
        level: 3,
        paragraphs: [
          `Khoang lái rộng, ghế bọc da, màn hình cảm ứng và không gian hành lý 260 lít. Tài xế chạy dịch vụ cả ngày sẽ đánh giá cao sự thoải mái và tiết kiệm chi phí nhiên liệu so với xe xăng truyền thống.`,
        ],
        image: {
          src: "https://picsum.photos/seed/vinfast-vf5-noi-that-can-tho/1200/630",
          alt: "Nội thất xe VinFast VF5 tại đại lý Cần Thơ GF",
          caption: "VinFast VF5 — nội thất rộng rãi, phù hợp chạy dịch vụ XanhSM",
        },
      },
      {
        id: "uu-dai-mua-vf5-can-tho-gf",
        heading: "Chính sách ưu đãi mua VinFast VF5 tại Hợp tác xã Cần Thơ GF",
        level: 2,
        paragraphs: [
          `Cần Thơ GF cam kết mang đến <strong>xe điện VinFast chất lượng</strong> với giá tối ưu và hỗ trợ tài chính nhanh gọn. Khách hàng cá nhân và doanh nghiệp đều được tư vấn gói phù hợp.`,
        ],
        list: {
          ordered: true,
          items: [
            "Giá VF5 cạnh tranh — liên hệ hotline để nhận báo giá mới nhất",
            "Hỗ trợ vay ngân hàng, trả góp lên đến 85% giá trị xe",
            "Tặng gói bảo dưỡng và phụ kiện chính hãng",
            "Hỗ trợ thủ tục <a href=\"/dang-ky-xanhsm\" class=\"text-primary font-semibold hover:underline\">đăng ký XanhSM</a> cho tài xế",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Mua xe VinFast VF5 ở Cần Thơ được hỗ trợ những gì?",
        answerHtml:
          "Cần Thơ GF hỗ trợ tư vấn chọn màu, báo giá, vay trả góp, đăng ký biển số, bảo hành chính hãng và hướng dẫn vận hành. Liên hệ <strong>0916 513 720</strong> để được tư vấn ngay.",
      },
      {
        question: "XanhSM Cần Thơ có tuyển tài xế chạy VF5 không?",
        answerHtml:
          'Có. XanhSM đang tuyển tài xế tại Cần Thơ và các tỉnh lân cận. Bạn có thể <a href="/dang-ky-xanhsm" class="text-primary font-semibold hover:underline">đăng ký lái XanhSM</a> qua Cần Thơ GF để được hỗ trợ thủ tục và tư vấn xe VF5.',
      },
    ],
    author: EDITOR_AUTHOR,
    conclusionHtml: `<p>Lễ <strong>bàn giao VinFast VF5 Cần Thơ</strong> khẳng định vị thế Cần Thơ GF là đối tác tin cậy trong cung ứng xe điện VinFast. Nếu bạn quan tâm VF5 cho kinh doanh hoặc sử dụng cá nhân, hãy liên hệ ngay để nhận ưu đãi và lịch lái thử.</p>`,
    cta: {
      title: "Đặt xe VinFast VF5 — Ưu đãi tháng 5/2026",
      description:
        "Nhận báo giá VF5, hỗ trợ trả góp và tư vấn chạy XanhSM miễn phí tại Cần Thơ GF.",
      label: "Xem chi tiết VF5",
      href: "/san-pham/vf5",
    },
  },
  {
    id: "huong-dan-sac-pin-xe-dien-vinfast",
    title: "Hướng dẫn sạc pin xe điện VinFast đúng cách — Kéo dài tuổi thọ pin",
    metaTitle: "Sạc pin xe điện đúng cách: Hướng dẫn từ Cần Thơ GF",
    excerpt:
      "Sạc pin xe điện đúng cách giúp kéo dài tuổi thọ pin VinFast, tiết kiệm chi phí bảo dưỡng. Cần Thơ GF chia sẻ 7 lưu ý quan trọng cho tài xế XanhSM và chủ xe điện.",
    image: "https://picsum.photos/seed/huong-dan-sac-pin-xe-dien-vinfast/1200/630",
    imageAlt:
      "Hướng dẫn sạc pin xe điện VinFast đúng cách tại Cần Thơ GF",
    imageCaption:
      "Sạc pin đúng cách — yếu tố then chốt giữ pin VinFast bền lâu",
    date: "05/05/2026",
    category: "knowledge",
    primaryKeyword: "sạc pin xe điện đúng cách",
    keywords: [
      "sạc pin xe điện đúng cách",
      "bảo dưỡng pin vinfast",
      "kéo dài tuổi thọ pin xe điện",
    ],
    sapoHtml: `<p>Pin là "trái tim" của mọi chiếc xe điện. Việc <strong>sạc pin xe điện đúng cách</strong> không chỉ giúp xe vận hành ổn định mà còn kéo dài tuổi thọ pin, tiết kiệm chi phí thay thế về lâu dài. Đội kỹ thuật <em>Cần Thơ GF</em> tổng hợp 7 nguyên tắc vàng dựa trên khuyến nghị VinFast và kinh nghiệm thực tế bảo dưỡng xe tại miền Tây.</p>`,
    sections: [
      {
        id: "tai-sao-sac-pin-dung-cach-quan-trong",
        heading: "Tại sao sạc pin đúng cách quan trọng với xe điện VinFast?",
        level: 2,
        paragraphs: [
          `Pin lithium-ion trên <strong>xe ô tô điện VinFast</strong> có tuổi thọ thiết kế dài, nhưng thói quen sạc sai có thể làm giảm dung lượng sớm. Điều này đặc biệt quan trọng với tài xế <a href="/dang-ky-xanhsm" class="text-primary font-semibold hover:underline">XanhSM</a> sạc xe 1–2 lần mỗi ngày.`,
          `Theo <a href="https://vinfastauto.com" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold hover:underline">VinFast Auto</a>, tuân thủ quy trình sạc chuẩn giúp duy trì hiệu suất pin ổn định trong suốt thời gian bảo hành và cả sau đó.`,
        ],
        list: {
          ordered: false,
          items: [
            "Giảm nguy cơ pin chai, mất dung lượng sớm",
            "Tiết kiệm chi phí sửa chữa, thay pin ngoài bảo hành",
            "Đảm bảo quãng đường di chuyển ổn định cho tài xế chạy dịch vụ",
            "An toàn hơn khi sạc tại nhà hoặc trạm sạc công cộng",
          ],
        },
      },
      {
        id: "7-nguyen-tac-sac-pin",
        heading: "7 nguyên tắc sạc pin xe điện VinFast đúng cách",
        level: 2,
        paragraphs: [
          `Áp dụng các quy tắc dưới đây cho mọi dòng xe VinFast tại Cần Thơ GF — từ <a href="/san-pham/vf5" class="text-primary font-semibold hover:underline">VF5</a>, Herio Green đến Limo Green.`,
        ],
        list: {
          ordered: true,
          items: [
            "<strong>Không để pin cạn dưới 10%</strong> — nên sạc khi pin còn khoảng 20–30%",
            "Hạn chế sạc đến 100% nếu không cần di chuyển xa ngay; mức 80–90% tốt cho tuổi thọ pin",
            "Tránh sạc xe dưới trời nắng gắt — chọn bóng râm hoặc hầm để xe",
            "Không sạc ngay sau hành trình dài — đợi 15–30 phút để pin nguội",
            "Chỉ dùng bộ sạc chính hãng hoặc trạm sạc VinFast được chứng nhận",
            "Cập nhật phần mềm xe định kỳ để tối ưu quản lý pin",
            "Kiểm tra pin định kỳ tại <a href=\"/lien-he\" class=\"text-primary font-semibold hover:underline\">xưởng dịch vụ Cần Thơ GF</a>",
          ],
        },
        image: {
          src: "https://picsum.photos/seed/sac-pin-vinfast-can-tho/1200/630",
          alt: "Tài xế sạc pin xe điện VinFast tại trạm sạc Cần Thơ",
          caption: "Sạc pin ở nơi thoáng mát, dùng thiết bị chính hãng VinFast",
        },
      },
      {
        id: "sac-pin-tai-can-tho-gf",
        heading: "Dịch vụ hỗ trợ sạc pin và bảo dưỡng tại Cần Thơ GF",
        level: 2,
        paragraphs: [
          `Cần Thơ GF cung cấp tư vấn sạc pin, kiểm tra hệ thống điện và bảo dưỡng định kỳ cho mọi dòng <strong>xe điện VinFast</strong>. Khách hàng mua xe tại đại lý được hướng dẫn chi tiết quy trình sạc tại nhà và tại trạm công cộng.`,
          `Đội kỹ thuật sẵn sàng hỗ trợ tài xế XanhSM xử lý các vấn đề về pin, sạc chậm hoặc cảnh báo hệ thống — giúp bạn yên tâm kinh doanh.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Sạc pin VinFast mỗi ngày có hại pin không?",
        answerHtml:
          "Sạc hàng ngày là bình thường với xe điện. Quan trọng là tránh sạc quá đầy (100%) và quá cạn (&lt;10%) thường xuyên. Sạc đến 80–90% là lý tưởng cho sử dụng hàng ngày.",
      },
      {
        question: "Cần Thơ GF có hỗ trợ kiểm tra pin xe điện không?",
        answerHtml:
          'Có. Bạn có thể đặt lịch kiểm tra pin và bảo dưỡng tại showroom qua hotline <strong>0916 513 720</strong> hoặc form <a href="/lien-he" class="text-primary font-semibold hover:underline">liên hệ</a>.',
      },
    ],
    author: TECH_AUTHOR,
    conclusionHtml: `<p>Thực hành <strong>sạc pin xe điện đúng cách</strong> là khoản đầu tư thông minh cho mọi chủ xe VinFast. Hãy áp dụng 7 nguyên tắc trên và liên hệ Cần Thơ GF khi cần hỗ trợ kỹ thuật chuyên sâu.</p>`,
    cta: {
      title: "Đặt lịch kiểm tra pin xe điện VinFast",
      description:
        "Đội kỹ thuật Cần Thơ GF kiểm tra hệ thống pin, sạc và tư vấn bảo dưỡng miễn phí cho khách hàng.",
      label: "Liên hệ kỹ thuật viên",
      href: "/lien-he",
    },
  },
  {
    id: "xanhsm-mo-rong-dong-bang-song-cuu-long",
    title: "XanhSM mở rộng dịch vụ tại Đồng bằng sông Cửu Long — Cơ hội tài xế Cần Thơ",
    metaTitle: "XanhSM mở rộng ĐBSCL: Cơ hội tài xế Cần Thơ",
    excerpt:
      "XanhSM mở rộng taxi điện tại ĐBSCL, tuyển tài xế Cần Thơ chạy xe VinFast. Cần Thơ GF hỗ trợ đăng ký XanhSM, tư vấn xe VF5 và chính sách thu nhập ổn định.",
    image: "https://picsum.photos/seed/xanhsm-mo-rong-dbscl/1200/630",
    imageAlt:
      "Dịch vụ taxi điện XanhSM mở rộng tại Đồng bằng sông Cửu Long",
    imageCaption:
      "XanhSM — taxi thuần điện, mở rộng phủ sóng tại miền Tây Nam Bộ",
    date: "01/05/2026",
    category: "vinfast",
    primaryKeyword: "XanhSM Cần Thơ",
    keywords: [
      "xanhsm đồng bằng sông cửu long",
      "xanhsm cần thơ",
      "taxi điện miền tây",
    ],
    sapoHtml: `<p><strong>XanhSM Cần Thơ</strong> và các tỉnh Đồng bằng sông Cửu Long (ĐBSCL) vừa có thêm tin vui: dịch vụ taxi thuần điện tiếp tục mở rộng vùng phủ sóng, tạo cơ hội việc làm ổn định cho hàng nghìn tài xế. Bạn đang tìm hiểu cách tham gia, thu nhập ra sao và cần xe gì? Bài viết này giải đáp chi tiết cùng hướng dẫn <em>đăng ký XanhSM qua Cần Thơ GF</em>.</p>`,
    sections: [
      {
        id: "xanhsm-mo-rong-dbscl",
        heading: "XanhSM mở rộng ĐBSCL — Bối cảnh và cơ hội",
        level: 2,
        paragraphs: [
          `XanhSM là nền tảng <strong>taxi điện</strong> hàng đầu Việt Nam, vận hành đội xe VinFast thuần điện. Việc mở rộng sang Cần Thơ, An Giang, Kiên Giang và các tỉnh lân cận giúp người dân miền Tây có thêm lựa chọn di chuyển xanh, an toàn.`,
          `Theo thông tin từ <a href="https://www.xanhsm.com" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold hover:underline">XanhSM</a>, nhu cầu đặt xe tại ĐBSCL tăng trưởng mạnh, mở ra nhu cầu tuyển tài xế lớn trong năm 2026.`,
        ],
        list: {
          ordered: false,
          items: [
            "Đặt xe dễ dàng qua ứng dụng XanhSM trên smartphone",
            "Giá cước minh bạch, nhiều khuyến mãi cho hành khách",
            "Xe điện VinFast — êm ái, không khí thải, phù hợp đô thị",
            "Cơ hội thu nhập ổn định cho tài xế đối tác",
          ],
        },
      },
      {
        id: "tai-xe-can-chuan-bi-gi",
        heading: "Tài xế XanhSM cần chuẩn bị gì để bắt đầu?",
        level: 2,
        paragraphs: [
          `Để tham gia <strong>XanhSM Cần Thơ</strong>, tài xế cần đáp ứng yêu cầu về bằng lái, lý lịch và phương tiện. Cần Thơ GF hỗ trợ trọn gói từ tư vấn xe đến thủ tục đăng ký.`,
        ],
      },
      {
        id: "xe-vinfast-cho-xanhsm",
        heading: "Xe VinFast VF5 — lựa chọn phổ biến cho tài xế XanhSM",
        level: 3,
        paragraphs: [
          `Đa số tài xế XanhSM tại Cần Thơ chọn <a href="/san-pham/vf5" class="text-primary font-semibold hover:underline">VinFast VF5</a> nhờ chi phí vận hành thấp, quãng đường 326 km/lần sạc và kích thước phù hợp di chuyển nội thành. Cần Thơ GF hỗ trợ <em>mua xe VF5 trả góp</em> với thủ tục nhanh.`,
        ],
      },
      {
        id: "quy-trinh-dang-ky-xanhsm",
        heading: "Quy trình đăng ký XanhSM qua Cần Thơ GF",
        level: 3,
        paragraphs: [
          `Liên hệ hotline hoặc đến showroom → Tư vấn xe và chính sách → Hoàn thiện hồ sơ tài xế → Bàn giao xe (nếu cần) → Bắt đầu nhận cuốc trên ứng dụng XanhSM.`,
        ],
        image: {
          src: "https://picsum.photos/seed/xanhsm-tai-xe-can-tho/1200/630",
          alt: "Tài xế XanhSM Cần Thơ với xe điện VinFast VF5",
          caption: "Tài xế XanhSM Cần Thơ — thu nhập ổn định cùng xe điện VinFast",
        },
      },
      {
        id: "can-tho-gf-ho-tro-xanhsm",
        heading: "Chính sách hỗ trợ tài xế XanhSM tại Cần Thơ GF",
        level: 2,
        paragraphs: [
          `<strong>Hợp tác xã Cần Thơ GF</strong> là đối tác chiến lược hỗ trợ tài xế XanhSM với nhiều ưu đãi độc quyền:`,
        ],
        list: {
          ordered: true,
          items: [
            "Tư vấn chọn xe VinFast phù hợp ngân sách và nhu cầu chạy dịch vụ",
            "Hỗ trợ vay trả góp, giảm áp lực vốn ban đầu",
            "Hướng dẫn sạc pin, bảo dưỡng xe điện đúng cách",
            "Hỗ trợ thủ tục hành chính đăng ký tài xế XanhSM",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "XanhSM Cần Thơ có tuyển tài xế chạy VF5 không?",
        answerHtml:
          'Có. XanhSM đang tuyển tài xế tại Cần Thơ và ĐBSCL. <a href="/dang-ky-xanhsm" class="text-primary font-semibold hover:underline">Đăng ký XanhSM</a> qua Cần Thơ GF để được hỗ trợ nhanh nhất.',
      },
      {
        question: "Thu nhập tài xế XanhSM Cần Thơ khoảng bao nhiêu?",
        answerHtml:
          "Thu nhập phụ thuộc số giờ chạy và khu vực. Tài xế chăm chỉ tại Cần Thơ thường đạt mức ổn định, cao hơn so với nhiều nghề tự do. Liên hệ Cần Thơ GF để được tư vấn chi tiết theo khu vực của bạn.",
      },
    ],
    author: EDITOR_AUTHOR,
    conclusionHtml: `<p>Việc <strong>XanhSM mở rộng ĐBSCL</strong> mở ra cơ hội nghề nghiệp hấp dẫn cho người lao động Cần Thơ. Hãy liên hệ Cần Thơ GF ngay hôm nay để được tư vấn xe, chính sách và hỗ trợ đăng ký tài xế.</p>`,
    cta: {
      title: "Đăng ký lái XanhSM Cần Thơ ngay",
      description:
        "Cần Thơ GF hỗ trợ thủ tục, tư vấn xe VinFast VF5 và chính sách dành cho tài xế mới.",
      label: "Đăng ký XanhSM",
      href: "/dang-ky-xanhsm",
    },
  },
  {
    id: "lai-thu-vinfast-can-tho-gf",
    title: "Ngày hội lái thử xe điện VinFast tại Cần Thơ — Trải nghiệm thực tế",
    metaTitle: "Lái thử VinFast Cần Thơ: Ngày hội xe điện hấp dẫn",
    excerpt:
      "Ngày hội lái thử VinFast tại Cần Thơ GF thu hút hàng trăm khách. Trải nghiệm VF5, Herio Green, nhận ưu đãi mua xe và đăng ký XanhSM — hotline 0916 513 720.",
    image: "https://picsum.photos/seed/lai-thu-vinfast-can-tho-gf/1200/630",
    imageAlt:
      "Ngày hội lái thử xe điện VinFast tại showroom Cần Thơ GF",
    imageCaption:
      "Khách hàng trải nghiệm lái thử xe điện VinFast tại ngày hội Cần Thơ GF",
    date: "28/04/2026",
    category: "cantho",
    primaryKeyword: "lái thử VinFast Cần Thơ",
    keywords: [
      "lái thử vinfast cần thơ",
      "ngày hội xe điện cần thơ",
      "sự kiện cần thơ gf",
    ],
    sapoHtml: `<p>Cuối tuần qua, sự kiện <strong>lái thử VinFast Cần Thơ</strong> do Hợp tác xã Cần Thơ GF tổ chức đã thu hút hàng trăm lượt đăng ký. Khách hàng được trải nghiệm trực tiếp các mẫu <em>xe điện VinFast</em> hot nhất, tìm hiểu chính sách mua xe và cơ hội chạy XanhSM. Nếu bạn bỏ lỡ sự kiện, đừng lo — bài viết tổng hợp điểm nổi bật và cách đăng ký lái thử tiếp theo.</p>`,
    sections: [
      {
        id: "ngay-hoi-lai-thu-capt-moc",
        heading: "Ngày hội lái thử VinFast Cần Thơ — Điểm nổi bật",
        level: 2,
        paragraphs: [
          `Sự kiện diễn ra tại showroom Cần Thơ GF với quy mô lớn, nhiều mẫu xe trưng bày và khu vực lái thử riêng biệt. Khách hàng từ Cần Thơ và các tỉnh lân cận đều có mặt để cảm nhận sự khác biệt của <strong>xe ô tô điện</strong> so với xe xăng.`,
        ],
        list: {
          ordered: false,
          items: [
            "Lái thử miễn phí VF5, Herio Green và các mẫu xe mới",
            "Tư vấn trả góp, ưu đãi mua xe trong tháng 4–5/2026",
            "Giới thiệu chương trình tài xế XanhSM Cần Thơ",
            "Quà tặng và mini game dành cho khách tham dự",
          ],
        },
      },
      {
        id: "danh-gia-trai-nghiem-lai-thu",
        heading: "Đánh giá trải nghiệm lái thử từ khách hàng Cần Thơ",
        level: 2,
        paragraphs: [
          `Phản hồi tích cực tập trung vào độ êm ái, tăng tốc mượt và chi phí vận hành thấp. Nhiều khách hàng ấn tượng với <a href="/san-pham/vf5" class="text-primary font-semibold hover:underline">VinFast VF5</a> — mẫu xe điện cỡ A phù hợp gia đình và chạy dịch vụ.`,
        ],
      },
      {
        id: "vf5-tai-ngay-hoi",
        heading: "VinFast VF5 — mẫu xe được quan tâm nhất",
        level: 3,
        paragraphs: [
          `VF5 ghi điểm với thiết kế trẻ trung, nội thất rộng và mức giá 529 triệu đồng. Khách lái thử đánh giá cao hệ thống an toàn và màn hình giải trí thông minh so với xe cùng phân khúc.`,
        ],
      },
      {
        id: "herio-green-tai-ngay-hoi",
        heading: "Herio Green — lựa chọn xe dịch vụ thời đại xanh",
        level: 3,
        paragraphs: [
          `<a href="/san-pham/herio-green" class="text-primary font-semibold hover:underline">Herio Green</a> thu hút tài xế quan tâm chạy XanhSM nhờ quãng đường 326 km và giá từ 479 triệu. Đây là mẫu <strong>xe điện thông minh</strong> tối ưu cho kinh doanh vận tải.`,
        ],
        image: {
          src: "https://picsum.photos/seed/ngay-hoi-lai-thu-vinfast/1200/630",
          alt: "Khách hàng lái thử xe VinFast VF5 tại Cần Thơ GF",
          caption: "Trải nghiệm lái thử VF5 — bước đầu tiên trước khi quyết định mua xe",
        },
      },
      {
        id: "uu-dai-sau-ngay-hoi",
        heading: "Ưu đãi và chính sách sau ngày hội lái thử",
        level: 2,
        paragraphs: [
          `Khách hàng đăng ký mua xe trong 30 ngày sau sự kiện vẫn được áp dụng một số ưu đãi đặc biệt từ <strong>Cần Thơ GF</strong>:`,
        ],
        list: {
          ordered: true,
          items: [
            "Giảm giá trực tiếp và tặng phụ kiện chính hãng",
            "Hỗ trợ vay trả góp lãi suất ưu đãi",
            "Miễn phí đăng ký biển số và tư vấn bảo hiểm",
            "Hỗ trợ thủ tục <a href=\"/dang-ky-xanhsm\" class=\"text-primary font-semibold hover:underline\">đăng ký XanhSM</a> nếu có nhu cầu",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Lái thử VinFast ở Cần Thơ cần đăng ký trước không?",
        answerHtml:
          'Nên đăng ký trước qua hotline <strong>0916 513 720</strong> hoặc form <a href="/lien-he" class="text-primary font-semibold hover:underline">liên hệ</a> để được sắp lịch và chuẩn bị xe phù hợp.',
      },
      {
        question: "Ngày hội lái thử VinFast có tổ chức lại không?",
        answerHtml:
          "Cần Thơ GF tổ chức ngày hội lái thử định kỳ hàng quý. Theo dõi trang tin tức hoặc liên hệ hotline để nhận thông báo sự kiện tiếp theo.",
      },
    ],
    author: EDITOR_AUTHOR,
    conclusionHtml: `<p>Sự kiện <strong>lái thử VinFast Cần Thơ</strong> giúp khách hàng có cái nhìn thực tế trước khi đầu tư xe điện. Dù bỏ lỡ ngày hội, bạn vẫn có thể đăng ký lái thử riêng bất cứ lúc nào tại Cần Thơ GF.</p>`,
    cta: {
      title: "Đăng ký lái thử xe điện VinFast",
      description:
        "Trải nghiệm VF5, Herio Green miễn phí tại showroom Cần Thơ GF — không cần chờ ngày hội.",
      label: "Đăng ký lái thử ngay",
      href: "/lien-he",
    },
  },
  {
    id: "so-sanh-chi-phi-xe-dien-va-xe-xang",
    title: "So sánh chi phí xe điện và xe xăng: Đâu là lựa chọn tối ưu năm 2026?",
    metaTitle: "Xe điện hay xe xăng: So sánh chi phí vận hành 2026",
    excerpt:
      "So sánh chi phí vận hành xe điện VinFast và xe xăng: nhiên liệu, bảo dưỡng, khấu hao. Cần Thơ GF phân tích chi tiết giúp bạn chọn xe phù hợp ngân sách.",
    image: "https://picsum.photos/seed/so-sanh-chi-phi-xe-dien-xe-xang/1200/630",
    imageAlt:
      "So sánh chi phí vận hành xe điện VinFast và xe xăng tại Cần Thơ",
    imageCaption:
      "Xe điện VinFast — tiết kiệm chi phí vận hành so với xe xăng truyền thống",
    date: "20/04/2026",
    category: "knowledge",
    primaryKeyword: "chi phí vận hành xe điện",
    keywords: [
      "chi phí vận hành xe điện",
      "so sánh xe điện và xe xăng",
      "kinh tế xe điện vinfast",
    ],
    sapoHtml: `<p>Nhiều khách hàng Cần Thơ đặt câu hỏi: mua <strong>xe điện VinFast</strong> có thực sự tiết kiệm hơn xe xăng? <em>Chi phí vận hành xe điện</em> gồm những khoản nào và hoàn vốn sau bao lâu? Bài viết phân tích chi tiết từng hạng mục — nhiên liệu, bảo dưỡng, bảo hiểm, khấu hao — giúp bạn đưa ra quyết định mua xe sáng suốt nhất năm 2026.</p>`,
    sections: [
      {
        id: "tong-quan-so-sanh",
        heading: "Tổng quan: Xe điện VinFast vs xe xăng — Bảng so sánh nhanh",
        level: 2,
        paragraphs: [
          `Nhìn chung, <strong>chi phí vận hành xe điện</strong> thấp hơn xe xăng từ 30–50% mỗi 100 km, tùy mức giá điện và xăng tại từng thời điểm. VinFast còn có chính sách bảo hành pin dài hạn, giảm rủi ro chi phí lớn.`,
        ],
        list: {
          ordered: false,
          items: [
            "<strong>Nhiên liệu/điện:</strong> Xe điện ~40.000–60.000đ/100km vs xe xăng ~150.000–200.000đ/100km",
            "<strong>Bảo dưỡng:</strong> Xe điện không cần thay dầu, bugi, lọc gió động cơ",
            "<strong>Phí đường bộ, bảo hiểm:</strong> Tương đương, xe điện có thể được ưu đãi theo chính sách địa phương",
            "<strong>Giá mua:</strong> Xe điện VinFast cạnh tranh, hỗ trợ trả góp tại <a href=\"/san-pham\" class=\"text-primary font-semibold hover:underline\">Cần Thơ GF</a>",
          ],
        },
      },
      {
        id: "chi-phi-nhien-lieu-dien",
        heading: "Chi phí nạp điện so với đổ xăng — Phân tích chi tiết",
        level: 2,
        paragraphs: [
          `Với <a href="/san-pham/vf5" class="text-primary font-semibold hover:underline">VinFast VF5</a> tiêu thụ khoảng 15–18 kWh/100km, chi phí sạc tại nhà (giá điện sinh hoạt) chỉ bằng 1/3 đến 1/2 chi phí xăng cho cùng quãng đường. Tài xế XanhSM chạy 200–300 km/ngày tiết kiệm được hàng triệu đồng mỗi tháng.`,
          `Sạc tại trạm công cộng có thể đắt hơn sạc tại nhà, nhưng vẫn cạnh tranh so với xăng. Tham khảo bảng giá sạc trên <a href="https://vinfastauto.com" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold hover:underline">VinFast Auto</a> để lập kế hoạch chi phí.`,
        ],
        image: {
          src: "https://picsum.photos/seed/chi-phi-xe-dien-vinfast/1200/630",
          alt: "Biểu đồ so sánh chi phí nạp điện và đổ xăng cho xe VinFast",
          caption: "Chi phí nạp điện thấp hơn đáng kể so với nhiên liệu xăng truyền thống",
        },
      },
      {
        id: "chi-phi-bao-duong",
        heading: "Chi phí bảo dưỡng — Lợi thế của xe điện VinFast",
        level: 2,
        paragraphs: [
          `Xe điện loại bỏ hầu hết chi phí bảo dưỡng động cơ đốt trong: không thay dầu nhớt, bugi, dây curoa, lọc nhiên liệu. Bảo dưỡng định kỳ tập trung vào hệ thống treo, phanh và kiểm tra pin.`,
        ],
      },
      {
        id: "bao-duong-xe-dien",
        heading: "Bảo dưỡng xe điện — Những hạng mục cần lưu ý",
        level: 3,
        paragraphs: [
          `Theo khuyến nghị VinFast, bảo dưỡng định kỳ 10.000–20.000 km bao gồm kiểm tra phanh, lốp, hệ thống làm mát pin và cập nhật phần mềm. Chi phí trung bình thấp hơn 40–60% so với xe xăng cùng phân khúc.`,
        ],
      },
      {
        id: "hoan-von-xe-dien",
        heading: "Thời gian hoàn vốn khi chuyển sang xe điện",
        level: 3,
        paragraphs: [
          `Với tài xế chạy dịch vụ 250 km/ngày, khoản tiết kiệm nhiên liệu có thể bù đắp chênh lệch giá mua sau 2–3 năm. Khách mua xe gia đình sử dụng 50 km/ngày hoàn vốn chậm hơn nhưng vẫn hưởng lợi về môi trường và trải nghiệm lái.`,
        ],
      },
      {
        id: "mua-xe-dien-can-tho-gf",
        heading: "Mua xe điện VinFast tại Cần Thơ GF — Tối ưu chi phí đầu tư",
        level: 2,
        paragraphs: [
          `<strong>Cần Thơ GF</strong> tư vấn chọn mẫu xe phù hợp nhu cầu và ngân sách — từ VF5 cho cá nhân đến Limo Green cho vận tải. Hỗ trợ trả góp giúp giảm áp lực vốn ban đầu, trong khi chi phí vận hành thấp tạo lợi thế dài hạn.`,
        ],
        list: {
          ordered: true,
          items: [
            "Tư vấn miễn phí mẫu xe phù hợp mục đích sử dụng",
            "Hỗ trợ vay trả góp — <em>mua xe VinFast trả góp</em> dễ dàng",
            "Hướng dẫn sạc pin tối ưu chi phí điện",
            "Hỗ trợ đăng ký XanhSM cho tài xế muốn tăng thu nhập",
          ],
        },
      },
    ],
    faqs: [
      {
        question: "Xe điện VinFast có đắt hơn xe xăng khi mua mới không?",
        answerHtml:
          "Giá mua ban đầu có thể cao hơn một số xe xăng cùng phân khúc, nhưng chi phí vận hành thấp hơn đáng kể giúp tiết kiệm về dài hạn. Liên hệ Cần Thơ GF để nhận báo giá và tính toán cụ thể.",
      },
      {
        question: "Tài xế XanhSM dùng xe điện có lời hơn xe xăng không?",
        answerHtml:
          'Thường có lợi hơn nhờ tiết kiệm nhiên liệu 30–50%. <a href="/dang-ky-xanhsm" class="text-primary font-semibold hover:underline">Đăng ký XanhSM</a> qua Cần Thơ GF để được tư vấn chi tiết về thu nhập và chi phí.',
      },
    ],
    author: EDITOR_AUTHOR,
    conclusionHtml: `<p><strong>Chi phí vận hành xe điện</strong> thấp hơn xe xăng là lợi thế rõ rệt, đặc biệt với người dùng thường xuyên. Hãy liên hệ Cần Thơ GF để được tư vấn mẫu xe VinFast phù hợp và tính toán chi phí cụ thể cho nhu cầu của bạn.</p>`,
    cta: {
      title: "Tư vấn mua xe điện VinFast — Tiết kiệm chi phí dài hạn",
      description:
        "Cần Thơ GF giúp bạn chọn xe phù hợp, hỗ trợ trả góp và tính toán chi phí vận hành thực tế.",
      label: "Xem danh mục xe VinFast",
      href: "/san-pham",
    },
  },
];

/** Alias — dùng NEWS_ARTICLES làm nguồn chính */
export const NEWS_SEO = NEWS_ARTICLES;

export const NEWS_BY_ID = Object.fromEntries(
  NEWS_ARTICLES.map((n) => [n.id, n]),
) as Record<string, NewsArticle>;

export function getNewsById(id: string): NewsArticle | undefined {
  return NEWS_BY_ID[id];
}

export function getNewsArticleKeywords(article: NewsArticle): string[] {
  return article.keywords?.length
    ? [...article.keywords]
    : [...NEWS_ARTICLE_FALLBACK_KEYWORDS];
}

export function getNewsCategoryLabel(category: NewsCategory): string {
  return NEWS_CATEGORY_LABELS[category];
}

/** Lấy danh sách bài viết, có thể lọc theo category */
export function getNewsArticles(category?: NewsCategory): NewsArticle[] {
  if (!category) return [...NEWS_ARTICLES];
  return NEWS_ARTICLES.filter((a) => a.category === category);
}

/** Plain text từ HTML — dùng cho FAQ Schema */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
