"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileCheck2,
  ReceiptText,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const stages = [
  {
    id: "before",
    number: "01",
    eyebrow: "Before spend",
    title: "Turn purchase intent into a complete request.",
    body: "Employees submit the business need once. Villeto adds vendor, budget, and ownership context before finance has to ask.",
    bullets: ["Structured intake", "Budget owner attached", "Vendor context included"],
  },
  {
    id: "decision",
    number: "02",
    eyebrow: "At decision time",
    title: "Apply policy while the decision is happening.",
    body: "Rules evaluate the request, select the approval route, and surface exceptions before money moves.",
    bullets: ["Real-time policy checks", "Dynamic approval routing", "Clear exception ownership"],
  },
  {
    id: "after",
    number: "03",
    eyebrow: "After spend",
    title: "Keep the transaction and its evidence together.",
    body: "Cards, receipts, invoices, and approvals resolve into one audit-ready record instead of separate follow-up threads.",
    bullets: ["Receipt and invoice matching", "Connected decision history", "Exportable audit record"],
  },
] as const;

const lifecycleSteps = [
  { label: "Intent", detail: "Request + context", icon: ClipboardList },
  { label: "Control", detail: "Policy + approval", icon: ShieldCheck },
  { label: "Record", detail: "Pay + reconcile", icon: FileCheck2 },
] as const;

function BeforeSpendVisual() {
  return (
    <div className="overflow-hidden rounded-[12px] border border-black/[0.08] bg-white shadow-[0_22px_55px_-38px_rgba(5,20,15,0.5)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2"><ClipboardList className="size-4 text-[#087f70]" /><span className="text-[11px] font-semibold text-[#111714]">Purchase request</span></div>
        <span className="rounded-full bg-[#e7f6f2] px-2 py-1 text-[8px] font-semibold text-[#087f70]">Complete</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_0.8fr] sm:p-5">
        <div className="rounded-[10px] bg-[#f4f6f5] p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#111714] text-white"><Building2 className="size-4" /></span>
            <div><p className="text-[12px] font-semibold text-[#111714]">Figma Enterprise</p><p className="mt-1 text-[9px] text-[#77807c]">24 seats · Annual renewal</p></div>
          </div>
          <div className="mt-5 flex items-end justify-between border-t border-black/[0.06] pt-3"><span className="text-[9px] text-[#77807c]">Design team</span><span className="text-[14px] font-semibold text-[#111714]">$8,400</span></div>
        </div>
        <div className="space-y-2">
          {[["Business need", ClipboardList], ["Budget owner", UserRoundCheck], ["Vendor", Building2]].map(([label, Icon]) => {
            const RowIcon = Icon as typeof ClipboardList;
            return <div key={label as string} className="flex items-center justify-between rounded-[8px] border border-black/[0.06] px-3 py-2.5"><span className="flex items-center gap-2 text-[9px] font-medium text-[#53605a]"><RowIcon className="size-3.5 text-[#087f70]" />{label as string}</span><Check className="size-3 text-[#0ea894]" /></div>;
          })}
        </div>
      </div>
    </div>
  );
}

function DecisionVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const checks = ["Budget available", "Vendor verified", "Approval route selected"];
  return (
    <div className="grid overflow-hidden rounded-[12px] border border-white/10 bg-[#0b100e] text-white shadow-[0_22px_55px_-38px_rgba(0,0,0,0.9)] sm:grid-cols-[0.72fr_1.28fr]">
      <div className="flex flex-col items-center justify-center border-b border-white/10 p-6 sm:border-b-0 sm:border-r">
        <div className="relative flex size-24 items-center justify-center">
          {!reduceMotion && <motion.span className="absolute inset-2 rounded-full border border-dashed border-[#53d3c0]/35" animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} />}
          <span className="flex size-14 items-center justify-center rounded-full bg-[#15352f] text-[#6edbca]"><ShieldCheck className="size-6" /></span>
        </div>
        <p className="text-[10px] font-semibold">Policy engine</p>
        <p className="mt-1 text-[8px] text-white/40">Evaluating before spend</p>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3"><span className="text-[11px] font-semibold">Figma Enterprise · $8,400</span><span className="text-[8px] text-[#6edbca]">3 controls</span></div>
        <div className="divide-y divide-white/[0.07]">
          {checks.map((item, index) => <motion.div key={item} initial={reduceMotion ? false : { opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.14 }} className="flex items-center justify-between py-3"><span className="text-[9px] text-white/65">{item}</span><span className="flex size-5 items-center justify-center rounded-full bg-[#15352f] text-[#6edbca]"><Check className="size-3" /></span></motion.div>)}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-[8px] bg-[#15352f] px-3 py-2 text-[#8ce5d7]"><span className="text-[9px] font-semibold">Cleared automatically</span><CheckCircle2 className="size-3.5" /></div>
      </div>
    </div>
  );
}

