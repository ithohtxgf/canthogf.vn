"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Phone } from "lucide-react";
import {
  CONTACT_ADDRESS,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_TAX_ID,
  CONTACT_ZALO_URL,
  ORGANIZATION_NAME,
} from "@/lib/contact";

type ConsultationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ConsultationPopup({ isOpen, onClose }: ConsultationPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(11,23,48,.55)]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-popup-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-hairline bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Đầu hộp thoại theo co-ev: nền Tint, nhãn có vạch xiên Sky, tiêu đề Navy */}
            <div className="relative border-b border-hairline bg-tint px-6 pt-6 pb-5">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-lg text-navy hover:bg-tint-strong"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
              <p className="h-eyebrow">Tư vấn miễn phí</p>
              <h2 id="consultation-popup-title" className="mb-1 pr-10 text-xl font-semibold text-navy">
                Liên hệ tư vấn
              </h2>
              <p className="m-0 text-sm text-steel">Kết nối trực tiếp với Hợp tác xã vận tải Cần Thơ EV</p>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <p className="label">Đơn vị</p>
                <p className="m-0 font-semibold leading-snug text-navy">{ORGANIZATION_NAME}</p>
                <p className="m-0 mt-1 text-sm text-steel">MST {CONTACT_TAX_ID}</p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ocean" strokeWidth={1.8} />
                <div>
                  <p className="label">Địa chỉ</p>
                  <p className="m-0 text-sm leading-relaxed text-ink">{CONTACT_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-ocean" strokeWidth={1.8} />
                <div>
                  <p className="label">Tổng đài tư vấn</p>
                  <a href={`tel:${CONTACT_PHONE_TEL}`} className="num text-xl font-semibold text-navy no-underline hover:text-ocean">
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <a href={`tel:${CONTACT_PHONE_TEL}`} className="btn">
                  <Phone className="h-4 w-4" strokeWidth={1.8} /> Gọi tổng đài
                </a>
                <a href={CONTACT_ZALO_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Image src="/logo_zalo.png" alt="" width={18} height={18} className="object-contain" aria-hidden />
                  Nhắn Zalo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
