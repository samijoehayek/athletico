// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 md:pr-0 py-6">
        <div className="flex items-center justify-between w-full">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 text-white"
            aria-label="Toggle menu"
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            <Link
              href="/"
              className={`text-white text-base uppercase ${
                isActive("/") ? "font-bold" : "font-normal"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/athletico"
              className={`text-white text-base uppercase ${
                isActive("/athletico") ? "font-bold" : "font-normal"
              }`}
            >
              ATHLETICO
            </Link>
            <Link
              href="/branches"
              className={`text-white text-base uppercase ${
                isActive("/branches") ? "font-bold" : "font-normal"
              }`}
            >
              BRANCHES
            </Link>
            <Link
              href="/services"
              className={`text-white text-base uppercase ${
                isActive("/services") ? "font-bold" : "font-normal"
              }`}
            >
              OUR SERVICES
            </Link>
            <Link
              href="/careers"
              className={`text-white text-base uppercase ${
                isActive("/careers") ? "font-bold" : "font-normal"
              }`}
            >
              CAREERS
            </Link>
            <Link
              href="/contact"
              className={`text-white text-base uppercase ${
                isActive("/contact") ? "font-bold" : "font-normal"
              }`}
            >
              CONTACT US
            </Link>

            <Link
              href="/login"
              className="text-[#3050FD] text-base font-normal ml-8"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#3050FD] text-white text-base font-normal px-6 py-3"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Login/Signup */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/login" className="text-[#3050FD] text-sm font-normal">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-[#3050FD] text-white text-sm font-normal px-4 py-2"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black/95 backdrop-blur-sm z-40 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 pt-20 px-6">
          <Link
            href="/"
            className={`text-white text-base uppercase ${
              isActive("/") ? "font-bold" : "font-normal"
            }`}
            onClick={() => setIsOpen(false)}
          >
            HOME
          </Link>
          <Link
            href="/athletico"
            className={`text-white text-base uppercase ${
              isActive("/athletico") ? "font-bold" : "font-normal"
            }`}
            onClick={() => setIsOpen(false)}
          >
            ATHLETICO
          </Link>
          <Link
            href="/branches"
            className={`text-white text-base uppercase ${
              isActive("/branches") ? "font-bold" : "font-normal"
            }`}
            onClick={() => setIsOpen(false)}
          >
            BRANCHES
          </Link>
          <Link
            href="/services"
            className={`text-white text-base uppercase ${
              isActive("/services") ? "font-bold" : "font-normal"
            }`}
            onClick={() => setIsOpen(false)}
          >
            OUR SERVICES
          </Link>
          <Link
            href="/careers"
            className={`text-white text-base uppercase ${
              isActive("/careers") ? "font-bold" : "font-normal"
            }`}
            onClick={() => setIsOpen(false)}
          >
            CAREERS
          </Link>
          <Link
            href="/contact"
            className={`text-white text-base uppercase ${
              isActive("/contact") ? "font-bold" : "font-normal"
            }`}
            onClick={() => setIsOpen(false)}
          >
            CONTACT US
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
