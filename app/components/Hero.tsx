import Navbar from "./Navbar";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homepage-bg.png"
          alt="Athletico Sports Club Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* Overlay for better text readability on mobile */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between px-4 md:px-8 lg:px-12 pt-24 md:pt-12 pb-8 md:pb-12">
          {/* Title Section */}
          <div className="max-w-screen-2xl mx-auto w-full">
            <h1 className="text-white font-extrabold text-6xl md:text-8xl lg:text-[120px] leading-tight md:leading-none lg:pb-8 [text-shadow:_1px_1px_0_#000,_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000]">
              ATHLETICO
            </h1>
            <h2 className="text-white font-normal text-4xl md:text-6xl lg:text-[80px] leading-tight md:leading-none">
              SPORTS CLUB
            </h2>
          </div>

          {/* Opening Hours */}
          <div className="max-w-screen-2xl mx-auto w-full">
            <p className="text-[#3050FD] font-normal text-base md:text-xl uppercase">
              CLUB OPENING HOURS
            </p>
            <p className="text-[#3050FD] font-normal text-base md:text-xl">
              8AM to 12AM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
