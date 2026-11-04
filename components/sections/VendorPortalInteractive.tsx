"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Building2,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  Truck,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  PackageCheck,
  Sparkles,
} from "lucide-react";

type BuyerCompany = {
  id: string;
  name: string;
  status: "Active" | "Pending Setup" | "Invited";
  poCount: number;
  openBalance: string;
  paymentTerms: string;
  currency: string;
};

const buyerCompanies: BuyerCompany[] = [
  {
    id: "acme",
    name: "Acme Holdings Ltd",
    status: "Active",
    poCount: 3,
    openBalance: "₦6,800,000",
    paymentTerms: "Net 30",
    currency: "NGN",
  },
  {
    id: "zenith",
    name: "Zenith Retail Group",
    status: "Active",
    poCount: 1,
    openBalance: "₦2,450,000",
    paymentTerms: "Net 15",
    currency: "NGN",
  },
  {
    id: "apex",
    name: "Apex Global Labs",
    status: "Pending Setup",
    poCount: 0,
    openBalance: "₦0",
    paymentTerms: "Net 45",
    currency: "NGN",
  },
];

type ActiveView = "orders" | "invoice" | "messages" | "companies";

export function VendorPortalInteractive() {
  const [selectedCompany, setSelectedCompany] = useState<BuyerCompany>(buyerCompanies[0]!);
  const [activeView, setActiveView] = useState<ActiveView>("orders");
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [line1Acknowledged, setLine1Acknowledged] = useState(true);
  const [line2Acknowledged, setLine2Acknowledged] = useState(true);

  return (
    <div className="relative w-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-2xl shadow-teal-950/20 ring-1 ring-white/10 overflow-hidden text-left">
      {/* ── Ambient Inner Glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-500/10 blur-3xl"
      />

      {/* ── Top Bar: Workspace Header with Company Switcher ── */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3 gap-2.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] font-bold text-xs text-[var(--accent-contrast)] shadow-sm">
            AC
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[13px] font-semibold text-[var(--text-primary)] truncate max-w-[150px] sm:max-w-none">
                Aster Cloud Systems
              </span>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-2.5" /> Verified
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)]">RC-1849204 · Supplier VN-0492</p>
          </div>
        </div>

        {/* Company Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-2.5 py-1 text-[11.5px] font-medium text-[var(--text-primary)] shadow-xs hover:border-teal-500/50 transition-colors"
          >
            <Building2 className="size-3 text-teal-400" />
            <span className="truncate max-w-[120px] sm:max-w-none">
              Buyer: <strong>{selectedCompany.name}</strong>
            </span>
            <ChevronDown className="size-3 text-[var(--text-secondary)] ml-0.5" />
          </button>

          {companyDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 z-30 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1.5 shadow-xl ring-1 ring-black/10">
              <p className="px-2 py-1 text-[10.5px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Switch Buyer Organization
              </p>
              <div className="mt-1 space-y-1">
                {buyerCompanies.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSelectedCompany(c);
                      setCompanyDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[12px] transition-colors ${
                      selectedCompany.id === c.id
                        ? "bg-[var(--accent-soft)] font-medium text-[var(--accent-text)]"
                        : "hover:bg-[var(--bg-surface)] text-[var(--text-primary)]"
                    }`}
                  >
                    <div>
                      <p className="font-semibold leading-tight">{c.name}</p>
                      <p className="text-[10.5px] text-[var(--text-secondary)]">Terms: {c.paymentTerms}</p>
                    </div>
                    <span
                      className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-medium ${
                        c.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 sm:px-4 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveView("orders")}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 px-2.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
            activeView === "orders"
              ? "border-teal-400 text-teal-400 font-semibold"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <PackageCheck className="size-3.5" />
          <span>Purchase Orders</span>
          <span className="rounded-full bg-teal-500/10 px-1.5 py-0.2 text-[10px] font-bold text-teal-400">
            PO-0047
          </span>
        </button>

        <button
          onClick={() => setActiveView("invoice")}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 px-2.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
            activeView === "invoice"
              ? "border-teal-400 text-teal-400 font-semibold"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <FileText className="size-3.5" />
          <span>Invoice & Payout</span>
          <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[10px] font-bold text-emerald-400">
            Approved
          </span>
        </button>

        <button
          onClick={() => setActiveView("messages")}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 px-2.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
            activeView === "messages"
              ? "border-teal-400 text-teal-400 font-semibold"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <MessageSquare className="size-3.5" />
          <span>Buyer Chat</span>
          <span className="rounded-full bg-blue-500/10 px-1.5 py-0.2 text-[10px] font-bold text-blue-400">
            1 New
          </span>
        </button>

        <button
          onClick={() => setActiveView("companies")}
          className={`flex items-center gap-1.5 border-b-2 py-2.5 px-2.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
            activeView === "companies"
              ? "border-teal-400 text-teal-400 font-semibold"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          <Building2 className="size-3.5" />
          <span>Multi-Buyer Vault</span>
        </button>
      </div>

      {/* ── Main Interactive Content Area ── */}
      <div className="p-3.5 sm:p-5 min-h-[360px] bg-[var(--bg-canvas)]">
        {/* VIEW 1: PURCHASE ORDER FULFILLMENT */}
        {activeView === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-3.5"
          >
            {/* PO Summary Header */}
            <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">
                    PO-2026-0047
                  </h4>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.2 text-[10px] font-semibold text-emerald-400">
                    Dispatched & In Transit
                  </span>
                </div>
                <p className="mt-0.5 text-[11.5px] text-[var(--text-secondary)] truncate">
                  Buyer: <strong>{selectedCompany.name}</strong> · CapEx Cloud Infrastructure
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Total PO</p>
                <p className="text-[17px] font-bold text-teal-400">₦6,800,000</p>
              </div>
            </div>

            {/* Line Items List */}
            <div className="rounded-xl border border-[var(--border-hairline)] overflow-hidden">
              <div className="bg-[var(--bg-surface)] px-3 py-1.5 border-b border-[var(--border-hairline)] flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                <span className="font-semibold uppercase tracking-wider">Line Items</span>
                <span>Carrier: <strong>DHL Express (DHL-NG-889104)</strong></span>
              </div>

              <div className="divide-y divide-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[12.5px]">
                {/* Line 1 */}
                <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-[var(--text-primary)]">
                        1. Hybrid Cloud Compute Nodes (2x)
                      </span>
                      <span className="rounded bg-blue-500/10 px-1.5 py-0.2 text-[10px] text-blue-400 font-medium">
                        In Transit
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      Subtotal: <strong>₦4,800,000</strong> · Estimated Arrival: Nov 12, 2026
                    </p>
                  </div>
                  <button
                    onClick={() => setLine1Acknowledged(!line1Acknowledged)}
                    className={`inline-flex items-center gap-1 self-start sm:self-center rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      line1Acknowledged
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "border border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                    }`}
                  >
                    <CheckCircle2 className="size-3" />
                    {line1Acknowledged ? "Acknowledged" : "Acknowledge"}
                  </button>
                </div>

                {/* Line 2 */}
                <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-[var(--text-primary)]">
                        2. Database Migration Support (Milestone 1)
                      </span>
                      <span className="rounded bg-emerald-500/10 px-1.5 py-0.2 text-[10px] text-emerald-400 font-medium">
                        Verified
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      Fixed Milestone: <strong>₦2,000,000</strong> · GR-2026-0041 Confirmed
                    </p>
                  </div>
                  <button
                    onClick={() => setLine2Acknowledged(!line2Acknowledged)}
                    className={`inline-flex items-center gap-1 self-start sm:self-center rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      line2Acknowledged
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "border border-[var(--border-hairline)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                    }`}
                  >
                    <CheckCircle2 className="size-3" />
                    {line2Acknowledged ? "Receipt Signed" : "Acknowledge"}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[12px]">
              <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
                <Truck className="size-3.5 text-teal-400" />
                <span>Live dispatch tracking syncs to {selectedCompany.name} dock.</span>
              </div>
              <button
                onClick={() => setActiveView("invoice")}
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--accent)] px-3 py-1 text-[11.5px] font-semibold text-[var(--accent-contrast)] hover:opacity-90 transition-opacity"
              >
                Track Payout Pipeline
                <ArrowRight className="size-3" />
              </button>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: INVOICING & 3-WAY MATCHING PIPELINE */}
        {activeView === "invoice" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-3.5"
          >
            {/* Invoice Header */}
            <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-[14px] font-semibold text-[var(--text-primary)]">
                    INV-2026-0089
                  </h4>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.2 text-[10px] font-semibold text-emerald-400">
                    Approved for Release
                  </span>
                </div>
                <p className="mt-0.5 text-[11.5px] text-[var(--text-secondary)]">
                  Linked to PO-2026-0047 · Payout to: Zenith Bank (···· 4109)
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Invoice Amount</p>
                <p className="text-[17px] font-bold text-teal-400">₦6,800,000</p>
              </div>
            </div>

            {/* 4-Phase Payment Pipeline */}
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
                4-Stage Payment Pipeline
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11.5px]">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
                  <span className="text-emerald-400 font-bold">1. Submitted ✓</span>
                  <p className="text-[10.5px] text-[var(--text-secondary)] mt-0.5">PO lines matched</p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
                  <span className="text-emerald-400 font-bold">2. 3-Way Match ✓</span>
                  <p className="text-[10.5px] text-[var(--text-secondary)] mt-0.5">Zero variance</p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2">
                  <span className="text-emerald-400 font-bold">3. Approved ✓</span>
                  <p className="text-[10.5px] text-[var(--text-secondary)] mt-0.5">AP authorized</p>
                </div>
                <div className="rounded-lg border border-teal-500/40 bg-teal-500/10 p-2">
                  <span className="text-teal-300 font-bold">4. Scheduled</span>
                  <p className="text-[10.5px] text-teal-400/90 mt-0.5 font-medium">Friday Payout Run</p>
                </div>
              </div>
            </div>

            {/* 3-Way Verification Verification Chips */}
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-2">
                <span className="text-[var(--text-secondary)] uppercase text-[9.5px]">PO Amount</span>
                <p className="font-semibold text-[var(--text-primary)]">₦6,800,000</p>
                <span className="text-emerald-400 font-medium">Exact match</span>
              </div>
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-2">
                <span className="text-[var(--text-secondary)] uppercase text-[9.5px]">Goods Receipt</span>
                <p className="font-semibold text-[var(--text-primary)]">GR-2026-0041</p>
                <span className="text-emerald-400 font-medium">Dock verified</span>
              </div>
              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-2">
                <span className="text-[var(--text-secondary)] uppercase text-[9.5px]">Bank Account</span>
                <p className="font-semibold text-[var(--text-primary)]">Zenith Bank 012··</p>
                <span className="text-emerald-400 font-medium">CAC legal match</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: CONTEXTUAL MESSAGES */}
        {activeView === "messages" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2 text-[12px]">
              <span className="font-semibold text-[var(--text-primary)]">
                Thread: PO-2026-0047
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.2 text-[10px] font-semibold text-emerald-400">
                Live Audit Trail
              </span>
            </div>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 text-[12px]">
              {/* Message 1 */}
              <div className="flex items-start gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px]">
                  BO
                </div>
                <div className="rounded-xl rounded-tl-sm border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-2.5 max-w-[480px]">
                  <p className="font-semibold text-[var(--text-primary)] text-[11px] mb-0.5">
                    Bolanle O. · Procurement Officer (Acme)
                  </p>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    Hello Aster team! We received the goods delivery note for Line 2. IT Ops signed off the milestone.
                  </p>
                </div>
              </div>

              {/* Message 2 */}
              <div className="flex items-start gap-2 justify-end">
                <div className="rounded-xl rounded-tr-sm bg-teal-500/20 border border-teal-500/30 p-2.5 max-w-[480px]">
                  <p className="font-semibold text-teal-300 text-[11px] mb-0.5">
                    Aster Cloud Systems (You)
                  </p>
                  <p className="text-[var(--text-primary)] leading-relaxed">
                    Thank you! DHL Express tracking <strong>DHL-NG-889104</strong> added for Line 1 compute clusters. Arriving Nov 12.
                  </p>
                </div>
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-400 font-bold text-[10px]">
                  AS
                </div>
              </div>
            </div>

            <div className="pt-1">
              <div className="flex items-center gap-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-1.5">
                <input
                  type="text"
                  placeholder="Reply directly on PO-2026-0047..."
                  className="w-full bg-transparent px-2 text-[12px] text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none"
                  readOnly
                />
                <button className="rounded bg-[var(--accent)] px-2.5 py-1 text-[11px] font-semibold text-[var(--accent-contrast)]">
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 4: MULTI-BUYER VAULT */}
        {activeView === "companies" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 }}
            className="space-y-3"
          >
            <div className="border-b border-[var(--border-hairline)] pb-2">
              <h4 className="text-[13px] font-semibold text-[var(--text-primary)]">
                One Verified Identity · 3 Buyer Workspaces
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Verified once via CAC/TIN. Connect to new buyers without re-submitting legal paperwork.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {buyerCompanies.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-xl border p-2.5 transition-all text-[11.5px] ${
                    selectedCompany.id === c.id
                      ? "border-teal-500/60 bg-teal-500/5 shadow-xs"
                      : "border-[var(--border-hairline)] bg-[var(--bg-surface)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-[var(--text-primary)] truncate">
                      {c.name}
                    </span>
                    <span
                      className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-semibold ${
                        c.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                  <p className="text-[var(--text-secondary)]">Terms: {c.paymentTerms}</p>
                  <p className="text-[var(--text-secondary)]">Orders: {c.poCount} POs ({c.openBalance})</p>
                  <button
                    onClick={() => {
                      setSelectedCompany(c);
                      setActiveView("orders");
                    }}
                    className="mt-2 w-full rounded border border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-1 text-[10.5px] font-medium text-[var(--text-primary)] hover:border-teal-500/40"
                  >
                    Switch Workspace
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Bottom Status Bar ── */}
      <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
        <div className="flex items-center gap-1.5">
          <span className="flex size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Next Automated Settlement: <strong>Friday, 10:00 AM WAT</strong></span>
        </div>
        <a
          href="https://app.villeto.com/login"
          className="font-medium text-teal-400 hover:underline inline-flex items-center gap-1"
        >
          Sign In to Portal <ExternalLink className="size-2.5" />
        </a>
      </div>
    </div>
  );
}
