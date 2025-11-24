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
    { value: 5000, label: "Players", suffix: "+" },
    { value: 23, label: "Winning", suffix: "+" },
    { value: 500, label: "Players", suffix: "+" },
  ];

  return (
    <section className="w-full bg-white pt-10 pb-40 ">
      {/* ATHLETICO Title with Image Background */}
      <div className="mb-20">
        <h1
          className="text-[250px] font-black uppercase leading-none text-center pb-10"
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
      </div>

      {/* Statistics */}
      <div className="flex justify-around items-center">
        {stats.map((stat, index) => (
          <AnimatedStat key={index} stat={stat} />
        ))}
      </div>
    </section>
  );
}

// ==================== ANIMATED STAT COMPONENT ====================
function AnimatedStat({ stat }: { stat: Stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
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
      <div className="text-[80px] font-bold text-[#171717] leading-none">
        {count}
        {stat.suffix}
      </div>
      {/* Label */}
      <div className="text-[80px] font-normal text-[#171717] leading-tight">
        {stat.label}
      </div>
    </motion.div>
  );
}
