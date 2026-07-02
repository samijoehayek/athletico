"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Achievement {
  title: string;
  ageCategory: string;
  season: string;
  tournament: string;
  image: string;
}

// Normalize a messy season string ("22/23", "2023/2024", "2024-2025") into a
// consistent display label ("2022/23") and a sortable numeric key.
function normalizeSeason(season: string): { label: string; sort: number } {
  const nums = (season.match(/\d+/g) || []).map(Number);
  const to4 = (n: number) => (n < 100 ? 2000 + n : n);
  if (nums.length >= 2) {
    const start = to4(nums[0]);
    const end = to4(nums[1]);
    return { label: `${start}/${String(end).slice(2)}`, sort: end };
  }
  if (nums.length === 1) {
    const y = to4(nums[0]);
    return { label: `${y}`, sort: y };
  }
  return { label: season, sort: 0 };
}

export default function AchievementsPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Achievements Slider Section */}
      <AchievementsSliderSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  const diagonalAngle = 12;

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      {/* White Background (Top) */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% ${100 - diagonalAngle}%, 0 100%)`,
        }}
      />

      {/* Dark Background (Bottom) */}
      <div
        className="absolute inset-0 bg-[#171717]"
        style={{
          clipPath: `polygon(0 100%, 100% ${100 - diagonalAngle}%, 100% 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {/* Navbar */}
        <Navbar mode="dark" />

        {/* Title and Image Container */}
        <div className="px-6 md:px-12 lg:px-16 relative h-[calc(100%-80px)]">
          <div className="max-w-screen-2xl mx-auto relative h-full">
            {/* Title - Centered vertically */}
            <div className="relative z-10 h-full flex flex-col justify-center pb-20">
              <p className="text-[#171717] font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-wide mb-1">
                ATHLETICO
              </p>
              <h1 className="text-[#171717] font-extrabold text-5xl sm:text-7xl md:text-[100px] lg:text-[140px] xl:text-[180px] uppercase leading-none tracking-tight">
                ACHIEVEMENTS
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== ACHIEVEMENTS SLIDER SECTION ====================
function AchievementsSliderSection() {
  const achievements: Achievement[] = [
    {
      title: "ATHLETICO MATEN 2013",
      ageCategory: "U12",
      season: "2024-2025",
      tournament: "PROMISING",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO 2011",
      ageCategory: "U12",
      season: "22/23",
      tournament: "PROMISING",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO 2012",
      ageCategory: "U11",
      season: "23/24",
      tournament: "PROMISING",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO 2010",
      ageCategory: "U13",
      season: "2023/2024",
      tournament: "LEBANESE LEAGUE U13",
      image: "/logonew.png",
    },
    {
      title: "MOUNT LEBANON CHAMPIONS",
      ageCategory: "U16",
      season: "2022/23",
      tournament: "ATHLETICO 2007",
      image: "/logonew.png",
    },
    {
      title: "LEBANESE LEAGUE CHAMPIONS",
      ageCategory: "U16",
      season: "2023/24",
      tournament: "ATHLETICO 2007",
      image: "/logonew.png",
    },
    {
      title: "MOUNT LEBANON CHAMPIONS",
      ageCategory: "U16",
      season: "2023/24",
      tournament: "ATHLETICO 2007",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO SENIOR TEAM",
      ageCategory: "SENIOR",
      season: "2023/2024",
      tournament: "LEBANESE LEAGUE DIV.5 CHAMPIONS • PROMOTION TO 3RD DIVISION",
      image: "/logonew.png",
    },
  ];

  const withYear = achievements.map((a) => ({
    ...a,
    year: normalizeSeason(a.season),
  }));

  // Unique year labels, sorted chronologically, for the year navigation.
  const years = Array.from(new Set(withYear.map((a) => a.year.label)))
    .map((label) => ({
      label,
      sort: withYear.find((a) => a.year.label === label)!.year.sort,
    }))
    .sort((a, b) => a.sort - b.sort);

  const total = withYear.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    const clamped = (next + total) % total;
    setDirection(clamped >= index ? 1 : -1);
    setIndex(clamped);
  };
  const goNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  };
  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  };
  const jumpToYear = (label: string) => {
    const next = withYear.findIndex((a) => a.year.label === label);
    if (next !== -1) goTo(next);
  };

  const active = withYear[index];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <section className="bg-[#171717] w-full px-6 md:px-12 lg:px-16 py-14 md:py-20">
      <div className="max-w-screen-2xl mx-auto">
        {/* Year Navigation */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-10 md:mb-14">
          {years.map((y) => (
            <button
              key={y.label}
              onClick={() => jumpToYear(y.label)}
              className={`px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wide border transition-all ${
                y.label === active.year.label
                  ? "bg-[#3050FD] border-[#3050FD] text-white"
                  : "border-white/20 text-white/60 hover:border-white/50 hover:text-white"
              }`}
            >
              {y.label}
            </button>
          ))}
        </div>

        {/* Active Year */}
        <p className="text-center text-[#3050FD] font-extrabold text-4xl md:text-5xl lg:text-6xl uppercase leading-none mb-8 md:mb-12">
          {active.year.label}
        </p>

        {/* Slider */}
        <div className="relative">
          {/* Side arrows (desktop) */}
          <button
            onClick={goPrev}
            aria-label="Previous achievement"
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 border border-white/30 hover:border-[#3050FD] hover:bg-[#3050FD] text-white items-center justify-center transition-all"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next achievement"
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 border border-white/30 hover:border-[#3050FD] hover:bg-[#3050FD] text-white items-center justify-center transition-all"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="min-h-[440px] md:min-h-[420px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20"
              >
                {/* Logo + Title */}
                <div className="flex flex-col items-center gap-6 flex-shrink-0">
                  <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden bg-white border-4 border-[#3050FD] flex items-center justify-center">
                    <Image
                      src={active.image}
                      alt={active.title}
                      fill
                      className="object-contain p-10"
                      sizes="320px"
                    />
                  </div>
                  <h3 className="text-white font-extrabold text-xl lg:text-2xl uppercase leading-tight text-center max-w-[320px]">
                    {active.title}
                  </h3>
                </div>

                {/* Stats */}
                <div className="flex flex-col gap-5 md:gap-6 w-full max-w-[340px]">
                  <Stat label="AGE CATEGORY" value={active.ageCategory} />
                  <Stat label="SEASON" value={active.year.label} />
                  <Stat label="TOURNAMENT" value={active.tournament} last />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex items-center justify-center gap-6 mt-10 md:mt-12">
          {/* Mobile arrows */}
          <button
            onClick={goPrev}
            aria-label="Previous achievement"
            className="lg:hidden w-11 h-11 border border-white/30 text-white flex items-center justify-center transition-all active:bg-[#3050FD]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {withYear.map((a, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to achievement ${i + 1}`}
                className={`h-1.5 transition-all ${
                  i === index ? "w-8 bg-[#3050FD]" : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Mobile arrows */}
          <button
            onClick={goNext}
            aria-label="Next achievement"
            className="lg:hidden w-11 h-11 border border-white/30 text-white flex items-center justify-center transition-all active:bg-[#3050FD]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Counter */}
        <p className="text-center text-white/40 text-sm font-medium mt-5 tracking-widest">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}

// ==================== STAT ROW ====================
function Stat({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div className={last ? "" : "border-b border-white/15 pb-5"}>
      <p className="text-white font-bold text-lg md:text-xl lg:text-2xl uppercase leading-tight">
        {value}
      </p>
      <p className="text-white/50 text-xs md:text-sm uppercase tracking-wide mt-1">
        {label}
      </p>
    </div>
  );
}
