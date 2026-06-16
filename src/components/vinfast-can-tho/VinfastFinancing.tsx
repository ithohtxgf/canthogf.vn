import { Banknote, Building2, FileCheck } from "lucide-react";

const FINANCING_BENEFITS = [
  {
    icon: Banknote,
    title: "Vay 80% – 85% giá trị xe",
    description:
      "Hỗ trợ gói vay từ 80% đến 85% giá trị xe (đã bao gồm pin), thời gian vay linh hoạt lên đến 8 năm — phù hợp ngân sách gia đình và doanh nghiệp tại Cần Thơ.",
  },
  {
    icon: Building2,
    title: "Liên kết ngân hàng uy tín",
    description:
      "Hợp tác với hệ thống ngân hàng tại Cần Thơ: Vietcombank, BIDV, Agribank và các tổ chức tín dụng uy tín — thủ tục minh bạch, lãi suất cạnh tranh.",
  },
  {
    icon: FileCheck,
    title: "Duyệt hồ sơ & thủ tục trọn gói",
    description:
      "Duyệt hồ sơ nhanh chóng, hỗ trợ đăng ký biển số, đăng kiểm và bàn giao xe tận nơi tại Ninh Kiều, Cái Răng, Bình Thủy và toàn TP. Cần Thơ.",
  },
] as const;

export function VinfastFinancing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {FINANCING_BENEFITS.map((benefit) => (
        <article
          key={benefit.title}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:border-secondary/30 hover:shadow-xl transition-all"
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mb-5">
            <benefit.icon className="w-7 h-7 text-secondary" />
          </div>
          <h3 className="text-lg font-bold text-dark mb-3">{benefit.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {benefit.description}
          </p>
        </article>
      ))}
    </div>
  );
}
