"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck2,
  Users,
  CheckCircle2,
  Database,
  Sparkles,
  Fingerprint,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";

type ControlNodeId = "separation" | "matching" | "ledger" | "rbac";

interface ControlNode {
  id: ControlNodeId;
  label: string;
  sub: string;
  status: string;
  icon: React.ElementType;
  color: string;
  bgTint: string;
  evidence: {
    rule: string;
    description: string;
    signature: string;
    timestamp: string;
    verdict: string;
  };
}

const CONTROL_NODES: ControlNode[] = [
  {
    id: "separation",
    label: "Separation of Duties",
    sub: "Requester ≠ Approver",
    status: "ENFORCED",
    icon: Users,
    color: "text-violet-500",
    bgTint: "bg-violet-500/10 border-violet-500/25",
    evidence: {
      rule: "GOV-SOD-01 · Dual Authorization Barrier",
      description: "Requester (Marcus V. · VP Eng) is structurally barred from signing off on PO-2026-0047. Transferred to Finance Director.",
      signature: "eCDSA_secp256k1: 0x8a91...32f1",
      timestamp: "Today, 18:41:04 UTC",
      verdict: "PASSED · 2 of 2 Authorized",
    },
  },
  {
    id: "matching",
    label: "3-Way Match Guard",
    sub: "PO + Goods + Invoice",
    status: "100% MATCH",
    icon: FileCheck2,
    color: "text-[var(--accent)]",
    bgTint: "bg-[var(--accent-soft)] border-[var(--accent)]/30",
    evidence: {
      rule: "FIN-AUDIT-04 · Automated AP Match",
      description: "Invoice #INV-8812 (₦6,800,000.00) matched line-for-line against approved PO-2026-0047 and goods delivery receipt #GR-0091.",
      signature: "3WAY_MATCH_TOKEN: 0x4f2b...91c0",
      timestamp: "Today, 18:41:09 UTC",
      verdict: "VERIFIED · Zero Discrepancy",
    },
  },
  {
    id: "ledger",
    label: "Immutable Ledger Seal",
    sub: "SHA-256 Tamper-Proof",
    status: "IMMUTABLE",
    icon: Database,
    color: "text-sky-500",
    bgTint: "bg-sky-500/10 border-sky-500/25",
    evidence: {
      rule: "GL-SEC-01 · Period Integrity Control",
      description: "Journal entry posted to general ledger. Fiscal Period Q4 2026 sealed. Historical records cannot be backdated or overwritten.",
      signature: "BLOCK_HASH: sha256:7f9a88...c491",
      timestamp: "Today, 18:41:14 UTC",
      verdict: "SEALED · Reversal Only",
    },
  },
  {
    id: "rbac",
    label: "Zero-Trust RBAC",
    sub: "Role Scoped Access",
    status: "RESTRICTED",
    icon: KeyRound,
    color: "text-amber-500",
    bgTint: "bg-amber-500/10 border-amber-500/25",
    evidence: {
      rule: "IAM-POL-09 · Least Privilege Scope",
      description: "Vendor bank details and payment release actions locked to certified Treasury admins with hardware MFA verification.",
      signature: "FIDO2_WEBAUTHN: Key_ID_9924",
      timestamp: "Today, 18:41:19 UTC",
      verdict: "SECURED · Hardware Authenticated",
    },
  },
];

