"use client";

import {
  Layers,
  ShieldCheck,
  UserCheck,
  PackageCheck,
  FileCheck2,
  BookOpen,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { workflowSection } from "@/lib/content/workflow";

const stepIcons = [Layers, ShieldCheck, UserCheck, PackageCheck, FileCheck2, BookOpen];

const stepColors = [
  { icon: "text-teal-500", bg: "bg-teal-500/10" },
  { icon: "text-sky-500", bg: "bg-sky-500/10" },
  { icon: "text-violet-500", bg: "bg-violet-500/10" },
  { icon: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: "text-emerald-500", bg: "bg-emerald-500/10" },
];

export function WorkflowChain() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-[var(--bg-canvas)] py-20 sm:py-28">
      {/* Accent glow — subtle, theme-aware */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.05] blur-[80px]"
      />

      <Container className="relative">
        {/* Heading */}
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-text)]">
            How it works
          </p>
          <h2 className="text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {workflowSection.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {workflowSection.subhead}
          </p>
        </Reveal>

        {/* Chain Container */}
        <div className="relative mt-16 sm:mt-20">
          {/* ── Vertical spine (mobile) ── */}
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-4 bottom-4 w-px bg-[var(--border-hairline)] sm:left-[35px] lg:hidden"
          />

          {/* ── Horizontal spine (desktop) ── */}
          <div
            aria-hidden="true"
            className="absolute top-[36px] left-[60px] right-[60px] hidden h-px bg-[var(--border-hairline)] lg:block"
          >
            {/* Animated accent pulse */}
            {!reduceMotion && (
              <motion.div
                className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-75"
                animate={{ x: ["0%", "580%"] }}
                transition={{ duration: 3.8, ease: "linear", repeat: Infinity, repeatDelay: 0.6 }}
              />
            )}
          </div>

          {/* Steps Grid - always rendered and visible */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-4">
            {workflowSection.steps.map((step, i) => {
              const Icon = stepIcons[i]!;
              const color = stepColors[i]!;

              return (
                <motion.div
                  key={step.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{
                    duration: 0.45,
                    delay: reduceMotion ? 0 : i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex gap-5 lg:flex-col lg:items-start lg:gap-0"
                >
                  {/* ── Icon node + connector ── */}
                  <div className="relative flex flex-col items-center shrink-0">
                    <div
                      className={`relative flex size-[54px] items-center justify-center rounded-2xl ${color.bg} border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-xs transition-transform duration-200 hover:scale-105 sm:size-16 lg:size-[72px]`}
                    >
                      <Icon className={`size-6 lg:size-7 ${color.icon}`} strokeWidth={1.75} />
                      {/* Step number badge */}
                      <span className="absolute -top-2.5 -right-2.5 flex size-6 items-center justify-center rounded-full bg-[var(--bg-canvas)] border border-[var(--border-hairline)] text-[10px] font-bold text-[var(--text-secondary)] shadow-2xs">
                        {step.number}
                      </span>
                    </div>

                    {/* Vertical connector — mobile only */}
                    {i < workflowSection.steps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="mt-2 w-px flex-1 bg-[var(--border-hairline)] lg:hidden"
                        style={{ minHeight: 32 }}
                      />
                    )}
                  </div>

                  {/* ── Copy ── */}
                  <div className="flex-1 pb-6 lg:pb-0 lg:mt-6">
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)] lg:text-[15px]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--text-secondary)] lg:mt-2 lg:text-[13px]">
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom legend */}
        <Reveal delay={0.15} className="mt-14 flex items-center justify-center gap-3 sm:mt-16">
          <span className="h-px w-10 bg-[var(--border-hairline)]" />
          <p className="text-[13px] text-[var(--text-secondary)] text-center">
            Two spend streams. One pre-commitment control layer. One immutable subledger.
          </p>
          <span className="h-px w-10 bg-[var(--border-hairline)]" />
        </Reveal>
      </Container>
    </section>
  );
}
