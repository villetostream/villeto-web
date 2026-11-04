"use client";

import { Building2, Check, CheckCircle2, FileClock, FileCheck2, Link2, ReceiptText, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const evidence = [
  {
    icon: ShieldCheck,
    title: "Rule applied",
    body: "Spend Programs enforce budget headroom and multi-tier signoff on orders above ₦5,000,000.",
  },
  {
    icon: FileClock,
    title: "Decision recorded",
    body: "Approver, timestamp, and visible request context remain attached to the audit record.",
  },
  {
    icon: Link2,
    title: "Record linked",
    body: "Purchase order, delivery receipt, supplier invoice, and ledger entry resolve to the same decision.",
  },
] as const;

const trace = [
  { title: "Purchase Request (PR)", detail: "Aster Cloud · ₦6,800,000", icon: ReceiptText },
  { title: "Vendor verified", detail: "CAC check & bank details confirmed", icon: Building2 },
  { title: "Spend Program check", detail: "3-stage lifecycle & budget headroom", icon: ShieldCheck },
  { title: "SoD enforced & signed", detail: "Chidi (Procurement) & Ngozi (Finance)", icon: CheckCircle2 },
  { title: "3-Way match & posted", detail: "PO-0047 · GR-0091 · INV-8812", icon: FileCheck2 },
] as const;

const traceItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.12 + index * 0.14, duration: 0.42, ease: EASE },
  }),
};

const policyItemVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.64 + index * 0.13, duration: 0.38, ease: EASE },
  }),
};

const evidenceItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 1.05 + index * 0.08, duration: 0.34, ease: EASE },
  }),
};

