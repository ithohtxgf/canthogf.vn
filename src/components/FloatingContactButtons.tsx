"use client";

import { ClipboardEdit, Phone } from "lucide-react";
import { CONTACT_PHONE_TEL, CONTACT_ZALO_URL, dispatchConsultationPopup } from "@/lib/contact";

/**
 * Cụm nút liên hệ nhanh — cố định góc dưới phải, hiển thị trên mọi trang.
 * Màu theo hệ EV Green: gọi điện nền Ocean, tư vấn nền trắng viền mảnh; Zalo giữ màu nhận diện của Zalo.
 * Ẩn khi menu điện thoại đang mở (html.menu-open) để không đè lên menu.
 */
export function FloatingContactButtons() {
  return (
    <div className="fab-stack fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-center gap-2.5">
      <button
        type="button"
        onClick={dispatchConsultationPopup}
        title="Đăng ký tư vấn miễn phí"
        aria-label="Đăng ký tư vấn miễn phí"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-white text-ocean transition-colors hover:border-sky hover:bg-tint-strong"
      >
        <ClipboardEdit className="h-5 w-5" strokeWidth={1.8} />
      </button>

      <a
        href={CONTACT_ZALO_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo"
        aria-label="Chat Zalo"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0068FF] text-white transition-opacity hover:opacity-90"
      >
        <span className="text-[11px] font-semibold">Zalo</span>
      </a>

      <a
        href={`tel:${CONTACT_PHONE_TEL}`}
        title="Gọi tổng đài tư vấn"
        aria-label="Gọi tổng đài tư vấn"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean text-white transition-colors hover:bg-ocean-deep"
      >
        <Phone className="h-5 w-5" strokeWidth={1.8} fill="currentColor" />
      </a>
    </div>
  );
}
