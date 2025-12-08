// app/components/Navbar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  mode?: "light" | "dark";
}

export default function Navbar({ mode = "light" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const textColor = mode === "dark" ? "text-[#171717]" : "text-white";
  const hoverColor = "hover:text-[#3050FD]";
  const mobileMenuBg = mode === "dark" ? "bg-white/95" : "bg-black/95";
  const mobileOverlayBg = mode === "dark" ? "bg-white/50" : "bg-black/50";

  const isActive = (path: string) => {
    // Handle hash links
    if (path.includes("#")) {
      return false;
    }
    return pathname === path;
  };

  const navLinks = [
    { href: "/", label: "HOME" },
    // { href: "/athletico", label: "ATHELETICO" },
    { href: "/team", label: "TEAM" },
    { href: "/contact#branches", label: "BRANCHES" },
    { href: "/#programs", label: "OUR SERVICES" },
    { href: "/careers", label: "CAREERS" },
    // { href: "/events", label: "EVENTS" },
    { href: "/news", label: "NEWS" },
    { href: "/contact", label: "CONTACT US" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);

    // Handle same-page hash navigation
    if (href.startsWith("/#") && pathname === "/") {
      const elementId = href.replace("/#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href.includes("#") && pathname === href.split("#")[0]) {
      const elementId = href.split("#")[1];
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav className="relative z-50 px-6 md:px-12 lg:px-16 py-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo - Left */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Athletico Logo"
              width={60}
              height={60}
              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden ${textColor} ${hoverColor} transition-colors`}
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
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`${textColor} text-sm lg:text-base uppercase transition-all ${hoverColor} ${
                  isActive(link.href) ? "font-bold" : "font-normal"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 ${mobileMenuBg} backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200/20">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Image
              src="/logo.png"
              alt="Athletico Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className={`${textColor} ${hoverColor} transition-colors`}
            aria-label="Close menu"
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
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Links */}
        <div className="flex flex-col gap-1 pt-6 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${textColor} text-base uppercase transition-colors ${hoverColor} px-4 py-3 rounded-lg hover:bg-gray-500/10 ${
                isActive(link.href) ? "font-bold bg-gray-500/10" : "font-normal"
              }`}
              onClick={() => handleLinkClick(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 ${mobileOverlayBg} z-30 md:hidden transition-opacity duration-300`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
