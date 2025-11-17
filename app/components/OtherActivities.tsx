"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Activity {
  name: string;
  image: string;
}

export default function OtherActivitiesSection() {
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
    <section className="w-full min-h-screen relative overflow-hidden -mt-1">
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
      <div className="relative z-10 w-full min-h-screen pb-[200px] px-[200px]">
        {/* Title - Top Right */}
        <div className="flex justify-start mb-8">
          <h2 className="text-white text-[25px] font-bold leading-tight text-left">
            OTHER
            <br />
            ACTIVITIES
          </h2>
        </div>

        {/* Grid Container */}
        <div className="flex flex-col">
          {/* Top Row - Single Large Activity (Tennis) */}
          <ActivityCard
            activity={topActivity}
            className="w-full h-[550px]"
            isLarge
          />

          {/* Bottom Row - 4 Equal Columns */}
          <div className="grid grid-cols-4">
            {bottomActivities.map((activity, index) => (
              <ActivityCard
                key={index}
                activity={activity}
                className="h-[550px]"
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
          sizes={isLarge ? "100vw" : "25vw"}
        />
      </motion.div>

      {/* Overlay - dark normally, bright on hover (light effect) */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-white/20 transition-colors duration-500 z-[1]" />

      {/* Activity Name */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h3 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide drop-shadow-lg">
          {activity.name}
        </h3>
      </div>
    </div>
  );
}
