"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Program {
  title: string;
  image: string;
  href: string;
}

export default function ProgramsSection() {
  const programs: Program[] = [
    {
      title: "Vision",
      image: "/homepage/main.jpg",
      href: "/inside-athletico#vision",
    },
    {
      title: "Mission",
      image: "/homepage/mission.jpg",
      href: "/inside-athletico#mission",
    },
    {
      title: "Values",
      image: "/homepage/values.jpg",
      href: "/inside-athletico#values",
    },
  ];

  const total = programs.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + total) % total);
  };
  const goNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % total);
  };
  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  // Gentle autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [total]);

  const active = programs[index];

  const slideVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -80 }),
  };

  return (
    <section className="bg-[#0B3E80] w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-3 md:gap-5">
            <h2 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-none uppercase tracking-tight [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff] text-[#0B3E80]">
              INSIDE ATHLETICO
            </h2>
            <Image
              src="/arrow.svg"
              alt="Arrow"
              width={56}
              height={56}
              className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 flex-shrink-0"
            />
          </div>

          {/* Arrow Buttons */}
          <div className="hidden sm:flex gap-3 flex-shrink-0">
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="w-11 h-11 md:w-12 md:h-12 border border-white/30 hover:border-[#2B87C8] hover:bg-[#2B87C8] text-white flex items-center justify-center transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              aria-label="Next"
              className="w-11 h-11 md:w-12 md:h-12 border border-white/30 hover:border-[#2B87C8] hover:bg-[#2B87C8] text-white flex items-center justify-center transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative w-full h-[360px] sm:h-[440px] md:h-[520px] lg:h-[600px] overflow-hidden">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Link href={active.href} className="block relative w-full h-full group">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1536px) 100vw, 1536px"
                  priority
                />

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Arrow Button - Top Right */}
                <div className="absolute top-5 right-5 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0B3E80"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 md:w-6 md:h-6"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Title - Bottom Left */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <h3 className="text-white font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[90px] uppercase leading-none">
                    {active.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots + mobile arrows */}
        <div className="flex items-center justify-between mt-6 md:mt-8">
          <div className="flex gap-2">
            {programs.map((program, i) => (
              <button
                key={program.title}
                onClick={() => goTo(i)}
                aria-label={`Go to ${program.title}`}
                className={`h-1.5 transition-all ${
                  i === index ? "w-8 bg-[#2B87C8]" : "w-4 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex sm:hidden gap-3">
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="w-10 h-10 border border-white/30 text-white flex items-center justify-center transition-all active:bg-[#2B87C8]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              aria-label="Next"
              className="w-10 h-10 border border-white/30 text-white flex items-center justify-center transition-all active:bg-[#2B87C8]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
