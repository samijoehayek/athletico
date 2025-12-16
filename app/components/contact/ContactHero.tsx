// app/contact/components/ContactHero.tsx

"use client";

import { useState } from "react";

export default function ContactHero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // WhatsApp configuration
  const whatsappNumber = "96170202030";
  const whatsappMessage = "Hello! I would like to get more information.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Row 1: Full Width Title Block */}
      <div className="mb-12 md:mb-16">
        {/* Small Label */}
        <p
          className="text-[#171717] text-sm font-semibold uppercase tracking-widest mb-2"
          style={{ letterSpacing: "0.12em" }}
        >
          GET STARTED
        </p>

        {/* Main Title */}
        <h1
          className="text-[#3050FD] font-extrabold leading-tight mb-3"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.1,
          }}
        >
          Get in touch with us.
        </h1>

        {/* Subtitle - no underline, not bold */}
        <p
          className="text-[#171717] font-normal"
          style={{
            fontSize: "clamp(20px, 3vw, 28px)",
          }}
        >
          We're here to assist you
        </p>
      </div>

      {/* Row 2: WhatsApp + Form (Two Columns) */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"> */}
      {/* Left Column - WhatsApp */}
      {/* <div className="lg:col-span-4">
            <h3 className="text-[#171717] text-2xl font-bold mb-2">WhatsApp</h3>
            <p className="text-[#171717] text-base mb-4">
              For faster responses, reach us on WhatsApp
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold px-6 py-3 transition-colors"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div> */}

      {/* Right Column - Contact Form */}
      {/* <div className="lg:col-span-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-[#171717] text-sm mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-[#e0e0e0] focus:border-[#3050FD] outline-none py-2 text-base text-[#171717] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#171717] text-sm mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-[#e0e0e0] focus:border-[#3050FD] outline-none py-2 text-base text-[#171717] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#171717] text-sm mb-2">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-[#e0e0e0] focus:border-[#3050FD] outline-none py-2 text-base text-[#171717] transition-colors"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-[#171717] text-sm mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-[#e0e0e0] focus:border-[#3050FD] outline-none py-2 text-base text-[#171717] transition-colors resize-none min-h-[120px]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#3050FD] hover:bg-[#2040dd] text-white font-semibold px-8 py-3 transition-colors flex items-center gap-2"
                >
                  Leave us a Message
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
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div> */}
      {/* </div> */}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
