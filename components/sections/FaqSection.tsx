"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowRight, MessageCircle, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { faqSection } from "@/lib/content/onboarding";

const INITIAL_COUNT = 5;

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqSection.items[0]?.id ?? null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const visibleItems = faqSection.items.slice(0, INITIAL_COUNT);

  return (
    <section id="faq" className="relative overflow-hidden bg-[var(--bg-surface)] py-20 sm:py-28">
      <Container>
        {/* ── Centered Section Heading ── */}
        <Reveal className="mx-auto max-w-[700px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-1 shadow-xs">
            <HelpCircle className="size-3 text-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {faqSection.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            Common questions finance teams ask before standardizing on Villeto.
          </p>
        </Reveal>

        {/* ── Centered Accordion Panel ── */}
        <div className="mx-auto mt-14 max-w-[840px]">
          <div className="divide-y divide-[var(--border-hairline)] rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-6 py-2 shadow-xs sm:px-8">
            {visibleItems.map((item, i) => {
              const isOpen = openId === item.id;
              return (
                <Reveal key={item.id} delay={i * 0.04}>
                  <div>
                    <button
                      id={`faq-btn-${item.id}`}
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${item.id}`}
                      className="flex w-full items-start justify-between gap-4 py-5.5 text-left"
                    >
                      <span className="text-[16px] font-semibold text-[var(--text-primary)] leading-snug sm:text-[17px]">
                        {item.question}
                      </span>
                      <span className="mt-0.5 flex shrink-0 size-6 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors">
                        {isOpen ? <Minus className="size-3.5" strokeWidth={2.5} /> : <Plus className="size-3.5" strokeWidth={2.5} />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${item.id}`}
                          role="region"
                          aria-labelledby={`faq-btn-${item.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="pb-5 pr-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom Navigation & Support Banner */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5 shadow-xs sm:flex-row sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <MessageCircle className="size-5" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[var(--text-primary)]">Still have questions?</p>
                <p className="text-[12.5px] text-[var(--text-secondary)]">Our solutions team is here to walk through your setup.</p>
              </div>
            </div>
            <div className="flex w-full items-center gap-3 sm:w-auto">
              <a
                href="/support"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-[13px] font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90 sm:w-auto"
              >
                Visit Help Centre
                <ArrowRight className="size-3.5" strokeWidth={2.5} />
              </a>
              <a
                href="mailto:support@villeto.com"
                className="hidden items-center justify-center gap-1.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 text-[13px] font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent-text)] sm:inline-flex"
              >
                Email Support
              </a>
            </div>
          </div>

          {/* See all FAQs Link */}
          <div className="mt-6 text-center">
            <a
              href="/support#faqs"
              id="faq-see-all-link"
              className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--accent-text)] transition-opacity hover:opacity-80"
            >
              See all {faqSection.items.length} frequently asked questions
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
