"use client";

import { ArrowRight } from "lucide-react";
import { dispatchConsultationPopup } from "@/lib/contact";

export function XanhSmCtaButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={dispatchConsultationPopup}
      className={`inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-lg text-base sm:text-lg uppercase tracking-wide ${className}`}
    >
      Đăng ký tư vấn ngay
      <ArrowRight className="w-5 h-5" />
    </button>
  );
}
