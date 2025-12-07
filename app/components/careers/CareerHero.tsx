"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CareerHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const curvedTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const circles = circlesRef.current;
    const image = imageRef.current;
    const curvedText = curvedTextRef.current;

    if (!section || !circles || !image || !curvedText) return;

    // Get all circle elements
    const circleElements = circles.querySelectorAll(".career-circle");

    // Create the scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=1100", // Reduced from 1500 - faster transition
        scrub: 0.5, // Slightly faster scrub
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate circles scaling up (zoom effect)
    tl.to(
      circleElements,
      {
        scale: 8,
        opacity: 0,
        duration: 1,
        stagger: 0.03, // Faster stagger
        ease: "power2.inOut",
      },
      0
    )
      // Scale up the center image
      .to(
        image,
        {
          scale: 3,
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      )
      // Fade out curved text
      .to(
        curvedText,
        {
          opacity: 0,
          y: -100,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-white relative overflow-hidden"
    >
      {/* Concentric Circles Container - moved up */}
      <div
        ref={circlesRef}
        className="absolute inset-0 flex items-center justify-center"
        style={{}}
      >
        {/* Outermost circle - sized to show curved edge at bottom */}
        <div
          className="career-circle absolute rounded-full bg-[#171717]"
          style={{
            width: "120vw",
            height: "120vw",
            transform: "translateY(-25.5%)",
          }}
        />

        {/* Second circle - very transparent */}
        <div
          className="career-circle absolute rounded-full bg-white/[0.03]"
          style={{
            width: "58vmax",
            height: "58vmax",
          }}
        />

        {/* Innermost circle - almost transparent, glued to image */}
        <div
          className="career-circle absolute rounded-full bg-white/[0.03]"
          style={{
            width: "40vmax",
            height: "40vmax",
          }}
        />

        {/* Center Image Container */}
        <div
          ref={imageRef}
          className="absolute rounded-full overflow-hidden z-10"
          style={{
            width: "400px",
            height: "400px",
          }}
        >
          <Image
            src="/career-hero.png"
            alt="Young football players"
            fill
            className="object-cover"
            sizes="400px"
            priority
          />
        </div>
      </div>

      {/* Curved Text at Bottom - More pronounced upward curve */}
      <div
        ref={curvedTextRef}
        className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none z-20"
      >
        <svg
          viewBox="0 0 1200 300"
          className="w-full max-w-[1100px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* More pronounced upward curve */}
            <path
              id="curvedPathUp"
              d="M 0,20 Q 600,280 1200,20"
              fill="transparent"
            />
          </defs>
          <text
            className="fill-white"
            style={{
              fontSize: "58px",
              fontWeight: 400,
              fontStyle: "italic",
              fontFamily: "var(--font-outfit), sans-serif",
            }}
          >
            <textPath
              href="#curvedPathUp"
              startOffset="50%"
              textAnchor="middle"
            >
              Scroll down to explore more
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
