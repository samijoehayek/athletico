import Hero from "./components/Hero";
import EventsSection from "./components/Events";
import TopStoriesSection from "./components/Stories";
import ProgramsSection from "./components/Activities";
import OtherActivitiesSection from "./components/OtherActivities";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventsSection />
      <TopStoriesSection />
      <ProgramsSection />
      <OtherActivitiesSection />
    </main>
  );
}
