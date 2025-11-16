"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface Program {
  title: string;
  image: string;
  players: string;
  awards: string;
}

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const programs: Program[] = [
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

  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress into animation values
  // Title animations - fade out in first 20% of scroll
  const titleScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Cards horizontal movement
  const cardWidth = 478; // 450px card + 28px gap
  const totalWidth = cardWidth * programs.length;

  // Start showing 2 cards (0px offset), then scroll all the way through
  const cardsX = useTransform(
    scrollYProgress,
    [0, 0.2, 1], // Start immediately, ramp up after title fades
    [0, 0, -totalWidth + 900] // Scroll through all cards
  );

  return (
    // Wrapper with extra height for scroll distance - increased for smooth scrolling
    <div style={{ height: `${400}vh` }}>
      <section
        ref={sectionRef}
        className="bg-[#171717] w-full h-screen sticky top-0 overflow-hidden p-5"
      >
        {/* Inner container - Two column layout */}
        <div className="relative w-full h-full flex items-center gap-8">
          {/* LEFT COLUMN - Title (40%) */}
          <motion.div
            style={{
              scale: titleScale,
              opacity: titleOpacity,
            }}
            className="w-[40%] flex items-center z-10"
          >
            <TitleContent />
          </motion.div>

          {/* RIGHT COLUMN - Cards (60%) */}
          <div className="w-[60%] relative h-full flex items-center overflow-hidden">
            <motion.div
              style={{ x: cardsX }}
              className="flex gap-7 absolute left-0"
            >
              {programs.map((program, index) => (
                <ProgramCard key={index} program={program} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==================== SUB-COMPONENTS ====================

function TitleContent() {
  return (
    <div className="space-y-4">
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
        {/* Custom Arrow SVG from public folder */}
        <Image
          src="/arrow.svg"
          alt="Arrow"
          width={80}
          height={80}
          className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0"
        />
      </div>
    </div>
  );
}

function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <div className="bg-white w-[450px] h-[550px] shadow-2xl flex-shrink-0 rounded-lg overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-between p-8">
        {/* Image */}
        <div className="relative w-full h-[280px] flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover"
            sizes="450px"
          />
        </div>

        {/* Title */}
        <h3 className="text-[#171717] text-2xl lg:text-3xl font-bold uppercase text-center mt-6">
          {program.title}
        </h3>

        {/* Stats */}
        <div className="flex gap-12 mt-4">
          <StatBadge label={program.players} />
          <StatBadge label={program.awards} />
        </div>
      </div>
    </div>
  );
}

function StatBadge({ label }: { label: string }) {
  return (
    <div className="text-center px-4 py-2 bg-gray-100 rounded-full">
      <p className="text-[#171717] text-sm font-medium">{label}</p>
    </div>
  );
}
