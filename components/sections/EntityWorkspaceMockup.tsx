"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Plus,
  Layers,
  ShieldCheck,
  TrendingUp,
  Receipt,
  CreditCard,
} from "lucide-react";

type EntityMode = "consolidated" | "uk" | "ng" | "single_preview";

export function EntityWorkspaceMockup() {
  const [activeMode, setActiveMode] = useState<EntityMode>("consolidated");

  return (
    <div className="relative mx-auto w-full max-w-[540px] overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_8px_32px_-8px_rgba(10,15,13,0.08)]">
      {/* ── Top Bar: Workspace Switcher Tabs ── */}
      <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3">
        <div className="flex items-center justify-between pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
              <Building2 className="size-3.5" />
            </span>
            <span className="text-[12.5px] font-semibold text-[var(--text-primary)]">
              Entity Workspace
            </span>
          </div>
          <span className="font-mono text-[10.5px] text-[var(--text-secondary)]">
            Click to preview scale
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1">
          <button
            type="button"
            onClick={() => setActiveMode("consolidated")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-all ${
              activeMode === "consolidated"
                ? "bg-[var(--accent)] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Layers className="size-3.5" />
            Consolidated (All)
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("uk")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-all ${
              activeMode === "uk"
                ? "bg-[var(--accent)] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>🇬🇧</span> UK Ltd
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("ng")}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-all ${
              activeMode === "ng"
                ? "bg-[var(--accent)] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>🇳🇬</span> Nigeria Ltd
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("single_preview")}
            className={`ml-auto flex items-center gap-1 rounded-lg border border-dashed border-[var(--border-hairline)] px-2 py-1 text-[11px] font-medium transition-all ${
              activeMode === "single_preview"
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent-text)]"
                : "text-[var(--text-secondary)] hover:border-zinc-400"
            }`}
          >
            <Plus className="size-3" /> Single Entity View
          </button>
        </div>
      </div>

      {/* ── Dynamic Content Display ── */}
      <div className="p-5 sm:p-6">
        <AnimatePresence mode="wait">
          {activeMode === "consolidated" && (
            <motion.div
              key="consolidated"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Group Overview Banner */}
              <div className="flex items-center justify-between rounded-xl bg-[var(--accent-soft)]/20 border border-[var(--accent)]/20 p-3.5">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                    Consolidated Group View
                  </span>
                  <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">
                    Global Finance Overview
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[14px] font-bold text-[var(--text-primary)]">
                    3 Legal Entities
                  </span>
                  <p className="text-[11px] text-[var(--text-secondary)]">7 pending approvals total</p>
                </div>
              </div>

              {/* Entity Rows */}
              <div className="space-y-2.5">
                {/* UK */}
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
                  <div className="flex items-center gap-3">
                    <span className="text-[22px]">🇬🇧</span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">Villeto UK Ltd</p>
                      <p className="text-[11.5px] text-[var(--text-secondary)]">Barclays · AP Subledger Active</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--text-primary)]">
                      GBP (£)
                    </span>
                    <p className="mt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                      2 invoices pending
                    </p>
                  </div>
                </div>

                {/* Nigeria */}
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
                  <div className="flex items-center gap-3">
                    <span className="text-[22px]">🇳🇬</span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">Villeto Nigeria Ltd</p>
                      <p className="text-[11.5px] text-[var(--text-secondary)]">Access Bank · Withholding Tax Rules</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--text-primary)]">
                      NGN (₦)
                    </span>
                    <p className="mt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                      4 open obligations
                    </p>
                  </div>
                </div>

                {/* Ghana */}
                <div className="flex items-center justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
                  <div className="flex items-center gap-3">
                    <span className="text-[22px]">🇬🇭</span>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[var(--text-primary)]">Villeto Ghana Ltd</p>
                      <p className="text-[11.5px] text-[var(--text-secondary)]">Stanbic Bank · VAT Reconciled</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--text-primary)]">
                      GHS (GH₵)
                    </span>
                    <p className="mt-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      1 approval awaiting
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Proof Strip */}
              <div className="flex items-center justify-between border-t border-[var(--border-hairline)] pt-3 text-[11.5px]">
                <span className="flex items-center gap-1.5 font-medium text-[var(--text-secondary)]">
                  <Globe2 className="size-3.5 text-[var(--accent)]" /> Separate books per entity
                </span>
                <span className="font-semibold text-[var(--accent-text)]">
                  Unified Approval Queue →
                </span>
              </div>
            </motion.div>
          )}

          {activeMode === "uk" && (
            <motion.div
              key="uk"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Entity Header */}
              <div className="flex items-center justify-between rounded-xl border border-sky-500/20 bg-sky-500/10 p-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-[26px]">🇬🇧</span>
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--text-primary)]">Villeto UK Ltd</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Active Entity Scope · Base Currency: GBP</p>
                  </div>
                </div>
                <span className="rounded-full bg-sky-500 text-white px-2.5 py-0.5 text-[10.5px] font-semibold">
                  Active Workspace
                </span>
              </div>

              {/* Entity Specific Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
                  <span className="text-[11px] text-[var(--text-secondary)]">Entity Open Spend</span>
                  <p className="mt-1 font-mono text-[16px] font-bold text-[var(--text-primary)]">£42,850.00</p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Within monthly budget</span>
                </div>
                <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
                  <span className="text-[11px] text-[var(--text-secondary)]">Local GL Ledger</span>
                  <p className="mt-1 font-mono text-[16px] font-bold text-[var(--text-primary)]">UK Chart of Accts</p>
                  <span className="text-[10px] text-[var(--text-secondary)]">Barclays sync active</span>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3 text-[12px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-2 font-medium text-[var(--text-primary)] mb-1">
                  <ShieldCheck className="size-4 text-sky-500" />
                  Independent Fiscal Calendar & AP Subledger
                </div>
                Journal entries are strictly posted to UK Ltd books with zero cross-entity contamination.
              </div>
            </motion.div>
          )}

          {activeMode === "ng" && (
            <motion.div
              key="ng"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between rounded-xl border border-teal-500/20 bg-teal-500/10 p-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-[26px]">🇳🇬</span>
                  <div>
                    <p className="text-[14px] font-semibold text-[var(--text-primary)]">Villeto Nigeria Ltd</p>
                    <p className="text-[11px] text-[var(--text-secondary)]">Active Entity Scope · Base Currency: NGN</p>
                  </div>
                </div>
                <span className="rounded-full bg-teal-600 text-white px-2.5 py-0.5 text-[10.5px] font-semibold">
                  Active Workspace
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
                  <span className="text-[11px] text-[var(--text-secondary)]">Local Currency Spend</span>
                  <p className="mt-1 font-mono text-[16px] font-bold text-[var(--text-primary)]">₦28,450,000</p>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400">4 obligations pending</span>
                </div>
                <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
                  <span className="text-[11px] text-[var(--text-secondary)]">Tax & WHT Compliance</span>
                  <p className="mt-1 font-mono text-[16px] font-bold text-[var(--text-primary)]">FIRS Ready</p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400">Auto-calculated</span>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3 text-[12px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-2 font-medium text-[var(--text-primary)] mb-1">
                  <ShieldCheck className="size-4 text-teal-600" />
                  Local Banking & Currency Verification
                </div>
                Vendors in Nigeria are paid in Naira from Access Bank, fully insulated from UK or US books.
              </div>
            </motion.div>
          )}

          {activeMode === "single_preview" && (
            <motion.div
              key="single_preview"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Single Entity Mode Showcase */}
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-[13px] mb-1">
                  <CheckCircle2 className="size-4" />
                  Only Have One Entity Today?
                </div>
                <p className="text-[12.5px] leading-relaxed text-[var(--text-secondary)]">
                  You don't need multiple subsidiaries to benefit from Villeto. Run your entire single company with streamlined purchase orders, expense cards, and AP automation.
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-[var(--text-primary)]">Single Entity Foundation</span>
                  <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10.5px] font-semibold text-[var(--accent-text)]">Zero Overhead</span>
                </div>
                <ul className="space-y-1.5 text-[12px] text-[var(--text-secondary)] pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-[var(--accent)]" /> No complex subsidiary setup required
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-[var(--accent)]" /> Ready to scale: add entity #2 in 60 seconds with zero migration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-[var(--accent)]" /> Same clean, enterprise-grade audit trail from day one
                  </li>
                </ul>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11.5px] font-medium text-[var(--text-secondary)]">
                  Start simple today · Grow globally tomorrow
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer Bar ── */}
      <div className="flex items-center justify-between border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-5 py-3 text-[11.5px] text-[var(--text-secondary)]">
        <span>One sign-in across all entities</span>
        <button
          type="button"
          onClick={() => setActiveMode(activeMode === "consolidated" ? "single_preview" : "consolidated")}
          className="font-semibold text-[var(--accent-text)] hover:underline"
        >
          {activeMode === "consolidated" ? "See single-entity mode →" : "See multi-entity group →"}
        </button>
      </div>
    </div>
  );
}
