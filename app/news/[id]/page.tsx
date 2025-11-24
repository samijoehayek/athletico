import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function NewsArticlePage() {
  return (
    <div className="w-full">
      {/* Navbar */}
      <Navbar />

      {/* Hero Image Section - 35vh */}
      <section className="h-[35vh] w-full relative">
        <Image
          src="/specificnews.png"
          alt="News article hero"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Article Content Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16">
            {/* Left Column - Title and Date */}
            <div>
              <h1 className="text-[48px] lg:text-[56px] font-bold leading-tight text-[#171717] mb-6">
                Wellness is no longer a hobby – it's how Gen Z lives
              </h1>

              <div className="flex items-center gap-4 text-[#171717] opacity-50">
                <time className="text-[16px]">AUGUST 13, 2025</time>
                <button className="flex items-center gap-2 text-[16px]">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* Right Column - Article Content */}
            <div className="space-y-8 text-[#171717]">
              {/* Section 1 */}
              <div>
                <h2 className="text-[20px] font-bold uppercase mb-4">
                  NUTRITION & WELLNESS
                </h2>
                <p className="text-[16px] leading-relaxed mb-4">
                  Wellness industry growth & younger consumers The global
                  wellness market (worth ~$2 trillion) is being shaped by
                  Millennials and Gen Z. These groups view wellness as part of
                  their daily lifestyle rather than a one-off purchase. They're
                  focusing on areas like functional nutrition, healthy aging,
                  mindfulness, sleep, and appearance.
                </p>
                <p className="text-[14px] italic opacity-70">
                  McKinsey & Company
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 className="text-[16px] font-bold mb-2">
                  2. Functional food & nutrition for performance and prevention
                </h3>
                <p className="text-[16px] leading-relaxed mb-4">
                  Healthy eating is shifting from just "dieting" to "fueling" —
                  boosting energy, mental clarity, muscle recovery, and
                  preventative health. In one survey: 42.9% of consumers said
                  healthy food now means energy-boosting benefits. Gut health,
                  ingredient transparency, and functional claims are on the
                  rise.
                </p>
                <p className="text-[14px] italic opacity-70">tastewise</p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-[16px] font-bold mb-2">
                  3. Supplements and delivery formats evolving
                </h3>
                <p className="text-[16px] leading-relaxed mb-4">
                  According to The Vitamin Shoppe's Trend Report for 2025:
                </p>
                <p className="text-[16px] leading-relaxed mb-2">
                  Supplements like NAD+ and adaptogens are becoming mainstream.
                </p>
                <p className="text-[14px] italic opacity-70 mb-4">
                  Mass Market Retailers
                </p>

                <p className="text-[16px] leading-relaxed mb-2">
                  Delivery formats are changing: gummies, liquids, chewables and
                  topicals are replacing traditional pills.
                </p>
                <p className="text-[14px] italic opacity-70 mb-4">
                  PR Newswire
                </p>

                <p className="text-[16px] leading-relaxed mb-2">
                  Ready-to-drink protein drinks and snack bars saw large
                  year-on-year increases: e.g., +20% for RTD protein drinks,
                  +28% for protein bars.
                </p>
                <p className="text-[14px] italic opacity-70">PR Newswire</p>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-[16px] font-bold mb-2">
                  4. Nutrition meets technology: AI and smart tools
                </h3>
                <p className="text-[16px] leading-relaxed mb-4">
                  Nutrition is being revolutionized by AI and digital tools. For
                  example:
                </p>
                <p className="text-[16px] leading-relaxed mb-2">
                  AI systems that estimate meal macronutrients from sensors.
                </p>
                <p className="text-[14px] italic opacity-70 mb-4">arXiv</p>

                <p className="text-[16px] leading-relaxed mb-2">
                  Real-time personalized nutrition solutions that integrate with
                  fitness or health devices.
                </p>
                <p className="text-[14px] italic opacity-70 mb-4">
                  World Economic Forum
                </p>

                <p className="text-[16px] leading-relaxed">
                  These innovations show how wellness is becoming more
                  personalized and tech-driven.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-[16px] font-bold mb-2">
                  5. Focus on specific health areas: liver health, nutrition
                  education
                </h3>
                <p className="text-[16px] leading-relaxed mb-2">
                  On "World Liver Day 2025" the theme "Food is Medicine"
                  emphasized how diet impacts liver health — promoting
                  anti-inflammatory foods, whole grains, fiber, and reducing
                  processed foods, salt, alcohol and refined carbs.
                </p>
                <p className="text-[14px] italic opacity-70 mb-4">
                  The Times of India
                </p>

                <p className="text-[16px] leading-relaxed">
                  The U.S. government's initiative for comprehensive nutrition
                  education in medical training highlights the growing
                  importance of nutrition in healthcare and prevention.
                </p>
              </div>
            </div>
          </div>

          {/* Similar Updates Section */}
          <div className="mt-24">
            <h2 className="text-[24px] font-bold uppercase text-[#171717] mb-4">
              SIMILAR UPDATES
            </h2>
            <div className="w-full h-[1px] bg-[#171717] mb-12"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Similar Article 1 */}
              <div>
                <Image
                  src="/newsarticle.png"
                  alt="Training sessions"
                  width={600}
                  height={400}
                  className="w-full mb-4"
                />
                <p className="text-[14px] text-[#171717] opacity-50 mb-2">
                  NOVEMBER 10, 2025 - PRESS RELEASE
                </p>
                <h3 className="text-[20px] font-bold uppercase text-[#171717] mb-3">
                  TRAINING SESSIONS
                </h3>
                <p className="text-[16px] text-[#171717]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard d...
                </p>
              </div>

              {/* Similar Article 2 */}
              <div>
                <Image
                  src="/newsarticle.png"
                  alt="Nutrition & wellness"
                  width={600}
                  height={400}
                  className="w-full mb-4"
                />
                <p className="text-[14px] text-[#171717] opacity-50 mb-2">
                  AUGUST 13, 2025
                </p>
                <h3 className="text-[20px] font-bold uppercase text-[#171717] mb-3">
                  NUTRITION & WELLNESS
                </h3>
                <p className="text-[16px] text-[#171717]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard d...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