function AfterSpendVisual() {
  const events = [
    { label: "Card transaction", detail: "Adobe · $84.99", icon: CreditCard },
    { label: "Receipt matched", detail: "Captured automatically", icon: ReceiptText },
    { label: "Audit record ready", detail: "Policy and approval attached", icon: FileCheck2 },
  ];
  return (
    <div className="overflow-hidden rounded-[12px] border border-black/[0.08] bg-white shadow-[0_22px_55px_-38px_rgba(5,20,15,0.5)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-4 py-3 sm:px-5"><span className="text-[11px] font-semibold text-[#111714]">Transaction record</span><span className="text-[8px] font-medium text-[#77807c]">Today · 10:42</span></div>
      <div className="p-4 sm:p-5">
        {events.map((event, index) => {
          const Icon = event.icon;
          return <div key={event.label} className="relative flex gap-3 pb-4 last:pb-0">{index < events.length - 1 && <span className="absolute left-[15px] top-8 h-5 w-px bg-[#b8ddd6]" />}<span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#e7f6f2] text-[#087f70]"><Icon className="size-4" /></span><div className="min-w-0 flex-1 border-b border-black/[0.05] pb-3 last:border-0"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold text-[#111714]">{event.label}</p>{index > 0 && <CheckCircle2 className="size-3.5 text-[#0ea894]" />}</div><p className="mt-1 text-[9px] text-[#77807c]">{event.detail}</p></div></div>;
        })}
      </div>
    </div>
  );
}

export function FeatureSuite() {
  const reduceMotion = Boolean(useReducedMotion());
  return (
    <section id="products" className="bg-[var(--bg-canvas)] py-20 sm:py-28">
      <Container>
        <Reveal className="mb-12 grid gap-7 md:grid-cols-[0.72fr_1.28fr] md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase text-[var(--text-secondary)]">How spend moves</p>
            <p className="mt-3 max-w-[360px] text-[15px] font-medium leading-6 text-[var(--text-primary)]">
              A purchase starts as business intent, passes through control, and ends as a complete financial record.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[16.7%] right-[16.7%] top-4 h-px overflow-hidden bg-[var(--border-hairline)]">
              <motion.span
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="block h-full origin-left bg-[var(--accent)]"
              />
            </div>
            <ol className="relative grid grid-cols-3">
              {lifecycleSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.label} className="flex flex-col items-center px-1 text-center">
                    <span className="flex size-8 items-center justify-center rounded-[8px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--accent-text)]">
                      <Icon className="size-4" />
                    </span>
                    <span className="mt-3 text-[9px] font-semibold text-[var(--accent-text)]">0{index + 1}</span>
                    <span className="mt-1 text-[11px] font-semibold uppercase text-[var(--text-primary)]">{step.label}</span>
                    <span className="mt-1 text-[10px] text-[var(--text-secondary)]">{step.detail}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>

        <Reveal className="grid gap-5 border-b border-[var(--border-hairline)] pb-12 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <p className="text-[11px] font-semibold uppercase text-[var(--accent-text)]">The spend lifecycle</p>
          <div><h2 className="max-w-[720px] text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)]">One control layer, from intent to audit.</h2><p className="mt-4 max-w-[680px] text-[16px] leading-7 text-[var(--text-secondary)]">Villeto keeps the business reason, policy decision, and financial record connected through every handoff.</p></div>
        </Reveal>

        <div>
          {stages.map((stage, index) => (
            <div key={stage.id} className="grid gap-8 border-b border-[var(--border-hairline)] py-12 last:border-b-0 sm:py-16 md:grid-cols-[0.72fr_1.28fr] md:items-center md:gap-12">
              <Reveal className="max-w-[430px]">
                <div className="flex items-center gap-3"><span className="text-[10px] font-semibold text-[var(--accent-text)]">{stage.number}</span><span className="h-px w-8 bg-[var(--accent)]" /><span className="text-[10px] font-semibold uppercase text-[var(--text-secondary)]">{stage.eyebrow}</span></div>
                <h3 className="mt-5 text-[24px] font-semibold leading-tight text-[var(--text-primary)] sm:text-[28px]">{stage.title}</h3>
                <p className="mt-4 text-[14px] leading-6 text-[var(--text-secondary)]">{stage.body}</p>
                <ul className="mt-6 space-y-2.5">{stage.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-2 text-[12px] font-medium text-[var(--text-primary)]"><Check className="size-3.5 text-[var(--accent)]" />{bullet}</li>)}</ul>
              </Reveal>
              <Reveal delay={0.08}>{index === 0 ? <BeforeSpendVisual /> : index === 1 ? <DecisionVisual reduceMotion={reduceMotion} /> : <AfterSpendVisual />}</Reveal>
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-[var(--border-hairline)] pt-6"><a href="#workflow" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--accent-text)]">Explore the product workflow <ArrowRight className="size-4" /></a></div>
      </Container>
    </section>
  );
}
