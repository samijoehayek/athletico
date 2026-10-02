"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const slogan = "LIVE YOUR PASSION ";
  const repeatedSlogan = slogan.repeat(10);

  return (
    <footer className="w-full bg-[#0B3E80] flex flex-col font-outfit">
      {/* PART 2: Main Footer Content */}
      <div className="flex flex-col flex-grow">
        {/* Athletico Title and Branches */}
        <div className="px-4 sm:px-6 lg:px-16 xl:px-24 py-10 md:py-14 lg:py-16">
          <h3 className="text-white text-3xl sm:text-4xl md:text-[40px] lg:text-[50px] font-bold uppercase mb-6 md:mb-8">
            ATHLETICO SC
          </h3>

          <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-4 md:mb-6">
            <Link
              href="/contact"
              className="text-white text-base sm:text-lg md:text-[20px] uppercase hover:opacity-70 transition-opacity"
            >
              Branches
            </Link>

            <Link
              href="/contact"
              className="text-white text-base sm:text-lg md:text-[20px] uppercase hover:opacity-70 transition-opacity"
            >
              Join us
            </Link>
          </div>

        </div>

        {/* PART 3: Infinite Scrolling Slogan Banner */}
        <div className="overflow-hidden bg-[#0B3E80] py-4 sm:py-6 md:py-8">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, "-400%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            <span className="text-[#F1EAEA] font-bold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-[140px] xl:text-[190px] leading-none">
              {repeatedSlogan}
            </span>
          </motion.div>
        </div>

        {/* PART 4: Copyright and Social Media */}
        <div className="px-4 sm:px-6 lg:px-16 xl:px-24 py-6 md:py-8 relative flex flex-col md:flex-row md:items-center gap-4">
          {/* Copyright – stays in the same position */}
          <div className="flex items-center gap-3 text-white text-xs sm:text-sm">
            <p className="opacity-70">
              © 2025 Developed by dot.jo, all rights reserved.
            </p>
            <span className="opacity-40 hidden sm:inline">·</span>
            <span className="hidden sm:inline-flex items-center gap-2 opacity-90">
              <LebaneseFlag />
              <span className="uppercase tracking-widest text-[10px] sm:text-[11px] opacity-80">
                Proudly Lebanese
              </span>
            </span>
          </div>

          {/* Social Media – centered */}
          <div
            className="
      flex items-center gap-4 sm:gap-6
      md:absolute md:left-1/2 md:-translate-x-1/2
    "
          >
            <Link
              href="https://www.facebook.com/share/18ztVNBow6/"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>

            <Link
              href="https://www.instagram.com/athletico.sc"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>

            <Link
              href="https://www.tiktok.com/@athletico.sc"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </Link>

            <Link
              href="https://youtube.com/@athleticosportsclub6766"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="YouTube"
            >
              <YouTubeIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== ICON COMPONENTS ====================
function LebaneseFlag() {
  // 3:2 stylized Lebanese flag with a simplified cedar silhouette.
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 30 20"
      aria-label="Lebanese flag"
      role="img"
      className="rounded-[1px] shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
    >
      <rect x="0" y="0" width="30" height="5" fill="#ED1C24" />
      <rect x="0" y="5" width="30" height="10" fill="#FFFFFF" />
      <rect x="0" y="15" width="30" height="5" fill="#ED1C24" />
      {/* Stylized cedar */}
      <g fill="#00853F" transform="translate(15 10)">
        <polygon points="0,-3.6 -3.2,1.2 3.2,1.2" />
        <polygon points="0,-1.8 -2.4,2.4 2.4,2.4" />
        <polygon points="0,0 -1.8,3 1.8,3" />
        <rect x="-0.5" y="2.6" width="1" height="1.4" />
      </g>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.76.12v-3.2a5.8 5.8 0 0 0-.76-.05A5.72 5.72 0 0 0 4.14 15.3a5.72 5.72 0 0 0 5.72 5.72 5.72 5.72 0 0 0 5.72-5.72V9.01a7.35 7.35 0 0 0 4.28 1.37V7.3a4.29 4.29 0 0 1-3.26-1.48z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}
