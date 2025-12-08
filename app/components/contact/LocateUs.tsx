// app/contact/components/LocateUs.tsx

"use client";

interface Branch {
  name: string;
  phone: string;
}

export default function LocateUs() {
  const branches: Branch[] = [
    { name: "Headquarter", phone: "+961 70 202030" },
    { name: "SJS, Cornet Chehwan", phone: "+961 79 100 023" },
    { name: "Pro Football, Kfarchima", phone: "+961 79 100 027" },
    { name: "Athletico Sports City, Dbayeh", phone: "+961 70 202030" },
    { name: "Hooligans, Horsh Tabet", phone: "+961 79 100 024" },
    { name: "Deir el Kalaa CC, Beit Mery", phone: "+961 03 655 957" },
    { name: "Freres, Furn el Chebak", phone: "+961 79 100 025" },
    { name: "WFC Fields, Jnah", phone: "+961 70 344 483" },
  ];

  return (
    <section className="w-full bg-[#F3F3F3] py-10 md:py-14 lg:py-18 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#171717]/60 text-sm font-semibold uppercase tracking-wide mb-1">
            8 BRANCHES
          </p>
          <h2 className="text-[#171717] text-3xl font-extrabold uppercase">
            LOCATE US
          </h2>
        </div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* LEFT COLUMN - Original Single Container */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-white border border-[#E0E0E0] p-6 h-full flex flex-col">
              <div className="flex flex-col divide-y divide-[#E0E0E0]">
                {branches.map((branch, index) => (
                  <div key={index} className="py-4">
                    <p className="text-[#171717] text-base font-semibold mb-1">
                      {branch.name}
                    </p>
                    <a
                      href={`tel:${branch.phone.replace(/\s/g, "")}`}
                      className="text-[#171717]/60 text-sm hover:text-[#3050FD] transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Map */}
          <div className="lg:col-span-8">
            <div className="w-full h-full bg-gray-200 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106069.93019479885!2d35.4674!3d33.8886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut%2C%20Lebanon!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
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

        {/* DETAILS ROW — Aligned Under Map */}
        <div className="mt-10 flex flex-wrap gap-6 md:gap-10">
          {/* Club Hours */}
          <div className="flex items-center gap-2">
            <ClockIcon />
            <p className="text-[#171717] text-sm">
              Club opening hours <span className="font-bold">8AM to 12AM</span>
            </p>
          </div>

          {/* Admin Hours */}
          <div className="flex items-center gap-2">
            <ClockIcon />
            <p className="text-[#171717] text-sm">
              Administrative opening hours{" "}
              <span className="font-bold">4PM to 8PM</span>
            </p>
          </div>

          {/* Email */}
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
