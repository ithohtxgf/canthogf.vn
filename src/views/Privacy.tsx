import { motion } from 'motion/react';

export default function Privacy() {
  return (
    <div className="bg-light min-h-screen pb-20">
      <section className="bg-primary-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4"
          >
            Chính sách bảo mật thông tin
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-3xl shadow-sm">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Hợp tác xã vận tải Cần Thơ GF cam kết bảo mật những thông tin mang tính riêng tư của khách hàng. Quý khách vui lòng đọc bản "Chính sách bảo mật thông tin" dưới đây để hiểu hơn những cam kết mà chúng tôi thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của người truy cập.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">1. Mục đích và phạm vi thu thập thông tin</h2>
            <p className="mb-4">
              Để truy cập và sử dụng một số dịch vụ tại website, quý khách có thể được yêu cầu đăng ký với chúng tôi thông tin cá nhân (Họ tên, Số điện thoại liên lạc, Email...). Mọi thông tin khai báo phải đảm bảo tính chính xác và hợp pháp. Chúng tôi không chịu mọi trách nhiệm liên quan đến pháp luật của thông tin khai báo.
            </p>
            <p className="mb-6">
              Chúng tôi cũng có thể thu thập thông tin về số lần viếng thăm, bao gồm số trang quý khách xem, số links (liên kết) bạn click và những thông tin khác liên quan đến việc kết nối đến website của chúng tôi.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">2. Phạm vi sử dụng thông tin</h2>
            <p className="mb-4">
              Website thu thập và sử dụng thông tin cá nhân quý khách với mục đích phù hợp và hoàn toàn tuân thủ nội dung của "Chính sách bảo mật" này. Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để liên hệ trực tiếp với bạn dưới các hình thức như: gửi thư ngỏ, đơn đặt hàng, thư cảm ơn, thông tin về kỹ thuật và bảo mật...
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">3. Thời gian lưu trữ thông tin</h2>
            <p className="mb-6">
              Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của chúng tôi.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">4. Cam kết bảo mật thông tin cá nhân khách hàng</h2>
            <p className="mb-6">
              Thông tin cá nhân của thành viên trên website được chúng tôi cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của website. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
