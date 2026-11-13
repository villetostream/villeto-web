"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardList,
  Receipt,
  FileText,
  BookOpen,
  ShieldCheck,
  PackageCheck,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { hero, heroScenes, procurementScene, expenseScene, billPayScene } from "@/lib/content/hero";
import { useEmailOnboarding } from "@/lib/hooks/useEmailOnboarding";

const SCENE_DURATION = 4200;
const EASE = [0.16, 1, 0.3, 1] as const;

// ── Scene body components ────────────────────────────────────────────────────

function ProcurementBody() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
        {procurementScene.request.category}
      </p>
      <p className="text-[15px] font-semibold text-[var(--text-primary)]">{procurementScene.request.title}</p>
      <div className="mt-1 flex flex-col gap-1.5">
        {procurementScene.request.items.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] px-3 py-2">
            <span className="text-[12px] text-[var(--text-secondary)]">
              {item.name} <span className="opacity-50">{item.qty}</span>
            </span>
            <span className="text-[12px] font-semibold text-[var(--text-primary)]">{item.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-between border-t border-[var(--border-hairline)] pt-2">
        <span className="text-[12px] font-medium text-[var(--text-secondary)]">Total</span>
        <span className="text-[15px] font-bold text-[var(--text-primary)]">{procurementScene.request.total}</span>
      </div>
    </div>
  );
}

function ExpensesBody() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
        Expense Report
      </p>
      <p className="text-[15px] font-semibold text-[var(--text-primary)]">{expenseScene.report.title}</p>
      <div className="mt-1 flex flex-col gap-1.5">
        {expenseScene.report.items.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[var(--text-secondary)]">{item.name}</span>
              {item.receipt && (
                <span className="flex items-center gap-0.5 text-[9px] font-semibold text-emerald-600">
                  <Check className="size-2.5" strokeWidth={3} /> Receipt
                </span>
              )}
            </div>
            <span className="text-[12px] font-semibold text-[var(--text-primary)]">{item.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-between border-t border-[var(--border-hairline)] pt-2">
        <span className="text-[12px] font-medium text-[var(--text-secondary)]">Total</span>
        <span className="text-[15px] font-bold text-[var(--text-primary)]">{expenseScene.report.total}</span>
      </div>
    </div>
  );
}

