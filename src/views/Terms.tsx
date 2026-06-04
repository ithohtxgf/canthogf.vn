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
              Chào mừng quý khách đến với website của Hợp tác xã vận tải Cần Thơ GF. Bằng việc truy cập và sử dụng website này, quý khách đồng ý tuân thủ các điều khoản và điều kiện dưới đây.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">1. Chấp nhận các điều khoản</h2>
            <p className="mb-4">
              Khi sử dụng website này, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản này. Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản, vui lòng không sử dụng website.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">2. Quyền sở hữu trí tuệ</h2>
            <p className="mb-4">
              Tất cả nội dung trên website này, bao gồm nhưng không giới hạn ở văn bản, đồ họa, logo, biểu tượng, hình ảnh, clip âm thanh, tải xuống kỹ thuật số và phần mềm, đều là tài sản của Cần Thơ GF hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật bản quyền.
            </p>
            <p className="mb-6">
              Việc sử dụng bất kỳ nội dung nào từ website này mà không có sự cho phép bằng văn bản từ chúng tôi là nghiêm cấm.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">3. Sử dụng website</h2>
            <p className="mb-6">
              Bạn đồng ý chỉ sử dụng website cho các mục đích hợp pháp và theo cách không vi phạm quyền của bất kỳ bên thứ ba nào, hoặc hạn chế hay cản trở việc sử dụng và tận hưởng website của bất kỳ bên thứ ba nào.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">4. Thay đổi điều khoản</h2>
            <p className="mb-6">
              Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào mà không cần thông báo trước. Việc bạn tiếp tục sử dụng website sau khi có bất kỳ thay đổi nào đồng nghĩa với việc bạn chấp nhận các điều khoản đã được sửa đổi.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">5. Giới hạn trách nhiệm</h2>
            <p className="mb-6">
              Cần Thơ GF không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả nào phát sinh từ việc sử dụng hoặc không thể sử dụng website này.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
