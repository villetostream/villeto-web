"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { gettingStarted } from "@/lib/content/onboarding";

export function GettingStarted() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="getting-started" className="bg-[var(--bg-canvas)] py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <h2 className="text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {gettingStarted.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
            {gettingStarted.subhead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {gettingStarted.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.45,
                delay: reduceMotion ? 0 : i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col gap-5 rounded-[var(--radius-lg)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7"
            >
              {/* Connector line between steps — desktop only */}
              {i < gettingStarted.steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute top-[38px] -right-3 hidden w-6 h-px bg-[var(--border-hairline)] lg:block"
                />
              )}

              <div className="flex size-12 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--accent-soft)]">
                <span className="text-[16px] font-bold text-[var(--accent)]">{step.number}</span>
              </div>

              <div>
                <h3 className="text-[17px] font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
