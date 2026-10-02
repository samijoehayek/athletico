"use client";

// app/components/store/KitCustomiser.tsx
//
// Live name-and-number personalisation. The preview is a photograph of the back
// of the shirt with the text rendered as positioned DOM in the club's display
// face, under a light perspective and a multiply blend so it reads as printed
// vinyl rather than a caption sitting on top of the image.

import Image from "next/image";
import { useId } from "react";
import { formatUSD } from "@/lib/store/pricing";
import type { Personalisation } from "@/lib/store/types";

export interface PersonalisationValue {
  enabled: boolean;
  name: string;
  number: string;
}

// Kept deliberately short and obvious. The real safeguard is that every order is
// read by a human before anything is pressed.
const BLOCKED = ["fuck", "shit", "cunt", "bitch", "nazi", "hitler", "wank", "dick", "twat"];

export function isBlocked(name: string): boolean {
  const flat = name.toLowerCase().replace(/[^a-z]/g, "");
  return BLOCKED.some((w) => flat.includes(w));
}

export function sanitiseName(raw: string, maxChars: number): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z .'-]/g, "")
    .slice(0, maxChars);
}

export function sanitiseNumber(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 2);
  if (digits === "" ) return "";
  if (digits === "0" || digits === "00") return "0";
  return String(Number(digits));
}

export default function KitCustomiser({
  personalisation,
  value,
  onChange,
  productName,
}: {
  personalisation: Personalisation;
  value: PersonalisationValue;
  onChange: (next: PersonalisationValue) => void;
  productName: string;
}) {
  const nameId = useId();
  const numberId = useId();
  const blocked = isBlocked(value.name);
  const printColor = personalisation.printColor ?? "#F1EAEA";

  return (
    <div className="border border-[#0B3E80]/20 bg-white">
      <label className="flex items-center gap-3 px-5 py-4 border-b border-[#0B3E80]/15 cursor-pointer">
        <input
          type="checkbox"
          checked={value.enabled}
          onChange={(e) => onChange({ ...value, enabled: e.target.checked })}
          className="w-4 h-4 accent-[#0B3E80]"
        />
        <span className="text-[#0B3E80] font-bold uppercase text-sm tracking-wide flex-1">
          Add personalisation
        </span>
        <span className="bg-[#FFE400] text-[#0B3E80] text-xs font-bold px-2.5 py-1">
          + {formatUSD(personalisation.priceUSD)}
        </span>
      </label>

      {value.enabled && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
          <div className="relative aspect-[4/5] bg-[#e3e9f2] overflow-hidden">
            <Image
              src={personalisation.backImage}
              alt={`Back of the ${productName}`}
              fill
              sizes="(max-width: 640px) 90vw, 260px"
              className="object-cover"
            />

            <div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{ transform: "perspective(560px) rotateX(7deg)" }}
              aria-hidden
            >
              <span
                className="uppercase font-bold leading-none mix-blend-multiply"
                style={{
                  color: printColor,
                  fontSize: "clamp(10px, 3.1vw, 17px)",
                  letterSpacing: "0.22em",
                  marginBottom: "4%",
                  textShadow: "0 1px 0 rgba(0,0,0,0.18)",
                }}
              >
                {value.name}
              </span>
              <span
                className="font-bold leading-[0.82] mix-blend-multiply"
                style={{
                  color: printColor,
                  fontSize: "clamp(44px, 14vw, 86px)",
                  textShadow: "0 2px 0 rgba(0,0,0,0.18)",
                }}
              >
                {value.number}
              </span>
            </div>

            <span className="absolute bottom-2 inset-x-0 text-center text-[#0B3E80]/40 text-[10px] uppercase tracking-[0.18em]">
              Live preview · back of shirt
            </span>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <div>
              <label htmlFor={nameId} className="block text-[#0B3E80]/60 text-xs uppercase tracking-wider mb-1.5">
                Name <span className="text-[#0B3E80]/35">(max {personalisation.maxChars})</span>
              </label>
              <input
                id={nameId}
                type="text"
                value={value.name}
                inputMode="text"
                autoComplete="off"
                onChange={(e) =>
                  onChange({ ...value, name: sanitiseName(e.target.value, personalisation.maxChars) })
                }
                placeholder="HAYEK"
                className="w-full border border-[#0B3E80]/30 focus:border-[#0B3E80] outline-none px-3 py-2.5 text-[#0B3E80] font-bold uppercase tracking-wider bg-white"
              />
            </div>

            <div>
              <label htmlFor={numberId} className="block text-[#0B3E80]/60 text-xs uppercase tracking-wider mb-1.5">
                Number <span className="text-[#0B3E80]/35">(0–99)</span>
              </label>
              <input
                id={numberId}
                type="text"
                value={value.number}
                inputMode="numeric"
                autoComplete="off"
                onChange={(e) => onChange({ ...value, number: sanitiseNumber(e.target.value) })}
                placeholder="10"
                className="w-24 border border-[#0B3E80]/30 focus:border-[#0B3E80] outline-none px-3 py-2.5 text-[#0B3E80] font-bold bg-white"
              />
            </div>

            {blocked && (
              <p className="text-[#c0392b] text-xs leading-relaxed" role="alert">
                Please choose a different name.
              </p>
            )}

            <p className="text-[#0B3E80]/45 text-xs leading-relaxed">
              Personalised items are made to order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
