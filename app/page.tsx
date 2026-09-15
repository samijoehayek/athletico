import Hero from "./components/Hero";
import ProgramsSection from "./components/Activities";
import OtherActivitiesSection from "./components/OtherActivities";
import StatisticsSection from "./components/Statistics";
import OurClubSection from "./components/OurClubSection";
import PartnersSection from "./components/Partners";
import MyTeamSection from "./components/MyTeam";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <OurClubSection />
      <div id="programs">
        <ProgramsSection />
      </div>

      <OtherActivitiesSection />
      <StatisticsSection />
      <PartnersSection />
      <MyTeamSection />
      <Footer />
    </main>
  );
}
