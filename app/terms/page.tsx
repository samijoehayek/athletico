// app/terms/page.tsx
//
// The club's Terms and Conditions of Sale, rendered from lib/legal so the web
// page, the PDF download and the version accepted at checkout never drift
// apart. The same page, printed with its print styles, IS the PDF (see
// scripts/build-terms-pdf.sh), so anything hidden with `print:hidden` here is
// left out of the download.

import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TERMS_SECTIONS, TERMS_TITLE, TERMS_VERSION, type TermsBlock } from "@/lib/legal/terms";

export const metadata: Metadata = {
  title: `${TERMS_TITLE} — Athletico Sports Club`,
  description:
    "The terms that apply to every purchase from the Athletico Sports Club online store: ordering, payment, collection, returns, exchanges and refunds.",
};

const sectionId = (n: string) => `section-${n}`;

export default function TermsPage() {
  return (
    <main className="bg-[#F1EAEA] min-h-screen print:bg-white">
      <div className="print:hidden">
        <Navbar mode="dark" />
      </div>

      <section className="px-6 md:px-12 lg:px-16 py-12 md:py-16 print:p-0">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#2B87C8] text-xs md:text-sm font-medium uppercase tracking-[0.28em] mb-4">
            Athletico Store
          </p>
          <h1 className="text-[#0B3E80] font-extrabold uppercase text-4xl sm:text-5xl md:text-6xl leading-[0.9] mb-6 print:text-4xl">
            {TERMS_TITLE}
          </h1>
          <p className="text-[#0B3E80]/60 text-sm uppercase tracking-wider">
            {TERMS_VERSION.label} · In force from {TERMS_VERSION.publishedOn}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 print:hidden">
            <a
              href={TERMS_VERSION.pdf}
              download
              className="inline-flex items-center gap-3 bg-[#0B3E80] text-white hover:bg-[#2B87C8] font-bold uppercase text-sm tracking-wider px-6 py-4 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 3v12" />
                <polyline points="7 10 12 15 17 10" />
                <path d="M5 21h14" />
              </svg>
              Download PDF
            </a>
          </div>

          {/* Contents: 18 sections is long on a phone, so every one is a jump link. */}
          <nav
            aria-label="Contents"
            className="mt-12 border border-[#0B3E80]/20 bg-white px-5 py-5 md:px-6 print:hidden"
          >
            <p className="text-[#0B3E80] font-bold uppercase text-sm tracking-wider mb-4">Contents</p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {TERMS_SECTIONS.map((s) => (
                <li key={s.number}>
                  <a
                    href={`#${sectionId(s.number)}`}
                    className="text-[#0B3E80]/70 hover:text-[#2B87C8] transition-colors"
                  >
                    <span className="inline-block w-7 text-[#0B3E80]/40">{s.number}.</span>
                    <span className="capitalize">{s.title.toLowerCase()}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12 print:mt-8 print:space-y-6">
            {TERMS_SECTIONS.map((section) => (
              <section
                key={section.number}
                id={sectionId(section.number)}
                className="scroll-mt-28 print:break-inside-auto"
              >
                <h2 className="text-[#0B3E80] font-extrabold uppercase text-xl md:text-2xl mb-5 pb-3 border-b-2 border-[#0B3E80] print:text-base print:mb-3 print:break-after-avoid">
                  {section.number}. {section.title}
                </h2>
                <div className="space-y-4 print:space-y-2">
                  {section.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Not part of the Terms: a plain statement of what this site stores.
              The site sets no cookies of its own and runs no analytics or ad
              pixels, so there is nothing to consent to and no banner. When
              tracking is added, this section and a consent banner come with it. */}
          <aside
            id="cookies"
            className="mt-16 border-l-4 border-[#2B87C8] bg-white px-5 py-5 md:px-6 scroll-mt-28 print:mt-10"
          >
            <h2 className="text-[#0B3E80] font-bold uppercase text-base tracking-wide mb-3">
              Cookies &amp; storage on this website
            </h2>
            <div className="text-[#0B3E80]/75 text-sm leading-relaxed space-y-3">
              <p>
                This website does not use advertising or analytics cookies, and it does not track
                you across sites.
              </p>
              <p>
                It only keeps what it needs to work, in your own browser: the contents of your
                shopping bag, so they are still there when you come back, and the summary of an
                order you just placed. You can clear them at any time from your browser settings.
              </p>
              <p>
                The map on the contact page is loaded from OpenStreetMap, which receives your IP
                address in order to send the map to your device.
              </p>
            </div>
          </aside>

          <p className="mt-10 text-[#0B3E80]/45 text-xs uppercase tracking-wider">
            {TERMS_TITLE} · {TERMS_VERSION.label} · {TERMS_VERSION.publishedOn}
          </p>
        </div>
      </section>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}

function Block({ block }: { block: TermsBlock }) {
  if (block.kind === "subheading") {
    return (
      <h3 className="text-[#0B3E80] font-bold uppercase text-sm tracking-wide pt-3 print:pt-1 print:break-after-avoid">
        {block.number} {block.text}
      </h3>
    );
  }
  if (block.kind === "paragraph") {
    return <p className="text-[#0B3E80]/80 leading-relaxed">{linkify(block.text)}</p>;
  }
  return (
    // Clause number in its own column so the numbering stays scannable.
    <div className="grid grid-cols-[3.25rem_1fr] gap-x-3 text-[#0B3E80]/80 leading-relaxed">
      <span className="text-[#0B3E80] font-bold text-sm pt-0.5">{block.number}</span>
      <p>{linkify(block.text)}</p>
    </div>
  );
}

/** Turn the e-mail addresses and phone numbers in the text into tap targets. */
function linkify(text: string): ReactNode[] {
  const pattern = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|\+961\d{7,8})/g;
  return text.split(pattern).map((part, i) => {
    if (i % 2 === 0) return part;
    const href = part.includes("@") ? `mailto:${part}` : `tel:${part}`;
    return (
      <a key={i} href={href} className="text-[#2B87C8] underline underline-offset-2 hover:text-[#0B3E80]">
        {part}
      </a>
    );
  });
}
