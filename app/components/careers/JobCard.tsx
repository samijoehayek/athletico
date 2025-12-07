"use client";

import { motion } from "framer-motion";

interface JobCardProps {
  title: string;
  positions: number;
  description: string;
  onApply?: () => void;
}

export default function JobCard({
  title,
  positions,
  description,
  onApply,
}: JobCardProps) {
  return (
    <motion.div
      className="w-full bg-[#f5f5f5] px-12 py-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-start">
        {/* Left Content */}
        <div className="flex-1 pr-12">
          {/* Title */}
          <h3 className="text-[#171717] text-2xl md:text-3xl font-bold uppercase leading-tight mb-2 font-outfit">
            {title}
          </h3>

          {/* Positions Count */}
          <p className="text-[#171717]/60 text-sm font-medium uppercase tracking-wide mb-6">
            {positions} {positions === 1 ? "POSITION" : "POSITIONS"}
          </p>

          {/* Description */}
          <p className="text-[#171717]/80 text-base leading-relaxed max-w-4xl">
            {description}
          </p>
        </div>

        {/* Apply Button */}
        <motion.button
          onClick={onApply}
          className="flex-shrink-0 flex items-center gap-3 px-8 py-4 border-2 border-[#3050FD] text-[#3050FD] font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-[#3050FD] hover:text-white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