function BillPayBody() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[var(--text-primary)]">
          {billPayScene.invoice.number} · {billPayScene.invoice.vendor}
        </span>
        <span className="text-[14px] font-bold text-[var(--text-primary)]">{billPayScene.invoice.amount}</span>
      </div>
      <div className="mt-1 flex flex-col gap-1.5">
        {billPayScene.match.checks.map((c) => (
          <div key={c.label} className="flex items-center gap-2.5 rounded-lg bg-[var(--bg-surface)] px-3 py-2">
            <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <Check className="size-3 text-emerald-600" strokeWidth={3} />
            </div>
            <div className="flex-1">
              <span className="text-[12px] font-medium text-[var(--text-primary)]">{c.label}</span>
              <span className="ml-2 text-[10px] text-[var(--text-secondary)]">{c.ref}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-600">Matched</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Scene icon & label mapping ───────────────────────────────────────────────

const sceneIcon: Record<string, React.ElementType> = {
  procurement: ClipboardList,
  expenses: Receipt,
  billpay: FileText,
};

const sceneLabel: Record<string, string> = {
  procurement: "Purchase Request",
  expenses: "Expense Report",
  billpay: "Invoice Review",
};

// ── Status bar per scene ─────────────────────────────────────────────────────

function StatusBar({ sceneId }: { sceneId: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneId}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2.5"
      >
        {sceneId === "procurement" && (
          <>
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)]">
              <ArrowRight className="size-2.5 text-[var(--accent)]" strokeWidth={3} />
            </div>
            <span className="text-[12px] font-medium text-[var(--accent-text)]">
              PO issued · Awaiting vendor acknowledgment
            </span>
          </>
        )}
        {sceneId === "expenses" && (
          <>
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <Check className="size-2.5 text-emerald-600" strokeWidth={3} />
            </div>
            <span className="text-[12px] font-semibold text-emerald-700">
              {expenseScene.policyCheck.result}
            </span>
          </>
        )}
        {sceneId === "billpay" && (
          <>
            <div className="flex size-4 shrink-0 items-center justify-center rounded-full bg-violet-100">
              <Check className="size-2.5 text-violet-600" strokeWidth={3} />
            </div>
            <span className="text-[12px] font-semibold text-violet-700">
              Journal entry posted · Immutable
            </span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ── Floating badges per scene ────────────────────────────────────────────────

const topBadgeContent: Record<string, React.ReactNode> = {
  procurement: (
    <div className="flex items-center gap-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-2 shadow-lg">
      <ArrowRight className="size-3.5 text-[var(--accent)]" strokeWidth={2.5} />
      <span className="text-[11px] font-semibold text-[var(--text-primary)]">{procurementScene.order.poNumber} issued</span>
    </div>
  ),
  expenses: (
    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 shadow-lg">
      <ShieldCheck className="size-3.5 text-emerald-600" strokeWidth={2} />
      <span className="text-[11px] font-semibold text-emerald-700">All rules passed</span>
    </div>
  ),
  billpay: (
    <div className="flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2 shadow-lg">
      <BookOpen className="size-3.5 text-violet-600" strokeWidth={2} />
      <span className="text-[11px] font-semibold text-violet-700">Immutable · Posted</span>
    </div>
  ),
};

const bottomBadgeContent: Record<string, React.ReactNode> = {
  procurement: (
    <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2.5 shadow-lg">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[11px] font-bold text-[var(--accent-contrast)]">
        {procurementScene.request.requester.initials}
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[var(--text-primary)]">
          {procurementScene.request.requester.name} · {procurementScene.request.requester.dept}
        </p>
        <p className="text-[10px] text-[var(--text-secondary)]">{procurementScene.request.requester.status}</p>
      </div>
    </div>
  ),
  expenses: (
    <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2.5 shadow-lg">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-[11px] font-bold text-white">
        {expenseScene.report.employee.initials}
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[var(--text-primary)]">
          {expenseScene.report.employee.name} · {expenseScene.report.employee.dept}
        </p>
        <p className="text-[10px] text-[var(--text-secondary)]">Filed expense report</p>
      </div>
    </div>
  ),
  billpay: (
    <div className="flex items-center gap-2.5 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-2.5 shadow-lg">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rose-500 text-[11px] font-bold text-white">
        FA
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[var(--text-primary)]">Fatima Abubakar · AP Clerk</p>
        <p className="text-[10px] text-[var(--text-secondary)]">Reviewing invoice against PO</p>
      </div>
    </div>
  ),
};

// ── Main widget ──────────────────────────────────────────────────────────────

function SpendWorkflowWidget() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const scene = heroScenes[sceneIdx]!;

  useEffect(() => {
    const id = setInterval(() => {
      setSceneIdx((prev) => (prev + 1) % heroScenes.length);
    }, SCENE_DURATION);
    return () => clearInterval(id);
  }, []);

  const Icon = sceneIcon[scene.id]!;

  return (
    <div className="relative select-none hero-widget">
      {/* ── Scene indicator pills ── */}
      <div className="mb-4 flex items-center gap-1.5">
        {heroScenes.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setSceneIdx(i)}
            aria-label={s.label}
            className="group relative flex-1"
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                i === sceneIdx
                  ? "bg-[var(--accent)]"
                  : i < sceneIdx
                  ? "bg-[var(--accent)]/40"
                  : "bg-[var(--border-hairline)]"
              }`}
            />
            <span
              className={`absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold transition-all duration-300 ${
                i === sceneIdx ? "text-[var(--accent-text)] opacity-100" : "opacity-0"
              }`}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* ── Card shell ── */}
      <div
        className="mt-6 overflow-hidden rounded-[20px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
        style={{ boxShadow: 'var(--hero-card-shadow)' }}
      >
        {/* Card header */}
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id + "-icon"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="flex size-6 items-center justify-center"
              >
                <Icon className="size-5 text-[var(--accent)]" strokeWidth={1.75} />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.span
                key={scene.id + "-title"}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.22 }}
                className="text-[13px] font-semibold text-[var(--text-primary)]"
              >
                {sceneLabel[scene.id]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-[var(--bg-surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
            <Building2 className="size-3" strokeWidth={2} />
            Villeto NG
          </div>
        </div>

        {/* Card body — scene-specific content */}
        <div className="px-5 py-4 h-[220px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id + "-body"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {scene.id === "procurement" && <ProcurementBody />}
              {scene.id === "expenses" && <ExpensesBody />}
              {scene.id === "billpay" && <BillPayBody />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Status bar */}
        <div className="border-t border-[var(--border-hairline)] px-5 py-3">
          <StatusBar sceneId={scene.id} />
        </div>
      </div>

      {/* ── Floating bottom badge ── */}
      <div className="absolute -bottom-5 -left-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id + "-bottom"}
            initial={{ opacity: 0, x: -10, y: 6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -10, y: 6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {bottomBadgeContent[scene.id]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Floating top badge ── */}
      <div className="absolute -top-4 -right-4">
        <AnimatePresence mode="wait">
          {topBadgeContent[scene.id] && (
            <motion.div
              key={scene.id + "-top"}
              initial={{ opacity: 0, x: 10, y: -6 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 10, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {topBadgeContent[scene.id]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export function Hero() {
  const { handleSubmit, loading, error } = useEmailOnboarding();
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-canvas)] to-[var(--accent-soft)]/30">
      {/* Teal radial aurora — barely visible on white, creates depth in dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(45,212,191,0.09), transparent)',
        }}
      />
      {/* Background texture */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        animate={{ x: ["0%", "-3%", "0%"], y: ["0%", "3%", "0%"] }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
      >
        <Image src="/images/hero-background-texture.png" alt="" fill sizes="100vw" priority className="object-cover scale-[1.1]" />
      </motion.div>

      <Container className="relative grid grid-cols-1 items-center gap-14 pt-10 pb-20 sm:pt-14 sm:pb-24 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:pt-16 md:pb-28">
        {/* ── Left: copy ── */}
        <div className="flex flex-col">
          <div className="self-start animate-hero-fade">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span className="text-[13px] font-medium text-[var(--accent-text)]">{hero.eyebrow}</span>
              <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            </div>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,3.8vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[var(--text-primary)] animate-hero-fade animation-delay-100">
            {hero.headline}
          </h1>

          <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-[var(--text-secondary)] animate-hero-fade animation-delay-200">
            {hero.subhead}
          </p>

          {/* Email capture */}
          <form
            id="hero-signup-form"
            className="mt-8 flex w-full max-w-[460px] flex-col items-stretch gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1.5 shadow-[0_2px_6px_rgba(10,15,13,0.04)] animate-hero-fade animation-delay-300 sm:flex-row sm:items-center sm:pl-4"
            onSubmit={onSubmit}
          >
            <input
              id="hero-email-input"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={hero.emailPlaceholder}
              disabled={loading}
              className="min-h-[42px] w-full min-w-0 flex-1 border-none bg-transparent px-2.5 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none disabled:opacity-50 sm:px-0"
            />
            <button
              type="submit"
              id="hero-signup-btn"
              disabled={loading}
              className="flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 text-[14px] font-semibold text-[var(--accent-contrast)] transition-transform hover:-translate-y-[1px] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : hero.primaryCta.label}
            </button>
          </form>
          {error && <p className="mt-2 text-[13px] text-red-500">{error}</p>}

          <div className="mt-3 animate-hero-fade animation-delay-300">
            <p className="text-[12px] text-[var(--text-secondary)]">{hero.trialNote}</p>
          </div>

          <p className="mt-4 text-[13px] text-[var(--text-secondary)] animate-hero-fade animation-delay-300">
            {hero.supportingLine}
          </p>
        </div>

        {/* ── Right: workflow widget ── */}
        <motion.div
          className="w-full max-w-[440px] mx-auto md:max-w-none"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <SpendWorkflowWidget />
        </motion.div>
      </Container>
    </section>
  );
}
