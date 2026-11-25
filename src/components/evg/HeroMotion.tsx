"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Hero: xe chạy vào (video intro, phát một lần, xe trắng) rồi lướt liên tục.
// Đoạn lướt không phải video mà dựng lại bằng HTML/CSS từ đúng các lớp của bản dựng gốc (hero-banner/video/index.html):
// nền phố trôi, vệt tốc độ, lớp sương, thân xe nhún nhẹ, bánh xe quay. Khung cuối của intro trùng khung đầu của cảnh này
// (thời điểm 3 giây của bản dựng) nên chuyển sang không bị giật. Đổi màu chỉ là thay ảnh thân xe nên tức thì,
// không phải tải hay tua video theo từng màu.
// Khách bấm ô màu thì giữ màu đó; chưa bấm thì màn hình rộng tự đổi màu sau mỗi 8 giây (điện thoại không tự đổi).
// Giảm chuyển động hoặc tiết kiệm dữ liệu: chỉ ảnh tĩnh của màu đang chọn.
const SRC = "/hero";
const AUTO_MS = 8000;
// Khung dựng 1920x1080; xe khi chạy đều: tâm ngang và mép dưới bóng gầm (theo hero-banner/video/index.html)
const FRAME = { w: 1920, h: 1080 };
const CAR = { cx: 700 + 1122 / 2, bottom: 990 };

const COLORS = [
  { key: "trang", label: "Trắng", swatch: "#F3F4F4", suffix: "" },
  { key: "bac", label: "Bạc", swatch: "#B4B7B9", suffix: "-bac" },
  { key: "den", label: "Đen", swatch: "#232425", suffix: "-den" },
  { key: "do", label: "Đỏ", swatch: "#B8021F", suffix: "-do" },
] as const;

// Vệt tốc độ: vị trí dọc, lệch ngang, độ đậm như bản dựng gốc
const STREAKS = [
  { top: 612, left: 0, opacity: 0.55, sky: false, h: 2 },
  { top: 660, left: -170, opacity: 1, sky: true, h: 2 },
  { top: 720, left: -300, opacity: 0.4, sky: false, h: 2 },
  { top: 1004, left: -90, opacity: 1, sky: true, h: 3 },
  { top: 1040, left: -380, opacity: 0.6, sky: false, h: 3 },
];

type Box = { x: number; y: number; s: number };

