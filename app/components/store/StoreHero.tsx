// app/components/store/StoreHero.tsx
//
// Reuses two devices already established on the site: the diagonal clip-path
// split from the Achievements hero, and the image-filled display type from the
// Statistics section's ATHLETICO wordmark.

import Navbar from "../Navbar";

export default function StoreHero() {
  const diagonalAngle = 12;

  return (
    <section className="relative w-full h-[58vh] min-h-[420px] overflow-hidden">
      <div
        className="absolute inset-0 bg-[#F1EAEA]"
        style={{ clipPath: `polygon(0 0, 100% 0, 100% ${100 - diagonalAngle}%, 0 100%)` }}
      />
      <div
        className="absolute inset-0 bg-[#0B3E80]"
        style={{ clipPath: `polygon(0 100%, 100% ${100 - diagonalAngle}%, 100% 100%)` }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <Navbar mode="dark" />

        <div className="flex-1 px-6 md:px-12 lg:px-16 pb-16">
          <div className="max-w-screen-2xl mx-auto h-full flex flex-col justify-center">
            <p className="text-[#0B3E80] font-bold text-base sm:text-lg md:text-2xl uppercase tracking-wide mb-1">
              Athletico
            </p>
            <h1
              className="font-extrabold uppercase leading-[0.85] tracking-tight text-[#0B3E80]"
              style={{
                fontSize: "clamp(72px, 16vw, 240px)",
                backgroundImage: "url('/homepage/football.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center 35%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              Store
            </h1>
            <p className="text-[#0B3E80]/70 text-sm md:text-base max-w-xl mt-4">
              The official club range — match kit, training wear and equipment. Delivered across
              Lebanon, or collect from your branch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
