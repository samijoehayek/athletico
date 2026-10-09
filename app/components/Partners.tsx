"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Partner {
  name: string;
  src: string;
  /** Intrinsic pixel size of the PNG, used to balance the logos optically. */
  width: number;
  height: number;
}

const PARTNERS: Partner[] = [
  { name: "Matta et Associés", src: "/partners/partner1.png", width: 600, height: 350 },
  { name: "Gerimax", src: "/partners/partner2.png", width: 600, height: 492 },
  { name: "Go Greece", src: "/partners/partner3.png", width: 551, height: 148 },
  { name: "BOB Finance", src: "/partners/partner4.png", width: 600, height: 261 },
  { name: "Sparx", src: "/partners/partner5.png", width: 600, height: 71 },
  { name: "Technoblue", src: "/partners/partner6.png", width: 574, height: 520 },
  { name: "Toters", src: "/partners/partner7.png", width: 600, height: 191 },
];

// Logos come in every shape, from a thin wordmark to a square badge. Fitting
// them all into one box makes the wide ones look tiny and the square ones huge,
// so each is sized to the same visual area instead (desktop px; scaled down on
// smaller screens through --logo-scale).
const LOGO_AREA = 9000;
const MAX_WIDTH = 240;
const MAX_HEIGHT = 84;

function logoSize({ width, height }: Partner) {
  const ratio = width / height;
  let h = Math.min(Math.sqrt(LOGO_AREA / ratio), MAX_HEIGHT);
  if (h * ratio > MAX_WIDTH) h = MAX_WIDTH / ratio;
  return { w: Math.round(h * ratio), h: Math.round(h) };
}

export default function PartnersSection() {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...PARTNERS, ...PARTNERS];

  return (
    <section className="w-full bg-[#F1EAEA] flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Olympique Lyonnais International Football Academy */}
      <div className="relative w-[300px] sm:w-[380px] lg:w-[480px] aspect-[1200/292] mb-10 md:mb-14">
        <Image
          src="/ol/ol-academy-lockup.png"
          alt="Olympique Lyonnais International Football Academy — Athletico Sport Club"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 480px"
        />
      </div>

      {/* Title */}
      <h2 className="text-[28px] sm:text-[32px] lg:text-[45px] font-bold text-[#0B3E80] uppercase mb-8 md:mb-10 text-center px-6">
        OUR PARTNERS
      </h2>

      {/* Infinite Scrolling Logo Container */}
      <div className="w-full overflow-hidden [--logo-scale:0.7] sm:[--logo-scale:0.85] lg:[--logo-scale:1]">
        <motion.div
          className="flex w-max items-center"
          animate={{
            x: [0, -50 + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((partner, index) => {
            const { w, h } = logoSize(partner);
            return (
              // Spacing is padding, not flex gap, so both halves of the strip
              // are exactly equal and the loop has no jump.
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center pr-10 md:pr-14 lg:pr-16 h-[60px] sm:h-[72px] lg:h-[84px]"
              >
                <div
                  className="relative"
                  style={{
                    width: `calc(${w}px * var(--logo-scale))`,
                    height: `calc(${h}px * var(--logo-scale))`,
                  }}
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes={`${w}px`}
                  />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
