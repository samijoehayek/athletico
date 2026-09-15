// app/contact/components/ContactHero.tsx

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
      </div>

      </div>
    </section>
  );
}
