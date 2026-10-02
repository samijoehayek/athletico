// app/contact/components/ContactFAQ.tsx

"use client";

import { useState } from "react";
import { BRANCHES } from "@/lib/branches";
import { TRAINING_SCHEDULE_URL } from "@/lib/site";

interface FAQItem {
  question: string;
  answer: string;
  link?: { href: string; label: string };
}

const branchPhones = BRANCHES.map(
  (b) => `• ${b.name}: ${b.phone.replace(/^\+961\s*/, "").replace(/\s/g, "")}`,
).join("\n");

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
        `Registration is handled directly with our branch admins. Call or WhatsApp the branch closest to you:\n\n${branchPhones}\n• HQ (Admin/Marketing): 70202030 / 76927288`,
    },
    {
      question: "What are the training days and times?",
      answer:
        "Training days and times vary by branch. Refer to our weekly schedule on Instagram for your branch.",
      link: { href: TRAINING_SCHEDULE_URL, label: "View training schedule" },
    },
    {
      question: "Where are the training venues located?",
      answer:
        `We currently operate in ${BRANCHES.length} branches across Lebanon: ${BRANCHES.map((b) => b.name).join(", ")}.`,
    },
    {
      question: "How long does each session last?",
      answer:
        "Sessions last either 1.25 hours or 1.5 hours, depending on the branch and age group. Check your branch's schedule for exact timing.",
    },
    {
      question: "Are there tryouts or can anyone join?",
      answer:
        "There are no tryouts required. We proudly welcome every child who wants to play football in a safe, encouraging, and professional environment. Our coaches will assess each child during sessions and place them in the team where they can grow best, as both a person and a player.",
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
    <section className="w-full bg-[#F1EAEA] py-12 md:py-18 lg:py-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-10">
          <h2 className="text-[#0B3E80] font-extrabold uppercase leading-tight text-2xl md:text-3xl lg:text-[32px]">
            FREQUENTLY
            <br />
            ASKED QUESTIONS
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl">
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-[#e0e0e0]">
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-[#0B3E80] text-base font-semibold pr-4">
                    {faq.question}
                  </span>
                  <span className="text-[#0B3E80] text-xl flex-shrink-0">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                {openIndex === index && (
                  <div className="px-5 pb-4">
                    <p className="text-[#0B3E80]/70 text-sm leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                    {faq.link && (
                      <a
                        href={faq.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-[#0B3E80] text-xs font-bold uppercase tracking-wider hover:text-[#2B87C8] transition-colors"
                      >
                        {faq.link.label}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
