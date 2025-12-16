"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Activity {
  name: string;
  image: string;
}

export default function OtherActivitiesSection() {
  const whatsappNumber = "96170202030";
  const whatsappMessage = "Hello! I would like to get more information.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
  // Adjustable diagonal angle - increase this number to make the diagonal steeper
  // Lower values = more horizontal, Higher values = more vertical
  const diagonalAngle = 22; // Percentage - adjusts the slope of the diagonal

  const activities: Activity[] = [
    {
      name: "TENNIS",
      image: "/tennis.png",
    },
    {
      name: "BASKETBALL",
      image: "/basketball.png",
    },
    {
      name: "PADDEL",
      image: "/padel.png",
    },
    {
      name: "GYM",
      image: "/gym.png",
    },
    {
      name: "FOOTBALL",
      image: "/football.png",
    },
  ];

  const topActivity = activities[0];
  const bottomActivities = activities.slice(1);

  return (
    <section className="w-full min-h-[70vh] lg:min-h-screen relative overflow-hidden -mt-1 py-30">
      {/* Diagonal split background */}
      <div className="absolute inset-0">
        {/* Dark section (top) - #171717 */}
        <div
          className="absolute inset-0 bg-[#171717]"
          style={{
            clipPath: `polygon(0 0, 100% 0, 100% ${50 - diagonalAngle}%, 0 ${
              50 + diagonalAngle
            }%)`,
          }}
        />

        {/* White section (bottom) */}
        <div
          className="absolute inset-0 bg-white"
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
    text-[#FFFFFF]
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
          {/* Top Row - Single Large Activity (Padel) */}
          <ActivityCard
            activity={topActivity}
            className="w-full h-[300px] sm:h-[300px] md:h-[350px] lg:h-[400px]"
            isLarge
          />

          {/* Bottom Row - 4 Equal Columns (if there are more activities) */}
          {bottomActivities.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4">
              {bottomActivities.map((activity, index) => (
                <ActivityCard
                  key={index}
                  activity={activity}
                  className="h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px]"
                />
              ))}
            </div>
          )}
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
    <div
      className={`relative overflow-hidden group cursor-pointer ${className}`}
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
          className="object-cover"
          sizes={isLarge ? "100vw" : "(max-width: 768px) 50vw, 25vw"}
        />
      </motion.div>

      {/* Overlay - dark normally, bright on hover (light effect) */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-white/20 transition-colors duration-500 z-[1]" />

      {/* Activity Name */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h3 className="text-white text-xl sm:text-xl md:text-2xl lg:text-2xl font-bold uppercase tracking-wide drop-shadow-lg">
          {activity.name}
        </h3>
      </div>
    </div>
  );
}
