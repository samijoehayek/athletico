"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { whatsappLink, PADEL_SPA_WHATSAPP_NUMBER } from "@/lib/site";

interface Activity {
  name: string;
  image: string;
  /** Tailwind object-position class, when the subject isn't centred. */
  position?: string;
  /** Booking number when it isn't the HQ one. */
  whatsappNumber?: string;
}

export default function OtherActivitiesSection() {
  const whatsappUrl = whatsappLink();
  // Adjustable diagonal angle - increase this number to make the diagonal steeper
  // Lower values = more horizontal, Higher values = more vertical
  const diagonalAngle = 22; // Percentage - adjusts the slope of the diagonal

  // Two large cards on top, four below.
  const topActivities: Activity[] = [
    {
      name: "FOOTBALL",
      image: "/homepage/football.jpeg",
    },
    {
      name: "PADEL",
      image: "/activities/padel.jpg",
      whatsappNumber: PADEL_SPA_WHATSAPP_NUMBER,
    },
  ];

  const bottomActivities: Activity[] = [
    {
      name: "TENNIS",
      image: "/homepage/tennis.jpg",
    },
    {
      name: "BASKETBALL",
      image: "/homepage/basketball.jpg",
    },
    {
      name: "GYM",
      image: "/homepage/gym.jpg",
    },
    {
      name: "SPA",
      image: "/activities/spa.jpg",
      position: "object-[center_62%]",
      whatsappNumber: PADEL_SPA_WHATSAPP_NUMBER,
    },
  ];

  return (
    <section className="w-full min-h-[70vh] lg:min-h-screen relative overflow-hidden -mt-1 py-30">
      {/* Diagonal split background */}
      <div className="absolute inset-0">
        {/* Dark section (top) - #0B3E80 */}
        <div
          className="absolute inset-0 bg-[#0B3E80]"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% ${50 - diagonalAngle}%, 0 ${
              50 + diagonalAngle
            }%)`,
          }}
        />

        {/* White section (bottom) */}
        <div
          className="absolute inset-0 bg-[#F1EAEA]"
          style={{
            clipPath: `polygon(0 ${50 + diagonalAngle}%, 100% ${
              50 - diagonalAngle
            }%, 100% 100%, 0 100%)`,
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full min-h-[70vh] lg:min-h-screen pb-20 md:pb-32 lg:pb-24 px-6 md:px-12 lg:px-[200px]">
        {/* Title */}
        <div className="flex items-start justify-between mb-6 md:mb-8">
          <h2 className="text-white text-lg md:text-xl lg:text-[25px] font-bold leading-tight text-left">
            ATHLETICO
            <br />
            SPORTS CITY
          </h2>

          <a
            href={whatsappUrl}
            className="
    text-[#FFE400]
    text-sm md:text-base lg:text-[16px]
    leading-tight
    underline underline-offset-4
    hover:opacity-80 transition-opacity
    mt-5 md:mt-6
  "
          >
            Rent Your Space
          </a>
        </div>

        {/* Grid Container */}
        <div className="flex flex-col">
          {/* Top Row - Two Large Activities */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {topActivities.map((activity) => (
              <ActivityCard
                key={activity.name}
                activity={activity}
                className="h-[240px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
                isLarge
              />
            ))}
          </div>

          {/* Bottom Row - 4 Equal Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {bottomActivities.map((activity) => (
              <ActivityCard
                key={activity.name}
                activity={activity}
                className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== ACTIVITY CARD COMPONENT ====================
function ActivityCard({
  activity,
  className = "",
  isLarge = false,
}: {
  activity: Activity;
  className?: string;
  isLarge?: boolean;
}) {
  return (
    <a
      href={whatsappLink(undefined, activity.whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative overflow-hidden group cursor-pointer block ${className}`}
    >
      {/* Image with zoom effect on hover */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className={`object-cover ${activity.position ?? ""}`}
          sizes={isLarge ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
        />
      </motion.div>

      {/* Default Overlay - dark */}
      <div className="absolute inset-0 bg-black/40 group-hover:opacity-0 transition-opacity duration-500 z-[1]" />

      {/* Hover Overlay - blue */}
      <div className="absolute inset-0 bg-[#0B3E80]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[2]" />

      {/* Default Activity Name */}
      <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold uppercase tracking-wide drop-shadow-lg">
          {activity.name}
        </h3>
      </div>

      {/* Hover Text - Rent Your Space */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-[#FFE400] text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold uppercase tracking-wide drop-shadow-lg">
          RENT YOUR SPACE
        </h3>
      </div>
    </a>
  );
}
