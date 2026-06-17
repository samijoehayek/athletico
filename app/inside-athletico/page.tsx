"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function InsideAthleticoPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Our Values Section */}
      <OurValuesSection />

      {/* Our Mission Section */}
      <OurMissionVisionSection />

      {/* Our Vision Section */}
      <OurVisionSection />

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
interface ClubValue {
  number: string;
  title: string;
  description: string;
}

const CLUB_VALUES: ClubValue[] = [
  {
    number: "01",
    title: "Sportsmanship",
    description: "Respect for the game, our opponents, and ourselves.",
  },
  {
    number: "02",
    title: "Teamwork",
    description: "Winning together and growing as one unit.",
  },
  {
    number: "03",
    title: "Discipline",
    description: "Consistency and commitment in every session.",
  },
  {
    number: "04",
    title: "Integrity",
    description: "Doing what is right, on and off the pitch.",
  },
  {
    number: "05",
    title: "Professionalism",
    description: "World-class standards at every level of play.",
  },
  {
    number: "06",
    title: "Community",
    description: "Building bonds that reach beyond the field.",
  },
  {
    number: "07",
    title: "Education",
    description: "Developing sharp minds alongside athletes.",
  },
  {
    number: "08",
    title: "Independence",
    description: "Empowering players to lead their own journey.",
  },
];