export function PolicyEngineShield() {
  const [activeId, setActiveId] = useState<ControlNodeId>("separation");
  const [isManual, setIsManual] = useState(false);

  // Auto-cycle through the 4 controls unless the user clicks one
  useEffect(() => {
    if (isManual) return;
    const interval = setInterval(() => {
      setActiveId((current) => {
        const idx = CONTROL_NODES.findIndex((n) => n.id === current);
        const next = (idx + 1) % CONTROL_NODES.length;
        const nextNode = CONTROL_NODES[next];
        return nextNode ? nextNode.id : current;
      });
    }, 4200);
    return () => clearInterval(interval);
  }, [isManual]);

  const activeNode = CONTROL_NODES.find((n) => n.id === activeId) ?? CONTROL_NODES[0]!;

  return (
    <div className="relative mx-auto w-full max-w-[520px] overflow-hidden rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5 shadow-[0_12px_40px_-12px_rgba(10,15,13,0.08)] sm:p-6">
      {/* Background radial atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[90px]"
      />

      {/* ── Console Header ── */}
      <div className="relative flex items-center justify-between border-b border-[var(--border-hairline)] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[var(--accent)] text-white shadow-xs">
            <ShieldCheck className="size-4" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold tracking-tight text-[var(--text-primary)]">
              Continuous Audit Engine
            </h4>
            <p className="font-mono text-[10px] text-[var(--text-secondary)]">
              Real-time Policy Enforcement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SOC 2 Active
        </div>
      </div>

      {/* ── Geometric Shield Interactive Stage ── */}
      <div className="relative my-4 flex h-[310px] w-full items-center justify-center select-none">
        {/* Precise SVG Wireframe & Energy Beams */}
        <svg
          viewBox="0 0 440 340"
          className="absolute inset-0 h-full w-full pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Protective Shield Geometry */}
          <path
            d="M 220,16 C 310,16 395,45 395,120 C 395,235 305,302 220,324 C 135,302 45,235 45,120 C 45,45 130,16 220,16 Z"
            className="stroke-[var(--border-hairline)]"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />

          {/* Inner Accent Contour */}
          <path
            d="M 220,30 C 295,30 375,55 375,122 C 375,222 295,282 220,304 C 145,282 65,222 65,122 C 65,55 145,30 220,30 Z"
            className="stroke-[var(--accent)] opacity-20"
            strokeWidth="1.5"
          />

          {/* Central Orbital Pulse Rings */}
          <circle cx="220" cy="165" r="46" className="stroke-[var(--border-hairline)]" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="220" cy="165" r="66" className="stroke-[var(--border-hairline)] opacity-50" strokeWidth="1" />

          {/* Power Traces from Hub to the 4 Perimeter Nodes */}
          {/* Top Trace: to Separation */}
          <path
            d="M 220,125 L 220,54"
            className={`transition-colors duration-300 ${
              activeId === "separation" ? "stroke-violet-500" : "stroke-[var(--border-hairline)]"
            }`}
            strokeWidth={activeId === "separation" ? "2.5" : "1.5"}
          />
          {/* Right Trace: to 3-Way Match */}
          <path
            d="M 260,165 L 340,165"
            className={`transition-colors duration-300 ${
              activeId === "matching" ? "stroke-[var(--accent)]" : "stroke-[var(--border-hairline)]"
            }`}
            strokeWidth={activeId === "matching" ? "2.5" : "1.5"}
          />
          {/* Bottom Trace: to Immutable Ledger */}
          <path
            d="M 220,205 L 220,276"
            className={`transition-colors duration-300 ${
              activeId === "ledger" ? "stroke-sky-500" : "stroke-[var(--border-hairline)]"
            }`}
            strokeWidth={activeId === "ledger" ? "2.5" : "1.5"}
          />
          {/* Left Trace: to RBAC */}
          <path
            d="M 180,165 L 100,165"
            className={`transition-colors duration-300 ${
              activeId === "rbac" ? "stroke-amber-500" : "stroke-[var(--border-hairline)]"
            }`}
            strokeWidth={activeId === "rbac" ? "2.5" : "1.5"}
          />

          {/* Active Laser Traveling Particle */}
          {activeId === "separation" && (
            <motion.circle
              r="3.5"
              className="fill-violet-500 shadow-md"
              animate={{ cy: [125, 54] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              cx="220"
            />
          )}
          {activeId === "matching" && (
            <motion.circle
              r="3.5"
              className="fill-[var(--accent)] shadow-md"
              animate={{ cx: [260, 340] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              cy="165"
            />
          )}
          {activeId === "ledger" && (
            <motion.circle
              r="3.5"
              className="fill-sky-500 shadow-md"
              animate={{ cy: [205, 276] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              cx="220"
            />
          )}
          {activeId === "rbac" && (
            <motion.circle
              r="3.5"
              className="fill-amber-500 shadow-md"
              animate={{ cx: [180, 100] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              cy="165"
            />
          )}
        </svg>

        {/* ── Central Policy Engine Core ── */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <motion.div
            className="flex size-14 items-center justify-center rounded-2xl border-2 border-[var(--accent)] bg-[var(--bg-canvas)] shadow-[0_0_28px_rgba(14,168,148,0.3)] transition-transform"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Fingerprint className="size-7 text-[var(--accent)]" strokeWidth={2.2} />
          </motion.div>
          <span className="mt-2 font-mono text-[9px] font-bold uppercase tracking-wider text-[var(--accent-text)]">
            Policy Core
          </span>
        </div>

        {/* ── Docked Control Node 1: Top (Separation of Duties) ── */}
        <button
          type="button"
          onClick={() => {
            setActiveId("separation");
            setIsManual(true);
          }}
          className={`absolute top-[8%] left-[50%] -translate-x-1/2 z-20 flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all ${
            activeId === "separation"
              ? "border-violet-500 bg-violet-500/15 shadow-md shadow-violet-500/10 scale-105"
              : "border-[var(--border-hairline)] bg-[var(--bg-surface)] opacity-80 hover:opacity-100"
          }`}
        >
          <Users className="size-4 text-violet-500" />
          <div className="text-left">
            <span className="block text-[11px] font-bold text-[var(--text-primary)] leading-tight">
              Dual Sign-off
            </span>
            <span className="block text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400">
              Requester ≠ Approver
            </span>
          </div>
        </button>

        {/* ── Docked Control Node 2: Right (3-Way Match Guard) ── */}
        <button
          type="button"
          onClick={() => {
            setActiveId("matching");
            setIsManual(true);
          }}
          className={`absolute top-[48%] right-[3%] -translate-y-1/2 z-20 flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all ${
            activeId === "matching"
              ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-md shadow-emerald-500/10 scale-105"
              : "border-[var(--border-hairline)] bg-[var(--bg-surface)] opacity-80 hover:opacity-100"
          }`}
        >
          <FileCheck2 className="size-4 text-[var(--accent)]" />
          <div className="text-left">
            <span className="block text-[11px] font-bold text-[var(--text-primary)] leading-tight">
              3-Way Match
            </span>
            <span className="block text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400">
              100% Reconciled
            </span>
          </div>
        </button>

        {/* ── Docked Control Node 3: Bottom (Immutable Ledger Seal) ── */}
        <button
          type="button"
          onClick={() => {
            setActiveId("ledger");
            setIsManual(true);
          }}
          className={`absolute bottom-[8%] left-[50%] -translate-x-1/2 z-20 flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all ${
            activeId === "ledger"
              ? "border-sky-500 bg-sky-500/15 shadow-md shadow-sky-500/10 scale-105"
              : "border-[var(--border-hairline)] bg-[var(--bg-surface)] opacity-80 hover:opacity-100"
          }`}
        >
          <Database className="size-4 text-sky-500" />
          <div className="text-left">
            <span className="block text-[11px] font-bold text-[var(--text-primary)] leading-tight">
              Immutable Ledger
            </span>
            <span className="block text-[9.5px] font-mono text-sky-500">
              SHA-256 Tamper-Proof
            </span>
          </div>
        </button>

        {/* ── Docked Control Node 4: Left (Zero-Trust RBAC) ── */}
        <button
          type="button"
          onClick={() => {
            setActiveId("rbac");
            setIsManual(true);
          }}
          className={`absolute top-[48%] left-[3%] -translate-y-1/2 z-20 flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all ${
            activeId === "rbac"
              ? "border-amber-500 bg-amber-500/15 shadow-md shadow-amber-500/10 scale-105"
              : "border-[var(--border-hairline)] bg-[var(--bg-surface)] opacity-80 hover:opacity-100"
          }`}
        >
          <KeyRound className="size-4 text-amber-500" />
          <div className="text-left">
            <span className="block text-[11px] font-bold text-[var(--text-primary)] leading-tight">
              Zero-Trust RBAC
            </span>
            <span className="block text-[9.5px] font-mono text-amber-500">
              Role Scoped
            </span>
          </div>
        </button>
      </div>

      {/* ── Interactive Live Auditor Evidence Inspector Drawer ── */}
      <div className="relative mt-2 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-2 text-[11px]">
          <span className="flex items-center gap-1.5 font-mono font-semibold text-[var(--text-primary)]">
            <Activity className="size-3.5 text-[var(--accent)]" />
            LIVE AUDIT TRAIL EVIDENCE
          </span>
          <span className="rounded-full bg-[var(--bg-canvas)] border border-[var(--border-hairline)] px-2 py-0.5 font-mono text-[10px] text-[var(--accent-text)] font-semibold">
            {activeNode.status}
          </span>
        </div>

        <div className="min-h-[82px] pt-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12.5px] font-bold text-[var(--text-primary)]">
                  {activeNode.evidence.rule}
                </span>
                <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                  {activeNode.evidence.timestamp}
                </span>
              </div>

              <p className="text-[12px] leading-relaxed text-[var(--text-secondary)]">
                {activeNode.evidence.description}
              </p>

              <div className="mt-2.5 flex items-center justify-between border-t border-[var(--border-hairline)] pt-2 font-mono text-[10.5px]">
                <span className="text-[var(--text-secondary)] truncate max-w-[240px]">
                  {activeNode.evidence.signature}
                </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {activeNode.evidence.verdict}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
