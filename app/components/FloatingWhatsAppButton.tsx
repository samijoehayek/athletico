"use client";

export default function FloatingWhatsAppButton() {
  const whatsappNumber = "96170202030";
  const whatsappMessage = "Hello! I would like to get more information.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-5 right-5 sm:bottom-6 sm:right-6
        z-[9999]
        h-14 w-14 sm:h-16 sm:w-16
        rounded-full
        bg-[#25D366] hover:bg-[#20bd5a]
        text-white
        shadow-xl
        flex items-center justify-center
        transition-all duration-300 ease-out
        hover:scale-110
        active:scale-95
      "
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 sm:h-8 sm:w-8"
      >
        <path d="M12.04 2.01C6.53 2.01 2.01 6.53 2.01 12.04c0 1.77.46 3.5 1.33 5.03L2 22l5.11-1.33a10 10 0 0 0 4.93 1.26h.01c5.51 0 10.03-4.52 10.03-10.03 0-5.51-4.52-9.89-10.03-9.89zm5.88 14.26c-.25.7-1.45 1.34-2 1.43-.5.08-1.14.12-1.84-.12-.43-.14-.99-.32-1.7-.64-3.01-1.3-4.97-4.3-5.12-4.5-.15-.2-1.22-1.63-1.22-3.11 0-1.48.78-2.21 1.06-2.51.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.85 2.07.93 2.22.08.15.13.33.02.53-.11.2-.16.33-.31.51-.15.18-.32.4-.46.54-.15.15-.3.32-.13.62.17.3.75 1.23 1.6 1.99 1.1.98 2.03 1.28 2.33 1.43.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.41-.25.69-.15.28.1 1.77.84 2.08.99.3.15.51.23.59.36.08.13.08.75-.17 1.45z" />
      </svg>
    </a>
  );
}