export function HeroMotion({ className = "" }: { className?: string }) {
  const [motion, setMotion] = useState(false);
  const [looping, setLooping] = useState(false);
  const [color, setColor] = useState(0);
  const [picked, setPicked] = useState(false);
  const swatches = useRef<(HTMLButtonElement | null)[]>([]);
  const posterRef = useRef<HTMLImageElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [pillPos, setPillPos] = useState<{ x: number; y: number } | null>(null);
  const [scene, setScene] = useState<Box | null>(null);

  // Vị trí khung 1920x1080 trên màn hình, tính từ cách ảnh nền được co giãn (object-fit cover căn phải trên máy tính,
  // fill theo bề ngang trên điện thoại). Từ đó đặt cảnh lướt trùng khít video, và ô màu giữa thân xe, ngay dưới gầm.
  useEffect(() => {
    const img = posterRef.current;
    const pill = pillRef.current;
    const media = img?.parentElement;
    const hero = pill?.parentElement;
    if (!img || !pill || !media || !hero) return;
    const place = () => {
      const b = img.getBoundingClientRect();
      const m = media.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      const st = getComputedStyle(img);
      let s: number, left: number, top: number;
      if (st.objectFit === "cover") {
        s = Math.max(b.width / FRAME.w, b.height / FRAME.h);
        left = b.right - FRAME.w * s; // căn phải (object-position 100%)
        top = b.top + (b.height - FRAME.h * s) / 2;
      } else {
        s = b.width / FRAME.w;
        left = b.left;
        top = b.top;
      }
      setScene({ x: left - m.left, y: top - m.top, s });
      setPillPos({ x: left + CAR.cx * s - h.left, y: top + CAR.bottom * s - h.top });
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(hero);
    img.addEventListener("load", place);
    return () => { ro.disconnect(); img.removeEventListener("load", place); };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setMotion(!reduce && !saveData);
  }, []);

  // Tự đổi màu khi khách chưa chọn, chỉ trên màn hình rộng và khi trang đang được xem
  useEffect(() => {
    if (!motion || !looping || picked) return;
    if (!window.matchMedia("(min-width: 901px)").matches) return;
    const t = window.setInterval(() => {
      if (document.visibilityState === "visible") setColor((c) => (c + 1) % COLORS.length);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [motion, looping, picked]);

  // Intro hết thì chuyển sang cảnh lướt, nhưng chỉ khi ảnh của cảnh đã giải mã xong (chưa xong thì intro đứng ở khung cuối,
  // trùng khung đầu cảnh lướt)
  const startLoop = useCallback(() => {
    const imgs = [...(sceneRef.current?.querySelectorAll("img") ?? [])];
    Promise.all(imgs.map((i) => i.decode().catch(() => {}))).then(() => setLooping(true));
  }, []);

  function pick(i: number) {
    setPicked(true);
    setColor(i);
  }

  // Nhóm radio: mũi tên trái/phải chuyển màu, chỉ ô đang chọn nhận Tab
  function onKey(e: React.KeyboardEvent, i: number) {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + COLORS.length) % COLORS.length;
    pick(n);
    swatches.current[n]?.focus();
  }

  return (
    <>
      <div className={`hero-media ${className}`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={posterRef} className="hero-poster" src={`${SRC}/hero-poster.webp`} alt="" fetchPriority="high" />
        {!motion && color !== 0 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="hero-poster" src={`${SRC}/hero-poster${COLORS[color].suffix}.webp`} alt="" />
        )}
        {motion && (
          <>
            <video
              className="hero-video"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={`${SRC}/hero-intro-first.webp`}
              onEnded={startLoop}
              onError={startLoop}
              style={{ opacity: looping ? 0 : 1 }}
            >
              <source src={`${SRC}/hero-intro.webm`} type="video/webm" />
              <source src={`${SRC}/hero-intro.mp4`} type="video/mp4" />
            </video>
            <div
              ref={sceneRef}
              className={`hero-scene${looping ? " is-running" : ""}`}
              style={scene ? { transform: `translate3d(${scene.x}px, ${scene.y}px, 0) scale(${scene.s})` } : { visibility: "hidden" }}
            >
              <div className="hs-track">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${SRC}/scene/street-tile.webp`} alt="" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${SRC}/scene/street-tile.webp`} alt="" style={{ left: 3840 }} />
              </div>
              <div className="hs-streaks">
                {STREAKS.map((r) => (
                  <div
                    key={r.top}
                    className={`hs-streak${r.sky ? " hs-streak--sky" : ""}`}
                    style={{ top: r.top, left: r.left, opacity: r.opacity, height: r.h }}
                  />
                ))}
              </div>
              <div className="hs-wash" />
              <div className="hs-car">
                <div className="hs-bob">
                  <div className="hs-contact" />
                  {COLORS.map((c, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={c.key}
                      className={`hs-body${i === color ? " is-on" : ""}`}
                      src={`${SRC}/car-${c.key}.webp`}
                      alt=""
                    />
                  ))}
                  <div className="hs-wheel hs-wheel--f">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${SRC}/scene/wheel-front.webp`} alt="" />
                  </div>
                  <div className="hs-wheel hs-wheel--r">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${SRC}/scene/wheel-rear.webp`} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        ref={pillRef}
        className="hero-colors"
        role="radiogroup"
        aria-label="Màu xe"
        style={pillPos ? { left: pillPos.x, top: pillPos.y } : { visibility: "hidden" }}
      >
        {COLORS.map((c, i) => (
          <button
            key={c.key}
            ref={(el) => { swatches.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={color === i}
            aria-label={c.label}
            title={c.label}
            tabIndex={color === i ? 0 : -1}
            className="hero-swatch"
            style={{ "--sw": c.swatch } as React.CSSProperties}
            // Đổi ngay khi chạm/nhấn xuống, không chờ nhấc tay; onClick vẫn giữ cho bàn phím (Enter, Space)
            onPointerDown={(e) => { if (e.button === 0) pick(i); }}
            onClick={() => pick(i)}
            onKeyDown={(e) => onKey(e, i)}
          />
        ))}
      </div>
    </>
  );
}
