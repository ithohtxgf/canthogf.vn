import type { XanhSmFaqItem } from "@/lib/content/xanhsm-page";

export const XANHSM_PARTNER_HUB_PATH = "/dang-ky-xanhsm-partner";

export type PartnerCity = {
  slug: string;
  /** Tên đầy đủ, dùng trong văn bản */
  name: string;
  /** Tên ngắn, dùng trong H1/title */
  displayName: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  localNote: string;
  faq: XanhSmFaqItem[];
};

export const XANHSM_PARTNER_CITIES: PartnerCity[] = [
  {
    slug: "tphcm",
    name: "Thành phố Hồ Chí Minh",
    displayName: "TPHCM",
    region: "Đông Nam Bộ",
    metaTitle:
      "Đăng Ký Xanh SM Partner TPHCM 2026 – Hướng Dẫn Chủ Xe VinFast | Cần Thơ GF",
    metaDescription:
      "Chủ xe VinFast tại TPHCM muốn đăng ký Xanh SM Partner và Grab? Cần Thơ GF hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí toàn quốc.",
    keywords: [
      "đăng ký xanh sm partner tphcm",
      "xanh sm partner tphcm",
      "đăng ký đối tác xanh sm sài gòn",
      "chủ xe vinfast chạy xanh sm tphcm",
      "đăng ký grab bằng xe vinfast tphcm",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại TPHCM – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Bạn đang sở hữu xe điện VinFast tại TPHCM và muốn đăng ký làm Đối tác (Partner) cho Xanh SM hoặc Grab? Với mật độ giao chuyến rất cao ở khu vực nội thành và các quận lân cận, TPHCM là thị trường Xanh SM Partner sôi động nhất cả nước. Cần Thơ GF hỗ trợ tư vấn từ xa qua Zalo/hotline, giúp bạn chuẩn bị hồ sơ đúng chuẩn ngay lần đầu để rút ngắn thời gian kích hoạt app.",
    localNote:
      "Xe VinFast chạy dịch vụ tại TPHCM cần lưu ý khu vực đăng ký hộ khẩu/tạm trú trùng khớp với hồ sơ khi nộp app để tránh bị từ chối duyệt.",
    faq: [
      {
        question: "Tôi ở TPHCM, có cần đến tận Cần Thơ để đăng ký Xanh SM Partner không?",
        answer:
          "Không cần. Cần Thơ GF hỗ trợ tư vấn và hướng dẫn hoàn toàn qua Zalo/điện thoại, bạn gửi hồ sơ scan/chụp ảnh là được xử lý từ xa.",
      },
      {
        question: "Xe VinFast mua ở tỉnh khác có đăng ký Partner tại TPHCM được không?",
        answer:
          "Được, miễn cà vẹt xe (giấy đăng ký xe) còn hiệu lực và chính chủ hoặc có ủy quyền hợp lệ. Khu vực hoạt động sẽ khai theo nơi bạn dự định chạy.",
      },
      {
        question: "Chạy Xanh SM Partner tại TPHCM thu nhập trung bình bao nhiêu mỗi tháng?",
        answer:
          "Tùy khung giờ và khu vực hoạt động, tài xế Partner tại TPHCM có thể đạt 15–30 triệu đồng/tháng nhờ mật độ chuyến cao, đặc biệt khung giờ cao điểm và khu vực trung tâm, sân bay. Thu nhập thực tế phụ thuộc thời gian chạy và chính sách chiết khấu hiện hành.",
      },
      {
        question: "Xe VinFast đã qua sử dụng có đăng ký Xanh SM Partner tại TPHCM được không?",
        answer:
          "Được, miễn xe còn trong hạn đăng kiểm và cà vẹt chính chủ hoặc có ủy quyền hợp lệ. Xanh SM không giới hạn năm sản xuất khi đăng ký Partner cho xe điện VinFast.",
      },
      {
        question: "Có thể vừa chạy Xanh SM Partner vừa chạy Grab tại TPHCM không?",
        answer:
          "Có. Nhiều chủ xe tại TPHCM đăng ký song song cả hai nền tảng để tối ưu số chuyến, miễn tuân thủ quy định riêng của từng app về thời gian và khu vực hoạt động.",
      },
    ],
  },
  {
    slug: "vung-tau",
    name: "Bà Rịa – Vũng Tàu",
    displayName: "Vũng Tàu",
    region: "Đông Nam Bộ",
    metaTitle:
      "Đăng Ký Xanh SM Partner Vũng Tàu 2026 – Hướng Dẫn Chủ Xe VinFast | Cần Thơ GF",
    metaDescription:
      "Chủ xe VinFast tại Vũng Tàu muốn đăng ký Xanh SM Partner, Grab? Cần Thơ GF hướng dẫn thủ tục, hồ sơ chi tiết, hỗ trợ tư vấn online miễn phí.",
    keywords: [
      "đăng ký xanh sm partner vũng tàu",
      "xanh sm partner vũng tàu",
      "đăng ký đối tác xanh sm bà rịa vũng tàu",
      "chủ xe vinfast chạy xanh sm vũng tàu",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Vũng Tàu – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Vũng Tàu là điểm đến du lịch quanh năm với lượng khách di chuyển bằng xe công nghệ lớn, đặc biệt vào cuối tuần và mùa hè. Nếu bạn có sẵn xe điện VinFast và muốn tận dụng nhu cầu này để chạy Xanh SM Partner hoặc Grab, Cần Thơ GF sẽ hướng dẫn bạn hoàn tất thủ tục đăng ký app từ xa, không cần di chuyển.",
    localNote:
      "Khu vực trung tâm thành phố và các tuyến ven biển thường có mật độ khách đặt xe cao vào cuối tuần — nên khai đúng khu vực hoạt động khi đăng ký để hệ thống phân bổ chuyến phù hợp.",
    faq: [
      {
        question: "Đăng ký Xanh SM Partner ở Vũng Tàu có khác TPHCM không?",
        answer:
          "Thủ tục và hồ sơ cần chuẩn bị giống nhau trên toàn quốc. Điểm khác chỉ là khu vực hoạt động bạn khai báo khi đăng ký app.",
      },
      {
        question: "Chạy Xanh SM Partner ở Vũng Tàu có phù hợp chạy khách du lịch không?",
        answer:
          "Có. Nhiều đối tác chọn Vũng Tàu vì lượng khách du lịch ổn định, đặc biệt các dịp lễ Tết và cuối tuần, giúp tăng thu nhập theo mùa.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Vũng Tàu vào mùa du lịch cao điểm ra sao?",
        answer:
          "Vào mùa hè và các dịp lễ Tết, nhu cầu đặt xe tại Vũng Tàu tăng mạnh, tài xế Partner có thể đạt 18–25 triệu đồng/tháng nhờ mật độ khách du lịch cao, đặc biệt khu vực Bãi Sau, Bãi Trước.",
      },
      {
        question: "Xe VinFast mua tại TPHCM có đăng ký Partner chạy ở Vũng Tàu được không?",
        answer:
          "Được, không yêu cầu xe phải mua tại Vũng Tàu. Bạn chỉ cần khai đúng khu vực hoạt động dự kiến khi đăng ký app.",
      },
      {
        question: "Chạy Xanh SM Partner ở Vũng Tàu có bị giới hạn khu vực hoạt động không?",
        answer:
          "Bạn khai báo khu vực hoạt động khi đăng ký, hệ thống sẽ ưu tiên phân bổ chuyến trong khu vực đó nhưng vẫn có thể nhận chuyến liên khu vực khi có nhu cầu.",
      },
    ],
  },
  {
    slug: "phu-quoc",
    name: "Phú Quốc",
    displayName: "Phú Quốc",
    region: "Đồng bằng sông Cửu Long",
    metaTitle:
      "Đăng Ký Xanh SM Partner Phú Quốc 2026 – Hướng Dẫn Chủ Xe VinFast | Cần Thơ GF",
    metaDescription:
      "Chủ xe VinFast tại Phú Quốc muốn đăng ký Xanh SM Partner? Cần Thơ GF hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí toàn quốc.",
    keywords: [
      "đăng ký xanh sm partner phú quốc",
      "xanh sm partner phú quốc",
      "đăng ký đối tác xanh sm phú quốc",
      "chủ xe vinfast chạy xanh sm phú quốc",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Phú Quốc – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Phú Quốc là đảo du lịch với lượng khách quốc tế và nội địa lớn quanh năm, nhu cầu di chuyển bằng xe điện ngày càng tăng nhờ hình ảnh xanh, sạch phù hợp định hướng du lịch bền vững của đảo. Nếu bạn có xe điện VinFast tại Phú Quốc, Cần Thơ GF hỗ trợ hướng dẫn đăng ký Xanh SM Partner từ xa qua Zalo/hotline.",
    localNote:
      "Vì là địa bàn đảo, một số giấy tờ (như lý lịch tư pháp, xác nhận cư trú) có thể mất thời gian xử lý lâu hơn đất liền — nên chuẩn bị hồ sơ sớm để không ảnh hưởng tiến độ kích hoạt app.",
    faq: [
      {
        question: "Ở đảo Phú Quốc có đăng ký Xanh SM Partner từ xa được không?",
        answer:
          "Được. Bạn chỉ cần gửi hồ sơ scan/chụp ảnh qua Zalo, Cần Thơ GF hướng dẫn và theo dõi tiến độ hộ bạn, không cần di chuyển vào đất liền.",
      },
      {
        question: "Xe VinFast chạy Xanh SM Partner ở Phú Quốc có phù hợp chở khách du lịch không?",
        answer:
          "Rất phù hợp. Nhiều đối tác tại Phú Quốc chọn chạy khung giờ cao điểm đón/trả sân bay và khu du lịch để tối ưu thu nhập.",
      },
      {
        question: "Chi phí vận chuyển xe ra đảo Phú Quốc để đăng ký Partner có tốn kém không?",
        answer:
          "Nếu xe đã có sẵn tại Phú Quốc thì không phát sinh chi phí này. Trường hợp mua xe từ đất liền, bạn cần tính thêm phí vận chuyển qua phà hoặc cảng — Cần Thơ GF có thể tư vấn phương án tối ưu chi phí.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Phú Quốc có ổn định quanh năm không?",
        answer:
          "Phú Quốc có lượng khách du lịch quanh năm nên nhu cầu tương đối ổn định, cao điểm nhất vào mùa khô (tháng 11–4) và các kỳ nghỉ lễ. Tài xế có thể đạt 15–22 triệu đồng/tháng tùy khung giờ chạy.",
      },
      {
        question: "Xe điện VinFast có gặp khó khăn gì khi chạy trên đảo Phú Quốc không?",
        answer:
          "Không. Hạ tầng trạm sạc VinFast tại Phú Quốc đã phủ các khu vực trung tâm và điểm du lịch chính, đủ đáp ứng nhu cầu sạc hàng ngày của tài xế Partner.",
      },
    ],
  },
  {
    slug: "tay-ninh",
    name: "Tây Ninh",
    displayName: "Tây Ninh",
    region: "Đông Nam Bộ",
    metaTitle:
      "Đăng Ký Xanh SM Partner Tây Ninh 2026 – Hướng Dẫn Chủ Xe VinFast | Cần Thơ GF",
    metaDescription:
      "Chủ xe VinFast tại Tây Ninh muốn đăng ký Xanh SM Partner, Grab? Cần Thơ GF hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí.",
    keywords: [
      "đăng ký xanh sm partner tây ninh",
      "xanh sm partner tây ninh",
      "đăng ký đối tác xanh sm tây ninh",
      "chủ xe vinfast chạy xanh sm tây ninh",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Tây Ninh – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Tây Ninh có lượng khách hành hương và du lịch tâm linh lớn quanh khu vực núi Bà Đen quanh năm, tạo nhu cầu di chuyển ổn định cho xe công nghệ. Nếu bạn có xe điện VinFast tại Tây Ninh, Cần Thơ GF hướng dẫn đăng ký Xanh SM Partner từ xa, không mất phí.",
    localNote:
      "Khu vực gần núi Bà Đen và trung tâm thành phố thường có nhu cầu đặt xe cao vào cuối tuần, lễ hội — nên cân nhắc khi khai báo khu vực hoạt động.",
    faq: [
      {
        question: "Xanh SM đã hoạt động tại Tây Ninh chưa?",
        answer:
          "Xanh SM đang tiếp tục mở rộng phạm vi hoạt động qua nhiều tỉnh thành. Liên hệ Cần Thơ GF để được cập nhật tình trạng phủ sóng mới nhất tại khu vực bạn ở trước khi nộp hồ sơ.",
      },
      {
        question: "Đăng ký Partner tại Tây Ninh cần chuẩn bị gì khác so với các tỉnh khác?",
        answer:
          "Hồ sơ cơ bản giống nhau trên toàn quốc (CCCD, cavet xe, GPLX...). Cần Thơ GF sẽ hỗ trợ kiểm tra hồ sơ trước khi nộp để tránh sai sót.",
      },
      {
        question: "Xanh SM Partner tại Tây Ninh có phù hợp chạy khách hành hương núi Bà Đen không?",
        answer:
          "Rất phù hợp. Lượng khách hành hương và du lịch tâm linh quanh núi Bà Đen tạo nhu cầu di chuyển ổn định quanh năm, đặc biệt cao điểm vào các dịp lễ, rằm lớn và Tết Nguyên Đán.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Tây Ninh khoảng bao nhiêu?",
        answer:
          "Tùy khung giờ và khu vực hoạt động, tài xế Partner tại Tây Ninh có thể đạt 10–18 triệu đồng/tháng, tăng cao vào mùa lễ hội quanh khu vực núi Bà Đen và trung tâm thành phố.",
      },
      {
        question: "Xe VinFast tại Tây Ninh có cần đăng kiểm riêng để chạy Xanh SM Partner không?",
        answer:
          "Không cần đăng kiểm riêng cho việc chạy Partner — chỉ cần xe còn hạn đăng kiểm thông thường và giấy tờ đầy đủ theo quy định hiện hành.",
      },
    ],
  },
  {
    slug: "long-an",
    name: "Long An",
    displayName: "Long An",
    region: "Đồng bằng sông Cửu Long",
    metaTitle:
      "Đăng Ký Xanh SM Partner Long An 2026 – Hướng Dẫn Chủ Xe VinFast | Cần Thơ GF",
    metaDescription:
      "Chủ xe VinFast tại Long An muốn đăng ký Xanh SM Partner, Grab? Cần Thơ GF hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí toàn quốc.",
    keywords: [
      "đăng ký xanh sm partner long an",
      "xanh sm partner long an",
      "đăng ký đối tác xanh sm long an",
      "chủ xe vinfast chạy xanh sm long an",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Long An – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Long An là cửa ngõ giữa TPHCM và miền Tây, nhiều tài xế chọn chạy Xanh SM Partner kết hợp cả tuyến nội tỉnh lẫn các chuyến liên tỉnh về TPHCM. Nếu bạn có xe điện VinFast tại Long An, Cần Thơ GF hướng dẫn đăng ký app Partner từ xa qua Zalo/hotline.",
    localNote:
      "Khu vực giáp ranh TPHCM (như Bến Lức, Đức Hòa) thường có mật độ chuyến cao hơn các huyện xa trung tâm — nên cân nhắc khu vực đăng ký hoạt động phù hợp.",
    faq: [
      {
        question: "Ở Long An có thể vừa chạy nội tỉnh vừa chạy sang TPHCM không?",
        answer:
          "Được, tùy khu vực hoạt động bạn khai báo khi đăng ký app. Cần Thơ GF tư vấn khu vực phù hợp với nhu cầu chạy chuyến của bạn.",
      },
      {
        question: "Thủ tục đăng ký Xanh SM Partner tại Long An mất bao lâu?",
        answer:
          "Thông thường 3–7 ngày làm việc sau khi nộp đủ hồ sơ hợp lệ. Cần Thơ GF hỗ trợ theo dõi tiến độ giúp bạn.",
      },
      {
        question: "Đăng ký Xanh SM Partner tại Long An có thể chạy chuyến sang TPHCM không?",
        answer:
          "Có, đặc biệt các khu vực giáp ranh như Bến Lức, Đức Hòa. Bạn cần khai báo khu vực hoạt động phù hợp khi đăng ký để hệ thống phân bổ chuyến liên tỉnh hợp lý.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Long An so với TPHCM có chênh lệch nhiều không?",
        answer:
          "Khu vực giáp TPHCM như Bến Lức, Đức Hòa có mật độ chuyến gần tương đương vùng ven TPHCM, thu nhập trung bình 12–20 triệu đồng/tháng. Các huyện xa trung tâm thường thấp hơn do mật độ đặt xe ít hơn.",
      },
      {
        question: "Xe VinFast mua trả góp có đăng ký Xanh SM Partner tại Long An được không?",
        answer:
          "Được, miễn cà vẹt xe đứng tên bạn hoặc có giấy ủy quyền hợp lệ từ ngân hàng/công ty tài chính đang cho vay, không yêu cầu tất toán nợ trước khi đăng ký.",
      },
    ],
  },
  {
    slug: "tien-giang",
    name: "Tiền Giang",
    displayName: "Tiền Giang",
    region: "Đồng bằng sông Cửu Long",
    metaTitle:
      "Đăng Ký Xanh SM Partner Tiền Giang 2026 – Hướng Dẫn Chủ Xe VinFast | Cần Thơ GF",
    metaDescription:
      "Chủ xe VinFast tại Tiền Giang muốn đăng ký Xanh SM Partner, Grab? Cần Thơ GF hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí.",
    keywords: [
      "đăng ký xanh sm partner tiền giang",
      "xanh sm partner tiền giang",
      "đăng ký đối tác xanh sm tiền giang",
      "chủ xe vinfast chạy xanh sm tiền giang",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Tiền Giang – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Tiền Giang nằm trên trục Quốc lộ 1A nối TPHCM với các tỉnh miền Tây, lượng khách di chuyển và du lịch miệt vườn quanh năm khá ổn định. Nếu bạn có xe điện VinFast tại Tiền Giang và muốn đăng ký Xanh SM Partner, Cần Thơ GF — đơn vị hoạt động tại khu vực Đồng bằng sông Cửu Long — sẽ hướng dẫn bạn hoàn tất thủ tục từ xa.",
    localNote:
      "Khu vực TP Mỹ Tho và các trục quốc lộ chính thường có nhu cầu đặt xe ổn định hơn các xã vùng sâu — nên khai đúng khu vực hoạt động khi đăng ký.",
    faq: [
      {
        question: "Cần Thơ GF có hỗ trợ trực tiếp tại Tiền Giang không?",
        answer:
          "Cần Thơ GF hỗ trợ tư vấn và xử lý hồ sơ từ xa qua Zalo/hotline cho tài xế tại Tiền Giang, không yêu cầu bạn phải đến văn phòng tại Cần Thơ.",
      },
      {
        question: "Tôi cần chuẩn bị gì trước khi liên hệ đăng ký?",
        answer:
          "Chuẩn bị CCCD, cavet xe, giấy phép lái xe (2 mặt) và số điện thoại/email chưa từng đăng ký app để quá trình xử lý nhanh hơn.",
      },
      {
        question: "Xanh SM đã phủ sóng đầy đủ khu vực Tiền Giang chưa?",
        answer:
          "Xanh SM đang tiếp tục mở rộng vùng phủ sóng. Liên hệ Cần Thơ GF để được cập nhật tình trạng phủ sóng mới nhất tại khu vực bạn dự định chạy trước khi nộp hồ sơ.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Tiền Giang khoảng bao nhiêu mỗi tháng?",
        answer:
          "Khu vực TP Mỹ Tho và trục Quốc lộ 1A có nhu cầu đặt xe ổn định, tài xế Partner có thể đạt 10–16 triệu đồng/tháng tùy khung giờ hoạt động.",
      },
      {
        question: "Xe VinFast tại Tiền Giang có cần chạy thử trước khi được duyệt Partner không?",
        answer:
          "Không bắt buộc chạy thử. Sau khi hồ sơ được duyệt và tài khoản kích hoạt, xe có thể nhận chuyến ngay theo khu vực đã đăng ký.",
      },
    ],
  },
  {
    slug: "dong-nai",
    name: "Đồng Nai",
    displayName: "Đồng Nai",
    region: "Đông Nam Bộ",
    metaTitle:
      "Đăng Ký Xanh SM Partner Đồng Nai 2026 – Hướng Dẫn Chủ Xe VinFast | Cần Thơ GF",
    metaDescription:
      "Chủ xe VinFast tại Đồng Nai muốn đăng ký Xanh SM Partner, Grab? Cần Thơ GF hướng dẫn thủ tục, hồ sơ cần chuẩn bị, tư vấn online miễn phí toàn quốc.",
    keywords: [
      "đăng ký xanh sm partner đồng nai",
      "xanh sm partner đồng nai",
      "đăng ký đối tác xanh sm đồng nai",
      "chủ xe vinfast chạy xanh sm đồng nai",
    ],
    h1: "Đăng Ký Xanh SM Partner Tại Đồng Nai – Hướng Dẫn Chủ Xe VinFast",
    intro:
      "Đồng Nai là tỉnh công nghiệp lớn giáp TPHCM, tập trung nhiều khu công nghiệp và dân cư đông đúc, nhu cầu di chuyển bằng xe công nghệ ngày càng tăng. Nếu bạn có xe điện VinFast tại Đồng Nai và muốn đăng ký Xanh SM Partner, Cần Thơ GF hướng dẫn thủ tục hoàn toàn từ xa qua Zalo/hotline.",
    localNote:
      "Khu vực Biên Hòa và các khu công nghiệp lân cận thường có nhu cầu đặt xe giờ cao điểm đi làm lớn — phù hợp cho tài xế chạy khung giờ hành chính.",
    faq: [
      {
        question: "Xe VinFast chạy khu công nghiệp ở Đồng Nai có phù hợp Xanh SM Partner không?",
        answer:
          "Phù hợp, đặc biệt các khung giờ cao điểm đi làm/tan ca quanh các khu công nghiệp lớn tại Biên Hòa, Nhơn Trạch, Long Thành.",
      },
      {
        question: "Hồ sơ đăng ký Xanh SM Partner tại Đồng Nai gồm những gì?",
        answer:
          "Gồm CCCD 2 mặt, cavet xe 2 mặt, GPLX 2 mặt, số điện thoại và email chưa đăng ký app, tài khoản ngân hàng chính chủ, thông tin người thân và khu vực chạy.",
      },
      {
        question:
          "Xanh SM Partner tại Đồng Nai có phù hợp chạy khung giờ công nhân khu công nghiệp không?",
        answer:
          "Rất phù hợp. Các khu công nghiệp lớn tại Biên Hòa, Nhơn Trạch, Long Thành có nhu cầu đặt xe ổn định vào giờ cao điểm đi làm và tan ca, giúp tài xế tối ưu số chuyến trong ngày.",
      },
      {
        question: "Thu nhập chạy Xanh SM Partner tại Đồng Nai khoảng bao nhiêu?",
        answer:
          "Tài xế Partner tại khu vực Biên Hòa và các khu công nghiệp lân cận có thể đạt 15–22 triệu đồng/tháng nhờ mật độ chuyến cao vào khung giờ hành chính.",
      },
      {
        question: "Xe VinFast chạy Xanh SM Partner tại Đồng Nai có thể nhận chuyến sang TPHCM không?",
        answer:
          "Có, đặc biệt khu vực giáp ranh TPHCM. Bạn khai báo khu vực hoạt động phù hợp khi đăng ký để hệ thống phân bổ chuyến liên tỉnh hợp lý.",
      },
    ],
  },
];

export function getPartnerCityBySlug(slug: string): PartnerCity | undefined {
  return XANHSM_PARTNER_CITIES.find((city) => city.slug === slug);
}
