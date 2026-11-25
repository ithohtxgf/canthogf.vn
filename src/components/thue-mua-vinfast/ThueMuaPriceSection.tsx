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
          <span className="w-14 shrink-0 text-steel">{year.label}</span>
          <div className="flex-1 h-1.5 bg-tint-strong rounded-full overflow-hidden">
            <div
              className="h-full bg-sky rounded-full transition-all duration-300"
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
      <h2 className="text-dark">
        Bảng giá thuê thương quyền
      </h2>
      <p className="text-steel text-sm sm:text-base mb-6">
        Giá thuê hàng tháng giảm dần theo từng năm, sở hữu hoàn toàn cuối năm 5
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setTab("main")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
            tab === "main"
              ? "bg-dark text-white border-dark"
              : "bg-white text-dark border-hairline hover:border-sky"
          }`}
        >
          4 dòng xe chính
        </button>
        <button
          type="button"
          onClick={() => setTab("limo")}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
            tab === "limo"
              ? "bg-dark text-white border-dark"
              : "bg-white text-dark border-hairline hover:border-sky"
          }`}
        >
          Limo Green: 2 chương trình mới
        </button>
      </div>

      {tab === "main" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {THUE_MUA_MAIN_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl border p-5 ${
                plan.featured ? "border-sky" : "border-hairline"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}
              <div className="flex items-center gap-2 font-semibold text-dark text-base mb-1.5">
                <Car className="w-5 h-5 text-primary shrink-0" />
                {plan.name}
              </div>
              <p className="text-sm text-steel mb-0.5">{plan.priceLabel}</p>
              <p className="text-sm text-steel font-medium mb-4">{plan.downPaymentLabel}</p>
              <YearRows years={plan.years} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-steel mb-4">
            Xe Limo Green 749tr: 2 gói mới, tổng 5 năm bằng nhau
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {THUE_MUA_LIMO_PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className={`relative bg-white rounded-xl border p-5 ${
                  prog.featured ? "border-sky" : "border-hairline"
                }`}
              >
                {prog.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-3 py-0.5 rounded-full whitespace-nowrap">
                    {prog.badge}
                  </span>
                )}
                <span className="inline-block text-sm font-semibold text-dark bg-tint-strong px-2.5 py-1 rounded-full mb-3">
                  {prog.name}
                </span>
                <p className="text-sm text-steel leading-relaxed mb-4">{prog.description}</p>
                <YearRows years={prog.years} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
