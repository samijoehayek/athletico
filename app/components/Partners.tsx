"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const logos = [
    "/parterners/partner1.png",
    "/parterners/partner2.png",
    "/parterners/partner3.png",
    "/parterners/partner4.png",
    "/parterners/partner5.png",
    "/parterners/partner6.png",
    "/parterners/partner7.png",
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="w-full bg-white flex flex-col items-center justify-center py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#171717] uppercase mb-8 md:mb-10 font-outfit text-center px-6">
        OUR PARTNERS
      </h2>

      {/* Infinite Scrolling Logo Container */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-10 md:gap-14 lg:gap-16 items-center"
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
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative w-[130px] h-[60px] sm:w-[160px] sm:h-[70px] lg:w-[200px] lg:h-[80px]"
            >
              <Image
                src={logo}
                alt={`Partner logo ${(index % logos.length) + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 130px, (max-width: 1024px) 160px, 200px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
