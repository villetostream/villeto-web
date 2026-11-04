"use client";

import {
  UserPlus,
  BadgeCheck,
  FileText,
  MessageCircle,
  Building2,
  ShieldCheck,
  Eye,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { vendorPortalSection } from "@/lib/content/entities";

const buyerIcons = [UserPlus, BadgeCheck, FileText, MessageCircle];
const supplierIcons = [Building2, ShieldCheck, Eye, RotateCcw];

export function VendorPortalSection() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="vendor-portal" className="bg-[var(--bg-canvas)] py-20 sm:py-28">
      <Container>
        {/* ── Heading ── */}
        <Reveal className="mx-auto max-w-[700px] text-center">
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-text)]">
            Supplier experience
          </p>
          <h2 className="text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {vendorPortalSection.heading}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
            {vendorPortalSection.subhead}
          </p>
        </Reveal>

        {/* ── Two-sided value grid ── */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Buyer side */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                <Building2 className="size-4.5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">What your team gets</h3>
                <p className="text-[13px] text-[var(--text-secondary)]">Less manual work for AP and procurement</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {vendorPortalSection.buyerBenefits.map((benefit, i) => {
                const Icon = buyerIcons[i]!;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.45,
                      delay: reduceMotion ? 0 : i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex gap-3.5"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent-soft)] text-[var(--accent-text)]">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">{benefit.title}</h4>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">{benefit.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Supplier side */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                <UserPlus className="size-4.5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">What your supplier gets</h3>
                <p className="text-[13px] text-[var(--text-secondary)]">A workspace they actually want to use</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {vendorPortalSection.supplierBenefits.map((benefit, i) => {
                const Icon = supplierIcons[i]!;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                      duration: 0.45,
                      delay: reduceMotion ? 0 : i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex gap-3.5"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">{benefit.title}</h4>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">{benefit.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <a
            href={vendorPortalSection.cta.href}
            className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-6 py-3 text-[14px] font-semibold text-[var(--text-primary)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent-text)]"
          >
            {vendorPortalSection.cta.label}
            <ArrowRight className="size-4" strokeWidth={2} />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
