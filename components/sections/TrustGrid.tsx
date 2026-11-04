"use client";

import {
  BookOpen,
  KeyRound,
  Lock,
  BadgeCheck,
  Globe2,
  Database,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustSection, trustItems } from "@/lib/content/trust";
import { PolicyEngineShield } from "@/components/sections/PolicyEngineShield";

const icons: Record<string, React.ElementType> = {
  book: BookOpen,
  key: KeyRound,
  lock: Lock,
  "badge-check": BadgeCheck,
  globe: Globe2,
  database: Database,
  calendar: CalendarDays,
};

const iconColors: Record<string, string> = {
  book: "bg-sky-500/10 text-sky-500 ring-1 ring-sky-500/20",
  key: "bg-violet-500/10 text-violet-500 ring-1 ring-violet-500/20",
  lock: "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20",
  "badge-check": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20",
  globe: "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20",
  database: "bg-teal-500/10 text-[var(--accent-text)] ring-1 ring-teal-500/20",
  calendar: "bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20",
};

export function TrustGrid() {
  return (
    <section id="trust" className="relative overflow-hidden bg-[var(--bg-canvas)] py-20 text-[var(--text-primary)] sm:py-28">
      <Container>
        {/* ── Centered Section Heading ── */}
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1 shadow-xs">
            <ShieldCheck className="size-3 text-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Audit & Governance
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold leading-[1.12] tracking-tight text-[var(--text-primary)]">
            {trustSection.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {trustSection.subhead}
          </p>
        </Reveal>

        {/* ── Balanced 2-Column Content ── */}
        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* Left: Interactive Policy Engine Shield */}
          <div className="flex flex-col lg:sticky lg:top-28">
            <Reveal delay={0.1}>
              <PolicyEngineShield />
            </Reveal>
          </div>

          {/* Right: Trust & Control Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {trustItems.map((item, i) => {
              const Icon = icons[item.icon] ?? ShieldCheck;
              const isFeaturedLast = i === trustItems.length - 1 && trustItems.length % 2 !== 0;

              return (
                <Reveal
                  key={item.id}
                  delay={i * 0.04}
                  className={isFeaturedLast ? "sm:col-span-2" : undefined}
                >
                  <div
                    className={`group flex h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-xs transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:hover:border-zinc-700 ${
                      isFeaturedLast
                        ? "flex-col sm:flex-row sm:items-center sm:gap-5"
                        : "flex-col gap-4"
                    }`}
                  >
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${
                        iconColors[item.icon] || "bg-teal-500/10 text-teal-600"
                      }`}
                    >
                      <Icon className="size-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-[16.5px] font-semibold tracking-tight text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CheckMark() {
  return <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#dcefeb] text-[9px] font-bold text-[#087f70]">✓</span>;
}