function DecisionTraceVisual({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: false, amount: 0.35 }}
      className="overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm dark:shadow-[0_28px_70px_-32px_rgba(0,0,0,0.7)]"
    >
      {/* Console Header Bar */}
      <div className="relative flex items-center justify-between overflow-hidden border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/60 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <motion.span
            animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="size-2 rounded-full bg-[var(--accent)]"
          />
          <span className="type-ui font-semibold text-[var(--text-primary)]">Decision trace console</span>
        </div>
        <motion.span variants={evidenceItemVariants} custom={4} className="type-meta flex items-center gap-1.5 font-semibold text-[var(--accent-text)]">
          <CheckCircle2 className="size-3.5" />Audit Complete
        </motion.span>
        {!reduceMotion && (
          <motion.span
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.45, ease: EASE } } }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[var(--accent)] via-[var(--accent)]/45 to-transparent"
          />
        )}
      </div>

      <div className="grid md:grid-cols-[0.92fr_1.08fr]">
        {/* Left Column: Transaction Timeline */}
        <div className="border-b border-[var(--border-hairline)] p-5 md:border-b-0 md:border-r sm:p-6 bg-[var(--bg-surface)]">
          <p className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">Transaction timeline</p>
          <div className="mt-5">
            {trace.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div custom={index} variants={traceItemVariants} key={item.title} className={`relative gap-3 pb-5 last:pb-0 ${index === 1 || index === 3 ? "hidden sm:flex" : "flex"}`}>
                  {index < trace.length - 1 && (
                    <motion.span
                      variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { delay: 0.28 + index * 0.14, duration: 0.32 } } }}
                      className="absolute left-[15px] top-8 h-7 w-px origin-top bg-[var(--accent)]/30"
                    />
                  )}
                  <motion.span
                    variants={{ hidden: { scale: 0.78 }, visible: { scale: 1, transition: { delay: 0.14 + index * 0.14, duration: 0.35, ease: EASE } } }}
                    className="z-10 flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--accent-soft)] text-[var(--accent-text)]"
                  >
                    <Icon className="size-4" />
                  </motion.span>
                  <div className="min-w-0 flex-1 border-b border-[var(--border-hairline)] pb-4 last:border-0">
                    <p className="type-ui font-semibold text-[var(--text-primary)]">{item.title}</p>
                    <p className="type-meta mt-0.5 text-[var(--text-secondary)]">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Policy Evaluation & Evidence Attached */}
        <div className="p-5 sm:p-6 bg-[var(--bg-canvas)]/35">
          <motion.div variants={policyItemVariants} custom={0} className="flex items-start justify-between gap-4">
            <div>
              <p className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">Spend Program evaluation</p>
              <h3 className="type-card-title mt-1.5 font-semibold text-[var(--text-primary)]">B2B Procurement: Cloud Ops</h3>
            </div>
            <span className="type-meta rounded-[6px] bg-[var(--accent-soft)] px-2.5 py-1 font-semibold text-[var(--accent-text)]">₦6,800,000</span>
          </motion.div>

          <div className="mt-5 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {[
              "CapEx budget headroom available (₦17.5M remaining)",
              "3-quote procurement rule verified",
              "Separation of Duties (SoD) enforced",
              "Supplier bank details match CAC legal entity",
            ].map((item, index) => (
              <motion.div custom={index + 1} variants={policyItemVariants} key={item} className="flex items-center justify-between py-2.5 text-[12px]">
                <span className="type-meta text-[var(--text-secondary)]">{item}</span>
                <motion.span
                  variants={{ hidden: { scale: 0.65, rotate: -20 }, visible: { scale: 1, rotate: 0, transition: { delay: 0.76 + index * 0.13, duration: 0.34, ease: EASE } } }}
                  className="flex size-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] shrink-0"
                >
                  <Check className="size-3" />
                </motion.span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={evidenceItemVariants} custom={0} className="mt-6">
            <div className="type-meta flex items-center justify-between">
              <p className="font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Evidence attached</p>
              <span className="text-[var(--accent-text)] font-semibold">4 records linked</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {["PR-2026-0047", "PO-2026-0047", "GR-2026-0091", "INV-2026-8812"].map((item, index) => (
                <motion.div
                  custom={index + 1}
                  variants={evidenceItemVariants}
                  key={item}
                  className="type-meta flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-2 text-[var(--text-primary)] shadow-2xs text-[11.5px]"
                >
                  <FileCheck2 className="size-3.5 text-[var(--accent-text)] shrink-0" />
                  <span className="font-mono">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={evidenceItemVariants} custom={5} className="type-meta mt-6 flex items-center justify-between border-t border-[var(--border-hairline)] pt-4">
            <div>
              <p className="uppercase text-[var(--text-secondary)] text-[10px]">Trace ID & Fiscal Lock</p>
              <p className="mt-0.5 font-mono text-[11px] text-[var(--text-primary)]">VL-2048-AX · sha256:7f8a9c019</p>
            </div>
            <span className="rounded-[6px] bg-[var(--accent-soft)] px-2.5 py-1 font-semibold text-[var(--accent-text)]">Audit-ready</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialBand() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="proof" className="relative overflow-hidden bg-[var(--bg-canvas)] py-20 text-[var(--text-primary)] sm:py-28">
      <Container>
        {/* ── Centered Section Heading (Consistent Rhythm) ── */}
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1 shadow-xs">
            <ShieldCheck className="size-3 text-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Operational Proof
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold leading-[1.12] tracking-tight text-[var(--text-primary)]">
            Proof lives in the record.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            Every rule, reviewer, and financial outcome stays permanently connected, so finance and auditors can explain what happened without reconstructing it.
          </p>
        </Reveal>

        {/* ── 3 Key Assurance Pillars ── */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-[1040px] mx-auto">
          {evidence.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 shadow-xs transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-text)]">
                      <Icon className="size-4.5" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="type-card-title mt-4 font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="type-card-copy mt-1.5 text-[var(--text-secondary)]">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ── Interactive Decision Trace Console ── */}
        <Reveal delay={0.2} className="mt-6 max-w-[1040px] mx-auto">
          <DecisionTraceVisual reduceMotion={reduceMotion} />
        </Reveal>
      </Container>
    </section>
  );
}
