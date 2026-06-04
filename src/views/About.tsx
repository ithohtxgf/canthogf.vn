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
  Quote,
} from "lucide-react";
import { SeoBannerImage, SeoContentImage } from "@/components/SeoImage";
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

export default function About() {
  return (
    <div className="bg-light min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-dark text-white py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <SeoBannerImage
            src={ABOUT_VISION.image}
            alt={ABOUT_VISION.imageAlt}
            className="object-cover opacity-25"
          />
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, rgba(10,43,96,0.92) 0%, rgba(16,59,124,0.85) 45%, rgba(0,181,184,0.35) 100%)`,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-secondary font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              {ABOUT_HERO.eyebrow}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
              {ABOUT_HERO.title}
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-bold mb-6 leading-snug">
              {ABOUT_HERO.subtitle}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed italic border-l-4 border-secondary pl-4">
              &ldquo;{ABOUT_HERO.tagline}&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. Tầm nhìn & Sứ mệnh */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-bold text-sm uppercase tracking-wider mb-3">
                01
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6 leading-snug">
                {ABOUT_VISION.title}
              </h2>
              {ABOUT_VISION.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-5 last:mb-0">
                  {p}
                </p>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/10">
                <SeoContentImage
                  src={ABOUT_VISION.image}
                  alt={ABOUT_VISION.imageAlt}
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-secondary text-dark font-black px-6 py-4 rounded-2xl shadow-xl text-sm md:text-base uppercase tracking-wide">
                Cầu nối xanh
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Giá trị cốt lõi — luồng 3 bước */}
      <section className="py-16 md:py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-wider mb-3">
              02
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
              {ABOUT_CORE_INTRO.title}
            </h2>
            <p className="text-gray-600 leading-relaxed">{ABOUT_CORE_INTRO.lead}</p>
          </motion.div>

          {/* Flow: VinFast → HTX → Xanh SM */}
          <div className="mb-16">
            <p className="text-center text-sm font-bold uppercase tracking-wider text-primary-dark mb-8">
              {ABOUT_CORE_INTRO.solutionTitle}
            </p>
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-6 md:gap-4">
              {ABOUT_SERVICE_FLOW.map((item, index) => {
                const Icon = flowIcons[item.icon];
                return (
                  <div key={item.step} className="flex flex-col md:flex-row items-center gap-4 md:gap-2 flex-1 max-w-sm md:max-w-none mx-auto md:mx-0">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full flex-1 bg-gradient-to-br from-primary/5 to-secondary/10 border border-primary/15 rounded-3xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-dark flex items-center justify-center mb-4 shadow-lg">
                        <Icon className="w-8 h-8 text-secondary" strokeWidth={1.75} />
                      </div>
                      <p className="text-xs font-bold text-secondary-dark uppercase tracking-wider mb-1">
                        {item.short}
                      </p>
                      <h3 className="text-lg font-bold text-dark mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </motion.div>
                    {index < ABOUT_SERVICE_FLOW.length - 1 && (
                      <ArrowRight className="w-8 h-8 text-primary shrink-0 hidden md:block rotate-0" />
                    )}
                    {index < ABOUT_SERVICE_FLOW.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-primary shrink-0 md:hidden rotate-90" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cam kết */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block text-primary font-bold text-sm uppercase tracking-wider mb-3">
              03
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8">
              {ABOUT_COMMITMENTS.title}
            </h2>
            <div className="max-w-2xl mx-auto bg-primary-dark text-white rounded-3xl p-8 md:p-10 relative">
              <Quote className="w-10 h-10 text-secondary/80 absolute top-6 left-6 opacity-60" />
              <p className="text-lg md:text-xl font-medium italic leading-relaxed relative z-10 pt-6">
                &ldquo;{ABOUT_COMMITMENTS.quote}&rdquo;
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ABOUT_COMMITMENTS.items.map((item, index) => {
              const Icon = commitmentIcons[index];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary/15 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-primary-dark" />
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Lời kết + CTA */}
      <section className="py-16 md:py-24 bg-primary-dark text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, #00B5B8 0%, transparent 50%)`,
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block text-secondary font-bold text-sm uppercase tracking-wider mb-4">
              04 — Khẩu hiệu
            </span>
            <p className="text-2xl md:text-3xl font-black text-secondary mb-8 leading-snug">
              {ABOUT_CLOSING.slogan}
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {ABOUT_CLOSING.paragraph}
            </p>
            <motion.button
              type="button"
              onClick={dispatchConsultationPopup}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary-dark font-black py-5 px-10 md:px-14 rounded-2xl text-lg md:text-xl uppercase tracking-wide shadow-2xl transition-colors min-h-[3.5rem] touch-manipulation w-full sm:w-auto"
            >
              {ABOUT_CLOSING.ctaLabel}
              <ArrowRight className="w-6 h-6" />
            </motion.button>
            <p className="mt-6 text-sm text-gray-400">
              Hoặc liên hệ hotline{" "}
              <a href="tel:+84916513720" className="text-secondary font-bold hover:underline">
                0916 513 720
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
