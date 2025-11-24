import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Types for better type safety
interface NewsArticle {
  id: string;
  image: string;
  date: string;
  title: string;
  description: string;
}

// Mock data - in production, this would come from an API or CMS
const newsArticles: NewsArticle[] = [
  {
    id: "1",
    image: "/newsarticle.png",
    date: "November 20, 2025",
    title: "ATHLETIC PERFORMANCE BREAKTHROUGH",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "2",
    image: "/newsarticle.png",
    date: "November 18, 2025",
    title: "NEW TRAINING FACILITY OPENS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "3",
    image: "/newsarticle.png",
    date: "November 15, 2025",
    title: "COMMUNITY OUTREACH PROGRAM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "4",
    image: "/newsarticle.png",
    date: "November 12, 2025",
    title: "SPORTS MEDICINE INNOVATION",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "5",
    image: "/newsarticle.png",
    date: "November 10, 2025",
    title: "CHAMPIONSHIP VICTORY CELEBRATION",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "6",
    image: "/newsarticle.png",
    date: "November 8, 2025",
    title: "PARTNERSHIP ANNOUNCEMENT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "7",
    image: "/newsarticle.png",
    date: "November 5, 2025",
    title: "YOUTH DEVELOPMENT INITIATIVE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: "8",
    image: "/newsarticle.png",
    date: "November 1, 2025",
    title: "WELLNESS PROGRAM EXPANSION",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function NewsPage() {
  return (
    <div className="w-full">
      {/* SECTION 1 - Hero Section with Featured News */}
      <section className="h-screen w-full bg-[#171717] flex flex-col">
        {/* Navbar */}
        <div className="flex-shrink-0">
          <Navbar />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex items-center px-6 md:px-12 lg:px-16">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[35%_65%] gap-8 lg:gap-16">
            {/* Left Column - 35% */}
            <div className="flex flex-col justify-center">
              <p className="text-white text-[22px] uppercase tracking-wide">
                NEWS & UPDATES
              </p>
              <h1 className="text-white text-[80px] lg:text-[100px] font-extrabold uppercase leading-[0.9] mt-2">
                NEWS
              </h1>
            </div>

            {/* Right Column - 65% */}
            <div className="flex flex-col justify-center">
              {/* Image */}
              <div className="w-full mb-4">
                <Image
                  src="/news.png"
                  alt="Featured news"
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>

              {/* Date */}
              <p className="text-white text-[16px] mb-2">November 12, 2025</p>

              {/* Title */}
              <h2 className="text-white text-[22px] font-bold uppercase mb-3">
                FEATURED NEWS TITLE
              </h2>

              {/* Description */}
              <p className="text-white text-[16px] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - News Articles Grid */}
      <section className="bg-white py-16 lg:py-24">
        <div className="px-6 md:px-12 lg:px-16">
          {/* Section Title */}
          <h2 className="text-[30px] font-bold uppercase text-[#171717] mb-4">
            NEWS AND UPDATES
          </h2>

          {/* Border Line */}
          <div className="w-full h-[1px] bg-[#171717] mb-12"></div>

          {/* News Grid */}
          <div className="grid grid-cols-4 gap-x-[30px] gap-y-[30px]">
            {newsArticles.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.id}`}
                className="block hover:opacity-80 transition-opacity"
              >
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="w-full"
                />
                <p className="text-[16px] text-[#171717] opacity-50 mt-6">
                  {article.date}
                </p>
                <h3 className="text-[22px] font-bold uppercase text-[#171717] mt-2">
                  {article.title}
                </h3>
                <p className="text-[16px] text-[#171717] mt-2">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
