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

export default function OlympiqueLyonnaisPage() {
  return (
    <main className="bg-white">
      {/* Navbar */}
      <Navbar mode="dark" />

      {/* Partnership Intro Section */}
      <PartnershipIntroSection />

      {/* Stacking Cards Section */}
      <StackingCardsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ==================== PARTNERSHIP INTRO SECTION ====================
function PartnershipIntroSection() {
  return (
    <section className="bg-white w-full px-6 md:px-12 lg:px-16 py-24 md:pt-32 lg:pt-40">
      <div className="max-w-screen-2xl mx-auto">
        {/* Title */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h1 className="text-[#171717] font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-2 md:mb-4">
            OUR PARTNERSHIP WITH
          </h1>
          <h2 className="text-[#171717] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px] uppercase leading-none tracking-tight">
            OLYMPIQUE LYONNAIS
          </h2>
        </div>

        {/* Content - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column - Text */}
          <div className="w-full lg:w-[55%]">
            {/* Club Label */}
            <p className="text-[#171717]/50 text-xs md:text-sm font-medium uppercase tracking-widest mb-3 md:mb-4">
              ATHLETICO SPORTS CLUB
            </p>

            {/* Heading */}
            <h3 className="text-[#171717] font-bold text-xl sm:text-2xl md:text-3xl uppercase leading-tight mb-6 md:mb-8">
              A CLUB WITH A MISSION
            </h3>

            {/* Paragraphs */}
            <div className="space-y-4 md:space-y-6 text-[#171717]/80 text-sm md:text-base lg:text-lg leading-relaxed">
              <p>
                Athletico has been in active partnership with Olympique Lyonnais
                since 2011—a collaboration built on long-term development, not
                one-off events. Over the years, OL staff have supported
                Athletico through coach education, methodology sharing, and
                ongoing exchange.
              </p>
              <p>
                This partnership was presented by OL as its first strategic
                partnership outside France, and it continues to focus on
                building strong foundations: better coach training, better
                learning environments, and better player development pathways.
              </p>
              <p>
                Athletico players also benefit from international exposure
                through training camps and immersion experiences connected to
                OL—helping motivated players experience high-level standards and
                new football cultures.
              </p>
            </div>
          </div>

          {/* Right Column - Image and Logo */}
          <div className="w-full lg:w-[45%] flex flex-col items-center justify-center gap-6">
            {/* Partnership Photo */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[420px] overflow-hidden rounded-lg">
              <Image
                src="/Olympique Lyonnais/ol.jpeg"
                alt="Athletico players at Olympique Lyonnais"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            {/* OL Logo */}
            <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]">
              <Image
                src="/ol.png"
                alt="Olympique Lyonnais Logo"
                fill
                className="object-contain"
                sizes="100px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== STACKING CARDS SECTION ====================
function StackingCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Desktop GSAP scroll effect
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!section || !card1 || !card2) return;

    // Set initial state - Card 2 starts below viewport
    gsap.set(card2, { yPercent: 100 });

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: cardsContainerRef.current,
        pinSpacing: false,
      },
    });

    // Animate Card 2 sliding up over Card 1
    tl.to(card2, {
      yPercent: 0,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  // Mobile Layout - Simple stack
  if (isMobile) {
    return (
      <section className="w-full px-4 md:px-8 pb-16">
        <div className="space-y-6">
          {/* Card 1 - Dark */}
          <div className="bg-[#171717] w-full p-6 md:p-10">
            <CardContent
              title="AFC ELITE"
              titleLine2="YOUTH SCHEME"
              label="ATHLETICO SPORTS CLUB"
              heading="ONE-STAR ACADEMY"
              paragraphs={[
                "Athletico has been approved as an AFC Elite Youth Scheme One-Star Academy after meeting the program's criteria—an important milestone that reflects the academy's structure, coaching standards, safeguarding approach, and development planning.",
                "In an exclusive interview on Athletico's website, OL Academy leadership shared insights into their philosophy and the value of international collaboration in youth development.",
              ]}
              image="/Olympique Lyonnais/one-start-academy.png"
              imageContain
              isDark
            />
          </div>

          {/* Card 2 - Light */}
          <div className="bg-[#F3F3F3] w-full p-6 md:p-10">
            <CardContent
              title="RECOGNITION"
              titleLine2="AND CREDIBILITY"
              label="ATHLETICO SPORTS CLUB"
              heading="SHAPING THE FUTURE"
              headingLine2="OF YOUTH FOOTBALL"
              paragraphs={[
                "Athletico's long-term development work has also been highlighted by local media, including coverage noting national recognition and the academy's progress in building a professional youth structure.",
              ]}
              image="/Olympique Lyonnais/recognition&credibility.jpeg"
              isDark={false}
            />
          </div>
        </div>
      </section>
    );
  }

  // Desktop Layout - Stacking cards with GSAP
  return (
    <section
      ref={sectionRef}
      className="w-full relative"
      style={{ height: "200vh" }}
    >
      {/* Cards Container - This gets pinned */}
      <div
        ref={cardsContainerRef}
        className="h-screen w-full px-6 md:px-12 lg:px-16 py-8 relative overflow-hidden"
      >
        <div className="max-w-screen-2xl mx-auto h-full relative">
          {/* Card 1 - Dark (Base card) */}
          <div
            ref={card1Ref}
            className="bg-[#171717] w-[95%] mx-auto p-10 lg:p-12 absolute inset-x-0 top-0 bottom-0 my-auto h-fit"
          >
            <CardContent
              title="AFC ELITE"
              titleLine2="YOUTH SCHEME"
              label="ATHLETICO SPORTS CLUB"
              heading="ONE-STAR ACADEMY"
              paragraphs={[
                "Athletico has been approved as an AFC Elite Youth Scheme One-Star Academy after meeting the program's criteria—an important milestone that reflects the academy's structure, coaching standards, safeguarding approach, and development planning.",
                "In an exclusive interview on Athletico's website, OL Academy leadership shared insights into their philosophy and the value of international collaboration in youth development.",
              ]}
              image="/Olympique Lyonnais/one-start-academy.png"
              imageContain
              isDark
            />
          </div>

          {/* Card 2 - Light (Slides over Card 1) */}
          <div
            ref={card2Ref}
            className="bg-[#F3F3F3] w-[95%] mx-auto p-10 lg:p-12 absolute inset-x-0 top-0 bottom-0 my-auto h-fit"
          >
            <CardContent
              title="RECOGNITION"
              titleLine2="AND CREDIBILITY"
              label="ATHLETICO SPORTS CLUB"
              heading="SHAPING THE FUTURE"
              headingLine2="OF YOUTH FOOTBALL"
              paragraphs={[
                "Athletico's long-term development work has also been highlighted by local media, including coverage noting national recognition and the academy's progress in building a professional youth structure.",
              ]}
              image="/Olympique Lyonnais/recognition&credibility.jpeg"
              isDark={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== CARD CONTENT COMPONENT ====================
function CardContent({
  title,
  titleLine2,
  label,
  heading,
  headingLine2,
  paragraphs,
  image,
  imageContain,
  isDark,
}: {
  title: string;
  titleLine2?: string;
  label: string;
  heading: string;
  headingLine2?: string;
  paragraphs: string[];
  image: string;
  imageContain?: boolean;
  isDark: boolean;
}) {
  const textColor = isDark ? "text-white" : "text-[#171717]";
  const mutedTextColor = isDark ? "text-white/50" : "text-[#171717]/50";
  const paragraphColor = isDark ? "text-white/80" : "text-[#171717]/80";

  return (
    <div className="flex flex-col">
      {/* Card Title */}
      <h3
        className={`${textColor} font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-none mb-8 md:mb-10`}
      >
        {title}
        {titleLine2 && (
          <>
            <br />
            {titleLine2}
          </>
        )}
      </h3>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
        {/* Left - Image */}
        <div className="w-full lg:w-[40%]">
          <div className="relative w-full h-[250px] sm:h-[280px] md:h-[320px] lg:h-[350px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className={imageContain ? "object-contain" : "object-cover"}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        {/* Right - Text */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center">
          {/* Label */}
          <p
            className={`${mutedTextColor} text-xs md:text-sm font-medium uppercase tracking-widest mb-3 md:mb-4`}
          >
            {label}
          </p>

          {/* Heading */}
          <h4
            className={`${textColor} font-bold text-xl sm:text-2xl md:text-3xl uppercase leading-tight mb-6 md:mb-8`}
          >
            {heading}
            {headingLine2 && (
              <>
                <br />
                {headingLine2}
              </>
            )}
          </h4>

          {/* Paragraphs */}
          <div
            className={`space-y-4 ${paragraphColor} text-sm md:text-base lg:text-lg leading-relaxed`}
          >
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
