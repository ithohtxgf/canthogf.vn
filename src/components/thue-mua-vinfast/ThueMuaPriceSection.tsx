"use client";

import { useState } from "react";
import { Car } from "lucide-react";
import {
  THUE_MUA_LIMO_PROGRAMS,
  THUE_MUA_MAIN_PLANS,
  type ThueMuaYearRate,
} from "@/lib/content/thue-mua-vinfast-page";

function YearRows({ years }: { years: ThueMuaYearRate[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {years.map((year) => (
        <div key={year.label} className="flex items-center gap-2 text-sm">
          <span className="w-14 shrink-0 text-gray-500">{year.label}</span>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${year.barPercent}%` }}
            />
          </div>
          <span className="min-w-[3.5rem] shrink-0 text-right font-semibold text-dark">
            {year.monthly}
          </span>
        </div>
      ))}
    </div>
  );
}

type PricingTab = "main" | "limo";

export function ThueMuaPriceSection() {
  const [tab, setTab] = useState<PricingTab>("main");

  return (
    <section id="bang-gia-thue-mua" className="scroll-mt-24">
      <h2 className="text-2xl sm:text-3xl font-black text-dark mb-1">
        Bảng giá thuê thương quyền
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mb-6">
        Giá thuê hàng tháng giảm dần theo từng năm — sở hữu hoàn toàn cuối năm 5
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTab("main")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
            tab === "main"
              ? "bg-primary-dark text-white border-primary-dark"
              : "bg-white text-gray-600 border-gray-200 hover:border-primary/40"
          }`}
        >
          4 dòng xe chính
        </button>
        <button
          type="button"
          onClick={() => setTab("limo")}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${
            tab === "limo"
              ? "bg-primary-dark text-white border-primary-dark"
              : "bg-white text-gray-600 border-gray-200 hover:border-primary/40"
          }`}
        >
          Limo Green — 2 chương trình mới
        </button>
      </div>

      {tab === "main" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {THUE_MUA_MAIN_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border p-5 shadow-sm ${
                plan.featured ? "border-2 border-primary ring-1 ring-primary/20" : "border-gray-100"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              <div className="flex items-center gap-2 font-bold text-dark text-base mb-1.5">
                <Car className="w-5 h-5 text-primary shrink-0" />
                {plan.name}
              </div>
              <p className="text-sm text-gray-500 mb-0.5">{plan.priceLabel}</p>
              <p className="text-sm text-gray-600 font-medium mb-4">{plan.downPaymentLabel}</p>
              <YearRows years={plan.years} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Xe Limo Green 749tr — 2 gói mới, tổng 5 năm bằng nhau
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {THUE_MUA_LIMO_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className={`relative bg-white rounded-2xl border p-5 shadow-sm ${
                  prog.featured ? "border-2 border-primary ring-1 ring-primary/20" : "border-gray-100"
                }`}
              >
                {prog.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                    {prog.badge}
                  </span>
                )}
                <span className="inline-block text-sm font-semibold text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full mb-3">
                  {prog.name}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{prog.description}</p>
                <YearRows years={prog.years} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
