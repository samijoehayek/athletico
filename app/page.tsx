import Hero from "./components/Hero";
import EventsSection from "./components/Events";
import TopStoriesSection from "./components/Stories";
import ProgramsSection from "./components/Activities";
import OtherActivitiesSection from "./components/OtherActivities";
import StatisticsSection from "./components/Statistics";
import OurClubSection from "./components/OurClubSection";
import MustSeeMomentsSection from "./components/MustSee";
import PartnersSection from "./components/Partners";
import MyTeamSection from "./components/MyTeam";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventsSection />
      <OurClubSection />
      <TopStoriesSection />
      <div id="programs">
        <ProgramsSection />
      </div>

      <OtherActivitiesSection />
      <StatisticsSection />
      {/* <MustSeeMomentsSection /> */}
      <PartnersSection />
      <MyTeamSection />
      <Footer />
    </main>
  );
}
