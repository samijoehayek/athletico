"use client";

import Image from "next/image";

// Mirrors FoundersSection's metrics: logo in the title slot, same divider,
// same single full-width white card sitting on the navy page.
export default function FoundationSection() {
  const paragraphs = [
    "Athletico was created by parents, for kids. The Foundation exists to protect that idea.",
    "We support more than 450 players every year through financial aid, ensuring full support for many families in need. Every case is handled personally, with dignity and respect.",
    "Because a child's place on the pitch should depend on their effort and attitude, never on their family's circumstances.",
    "Football is what brings us together. But what happens around the game matters just as much: the confidence, the friendships, the discipline, the joy in weeks that are not always easy.",
    "Athletico is independent and open to all children, whatever their background, whatever their level.",
  ];

  return (
    <section className="mt-20 md:mt-24">
      {/* Section Title — the Foundation logo stands in for the text title */}
      <h3>
        <Image
          src="/team/athletico-foundation.png"
          alt="Athletico Foundation"
          width={1000}
          height={260}
          className="w-[260px] sm:w-[320px] md:w-[380px] h-auto"
          sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 380px"
        />
      </h3>

      {/* Divider Line */}
      <div className="w-full h-px bg-[#444] mt-6 mb-10" />

      {/* Single Full-Width Card */}
      <div className="bg-white shadow-xl overflow-hidden">
        <div className="px-6 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20">
          {/* Lead statement */}
          <p className="text-[#0B3E80] font-extrabold uppercase leading-[0.95] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-[56px] max-w-[18ch]">
            Every child deserves to play football.
          </p>

          {/* Accent rule, echoing the Vision / Mission blockquote treatment */}
          <div className="w-16 h-1 bg-[#FFE400] mt-8 mb-8 md:mt-10 md:mb-10" />

          {/* Body — column flow keeps the paragraphs in order without the
              ragged gaps a two-column grid leaves between uneven rows. */}
          <div className="lg:columns-2 lg:gap-12 xl:gap-20">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="break-inside-avoid mb-5 md:mb-6 last:mb-0 text-[#0B3E80]/75 text-sm md:text-base lg:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Closing line */}
          <p className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-[#0B3E80]/10 text-[#0B3E80] font-bold uppercase tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[34px] leading-snug">
            The game belongs to all of them.
          </p>
        </div>
      </div>
    </section>
  );
}
