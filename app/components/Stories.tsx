"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variant } from "framer-motion";

interface Story {
  nationality: string;
  name: string;
  age: string;
  topSpeed: string;
  shootingPower: string;
  shootingAccuracy: string;
  mainImage: string;
  profileImage: string;
}

export default function TopStoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const stories: Story[] = [
    {
      nationality: "LEBANESE",
      name: "LIAM DUARTE",
      age: "AGE 15",
      topSpeed: "35.4 KM/H",
      shootingPower: "112 KM/H",
      shootingAccuracy: "82%",
      mainImage:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=200&h=200&fit=crop",
    },
    {
      nationality: "BRAZILIAN",
      name: "CARLOS SILVA",
      age: "AGE 17",
      topSpeed: "38.2 KM/H",
      shootingPower: "118 KM/H",
      shootingAccuracy: "85%",
      mainImage:
        "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&h=200&fit=crop",
    },
    {
      nationality: "SPANISH",
      name: "DIEGO MARTINEZ",
      age: "AGE 16",
      topSpeed: "36.8 KM/H",
      shootingPower: "115 KM/H",
      shootingAccuracy: "88%",
      mainImage:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=200&h=200&fit=crop",
    },
    {
      nationality: "ARGENTINIAN",
      name: "MATEO FERNANDEZ",
      age: "AGE 18",
      topSpeed: "37.5 KM/H",
      shootingPower: "120 KM/H",
      shootingAccuracy: "90%",
      mainImage:
        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&h=1000&fit=crop",
      profileImage:
        "https://images.unsplash.com/photo-1564513148692-30f17e448f3d?w=200&h=200&fit=crop",
    },
  ];

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  useEffect(() => {
    const interval = setInterval(nextStory, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentStory = stories[currentIndex];
  const nextStoryData = stories[(currentIndex + 1) % stories.length];

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
              <PlayerProfile story={currentStory} />
              <PlayerStats story={currentStory} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN - Images (Stories) */}
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
                    src={currentStory.mainImage}
                    alt={currentStory.name}
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
                nextStoryData={nextStoryData}
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
      <h2 className="text-[#3050FD] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] leading-none uppercase">
        TOP
        <div className="mt-4 lg:mt-10" />
        STORIES
      </h2>
    </div>
  );
}

// Player Profile Component (Profile pic + basic info)
function PlayerProfile({ story }: { story: Story }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#3050FD]/20">
        <Image
          src={story.profileImage}
          alt={story.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div>
        <p className="text-[#171717]/60 text-xs sm:text-sm md:text-base font-medium uppercase tracking-wide">
          {story.nationality}
        </p>
        <p className="text-[#171717] text-lg sm:text-xl md:text-2xl font-bold uppercase leading-tight">
          {story.name}
        </p>
        <p className="text-[#171717]/60 text-xs sm:text-sm md:text-base font-medium uppercase">
          {story.age}
        </p>
      </div>
    </div>
  );
}

// Player Stats Component - No background cards
function PlayerStats({ story }: { story: Story }) {
  return (
    <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-2">
      <StatCard label="TOP SPEED" value={story.topSpeed} />
      <StatCard label="SHOOTING POWER" value={story.shootingPower} />
      <StatCard label="SHOOTING ACCURACY" value={story.shootingAccuracy} />
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
  nextStoryData,
  currentIndex,
  onNext,
}: {
  nextStoryData: Story;
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
            src={nextStoryData.mainImage}
            alt={nextStoryData.name}
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

// Stat Card Component - Clean, no background
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2">
      <p className="text-[#171717]/50 text-[10px] md:text-xs font-semibold uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-[#171717] text-sm sm:text-base md:text-lg font-bold">
        {value}
      </p>
    </div>
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
