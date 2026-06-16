"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import {
  CONTACT_ADDRESS,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_ZALO_URL,
  dispatchConsultationPopup,
} from "@/lib/contact";
import { VINFAST_VEHICLES } from "@/lib/content/vinfast-can-tho";

type FormState = {
  name: string;
  phone: string;
  vehicleId: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  vehicleId: VINFAST_VEHICLES[1]?.id ?? "vf5-plus",
};

export function VinfastLeadForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    dispatchConsultationPopup();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label
              htmlFor="lead-name"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Họ và tên
            </label>
            <input
              id="lead-name"
              type="text"
              required
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Nguyễn Văn A"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="lead-phone"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Số điện thoại
            </label>
            <input
              id="lead-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="09xx xxx xxx"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div>
            <label
              htmlFor="lead-vehicle"
              className="block text-sm font-semibold text-dark mb-2"
            >
              Dòng xe quan tâm
            </label>
            <select
              id="lead-vehicle"
              value={form.vehicleId}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, vehicleId: e.target.value }))
              }
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {VINFAST_VEHICLES.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg"
          >
            <Send className="w-5 h-5" />
            Gửi đăng ký nhận báo giá
          </button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-green-700 bg-green-50 rounded-xl px-4 py-3 text-sm font-medium"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              Cảm ơn bạn! Tư vấn viên sẽ liên hệ sớm nhất. Bạn cũng có thể kết
              nối Zalo ngay bên dưới.
            </motion.p>
          )}
        </form>
      </div>

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

        <p className="text-gray-600 text-sm leading-relaxed">
          <strong className="text-dark">VinFast Cần Thơ</strong> — đại lý phân
          phối xe điện chính hãng phục vụ khách hàng tại{" "}
          <strong>Ninh Kiều</strong>, <strong>Cái Răng</strong>,{" "}
          <strong>Bình Thủy</strong>, <strong>Ô Môn</strong>,{" "}
          <strong>Thốt Nốt</strong>, <strong>Phong Điền</strong>,{" "}
          <strong>Cờ Đỏ</strong>, <strong>Vĩnh Thạnh</strong> và toàn khu vực{" "}
          <strong>Đồng bằng sông Cửu Long</strong>. Hỗ trợ tư vấn mua xe VinFast
          trả góp, lái thử tận nhà, bàn giao xe và thủ tục đăng ký biển số trọn
          gói tại Cần Thơ.
        </p>
      </div>
    </div>
  );
}
