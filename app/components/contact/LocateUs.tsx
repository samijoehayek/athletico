// app/contact/components/LocateUs.tsx

"use client";

import { useState } from "react";

interface Branch {
  name: string;
  phone: string;
  mapUrl: string;
  lat: number;
  lng: number;
}

export default function LocateUs() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const branches: Branch[] = [
    {
      name: "Saint Joseph",
      phone: "+961 79 100 023",
      mapUrl: "https://maps.app.goo.gl/nY3A78bPXVdG6goR7",
      lat: 33.9166823,
      lng: 35.6336115,
    },
    {
      name: "Freres",
      phone: "+961 79 100 025",
      mapUrl: "https://maps.app.goo.gl/HNs3XKgWSRuZysHm9",
      lat: 33.8713467,
      lng: 35.5176699,
    },
    {
      name: "Hooligans",
      phone: "+961 79 100 024",
      mapUrl: "https://maps.app.goo.gl/TWckchEYKzvzYGGh8",
      lat: 33.875421,
      lng: 35.536366,
    },
    {
      name: "Dbayeh",
      phone: "+961 78 824 357",
      mapUrl: "https://maps.app.goo.gl/tRMG1gvVwQov67bu8",
      lat: 33.9460312,
      lng: 35.6006699,
    },
    {
      name: "Mansourieh",
      phone: "+961 79 100 026",
      mapUrl: "https://maps.app.goo.gl/Ukhuv7swQHE2JHJf6",
      lat: 33.8524864,
      lng: 35.5699343,
    },
    {
      name: "Vclub",
      phone: "+961 76 499 049",
      mapUrl: "https://maps.app.goo.gl/6VKeRjoc45HKcfya9",
      lat: 33.9105636,
      lng: 35.5836163,
    },
    {
      name: "Jnah",
      phone: "+961 70 343 483",
      mapUrl: "https://maps.app.goo.gl/Uhr4Qznqtzuv27Bi8",
      lat: 33.8711738,
      lng: 35.4856033,
    },
    {
      name: "Sin El Fil",
      phone: "+961 70 202030",
      mapUrl: "https://maps.app.goo.gl/LUcjuVqpf9RnxCKM7",
      lat: 33.8776104,
      lng: 35.5310628,
    },
    {
      name: "E-club",
      phone: "+961 03 337 875",
      mapUrl: "https://maps.app.goo.gl/TtmgDtsTW8j2eYzWA",
      lat: 33.9632225,
      lng: 35.6238687,
    },
    {
      name: "Champville",
      phone: "+961 71 402 444",
      mapUrl: "https://maps.app.goo.gl/rVJZNREX43geHS3VA",
      lat: 33.9334759,
      lng: 35.6198336,
    },
    {
      name: "Beit Mery",
      phone: "+961 76 779 027",
      mapUrl: "https://maps.app.goo.gl/JiRUoKjUAHExPdS76",
      lat: 33.8552964,
      lng: 35.6051484,
    },
  ];

  const getEmbedUrl = (branch: Branch | null): string => {
    if (!branch) {
      return "https://www.google.com/maps/embed/v1/view?key=&center=33.88,35.55&zoom=11";
    }
    // Use the embed API with lat,lng coordinates for precise, reliable positioning
    return `https://maps.google.com/maps?q=${branch.lat},${branch.lng}&hl=en&z=16&output=embed`;
  };

  return (
    <section className="w-full py-10 md:py-14 lg:py-18 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#171717]/60 text-sm font-semibold uppercase tracking-wide mb-1">
            11 BRANCHES
          </p>
          <h2 className="text-[#171717] text-3xl font-extrabold uppercase">
            LOCATE US
          </h2>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN - Branch List */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-white border border-[#E0E0E0] p-6 h-full flex flex-col">
              <div className="flex flex-col divide-y divide-[#E0E0E0]">
                {branches.map((branch, index) => {
                  const isSelected = selectedBranch?.name === branch.name;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedBranch(branch)}
                      className={`py-4 text-left hover:bg-gray-50 transition-colors px-2 -mx-2 rounded group ${
                        isSelected ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p
                            className={`text-base font-semibold mb-1 transition-colors ${
                              isSelected
                                ? "text-[#3050FD]"
                                : "text-[#171717] group-hover:text-[#3050FD]"
                            }`}
                          >
                            {branch.name}
                          </p>
                          <a
                            href={`tel:${branch.phone.replace(/\s/g, "")}`}
                            className="text-[#171717]/60 text-sm hover:text-[#3050FD] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {branch.phone}
                          </a>
                        </div>
                        <div
                          className={`flex-shrink-0 text-[#3050FD] transition-opacity ${
                            isSelected
                              ? "opacity-100"
                              : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <MapPinIcon />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Map */}
          <div className="lg:col-span-8">
            <div className="w-full h-full bg-gray-200 overflow-hidden rounded-lg min-h-[500px]">
              <iframe
                key={selectedBranch ? selectedBranch.name : "default"}
                src={
                  selectedBranch
                    ? `https://maps.google.com/maps?q=${selectedBranch.lat},${selectedBranch.lng}&hl=en&z=16&output=embed`
                    : "https://maps.google.com/maps?q=33.88,35.55&hl=en&z=11&output=embed"
                }
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Athletico Locations"
              />
            </div>
          </div>
        </div>

        {/* DETAILS ROW */}
        <div className="mt-10 flex flex-wrap gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <ClockIcon />
            <p className="text-[#171717] text-sm">
              Club opening hours <span className="font-bold">8AM to 12AM</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon />
            <p className="text-[#171717] text-sm">
              Administrative opening hours{" "}
              <span className="font-bold">4PM to 8PM</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmailIcon />
            <a
              href="mailto:OPERATION@ATHLETICO.COM"
              className="text-[#171717] text-sm font-bold hover:text-[#3050FD] transition-colors"
            >
              OPERATION@ATHLETICO.COM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Icons */
function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#171717"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#171717"
      strokeWidth="2"
    >
      <rect width="20" height="16" x="2" y="4" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
