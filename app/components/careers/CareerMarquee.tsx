"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CareerMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const marqueeText =
    "Join a team that grows together, wins together, and dreams bigger";

  useEffect(() => {
    const marquee = marqueeRef.current;
    const textContainer = textRef.current;

    if (!marquee || !textContainer) return;

    const textWidth = textContainer.scrollWidth / 2;

    gsap.to(textContainer, {
      x: -textWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(textContainer);
    };
  }, []);

  return (
    <section
      ref={marqueeRef}
      className="w-full bg-white py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      <div
        ref={textRef}
        className="flex whitespace-nowrap"
        style={{ willChange: "transform" }}
      >
        {[...Array(4)].map((_, index) => (
          <span
            key={index}
            className="font-extrabold uppercase font-outfit mx-6 sm:mx-8 text-3xl sm:text-4xl md:text-5xl lg:text-[80px] xl:text-[120px]"
            style={{
              background: "linear-gradient(90deg, #3050FD 0%, #7B08FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {marqueeText}
            <span className="mx-6 sm:mx-10 md:mx-16 opacity-50">•</span>
          </span>
        ))}
      </div>
    </section>
  );
}
