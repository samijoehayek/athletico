// app/team/page.tsx

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeamHero from "@/app/components/team/TeamHero";
import TeamSection from "@/app/components/team/TeamSection";
import TeamExpertise from "../components/team/TeamExpertise";

export default function TeamPage() {
  return (
    <main className="bg-[#171717] min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Heading */}
      <TeamHero />

      {/* Team Sections */}
      <div className="px-6 md:px-10 lg:px-16 pb-32">
        {/* CEO Section */}
        <TeamSection
          title="CEO"
          members={[
            {
              name: "JOHN SMITH",
              image: "/team/ceo1.jpg",
              stat1: "15+ Years Experience",
              stat2: "3 Championships",
            },
            {
              name: "MARIA GARCIA",
              image: "/team/ceo2.jpg",
              stat1: "12+ Years Experience",
              stat2: "5 Awards",
            },
          ]}
          columns={2}
        />

        {/* Technical & Tactical Coaches Section */}
        <TeamSection
          title="TECHNICAL & TACTICAL COACHES"
          members={[
            {
              name: "CARLOS RODRIGUEZ",
              image: "/team/coach1.jpg",
              stat1: "200+ Players",
              stat2: "6 Awards",
            },
            {
              name: "AHMED HASSAN",
              image: "/team/coach2.jpg",
              stat1: "180+ Players",
              stat2: "4 Awards",
            },
            {
              name: "JAMES WILSON",
              image: "/team/coach3.jpg",
              stat1: "150+ Players",
              stat2: "5 Awards",
            },
            {
              name: "LUCAS FERNANDEZ",
              image: "/team/coach4.jpg",
              stat1: "220+ Players",
              stat2: "8 Awards",
            },
            {
              name: "OMAR KHALIL",
              image: "/team/coach5.jpg",
              stat1: "170+ Players",
              stat2: "3 Awards",
            },
            {
              name: "DAVID CHEN",
              image: "/team/coach6.jpg",
              stat1: "190+ Players",
              stat2: "7 Awards",
            },
          ]}
          columns={3}
        />

        {/* Goalkeeping Coaches Section */}
        <TeamSection
          title="GOALKEEPING COACHES"
          members={[
            {
              name: "PETER SCHMIDT",
              image: "/team/gk1.jpg",
              stat1: "100+ Goalkeepers",
              stat2: "4 Awards",
            },
            {
              name: "IVAN PETROV",
              image: "/team/gk2.jpg",
              stat1: "85+ Goalkeepers",
              stat2: "3 Awards",
            },
          ]}
          columns={2}
        />

        {/* Fitness & Conditioning Section */}
        <TeamSection
          title="FITNESS & CONDITIONING"
          members={[
            {
              name: "MICHAEL BROWN",
              image: "/team/fitness1.jpg",
              stat1: "300+ Athletes",
              stat2: "5 Certifications",
            },
            {
              name: "SARAH JOHNSON",
              image: "/team/fitness2.jpg",
              stat1: "250+ Athletes",
              stat2: "6 Certifications",
            },
            {
              name: "ALEX TURNER",
              image: "/team/fitness3.jpg",
              stat1: "200+ Athletes",
              stat2: "4 Certifications",
            },
          ]}
          columns={3}
        />
      </div>

      <TeamExpertise />

      {/* Footer */}
      <Footer />
    </main>
  );
}
