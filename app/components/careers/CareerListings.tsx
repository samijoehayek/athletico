"use client";

import JobCard from "./JobCard";

interface JobListing {
  title: string;
  positions: number;
  description: string;
}

export default function CareerListings() {
  const jobs: JobListing[] = [
    {
      title: "Coaching Opportunities",
      positions: 4,
      description:
        "Wellness industry growth & younger consumers. The global wellness market (worth ~$2 trillion) is being shaped by Millennials and Gen Z. These groups view wellness as part of their daily lifestyle rather than a one-off purchase. They're focusing on areas like functional nutrition, healthy aging, mindfulness, sleep, and appearance.",
    },
    {
      title: "Athletic Training",
      positions: 2,
      description:
        "Join our elite athletic training team and help develop the next generation of athletes. We're looking for passionate individuals with experience in sports science, injury prevention, and performance optimization. Work alongside professional coaches to create personalized training programs.",
    },
    {
      title: "Youth Development",
      positions: 6,
      description:
        "Shape the future of sports by mentoring young athletes aged 6-16. This role focuses on building fundamental skills, fostering sportsmanship, and creating a positive environment for growth. Ideal candidates have experience working with children and a passion for youth athletics.",
    },
    {
      title: "Operations & Management",
      positions: 3,
      description:
        "Drive the operational excellence of our sports facilities. Responsibilities include scheduling, equipment management, event coordination, and team logistics. We're seeking detail-oriented professionals who thrive in fast-paced environments and have strong organizational skills.",
    },
  ];

  const handleApply = (jobTitle: string) => {
    console.log(`Applying for: ${jobTitle}`);
  };

  return (
    <section className="w-full bg-white py-10 md:py-14">
      {/* Mobile / tablet: normal container; Desktop: original px-[200px] */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-[200px]">
        {/* Section Title */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-[#171717] font-bold uppercase font-outfit text-3xl sm:text-4xl md:text-[50px]">
            Open Positions
          </h2>
        </div>

        {/* Job Cards */}
        <div className="flex flex-col gap-6">
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              positions={job.positions}
              description={job.description}
              onApply={() => handleApply(job.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
