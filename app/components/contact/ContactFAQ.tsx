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
      question: "What age groups do you accept?",
      answer:
        "We welcome boys and girls starting from age 4 and above, across all skill levels.",
    },
    {
      question: "How can I register my child?",
      answer:
        "Registration is handled directly with our branch admins. Call or WhatsApp the branch closest to you:\n\n• Dbayeh: 78824357\n• Cornet Chahwan: 79100023\n• Jal el Dib: 76499049\n• Sami el Soloh: 79100025\n• Mansourieh: 79100026\n• Beit Mery: 76779027\n• Horsh Tabet: 79100024\n• Jnah: 70343483\n• Champville, Dik el Mehdi: 71402444\n• Antoura: 03337875\n• Zouk Mikhael: 03337875\n• HQ (Admin/Marketing): 70202030 / 76927288",
    },
    {
      question: "What are the training days and times?",
      answer:
        "Training days and times vary by branch. Refer to our weekly schedule on Instagram (check carousel posts or story highlights for your branch).",
    },
    {
      question: "Where are the training venues located?",
      answer:
        "We currently operate in 12 branches across Lebanon: Dbayeh, Cornet Chahwan, Jal el Dib, Sami el Soloh, Mansourieh, Beit Mery, Horsh Tabet, Jnah, Champville (Dik el Mehdi), Antoura, and Zouk Mikhael.",
    },
    {
      question: "How long does each session last?",
      answer:
        "Sessions last either 1.25 hours or 1.5 hours, depending on the branch and age group. Check your branch's schedule for exact timing.",
    },
    {
      question: "Are there tryouts or can anyone join?",
      answer:
        "There are no tryouts required. We proudly welcome every child who wants to play football in a safe, encouraging, and professional environment. Our coaches will assess each child during sessions and place them in the team where they can grow best — as both a person and a player.",
    },
    {
      question: "What are the fees per term or month?",
      answer:
        "Fees vary based on branch, age group, and number of sessions. Please contact your branch admin for updated pricing.",
    },
    {
      question: "How can I make payments?",
      answer:
        "You can pay through the BOB Finance app (official partner) or with cash at your branch's admin desk.",
    },
    {
      question: "When are payments due?",
      answer: "Payments are due at the beginning of every month.",
    },
    {
      question: "Do you offer sibling discounts?",
      answer:
        "Yes, sibling discounts are available! Just ask your branch admin for details and eligibility.",
    },
    {
      question: "How are teams divided?",
      answer:
        "Teams are first divided by age group, then further split by level (beginner, intermediate, advanced) to ensure every child trains at the right pace and environment.",
    },
    {
      question: "Where can I buy Athletico kits?",
      answer:
        "Kits are available through our branches. DM us to know availability.",
    },
    {
      question: "Is wearing the Athletico kit mandatory?",
      answer: "Yes, official kits are required for training and matches.",
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
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
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
                      <p className="text-[#171717]/70 text-sm leading-relaxed whitespace-pre-line">
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
          {/* <div className="lg:col-span-3">
            <div className="relative w-full h-full min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden">
              <Image
                src="/contact-faq.jpg"
                alt="Kids playing football"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
