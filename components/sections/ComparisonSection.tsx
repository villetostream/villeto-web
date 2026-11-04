"use client";

import {
  CreditCard,
  Calendar,
  Users,
  MessageCircle,
  Globe,
  X,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { comparisonSection, comparisonItems } from "@/lib/content/comparison";

const iconMap: Record<string, React.ElementType> = {
  "credit-card": CreditCard,
  calendar: Calendar,
  users: Users,
  "message-circle": MessageCircle,
  globe: Globe,
};

export function ComparisonSection() {
  return (
    <section
      id="why-villeto"
      className="relative overflow-hidden bg-[var(--bg-surface)] py-24 sm:py-32"
    >
      {/* Subtle ambient light glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.035] blur-[130px]"
      />

      <Container className="relative">
        {/* Section Heading */}
        <Reveal className="mx-auto max-w-[680px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-1 shadow-xs">
            <Sparkles className="size-3 text-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Why Villeto
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {comparisonSection.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {comparisonSection.subhead}
          </p>
        </Reveal>

        {/* ── Elevated Comparison Card ── */}
        <div className="mx-auto mt-14 max-w-[1040px] overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_4px_28px_-6px_rgba(10,15,13,0.07),0_1px_3px_rgba(10,15,13,0.04)] sm:mt-16">
          {/* Header Row */}
          <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x divide-[var(--border-hairline)] border-b border-[var(--border-hairline)]">
            {/* Left Header — The Gap */}
            <div className="flex items-center justify-between bg-[var(--bg-canvas)] px-6 py-4.5 sm:px-8 sm:py-5">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
                  <X className="size-3.5" strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-[var(--text-primary)]">
                    The gap you've felt
                  </h3>
                  <p className="text-[12px] text-[var(--text-secondary)]">
                    Single-purpose tools and legacy ERPs
                  </p>
                </div>
              </div>
              <span className="hidden rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--text-secondary)] sm:inline-block">
                Conventional
              </span>
            </div>

            {/* Right Header — Villeto */}
            <div className="relative flex items-center justify-between bg-[var(--accent-soft)]/20 px-6 py-4.5 sm:px-8 sm:py-5">
              <div className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-xs shadow-emerald-600/30">
                  <Check className="size-4" strokeWidth={2.75} />
                </span>
                <div>
                  <h3 className="text-[14px] font-semibold tracking-tight text-[var(--text-primary)]">
                    What Villeto does
                  </h3>
                  <p className="text-[12px] font-medium text-[var(--accent-text)]">
                    Unified multi-entity financial workflow
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--accent-text)]">
                Villeto Platform
              </span>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-[var(--border-hairline)]">
            {comparisonItems.map((item, i) => {
              const Icon = iconMap[item.icon] ?? Check;
              return (
                <motion.div
                  key={item.id}
                  className="group grid grid-cols-1 divide-y transition-colors duration-150 sm:grid-cols-2 sm:divide-y-0 sm:divide-x divide-[var(--border-hairline)] hover:bg-[var(--bg-surface)]/40"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                >
                  {/* Gap cell */}
                  <div className="flex items-start gap-4 px-6 py-5 sm:px-8 sm:py-5.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors duration-200 group-hover:border-rose-500/20 group-hover:bg-rose-500/5 group-hover:text-rose-500">
                      <Icon className="size-4.5" strokeWidth={1.75} />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                        {item.gap}
                      </p>
                    </div>
                  </div>

                  {/* Villeto answer cell */}
                  <div className="relative flex items-start gap-4 bg-[var(--accent-soft)]/10 px-6 py-5 transition-colors duration-200 group-hover:bg-[var(--accent-soft)]/20 sm:px-8 sm:py-5.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[var(--accent)]/25 bg-[var(--accent-soft)] text-[var(--accent-text)] transition-transform duration-200 group-hover:scale-105">
                      <Check className="size-4.5" strokeWidth={2.5} />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[14.5px] font-medium leading-relaxed text-[var(--text-primary)]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Card Footer */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[var(--border-hairline)] bg-[var(--bg-surface)]/70 px-6 py-4 text-center sm:flex-row sm:px-8 sm:text-left">
            <p className="text-[13px] text-[var(--text-secondary)]">
              Replace the patchwork of point solutions and manual spreadsheets with one connected chain.
            </p>
            <a
              href="/solutions/cfos"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-text)] transition-colors hover:text-[var(--text-primary)]"
            >
              Explore CFO workflows
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
