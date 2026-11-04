"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const vendorFaqs: FaqItem[] = [
  {
    id: "system-works",
    question: "I already have a system that works. Why should I use Villeto?",
    answer:
      "If your current system involves email chains, shared spreadsheets, and WhatsApp messages, it works until it doesn't. Villeto doesn't replace how you produce goods or deliver services; it gives your commercial relationships structured, automated tracking so you never lose an order, miss a payment term, or wonder where an invoice is sitting.",
  },
  {
    id: "rejection",
    question: "What happens if a buyer rejects my onboarding application?",
    answer:
      "You will see immediate, specific feedback directly in the portal explaining what needs correction (e.g. re-uploading an expired tax certificate or selecting an alternative payment term). You simply edit that specific step and resubmit from the same screen without starting over from scratch.",
  },
  {
    id: "single-company",
    question: "What if I only work with one company?",
    answer:
      "That is completely fine. Villeto is just as powerful for a single buyer relationship as it is for twenty. You get automated PO tracking, clear line-item dispatching, and scheduled payout visibility. When your second or third buyer invites you, your verified profile is already ready to connect in minutes.",
  },
  {
    id: "security",
    question: "Is my business identity and banking data safe?",
    answer:
      "Yes. Your verified identity, tax registration, banking details, and uploaded certificates are encrypted with role-based access control. Critical verified fields (like your legal corporate name and registration number) are locked to protect your integrity and prevent unauthorized modifications.",
  },
  {
    id: "invoice-matching",
    question: "How does invoice creation work when I fulfill an order?",
    answer:
      "Invoices are created directly from confirmed purchase order lines with a single click. Because Villeto matches the invoice lines to the buyer's purchase order and confirmed goods receipts (3-way matching), there are no quantity or price discrepancies to delay your payment.",
  },
];

export function VendorFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>("system-works");
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="mx-auto max-w-[840px] divide-y divide-[var(--border-hairline)] rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-6 py-2 shadow-xs sm:px-8">
      {vendorFaqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              onClick={() => toggle(faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors"
            >
              <span className="text-[16px] font-semibold text-[var(--text-primary)] leading-snug sm:text-[17px]">
                {faq.question}
              </span>
              <span className="mt-0.5 flex shrink-0 size-6 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
                {isOpen ? <Minus className="size-3.5" strokeWidth={2.5} /> : <Plus className="size-3.5" strokeWidth={2.5} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="pb-5 pr-8 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
