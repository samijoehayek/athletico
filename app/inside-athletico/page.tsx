"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function InsideAthleticoPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Our Values Section */}
      <OurValuesSection />

      {/* Our Mission & Vision Section */}
      <OurMissionVisionSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  return (
    <section className="bg-white w-full min-h-[60vh] flex flex-col">
      {/* Navbar */}
      <Navbar mode="dark" />

      {/* Title - Centered */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-16">
        <h1 className="text-[#171717] font-extrabold text-6xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[180px] leading-none uppercase tracking-tight text-center">
          INSIDE ATHLETICO
        </h1>
      </div>
    </section>
  );
}

// ==================== OUR VALUES SECTION ====================
function OurValuesSection() {
  return (
    <section
      id="values"
      className="bg-white w-full px-6 md:px-12 lg:px-16 pb-16 pt-8 md:pb-20 lg:pb-24"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Title */}
        <h2 className="text-[#171717] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-none uppercase mb-12 md:mb-16">
          OUR
          <br />
          VALUES
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column - Single Image */}
          <div className="w-full lg:w-[50%]">
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
              <Image
                src="/ourclub2.png"
                alt="Athletico Sports Club Values"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="w-full lg:w-[50%] flex flex-col justify-center">
            {/* Club Label */}
            <p className="text-[#171717]/50 text-xs md:text-sm font-medium uppercase tracking-widest mb-4 md:mb-6">
              ATHLETICO SPORTS CLUB
            </p>

            {/* Heading */}
            <h3 className="text-[#171717] font-bold text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mb-6 md:mb-8">
              A CLUB WITH A MISSION
            </h3>

            {/* Paragraph */}
            <p className="text-[#171717]/80 text-sm md:text-base lg:text-lg leading-relaxed">
              The Athletico project started in 2006, with a group of parents
              coming together to give the best to their kids. It is with this
              vision that the club grew, to become today the leading academy in
              the region, with 8 branches across Lebanon. With a historic
              partnership with prestigious Olympique Lyonnais, a French
              Technical Director, a coaches' continuous training and development
              program, and a complete yearly program for every age group. The
              Athletico project started in 2006, with a group of parents coming
              together to give the best to their kids. It is with this vision
              that the club grew, to become today the leading academy in the
              region, with 8 branches across Lebanon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== OUR MISSION & VISION SECTION ====================
function OurMissionVisionSection() {
  return (
    <section
      id="mission"
      className="bg-[#171717] w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Title */}
        <h2 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[70px] leading-none uppercase mb-12 md:mb-16">
          OUR
          <br />
          MISSION & VISION
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column - Two Images */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Images Container */}
            <div className="flex gap-3 md:gap-4 h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
              {/* Left Image - Portrait/Vertical (narrower) */}
              <div className="relative w-[42%] h-full overflow-hidden">
                <Image
                  src="/ourclub1.png"
                  alt="Athletico Sports Club"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                />
              </div>

              {/* Right Image - Landscape/Horizontal (wider) */}
              <div className="relative w-[58%] h-full overflow-hidden">
                <Image
                  src="/ourclub2.png"
                  alt="Athletico Sports Club Training"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 55vw, (max-width: 1024px) 35vw, 30vw"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            {/* Club Label */}
            <p className="text-white/50 text-xs md:text-sm font-medium uppercase tracking-widest mb-4 md:mb-6">
              ATHLETICO SPORTS CLUB
            </p>

            {/* Heading */}
            <h3 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mb-6 md:mb-8">
              A CLUB WITH A MISSION
            </h3>

            {/* Paragraph */}
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed">
              The Athletico project started in 2006, with a group of parents
              coming together to give the best to their kids. It is with this
              vision that the club grew, to become today the leading academy in
              the region, with 8 branches across Lebanon. With a historic
              partnership with prestigious Olympique Lyonnais, a French
              Technical Director, a coaches' continuous training and development
              program, and a complete yearly program for every age group. The
              Athletico project started in 2006, with a group of parents coming
              together to give the best to their kids. It is with this vision
              that the club grew, to become today the leading academy in the
              region, with 8 branches across Lebanon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
