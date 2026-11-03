// lib/legal/terms.ts
//
// The Terms and Conditions of Sale currently in force. The /terms page, its
// PDF download and the checkout checkbox all read from here, so the text a
// customer reads, downloads and accepts is always the same version.
//
// Publishing a new version (when the club sends updated terms):
//   1. Export the club's Google Doc as plain text and convert it into a new
//      `terms-of-sale-<yyyy-mm>.ts` data file (same shape as the current one).
//   2. Point TERMS_SECTIONS / TERMS_TITLE below at the new file and bump
//      TERMS_VERSION (id, label, date, pdf).
//   3. Regenerate the PDF:  scripts/build-terms-pdf.sh <running site URL>
//   4. Keep the old PDF in /public/legal. Orders record the version id they
//      were placed under, so an earlier version must stay retrievable.

export { TERMS_SECTIONS, TERMS_TITLE } from "./terms-of-sale-2026-11";

export type TermsBlock =
  | { kind: "clause"; number: string; text: string }
  | { kind: "subheading"; number: string; text: string }
  | { kind: "paragraph"; text: string };

export interface TermsSection {
  number: string;
  title: string;
  blocks: TermsBlock[];
}

export const TERMS_VERSION = {
  /** Stored on every order as the version the customer accepted. */
  id: "2026-11-03",
  label: "Version 1",
  publishedOn: "3 November 2026",
  /** Generated from the /terms page by scripts/build-terms-pdf.sh. */
  pdf: "/legal/athletico-terms-of-sale-2026-11-03.pdf",
} as const;

export const TERMS_PATH = "/terms";
