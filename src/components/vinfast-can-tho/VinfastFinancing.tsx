import { Banknote, Building2, FileCheck } from "lucide-react";

const FINANCING_BENEFITS = [
  {
    icon: Banknote,
    title: "Vay 80% – 85% giá trị xe",
    description:
      "Hỗ trợ gói vay từ 80% đến 85% giá trị xe (đã bao gồm pin), thời gian vay linh hoạt lên đến 8 năm, phù hợp ngân sách gia đình và doanh nghiệp tại Cần Thơ.",
  },
  {
    icon: Building2,
    title: "Liên kết ngân hàng",
    description:
      "Hợp tác với hệ thống ngân hàng tại Cần Thơ: Vietcombank, BIDV, Agribank và các tổ chức tín dụng khác.",
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
          className="bg-white rounded-xl p-6 sm:p-8 border border-hairline hover:border-sky transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-tint-strong flex items-center justify-center mb-5">
            <benefit.icon className="w-7 h-7 text-dark" />
          </div>
          <h3 className="text-lg font-semibold text-dark mb-3">{benefit.title}</h3>
          <p className="text-steel text-sm leading-relaxed">
            {benefit.description}
          </p>
        </article>
      ))}
    </div>
  );
}