function OurValuesSection() {
  return (
    <section
      id="values"
      className="bg-white w-full px-6 md:px-12 lg:px-16 pb-16 pt-8 md:pb-20 lg:pb-24"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* ---- Intro Band: Title + Mission Paragraph ---- */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24 mb-14 md:mb-20 lg:mb-24">
          {/* Left — Title */}
          <div className="lg:w-[45%]">
            <p className="text-[#3050FD] text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-5 md:mb-7">
              Athletico Sports Club
            </p>
            <h2 className="text-[#171717] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9] uppercase tracking-tight">
              OUR
              <br />
              VALUES
            </h2>
          </div>

          {/* Right — Mission Paragraph */}
          <div className="lg:w-[55%] flex flex-col justify-end">
            <h3 className="text-[#171717] font-bold text-2xl sm:text-3xl md:text-4xl uppercase leading-tight mb-5 md:mb-7">
              A Club With A Mission
            </h3>
            <p className="text-[#171717]/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl">
              The Athletico project started in 2006, with a group of parents
              coming together to give the best to their kids. It is with this
              vision that the club grew, to become today the leading academy in
              the region, with branches across Lebanon, a historic partnership
              with the prestigious Olympique Lyonnais, a French Technical
              Director, and a continuous coaches&apos; training and development
              program. These eight values are the foundation every Athletico
              player is built on.
            </p>
          </div>
        </div>

        {/* ---- Values Grid ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#171717]/10">
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
      className="group relative overflow-hidden border-r border-b border-[#171717]/10 min-h-[210px] md:min-h-[250px] lg:min-h-[270px] p-6 md:p-8 flex flex-col justify-between cursor-default"
    >
      {/* Blue fill that rises on hover */}
      <div className="pointer-events-none absolute inset-0 bg-[#3050FD] origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />

      {/* Top Row — Number */}
      <div className="relative z-10">
        <span className="text-base md:text-lg font-bold tracking-tight text-[#3050FD] transition-colors duration-500 group-hover:text-white/70">
          {value.number}
        </span>
      </div>

      {/* Bottom — Title + Description */}
      <div className="relative z-10">
        <h3 className="text-[#171717] font-extrabold uppercase leading-[0.95] tracking-tight text-2xl md:text-[28px] lg:text-[30px] transition-colors duration-500 group-hover:text-white">
          {value.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#171717]/55 transition-colors duration-500 group-hover:text-white/85">
          {value.description}
        </p>
      </div>
    </motion.div>
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
          MISSION
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column - Two Images */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Images Container */}
            <div className="flex gap-3 md:gap-4 h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
              {/* Left Image - Portrait/Vertical (narrower) */}
              <div className="relative w-[42%] h-full overflow-hidden">
                <Image
                  src="/homepage/values.jpg"
                  alt="Athletico Sports Club Vision"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                />
              </div>

              {/* Right Image - Landscape/Horizontal (wider) */}
              <div className="relative w-[58%] h-full overflow-hidden">
                <Image
                  src="/homepage/mission.jpg"
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
              Athletico&apos;s mission is rooted in the belief that a football
              club is one of the most powerful environments for shaping young
              people. Every drill, every match, every conversation between a
              coach and a player is an opportunity to build not just technique,
              but character.
            </p>
            <p className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed mt-5 md:mt-6">
              Through our partnership with Olympique Lyonnais and our French
              Technical Director, we bring elite European methodology to every
              branch across Lebanon, making world-class development accessible
              to every child who walks through our doors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== OUR VISION SECTION ====================
interface VisionPillar {
  number: string;
  title: string;
  description: string;
}

const VISION_PILLARS: VisionPillar[] = [
  {
    number: "01",
    title: "Regional Leadership",
    description:
      "Become the undisputed benchmark for youth football development across the Arab world, expanding our model of excellence beyond Lebanon.",
  },
  {
    number: "02",
    title: "Pathway To Pro",
    description:
      "Build clear, structured pathways for talented players to pursue professional careers in Lebanon, France, and beyond through our OL partnership.",
  },
  {
    number: "03",
    title: "Community Impact",
    description:
      "Use sport as a vehicle for positive social change, making football accessible, inclusive, and transformative for every community we serve.",
  },
];

function OurVisionSection() {
  return (
    <section
      id="vision"
      className="bg-white w-full px-6 md:px-12 lg:px-16 py-16 md:py-20 lg:py-24"
    >
      <div className="max-w-screen-2xl mx-auto">
        {/* ---- Intro Band: Title + Vision Statement ---- */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24 mb-14 md:mb-20 lg:mb-24">
          {/* Left — Title */}
          <div className="lg:w-[45%]">
            <p className="text-[#3050FD] text-xs md:text-sm font-semibold uppercase tracking-[0.25em] mb-5 md:mb-7">
              Athletico Sports Club
            </p>
            <h2 className="text-[#171717] font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9] uppercase tracking-tight">
              OUR
              <br />
              VISION
            </h2>
          </div>

          {/* Right — Vision Statement */}
          <div className="lg:w-[55%] flex flex-col justify-end">
            <blockquote className="border-l-2 border-[#3050FD] pl-6 md:pl-8">
              <p className="text-[#171717] font-medium italic text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-snug tracking-tight">
                &ldquo;To be the defining football academy of the Middle East,
                a place where Lebanese talent is discovered, developed, and
                celebrated on the world stage.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>

        {/* ---- Pillars Grid ---- */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[#171717]/10">
          {VISION_PILLARS.map((pillar, index) => (
            <PillarCard key={pillar.number} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== VISION PILLAR CARD ====================
function PillarCard({
  pillar,
  index,
}: {
  pillar: VisionPillar;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group relative overflow-hidden border-r border-b border-[#171717]/10 min-h-[240px] md:min-h-[300px] p-6 md:p-8 flex flex-col justify-between cursor-default"
    >
      {/* Blue fill that rises on hover */}
      <div className="pointer-events-none absolute inset-0 bg-[#3050FD] origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" />

      {/* Top — Number */}
      <div className="relative z-10">
        <span className="text-base md:text-lg font-bold tracking-tight text-[#3050FD] transition-colors duration-500 group-hover:text-white/70">
          {pillar.number}
        </span>
      </div>

      {/* Bottom — Title + Description */}
      <div className="relative z-10">
        <h3 className="text-[#171717] font-extrabold uppercase leading-[0.95] tracking-tight text-2xl md:text-[28px] lg:text-[30px] transition-colors duration-500 group-hover:text-white">
          {pillar.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-[#171717]/55 transition-colors duration-500 group-hover:text-white/85">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}
