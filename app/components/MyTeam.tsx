"use client";

import Image from "next/image";

export default function MyTeamSection() {
  return (
    <>
      <div className="mb-16 md:mb-20" />
      <section className="w-full relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] lg:h-[70vh]">
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
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full max-w-[1440px] mx-auto px-10 sm:px-6 lg:px-12 xl:px-[200px]">
            <div className="text-white font-outfit">
              {/* "MEET THE" */}
              <h3
                className="
    uppercase font-extrabold leading-none mb-2 tracking-tight
    text-3xl sm:text-4xl md:text-5xl lg:text-[50px]
    translate-y-1 sm:translate-y-2
    -translate-x-1
  "
              >
                THE
              </h3>

              {/* "TEAM" */}
              <h2
                className="uppercase font-extrabold leading-none tracking-tight
    text-6xl sm:text-7xl md:text-8xl lg:text-[150px] xl:text-[200px]
    translate-y-2 sm:translate-y-3
    -translate-x-1 sm:-translate-x-2
  "
              >
                CLUB
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
