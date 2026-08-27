"use client";

import { Building2, Check, CheckCircle2, FileClock, FileCheck2, Link2, ReceiptText, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const evidence = [
  { icon: ShieldCheck, title: "Rule applied", body: "Software purchases above $5,000 require finance approval." },
  { icon: FileClock, title: "Decision recorded", body: "Approver, timestamp, and visible request context remain attached." },
  { icon: Link2, title: "Record linked", body: "Invoice, payment, and audit evidence resolve to the same decision." },
] as const;

const trace = [
  { title: "Request received", detail: "Aster Cloud · $6,800", icon: ReceiptText },
  { title: "Vendor verified", detail: "Tax, banking, security", icon: Building2 },
  { title: "Policy SW-05 applied", detail: "Finance approval required", icon: ShieldCheck },
  { title: "Finance approved", detail: "Amara · 10:42", icon: CheckCircle2 },
  { title: "Invoice matched", detail: "INV-2048", icon: FileCheck2 },
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
      className="overflow-hidden rounded-[8px] border border-white/10 bg-[#111714] shadow-[0_38px_90px_-48px_rgba(0,0,0,0.9)]"
    >
      <div className="relative flex items-center justify-between overflow-hidden border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <motion.span
            animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="size-1.5 rounded-full bg-[#72dece]"
          />
          <span className="type-ui font-semibold">Decision trace</span>
        </div>
        <motion.span variants={evidenceItemVariants} custom={4} className="type-meta flex items-center gap-1.5 text-white/50">
          <CheckCircle2 className="size-3 text-[#72dece]" />Complete
        </motion.span>
        {!reduceMotion && (
          <motion.span
            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.45, ease: EASE } } }}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-[#72dece] via-[#72dece]/45 to-transparent"
          />
        )}
      </div>

      <div className="grid md:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r sm:p-6">
          <p className="type-meta font-semibold uppercase text-[#72dece]">Transaction timeline</p>
          <div className="mt-5">
            {trace.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div custom={index} variants={traceItemVariants} key={item.title} className={`relative gap-3 pb-5 last:pb-0 ${index === 1 || index === 3 ? "hidden sm:flex" : "flex"}`}>
                  {index < trace.length - 1 && (
                    <motion.span
                      variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { delay: 0.28 + index * 0.14, duration: 0.32 } } }}
                      className="absolute left-[15px] top-8 h-7 w-px origin-top bg-[#72dece]/30"
                    />
                  )}
                  <motion.span
                    variants={{ hidden: { scale: 0.78 }, visible: { scale: 1, transition: { delay: 0.14 + index * 0.14, duration: 0.35, ease: EASE } } }}
                    className="z-10 flex size-8 shrink-0 items-center justify-center rounded-[7px] bg-[#17342e] text-[#72dece]"
                  >
                    <Icon className="size-3.5" />
                  </motion.span>
                  <div className="min-w-0 flex-1 border-b border-white/[0.07] pb-4 last:border-0"><p className="type-ui font-semibold">{item.title}</p><p className="type-meta mt-1 text-white/40">{item.detail}</p></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <motion.div variants={policyItemVariants} custom={0} className="flex items-start justify-between gap-4">
            <div><p className="type-meta font-semibold uppercase text-[#72dece]">Policy evaluation</p><h3 className="type-card-title mt-2 font-semibold">Software purchase</h3></div>
            <span className="type-meta rounded-[6px] bg-[#17342e] px-2 py-1 font-semibold text-[#72dece]">$6,800</span>
          </motion.div>

          <div className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {["Budget available", "Vendor risk cleared", "Finance route selected"].map((item, index) => (
              <motion.div custom={index + 1} variants={policyItemVariants} key={item} className="flex items-center justify-between py-3">
                <span className="type-meta text-white/55">{item}</span>
                <motion.span
                  variants={{ hidden: { scale: 0.65, rotate: -20 }, visible: { scale: 1, rotate: 0, transition: { delay: 0.76 + index * 0.13, duration: 0.34, ease: EASE } } }}
                  className="flex size-5 items-center justify-center rounded-full bg-[#17342e] text-[#72dece]"
                >
                  <Check className="size-3" />
                </motion.span>
              </motion.div>
            ))}
          </div>

          <motion.div variants={evidenceItemVariants} custom={0} className="mt-6">
            <div className="type-meta flex items-center justify-between"><p className="font-semibold uppercase text-white/40">Evidence attached</p><span className="text-[#72dece]">4 records</span></div>
            <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[7px] border border-white/10 bg-white/10">
              {["Request", "Vendor", "Approval", "Invoice"].map((item, index) => (
                <motion.div custom={index + 1} variants={evidenceItemVariants} key={item} className="type-meta flex items-center gap-2 bg-[#111714] px-3 py-3 text-white/60">
                  <FileCheck2 className="size-3.5 text-[#72dece]" />{item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={evidenceItemVariants} custom={5} className="type-meta mt-6 flex items-center justify-between border-t border-white/10 pt-4"><div><p className="uppercase text-white/35">Trace ID</p><p className="mt-1 font-medium">VL-2048-AX</p></div><span className="font-semibold text-[#72dece]">Audit-ready</span></motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialBand() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section className="overflow-hidden bg-[#0b100e] py-20 text-white sm:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-[0.76fr_1.24fr] md:gap-16">
        <Reveal>
          <p className="type-eyebrow font-semibold uppercase text-[#72dece]">Operational proof</p>
          <h2 className="mt-5 max-w-[480px] text-[length:var(--fs-h2)] font-semibold leading-[1.08]">Proof lives in the record.</h2>
          <p className="type-section-copy mt-5 max-w-[460px] text-white/55">Every rule, reviewer, and financial outcome stays connected, so finance can explain what happened without reconstructing it.</p>

          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="mt-8 hidden divide-y divide-white/10 border-y border-white/10 sm:block"
          >
            {evidence.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div custom={index} variants={traceItemVariants} key={item.title} className="grid grid-cols-[32px_1fr] gap-3 py-4">
                  <motion.span
                    variants={{ hidden: { scale: 0.78 }, visible: { scale: 1, transition: { delay: 0.14 + index * 0.14, duration: 0.35, ease: EASE } } }}
                    className="flex size-8 items-center justify-center rounded-[7px] bg-[#17342e] text-[#72dece]"
                  >
                    <Icon className="size-3.5" />
                  </motion.span>
                  <div><div className="flex items-center gap-2"><span className="type-meta font-semibold text-[#72dece]">0{index + 1}</span><h3 className="type-ui font-semibold">{item.title}</h3></div><p className="type-meta mt-1.5 text-white/45">{item.body}</p></div>
                </motion.div>
              );
            })}
          </motion.div>
        </Reveal>

        <Reveal delay={0.08}>
          <DecisionTraceVisual reduceMotion={reduceMotion} />
        </Reveal>
      </Container>
    </section>
  );
}
