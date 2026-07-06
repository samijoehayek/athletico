"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  label: string; // main (big)
  subLabel?: string; // second line (smaller)
  suffix?: string;
}

export default function StatisticsSection() {
  const stats: Stat[] = [
    { value: 10, label: "Branches", subLabel: "Across Lebanon" },
    { value: 2300, label: "Players", subLabel: "450+ Financial Aids", suffix: "+" },
    { value: 80, label: "Coaches", subLabel: "FIFA Certified", suffix: "+" },
  ];

  return (
    <section className="w-full bg-[#F1EAEA] pb-12 md:pb-16 lg:pb-20 overflow-hidden">
      {/* ATHLETICO Title with Image Background */}
      <div className="mb-10 md:mb-16 lg:mb-20 w-full">
        {/* Mobile Title */}
        <h1
          className="block md:hidden text-[64px] sm:text-[84px] font-black uppercase leading-none text-center"
          style={{
            backgroundImage: "url('/tennis.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          ATHLETICO
        </h1>

        {/* Desktop Title - Full width */}
        <h1
          className="hidden md:block font-black uppercase leading-none text-center"
          style={{
            fontSize: "clamp(108px, 14.5vw, 225px)",
            backgroundImage: "url('/tennis.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          ATHLETICO
        </h1>
      </div>

      {/* Statistics - Desktop */}
      <div className="hidden md:flex justify-center items-center gap-16 lg:gap-24 xl:gap-32">
        {stats.map((stat, index) => (
          <AnimatedStat key={index} stat={stat} />
        ))}
      </div>

      {/* Statistics - Mobile */}
      <div className="md:hidden px-6">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <AnimatedStatMobile key={index} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== ANIMATED STAT COMPONENT (DESKTOP) ====================
function AnimatedStat({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * stat.value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      {/* Number */}
      <div className="text-[54px] lg:text-[72px] font-bold text-[#0B3E80] leading-none">
        {count}
        {stat.suffix}
      </div>
      {/* Label */}
      {/* Label */}
      <div className="leading-tight">
        <div className="text-[54px] lg:text-[72px] font-normal text-[#0B3E80]">
          {stat.label}
        </div>

        {stat.subLabel && (
          <div className="mt-1 text-base lg:text-xl font-medium tracking-wide uppercase text-[#0B3E80]/60">
            {stat.subLabel}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==================== ANIMATED STAT COMPONENT (MOBILE) ====================
function AnimatedStatMobile({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * stat.value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      {/* Number */}
      <div className="text-3xl sm:text-4xl font-bold text-[#0B3E80] leading-none mb-1">
        {count}
        {stat.suffix}
      </div>
      {/* Label */}
      {/* Label */}
      <div className="leading-tight">
        <div className="text-sm sm:text-base font-semibold text-[#0B3E80]/80">
          {stat.label}
        </div>

        {stat.subLabel && (
          <div className="text-[11px] sm:text-xs font-medium uppercase tracking-wide text-[#0B3E80]/50">
            {stat.subLabel}
          </div>
        )}
      </div>
    </motion.div>
  );
}
