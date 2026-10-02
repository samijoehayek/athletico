// app/contact/components/LocateUs.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { BRANCHES, type Branch } from "@/lib/branches";
import BranchMap from "./BranchMap";

export default function LocateUs() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedBranch = BRANCHES.find((b) => b.id === selectedId) ?? null;

  return (
    <section className="w-full py-10 md:py-14 lg:py-18 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#0B3E80]/60 text-sm font-semibold uppercase tracking-wide mb-1">
            {BRANCHES.length} BRANCHES
          </p>
          <h2 className="text-[#0B3E80] text-3xl font-extrabold uppercase">
            LOCATE US
          </h2>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN - Branch List */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-white border border-[#E0E0E0] p-6 h-full flex flex-col">
              <div className="flex flex-col divide-y divide-[#E0E0E0]">
                {BRANCHES.map((branch) => {
                  const isSelected = branch.id === selectedId;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedId(branch.id)}
                      aria-pressed={isSelected}
                      className={`py-4 text-left hover:bg-gray-50 transition-colors px-2 -mx-2 rounded group ${
                        isSelected ? "bg-gray-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-base font-semibold mb-1 text-[#0B3E80]">
                            {branch.name}
                          </p>
                          <a
                            href={`tel:${branch.phone.replace(/\s/g, "")}`}
                            className="text-[#0B3E80]/60 text-sm hover:text-[#0B3E80] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {branch.phone}
                          </a>
                        </div>
                        <div
                          className={`flex-shrink-0 transition-opacity ${
                            isSelected
                              ? "opacity-100 text-[#2B87C8]"
                              : "opacity-0 group-hover:opacity-100 text-[#0B3E80]"
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

          {/* RIGHT COLUMN - Map with every branch pinned */}
          <div className="lg:col-span-8">
            <div className="relative w-full h-full bg-gray-200 overflow-hidden rounded-lg min-h-[500px] isolate">
              <BranchMap
                branches={BRANCHES}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />

              {selectedBranch && (
                <BranchCard
                  key={selectedBranch.id}
                  branch={selectedBranch}
                  onClose={() => setSelectedId(null)}
                />
              )}
            </div>
          </div>
        </div>

        {/* DETAILS ROW */}
        <div className="mt-10 flex flex-wrap gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <ClockIcon />
            <p className="text-[#0B3E80] text-sm">
              Administrative opening hours{" "}
              <span className="font-bold">4PM to 8PM</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <EmailIcon />
            <a
              href="mailto:OPERATION@ATHLETICO.COM"
              className="text-[#0B3E80] text-sm font-bold hover:text-[#0B3E80] transition-colors"
            >
              OPERATION@ATHLETICO.COM
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== SELECTED BRANCH CARD ====================
// Floats over the map. Shows the branch photo, or a branded placeholder until
// the club sends one (drop it in /public/branches and set `image`).
function BranchCard({ branch, onClose }: { branch: Branch; onClose: () => void }) {
  return (
    <div className="absolute z-[1000] left-3 right-3 bottom-3 sm:left-4 sm:right-auto sm:bottom-4 sm:w-[300px] bg-white shadow-xl">
      <div className="relative w-full aspect-[16/9] bg-[#0B3E80] overflow-hidden">
        {branch.image ? (
          <Image
            src={branch.image}
            alt={branch.name}
            fill
            className="object-cover"
            sizes="300px"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0B3E80] to-[#2B87C8]">
            <Image
              src="/brand/logo.png"
              alt=""
              width={44}
              height={44}
              className="w-11 h-11 object-contain opacity-90"
            />
            <p className="text-white/70 text-[11px] font-semibold uppercase tracking-widest">
              Photo coming soon
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          aria-label="Close branch details"
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-[#0B3E80] flex items-center justify-center transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <p className="text-[#0B3E80] font-bold leading-tight">{branch.name}</p>
        <a
          href={`tel:${branch.phone.replace(/\s/g, "")}`}
          className="block text-[#0B3E80]/60 text-sm mt-1 hover:text-[#0B3E80] transition-colors"
        >
          {branch.phone}
        </a>
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-[#0B3E80] text-xs font-bold uppercase tracking-wider hover:text-[#2B87C8] transition-colors"
        >
          Get directions
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </a>
      </div>
    </div>
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
      stroke="#0B3E80"
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
      stroke="#0B3E80"
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
