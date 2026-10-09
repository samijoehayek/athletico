"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Achievement {
  /** Squad birth year(s), e.g. "2012" or "2002-2003". */
  team: string;
  ageCategory: string;
  season: string;
  tournament: string;
  ranking: string;
}

// Trophy cabinet. Mirrors the club's official record; two rows in a season
// with the same squad mean an A and a B team both placed.
const ACHIEVEMENTS: Achievement[] = [
  {
    team: "2012",
    ageCategory: "U14",
    season: "2025/26",
    tournament: "Official Youth Lebanese League",
    ranking: "1st Place",
  },
  {
    team: "2009",
    ageCategory: "U17",
    season: "2025/26",
    tournament: "Official Youth Lebanese League",
    ranking: "2nd Place",
  },
  {
    team: "2014",
    ageCategory: "U12",
    season: "2025/26",
    tournament: "Official Lebanese Grassroots League",
    ranking: "1st Place",
  },
  {
    team: "2014",
    ageCategory: "U12",
    season: "2025/26",
    tournament: "Official Lebanese Grassroots League",
    ranking: "2nd Place",
  },
  {
    team: "2013",
    ageCategory: "U13",
    season: "2025/26",
    tournament: "Official Lebanese Grassroots League",
    ranking: "2nd Place",
  },
  {
    team: "2008",
    ageCategory: "U17",
    season: "2024/25",
    tournament: "Official Youth Lebanese League",
    ranking: "1st Place",
  },
  {
    team: "2010",
    ageCategory: "U15",
    season: "2024/25",
    tournament: "Official Youth Lebanese League",
    ranking: "2nd Place",
  },
  {
    team: "2013",
    ageCategory: "U12",
    season: "2024/25",
    tournament: "Official Lebanese Grassroots League",
    ranking: "1st Place",
  },
  {
    team: "2013",
    ageCategory: "U12",
    season: "2024/25",
    tournament: "Official Lebanese Grassroots League",
    ranking: "2nd Place",
  },
  {
    team: "2010",
    ageCategory: "U14",
    season: "2023/24",
    tournament: "Official Youth Lebanese League",
    ranking: "1st Place",
  },
  {
    team: "2008",
    ageCategory: "U16",
    season: "2023/24",
    tournament: "Official Youth Lebanese League",
    ranking: "1st Place",
  },
  {
    team: "2007",
    ageCategory: "U17",
    season: "2023/24",
    tournament: "Official Youth Lebanese League",
    ranking: "1st Place",
  },
  {
    team: "2012",
    ageCategory: "U12",
    season: "2023/24",
    tournament: "Official Lebanese Grassroots League",
    ranking: "1st Place",
  },
  {
    team: "2008",
    ageCategory: "U15",
    season: "2022/23",
    tournament: "Official Youth Lebanese League",
    ranking: "2nd Place",
  },
  {
    team: "2007",
    ageCategory: "U16",
    season: "2022/23",
    tournament: "Official Youth Lebanese League",
    ranking: "2nd Place",
  },
  {
    team: "2011",
    ageCategory: "U12",
    season: "2022/23",
    tournament: "Official Lebanese Grassroots League",
    ranking: "1st Place",
  },
  {
    team: "2010",
    ageCategory: "U13",
    season: "2022/23",
    tournament: "Official Lebanese Grassroots League",
    ranking: "1st Place",
  },
  {
    team: "2006",
    ageCategory: "U13",
    season: "2019/20",
    tournament: "Official Lebanese Cup",
    ranking: "1st Place",
  },
  {
    team: "2008",
    ageCategory: "U10",
    season: "2018/19",
    tournament: "Official Lebanese Cup",
    ranking: "1st Place",
  },
  {
    team: "2002-2003",
    ageCategory: "U17",
    season: "2018/19",
    tournament: "Official Youth Lebanese League",
    ranking: "2nd Place",
  },
  {
    team: "2009",
    ageCategory: "U10",
    season: "2018/19",
    tournament: "Official Lebanese Grassroots League",
    ranking: "1st Place",
  },
  {
    team: "1996-1997",
    ageCategory: "U15",
    season: "2010/11",
    tournament: "Official Youth Lebanese League",
    ranking: "1st Place",
  },
];

// Normalize a messy season string ("22/23", "2023/2024", "2024-2025") into a
// consistent display label ("2022/23") and a sortable numeric key.
function normalizeSeason(season: string): { label: string; sort: number } {
  const nums = (season.match(/\d+/g) || []).map(Number);
  const to4 = (n: number) => (n < 100 ? 2000 + n : n);
  if (nums.length >= 2) {
    const start = to4(nums[0]);
    const end = to4(nums[1]);
    return { label: `${start}/${String(end).slice(2)}`, sort: end };
  }
  if (nums.length === 1) {
    const y = to4(nums[0]);
    return { label: `${y}`, sort: y };
  }
  return { label: season, sort: 0 };
}

const isTitle = (a: Achievement) => a.ranking === "1st Place";

// Titles won are counted from the record, so the headline can't drift from it.
const TITLES_WON = ACHIEVEMENTS.filter(isTitle).length;

