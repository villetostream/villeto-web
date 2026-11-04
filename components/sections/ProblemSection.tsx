"use client";

import {
  MessageCircleWarning,
  FileQuestion,
  Building2,
  Receipt,
  AlertCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { problemSection } from "@/lib/content/problem";

const iconMap: Record<string, React.ElementType> = {
  "message-circle-warning": MessageCircleWarning,
  "file-question": FileQuestion,
  "building-2": Building2,
  receipt: Receipt,
};

export function ProblemSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="problem" className="relative overflow-hidden bg-[var(--bg-surface)] py-20 sm:py-28">
      <Container className="relative">
        {/* ── Section Heading ── */}
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-1 shadow-xs">
            <span className="size-1.5 rounded-full bg-[var(--text-secondary)] opacity-60" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
              {problemSection.badge}
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {problemSection.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {problemSection.narrative}
          </p>
        </Reveal>

        {/* ── Neutral, Executive Problem Cards ── */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-7">
          {problemSection.painCards.map((card, i) => {
            const Icon = iconMap[card.icon] ?? AlertCircle;
            return (
              <motion.div
                key={card.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: reduceMotion ? 0 : i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:hover:border-zinc-700 sm:p-8"
              >
                <div>
                  {/* Top Bar: Clean Neutral Icon + Step Counter */}
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-transform duration-200 group-hover:scale-105">
                      <Icon className="size-5 text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--text-primary)]" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[13px] font-semibold text-[var(--text-secondary)] opacity-60">
                      {card.num}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="mt-5 text-[18px] font-semibold tracking-tight text-[var(--text-primary)]">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                    {card.body}
                  </p>
                </div>

                {/* Minimalist Neutral Tag */}
                <div className="mt-6 pt-5 border-t border-[var(--border-hairline)]">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 text-[12px] font-medium text-[var(--text-secondary)]">
                    <span className="size-1.5 rounded-full bg-[var(--text-secondary)] opacity-40" />
                    {card.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
