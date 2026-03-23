"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function OurClubSection() {
  const [animationKey, setAnimationKey] = useState(0);

  // Restart animation loop
  useEffect(() => {
    const totalDuration = 8000; // Total cycle duration in ms
    const interval = setInterval(() => {
      setAnimationKey((prev) => prev + 1);
    }, totalDuration);

    return () => clearInterval(interval);
  }, []);

  const mottoLines = [
    { text: "OUR MOTTO", isBold: false, isSubtitle: false },
    { text: "LIVE YOUR PASSION", isBold: true, isSubtitle: false },
    {
      text: "BECAUSE PROGRESS COMES WHEN FOOTBALL STAYS",
      isBold: false,
      isSubtitle: true,
    },
    {
      text: "JOYFUL, CONSISTENT, AND PURPOSEFUL.",
      isBold: false,
      isSubtitle: true,
    },
  ];

  return (
    <section className="bg-[#171717] w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column - Title and Images */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Heading */}
            <h2 className="text-white font-extrabold text-3xl sm:text-4xl md:text-[45px] leading-tight uppercase mb-8 md:mb-10">
              ATHLETICO WAS CREATED
              <br />
              WITH A SIMPLE IDEA
            </h2>

            {/* Images Container */}
            <div className="flex gap-3 md:gap-4 h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
              {/* Left Image - Portrait/Vertical (narrower) */}
              <div className="relative w-[42%] h-full overflow-hidden">
                <Image
                  src="/homepage/created-with-a-idea.JPG"
                  alt="Athletico Sports Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                />
              </div>

              {/* Right Image - Landscape/Horizontal (wider) */}
              <div className="relative w-[58%] h-full overflow-hidden">
                <Image
                  src="/homepage/created-with-a-idea.JPG"
                  alt="Athletico Sports Club Training"
                  fill
                  className="object-cover object-right"
                  sizes="(max-width: 768px) 55vw, (max-width: 1024px) 35vw, 30vw"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Club Info and Motto */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            {/* Club Label */}
            <p className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-widest mb-4 md:mb-6">
              ATHLETICO SPORTS CLUB
            </p>

            {/* Mission Text */}
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mb-10 md:mb-12">
              Give young players in Lebanon the training standards and
              mentorship they deserve. Today, we continue to build a culture of
              discipline, respect, and teamwork—so every player improves on the
              pitch and grows as a person.
            </p>

            {/* Animated Motto Section */}
            <div className="min-h-[140px] md:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={animationKey}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {mottoLines.map((line, index) => (
                    <motion.p
                      key={index}
                      variants={lineVariants}
                      custom={index}
                      className={`uppercase leading-tight ${
                        line.isBold
                          ? "text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-[32px]"
                          : line.isSubtitle
                            ? "text-white/50 font-normal text-xs sm:text-sm md:text-base tracking-wide"
                            : "text-white/70 font-medium text-sm md:text-base tracking-wider"
                      }`}
                    >
                      {line.text}
                    </motion.p>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animation Variants
const lineVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    filter: "blur(4px)",
  },
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      delay: index * 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};
