"use client";

import { ClipboardEdit, Phone } from "lucide-react";
import { CONTACT_PHONE_TEL, CONTACT_ZALO_URL, dispatchConsultationPopup } from "@/lib/contact";

/** Cụm nút liên hệ nhanh — cố định góc dưới phải, hiển thị trên mọi trang */
export function FloatingContactButtons() {
  return (
    <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={dispatchConsultationPopup}
        title="Đăng ký tư vấn miễn phí"
        aria-label="Đăng ký tư vấn miễn phí"
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white text-primary-dark shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
      >
        <ClipboardEdit className="h-6 w-6" strokeWidth={2} />
      </button>

      <a
        href={CONTACT_ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo"
        aria-label="Chat Zalo"
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <span className="text-[11px] sm:text-xs font-bold tracking-tight">Zalo</span>
      </a>

      <a
        href={`tel:${CONTACT_PHONE_TEL}`}
        title="Gọi hotline"
        aria-label="Gọi hotline"
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#22C55E] text-white shadow-lg animate-pulse transition-transform hover:scale-105 active:scale-95"
      >
        <Phone className="h-6 w-6" strokeWidth={2} fill="currentColor" />
      </a>
    </div>
  );
}
