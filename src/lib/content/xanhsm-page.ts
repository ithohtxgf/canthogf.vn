export const XANHSM_PAGE_PATH = "/dang-ky-xanhsm";

export const XANHSM_META_TITLE =
  "Đăng ký Xanh SM Partner Cần Thơ cho xe VinFast, mở app miễn phí";

export const XANHSM_META_DESCRIPTION =
  "Đang có xe ô tô VinFast và muốn chạy app? Hợp tác xã Cần Thơ EV mở app Xanh SM Partner và Grab không thu phí, không ký quỹ, hỗ trợ đổi biển trắng sang biển vàng.";

export const XANHSM_KEYWORDS = [
  "đăng ký xanh sm partner cần thơ",
  "xanh sm partner",
  "mở app xanh sm partner",
  "đăng ký xanh sm cần thơ",
  "xe vinfast chạy xanh sm",
  "đăng ký grab xe vinfast cần thơ",
  "đổi biển vàng chạy xanh sm",
];

export const XANHSM_PAGE_H1 = "Đăng ký Xanh SM Partner tại Cần Thơ cho xe ô tô VinFast";

export const XANHSM_HERO_INTRO =
  "Anh chị đang có xe ô tô VinFast và muốn chạy dịch vụ? Hợp tác xã vận tải Cần Thơ EV mở app Xanh SM Partner và Grab cho xe, không thu phí đăng ký, không ký quỹ.";

export const XANHSM_PARTNER_INTRO =
  "Xanh SM Partner là hình thức chạy dịch vụ trên nền tảng Xanh SM thông qua một công ty đối tác hoặc hợp tác xã vận tải: tài xế không ký trực tiếp với Xanh SM. Anh chị đang có xe ô tô VinFast thì Cần Thơ EV hướng dẫn mở app Xanh SM Partner và Grab từng bước; phí đăng ký app là 0 đồng, không ký quỹ.";

export const XANHSM_PARTNER_CONDITIONS = [
  "Xe ô tô VinFast mang biển vàng (biển kinh doanh vận tải). Xe đang biển trắng thì hợp tác xã hỗ trợ làm thủ tục đổi sang biển vàng.",
  "Giấy phép lái xe ô tô còn hiệu lực; bằng C1 mới cấp vẫn đăng ký được.",
  "Số điện thoại và email chưa từng đăng ký app Xanh SM hoặc Grab.",
  "Chưa chạy Xanh SM theo diện Platform, tài khoản không bị khoá.",
];

export const XANHSM_PARTNER_DOCUMENTS = [
  "CCCD 2 mặt",
  "Cà vẹt xe 2 mặt",
  "Giấy phép lái xe 2 mặt",
  "Số điện thoại chưa đăng ký app",
  "Tài khoản ngân hàng chính chủ",
  "Tên và số điện thoại người thân",
  "Email đang dùng, chưa đăng ký app",
  "Khu vực chạy",
];

export const XANHSM_PARTNER_SUPPORT = [
  "Mở app Xanh SM Partner và Grab: không thu phí đăng ký, không ký quỹ.",
  "Xem trước hồ sơ, báo ngay giấy nào thiếu hoặc mờ; xử lý trường hợp số điện thoại, email bị trùng.",
  "Làm thủ tục đổi biển trắng sang biển vàng.",
  "Hướng dẫn qua Zalo cho anh chị ở xa. Hệ thống hợp tác xã EV Green có chi nhánh ở các tỉnh.",
];

export const XANHSM_PARTNER_STEPS = [
  {
    title: "Nhắn Zalo hoặc gọi Cần Thơ EV",
    description:
      "Cho biết dòng xe VinFast, xe đang biển vàng hay biển trắng và khu vực muốn chạy. Tư vấn viên gọi lại hướng dẫn trong giờ làm việc.",
  },
  {
    title: "Gửi hồ sơ qua Zalo",
    description:
      "Chụp rõ hai mặt CCCD, cà vẹt xe, giấy phép lái xe, kèm các thông tin trong danh sách hồ sơ. Cần Thơ EV xem trước khi nộp để hồ sơ không bị trả về vì thiếu giấy.",
  },
  {
    title: "Đổi biển vàng nếu xe đang biển trắng",
    description:
      "Xe chạy app phải mang biển vàng. Xe biển trắng được hợp tác xã hướng dẫn giấy tờ và làm thủ tục đổi biển.",
  },
  {
    title: "Tạo tài khoản Partner trên app",
    description:
      "Dùng số điện thoại và email chưa từng đăng ký Xanh SM hay Grab. Cần Thơ EV hướng dẫn điền thông tin xe và khu vực hoạt động.",
  },
  {
    title: "Mở app và nhận chuyến",
    description:
      "Hồ sơ đủ, xe đã mang biển vàng thì app mở được ngay. Một xe mở được cả Xanh SM Partner và Grab.",
  },
] as const;

export type XanhSmFaqItem = {
  question: string;
  answer: string;
};

export const XANHSM_FAQ: XanhSmFaqItem[] = [
  {
    question: "Xanh SM Partner là gì?",
    answer:
      "Là hình thức chạy dịch vụ trên nền tảng Xanh SM thông qua một công ty đối tác hoặc hợp tác xã vận tải, tài xế không ký trực tiếp với Xanh SM. Hình thức này dành cho người đang có xe ô tô VinFast.",
  },
  {
    question: "Mở app Xanh SM Partner qua Cần Thơ EV tốn bao nhiêu tiền?",
    answer: "Không tốn phí đăng ký app. Anh chị cũng không phải ký quỹ.",
  },
  {
    question: "Xe biển trắng có chạy Xanh SM Partner được không?",
    answer:
      "Xe phải mang biển vàng mới chạy app được. Xe đang biển trắng thì Cần Thơ EV hỗ trợ làm thủ tục đổi sang biển vàng; nhắn Zalo để được hướng dẫn giấy tờ.",
  },
  {
    question: "Một xe mở được cả Xanh SM và Grab không?",
    answer: "Được. Một xe ô tô VinFast mở được cả app Xanh SM Partner và Grab.",
  },
  {
    question: "Đang chạy Xanh SM Platform có chuyển sang Partner được không?",
    answer:
      "Không. Tài khoản đang chạy Platform, hoặc đã bị khoá app, thì không chuyển sang Partner được.",
  },
  {
    question: "Bằng C1 mới cấp có đăng ký được không?",
    answer: "Được. Bằng C1 mới cấp vẫn đăng ký app Partner.",
  },
  {
    question: "Ở xa Cần Thơ có đăng ký online được không?",
    answer:
      "Được. Anh chị gửi ảnh giấy tờ qua Zalo, Cần Thơ EV hướng dẫn từng bước, không cần lên văn phòng. Cần làm việc trực tiếp thì hệ thống hợp tác xã EV Green có chi nhánh ở các tỉnh.",
  },
  {
    question: "Bao lâu thì có app?",
    answer:
      "Hồ sơ đủ và xe đã mang biển vàng thì app mở được ngay. Xe cần đổi biển thì cộng thêm thời gian làm thủ tục đổi biển.",
  },
  {
    question: "Chưa có xe VinFast thì sao?",
    answer:
      "Cần Thơ EV có bán các dòng ô tô VinFast như VF 5, VF 6, Limo Green. Xem giá ở trang Ô tô VinFast hoặc nhắn Zalo để được báo giá.",
  },
];
