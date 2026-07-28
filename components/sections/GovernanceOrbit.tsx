"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useAnimationFrame } from "framer-motion";
import { governanceCallouts } from "@/lib/content/hero";
import { iconMap } from "@/lib/icon-map";

// ─────────────────────────────────────────────────────────────────────────────
// SYSTEM CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const DEG = Math.PI / 180;
const GLOBAL_SPEED  = (2 * Math.PI) / 18_000; // 18 s per full CW orbit (base speed)
const BASE_RADIUS    = 36;        // % points from center (0–50 = center–edge)
const BREATHE_AMOUNT = 1.4;       // ±% points radial breathing
const WOBBLE_DEG     = 2;         // ±2° angular wobble per module

// Variable-speed surge
// Speed swings between 0.30× (slow) and 1.70× (fast) every SURGE_PERIOD_MS.
const SURGE_PERIOD_MS = 12_000;
const SURGE_SPEED     = (2 * Math.PI) / SURGE_PERIOD_MS;
const SURGE_AMOUNT    = 0.70;

// ─────────────────────────────────────────────────────────────────────────────
// CARD ORIENTATION: pure translation — no rotation whatsoever.
// Cards orbit by having their (left, top) updated each frame.
// They never spin, never tilt. Text is 100% readable at all times.
// Icons still rock gently with their own autonomous oscillation.
// ─────────────────────────────────────────────────────────────────────────────

const MODULES = [
  {
    id: "policy",   label: "Policy",   sub: "Rules",    icon: "shield-check" as const,
    baseDeg: -90,  phaseDeg:  0,
    wobbleSpeed: 0.00055, wobblePhase: 0.00,
    breatheSpeed: 0.00055, breathePhase: 0.00,
    iconSpeed: 0.00060, iconPhase: 0.00, iconAmp: 12,
    pulseDelay: "0.12s",
  },
  {
    id: "approval", label: "Approval", sub: "Context",  icon: "git-merge" as const,
    baseDeg: -39,  phaseDeg:  6,
    wobbleSpeed: 0.00047, wobblePhase: 1.10,
    breatheSpeed: 0.00047, breathePhase: 1.10,
    iconSpeed: 0.00053, iconPhase: 1.10, iconAmp: 10,
    pulseDelay: "1.83s",
  },
  {
    id: "vendor",   label: "Vendor",   sub: "Ready",    icon: "building" as const,
    baseDeg:  13,  phaseDeg: -4,
    wobbleSpeed: 0.00061, wobblePhase: 2.30,
    breatheSpeed: 0.00061, breathePhase: 2.30,
    iconSpeed: 0.00058, iconPhase: 2.30, iconAmp: 14,
    pulseDelay: "0.91s",
  },
  {
    id: "invoice",  label: "Invoice",  sub: "Review",   icon: "receipt" as const,
    baseDeg: 64,  phaseDeg:  8,
    wobbleSpeed: 0.00051, wobblePhase: 3.70,
    breatheSpeed: 0.00051, breathePhase: 3.70,
    iconSpeed: 0.00055, iconPhase: 3.70, iconAmp: 11,
    pulseDelay: "2.71s",
  },
  {
    id: "ledger",   label: "Ledger",   sub: "Audit",    icon: "book" as const,
    baseDeg: 116,  phaseDeg: -7,
    wobbleSpeed: 0.00058, wobblePhase: 4.90,
    breatheSpeed: 0.00058, breathePhase: 4.90,
    iconSpeed: 0.00063, iconPhase: 4.90, iconAmp: 13,
    pulseDelay: "3.42s",
  },
  {
    id: "request",  label: "Request",  sub: "Intake",   icon: "file-text" as const,
    baseDeg: 167, phaseDeg:  3,
    wobbleSpeed: 0.00049, wobblePhase: 6.10,
    breatheSpeed: 0.00049, breathePhase: 6.10,
    iconSpeed: 0.00051, iconPhase: 6.10, iconAmp: 9,
    pulseDelay: "1.28s",
  },
  {
    id: "expense",  label: "Expense",  sub: "Tracking", icon: "credit-card" as const,
    baseDeg: -141, phaseDeg:  5,
    wobbleSpeed: 0.00053, wobblePhase: 7.40,
    breatheSpeed: 0.00053, breathePhase: 7.40,
    iconSpeed: 0.00057, iconPhase: 7.40, iconAmp: 11,
    pulseDelay: "0.65s",
  },
] as const;

