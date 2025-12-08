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
    if (typeof window === "undefined") return;

    // Only run the scroll animation on tablet/desktop
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const section = sectionRef.current;
    const circles = circlesRef.current;
    const image = imageRef.current;
    const curvedText = curvedTextRef.current;

    if (!section || !circles || !image || !curvedText) return;

    const circleElements = circles.querySelectorAll(".career-circle");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=1100",
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(
      circleElements,
      {
        scale: 8,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: "power2.inOut",
      },
      0
    )
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden bg-[#171717] md:bg-white"
    >
      {/* MOBILE: simple hero, no circles, no animation */}
      <div className="flex h-full w-full items-center justify-center md:hidden">
        <div className="relative w-[70vw] max-w-[320px] aspect-square overflow-hidden">
          <Image
            src="/career-hero.png"
            alt="Young football players"
            fill
            className="object-cover"
            sizes="70vw"
            priority
          />
        </div>
      </div>

      {/* DESKTOP/TABLET: original animated circles hero */}
      <div
        ref={circlesRef}
        className="hidden md:flex absolute inset-0 items-center justify-center"
      >
        {/* Outermost circle */}
        <div
          className="career-circle absolute rounded-full bg-[#171717]"
          style={{
            width: "120vw",
            height: "120vw",
            transform: "translateY(-25.5%)",
          }}
        />

        {/* Second circle */}
        <div
          className="career-circle absolute rounded-full bg-white/[0.03]"
          style={{
            width: "58vmax",
            height: "58vmax",
          }}
        />

        {/* Innermost circle */}
        <div
          className="career-circle absolute rounded-full bg-white/[0.03]"
          style={{
            width: "40vmax",
            height: "40vmax",
          }}
        />

        {/* Center Image */}
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

      {/* Curved Text (desktop/tablet only) */}
      <div
        ref={curvedTextRef}
        className="hidden md:flex absolute bottom-10 left-0 right-0 justify-center pointer-events-none z-20"
      >
        <svg
          viewBox="0 0 1200 300"
          className="w-full max-w-[1100px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
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
