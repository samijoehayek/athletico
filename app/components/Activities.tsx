"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cardsContainer = cardsContainerRef.current;

    if (!section || !title || !cardsContainer) return;

    // Calculate total scroll distance needed for all cards
    const cardWidth = 628; // 600px card width + 28px gap
    const totalScrollWidth = cardWidth * programs.length;

    // Create the scroll-triggered animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${totalScrollWidth + 1500}`, // Increased for all 5 cards to show
        scrub: 1, // Smooth scrubbing effect
        pin: true, // Pin the section while scrolling
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animation sequence
    tl
      // Step 1: Zoom out and fade out the title
      .to(title, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
      // Step 2: Slide cards from right to left - starts halfway through title fade
      .to(
        cardsContainer,
        {
          x: -totalScrollWidth,
          duration: 2,
          ease: "none",
        },
        "-=0.40" // Start cards earlier - halfway through title animation
      );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [programs.length]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#171717] w-full h-screen flex items-center justify-center overflow-hidden relative"
    >
      {/* Title Section - CENTERED but text left-aligned - Will zoom out and fade */}
      <div
        ref={titleRef}
        className="absolute left-0 top-0 bottom-0 flex items-center pl-20 z-10 pointer-events-none"
      >
        <div className="space-y-4">
          <h2 className="font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717] text-left">
            WE
          </h2>
          <h2 className="font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717] text-left">
            MAKE IT
          </h2>
          <div className="flex items-center gap-4 lg:gap-6">
            <h2 className="font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff] text-[#171717] text-left">
              HAPPEN
            </h2>
            <Image
              src="/arrow.svg"
              alt="Arrow"
              width={80}
              height={80}
              className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex-shrink-0"
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
          <ProgramCard key={index} program={program} />
        ))}
      </div>
    </section>
  );
}

// ==================== PROGRAM CARD COMPONENT ====================
function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="bg-white w-[600px] h-[650px] shadow-2xl flex-shrink-0">
      <div className="w-full h-full flex flex-col p-8">
        {/* Image - Right aligned, 300x250 - Square corners */}
        <div className="flex justify-end mb-6">
          <div className="relative w-[300px] h-[250px] flex-shrink-0 overflow-hidden">
            <Image
              src={program.image}
              alt={program.title}
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        </div>

        {/* Title - Centered */}
        <h3 className="text-[#171717] text-3xl lg:text-4xl font-bold uppercase text-center flex-grow flex items-center justify-center">
          {program.title}
        </h3>

        {/* Stats - Full width with space between - No background */}
        <div className="flex justify-between items-center w-full mt-auto">
          <div className="text-center">
            <p className="text-[#171717] text-base font-normal">
              {program.players}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#171717] text-base font-normal">
              {program.awards}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
