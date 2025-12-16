"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Program {
  title: string;
  image: string;
  players: string;
  awards: string;
}

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop GSAP animation
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !title || !cardsContainer) return;

    const cardWidth = 658;
    const totalScrollWidth = cardWidth * programs.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalScrollWidth + 1500}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(title, {
      scale: 0.5,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    }).to(
      cardsContainer,
      {
        x: -totalScrollWidth,
        duration: 2,
        ease: "none",
      },
      "-=0.40"
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, programs.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <section className="bg-[#171717] w-full py-16 px-6">
        {/* Title - Single row */}
        <div className="flex items-center gap-3 mb-10">
          <h2 className="font-extrabold text-3xl sm:text-4xl leading-none uppercase [text-shadow:_-1px_-1px_0_#fff,_1px_-1px_0_#fff,_-1px_1px_0_#fff,_1px_1px_0_#fff] text-[#171717]">
            INSIDE ATHLETICO
          </h2>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            width={32}
            height={32}
            className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0"
          />
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <MobileCard program={programs[currentSlide]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {programs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-white w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Previous slide"
              >
                <svg
                  width="18"
                  height="18"
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
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Next slide"
              >
                <svg
                  width="18"
                  height="18"
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
        </div>
      </section>
    );
  }

  // Desktop Layout with GSAP Animation
  return (
    <section
      ref={sectionRef}
      className="bg-[#171717] w-full h-screen flex items-center justify-center overflow-hidden relative"
    >
      {/* Title Section - Will zoom out and fade */}
      <div
        ref={titleRef}
        className="absolute left-0 top-0 bottom-0 flex items-center pl-12 lg:pl-20 z-10 pointer-events-none"
      >
        <div className="space-y-4">
          <h2 className="font-extrabold text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717] text-left">
            INSIDE
          </h2>
          <div className="flex items-center gap-4 lg:gap-6">
            <h2 className="font-extrabold text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717] text-left">
              ATHLETICO
            </h2>
            <Image
              src="/arrow.svg"
              alt="Arrow"
              width={80}
              height={80}
              className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0"
            />
          </div>
        </div>
      </div>

      {/* Cards Container - Will slide horizontally */}
      <div
        ref={cardsContainerRef}
        className="flex gap-7 absolute left-[100vw] items-center"
      >
        {programs.map((program, index) => (
          <DesktopCard key={index} program={program} />
        ))}
      </div>
    </section>
  );
}

// ==================== MOBILE CARD COMPONENT ====================
function MobileCard({ program }: { program: Program }) {
  const words = program.title.split(" ");
  const midPoint = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, midPoint).join(" ");
  const secondLine = words.slice(midPoint).join(" ");

  return (
    <div className="bg-white w-full max-w-[320px] shadow-2xl">
      <div className="w-full flex flex-col p-5">
        {/* Image - Right aligned */}
        <div className="flex justify-end mb-4">
          <div className="relative w-[160px] h-[130px] flex-shrink-0 overflow-hidden">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
              sizes="160px"
            />
          </div>
        </div>

        {/* Title - Left aligned, two lines */}
        <div className="mb-6">
          <h3 className="text-[#171717] text-xl font-bold uppercase text-left leading-tight">
            {secondLine ? (
              <>
                {firstLine}
                <br />
                {secondLine}
              </>
            ) : (
              program.title
            )}
          </h3>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center w-full pt-4 border-t border-gray-100">
          <p className="text-[#171717]/60 text-sm font-normal">
            {program.players}
          </p>
          <p className="text-[#171717]/60 text-sm font-normal">
            {program.awards}
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== DESKTOP CARD COMPONENT ====================
function DesktopCard({ program }: { program: Program }) {
  const words = program.title.split(" ");
  const midPoint = Math.ceil(words.length / 2);
  const firstLine = words.slice(0, midPoint).join(" ");
  const secondLine = words.slice(midPoint).join(" ");

  return (
    <div className="bg-white w-[600px] h-[650px] lg:w-[630px] lg:h-[680px] shadow-2xl flex-shrink-0">
      <div className="w-full h-full flex flex-col p-10 lg:p-12">
        {/* Image - Right aligned */}
        <div className="flex justify-end mb-6">
          <div className="relative w-[320px] h-[260px] lg:w-[340px] lg:h-[280px] flex-shrink-0 overflow-hidden">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 320px, 340px"
            />
          </div>
        </div>

        {/* Title - Left aligned, two lines */}
        <div className="flex-grow flex flex-col justify-center">
          <h3 className="text-[#171717] text-3xl lg:text-4xl font-bold uppercase text-left leading-tight">
            {secondLine ? (
              <>
                {firstLine}
                <br />
                {secondLine}
              </>
            ) : (
              program.title
            )}
          </h3>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center w-full mt-auto pt-6">
          <p className="text-[#171717]/70 text-base font-normal">
            {program.players}
          </p>
          <p className="text-[#171717]/70 text-base font-normal">
            {program.awards}
          </p>
        </div>
      </div>
    </div>
  );
}