// Seasons newest first; within a season, titles before runner-up finishes.
const SEASONS = Object.values(
  ACHIEVEMENTS.reduce<Record<string, { label: string; sort: number; items: Achievement[] }>>(
    (acc, a) => {
      const year = normalizeSeason(a.season);
      (acc[year.label] ??= { ...year, items: [] }).items.push(a);
      return acc;
    },
    {},
  ),
)
  .sort((a, b) => b.sort - a.sort)
  .map((season) => ({
    ...season,
    items: [...season.items].sort((a, b) => Number(isTitle(b)) - Number(isTitle(a))),
    titles: season.items.filter(isTitle).length,
  }));

export default function AchievementsPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Every achievement on one page */}
      <AchievementsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

// ==================== HERO SECTION ====================
function HeroSection() {
  const diagonalAngle = 12;

  return (
    <section className="relative w-full h-[34vh] min-h-[260px] md:h-[46vh] md:min-h-[400px] overflow-hidden">
      {/* White Background (Top) */}
      <div
        className="absolute inset-0 bg-[#F1EAEA]"
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% ${100 - diagonalAngle}%, 0 100%)`,
        }}
      />

      {/* Dark Background (Bottom) */}
      <div
        className="absolute inset-0 bg-[#0B3E80]"
        style={{
          clipPath: `polygon(0 100%, 100% ${100 - diagonalAngle}%, 100% 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navbar */}
        <Navbar mode="dark" />

        {/* Title */}
        <div className="flex-1 px-6 md:px-12 lg:px-16">
          <div className="max-w-screen-2xl mx-auto h-full flex flex-col justify-center pb-12 md:pb-16">
            {/* Inline font: the global p rule would otherwise put this in Outfit. */}
            <p
              className="text-[#0B3E80] font-bold text-lg sm:text-xl md:text-2xl uppercase tracking-wide mb-1"
              style={{ fontFamily: "var(--font-qb)" }}
            >
              ATHLETICO S.C
            </p>
            <h1 className="text-[#0B3E80] font-extrabold text-[9vw] sm:text-6xl md:text-[100px] lg:text-[140px] xl:text-[180px] uppercase leading-none tracking-tight">
              ACHIEVEMENTS
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== ACHIEVEMENTS SECTION ====================
function AchievementsSection() {
  return (
    <section className="bg-[#0B3E80] w-full px-6 md:px-12 lg:px-16 pt-4 pb-16 md:pt-6 md:pb-24 -mt-px">
      <div className="max-w-screen-2xl mx-auto">
        {/* Headline count */}
        <TitlesWon />

        {/* Seasons */}
        <div className="mt-12 md:mt-16 space-y-12 md:space-y-16">
          {SEASONS.map((season) => (
            <div key={season.label}>
              <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3 mb-5 md:mb-6">
                <h2 className="text-[#FFE400] font-extrabold text-3xl md:text-4xl lg:text-5xl uppercase leading-none">
                  {season.label}
                </h2>
                {season.titles > 0 && (
                  <p className="text-white/40 text-xs md:text-sm font-medium uppercase tracking-widest">
                    {season.titles} {season.titles === 1 ? "title" : "titles"}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {season.items.map((a, i) => (
                  <AchievementCard key={`${a.team}-${a.tournament}-${a.ranking}-${i}`} achievement={a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==================== TITLES WON ====================
function TitlesWon() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Same count-up as the homepage statistics.
  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 1600;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * TITLES_WON));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-end gap-4 md:gap-6"
    >
      <span className="text-[#FFE400] font-extrabold text-7xl md:text-8xl lg:text-[120px] leading-[0.8] tabular-nums">
        {count}
      </span>
      <span className="text-white font-extrabold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none pb-1">
        OFFICIAL TITLES
        <br />
        WON
      </span>
    </motion.div>
  );
}

// ==================== ACHIEVEMENT CARD ====================
function AchievementCard({ achievement }: { achievement: Achievement }) {
  const title = isTitle(achievement);

  return (
    <div
      className={`flex flex-col justify-between gap-5 p-5 md:p-6 border transition-colors ${
        title
          ? "border-[#FFE400]/40 bg-white/[0.06] hover:border-[#FFE400]"
          : "border-white/15 hover:border-white/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className={`font-bold text-lg md:text-xl uppercase leading-tight ${
            title ? "text-[#FFE400]" : "text-white"
          }`}
        >
          {achievement.ranking}
        </p>
        <TrophyIcon className={title ? "text-[#FFE400]" : "text-white/40"} />
      </div>

      <div>
        <h3 className="text-white font-extrabold text-xl md:text-2xl uppercase leading-tight">
          ATHLETICO {achievement.team}
        </h3>
        <p className="text-white/60 text-sm uppercase tracking-wide mt-1">
          {achievement.ageCategory} · {achievement.tournament}
        </p>
      </div>
    </div>
  );
}

function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-shrink-0 ${className}`}
      aria-hidden
    >
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
      <path d="M17 5h2a2 2 0 0 1 0 4h-2M7 5H5a2 2 0 0 0 0 4h2" />
    </svg>
  );
}
