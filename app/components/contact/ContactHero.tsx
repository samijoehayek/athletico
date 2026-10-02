// app/contact/components/ContactHero.tsx

import { whatsappLink } from "@/lib/site";

export default function ContactHero() {
  return (
    <section className="w-full px-6 md:px-10 lg:px-16 pt-10 md:pt-14 lg:pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Row 1: Full Width Title Block */}
      <div className="mb-12 md:mb-16">
        {/* Small Label */}
        <p
          className="text-[#0B3E80] text-sm font-semibold uppercase tracking-widest mb-2"
          style={{ letterSpacing: "0.12em" }}
        >
          GET STARTED
        </p>

        {/* Main Title */}
        <h1
          className="text-[#0B3E80] font-extrabold leading-tight mb-3"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1,
          }}
        >
          Get in touch with us.
        </h1>

        {/* Subtitle - no underline, not bold */}
        <p
          className="text-[#0B3E80] font-normal"
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
          }}
        >
          We&apos;re here to assist you
        </p>

        {/* Primary CTA — the fastest way to reach the club */}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase text-sm md:text-base tracking-wider px-6 sm:px-8 py-4 transition-colors"
        >
          <WhatsAppIcon />
          Chat with us on WhatsApp
        </a>
      </div>

      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2.01C6.53 2.01 2.01 6.53 2.01 12.04c0 1.77.46 3.5 1.33 5.03L2 22l5.11-1.33a10 10 0 0 0 4.93 1.26h.01c5.51 0 10.03-4.52 10.03-10.03 0-5.51-4.52-9.89-10.03-9.89zm5.88 14.26c-.25.7-1.45 1.34-2 1.43-.5.08-1.14.12-1.84-.12-.43-.14-.99-.32-1.7-.64-3.01-1.3-4.97-4.3-5.12-4.5-.15-.2-1.22-1.63-1.22-3.11 0-1.48.78-2.21 1.06-2.51.28-.3.61-.38.81-.38.2 0 .41 0 .59.01.19.01.44-.07.69.53.25.6.85 2.07.93 2.22.08.15.13.33.02.53-.11.2-.16.33-.31.51-.15.18-.32.4-.46.54-.15.15-.3.32-.13.62.17.3.75 1.23 1.6 1.99 1.1.98 2.03 1.28 2.33 1.43.3.15.48.13.66-.08.18-.2.76-.89.97-1.2.2-.3.41-.25.69-.15.28.1 1.77.84 2.08.99.3.15.51.23.59.36.08.13.08.75-.17 1.45z" />
    </svg>
  );
}
