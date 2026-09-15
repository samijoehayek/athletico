// app/team/page.tsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamHero from "@/app/components/team/TeamHero";
import FoundersSection from "@/app/components/team/FoundersSection";
import FoundationSection from "@/app/components/team/FoundationSection";

export default function TeamPage() {
  return (
    <main className="bg-[#0B3E80] min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Heading */}
      <TeamHero />

      {/* Team Sections */}
      <div className="px-6 md:px-10 lg:px-16 pb-32">
        {/* Founders Section */}
        <FoundersSection />

        {/* Athletico Foundation */}
        <FoundationSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
