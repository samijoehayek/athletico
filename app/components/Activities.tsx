"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProgramsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const programs = [
    {
      title: "Goalkeeper Training",
      image:
        "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=400&h=300&fit=crop",
      players: "200+ Players",
      awards: "6 awards",
    },
    {
      title: "Elite Player Program",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=300&fit=crop",
      players: "200+ Players",
      awards: "8 awards",
    },
    {
      title: "Youth Development",
      image:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
      players: "150+ Players",
      awards: "5 awards",
    },
    {
      title: "Advanced Tactics",
      image:
        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&h=300&fit=crop",
      players: "100+ Players",
      awards: "4 awards",
    },
    {
      title: "Fitness Training",
      image:
        "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&h=300&fit=crop",
      players: "250+ Players",
      awards: "7 awards",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % programs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [programs.length]);

  const currentProgram = programs[currentIndex];
  const nextProgram = programs[(currentIndex + 1) % programs.length];

  return (
    <section className="bg-[#171717] w-full min-h-screen flex items-center px-6 md:px-12 lg:px-16 py-12 md:py-16 overflow-hidden">
      <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column - Title (40%) */}
        <div className="lg:w-[40%] flex items-center">
          <div className="space-y-2">
            <h2 className="font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717]">
              WE
            </h2>
            <h2 className="font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717]">
              MAKE IT
            </h2>
            <div className="flex items-center gap-4 lg:gap-6">
              <h2 className="font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717]">
                HAPPEN
              </h2>
              <svg
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 text-white flex-shrink-0"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column - Cards (60%) */}
        <div className="lg:w-[60%] flex items-end justify-end relative h-[500px] md:h-[600px]">
          <div className="relative w-full h-full flex items-end justify-end">
            <AnimatePresence mode="popLayout">
              {/* Main Card */}
              <motion.div
                key={`main-${currentIndex}`}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute bottom-0 right-0 bg-white w-[90%] md:w-[450px] h-[480px] shadow-2xl z-20"
              >
                <div className="w-full h-full flex flex-col items-center justify-between p-6 md:p-8">
                  {/* Image */}
                  <div className="relative w-full h-[200px] md:h-[250px] flex-shrink-0">
                    <Image
                      src={currentProgram.image}
                      alt={currentProgram.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[#171717] text-xl md:text-2xl lg:text-3xl font-bold uppercase text-center mt-6">
                    {currentProgram.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex gap-8 md:gap-12 mt-4">
                    <div className="text-center">
                      <p className="text-[#171717] text-sm md:text-base font-normal">
                        {currentProgram.players}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#171717] text-sm md:text-base font-normal">
                        {currentProgram.awards}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Next Card (Partial View) */}
              <motion.div
                key={`next-${currentIndex}`}
                initial={{ x: 300, opacity: 0.5 }}
                animate={{ x: 225, opacity: 0.7 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute bottom-0 right-0 bg-white w-[90%] md:w-[450px] h-[480px] shadow-xl z-10"
              >
                <div className="w-full h-full flex flex-col items-center justify-between p-6 md:p-8">
                  {/* Image */}
                  <div className="relative w-full h-[200px] md:h-[250px] flex-shrink-0">
                    <Image
                      src={nextProgram.image}
                      alt={nextProgram.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[#171717] text-xl md:text-2xl lg:text-3xl font-bold uppercase text-center mt-6">
                    {nextProgram.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex gap-8 md:gap-12 mt-4">
                    <div className="text-center">
                      <p className="text-[#171717] text-sm md:text-base font-normal">
                        {nextProgram.players}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-[#171717] text-sm md:text-base font-normal">
                        {nextProgram.awards}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
