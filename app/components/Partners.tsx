"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
    "/logo6.png",
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="w-full h-[30vh] bg-white flex flex-col items-center justify-center py-20">
      {/* Title */}
      <h2 className="text-[50px] font-bold text-[#171717] uppercase mb-8 font-outfit">
        OUR PARTNERS
      </h2>

      {/* Infinite Scrolling Logo Container */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-16 items-center"
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
              className="flex-shrink-0 relative w-[200px] h-[80px] grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={logo}
                alt={`Partner logo ${(index % logos.length) + 1}`}
                fill
                className="object-contain"
                sizes="200px"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
