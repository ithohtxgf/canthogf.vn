import { useState } from "react";
import { motion } from "motion/react";
import { dispatchConsultationPopup } from "@/lib/contact";
import {
  Car,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  UserPlus,
  Download,
} from "lucide-react";
import { SeoBannerImage, SeoContentImage } from "@/components/SeoImage";

export default function XanhSM() {
  const [activeTab, setActiveTab] = useState<"driver" | "customer">("driver");

  return (
    <div className="bg-light min-h-screen pb-20">
      {/* Header */}
      <section className="bg-primary-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920&h=600"
            alt="Đăng ký lái XanhSM Cần Thơ — Cần Thơ GF"
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6"
          >
            Đăng ký <span className="text-secondary">XanhSM</span>
          </motion.h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Tham gia cộng đồng XanhSM cùng Cần Thơ GF - Lựa chọn di chuyển thông
            minh, thân thiện môi trường và cơ hội gia tăng thu nhập hấp dẫn.
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-white p-2 rounded-full shadow-md flex space-x-2">
              <button
                onClick={() => setActiveTab("driver")}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-colors flex items-center ${
                  activeTab === "driver"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <UserPlus className="w-5 h-5 mr-2" /> Dành cho Tài xế
              </button>
              <button
                onClick={() => setActiveTab("customer")}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-colors flex items-center ${
                  activeTab === "customer"
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Smartphone className="w-5 h-5 mr-2" /> Dành cho Khách hàng
              </button>
            </div>
          </div>

          {/* Driver Content */}
          {activeTab === "driver" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="p-10">
                <h2 className="text-3xl font-bold text-dark mb-6 uppercase tracking-tight text-center">
                  Trở thành đối tác tài xế XanhSM
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
                  Gia tăng thu nhập ổn định với mức chiết khấu hấp dẫn, hỗ trợ
                  mua xe trả góp và tham gia cộng đồng tài xế văn minh.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h3 className="text-xl font-bold text-primary-dark mb-6 flex items-center">
                      <CheckCircle2 className="w-6 h-6 text-primary mr-2" />{" "}
                      Quyền lợi nổi bật
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Thu nhập hấp dẫn, ổn định hàng tháng",
                        "Mức chiết khấu cạnh tranh nhất thị trường",
                        "Hỗ trợ vay mua xe VinFast với lãi suất ưu đãi",
                        "Được đào tạo nghiệp vụ chuyên nghiệp, bài bản",
                        "Tham gia bảo hiểm y tế, bảo hiểm tai nạn",
                        "Hỗ trợ kỹ thuật 24/7 từ Cần Thơ GF",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700"
                        >
                          <ArrowRight className="w-5 h-5 text-secondary-dark mr-3 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-light p-8 rounded-2xl border border-gray-100">
                    <h3 className="text-xl font-bold text-primary-dark mb-6">
                      Yêu cầu cơ bản
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-center text-gray-700 font-medium">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 font-bold">
                          1
                        </div>
                        Công dân Việt Nam từ 21 - 55 tuổi
                      </li>
                      <li className="flex items-center text-gray-700 font-medium">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 font-bold">
                          2
                        </div>
                        Bằng lái xe hạng B2 trở lên
                      </li>
                      <li className="flex items-center text-gray-700 font-medium">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 font-bold">
                          3
                        </div>
                        Lý lịch tư pháp rõ ràng
                      </li>
                      <li className="flex items-center text-gray-700 font-medium">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 font-bold">
                          4
                        </div>
                        Sức khỏe tốt, không mắc bệnh truyền nhiễm
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary-dark p-8 rounded-2xl text-white text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    Đăng ký ngay hôm nay
                  </h3>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Nhấn đăng ký để xem thông tin liên hệ và kết nối Zalo với tư
                    vấn viên Cần Thơ GF.
                  </p>

                  <button
                    type="button"
                    onClick={dispatchConsultationPopup}
                    className="bg-secondary hover:bg-secondary-dark text-dark font-bold py-4 px-10 rounded-xl transition-colors shadow-lg text-lg uppercase tracking-wider inline-flex items-center"
                  >
                    Đăng ký tư vấn ngay{" "}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Customer Content */}
          {activeTab === "customer" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="p-10">
                <h2 className="text-3xl font-bold text-dark mb-6 uppercase tracking-tight text-center">
                  Tải ứng dụng XanhSM
                </h2>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
                  Trải nghiệm dịch vụ di chuyển 5 sao với dàn xe điện VinFast
                  100% mới, không mùi, không tiếng ồn động cơ.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
                  <div className="order-2 md:order-1">
                    <h3 className="text-xl font-bold text-primary-dark mb-6 flex items-center">
                      <CheckCircle2 className="w-6 h-6 text-primary mr-2" /> Vì
                      sao chọn XanhSM?
                    </h3>
                    <ul className="space-y-4 mb-8">
                      {[
                        "100% xe điện VinFast cao cấp, êm ái",
                        "Không mùi xăng dầu, không tiếng ồn",
                        "Tài xế chuyên nghiệp, thân thiện, chuẩn 5 sao",
                        "Giá cước minh bạch, nhiều ưu đãi hấp dẫn",
                        "Góp phần bảo vệ môi trường",
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700"
                        >
                          <ArrowRight className="w-5 h-5 text-secondary-dark mr-3 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 bg-dark hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center">
                        <Download className="w-5 h-5 mr-2" /> App Store
                      </button>
                      <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center">
                        <Download className="w-5 h-5 mr-2" /> Google Play
                      </button>
                    </div>
                  </div>

                  <div className="order-1 md:order-2 flex justify-center">
                    <div className="relative w-64 h-[500px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
                      <SeoContentImage
                        src="https://picsum.photos/seed/appmockup/400/800"
                        alt="Giao diện ứng dụng XanhSM trên điện thoại"
                        width={400}
                        height={800}
                        className="w-full h-full object-cover"
                        sizes="256px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
