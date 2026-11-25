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
        <div className="p-aside p-aside--wide !max-w-none">
          <h3 className="!text-white text-xl font-semibold mb-4">Thông tin liên hệ</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-sky shrink-0 mt-0.5" />
              <div>
                <p className="text-white/60 text-sm">Hotline</p>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="font-semibold text-lg !text-white hover:!text-[#7CCBF8] transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sky shrink-0 mt-0.5" />
              <div>
                <p className="text-white/60 text-sm">Địa chỉ showroom</p>
                <p className="font-medium leading-relaxed !text-white !m-0 !text-base">{CONTACT_ADDRESS}</p>
              </div>
            </li>
          </ul>
          <a
            href={CONTACT_ZALO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-pill mt-6 w-full justify-center"
          >
            Chat Zalo tư vấn ngay
          </a>
        </div>

        <p className="text-steel text-sm leading-relaxed text-center">
          <Sparkles className="inline-block w-4 h-4 mr-1 text-primary" />
          <strong className="text-dark">VinFast Cần Thơ EV</strong>, đại lý phân
          phối xe điện chính hãng, phục vụ tại Cần Thơ và khu vực miền Tây.
        </p>
      </div>
    </div>
  );
}
