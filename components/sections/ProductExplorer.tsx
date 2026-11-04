"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  Clock,
  FileCheck2,
  FileText,
  Lock,
  PackageCheck,
  ReceiptText,
  Scale,
  Scan,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Layers,
  ChevronRight,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { productExplorer, productTabs, type ProductTab } from "@/lib/content/products";

const lensIcons: Record<string, React.ElementType> = {
  expenses: ReceiptText,
  procurement: PackageCheck,
  policies: ShieldCheck,
  billpay: FileCheck2,
  accounting: BookOpen,
};

export function ProductExplorer() {
  const [activeTabId, setActiveTabId] = useState<ProductTab["id"]>("expenses");
  const reduceMotion = Boolean(useReducedMotion());

  const activeTab = productTabs.find((t) => t.id === activeTabId) ?? productTabs[0]!;
  const currentIndex = productTabs.findIndex((t) => t.id === activeTabId);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % productTabs.length;
    setActiveTabId(productTabs[nextIndex]!.id);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + productTabs.length) % productTabs.length;
    setActiveTabId(productTabs[prevIndex]!.id);
  };

  // Dynamic context header per lens category
  const contextData = {
    expenses: {
      type: "Employee Expense Record",
      id: "EXP-2026-0412",
      title: "Radisson Blu Anchorage · Lagos Leadership Offsite Lodging",
      tag: "Travel & Lodging · Out-of-Pocket Reimbursement",
      amountLabel: "Expense Total",
      amount: "₦185,000",
    },
    procurement: {
      type: "B2B Procurement Record",
      id: "PO-2026-0047",
      title: "Aster Cloud Systems Ltd · Enterprise Analytics Workspace (50 Seats)",
      tag: "Cloud Infrastructure · Formal Purchase Order",
      amountLabel: "PO Commitment",
      amount: "₦6,800,000",
    },
    policies: {
      type: "Dual Governance Engine",
      id: "GOV-MATRIX-V1",
      title: "Unified Policy Layer: Expense Policies & Spend Programs",
      tag: "Coverage Modes & Structural Separation of Duties",
      amountLabel: "Governance Mode",
      amount: "Pre-Commitment",
    },
    billpay: {
      type: "AP Invoice & 3-Way Match",
      id: "INV-2026-8812",
      title: "Aster Cloud Systems Ltd · Matched to PO-2026-0047",
      tag: "Accounts Payable · 3-Way Match Verification",
      amountLabel: "Payable Amount",
      amount: "₦6,800,000",
    },
    accounting: {
      type: "Subledger Journal Voucher",
      id: "JE-2026-1847",
      title: "Villeto Nigeria Ltd AP Subledger · Irreversible Period Lock",
      tag: "Double-Entry Posting · Audit Hash Sealed",
      amountLabel: "Voucher Balance",
      amount: "₦6,800,000",
    },
  }[activeTabId];

  return (
    <section id="products" className="relative overflow-hidden bg-[var(--bg-canvas)] py-20 text-[var(--text-primary)] sm:py-28">
      {/* Background ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.04] blur-[120px]"
      />

      <Container>
        {/* ── Centered Section Heading ── */}
        <Reveal className="mx-auto max-w-[760px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3.5 py-1 shadow-xs">
            <span className="size-1.5 rounded-full bg-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              {productExplorer.eyebrow}
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold leading-[1.12] tracking-tight text-[var(--text-primary)]">
            {productExplorer.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {productExplorer.subhead}
          </p>
        </Reveal>

        {/* ── 5 Interactive Lens Selectors (Horizontal Segmented Rail) ── */}
        <div className="mt-12 flex justify-center">
          <div className="flex w-full max-w-[1080px] gap-2 overflow-x-auto rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-2 shadow-xs scrollbar-none sm:grid sm:grid-cols-5">
            {productTabs.map((tab, index) => {
              const Icon = lensIcons[tab.id] ?? ReceiptText;
              const isActive = tab.id === activeTabId;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  type="button"
                  className={`relative flex min-w-[170px] flex-col items-start gap-1 rounded-xl px-3.5 py-3 text-left transition-all sm:min-w-0 cursor-pointer ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--accent-soft)]/20"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-product-lens"
                      className="absolute inset-0 rounded-xl bg-[var(--bg-canvas)] border border-[var(--border-hairline)] shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <div className="relative z-10 flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex size-6 items-center justify-center rounded-md ${
                          isActive
                            ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                            : "bg-[var(--accent-soft)] text-[var(--accent-text)]"
                        }`}
                      >
                        <Icon className="size-3.5" />
                      </span>
                      <span className="text-[11px] font-semibold tracking-wider text-[var(--accent-text)]">
                        0{index + 1}
                      </span>
                    </div>
                    <span className="hidden text-[10px] uppercase font-semibold text-[var(--text-secondary)] xl:inline">
                      {tab.badge}
                    </span>
                  </div>
                  <span className="relative z-10 mt-1 text-[13.5px] font-semibold leading-tight">
                    {tab.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── The Living Transaction Canvas (The Command Stage) ── */}
        <Reveal delay={0.1} className="mt-8">
          <div className="mx-auto max-w-[1080px] overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-lg transition-colors">
            {/* Window Chrome Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/70 px-4 py-3 sm:px-6">
              {/* Traffic Light Dots & Window ID */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-rose-500/80" />
                  <span className="size-3 rounded-full bg-amber-500/80" />
                  <span className="size-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="hidden h-3.5 w-px bg-[var(--border-hairline)] sm:block" />
                <span className="hidden text-[12px] font-medium text-[var(--text-secondary)] sm:inline">
                  Transaction & Policy Inspector
                </span>
              </div>

              {/* Dynamic Route Pill */}
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-[11.5px] text-[var(--text-secondary)]">
                <Lock className="size-3 text-[var(--accent-text)]" />
                <span>{activeTab.route}</span>
              </div>

              {/* Entity Context Pill */}
              <div className="flex items-center gap-2 text-[11.5px]">
                <span className="flex size-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-semibold text-[var(--text-primary)]">Villeto Nigeria Ltd</span>
                <span className="rounded-md bg-[var(--accent-soft)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--accent-text)]">
                  NGN ₦
                </span>
              </div>
            </div>

            {/* Persistent Dynamic Transaction Banner */}
            <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/40 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                      {contextData.type}
                    </span>
                    <span className="text-[12px] text-[var(--text-secondary)]">{contextData.id}</span>
                  </div>
                  <h3 className="mt-1 text-[17px] font-semibold text-[var(--text-primary)] sm:text-[19px]">
                    {contextData.title}
                  </h3>
                  <p className="text-[12px] text-[var(--text-secondary)] mt-0.5">{contextData.tag}</p>
                </div>
                <div className="flex items-baseline gap-2 sm:text-right">
                  <span className="text-[12px] uppercase font-medium text-[var(--text-secondary)]">{contextData.amountLabel}</span>
                  <span className="text-[22px] font-bold tracking-tight text-[var(--text-primary)] sm:text-[24px]">
                    {contextData.amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Stage Body — Fluid In-Code Perspective */}
            <div className="p-5 sm:p-7 min-h-[380px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabId}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {/* ── Lens 1: Expense Management ── */}
                  {activeTabId === "expenses" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      {/* Left: Mobile OCR Receipt Scan Visual */}
                      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                          <div className="flex items-center gap-2">
                            <Scan className="size-4 text-[var(--accent-text)]" />
                            <span className="type-ui font-semibold">OCR Mobile Capture & Parsing</span>
                          </div>
                          <span className="type-meta rounded-md bg-[var(--accent-soft)] px-2 py-0.5 font-semibold text-[var(--accent-text)]">
                            Auto-Parsed (99.4%)
                          </span>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <span className="type-meta text-[var(--text-secondary)]">Merchant Detected</span>
                            <span className="type-ui font-semibold text-[var(--text-primary)]">Radisson Blu Anchorage Hotel</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <span className="type-meta text-[var(--text-secondary)]">Date & Category</span>
                            <span className="type-ui font-semibold text-[var(--text-primary)]">Oct 14, 2026 · Travel & Lodging</span>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <span className="type-meta text-[var(--text-secondary)]">Total Extracted</span>
                            <span className="type-ui font-bold text-[var(--accent-text)]">₦185,000.00 (NGN)</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[11px] text-[var(--text-secondary)]">
                          <CheckCircle2 className="size-3.5 text-[var(--accent)]" />
                          <span>Original receipt image stamped with SHA-256 hash & archived</span>
                        </div>
                      </div>

                      {/* Right: Policy Evaluation & Reimbursement Status */}
                      <div className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                              Expense Policy Enforcement
                            </span>
                            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500">
                              Cleared at Submission
                            </span>
                          </div>
                          <h4 className="mt-2 text-[16px] font-semibold">Leadership Offsite Lodging Policy</h4>
                          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                            Employee Kunle Adeyemi submitted out-of-pocket lodging expense under Sales Leadership.
                          </p>

                          <div className="mt-4 divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
                            <div className="flex items-center justify-between py-2.5 text-[12px]">
                              <span className="text-[var(--text-secondary)]">Daily Lodging Cap</span>
                              <span className="font-medium text-emerald-500 flex items-center gap-1">
                                <Check className="size-3" /> Within Cap (Max ₦200,000/night)
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2.5 text-[12px]">
                              <span className="text-[var(--text-secondary)]">Receipt Threshold</span>
                              <span className="font-medium text-emerald-500 flex items-center gap-1">
                                <Check className="size-3" /> Mandatory for &gt; ₦5,000 (Attached)
                              </span>
                            </div>
                            <div className="flex items-center justify-between py-2.5 text-[12px]">
                              <span className="text-[var(--text-secondary)]">Approval Routing</span>
                              <span className="font-medium text-[var(--text-primary)]">Routed to Line Manager (Tunde B.)</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 rounded-lg bg-[var(--accent-soft)]/30 p-3 text-[12px] text-[var(--accent-text)] flex items-center justify-between">
                          <span>Status: In-Policy · Queued for Payroll Reimbursement</span>
                          <CheckCircle2 className="size-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Lens 2: Procurement & Spend Programs ── */}
                  {activeTabId === "procurement" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      {/* Left: 3-Stage Spend Program Lifecycle */}
                      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                          <div className="flex items-center gap-2">
                            <PackageCheck className="size-4 text-[var(--accent-text)]" />
                            <span className="type-ui font-semibold">3-Stage Spend Program Lifecycle</span>
                          </div>
                          <span className="type-meta rounded-md bg-[var(--accent-soft)] px-2 py-0.5 font-semibold text-[var(--accent-text)]">
                            Program: Cloud Ops Q4
                          </span>
                        </div>
                        <div className="mt-4 space-y-2.5">
                          {[
                            {
                              stage: "pr_submission",
                              title: "1. PR Submission Check",
                              desc: "Budget headroom verified (₦17.5M available). 3 quotation rule satisfied.",
                              status: "Passed",
                            },
                            {
                              stage: "pr_to_po",
                              title: "2. PR-to-PO Conversion",
                              desc: "Approved vendor list checked. Grouped line items split to Aster Cloud Systems.",
                              status: "Converted",
                            },
                            {
                              stage: "po_submission",
                              title: "3. PO Dispatch Signoff",
                              desc: "Executive signoff triggered. Separation of Duties blocks self-approval.",
                              status: "Dispatched",
                            },
                          ].map((item) => (
                            <div key={item.stage} className="rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                              <div className="flex items-center justify-between">
                                <span className="type-ui font-semibold text-[13px]">{item.title}</span>
                                <span className="type-meta rounded-md bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-500 text-[10px]">
                                  {item.status}
                                </span>
                              </div>
                              <p className="mt-1 text-[11.5px] text-[var(--text-secondary)]">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Purchase Order Splitting & PO Generation */}
                      <div className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                              Purchase Order #PO-2026-0047
                            </span>
                            <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent-text)]">
                              Vendor Verified
                            </span>
                          </div>
                          <h4 className="mt-2 text-[16px] font-semibold">Vendor: Aster Cloud Systems Ltd.</h4>
                          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                            Converted from PR-2026-0047 into official binding corporate purchase order.
                          </p>

                          <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] p-2.5 text-[12px] border border-[var(--border-hairline)]">
                              <span>50× Analytics Core Seats</span>
                              <span className="font-semibold">₦4,800,000</span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] p-2.5 text-[12px] border border-[var(--border-hairline)]">
                              <span>Enterprise SOC2 Support Tier</span>
                              <span className="font-semibold">₦2,000,000</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[12px] text-[var(--text-secondary)] pt-2 border-t border-[var(--border-hairline)]">
                          <span>Dispatched to Vendor Portal</span>
                          <span className="font-semibold text-emerald-500 flex items-center gap-1">
                            <Check className="size-3.5" /> Acknowledged by Vendor
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Lens 3: Spend Policies & Governance ── */}
                  {activeTabId === "policies" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      {/* Left: Dual Governance Architecture */}
                      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="size-4 text-[var(--accent-text)]" />
                            <span className="type-ui font-semibold">Dual Governance Architecture</span>
                          </div>
                          <span className="type-meta rounded-md bg-[var(--accent-soft)] px-2 py-0.5 font-semibold text-[var(--accent-text)]">
                            governance/page.tsx
                          </span>
                        </div>
                        <div className="mt-4 space-y-3">
                          <div className="rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <div className="flex items-center justify-between">
                              <span className="type-ui font-semibold text-[13px]">Engine A: Expense Policies</span>
                              <span className="type-meta rounded-md bg-[var(--accent-soft)] px-2 py-0.5 font-semibold text-[var(--accent-text)] text-[10px]">
                                /policies/expense-policy
                              </span>
                            </div>
                            <p className="mt-1 text-[11.5px] text-[var(--text-secondary)]">
                              Controls employee cards & out-of-pocket receipts by category, employee grade, daily caps, and mandatory receipt thresholds.
                            </p>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <div className="flex items-center justify-between">
                              <span className="type-ui font-semibold text-[13px]">Engine B: Spend Programs</span>
                              <span className="type-meta rounded-md bg-[var(--accent-soft)] px-2 py-0.5 font-semibold text-[var(--accent-text)] text-[10px]">
                                /policies/procurement-policy
                              </span>
                            </div>
                            <p className="mt-1 text-[11.5px] text-[var(--text-secondary)]">
                              Controls B2B procurement across 3 lifecycle stages with quotation thresholds and coverage modes (all categories vs. specific categories).
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Separation of Duties & Approver Chain */}
                      <div className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                              Separation of Duties (SoD)
                            </span>
                            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-500">
                              Structurally Enforced
                            </span>
                          </div>
                          <h4 className="mt-2 text-[16px] font-semibold">Structural Signoff Barrier</h4>
                          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                            Requester Marcus V. (VP Eng) is structurally barred from signing off on PO-2026-0047.
                          </p>

                          <div className="mt-4 space-y-2">
                            {[
                              { role: "Line Manager", name: "Tunde Bello", status: "Approved" },
                              { role: "Procurement Lead", name: "Chidi Eze", status: "Approved" },
                              { role: "Finance Director", name: "Ngozi Adeyemi", status: "Approved" },
                            ].map((step, idx) => (
                              <div key={step.name} className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] p-2 text-[11.5px] border border-[var(--border-hairline)]">
                                <div className="flex items-center gap-2">
                                  <span className="flex size-4 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)] text-[9px] font-bold">
                                    0{idx + 1}
                                  </span>
                                  <span className="font-semibold">{step.name}</span>
                                  <span className="text-[10px] text-[var(--text-secondary)]">({step.role})</span>
                                </div>
                                <span className="text-[10px] font-semibold text-emerald-500">{step.status}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-emerald-500/10 p-2.5 text-[11.5px] font-semibold text-emerald-500 flex items-center justify-between">
                          <span>Audit Evidence Cryptographically Sealed</span>
                          <CheckCircle2 className="size-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Lens 4: Bill Pay & AP ── */}
                  {activeTabId === "billpay" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      {/* Left: 3-Way Match Verification Hologram */}
                      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                          <div className="flex items-center gap-2">
                            <FileCheck2 className="size-4 text-[var(--accent-text)]" />
                            <span className="type-ui font-semibold">Automated 3-Way Reconciliation</span>
                          </div>
                          <span className="type-meta rounded-md bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-500">
                            Match Score: 100%
                          </span>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                          <div className="rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <p className="type-meta text-[var(--text-secondary)]">Purchase Order</p>
                            <p className="type-ui font-bold text-[var(--text-primary)] mt-1">PO-0047</p>
                            <span className="text-[10px] text-emerald-500 mt-1 inline-block">₦6.8M Agreed</span>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <p className="type-meta text-[var(--text-secondary)]">Goods Receipt</p>
                            <p className="type-ui font-bold text-[var(--text-primary)] mt-1">GR-0091</p>
                            <span className="text-[10px] text-emerald-500 mt-1 inline-block">50/50 Provisioned</span>
                          </div>
                          <div className="rounded-lg bg-[var(--bg-surface)] p-3 border border-[var(--border-hairline)]">
                            <p className="type-meta text-[var(--text-secondary)]">Supplier Invoice</p>
                            <p className="type-ui font-bold text-[var(--text-primary)] mt-1">INV-8812</p>
                            <span className="text-[10px] text-emerald-500 mt-1 inline-block">₦6.8M Exact</span>
                          </div>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-[12px] p-2 rounded-md bg-[var(--bg-surface)]">
                            <span className="text-[var(--text-secondary)]">Price & Quantity Variance</span>
                            <span className="font-bold text-emerald-500">₦0.00 (Zero Discrepancy)</span>
                          </div>
                          <div className="flex items-center justify-between text-[12px] p-2 rounded-md bg-[var(--bg-surface)]">
                            <span className="text-[var(--text-secondary)]">Supplier Bank Account Check</span>
                            <span className="font-bold text-emerald-500">Matches CAC Registration</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Payment Execution & Scheduled Settlement */}
                      <div className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                              Settlement Terms
                            </span>
                            <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent-text)]">
                              Net-30
                            </span>
                          </div>
                          <h4 className="mt-2 text-[16px] font-semibold">Payment Scheduling & Approvals</h4>
                          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                            Invoice cleared through 3-way match. AP obligation generated for scheduled execution.
                          </p>

                          <div className="mt-4 space-y-2 text-[12px]">
                            <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                              <span className="text-[var(--text-secondary)]">Scheduled Due Date</span>
                              <span className="font-semibold text-[var(--text-primary)]">Nov 24, 2026</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                              <span className="text-[var(--text-secondary)]">Entity Bank Origin</span>
                              <span className="font-semibold text-[var(--text-primary)]">Access Bank PLC · Primary Account</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-[var(--accent-soft)] p-3 text-[12px] font-semibold text-[var(--accent-text)] flex items-center justify-between">
                          <span>Ready for Execution via Corporate Banking</span>
                          <CheckCircle2 className="size-4" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Lens 5: Accounting & General Ledger ── */}
                  {activeTabId === "accounting" && (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                      {/* Left: Automated Double-Entry Journal Voucher */}
                      <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                          <div className="flex items-center gap-2">
                            <Scale className="size-4 text-[var(--accent-text)]" />
                            <span className="type-ui font-semibold">Journal Voucher #JE-2026-1847</span>
                          </div>
                          <span className="type-meta rounded-md bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-500">
                            Balanced (Dr = Cr)
                          </span>
                        </div>
                        <div className="mt-4 divide-y divide-[var(--border-hairline)] border border-[var(--border-hairline)] rounded-lg overflow-hidden text-[12px]">
                          <div className="flex items-center justify-between p-3 bg-[var(--bg-surface)]">
                            <div>
                              <p className="font-semibold text-[var(--text-primary)]">Dr. 5200 Software & Cloud Subscriptions</p>
                              <p className="text-[10px] text-[var(--text-secondary)]">Department: Engineering Ops</p>
                            </div>
                            <span className="font-bold text-[var(--text-primary)]">₦6,800,000.00</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-[var(--bg-surface)]">
                            <div>
                              <p className="font-semibold text-[var(--text-primary)]">Cr. 2000 Accounts Payable — Aster Cloud</p>
                              <p className="text-[10px] text-[var(--text-secondary)]">Entity AP Subledger</p>
                            </div>
                            <span className="font-bold text-[var(--text-primary)]">₦6,800,000.00</span>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                          <span>Trial Balance Integrity: Zero Discrepancy</span>
                          <span className="font-semibold text-emerald-500">100% In-Balance</span>
                        </div>
                      </div>

                      {/* Right: Immutability & Subledger Controls */}
                      <div className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                              Ledger Security
                            </span>
                            <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent-text)]">
                              Immutable Posting
                            </span>
                          </div>
                          <h4 className="mt-2 text-[16px] font-semibold">Fiscal Period Governance</h4>
                          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                            Journal vouchers cannot be quietly edited or deleted. Corrections are executed as dated reversals.
                          </p>

                          <div className="mt-4 space-y-2 text-[12px]">
                            <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                              <span className="text-[var(--text-secondary)]">Fiscal Period</span>
                              <span className="font-semibold text-[var(--text-primary)]">Q4 2026 (Open Period)</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                              <span className="text-[var(--text-secondary)]">AP Obligation ID</span>
                              <span className="font-semibold text-[var(--text-primary)]">OB-8921 · Live on Subledger</span>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-[var(--border-hairline)]">
                              <span className="text-[var(--text-secondary)]">Cryptographic Hash</span>
                              <span className="font-mono text-[10px] text-[var(--accent-text)]">SHA-256: 7f8a9...c019</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 rounded-lg bg-emerald-500/10 p-2.5 text-[11.5px] font-semibold text-emerald-500 flex items-center justify-between">
                          <span>Audit-Ready Subledger Seal</span>
                          <Lock className="size-4" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stage Footer Navigation & Deep-Dive Info */}
            <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)]/60 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={goToPrev}
                      className="flex size-7 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      title="Previous Lens"
                    >
                      ←
                    </button>
                    <button
                      onClick={goToNext}
                      className="flex size-7 items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      title="Next Lens"
                    >
                      →
                    </button>
                  </div>
                  <span className="text-[12px] text-[var(--text-secondary)]">
                    Viewing Lens {currentIndex + 1} of {productTabs.length}:{" "}
                    <strong className="text-[var(--text-primary)]">{activeTab.label}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden text-[12px] text-[var(--text-secondary)] md:inline">
                    Continuous Audit Trail Active
                  </span>
                  <a
                    href={activeTab.ctaHref}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90"
                  >
                    <span>Launch {activeTab.shortLabel}</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Contextual Deep-Dive Story Card Below Canvas ── */}
        <div className="mx-auto mt-8 max-w-[1080px]">
          <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <span className="type-meta font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                  {activeTab.tagline}
                </span>
                <h3 className="mt-2 text-[20px] font-semibold text-[var(--text-primary)] sm:text-[22px]">
                  {activeTab.label} in the unified platform
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                  {activeTab.description}
                </p>
              </div>

              <div className="space-y-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)]/50 p-5">
                <p className="type-meta font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                  Key Capabilities
                </p>
                {activeTab.highlights.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
                    <span>{item}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <a
                    href={activeTab.ctaHref}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-text)] transition-colors hover:underline"
                  >
                    <span>{activeTab.ctaLabel}</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
