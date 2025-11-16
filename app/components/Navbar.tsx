"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/athletico", label: "ATHLETICO" },
    { href: "/branches", label: "BRANCHES" },
    { href: "/services", label: "OUR SERVICES" },
    { href: "/careers", label: "CAREERS" },
    { href: "/contact", label: "CONTACT US" },
  ];

  return (
    <>
      <nav className="relative z-50 px-6 md:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between w-full">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#3050FD] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu - Right Aligned */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-white text-sm lg:text-base uppercase transition-all hover:text-[#3050FD] ${
                  isActive(link.href) ? "font-bold" : "font-normal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Spacer */}
          <div className="md:hidden w-6" />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/95 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 pt-20 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-white text-base uppercase transition-colors hover:text-[#3050FD] ${
                isActive(link.href) ? "font-bold" : "font-normal"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
