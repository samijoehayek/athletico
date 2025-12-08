"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Moment {
  image: string;
  date: string;
  title: string;
  description: string;
}

const MOMENTS: Moment[] = [
  {
    image: "/mustsee1.png",
    date: "NOVEMBER 10, 2025",
    title: "TRAINING SESSIONS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
  },
  {
    image: "/mustsee2.png",
    date: "AUGUST 13, 2025",
    title: "NUTRITION & WELLNESS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
  },
  {
    image: "/mustsee3.png",
    date: "JUNE 22, 2025",
    title: "A DAY IN THE LIFE",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
  },
  {
    image: "/mustsee1.png",
    date: "MAY 15, 2025",
    title: "MATCH HIGHLIGHTS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
  },
  {
    image: "/mustsee2.png",
    date: "APRIL 8, 2025",
    title: "PLAYER INTERVIEWS",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
  },
  {
    image: "/mustsee3.png",
    date: "MARCH 3, 2025",
    title: "BEHIND THE SCENES",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
  },
];

const DESKTOP_VISIBLE_COUNT = 3;

export default function MustSeeMomentsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = MOMENTS.length;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // For desktop/tablet: get a sliding window of 3 moments
  const getVisibleMoments = (start: number): Moment[] => {
    const visible: Moment[] = [];
    for (let i = 0; i < DESKTOP_VISIBLE_COUNT; i++) {
      visible.push(MOMENTS[(start + i + total) % total]);
    }
    return visible;
  };

  const visibleMoments = getVisibleMoments(currentIndex);

  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-12 xl:px-20 2xl:px-28 pt-10 md:pt-14 lg:pt-16 pb-16 md:pb-20">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col">
        {/* Header - Title and Navigation */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] lg:text-[50px] font-bold text-[#171717] uppercase font-outfit tracking-tight">
            MUST - SEE MOMENTS
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handlePrevious}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border-2 border-[#171717] flex items-center justify-center hover:bg-[#171717] hover:text-white transition-colors duration-300"
              aria-label="Previous"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border-2 border-[#171717] flex items-center justify-center hover:bg-[#171717] hover:text-white transition-colors duration-300"
              aria-label="Next"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop / Tablet layout: 3 cards */}
        <div className="hidden md:flex mt-10 lg:mt-12">
          <div className="flex-grow flex items-stretch justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="grid grid-cols-3 gap-6 lg:gap-8 w-full"
              >
                {visibleMoments.map((moment, index) => (
                  <MomentCard
                    key={`${moment.title}-${index}`}
                    moment={moment}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile layout: 1 card carousel */}
        <div className="mt-8 flex md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <MomentCard moment={MOMENTS[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ==================== MOMENT CARD COMPONENT ====================
function MomentCard({ moment }: { moment: Moment }) {
  return (
    <article className="flex flex-col font-outfit">
      {/* Image */}
      <div className="relative w-full h-[240px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[400px] mb-4 overflow-hidden">
        <Image
          src={moment.image}
          alt={moment.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
          priority={false}
        />
      </div>

      {/* Date */}
      <p className="text-xs sm:text-sm md:text-[16px] font-normal text-[#171717] opacity-60 mb-1 uppercase tracking-wide">
        {moment.date}
      </p>

      {/* Title */}
      <h3 className="text-lg sm:text-xl md:text-[22px] lg:text-[24px] font-bold text-[#171717] mb-2 uppercase">
        {moment.title}
      </h3>

      {/* Description with 2–3 line clamp */}
      <p className="text-[15px] sm:text-[16px] md:text-[18px] text-[#171717] leading-relaxed line-clamp-3">
        {moment.description}
      </p>
    </article>
  );
}
