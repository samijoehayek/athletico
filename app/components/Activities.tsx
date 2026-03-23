"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  href: string;
}

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const programs: Program[] = [
    {
      title: "Values",
      image: "/homepage/values.jpg",
      href: "/inside-athletico#values",
    },
    {
      title: "Mission",
      image: "/homepage/values.jpg",
      href: "/inside-athletico#mission",
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
    const gap = 28; // gap-7 = 28px
    const totalCardsWidth =
      cardWidth * programs.length + gap * (programs.length - 1);
    // Calculate how much to scroll: we start with 1 card visible, end with last card visible
    const scrollDistance = totalCardsWidth - cardWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance + 800}`,
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
        x: -scrollDistance,
        duration: 2,
        ease: "none",
      },
      "-=0.40",
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

      {/* Cards Container - Positioned to show 1 card initially */}
      <div
        ref={cardsContainerRef}
        className="flex gap-7 absolute items-center"
        style={{
          // Position so first card is visible on the right side
          // calc(100vw - cardWidth - rightPadding)
          left: "calc(100vw - 630px - 80px)",
        }}
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
  return (
    <Link
      href={program.href}
      className="block relative w-full max-w-[320px] h-[400px] overflow-hidden group"
    >
      {/* Background Image */}
      <Image
        src={program.image}
        alt={program.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="320px"
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Arrow Button - Top Right */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#171717"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Title - Bottom Left */}
      <div className="absolute bottom-6 left-6">
        <h3 className="text-white font-extrabold text-4xl uppercase">
          {program.title}
        </h3>
      </div>
    </Link>
  );
}

// ==================== DESKTOP CARD COMPONENT ====================
function DesktopCard({ program }: { program: Program }) {
  return (
    <Link
      href={program.href}
      className="block relative w-[600px] h-[650px] lg:w-[630px] lg:h-[680px] overflow-hidden flex-shrink-0 group"
    >
      {/* Background Image */}
      <Image
        src={program.image}
        alt={program.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 1024px) 600px, 630px"
      />

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Arrow Button - Top Right */}
      <div className="absolute top-8 right-8 w-16 h-16 bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-gray-100">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#171717"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      {/* Title - Bottom Left */}
      <div className="absolute bottom-10 left-10">
        <h3 className="text-white font-extrabold text-[80px] uppercase leading-none">
          {program.title}
        </h3>
      </div>
    </Link>
  );
}
