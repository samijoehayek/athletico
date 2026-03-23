"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variant } from "framer-motion";

interface Graduate {
  name: string;
  position: string;
  advice: string;
  mainImage: string;
  profileImage: string;
}

export default function TopStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const graduates: Graduate[] = [
    {
      name: "PHILIPPE PAOLI",
      position: "STRIKER",
      advice:
        "Give it your all in every training & every game. Cherish every moment with your teammates — you will make friends for life.",
      mainImage: "/athletico-graduates/philippe-paoli-main.jpg",
      profileImage: "/athletico-graduates/philippe-paoli-profile.jpg",
    },
    {
      name: "MARTIN BOU YOUNES",
      position: "MIDFIELDER",
      advice:
        "Enjoy every single moment when you step on that field. This club isn't just about football — it's about family, friendship, and memories.",
      mainImage: "/athletico-graduates/martin-bou-younes-main.jpg",
      profileImage: "/athletico-graduates/martin-bou-younes-profile.jpg",
    },
    {
      name: "ASSAF ANTOINE",
      position: "MIDFIELDER",
      advice:
        "Keep working hard and believing in yourself.",
      mainImage: "/athletico-graduates/assaf-antoine-main.jpg",
      profileImage: "/athletico-graduates/assaf-antoine-profile.jpg",
    },
    {
      name: "KASSEM HAYEK",
      position: "DEFENSIVE MIDFIELDER",
      advice:
        "Push yourself every single day, stay humble, and never settle — greatness comes from hard work and sacrifice.",
      mainImage: "/athletico-graduates/kassem-hayek-main.jpg",
      profileImage: "/athletico-graduates/kassem-hayek-profile.jpg",
    },
    {
      name: "JACQUES MATTA",
      position: "MIDFIELDER",
      advice:
        "Consistency is key. Work hard but always ask for advice. Don't forget that it's your passion.",
      mainImage: "/athletico-graduates/jacques-matta-main.jpg",
      profileImage: "/athletico-graduates/jacques-matta-profile.jpg",
    },
    {
      name: "RALPH KHOURY",
      position: "STRIKER / RIGHT WING",
      advice:
        "Enjoy the game and stay patient. Hard work and consistency will always pay off, even when it doesn't show right away.",
      mainImage: "/athletico-graduates/ralph-khoury-main.jpg",
      profileImage: "/athletico-graduates/ralph-khoury-profile.jpg",
    },
    {
      name: "HADI JAD KHALIL",
      position: "CAM / CM",
      advice:
        "Without discipline, you won't make it far.",
      mainImage: "/athletico-graduates/hadi-jad-khalil-main.jpg",
      profileImage: "/athletico-graduates/hadi-jad-khalil-profile.jpg",
    },
  ];

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % graduates.length);
  };

  useEffect(() => {
    const interval = setInterval(nextStory, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentGraduate = graduates[currentIndex];
  const nextGraduate = graduates[(currentIndex + 1) % graduates.length];

  return (
    <section className="bg-white w-full min-h-screen lg:h-[90vh] overflow-hidden">
      {/* Main Container */}
      <div className="h-full px-6 md:px-10 lg:pl-40 lg:pr-10 py-10 flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN - Title and Player Info */}
        <div className="lg:w-[40%] flex flex-col justify-center lg:mb-40">
          {/* Title Section */}
          <TitleSection />

          {/* Player Info with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={playerInfoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="mt-6 space-y-6"
            >
              <PlayerProfile graduate={currentGraduate} />
              <PlayerAdvice advice={currentGraduate.advice} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN - Images */}
        <div className="lg:w-[60%] flex items-center justify-center lg:justify-end">
          {/* Images Container - Flex row, bottom aligned */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 lg:gap-6">
            {/* Main Image - Portrait 500x700 */}
            <div className="relative w-[300px] h-[420px] sm:w-[400px] sm:h-[560px] lg:w-[500px] lg:h-[700px] overflow-hidden shadow-2xl flex-shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  variants={mainImageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src={currentGraduate.mainImage}
                    alt={currentGraduate.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 500px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Up Section - Aligned to bottom */}
            <div className="flex flex-col gap-2 self-end">
              <NextUpLabel />
              <NextUpImage
                nextGraduate={nextGraduate}
                currentIndex={currentIndex}
                onNext={nextStory}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== SUB-COMPONENTS ====================

// Title Section Component
function TitleSection() {
  return (
    <div className="mb-4">
      <h2 className="text-[#3050FD] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[88px] leading-none uppercase">
        ATHLETICO
        <div className="mt-4 lg:mt-10" />
        GRADUATES
      </h2>
    </div>
  );
}

// Player Profile Component (Profile pic + basic info)
function PlayerProfile({ graduate }: { graduate: Graduate }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#3050FD]/20">
        <Image
          src={graduate.profileImage}
          alt={graduate.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div>
        <p className="text-[#171717] text-lg sm:text-xl md:text-2xl font-bold uppercase leading-tight">
          {graduate.name}
        </p>
        <p className="text-[#171717]/60 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wide">
          {graduate.position}
        </p>
      </div>
    </div>
  );
}

// Player Advice Component - Replaces stats
function PlayerAdvice({ advice }: { advice: string }) {
  return (
    <div className="pt-2 max-w-md">
      <p className="text-[#171717]/50 text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-2">
        ADVICE TO YOUNG PLAYERS
      </p>
      <p className="text-[#171717]/70 text-sm md:text-base italic leading-relaxed">
        &ldquo;{advice}&rdquo;
      </p>
    </div>
  );
}

// Next Up Label Component
function NextUpLabel() {
  return (
    <div className="mb-1">
      <p className="text-[#171717] text-xs md:text-sm font-bold uppercase tracking-wider">
        NEXT UP
      </p>
    </div>
  );
}

// Next Up Image Component - Square, bigger, no rounded corners
function NextUpImage({
  nextGraduate,
  currentIndex,
  onNext,
}: {
  nextGraduate: Graduate;
  currentIndex: number;
  onNext: () => void;
}) {
  return (
    <motion.div
      className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[350px] overflow-hidden shadow-xl cursor-pointer"
      onClick={onNext}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`next-${currentIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={nextGraduate.mainImage}
            alt={nextGraduate.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 280px, 350px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// ==================== ANIMATION VARIANTS ====================

const mainImageVariants = {
  enter: {
    y: "100%",
    opacity: 0,
    scale: 0.8,
  } as Variant,
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1],
    },
  } as Variant,
  exit: {
    y: "-100%",
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1],
    },
  } as Variant,
};

const playerInfoVariants = {
  enter: {
    opacity: 0,
    x: -20,
  } as Variant,
  center: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.2,
    },
  } as Variant,
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  } as Variant,
};
