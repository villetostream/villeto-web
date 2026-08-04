"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  FileText,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const STORY_DURATION = 3800;
const EASE = [0.16, 1, 0.3, 1] as const;

const scenes = [
  { label: "Procurement", kicker: "A team makes a request" },
  { label: "Policy engine", kicker: "Controls run automatically" },
  { label: "Employee expenses", kicker: "Every payment stays in policy" },
] as const;

const sceneMotion = {
  initial: { opacity: 0, x: 20, filter: "blur(5px)" },
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -16, filter: "blur(4px)" },
};

function ProcurementScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div {...(reduceMotion ? {} : sceneMotion)} transition={{ duration: 0.55, ease: EASE }} className="absolute inset-0 p-4 sm:p-6">
      <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-3 sm:gap-5">
        <div className="flex min-w-0 flex-col rounded-[12px] border border-black/[0.07] bg-white p-4 shadow-[0_14px_32px_-26px_rgba(10,30,24,0.6)] sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-[#e7f6f2] px-2.5 py-1 text-[9px] font-semibold text-[#087f70] sm:text-[10px]">PR-0248</span>
            <span className="text-[9px] text-[#7b8480] sm:text-[10px]">Just now</span>
          </div>

          <div className="mt-4 flex items-start gap-3 sm:mt-5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-[#111714] text-white sm:size-10">
              <Building2 className="size-4 sm:size-[18px]" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-semibold text-[#111714] sm:text-[15px]">Figma Enterprise</p>
              <p className="mt-0.5 text-[9px] text-[#7b8480] sm:text-[10px]">24 design seats · Annual</p>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2 border-t border-black/[0.06] pt-3 sm:pt-4">
            <div>
              <p className="text-[8px] uppercase text-[#89918e] sm:text-[9px]">Requested by</p>
              <p className="mt-1 truncate text-[10px] font-medium text-[#111714] sm:text-[11px]">Amara · Design</p>
            </div>
            <div>
              <p className="text-[8px] uppercase text-[#89918e] sm:text-[9px]">Request total</p>
              <p className="mt-1 text-[12px] font-semibold text-[#111714] sm:text-[13px]">$8,400</p>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: EASE }}
            className="rounded-[12px] border border-black/[0.07] bg-white p-3 sm:p-4"
          >
            <div className="flex items-center gap-2 text-[#111714]">
              <FileText className="size-3.5 text-[#087f70] sm:size-4" />
              <span className="text-[10px] font-semibold sm:text-[11px]">Request complete</span>
            </div>
            <div className="mt-3 space-y-2">
              {["Business need", "Vendor details", "Budget owner"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.28 + index * 0.12, duration: 0.35 }}
                  className="flex items-center gap-2 text-[9px] text-[#67716c] sm:text-[10px]"
                >
                  <Check className="size-3 text-[#0ea894]" strokeWidth={2.4} />
                  <span className="truncate">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.4, ease: EASE }}
            className="mt-3 flex items-center justify-between rounded-[9px] bg-[#111714] px-3 py-2.5 text-white"
          >
            <span className="text-[9px] font-medium sm:text-[10px]">Send to policy</span>
            <ArrowRight className="size-3.5 text-[#55d5c3]" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function PolicyScene({ reduceMotion }: { reduceMotion: boolean }) {
  const checks = [
    ["Budget available", "$26,000 remaining"],
    ["Vendor verified", "Security review complete"],
    ["Approval route", "Design lead → Finance"],
  ];

  return (
    <motion.div {...(reduceMotion ? {} : sceneMotion)} transition={{ duration: 0.55, ease: EASE }} className="absolute inset-0 p-4 sm:p-6">
      <div className="grid h-full grid-cols-[0.78fr_1.22fr] items-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex size-24 items-center justify-center sm:size-32">
            {!reduceMotion && (
              <>
                <motion.span
                  className="absolute inset-0 rounded-full border border-[#0ea894]/30"
                  animate={{ scale: [0.82, 1.08], opacity: [0.8, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute inset-3 rounded-full border border-dashed border-[#0ea894]/35"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
            <span className="relative flex size-14 items-center justify-center rounded-full bg-[#111714] text-[#55d5c3] shadow-[0_16px_30px_-16px_rgba(10,30,24,0.8)] sm:size-16">
              <ShieldCheck className="size-6 sm:size-7" strokeWidth={1.7} />
            </span>
          </div>
          <p className="mt-1 text-center text-[10px] font-semibold text-[#111714] sm:text-[11px]">Policy engine</p>
          <p className="mt-1 hidden text-center text-[9px] text-[#7b8480] sm:block">Evaluating before spend</p>
        </div>

        <div className="min-w-0 rounded-[12px] border border-black/[0.07] bg-white p-3.5 shadow-[0_14px_32px_-26px_rgba(10,30,24,0.6)] sm:p-5">
          <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] pb-3">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-[#111714] sm:text-[13px]">Figma Enterprise · $8,400</p>
              <p className="mt-0.5 text-[8px] text-[#7b8480] sm:text-[9px]">3 controls evaluated in real time</p>
            </div>
            <Sparkles className="size-4 shrink-0 text-[#0ea894]" />
          </div>

          <div className="mt-1">
            {checks.map(([title, detail], index) => (
              <motion.div
                key={title}
                initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.28, duration: 0.45, ease: EASE }}
                className="flex items-center gap-2.5 border-b border-black/[0.05] py-2.5 last:border-0 sm:py-3"
              >
                <motion.span
                  initial={reduceMotion ? false : { scale: 0.6, backgroundColor: "#edf1ef" }}
                  animate={{ scale: 1, backgroundColor: "#e7f6f2" }}
                  transition={{ delay: 0.45 + index * 0.28, duration: 0.3 }}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full text-[#087f70] sm:size-7"
                >
                  <Check className="size-3 sm:size-3.5" strokeWidth={2.5} />
                </motion.span>
                <div className="min-w-0">
                  <p className="truncate text-[9px] font-semibold text-[#111714] sm:text-[10px]">{title}</p>
                  <p className="truncate text-[8px] text-[#7b8480] sm:text-[9px]">{detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.12, duration: 0.45, ease: EASE }}
            className="mt-2 flex items-center justify-between rounded-[8px] bg-[#e7f6f2] px-3 py-2 text-[#087f70]"
          >
            <span className="text-[9px] font-semibold sm:text-[10px]">Cleared automatically</span>
            <CheckCircle2 className="size-3.5" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ExpensesScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div {...(reduceMotion ? {} : sceneMotion)} transition={{ duration: 0.55, ease: EASE }} className="absolute inset-0 p-4 sm:p-6">
      <div className="grid h-full grid-cols-[1fr_0.95fr] items-center gap-3 sm:gap-5">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, rotateY: -7, y: 12 }}
          animate={{ opacity: 1, rotateY: 0, y: 0 }}
          transition={{ duration: 0.65, ease: EASE }}
          className="relative aspect-[1.58/1] overflow-hidden rounded-[14px] bg-[#111714] p-4 text-white shadow-[0_22px_44px_-24px_rgba(8,24,19,0.9)] sm:p-5"
        >
          <div className="absolute -right-8 -top-12 size-32 rounded-full border-[24px] border-[#18443c] opacity-80 sm:size-40" />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="relative size-5"><Image src="/images/villeto-v.png" alt="" fill sizes="20px" className="object-contain" /></div>
              <span className="text-[10px] font-semibold sm:text-[11px]">Employee card</span>
            </div>
            <CreditCard className="size-4 text-[#55d5c3]" strokeWidth={1.7} />
          </div>
          <div className="relative mt-5 sm:mt-7">
            <p className="text-[8px] uppercase text-white/55 sm:text-[9px]">Available this month</p>
            <p className="mt-1 text-[18px] font-semibold sm:text-[22px]">$2,150.00</p>
          </div>
          <div className="absolute inset-x-4 bottom-3 flex items-end justify-between sm:inset-x-5 sm:bottom-4">
            <div>
              <p className="text-[8px] text-white/50">CARDHOLDER</p>
              <p className="text-[9px] font-medium sm:text-[10px]">Amara Okafor</p>
            </div>
            <span className="text-[9px] tracking-widest text-white/70 sm:text-[10px]">•••• 2048</span>
          </div>
        </motion.div>

        <div className="min-w-0 space-y-2.5">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.45, ease: EASE }}
            className="rounded-[11px] border border-black/[0.07] bg-white p-3 sm:p-4"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-[7px] bg-[#f0f3f2] text-[#111714] sm:size-8"><ReceiptText className="size-3.5" /></span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[9px] font-semibold text-[#111714] sm:text-[10px]">Adobe</p>
                  <p className="text-[9px] font-semibold text-[#111714] sm:text-[10px]">$84.99</p>
                </div>
                <p className="mt-0.5 text-[8px] text-[#7b8480] sm:text-[9px]">Software · Today</p>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 border-t border-black/[0.05] pt-2 text-[8px] font-medium text-[#087f70] sm:text-[9px]">
              <CheckCircle2 className="size-3" /> Receipt matched · In policy
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.45, ease: EASE }}
            className="flex items-center gap-2.5 rounded-[10px] bg-[#e7f6f2] p-3 text-[#087f70]"
          >
            <Users className="size-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-[9px] font-semibold sm:text-[10px]">Controls follow the employee</p>
              <p className="hidden text-[8px] opacity-75 sm:block sm:text-[9px]">No reimbursement chase. No surprise spend.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function GovernanceOrbit() {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeScene, setActiveScene] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const timer = window.setTimeout(() => setActiveScene((current) => (current + 1) % scenes.length), STORY_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeScene, paused, reduceMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[650px] py-5 sm:py-8 md:py-5">
      <div className="pointer-events-none absolute inset-x-[10%] bottom-0 h-24 rounded-full bg-[var(--accent)] opacity-[0.11] blur-3xl" />

      <motion.div
        className="relative overflow-hidden rounded-[18px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_30px_80px_-36px_rgba(5,18,15,0.55)]"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex h-11 items-center justify-between border-b border-[var(--border-hairline)] px-4 sm:px-5">
          <div className="flex items-center gap-2.5">
            <div className="relative size-5"><Image src="/images/villeto-v.png" alt="" fill sizes="20px" className="object-contain" /></div>
            <span className="text-[11px] font-semibold text-[var(--text-primary)] sm:text-[12px]">How spend moves through Villeto</span>
          </div>
          <span className="hidden items-center gap-1.5 text-[9px] font-medium text-[var(--text-secondary)] sm:flex">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" /> Live control layer
          </span>
        </div>

        <div className="grid grid-cols-3 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
          {scenes.map((scene, index) => {
            const active = activeScene === index;
            return (
              <button
                key={scene.label}
                type="button"
                onClick={() => setActiveScene(index)}
                aria-pressed={active}
                className="relative min-w-0 border-r border-[var(--border-hairline)] px-2 py-2.5 text-left last:border-r-0 sm:px-4 sm:py-3"
              >
                <span className={`block text-[8px] font-semibold ${active ? "text-[var(--accent-text)]" : "text-[var(--text-secondary)]"}`}>0{index + 1}</span>
                <span className={`mt-0.5 block truncate text-[9px] font-semibold sm:text-[10px] ${active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>{scene.label}</span>
                {active && (
                  <motion.span
                    key={`${activeScene}-${paused}`}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[var(--accent)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused || reduceMotion ? 0.25 : 1 }}
                    transition={{ duration: paused || reduceMotion ? 0.2 : STORY_DURATION / 1000, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="relative aspect-[1.32/1] overflow-hidden bg-[#f2f5f4] sm:aspect-[1.45/1]">
          <AnimatePresence mode="wait" initial={false}>
            {activeScene === 0 && <ProcurementScene key="procurement" reduceMotion={reduceMotion} />}
            {activeScene === 1 && <PolicyScene key="policy" reduceMotion={reduceMotion} />}
            {activeScene === 2 && <ExpensesScene key="expenses" reduceMotion={reduceMotion} />}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t border-[var(--border-hairline)] px-4 py-2.5 sm:px-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={activeScene}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="truncate text-[9px] font-medium text-[var(--text-secondary)] sm:text-[10px]"
            >
              {scenes[activeScene]?.kicker}
            </motion.p>
          </AnimatePresence>
          <div className="ml-3 flex gap-1.5">
            {scenes.map((scene, index) => (
              <button
                key={scene.label}
                type="button"
                aria-label={`Show ${scene.label}`}
                onClick={() => setActiveScene(index)}
                className={`h-1.5 rounded-full transition-all ${activeScene === index ? "w-5 bg-[var(--accent)]" : "w-1.5 bg-[var(--border-hairline)]"}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
