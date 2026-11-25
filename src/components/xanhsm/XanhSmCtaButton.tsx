"use client";

import { ArrowRight } from "lucide-react";
import { dispatchConsultationPopup } from "@/lib/contact";

export function XanhSmCtaButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={dispatchConsultationPopup}
      className={`h-pill h-pill--solid ${className}`}
    >
      Đăng ký tư vấn ngay
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}
