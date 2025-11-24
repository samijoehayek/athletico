"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function CareersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll animations
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section ref={containerRef} className="h-[200vh] relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#171717]">
          <motion.div
            style={{ scale, opacity }}
            className="relative flex items-center justify-center"
          >
            {/* Outermost Circle - Covers full width */}
            <div
              className="absolute rounded-full"
              style={{
                width: "min(200vw, 200vh)",
                height: "min(200vw, 200vh)",
                backgroundColor: "#171717",
              }}
            />

            {/* Second Circle - 10% opacity */}
            <div
              className="absolute rounded-full"
              style={{
                width: "min(130vw, 130vh)",
                height: "min(130vw, 130vh)",
                backgroundColor: "rgba(23, 23, 23, 0.1)",
              }}
            />

            {/* Third Circle - 5% opacity */}
            <div
              className="absolute rounded-full"
              style={{
                width: "min(80vw, 80vh)",
                height: "min(80vw, 80vh)",
                backgroundColor: "rgba(23, 23, 23, 0.05)",
              }}
            />

            {/* Center Image - circle.png */}
            <div className="relative z-10 rounded-full overflow-hidden w-[40vmin] h-[40vmin]">
              <Image
                src="/circle.png"
                alt="Careers"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Curved Text */}
          <motion.div
            style={{ opacity }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px]"
          >
            <svg
              viewBox="0 0 700 120"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <path id="curve" d="M 80 100 Q 350 20, 620 100" fill="none" />
              </defs>
              <text
                fill="white"
                fontSize="24"
                fontWeight="300"
                letterSpacing="2"
              >
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                  Scroll down to explore more
                </textPath>
              </text>
            </svg>

            {/* Scroll Arrow */}
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg
                className="w-6 h-6 text-white opacity-70"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="relative z-10 bg-white py-20 lg:py-28">
        <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[40px] lg:text-[56px] font-bold uppercase text-[#171717] mb-4">
              CAREER OPPORTUNITIES
            </h2>
            <div className="w-full h-[1px] bg-[#171717] mb-16"></div>
          </motion.div>

          {/* Job Listings */}
          <div className="space-y-6">
            {[
              {
                title: "SPORTS MEDICINE SPECIALIST",
                department: "Medical",
                location: "Beirut, Lebanon",
                type: "Full-time",
              },
              {
                title: "PERFORMANCE COACH",
                department: "Training",
                location: "Beirut, Lebanon",
                type: "Full-time",
              },
              {
                title: "PHYSIOTHERAPIST",
                department: "Rehabilitation",
                location: "Beirut, Lebanon",
                type: "Full-time",
              },
              {
                title: "NUTRITION CONSULTANT",
                department: "Wellness",
                location: "Beirut, Lebanon",
                type: "Part-time",
              },
              {
                title: "ATHLETIC TRAINER",
                department: "Training",
                location: "Beirut, Lebanon",
                type: "Full-time",
              },
              {
                title: "SPORTS PSYCHOLOGIST",
                department: "Mental Performance",
                location: "Beirut, Lebanon",
                type: "Contract",
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group cursor-pointer border-b border-gray-200 pb-6 hover:border-[#3050FD] transition-all"
              >
                <div className="flex justify-between items-start gap-8">
                  <div className="flex-1">
                    <h3 className="text-[22px] lg:text-[28px] font-bold uppercase text-[#171717] mb-3 group-hover:text-[#3050FD] transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-[14px] lg:text-[16px] text-[#171717] opacity-60">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="w-6 h-6 text-[#171717] group-hover:text-[#3050FD] transition-colors"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-[16px] lg:text-[18px] text-[#171717] opacity-70 mb-6">
              Don't see a position that fits? We're always looking for talented
              individuals.
            </p>
            <button className="px-8 py-4 bg-[#3050FD] text-white text-[14px] lg:text-[16px] font-semibold uppercase rounded-lg hover:bg-[#2040DD] transition-colors">
              Send General Application
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
