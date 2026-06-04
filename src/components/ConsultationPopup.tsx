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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-popup-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-primary-dark p-6 text-white relative">
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                aria-label="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 id="consultation-popup-title" className="text-2xl font-bold mb-1 pr-10">
                Liên hệ tư vấn
              </h2>
              <p className="text-white/80 text-sm">
                Kết nối trực tiếp với Hợp tác xã vận tải Cần Thơ GF
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                  Đơn vị
                </p>
                <p className="text-lg font-bold text-dark leading-snug">{ORGANIZATION_NAME}</p>
                <p className="text-sm text-gray-600 mt-1">
                  MST: <span className="font-semibold text-dark">{CONTACT_TAX_ID}</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Địa chỉ
                  </p>
                  <p className="text-gray-700 leading-relaxed">{CONTACT_ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                    Hotline
                  </p>
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="text-lg font-bold text-primary-dark hover:text-primary transition-colors"
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <a
                href={CONTACT_ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-[#0068FF] hover:bg-[#0058d9] text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-md"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Image
                    src="/logo_zalo.png"
                    alt=""
                    width={28}
                    height={28}
                    className="h-6 w-auto object-contain"
                    aria-hidden
                  />
                </span>
                Kết nối Zalo với tư vấn viên
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
