"use client";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function InsideAthleticoPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Our Vision Section */}
      <OurVisionSection />

      {/* Our Mission Section */}
      <OurMissionVisionSection />

      {/* Our Values Section */}
      <OurValuesSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  return (
    <section className="bg-[#F1EAEA] w-full min-h-[60vh] flex flex-col">
      {/* Navbar */}
      <Navbar mode="dark" />

      {/* Title - Centered */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 lg:px-16">
        <h1 className="text-[#0B3E80] font-extrabold text-6xl sm:text-8xl md:text-[120px] lg:text-[150px] xl:text-[180px] leading-none uppercase tracking-tight text-center">
          INSIDE ATHLETICO
        </h1>
      </div>
    </section>
  );
}

// ==================== OUR VALUES SECTION ====================
interface ClubValue {
  number: string;
  title: string;
  description: string;
}

const CLUB_VALUES: ClubValue[] = [
  {
    number: "01",
    title: "Sportsmanship",
    description: "We play fair, respect all, and honor the game.",
  },
  {
    number: "02",
    title: "Teamwork",
    description: "We rise and fall together, as one.",
  },
  {
    number: "03",
    title: "Discipline",
    description:
      "We train the mind and body, making choices that shape champions.",
  },
  {
    number: "04",
    title: "Community",
    description:
      "We build a lasting sense of belonging in a safe, apolitical environment, free from any political or religious intervention or influence.",
  },
  {
    number: "05",
    title: "Professionalism",
    description: "We live as champions, on and off the field.",
  },
  {
    number: "06",
    title: "Education",
    description:
      "We place studies first, knowing strong minds build strong players.",
  },
  {
    number: "07",
    title: "Integrity",
    description: "We do what is right, even when no one is watching.",
  },
  {
    number: "08",
    title: "Independence",
    description: "We are not affiliated with any political or religious party.",
  },
];

function OurValuesSection() {
  return (
    <section
      id="values"
      className="bg-[#F1EAEA] w-full px-6 md:px-12 lg:px-16 pb-16 pt-8 md:pb-20 lg:pb-24"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* ---- Intro Band: Title ---- */}
        <div className="mb-14 md:mb-20 lg:mb-24">
          <p className="text-[#0B3E80] text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-5 md:mb-7">
            Athletico Sports Club
          </p>
          <h2 className="text-[#0B3E80] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9] uppercase tracking-tight">
            OUR
            <br />
            VALUES
          </h2>
        </div>

        {/* ---- Values Grid ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#0B3E80]/10">
          {CLUB_VALUES.map((value, index) => (
            <ValueCard key={value.number} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== VALUE CARD ====================
function ValueCard({ value, index }: { value: ClubValue; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
      className="group relative overflow-hidden border-r border-b border-[#0B3E80]/10 min-h-[210px] md:min-h-[250px] lg:min-h-[270px] p-6 md:p-8 flex flex-col justify-between cursor-default"
    >
      {/* Blue fill that rises on hover */}
      <div className="pointer-events-none absolute inset-0 bg-[#0B3E80] origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />

      {/* Top Row — Number */}
      <div className="relative z-10">
        <span className="text-base md:text-lg font-bold tracking-tight text-[#0B3E80] transition-colors duration-500 group-hover:text-white/70">
          {value.number}
        </span>
      </div>

      {/* Bottom — Title + Description */}
      <div className="relative z-10">
        <h3 className="flex items-end min-h-[46px] md:min-h-[54px] lg:min-h-[58px] text-[#0B3E80] font-extrabold uppercase leading-[0.95] tracking-tight text-2xl md:text-[28px] lg:text-[30px] transition-colors duration-500 group-hover:text-white">
          {value.title}
        </h3>
        <p className="mt-3 min-h-[44px] text-sm leading-relaxed text-[#0B3E80]/55 transition-colors duration-500 group-hover:text-white/85">
          {value.description}
        </p>
      </div>
    </motion.div>
  );
}

// ==================== OUR MISSION SECTION ====================
// Mirrors the Vision section's layout (title left, statement right) so the two
// read as a matched pair. Deliberately image-free, like Vision and Values.
function OurMissionVisionSection() {
  return (
    <section
      id="mission"
      className="bg-[#0B3E80] w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24">
          {/* Left — Title */}
          <div className="lg:w-[45%]">
            <p className="text-white/50 text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-5 md:mb-7">
              Athletico Sports Club
            </p>
            <h2 className="text-white font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9] uppercase tracking-tight">
              OUR
              <br />
              MISSION
            </h2>
          </div>

          {/* Right — Mission Statement */}
          <div className="lg:w-[55%] flex flex-col justify-end">
            <blockquote className="border-l-2 border-white/60 pl-6 md:pl-8 space-y-6 md:space-y-8">
              <p className="text-white font-medium text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-snug tracking-tight">
                To set the standard for excellence &ndash; developing top-level
                athletes with world-class discipline and heart, while
                revolutionizing football in Lebanon.
              </p>
              <p className="text-white font-medium text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-snug tracking-tight">
                To build a club where every child can live their passion &ndash;
                in a safe, inspiring, and high-performance environment.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== OUR VISION SECTION ====================
function OurVisionSection() {
  return (
    <section
      id="vision"
      className="bg-[#F1EAEA] w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* ---- Intro Band: Title + Vision Statement ---- */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24 mb-14 md:mb-20 lg:mb-24">
          {/* Left — Title */}
          <div className="lg:w-[45%]">
            <p className="text-[#0B3E80] text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-5 md:mb-7">
              Athletico Sports Club
            </p>
            <h2 className="text-[#0B3E80] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9] uppercase tracking-tight">
              OUR
              <br />
              VISION
            </h2>
          </div>

          {/* Right — Vision Statement */}
          <div className="lg:w-[55%] flex flex-col justify-end">
            <blockquote className="border-l-2 border-[#0B3E80] pl-6 md:pl-8">
              <p className="text-[#0B3E80] font-medium italic text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-snug tracking-tight">
                &ldquo;Inspiring generations by setting the highest standards in
                sports.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
