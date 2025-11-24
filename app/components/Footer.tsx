"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Branch {
  name: string;
  phone: string;
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const branches: Branch[] = [
    { name: "Headquarter", phone: "+961 70 202030" },
    { name: "SJS, Cornet Chehwan", phone: "+961 79 100 023" },
    { name: "Pro Football, Kfarchima", phone: "+961 79 100 027" },
    { name: "Athletico Sports City, Dbayeh", phone: "+961 70 202030" },
    { name: "Hooligans, Horsh Tabet", phone: "+961 79 100 024" },
    { name: "Deir el Kalaa CC, Beit Mery", phone: "+961 03 655 957" },
    { name: "Freres, Furn el Chebak", phone: "+961 79 100 025" },
    { name: "WFC Fields, Jnah", phone: "+961 70 344 483" },
    { name: "Chadi Soccer Stadium, Mansourieh", phone: "+961 76 151 808" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  // Duplicate the slogan for infinite scroll
  const slogan = "90 MINUTES. INFINITE MEMORIES. ";
  const repeatedSlogan = slogan.repeat(10);

  return (
    <footer className="w-full h-[150vh] bg-[#3050FD] flex flex-col font-outfit">
      {/* PART 1: Newsletter Section (20vh) */}
      <div className="h-[50vh] px-50 flex flex-col justify-center">
        {/* Newsletter Title */}
        <h2 className="text-white text-[50px] font-extrabold uppercase leading-tight mb-6">
          SUBSCRIBE TO OUR
          <br />
          NEWSLETTER
        </h2>

        {/* Email Input and Subscribe Button */}
        <form onSubmit={handleSubscribe} className="flex items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="bg-transparent border-2 border-white text-white placeholder:text-white/60 px-6 py-4 text-lg outline-none focus:border-white/80 transition-colors w-[500px]"
          />
          <button
            type="submit"
            className="bg-white text-[#3050FD] font-bold uppercase px-10 py-4 text-lg hover:bg-white/90 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* White Divider Line */}
      <div className="w-full border-t border-white/50" />

      {/* PART 2: Main Footer Content */}
      <div className="flex-grow flex flex-col">
        {/* Athletico Title and Branches */}
        <div className="px-50 py-30">
          {/* Title */}
          <h3 className="text-white text-[50px] font-bold uppercase mb-8">
            ATHLETICO
          </h3>

          {/* Branches Title */}
          <h4 className="text-white text-[20px] font-semibold uppercase mb-6">
            Branches
          </h4>

          {/* Branches Grid - 3 columns, 3 rows */}
          <div className="grid grid-cols-3 gap-x-16 gap-y-8">
            {branches.map((branch, index) => (
              <div key={index}>
                <p className="text-white text-[18px] font-medium mb-2">
                  {branch.name}
                </p>
                <a
                  href={`tel:${branch.phone.replace(/\s/g, "")}`}
                  className="text-white text-[16px] flex items-center gap-2 hover:underline"
                >
                  <PhoneIcon />
                  {branch.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3: Infinite Scrolling Slogan Banner */}
        <div className="overflow-hidden bg-[#3050FD] py-8">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            <span className="text-white text-[190px] font-bold uppercase">
              {repeatedSlogan}
            </span>
          </motion.div>
        </div>

        {/* PART 4: Copyright and Social Media */}
        <div className="px-20 py-8 flex justify-between items-center">
          {/* Copyright */}
          <p className="text-white text-sm opacity-70">
            © 2025 Developed by dot.jo, all rights reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex items-center gap-6">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="Twitter"
            >
              <TwitterIcon />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-white hover:opacity-70 transition-opacity"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ==================== ICON COMPONENTS ====================
function PhoneIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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

function TwitterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
