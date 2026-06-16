import { motion } from 'motion/react';

export default function Terms() {
  return (
    <div className="bg-light min-h-screen pb-20">
      <section className="bg-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4"
          >
            Điều khoản sử dụng
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              <strong>HỢP TÁC XÃ VẬN TẢI CẦN THƠ GF</strong>
            </p>
            <p className="mb-6">Ngày cập nhật mới nhất: 16/06/2026</p>
            <p className="mb-6">
              Chào mừng quý khách đến với website của HTX Vận tải Cần Thơ GF. Khi bạn truy cập, duyệt qua hoặc sử dụng bất kỳ nội dung nào trên website này, điều đó đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý tuân thủ các điều khoản quy định dưới đây. Nếu bạn không đồng ý với các điều khoản này, vui lòng dừng việc truy cập website.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">1. Chấp thuận và thay đổi điều khoản</h2>
            <p className="mb-4">
              Quy định này áp dụng cho toàn bộ người dùng truy cập website của HTX Vận tải Cần Thơ GF.
            </p>
            <p className="mb-4">
              Chúng tôi có quyền thay đổi, sửa đổi, thêm hoặc bớt bất kỳ phần nào trong Điều khoản sử dụng này vào bất kỳ lúc nào để phù hợp với hoạt động của HTX và quy định pháp luật hiện hành. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên website mà không cần thông báo trước. Việc bạn tiếp tục sử dụng website sau khi các thay đổi được đăng tải đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">2. Quyền sở hữu trí tuệ</h2>
            <p className="mb-4">
              Toàn bộ nội dung trên website bao gồm nhưng không giới hạn ở: Văn bản, hình ảnh, đồ họa, logo, biểu tượng, video, tài liệu giới thiệu sản phẩm/dịch vụ, và mã nguồn website đều thuộc quyền sở hữu trí tuệ hợp pháp của HTX Vận tải Cần Thơ GF hoặc bên cấp phép cho chúng tôi, được bảo hộ bởi Luật Sở hữu trí tuệ Việt Nam.
            </p>
            <p className="mb-6">
              Nghiêm cấm mọi hành vi sao chép, tái bản, phân phối, chỉnh sửa hoặc sử dụng nội dung từ website này vì mục đích thương mại mà không có sự đồng ý trước bằng văn bản của HTX Vận tải Cần Thơ GF.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">3. Quy định đối với người sử dụng website</h2>
            <p className="mb-4">
              Khi sử dụng website, bạn cam kết tuân thủ các nguyên tắc sau:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Không sử dụng bất kỳ thiết bị, phần mềm, công cụ hoặc phương thức nào nhằm can thiệp, phá hoại hoặc làm gián đoạn hoạt động bình thường của website.</li>
              <li>Không gửi, truyền tải hoặc phát tán các dữ liệu độc hại, virus, phần mềm gián điệp thông qua các form tương tác trên website.</li>
              <li>Không mạo danh cá nhân hoặc tổ chức khác khi điền thông tin vào form liên hệ, yêu cầu tư vấn trên website.</li>
              <li>Không sử dụng website vào mục đích vi phạm pháp luật, gây tổn hại đến uy tín, thương hiệu của HTX Vận tải Cần Thơ GF hoặc quyền lợi của người khác.</li>
            </ul>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">4. Tuyên bố miễn trừ trách nhiệm</h2>
            <p className="mb-6">
              <strong>Thông tin mang tính chất giới thiệu:</strong> Toàn bộ thông tin, hình ảnh, thông số kỹ thuật của sản phẩm, xe, và các gói dịch vụ vận tải được đăng tải trên website này chỉ mang tính chất giới thiệu, tham khảo chung.
            </p>
            <p className="mb-6">
              <strong>Giá trị hợp đồng thực tế:</strong> Website này không trực tiếp giao dịch mua bán hay ký kết hợp đồng. Các thỏa thuận thương mại, giá cước vận tải, quy trình cung cấp dịch vụ chính thức sẽ được hai bên bàn bạc, thống nhất và ký kết bằng văn bản/hợp đồng vận tải riêng biệt, có hiệu lực pháp lý độc lập ngoài website.
            </p>
            <p className="mb-6">
              <strong>Sự cố kỹ thuật mạng:</strong> Chúng tôi nỗ lực tối đa để đảm bảo website hoạt động ổn định. Tuy nhiên, chúng tôi không chịu trách nhiệm đối với các thiệt hại (nếu có) phát sinh từ việc lỗi đường truyền Internet, hacker tấn công, hoặc việc không thể truy cập website do các sự cố kỹ thuật nằm ngoài tầm kiểm soát của chúng tôi.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">5. Luật áp dụng và giải quyết tranh chấp</h2>
            <p className="mb-6">
              Điều khoản sử dụng này được điều chỉnh và giải thích theo quy định của pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam (bao gồm Luật Công nghệ thông tin 2006, Luật An toàn thông tin mạng 2015 và các văn bản hướng dẫn).
            </p>
            <p className="mb-6">
              Mọi tranh chấp phát sinh từ hoặc liên quan đến việc sử dụng website này trước hết sẽ được giải quyết thông qua thương lượng, hòa giải chân thành giữa các bên. Trong trường hợp không thể tự giải quyết, tranh chấp sẽ được đưa ra giải quyết tại Tòa án nhân dân có thẩm quyền tại Thành phố Cần Thơ.
            </p>
            <p className="mb-6">
              Nếu quý khách có bất kỳ câu hỏi nào liên quan đến Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi theo thông tin hotline hoặc email được công bố chính thức trên website.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
