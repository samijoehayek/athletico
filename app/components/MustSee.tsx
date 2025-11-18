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

export default function MustSeeMomentsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of moment sets (each set contains 3 moments)
  const momentSets: Moment[][] = [
    [
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
    ],
    // Add more sets here for additional carousel slides
    [
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
    ],
  ];

  const currentMoments = momentSets[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? momentSets.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === momentSets.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full h-[90vh] bg-white flex items-center justify-center px-[200px] py-60">
      <div className="w-full h-full flex flex-col">
        {/* Header - Title and Navigation */}
        <div className="flex justify-between items-center">
          {/* Title */}
          <h2 className="text-[50px] font-bold text-[#171717] uppercase font-outfit">
            MUST - SEE MOMENTS
          </h2>

          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button
              onClick={handlePrevious}
              className="w-14 h-14 rounded-full border-2 border-[#171717] flex items-center justify-center hover:bg-[#171717] hover:text-white transition-colors duration-300"
              aria-label="Previous"
            >
              <svg
                width="24"
                height="24"
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
              className="w-14 h-14 rounded-full border-2 border-[#171717] flex items-center justify-center hover:bg-[#171717] hover:text-white transition-colors duration-300"
              aria-label="Next"
            >
              <svg
                width="24"
                height="24"
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

        {/* Content - Three Columns */}
        <div className="flex-grow flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-3 gap-8 w-full"
            >
              {currentMoments.map((moment, index) => (
                <MomentCard key={index} moment={moment} />
              ))}
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
    <div className="flex flex-col font-outfit">
      {/* Image */}
      <div className="relative w-full h-[400px] mb-4 overflow-hidden">
        <Image
          src={moment.image}
          alt={moment.title}
          fill
          className="object-cover"
          sizes="33vw"
        />
      </div>

      {/* Date */}
      <p className="text-[16px] font-normal text-[#171717] opacity-50 mb-2 uppercase">
        {moment.date}
      </p>

      {/* Title */}
      <h3 className="text-[25px] font-bold text-[#171717] mb-3 uppercase">
        {moment.title}
      </h3>

      {/* Description */}
      <p className="text-[22px] font-normal text-[#171717] leading-relaxed">
        {moment.description}
      </p>
    </div>
  );
}
