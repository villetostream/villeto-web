"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  Landmark,
  ReceiptText,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const stages = [
  {
    id: "request",
    number: "01",
    label: "Request",
    title: "Capture the purchase once.",
    summary: "The business need, amount, budget, and owner arrive together.",
    signals: ["Need captured", "Budget linked", "Owner assigned"],
    icon: ClipboardList,
  },
  {
    id: "vendor",
    number: "02",
    label: "Vendor",
    title: "Know the vendor before approval.",
    summary: "Identity, contract, banking, and risk checks live in one vendor record.",
    signals: ["Profile verified", "Contract attached", "Risk cleared"],
    icon: Building2,
  },
  {
    id: "control",
    number: "03",
    label: "Control",
    title: "Apply policy before money moves.",
    summary: "Rules evaluate the request and send it through the right approval route.",
    signals: ["Budget available", "Policy passed", "Route selected"],
    icon: ShieldCheck,
  },
  {
    id: "record",
    number: "04",
    label: "Record",
    title: "Close the loop with evidence.",
    summary: "Invoice, payment, approval, and audit history resolve into one record.",
    signals: ["Invoice matched", "Payment scheduled", "Audit ready"],
    icon: FileCheck2,
  },
] as const;

function RequestVisual() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-black/[0.08] bg-white text-[#111714] shadow-[0_28px_65px_-44px_rgba(5,20,15,0.6)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
        <div className="flex items-center gap-2"><ClipboardList className="size-4 text-[#087f70]" /><span className="text-[11px] font-semibold">Purchase request</span></div>
        <span className="rounded-[6px] bg-[#e7f6f2] px-2 py-1 text-[8px] font-semibold text-[#087f70]">Complete</span>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[1.15fr_0.85fr] sm:p-6">
        <div className="flex min-h-[190px] flex-col justify-between rounded-[8px] bg-[#f4f6f5] p-5">
          <div className="flex items-start gap-3">
            <span className="flex size-10 items-center justify-center rounded-[8px] bg-[#111714] text-white"><Building2 className="size-4" /></span>
            <div><p className="text-[13px] font-semibold">Aster Cloud</p><p className="mt-1 text-[9px] text-[#77807c]">Analytics workspace · Annual</p></div>
          </div>
          <div className="flex items-end justify-between border-t border-black/[0.06] pt-4"><span className="text-[9px] text-[#77807c]">Operations team</span><span className="text-[17px] font-semibold">$6,800</span></div>
        </div>
        <div className="space-y-2">
          {[
            ["Business need", ClipboardList],
            ["Budget owner", UserRoundCheck],
            ["Vendor selected", Building2],
          ].map(([label, Icon], index) => {
            const RowIcon = Icon as typeof ClipboardList;
            return (
              <motion.div key={label as string} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} className="flex items-center justify-between rounded-[8px] border border-black/[0.06] px-3 py-3">
                <span className="flex items-center gap-2 text-[9px] font-medium text-[#53605a]"><RowIcon className="size-3.5 text-[#087f70]" />{label as string}</span>
                <Check className="size-3 text-[#0ea894]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VendorVisual() {
  const checks = [
    { label: "Tax and legal profile", detail: "Verified" },
    { label: "Banking details", detail: "Confirmed" },
    { label: "Security review", detail: "Low risk" },
  ];
  return (
    <div className="overflow-hidden rounded-[8px] border border-black/[0.08] bg-white text-[#111714] shadow-[0_28px_65px_-44px_rgba(5,20,15,0.6)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
        <span className="text-[11px] font-semibold">Vendor profile</span>
        <span className="flex items-center gap-1.5 rounded-[6px] bg-[#e7f6f2] px-2 py-1 text-[8px] font-semibold text-[#087f70]"><CheckCircle2 className="size-3" />Verified</span>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-[0.8fr_1.2fr] sm:p-6">
        <div className="rounded-[8px] bg-[#111714] p-5 text-white">
          <span className="flex size-10 items-center justify-center rounded-[8px] bg-[#1b332d] text-[#6edbca]"><Building2 className="size-5" /></span>
          <p className="mt-5 text-[14px] font-semibold">Aster Cloud Systems Ltd.</p>
          <p className="mt-1 text-[9px] text-white/50">Software · United States</p>
          <div className="mt-6 border-t border-white/10 pt-4"><p className="text-[8px] uppercase text-white/40">Business owner</p><p className="mt-1 text-[10px] font-medium">Amara · Operations</p></div>
        </div>
        <div className="divide-y divide-black/[0.06]">
          {checks.map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="flex items-center justify-between py-4 first:pt-1 last:pb-1">
              <div><p className="text-[10px] font-semibold">{item.label}</p><p className="mt-1 text-[9px] text-[#77807c]">{item.detail}</p></div>
              <span className="flex size-6 items-center justify-center rounded-full bg-[#e7f6f2] text-[#087f70]"><Check className="size-3" /></span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ControlVisual({ reduceMotion }: { reduceMotion: boolean }) {
  const checks = ["Budget available", "Vendor verified", "Approval route selected"];
  return (
    <div className="grid overflow-hidden rounded-[8px] border border-white/10 bg-[#0b100e] text-white shadow-[0_28px_65px_-44px_rgba(0,0,0,0.9)] sm:grid-cols-[0.72fr_1.28fr]">
      <div className="flex flex-col items-center justify-center border-b border-white/10 p-6 sm:border-b-0 sm:border-r">
        <div className="relative flex size-24 items-center justify-center">
          {!reduceMotion && <motion.span className="absolute inset-2 rounded-full border border-dashed border-[#53d3c0]/35" animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} />}
          <span className="flex size-14 items-center justify-center rounded-full bg-[#15352f] text-[#6edbca]"><ShieldCheck className="size-6" /></span>
        </div>
        <p className="text-[10px] font-semibold">Policy engine</p>
        <p className="mt-1 text-[8px] text-white/40">Evaluating before spend</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="text-[11px] font-semibold">Aster Cloud · $6,800</span><span className="text-[8px] text-[#6edbca]">3 controls</span></div>
        <div className="divide-y divide-white/[0.07]">
          {checks.map((item, index) => <motion.div key={item} initial={reduceMotion ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="flex items-center justify-between py-3.5"><span className="text-[9px] text-white/65">{item}</span><span className="flex size-5 items-center justify-center rounded-full bg-[#15352f] text-[#6edbca]"><Check className="size-3" /></span></motion.div>)}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-[8px] bg-[#15352f] px-3 py-2.5 text-[#8ce5d7]"><span className="text-[9px] font-semibold">Cleared automatically</span><CheckCircle2 className="size-3.5" /></div>
      </div>
    </div>
  );
}

function RecordVisual() {
  const events = [
    { label: "Invoice received", detail: "INV-2048 · $6,800", icon: ReceiptText },
    { label: "Payment scheduled", detail: "ACH · Friday", icon: Landmark },
    { label: "Audit record ready", detail: "Policy and approval attached", icon: FileCheck2 },
  ];
  return (
    <div className="overflow-hidden rounded-[8px] border border-black/[0.08] bg-white text-[#111714] shadow-[0_28px_65px_-44px_rgba(5,20,15,0.6)]">
      <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4"><span className="text-[11px] font-semibold">Financial record</span><span className="text-[8px] font-medium text-[#77807c]">Complete</span></div>
      <div className="p-5 sm:p-6">
        {events.map((event, index) => {
          const Icon = event.icon;
          return (
            <motion.div key={event.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="relative flex gap-3 pb-5 last:pb-0">
              {index < events.length - 1 && <span className="absolute left-[15px] top-8 h-7 w-px bg-[#b8ddd6]" />}
              <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#e7f6f2] text-[#087f70]"><Icon className="size-4" /></span>
              <div className="min-w-0 flex-1 border-b border-black/[0.05] pb-4 last:border-0"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold">{event.label}</p><CheckCircle2 className="size-3.5 text-[#0ea894]" /></div><p className="mt-1 text-[9px] text-[#77807c]">{event.detail}</p></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function FeatureSuite() {
  const [active, setActive] = useState(0);
  const reduceMotion = Boolean(useReducedMotion());
  const stage = stages[active] ?? stages[0];

  return (
    <section id="products" className="bg-[var(--bg-canvas)] py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <p className="text-[11px] font-semibold uppercase text-[var(--accent-text)]">The spend lifecycle</p>
          <div>
            <h2 className="max-w-[720px] text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)]">Four moments. One connected record.</h2>
            <p className="mt-4 max-w-[650px] text-[15px] leading-6 text-[var(--text-secondary)]">Move from request to vendor review, control, and reconciliation without rebuilding context at every step.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid overflow-hidden rounded-[8px] border border-[var(--border-hairline)] bg-[var(--bg-surface)] md:grid-cols-[0.72fr_1.28fr]">
          <div className="divide-y divide-[var(--border-hairline)] border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] md:border-b-0 md:border-r">
            {stages.map((item, index) => {
              const Icon = item.icon;
              const selected = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                  className={`relative w-full px-5 py-5 text-left transition-colors sm:px-6 ${selected ? "bg-[var(--accent-soft)]/55" : "hover:bg-[var(--bg-surface)]"}`}
                >
                  {selected && <motion.span layoutId="lifecycle-stage" className="absolute inset-y-0 left-0 w-0.5 bg-[var(--accent)]" />}
                  <div className="flex items-center gap-3">
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-[7px] ${selected ? "bg-[var(--accent)] text-[var(--accent-contrast)]" : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"}`}><Icon className="size-4" /></span>
                    <span className="text-[9px] font-semibold text-[var(--accent-text)]">{item.number}</span>
                    <span className={`text-[11px] font-semibold uppercase ${selected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>{item.label}</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div initial={reduceMotion ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduceMotion ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden pl-11">
                        <h3 className="mt-4 text-[18px] font-semibold text-[var(--text-primary)]">{item.title}</h3>
                        <p className="mt-2 max-w-[340px] text-[12px] leading-5 text-[var(--text-secondary)]">{item.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                          {item.signals.map((signal) => <span key={signal} className="flex items-center gap-1.5 text-[9px] font-medium text-[var(--text-primary)]"><Check className="size-3 text-[var(--accent)]" />{signal}</span>)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <div className="flex min-h-[410px] flex-col justify-between p-5 sm:p-7 md:min-h-[560px] md:p-9">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold uppercase text-[var(--text-secondary)]">Stage {active + 1} of {stages.length}</span>
              <span className="flex items-center gap-2 text-[9px] font-medium text-[var(--accent-text)]"><span className="size-1.5 rounded-full bg-[var(--accent)]" />Context carried forward</span>
            </div>
            <div className="my-7">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={stage.id} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.24 }}>
                  {active === 0 ? <RequestVisual /> : active === 1 ? <VendorVisual /> : active === 2 ? <ControlVisual reduceMotion={reduceMotion} /> : <RecordVisual />}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-4">
              <span className="text-[10px] text-[var(--text-secondary)]">{stage.number} · {stage.label}</span>
              <button type="button" onClick={() => setActive((active + 1) % stages.length)} className="inline-flex items-center gap-2 text-[11px] font-semibold text-[var(--accent-text)]">
                Next stage <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6"><a href="#workflow" className="inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--accent-text)]">Explore the product workflow <ArrowRight className="size-4" /></a></div>
      </Container>
    </section>
  );
}
