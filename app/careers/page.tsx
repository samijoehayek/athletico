import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CareerHero from "@/app/components/careers/CareerHero";
import CareerListings from "@/app/components/careers/CareerListings";
import CareerMarquee from "@/app/components/careers/CareerMarquee";

export default function CareersPage() {
  return (
    <main>
      {/* Hero Section with Navbar */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        <CareerHero />
      </div>

      {/* Job Listings */}
      <CareerListings />

      {/* Scrolling Marquee Text */}
      <CareerMarquee />

      {/* Footer */}
      <Footer />
    </main>
  );
}
