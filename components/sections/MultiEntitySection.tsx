"use client";

import { Globe2, BookOpen, Banknote, Users, Layers, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { multiEntitySection } from "@/lib/content/entities";
import { EntityWorkspaceMockup } from "@/components/sections/EntityWorkspaceMockup";

const capabilityIcons = [Layers, BookOpen, Banknote, Users, Globe2];

export function MultiEntitySection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="multi-entity" className="relative overflow-hidden bg-[var(--bg-canvas)] py-20 sm:py-28">
      <Container>
        {/* ── Centered Section Heading ── */}
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1 shadow-xs">
            <Globe2 className="size-3 text-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Single & Multi-Entity Scale
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {multiEntitySection.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {multiEntitySection.subhead}
          </p>
        </Reveal>

        {/* ── 2-Column Layout: Capabilities + Interactive Workspace Mockup ── */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: Capabilities Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {multiEntitySection.capabilities.map((cap, i) => {
              const Icon = capabilityIcons[i]!;
              const isFirst = i === 0;

              return (
                <motion.div
                  key={cap.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.45,
                    delay: reduceMotion ? 0 : i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`flex flex-col gap-3 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700 ${
                    isFirst ? "sm:col-span-2 sm:flex-row sm:items-center sm:gap-4.5 bg-[var(--accent-soft)]/15 border-[var(--accent)]/20" : ""
                  }`}
                >
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                    isFirst ? "bg-[var(--accent)] text-white shadow-xs" : "bg-[var(--accent-soft)] text-[var(--accent)]"
                  }`}>
                    <Icon className="size-4.5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[14.5px] font-semibold text-[var(--text-primary)]">{cap.title}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">{cap.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Interactive Entity Workspace Mockup */}
          <Reveal delay={0.15}>
            <EntityWorkspaceMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
