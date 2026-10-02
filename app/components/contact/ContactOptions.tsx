// app/components/contact/ContactOptions.tsx
//
// Splits the contact page by who is getting in touch: players and parents,
// marketing and sponsors, and people applying to work at the club.

import {
  CAREERS_EMAILS,
  MARKETING_EMAIL,
  TRAINING_SCHEDULE_URL,
} from "@/lib/site";

const mailto = (to: string | string[], subject: string) =>
  `mailto:${[to].flat().join(",")}?subject=${encodeURIComponent(subject)}`;

export default function ContactOptions() {
  return (
    <section className="w-full px-6 md:px-10 lg:px-16 pb-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[#0B3E80] text-3xl font-extrabold uppercase mb-8">
          How can we help?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Players */}
          <OptionCard
            label="01"
            title="Players & registration"
            text="Register with the branch closest to you. Training days and times are on our weekly schedule."
          >
            <CardLink href="#branches" primary>
              Find your branch
            </CardLink>
            <CardLink href={TRAINING_SCHEDULE_URL} external>
              View training schedule
            </CardLink>
          </OptionCard>

          {/* Marketing & sponsors */}
          <OptionCard
            label="02"
            title="Marketing & sponsorship"
            text="Partnerships, sponsorship and media enquiries."
          >
            <EmailLine email={MARKETING_EMAIL} />
            <CardLink href={mailto(MARKETING_EMAIL, "Sponsorship enquiry")} primary>
              Email marketing
            </CardLink>
          </OptionCard>

          {/* Careers */}
          <OptionCard
            label="03"
            title="Careers"
            text="Want to coach or work at Athletico? Send us your CV."
          >
            {CAREERS_EMAILS.map((email) => (
              <EmailLine key={email} email={email} />
            ))}
            <CardLink href={mailto(CAREERS_EMAILS, "Career application")} primary>
              Apply by email
            </CardLink>
          </OptionCard>
        </div>
      </div>
    </section>
  );
}

function OptionCard({
  label,
  title,
  text,
  children,
}: {
  label: string;
  title: string;
  text: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#E0E0E0] p-6 md:p-7 flex flex-col">
      <span className="text-[#2B87C8] text-sm font-bold tracking-tight">{label}</span>
      <h3 className="text-[#0B3E80] text-xl md:text-2xl font-extrabold uppercase leading-tight mt-3 mb-2">
        {title}
      </h3>
      <p className="text-[#0B3E80]/60 text-sm leading-relaxed mb-6">{text}</p>
      <div className="mt-auto flex flex-col gap-3">{children}</div>
    </div>
  );
}

function EmailLine({ email }: { email: string }) {
  // Long addresses wrap after the @, never mid-word.
  const [name, domain] = email.split("@");
  return (
    <a
      href={`mailto:${email}`}
      className="text-[#0B3E80] text-sm font-semibold hover:text-[#2B87C8] transition-colors"
    >
      {name}@<wbr />
      {domain}
    </a>
  );
}

function CardLink({
  href,
  external = false,
  primary = false,
  children,
}: {
  href: string;
  external?: boolean;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 font-bold uppercase text-sm tracking-wider transition-colors ${
        primary
          ? "bg-[#0B3E80] text-white hover:bg-[#2B87C8]"
          : "border border-[#0B3E80] text-[#0B3E80] hover:bg-[#2B87C8] hover:border-[#2B87C8] hover:text-white"
      }`}
    >
      {children}
      {external && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      )}
    </a>
  );
}
