// app/team/components/TeamMemberCard.tsx

import Image from "next/image";

interface TeamMember {
  name: string;
  image: string;
  stat1: string;
  stat2: string;
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white shadow-xl flex-shrink-0">
      <div className="w-full h-full flex flex-col p-6 md:p-8">
        {/* Image - Right aligned, taller height */}
        <div className="flex justify-end mb-6">
          <div className="relative w-[280px] h-[320px] flex-shrink-0 overflow-hidden">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="280px"
            />
          </div>
        </div>

        {/* Name - Left aligned */}
        <h3 className="text-[#171717] text-2xl lg:text-3xl font-bold uppercase text-left mb-auto">
          {member.name}
        </h3>

        {/* Stats - Full width with space between */}
        <div className="flex justify-between items-center w-full mt-8">
          <p className="text-[#171717]/70 text-sm md:text-base font-normal">
            {member.stat1}
          </p>
          <p className="text-[#171717]/70 text-sm md:text-base font-normal">
            {member.stat2}
          </p>
        </div>
      </div>
    </div>
  );
}
