"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsSection() {
  /* Vertical scrollable events list — kept for reference, replaced by image carousel
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          scrollContainerRef.current;
        const maxScroll = scrollHeight - clientHeight;
        const position = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setScrollPosition(position);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const events = [
    { date: "MONDAY, OCTOBER 20, 2025", time: "16:45", team1: "REAL MADRID", team2: "BARCELONA" },
    { date: "TUESDAY, OCTOBER 21, 2025", time: "18:30", team1: "MANCHESTER UNITED", team2: "LIVERPOOL" },
    { date: "WEDNESDAY, OCTOBER 22, 2025", time: "20:00", team1: "BAYERN MUNICH", team2: "BORUSSIA DORTMUND" },
    { date: "THURSDAY, OCTOBER 23, 2025", time: "19:15", team1: "PARIS SAINT-GERMAIN", team2: "MARSEILLE" },
    { date: "FRIDAY, OCTOBER 24, 2025", time: "21:00", team1: "JUVENTUS", team2: "AC MILAN" },
    { date: "SATURDAY, OCTOBER 25, 2025", time: "17:30", team1: "CHELSEA", team2: "ARSENAL" },
  ];
  */

  const pastEvents = [
    { title: "OLYMPIQUE LYONNAIS", image: "/Olympique Lyonnais/ol.jpeg" },
    { title: "ONE-STAR ACADEMY", image: "/Olympique Lyonnais/one-start-academy.png" },
    { title: "RECOGNITION", image: "/Olympique Lyonnais/recognition&credibility.jpeg" },
    { title: "TOURNAMENTS", image: "/tournament.jpg" },
    { title: "OUR CLUB", image: "/ourclub1.png" },
    { title: "TRAINING", image: "/homepage/main.jpg" },
    { title: "OUR MISSION", image: "/homepage/mission.jpg" },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const total = pastEvents.length;

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [total]);

  const visibleSlides = Array.from({ length: visibleCount }, (_, i) => {
    const idx = (startIndex + i) % total;
    return { ...pastEvents[idx], key: `${idx}-${startIndex}-${i}` };
  });

  const goNext = () => setStartIndex((prev) => (prev + 1) % total);
  const goPrev = () => setStartIndex((prev) => (prev - 1 + total) % total);

  return (
    <section className="bg-[#171717] w-full px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
      <div className="max-w-screen-2xl mx-auto">
        {/* Carousel Header with Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/60 text-sm md:text-base uppercase font-normal tracking-wide">
              EXPLORE OUR
            </p>
            <p className="text-white text-2xl md:text-3xl uppercase font-bold">
              EVENTS & MOMENTS
            </p>
          </div>

          {/* Arrow Buttons */}
          <div className="flex gap-3">
            <button
              onClick={goPrev}
              aria-label="Previous"
              className="w-10 h-10 md:w-12 md:h-12 border border-white/30 hover:border-[#3050FD] hover:bg-[#3050FD] text-white flex items-center justify-center transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              aria-label="Next"
              className="w-10 h-10 md:w-12 md:h-12 border border-white/30 hover:border-[#3050FD] hover:bg-[#3050FD] text-white flex items-center justify-center transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Slides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {visibleSlides.map((slide) => (
              <motion.div
                key={slide.key}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-full h-[260px] md:h-[340px] lg:h-[400px] overflow-hidden cursor-pointer group"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wide">
                    {slide.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {pastEvents.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 transition-all ${
                i === startIndex ? "w-8 bg-[#3050FD]" : "w-4 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
