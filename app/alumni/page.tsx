"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Alumni {
  name: string;
  bio: string[];
  instagram: string;
  image: string;
  message?: string;
}

export default function AlumniPage() {
  return (
    <main className="bg-[#171717] min-h-screen relative overflow-hidden">
      {/* Purple/Blue Glow - Top Right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168, 97, 249, 0.3) 0%, rgba(48, 80, 253, 0.2) 40%, transparent 70%)",
          filter: "blur(80px)",
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <Navbar />

        {/* Alumni Section */}
        <AlumniSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}

// ==================== ALUMNI SECTION ====================
function AlumniSection() {
  const alumniData: Alumni[] = [
    {
      name: "Philippe Paoli",
      bio: [
        "Philippe Paoli joined Athletico in 2006, starting at the academy's early days when the main branch was Antranik, before moving to St. Joseph. He spent 5 years at Athletico, playing as a striker.",
        "After Athletico, Philippe continued his football journey with Racing Beirut, Olympique Lyonnais (OL), FC Köln, and Lommel United.",
        "His most memorable Athletico moments include the Gothia Cup opening ceremony in front of 50,000 spectators, beating major Lebanese clubs in Athletico's first official season in the Lebanese youth championship, and international trips such as Dana Cup, plus experiences in Jordan, Syria, and Olympique Lyonnais tryouts.",
        "His advice to young Athletico players: Give everything in every training and every match. Be patient, take care of your body (eat, sleep, rest), and cherish every moment with your teammates—those friendships last for life.",
      ],
      instagram: "philippepaoli",
      image: "/ourclub1.png",
      message:
        "PHILIPPE SALUTES THE CLUB'S PROGRESS OVER THE PAST 20 YEARS AND SHARES HOW PROUD HE IS TO BE PART OF THE ATHLETICO FAMILY—EXCITED FOR THE NEXT 20 YEARS.",
    },
    {
      name: "Martin Bou Younes",
      bio: [
        "Martin Bou Younes joined Athletico in 2012 at the Dbayeh branch and spent 10 years with the club. He played as a midfielder.",
        "After Athletico, Martin played for Ahed Football Club and Sagesse Football Club.",
        "For Martin, the most memorable moments are hard to narrow down—he highlights the trips with the team and the shared experiences with the boys as the biggest memories.",
        "His advice to today's Athletico players: Enjoy every moment on the field. Athletico is more than football—it's family, friendship, and memories. Give your all in training and matches, because even if life takes you abroad or elsewhere, nothing feels like playing for this family.",
      ],
      instagram: "martinbouyounes",
      image: "/ourclub1.png",
      message: "NUMBER 1 CLUB IN LEBANON.",
    },
    {
      name: "Assaf Antoine",
      bio: [
        "Assaf Antoine joined Athletico in 2014, trained at the Dbayeh branch, and spent 8 years at the club. He played as a midfielder.",
        "After Athletico, Assaf played with AS Saint-Priest, Olympique Lyonnais, and Stade Lavallois.",
        "His most memorable moment at Athletico is simple and powerful: every trophy he won with the club.",
        "His advice to young Athletico players: Keep working hard and believe in yourself.",
      ],
      instagram: "antoine.assaf_",
      image: "/ourclub1.png",
    },
    {
      name: "Kassem Hayek",
      bio: [
        "Kassem Hayek joined Athletico in 2013 at the Dbayeh branch and spent 5 years with the club. He played as a defensive midfielder.",
        "After Athletico, he continued with Lyon-La Duchère and Al Safa FC.",
        "Kassem's standout memory is his time during the Lyon camp, which he describes as the most memorable part of his Athletico journey.",
        "His advice to young Athletico players: Push yourself every day, stay humble, and never settle—greatness comes from hard work and sacrifice.",
      ],
      instagram: "kasemhayek",
      image: "/ourclub1.png",
      message:
        "KASSEM SHARES THAT ATHLETICO SHAPED HIM DEEPLY THROUGH BOTH CHALLENGES AND VICTORIES, AND THAT HE'S PROUD TO CALL THE CLUB HIS HOME.",
    },
    {
      name: "Jacques Matta",
      bio: [
        "Jacques Matta joined Athletico at the very beginning of the journey, around 2004–2006, starting in Antelias and later at Saint Joseph. He spent 7 years at Athletico and played as a midfielder.",
        "After Athletico, he played for Racing Club (Lebanon) and Dukla Praha (Prague).",
        "His most memorable moments include the training culture, Dana Cup, international trips to Jordan and Syria, difficult matches, and the friendships formed along the way.",
        "His advice to young Athletico players: Consistency is key. Work hard, ask for advice, and never forget that football is your passion.",
      ],
      instagram: "jacquesmatta",
      image: "/ourclub1.png",
    },
    {
      name: "Ralph Khoury",
      bio: [
        "Ralph Khoury joined Athletico in 2011 at the Dbayeh branch and spent 9 years with the club. He played as a striker / right wing.",
        "After Athletico, Ralph played with Eleven Football Pro, Ottawa South United, and Atlético Ottawa.",
        "One of Ralph's most memorable highlights was training with the Olympique Lyonnais academy, along with tournament experiences including Plomelin.",
        "His advice to young Athletico players: Enjoy the game and stay patient. Hard work and consistency always pay off—even when you don't see results right away.",
      ],
      instagram: "ralphkhoury",
      image: "/ourclub1.png",
    },
    {
      name: "Hadi Jad Khalil",
      bio: [
        "Hadi Jad Khalil joined Athletico in 2018 at the Frère branch and spent 3 years at the club. He played as an attacking midfielder / central midfielder (CAM/CM).",
        "After Athletico, he went on to Al Duhail SC and represented the Qatari National Team.",
        "His most memorable Athletico moment was winning the cup final.",
        "His advice to young Athletico players: Without discipline, you won't make it far.",
      ],
      instagram: "hadiii_0099",
      image: "/ourclub1.png",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const namesContainerRef = useRef<HTMLDivElement>(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle wheel scroll on names container
  useEffect(() => {
    if (isMobile) return;

    const namesContainer = namesContainerRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!namesContainer || !scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollContainer.scrollTop += e.deltaY;
    };

    namesContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => namesContainer.removeEventListener("wheel", handleWheel);
  }, [isMobile]);

  // Handle draggable progress bar
  useEffect(() => {
    if (isMobile) return;

    const progressBar = progressBarRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!progressBar || !scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      updateScrollFromMouse(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      updateScrollFromMouse(e);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const updateScrollFromMouse = (e: MouseEvent) => {
      const rect = progressBar.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const percentage = Math.max(0, Math.min(1, y / rect.height));
      const maxScroll =
        scrollContainer.scrollHeight - scrollContainer.clientHeight;
      scrollContainer.scrollTop = percentage * maxScroll;
    };

    progressBar.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      progressBar.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, isDragging]);

  // Handle scroll to update active index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      const containerHeight = container.clientHeight;

      let newActiveIndex = 0;
      contentRefs.current.forEach((ref, index) => {
        if (ref) {
          const refTop = ref.getBoundingClientRect().top - containerTop;
          if (refTop < containerHeight / 3) {
            newActiveIndex = index;
          }
        }
      });

      setActiveIndex(newActiveIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Click handler to scroll to alumni
  const scrollToAlumni = (index: number) => {
    const ref = contentRefs.current[index];
    const container = scrollContainerRef.current;
    if (ref && container) {
      const containerTop = container.getBoundingClientRect().top;
      const refTop = ref.getBoundingClientRect().top;
      const scrollOffset = refTop - containerTop + container.scrollTop;
      container.scrollTo({ top: scrollOffset, behavior: "smooth" });
    }
  };

  // Calculate indicator position
  const indicatorHeight = 100 / alumniData.length;
  const indicatorTop = activeIndex * indicatorHeight;

  return (
    <section className="w-full px-6 md:px-12 lg:px-16 py-16 md:py-20">
      <div className="max-w-screen-2xl mx-auto">
        {/* Title */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] uppercase leading-none text-white mb-2 md:mb-4">
            SHAPING CAREERS
          </h1>
          <h2
            className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[90px] uppercase leading-none"
            style={{
              background: "linear-gradient(90deg, #3050FD 0%, #A861F9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            BEYOND THE ACADEMYS
          </h2>
        </div>

        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex flex-col">
            {/* Horizontal Names Scroll */}
            <div className="relative mb-6">
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {alumniData.map((alumni, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToAlumni(index)}
                    className={`whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
                      index === activeIndex
                        ? "text-white"
                        : "text-[#3B3B3B] hover:text-white/50"
                    }`}
                  >
                    {alumni.name}
                  </button>
                ))}
              </div>
              {/* Horizontal Progress Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3B3B3B]">
                <div
                  className="h-full bg-[#3050FD] transition-all duration-300"
                  style={{
                    width: `${indicatorHeight}%`,
                    marginLeft: `${indicatorTop}%`,
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div
              ref={scrollContainerRef}
              className="h-[70vh] overflow-y-auto scrollbar-hide"
            >
              {alumniData.map((alumni, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="mb-16 last:mb-0"
                >
                  <AlumniContent alumni={alumni} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="flex gap-4 lg:gap-6">
            {/* Left Sidebar - Names (30%) */}
            <div className="w-[30%] flex" ref={namesContainerRef}>
              {/* Names List */}
              <div className="flex flex-col justify-between h-[500px] flex-1">
                {alumniData.map((alumni, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToAlumni(index)}
                    className={`text-left text-base lg:text-lg font-medium transition-colors duration-300 ${
                      index === activeIndex
                        ? "text-white"
                        : "text-[#3B3B3B] hover:text-white/50"
                    }`}
                  >
                    {alumni.name}
                  </button>
                ))}
              </div>

              {/* Vertical Progress Line - Draggable */}
              <div
                ref={progressBarRef}
                className="relative w-[2px] bg-[#3B3B3B] ml-4 h-[500px] cursor-grab active:cursor-grabbing"
              >
                <div
                  className="absolute left-0 w-full bg-[#3050FD] transition-all duration-150"
                  style={{
                    height: `${indicatorHeight}%`,
                    top: `${indicatorTop}%`,
                  }}
                />
              </div>
            </div>

            {/* Right Content (70%) */}
            <div
              ref={scrollContainerRef}
              className="w-[70%] h-[500px] overflow-y-auto scrollbar-hide pr-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {alumniData.map((alumni, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="mb-20 last:mb-0"
                >
                  <AlumniContent alumni={alumni} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ==================== ALUMNI CONTENT COMPONENT ====================
function AlumniContent({ alumni }: { alumni: Alumni }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Left - Image + Instagram */}
      <div className="w-full lg:w-[35%] flex-shrink-0">
        {/* Image */}
        <div className="relative w-full aspect-[4/5] max-w-[350px] overflow-hidden mb-4">
          <Image
            src={alumni.image}
            alt={alumni.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 350px"
          />
        </div>

        {/* Instagram Link */}
        <Link
          href={`https://instagram.com/${alumni.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>{alumni.instagram}</span>
        </Link>
      </div>

      {/* Right - Bio + Message */}
      <div className="w-full lg:w-[65%]">
        {/* Bio Paragraphs */}
        <div className="space-y-4 text-white/80 text-sm md:text-base leading-relaxed mb-8">
          {alumni.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Message to Athletico Family */}
        {alumni.message && (
          <div className="pt-6 border-t border-white/10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">
              MESSAGE TO THE ATHLETICO FAMILY
            </p>
            <p className="text-white font-bold text-sm md:text-base lg:text-lg uppercase leading-relaxed">
              {alumni.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
