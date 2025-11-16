import Navbar from "./Navbar";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-[#171717]">
      {/* Background Image */}
      <Image
        src="/homepage-bg.png"
        alt="Athletico Sports Club Background"
        fill
        sizes="100vw"
        className="object-cover"
        priority
        quality={90}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between px-8 md:px-12 lg:px-16 pt-24 md:pt-16 pb-8 md:pb-12">
          {/* Title Section - Left Aligned */}
          <div className="max-w-screen-2xl w-full">
            <h1 className="text-white font-extrabold text-6xl md:text-8xl lg:text-[120px] xl:text-[140px] leading-none">
              ATHLETICO
            </h1>
            <h2 className="text-white font-normal text-4xl md:text-6xl lg:text-[80px] xl:text-[90px] leading-none mt-2">
              SPORTS CLUB
            </h2>
          </div>

          {/* Opening Hours - Left Aligned */}
          <div className="max-w-screen-2xl w-full">
            <p className="text-[#3050FD] font-semibold text-base md:text-lg lg:text-xl uppercase tracking-wide">
              CLUB OPENING HOURS
            </p>
            <p className="text-[#3050FD] font-normal text-lg md:text-xl lg:text-2xl mt-1">
              8AM to 12AM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
