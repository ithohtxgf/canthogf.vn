"use client";

import { motion } from "motion/react";
import {
  Car,
  BadgeCheck,
  Smartphone,
  ArrowRight,
  Leaf,
  HeartHandshake,
  Rocket,
} from "lucide-react";
import { SeoContentImage } from "@/components/SeoImage";
import { PageHero } from "@/components/evg/PageHero";
import { LineIcon } from "@/components/evg/Icons";
import { dispatchConsultationPopup } from "@/lib/contact";
import {
  ABOUT_CLOSING,
  ABOUT_COMMITMENTS,
  ABOUT_CORE_INTRO,
  ABOUT_HERO,
  ABOUT_SERVICE_FLOW,
  ABOUT_VISION,
} from "@/lib/content/about";

const flowIcons = {
  car: Car,
  badge: BadgeCheck,
  app: Smartphone,
};

const commitmentIcons = [Leaf, HeartHandshake, Rocket];

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function About() {
  return (
    <>
      <PageHero
        title={ABOUT_HERO.title}
        eyebrow={ABOUT_HERO.eyebrow}
        crumbs={[{ href: "/gioi-thieu", label: "Giới thiệu" }]}
        image={ABOUT_VISION.image}
        summary={
          <>
            <strong className="block text-white font-semibold mb-2">{ABOUT_HERO.subtitle}</strong>
            &ldquo;{ABOUT_HERO.tagline}&rdquo;
          </>
        }
      />

      {/* 1. Tầm nhìn & Sứ mệnh */}
      <section className="h-sec">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <motion.div {...reveal}>
              <p className="h-eyebrow">01</p>
              <h2 className="text-dark">{ABOUT_VISION.title}</h2>
              {ABOUT_VISION.paragraphs.map((p, i) => (
                <p key={i} className="text-steel leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </motion.div>
            <motion.div {...reveal} className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-hairline">
                <SeoContentImage
                  src={ABOUT_VISION.image}
                  alt={ABOUT_VISION.imageAlt}
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 left-4 bg-white border border-sky text-dark font-semibold px-4 py-2 rounded-full text-sm">
                Cầu nối xanh
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Giá trị cốt lõi: luồng 3 bước */}
      <section className="h-sec">
        <div className="wrap">
          <motion.div {...reveal} className="max-w-3xl mb-10">
            <p className="h-eyebrow">02</p>
            <h2 className="text-dark">{ABOUT_CORE_INTRO.title}</h2>
            <p className="text-steel leading-relaxed">{ABOUT_CORE_INTRO.lead}</p>
          </motion.div>

          {/* Flow: VinFast → HTX → Xanh SM */}
          <p className="text-sm font-semibold text-dark mb-5">{ABOUT_CORE_INTRO.solutionTitle}</p>
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {ABOUT_SERVICE_FLOW.map((item, index) => {
              const Icon = flowIcons[item.icon];
              return (
                <div key={item.step} className="flex flex-col md:flex-row items-center gap-4 flex-1">
                  <motion.div
                    {...reveal}
                    transition={{ delay: index * 0.1 }}
                    className="w-full flex-1 h-full bg-white border border-hairline hover:border-sky rounded-xl p-6 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-tint-strong flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-dark" strokeWidth={1.8} />
                    </div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{item.short}</p>
                    <h3 className="text-base font-semibold text-dark mb-2">{item.title}</h3>
                    <p className="text-sm text-steel leading-relaxed">{item.description}</p>
                  </motion.div>
                  {index < ABOUT_SERVICE_FLOW.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-sky shrink-0 rotate-90 md:rotate-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Cam kết */}
      <section className="h-sec">
        <div className="wrap">
          <motion.div {...reveal} className="mb-8">
            <p className="h-eyebrow">03</p>
            <h2 className="text-dark">{ABOUT_COMMITMENTS.title}</h2>
            <blockquote className="mt-4 max-w-3xl rounded-xl bg-tint-strong px-6 py-5 text-dark text-lg leading-relaxed">
              &ldquo;{ABOUT_COMMITMENTS.quote}&rdquo;
            </blockquote>
          </motion.div>

          <ul className="tiles !grid-cols-1 md:!grid-cols-3">
            {ABOUT_COMMITMENTS.items.map((item, index) => {
              const Icon = commitmentIcons[index];
              return (
                <li key={item.title} className="tile">
                  <span className="w-11 h-11 rounded-lg bg-tint-strong flex items-center justify-center">
                    <Icon className="w-6 h-6 text-dark" strokeWidth={1.8} />
                  </span>
                  <strong>{item.title}</strong>
                  <span>{item.description}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 4. Lời kết + CTA */}
      <section className="h-sec">
        <div className="wrap">
          <div className="h-cta">
            <div>
              <p className="h-eyebrow">04: Khẩu hiệu</p>
              <h2 className="text-dark">{ABOUT_CLOSING.slogan}</h2>
              <p>{ABOUT_CLOSING.paragraph}</p>
              <p className="mt-3 text-sm">
                Hoặc liên hệ hotline{" "}
                <a href="tel:+84969991177" className="text-primary font-semibold hover:underline">
                  0969 99 11 77
                </a>
              </p>
            </div>
            <button type="button" onClick={dispatchConsultationPopup} className="h-pill h-pill--solid">
              {ABOUT_CLOSING.ctaLabel} <LineIcon name="arrow" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
