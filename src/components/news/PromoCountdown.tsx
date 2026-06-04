"use client";

import { useEffect, useState } from "react";
import { getPromoCountdownEnd } from "@/lib/content/promotions";

type PromoCountdownProps = {
  endDate?: Date;
  className?: string;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function PromoCountdown({ endDate, className = "" }: PromoCountdownProps) {
  const target = endDate ?? getPromoCountdownEnd();
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      setRemaining(diff > 0 ? diff : 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (remaining === null || remaining <= 0) {
    return (
      <span className={`text-xs font-bold text-red-600 ${className}`}>
        ⏰ Ưu đãi sắp kết thúc!
      </span>
    );
  }

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-bold ${className}`}
      aria-live="polite"
      aria-label={`Ưu đãi còn ${days} ngày ${hours} giờ`}
    >
      <span className="text-red-600">⏰ Còn</span>
      {days > 0 && (
        <span className="bg-red-600 text-white px-1.5 py-0.5 rounded tabular-nums">
          {days}d
        </span>
      )}
      <span className="bg-red-600 text-white px-1.5 py-0.5 rounded tabular-nums">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </span>
    </div>
  );
}
