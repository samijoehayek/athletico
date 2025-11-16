import Hero from "./components/Hero";
import EventsSection from "./components/Events";
import TopStoriesSection from "./components/Stories";
import ProgramsSection from "./components/Activities";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventsSection />
      <TopStoriesSection />
      <ProgramsSection />
    </main>
  );
}
