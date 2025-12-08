"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export default function StatisticsSection() {
  const stats: Stat[] = [
    { value: 12, label: "Branches", suffix: "" },
    { value: 2300, label: "Players", suffix: "+" },
    { value: 80, label: "Coaches", suffix: "+" },
  ];

  return (
    <section className="w-full bg-white pb-20 md:pb-32 lg:pb-40 overflow-hidden">
      {/* ATHLETICO Title with Image Background */}
      <div className="mb-10 md:mb-16 lg:mb-20 w-full">
        {/* Mobile Title */}
        <h1
          className="block md:hidden text-[80px] sm:text-[100px] font-black uppercase leading-none text-center"
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
            fontSize: "clamp(150px, 18vw, 300px)",
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
      <div className="text-[60px] lg:text-[80px] font-bold text-[#171717] leading-none">
        {count}
        {stat.suffix}
      </div>
      {/* Label */}
      <div className="text-[60px] lg:text-[80px] font-normal text-[#171717] leading-tight">
        {stat.label}
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
      <div className="text-3xl sm:text-4xl font-bold text-[#171717] leading-none mb-1">
        {count}
        {stat.suffix}
      </div>
      {/* Label */}
      <div className="text-sm sm:text-base font-normal text-[#171717]/70">
        {stat.label}
      </div>
    </motion.div>
  );
}
