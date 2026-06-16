"use client";

import { MapPin, Phone, Sparkles } from "lucide-react";
import {
  CONTACT_ADDRESS,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_ZALO_URL,
} from "@/lib/contact";

export function VinfastLeadForm() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-6">
        <div className="bg-primary-dark rounded-3xl p-6 sm:p-8 text-white">
          <h3 className="text-xl font-bold mb-4">Thông tin liên hệ</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-300 text-sm">Hotline</p>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="font-bold text-lg hover:text-secondary transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-300 text-sm">Địa chỉ showroom</p>
                <p className="font-medium leading-relaxed">{CONTACT_ADDRESS}</p>
              </div>
            </li>
          </ul>
          <a
            href={CONTACT_ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-secondary hover:bg-secondary-dark text-dark font-bold py-3.5 px-6 rounded-xl transition-colors"
          >
            Chat Zalo tư vấn ngay
          </a>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed text-center">
          <Sparkles className="inline-block w-4 h-4 mr-1 text-primary" />
          <strong className="text-dark">VinFast Cần Thơ GF</strong> — đại lý phân
          phối xe điện chính hãng, phục vụ tại Cần Thơ và khu vực miền Tây.
        </p>
      </div>
    </div>
  );
}
