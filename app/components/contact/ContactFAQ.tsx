// app/contact/components/ContactFAQ.tsx

"use client";

import { useState } from "react";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: string;
}

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What age groups do you offer training for?",
      answer:
        "We offer training programs for all age groups, starting from 4 years old up to adults. Our youth development program is structured by age: Mini (4-6), Junior (7-9), Youth (10-12), Teen (13-15), and Senior (16+).",
    },
    {
      question: "How do I register my child for a program?",
      answer:
        "You can register your child by visiting any of our branches, calling our hotline, or filling out the contact form on this page. Our team will guide you through the registration process and help you choose the right program.",
    },
    {
      question: "What equipment does my child need?",
      answer:
        "For initial sessions, comfortable athletic wear and football boots are sufficient. As your child progresses, we'll provide a list of recommended gear. Shin guards are mandatory for all training sessions.",
    },
    {
      question: "Do you offer trial sessions?",
      answer:
        "Yes! We offer a free trial session for new players to experience our training environment before committing to a program. Contact us to schedule your trial.",
    },
    {
      question: "What are your payment options?",
      answer:
        "We offer flexible payment options including monthly, quarterly, and annual plans. We also accept cash, credit cards, and bank transfers. Contact us for more details on pricing.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-12 md:py-18 lg:py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-[#171717] font-extrabold uppercase leading-tight text-2xl md:text-3xl lg:text-[32px]">
            FREQUENTLY
            <br />
            ASKED QUESTIONS
          </h2>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - FAQ Accordion */}
          <div className="lg:col-span-6">
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-[#e0e0e0]">
                  {/* Question Header */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-[#171717] text-base font-semibold pr-4">
                      {faq.question}
                    </span>
                    <span className="text-[#171717] text-xl flex-shrink-0">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {/* Answer */}
                  {openIndex === index && (
                    <div className="px-5 pb-4">
                      <p className="text-[#171717]/70 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column - Info Card */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#e0e0e0] p-6 h-full flex flex-col">
              {/* Icon Placeholder */}
              <div className="w-12 h-12 bg-[#3050FD]/10 rounded flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3050FD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-[#171717] text-lg font-bold mb-2">
                Do you have more questions?
              </h3>

              {/* Subtitle */}
              <p className="text-[#171717]/60 text-sm mb-6 flex-grow">
                Meet the right platform to help realize.
              </p>

              {/* CTA Button */}
              <a
                href="mailto:OPERATION@ATHLETICO.COM"
                className="w-full bg-[#3050FD] hover:bg-[#2040dd] text-white font-semibold text-center py-3 rounded transition-colors"
              >
                Shoot a Direct Mail
              </a>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:col-span-3">
            <div className="relative w-full h-full min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden">
              <Image
                src="/contact-faq.jpg"
                alt="Kids playing football"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
