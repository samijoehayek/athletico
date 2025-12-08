// app/team/components/TeamSection.tsx

import TeamMemberCard from "./TeamMemberCard";

export interface TeamMember {
  name: string;
  image: string;
  stat1: string;
  stat2: string;
}

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
  columns?: 2 | 3;
}

export default function TeamSection({
  title,
  members,
  columns = 3,
}: TeamSectionProps) {
  const gridCols =
    columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="mt-20 md:mt-24">
      {/* Section Title */}
      <h3
        className="text-white font-semibold uppercase tracking-widest"
        style={{
          fontSize: "30px",
          letterSpacing: "0.1em",
        }}
      >
        {title}
      </h3>

      {/* Divider Line */}
      <div className="w-full h-px bg-[#444] mt-6 mb-10" />

      {/* Cards Grid */}
      <div className={`grid ${gridCols} gap-6 md:gap-8`}>
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </section>
  );
}
