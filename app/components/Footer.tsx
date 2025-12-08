"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Branch {
  name: string;
  phone: string;
}

export default function Footer() {
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

  const whatsappNumber = "96170202030";
  const whatsappMessage = "Hello! I would like to get more information.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const slogan = "90 MINUTES. INFINITE MEMORIES. ";
  const repeatedSlogan = slogan.repeat(10);

  return (
    <footer className="w-full bg-[#3050FD] flex flex-col font-outfit">
      {/* PART 1: WhatsApp Section */}
      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-24 py-10 md:py-16 lg:py-20 flex flex-col justify-center">
        <h2 className="text-white text-3xl sm:text-4xl md:text-[40px] lg:text-[50px] font-extrabold leading-tight mb-3">
          WhatsApp
        </h2>

        <p className="text-white/80 text-base sm:text-lg md:text-[18px] font-normal mb-6 max-w-xl">
          For faster responses, reach us on WhatsApp
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg transition-colors w-fit"
        >
          <WhatsAppIcon />
          Chat on WhatsApp
        </a>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-white/50" />

      {/* PART 2: Main Footer Content */}
      <div className="flex flex-col flex-grow">
        {/* Athletico Title and Branches */}
        <div className="px-4 sm:px-6 lg:px-16 xl:px-24 py-10 md:py-14 lg:py-16">
          <h3 className="text-white text-3xl sm:text-4xl md:text-[40px] lg:text-[50px] font-bold uppercase mb-6 md:mb-8">
            ATHLETICO
          </h3>

          <h4 className="text-white text-base sm:text-lg md:text-[20px] font-semibold uppercase mb-4 md:mb-6">
            Branches
          </h4>

          {/* Branches Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-x-16 gap-y-6 md:gap-y-8">
            {branches.map((branch, index) => (
              <div key={index}>
                <p className="text-white text-base sm:text-[17px] md:text-[18px] font-medium mb-1.5">
                  {branch.name}
                </p>
                <a
                  href={`tel:${branch.phone.replace(/\s/g, "")}`}
                  className="text-white text-sm sm:text-[15px] md:text-[16px] flex items-center gap-2 hover:underline"
                >
                  <PhoneIcon />
                  {branch.phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* PART 3: Infinite Scrolling Slogan Banner */}
        <div className="overflow-hidden bg-[#3050FD] py-4 sm:py-6 md:py-8">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{ x: [0, "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            <span className="text-white font-bold uppercase text-4xl sm:text-5xl md:text-6xl lg:text-[140px] xl:text-[190px] leading-none">
              {repeatedSlogan}
            </span>
          </motion.div>
        </div>

        {/* PART 4: Copyright and Social Media */}
        <div className="px-4 sm:px-6 lg:px-16 xl:px-24 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-white text-xs sm:text-sm opacity-70">
            © 2025 Developed by dot.jo, all rights reserved.
          </p>

          <div className="flex items-center gap-4 sm:gap-6">
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
function WhatsAppIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