export function GovernanceOrbit() {
  // SVG line endpoint refs
  const guideRefs = useRef<(SVGLineElement | null)[]>([]);
  const pulseRefs = useRef<(SVGLineElement | null)[]>([]);

  // Card position refs — only left/top updated, NO rotation applied
  const posRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // Icon oscillation refs — only the icon inside each card gently rocks
  const iconRefs  = useRef<(HTMLSpanElement | null)[]>([]);

  useAnimationFrame((time) => {
    // Variable-speed angle — analytically integrated for perfect smoothness
    const surgeOffset = (GLOBAL_SPEED * SURGE_AMOUNT / SURGE_SPEED) * (1 - Math.cos(time * SURGE_SPEED));
    const globalAngle = time * GLOBAL_SPEED + surgeOffset;

    MODULES.forEach((mod, i) => {
      // Per-module angular wobble (±2°)
      const wobble = Math.sin(time * mod.wobbleSpeed + mod.wobblePhase) * WOBBLE_DEG * DEG;

      // Total angle for this module's spoke
      const angle = (mod.baseDeg + mod.phaseDeg) * DEG + globalAngle + wobble;

      // Radial breathing (±1.4% points)
      const radius = BASE_RADIUS + Math.sin(time * mod.breatheSpeed + mod.breathePhase) * BREATHE_AMOUNT;

      // ── Single (cx, cy): shared by BOTH the SVG line tip and the card ──
      const cx = 50 + radius * Math.cos(angle);
      const cy = 50 + radius * Math.sin(angle);

      // Update line endpoints
      const g = guideRefs.current[i];
      const p = pulseRefs.current[i];
      if (g) { g.setAttribute("x2", `${cx}%`); g.setAttribute("y2", `${cy}%`); }
      if (p) { p.setAttribute("x2", `${cx}%`); p.setAttribute("y2", `${cy}%`); }

      // Update card POSITION only — translate(-50%,-50%) is a static centering
      // transform set in the render, never overwritten here. Card never spins.
      const pos = posRefs.current[i];
      if (pos) {
        pos.style.left = `${cx}%`;
        pos.style.top  = `${cy}%`;
      }

      // Icon-only gentle rock — the one animated element inside each card
      const icon = iconRefs.current[i];
      if (icon) {
        const iconAngle = Math.sin(time * mod.iconSpeed + mod.iconPhase) * mod.iconAmp;
        icon.style.transform = `rotate(${iconAngle}deg)`;
      }
    });
  });

  function initialPos(mod: (typeof MODULES)[number]) {
    const rad = (mod.baseDeg + mod.phaseDeg) * DEG;
    return {
      cx: 50 + BASE_RADIUS * Math.cos(rad),
      cy: 50 + BASE_RADIUS * Math.sin(rad),
    };
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[600px] aspect-square"
      style={{ overflow: "clip" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{ duration: 16, times: [0, 0.45, 0.5, 0.95, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        {/* ── THREE BACKGROUND RINGS (72s / 58s / 36s) ──────────────────── */}
      <div className="orbit-ring-outer absolute rounded-full border border-[var(--border-hairline)]"
           style={{ inset: "2%", zIndex: 0 }} />
      <div className="orbit-ring-middle absolute rounded-full"
           style={{ inset: "18%", border: "1.5px dashed var(--border-hairline)", zIndex: 0 }} />
      <div className="orbit-ring-inner absolute rounded-full border border-[var(--border-hairline)]"
           style={{ inset: "34%", zIndex: 0 }} />

      {/* ── SVG SPOKES ─────────────────────────────────────────────────── */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ zIndex: 15 }}
        aria-hidden="true"
        suppressHydrationWarning
      >
        {MODULES.map((mod, i) => {
          const { cx, cy } = initialPos(mod);
          return (
            <g key={mod.id}>
              <line
                ref={(el) => { guideRefs.current[i] = el; }}
                x1="50%" y1="50%" x2={`${cx}%`} y2={`${cy}%`}
                stroke="var(--accent)" strokeOpacity="0.2" strokeWidth="1"
                suppressHydrationWarning
              />
              <line
                ref={(el) => { pulseRefs.current[i] = el; }}
                x1="50%" y1="50%" x2={`${cx}%`} y2={`${cy}%`}
                stroke="var(--accent)" strokeWidth="1.5"
                className="pulse-line"
                style={{ animationDelay: mod.pulseDelay }}
                suppressHydrationWarning
              />
            </g>
          );
        })}
      </svg>

      {/* ── CARDS — translate around orbit, NEVER rotate ───────────────── */}
      {MODULES.map((mod, i) => {
        const Icon = iconMap[mod.icon] as React.ElementType;
        const { cx, cy } = initialPos(mod);
        return (
          <div
            key={mod.id}
            ref={(el) => { posRefs.current[i] = el; }}
            className="absolute"
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 20,
              willChange: "left, top",
            }}
            suppressHydrationWarning
          >
            <div className="governance-module flex w-[108px] flex-col items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-2.5 text-center shadow-[0_4px_20px_-6px_rgba(10,15,13,0.14)]">
              {/* Icon: only element with motion inside the card */}
              <span
                ref={(el) => { iconRefs.current[i] = el; }}
                className="flex size-7 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]"
                style={{ willChange: "transform" }}
              >
                <Icon className="size-3.5" strokeWidth={2} />
              </span>

              {/* Text — completely static, always readable */}
              <div>
                <span className="block text-[11.5px] font-semibold leading-tight text-[var(--text-primary)]">
                  {mod.label}
                </span>
                <span className="block text-[10px] leading-tight text-[var(--text-secondary)]">
                  {mod.sub}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* ── STATIC OVERLAYS — zIndex 10 ─────────────────────────────────── */}
      <div className="absolute left-0 top-0 flex flex-col gap-2.5" style={{ zIndex: 10 }}>
        <span className="inline-flex w-max items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] shadow-sm">
          <span className="size-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          Live governance layer
        </span>
        <div className="w-full rounded-[var(--radius-md)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 shadow-sm">
          <p className="text-[12px] font-semibold text-[var(--text-primary)]">Policy check</p>
          <p className="mt-0.5 text-[10px] leading-snug text-[var(--text-secondary)]">
            Limits and rules are applied before approval starts.
          </p>
        </div>
      </div>

      <div className="absolute right-0 top-0" style={{ zIndex: 10 }}>
        <span className="inline-flex items-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-secondary)] shadow-sm">
          Policy active
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-3" style={{ zIndex: 10 }}>
        {governanceCallouts.map((c) => (
          <div key={c.title} className="rounded-[var(--radius-md)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-3 shadow-sm">
            <p className="text-[12px] font-semibold text-[var(--text-primary)]">{c.title}</p>
            <p className="mt-1 text-[10.5px] leading-snug text-[var(--text-secondary)]">{c.body}</p>
          </div>
        ))}
      </div>

      {/* ── CENTRAL HUB — zIndex 30 ─────────────────────────────────────── */}
      <div
        className="absolute left-1/2 top-1/2 flex size-[100px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[var(--bg-inverse)] text-center shadow-[0_12px_32px_-10px_rgba(10,15,13,0.6)] sm:size-[120px]"
        style={{ zIndex: 30 }}
      >
        <div className="flex flex-col items-center gap-1">
          {/* The V mark logo */}
          <div className="relative mb-0.5 h-7 w-7 sm:h-8 sm:w-8">
            <Image
              src="/images/villeto-v.png"
              alt="Villeto"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          {/* Theme-aware Villeto text */}
          <span className="font-display text-[14px] font-bold tracking-wide text-[var(--text-on-inverse)] sm:text-[16px]">
            Villeto
          </span>
        </div>
      </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8"
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.95, 0.95, 1, 1, 0.95] }}
        transition={{ duration: 16, times: [0, 0.45, 0.5, 0.95, 1], repeat: Infinity, ease: "easeInOut" }}
        style={{ pointerEvents: "none" }}
      >
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
          <img 
            src="/images/Demo%20Dashboard.png" 
            alt="Villeto Dashboard" 
            className="w-full h-auto -mt-[3%] scale-[1.02]" 
          />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[var(--bg-canvas)] to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
