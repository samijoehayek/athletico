"use client";

import Image from "next/image";

const founders = [
  { name: "Nadim Ghattas" },
  { name: "Robert Paoli" },
  { name: "René Matta" },
];

export default function FoundersSection() {
  return (
    <section className="mt-20 md:mt-24">
      {/* Section Title */}
      <h3
        className="text-white font-semibold uppercase tracking-widest"
        style={{
          fontSize: "30px",
          letterSpacing: "0.1em",
        }}
      >
        FOUNDERS
      </h3>

      {/* Divider Line */}
      <div className="w-full h-px bg-[#444] mt-6 mb-10" />

      {/* Single Full-Width Card */}
      <div className="bg-white shadow-xl overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-[400px] md:h-[520px] lg:h-[620px]">
          <Image
            src="/founders.jpeg"
            alt="Athletico Founders — Nadim Ghattas, Robert Paoli, René Matta"
            fill
            className="object-cover object-[center_35%]"
            sizes="100vw"
            priority
          />
        </div>

        {/* Names Row */}
        <div className="grid grid-cols-3 divide-x divide-[#e5e5e5]">
          {founders.map((founder) => (
            <div key={founder.name} className="py-6 md:py-8 px-4 md:px-8">
              <p className="text-[#171717] text-sm md:text-lg lg:text-xl font-bold uppercase tracking-wide text-center">
                {founder.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
