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
              <strong>HỢP TÁC XÃ VẬN TẢI CẦN THƠ GF</strong>
            </p>
            <p className="mb-6">Ngày cập nhật mới nhất: 16/06/2026</p>
            <p className="mb-6">
              Chào mừng bạn đến với website chính thức của Hợp tác xã (HTX) Vận tải Cần Thơ GF. Chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của quý khách hàng cũng như người dùng truy cập website theo đúng quy định của Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và các văn bản pháp luật liên quan của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
            </p>
            <p className="mb-6">
              Chính sách bảo mật này giải thích cách chúng tôi tiếp nhận, xử lý và bảo vệ thông tin của bạn khi bạn tương tác với website của chúng tôi.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">1. Mục đích và phạm vi thu thập dữ liệu cá nhân</h2>
            <p className="mb-4">
              Do website của chúng tôi hoạt động dưới hình thức giới thiệu doanh nghiệp, dịch vụ và sản phẩm vận tải (không có tính năng đăng ký thành viên hoặc thanh toán trực tuyến), phạm vi thu thập dữ liệu được giới hạn tối thiểu bao gồm:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>
                <strong>Thông tin do bạn chủ động cung cấp:</strong> Khi bạn điền thông tin vào form liên hệ, form yêu cầu tư vấn dịch vụ trên website, các dữ liệu có thể bao gồm: Họ và tên, Số điện thoại, Email, Nội dung cần hỗ trợ.
              </li>
              <li>
                <strong>Thông tin thu thập tự động (Cookie &amp; Analytics):</strong> Khi bạn truy cập website, hệ thống có thể tự động ghi lại một số thông tin kỹ thuật không định danh như: Địa chỉ IP, loại trình duyệt, thời gian truy cập, các trang bạn đã xem nhằm mục đích tối ưu hóa trải nghiệm người dùng và đo lường hiệu suất website.
              </li>
            </ul>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">2. Mục đích xử lý và sử dụng dữ liệu</h2>
            <p className="mb-4">
              Chúng tôi chỉ sử dụng thông tin cá nhân thu thập được cho các mục đích hợp pháp sau:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Phản hồi, tư vấn và giải đáp các thắc mắc của khách hàng về dịch vụ vận tải và các sản phẩm của HTX Cần Thơ GF.</li>
              <li>Cung cấp báo giá, thông tin ưu đãi hoặc các tài liệu giới thiệu dịch vụ theo đúng yêu cầu của khách hàng.</li>
              <li>Nâng cao chất lượng nội dung, giao diện và cải thiện trải nghiệm của người dùng trên website.</li>
              <li>Ngăn chặn các hoạt động phá hoại, spam hoặc các hành vi vi phạm pháp luật trên môi trường mạng.</li>
            </ul>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">3. Thời gian lưu trữ dữ liệu cá nhân</h2>
            <p className="mb-4">
              Dữ liệu cá nhân do người dùng cung cấp sẽ được lưu trữ nội bộ và bảo mật cho đến khi:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Hoàn thành mục đích tư vấn, hỗ trợ theo yêu cầu của khách hàng.</li>
              <li>Hoặc cho đến khi nhận được yêu cầu hủy bỏ, xóa dữ liệu từ phía chủ thể dữ liệu (người dùng).</li>
            </ul>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">4. Cam kết bảo mật và Chia sẻ dữ liệu cho bên thứ ba</h2>
            <p className="mb-6">
              <strong>Cam kết bảo mật:</strong> HTX Vận tải Cần Thơ GF áp dụng các biện pháp kỹ thuật và an ninh mạng phù hợp để bảo vệ dữ liệu cá nhân của bạn khỏi bị truy cập trái phép, thay đổi, tiết lộ hoặc tiêu hủy.
            </p>
            <p className="mb-4">
              <strong>Không chia sẻ thương mại:</strong> Chúng tôi cam kết tuyệt đối không bán, cho thuê, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại khi chưa có sự đồng ý của bạn.
            </p>
            <p className="mb-6">
              <strong>Ngoại lệ pháp lý:</strong> Chúng tôi chỉ cung cấp dữ liệu cá nhân của người dùng cho các cơ quan chức năng, cơ quan quản lý nhà nước có thẩm quyền khi có yêu cầu bằng văn bản chính thức theo quy định của pháp luật Việt Nam.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">5. Quyền của chủ thể dữ liệu (Người dùng)</h2>
            <p className="mb-4">
              Theo Nghị định 13/2023/NĐ-CP, bạn có toàn quyền đối với dữ liệu cá nhân của mình, bao gồm:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Quyền biết, quyền đồng ý hoặc rút lại sự đồng ý cho phép xử lý dữ liệu.</li>
              <li>Quyền yêu cầu chỉnh sửa, cập nhật thông tin cá nhân chưa chính xác.</li>
              <li>Quyền yêu cầu xóa bỏ hoàn toàn dữ liệu cá nhân của mình đã lưu trữ trên hệ thống của chúng tôi.</li>
            </ul>
            <p className="mb-6">
              Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua thông tin tại mục 6.
            </p>

            <h2 className="text-xl font-bold text-dark mt-8 mb-4">6. Đơn vị thu thập và quản lý thông tin</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Tên tổ chức:</strong> Hợp tác xã Vận tải Cần Thơ GF</li>
              <li><strong>Địa chỉ trụ sở:</strong> Quận Cái Răng, Thành phố Cần Thơ</li>
              <li><strong>Số điện thoại liên hệ:</strong> 0969 99 11 77</li>
              <li><strong>Email tiếp nhận yêu cầu bảo mật:</strong> htxcanthogf@gmail.com</li>
            </ul>

            <p className="mb-6">
              Nếu quý khách có bất kỳ thắc mắc nào liên quan đến chính sách này, vui lòng liên hệ để được hỗ trợ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
