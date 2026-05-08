"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Achievement {
  title: string;
  ageCategory: string;
  season: string;
  tournament: string;
  image: string;
}

export default function AchievementsPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Achievements Carousel Section */}
      <AchievementsCarouselSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  const diagonalAngle = 12;

  return (
    <section className="relative w-full h-[60vh] overflow-hidden">
      {/* White Background (Top) */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% ${100 - diagonalAngle}%, 0 100%)`,
        }}
      />

      {/* Dark Background (Bottom) */}
      <div
        className="absolute inset-0 bg-[#171717]"
        style={{
          clipPath: `polygon(0 100%, 100% ${100 - diagonalAngle}%, 100% 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {/* Navbar */}
        <Navbar mode="dark" />

        {/* Title and Image Container */}
        <div className="px-6 md:px-12 lg:px-16 relative h-[calc(100%-80px)]">
          <div className="max-w-screen-2xl mx-auto relative h-full">
            {/* Title - Centered vertically */}
            <div className="relative z-10 h-full flex flex-col justify-center pb-20">
              <p className="text-[#171717] font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-wide mb-1">
                ATHLETICO
              </p>
              <h1 className="text-[#171717] font-extrabold text-5xl sm:text-7xl md:text-[100px] lg:text-[140px] xl:text-[180px] uppercase leading-none tracking-tight">
                ACHIEVEMENTS
              </h1>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== ACHIEVEMENTS CAROUSEL SECTION ====================
function AchievementsCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const achievements: Achievement[] = [
    {
      title: "ATHLETICO MATEN 2013",
      ageCategory: "U12",
      season: "2024-2025",
      tournament: "PROMISING",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO 2011",
      ageCategory: "U12",
      season: "22/23",
      tournament: "PROMISING",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO 2012",
      ageCategory: "U11",
      season: "23/24",
      tournament: "PROMISING",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO 2010",
      ageCategory: "U13",
      season: "2023/2024",
      tournament: "LEBANESE LEAGUE U13",
      image: "/logonew.png",
    },
    {
      title: "MOUNT LEBANON CHAMPIONS",
      ageCategory: "U16",
      season: "2022/23",
      tournament: "ATHLETICO 2007",
      image: "/logonew.png",
    },
    {
      title: "LEBANESE LEAGUE CHAMPIONS",
      ageCategory: "U16",
      season: "2023/24",
      tournament: "ATHLETICO 2007",
      image: "/logonew.png",
    },
    {
      title: "MOUNT LEBANON CHAMPIONS",
      ageCategory: "U16",
      season: "2023/24",
      tournament: "ATHLETICO 2007",
      image: "/logonew.png",
    },
    {
      title: "ATHLETICO SENIOR TEAM",
      ageCategory: "SENIOR",
      season: "2023/2024",
      tournament: "LEBANESE LEAGUE DIV.5 CHAMPIONS • PROMOTION TO 3RD DIVISION",
      image: "/logonew.png",
    },
  ];

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP horizontal scroll animation
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    const carousel = carouselRef.current;

    if (!section || !container || !carousel) return;

    const cardWidth = 950; // Bigger cards (circular logo)
    const gap = 80; // More space between cards
    const totalWidth = (cardWidth + gap) * achievements.length;
    const scrollDistance = totalWidth - window.innerWidth + 100;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 1,
        pin: container,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(carousel, {
      x: -scrollDistance,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile, achievements.length]);

  // Mobile Layout
  if (isMobile) {
    return (
      <section className="bg-[#171717] w-full py-12 px-4">
        <div className="space-y-10">
          {achievements.map((achievement, index) => (
            <MobileAchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </section>
    );
  }

  // Desktop Layout with GSAP
  return (
    <section ref={sectionRef} className="bg-[#171717] w-full relative">
      <div
        ref={containerRef}
        className="h-[70vh] flex items-center overflow-hidden"
      >
        <div ref={carouselRef} className="flex gap-20 pl-16 lg:pl-24">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== ACHIEVEMENT CARD (DESKTOP) ====================
function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="flex items-center gap-12 flex-shrink-0">
      {/* Logo (Circular) with Title Overlay */}
      <div className="relative w-[500px] h-[500px] lg:w-[550px] lg:h-[550px] flex-shrink-0">
        {/* Circular Logo Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-white border-4 border-[#3050FD] flex items-center justify-center">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-contain p-12"
            sizes="500px"
          />
        </div>

        {/* Title Box - half over circle, half outside */}
        <div className="absolute bottom-12 -left-24 bg-[#171717] px-8 py-5 min-w-[280px] z-10">
          <h3 className="text-white font-extrabold text-2xl lg:text-3xl uppercase leading-tight">
            {achievement.title}
          </h3>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col justify-center gap-8 w-[250px]">
        {/* Age Category */}
        <div className="border-b border-white/20 pb-5">
          <p className="text-white font-bold text-xl lg:text-2xl uppercase">
            {achievement.ageCategory}
          </p>
          <p className="text-white/60 text-sm uppercase tracking-wide mt-1">
            AGE CATEGORY
          </p>
        </div>

        {/* Season */}
        <div className="border-b border-white/20 pb-5">
          <p className="text-white font-bold text-xl lg:text-2xl uppercase">
            {achievement.season}
          </p>
          <p className="text-white/60 text-sm uppercase tracking-wide mt-1">
            SEASON
          </p>
        </div>

        {/* Tournament */}
        <div>
          <p className="text-white font-bold text-xl lg:text-2xl uppercase leading-tight">
            {achievement.tournament}
          </p>
          <p className="text-white/60 text-sm uppercase tracking-wide mt-1">
            TOURNAMENT
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== MOBILE ACHIEVEMENT CARD ====================
function MobileAchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className="flex flex-col items-center">
      {/* Circular Logo with Title Overlay */}
      <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
        {/* Circular Logo Container */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-white border-4 border-[#3050FD] flex items-center justify-center">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-contain p-8"
            sizes="380px"
          />
        </div>

        {/* Title Box */}
        <div className="absolute bottom-4 -left-2 bg-[#171717] px-5 py-4 z-10">
          <h3 className="text-white font-extrabold text-xl uppercase leading-tight">
            {achievement.title}
          </h3>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between gap-4 mt-6 px-2">
        {/* Age Category */}
        <div>
          <p className="text-white font-bold text-base uppercase">
            {achievement.ageCategory}
          </p>
          <p className="text-white/60 text-xs uppercase">AGE CATEGORY</p>
        </div>

        {/* Season */}
        <div>
          <p className="text-white font-bold text-base uppercase">
            {achievement.season}
          </p>
          <p className="text-white/60 text-xs uppercase">SEASON</p>
        </div>

        {/* Tournament */}
        <div className="max-w-[140px]">
          <p className="text-white font-bold text-base uppercase leading-tight">
            {achievement.tournament}
          </p>
          <p className="text-white/60 text-xs uppercase">TOURNAMENT</p>
        </div>
      </div>
    </div>
  );
}
