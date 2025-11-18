"use client";

import Image from "next/image";

export default function MyTeamSection() {
  return (
    <>
      <div className="mb-40"></div>
      <section className="w-full h-[70vh] relative overflow-hidden">
        {/* Background Image - Edge to Edge */}
        <div className="absolute inset-0">
          <Image
            src="/myteam.png"
            alt="Meet the team"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Text Content - Centered vertically, slightly left horizontally */}
        <div className="relative z-10 h-full flex items-center pl-[200px]">
          <div className="text-white">
            {/* "MEET THE" text */}
            <h3 className="text-[50px] font-extrabold uppercase leading-none mb-2 font-outfit">
              MEET THE
            </h3>

            {/* "TEAM" text */}
            <h2 className="text-[200px] font-extrabold uppercase leading-none font-outfit">
              TEAM
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}
