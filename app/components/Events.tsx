"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function EventsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          scrollContainerRef.current;
        const maxScroll = scrollHeight - clientHeight;
        const position = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setScrollPosition(position);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const events = [
    {
      date: "MONDAY, OCTOBER 20, 2025",
      time: "16:45",
      team1: "REAL MADRID",
      team2: "BARCELONA",
    },
    {
      date: "TUESDAY, OCTOBER 21, 2025",
      time: "18:30",
      team1: "MANCHESTER UNITED",
      team2: "LIVERPOOL",
    },
    {
      date: "WEDNESDAY, OCTOBER 22, 2025",
      time: "20:00",
      team1: "BAYERN MUNICH",
      team2: "BORUSSIA DORTMUND",
    },
    {
      date: "THURSDAY, OCTOBER 23, 2025",
      time: "19:15",
      team1: "PARIS SAINT-GERMAIN",
      team2: "MARSEILLE",
    },
    {
      date: "FRIDAY, OCTOBER 24, 2025",
      time: "21:00",
      team1: "JUVENTUS",
      team2: "AC MILAN",
    },
    {
      date: "SATURDAY, OCTOBER 25, 2025",
      time: "17:30",
      team1: "CHELSEA",
      team2: "ARSENAL",
    },
  ];

  const pastEvents = [
    {
      title: "MADRID",
      image: "/realmadrid.webp",
    },
    {
      title: "BARCELONA",
      image: "/bareclona.jpg",
    },
    {
      title: "TOURNAMENTS",
      image: "/tournament.jpg",
    },
  ];

  const indicatorHeight = 60;
  const maxIndicatorTravel = 200 - indicatorHeight;

  return (
    <section className="bg-[#171717] w-full px-6 md:px-12 lg:px-16 h-[20vh]">
      <div className="flex flex-col md:flex-row h-full">
        {/* Left Column - Catalog (30%) */}
        <div className="w-full md:w-[30%] flex h-full">
          {/* Progress Line Container */}
          <div className="relative w-[1.5px] bg-white my-8 h-[200px]">
            {/* Blue Moving Indicator */}
            <div
              className="absolute left-0 w-full bg-[#3050FD] transition-all duration-150 ease-out"
              style={{
                height: `${indicatorHeight}px`,
                top: `${scrollPosition * maxIndicatorTravel}px`,
              }}
            />
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 flex flex-col pl-6 md:pl-8 pr-4 py-8">
            {/* Header */}
            <div className="mb-4">
              <p className="text-white text-base md:text-lg uppercase font-normal">
                EXPLORE ALL UPCOMING
              </p>
              <p className="text-white text-xl md:text-2xl uppercase font-bold">
                EVENTS & UPDATES
              </p>
            </div>

            {/* Events List - Scrollable with Fade */}
            <div className="relative flex-1 overflow-hidden">
              <div
                ref={scrollContainerRef}
                className="h-full overflow-y-scroll space-y-6 pr-2 scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {events.map((event, index) => (
                  <div key={index}>
                    {/* Date and Time - Underlined */}
                    <p className="text-white text-xs md:text-sm uppercase mb-3 underline underline-offset-2">
                      {event.date} | {event.time}
                    </p>

                    {/* Teams */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-white flex-shrink-0" />
                        <p className="text-white text-sm md:text-base uppercase font-medium">
                          {event.team1}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-white flex-shrink-0" />
                        <p className="text-white text-sm md:text-base uppercase font-medium">
                          {event.team2}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Fade Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#171717] to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column (70%) - Past Events */}
        <div className="w-full md:w-[70%] flex items-center justify-end py-8 md:py-0">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="relative w-full md:w-[350px] h-[220px] overflow-hidden cursor-pointer group"
              >
                {/* Image */}
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-all duration-300"
                />

                {/* Overlay - Dimmed by default, brightens on hover */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-all duration-300" />

                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-wide">
                    {event.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
