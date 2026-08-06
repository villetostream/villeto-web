"use client";

import { BadgeCheck, BookOpen, KeyRound, Lock, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustItems, trustSection, trustSignals } from "@/lib/content/trust";

const icons = { book: BookOpen, key: KeyRound, lock: Lock, "badge-check": BadgeCheck };

export function TrustGrid() {
  return (
    <section id="trust" className="bg-[#edf2f0] py-20 text-[#111714] sm:py-28">
      <Container>
        <Reveal className="grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <p className="text-[11px] font-semibold uppercase text-[#087f70]">{trustSection.eyebrow}</p>
          <div>
            <h2 className="max-w-[760px] text-[length:var(--fs-h2)] font-semibold leading-[1.08]">{trustSection.heading}</h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-6 text-[#53605a]">{trustSection.subhead}</p>
          </div>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-[8px] border border-black/[0.1] bg-white shadow-[0_28px_75px_-58px_rgba(5,20,15,0.5)]">
          <div className="flex flex-col gap-3 border-b border-black/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-[7px] bg-[#e6f5f2] text-[#087f70]"><ShieldCheck className="size-4" /></span>
              <div><p className="text-[11px] font-semibold">Assurance matrix</p><p className="mt-0.5 text-[9px] text-[#6b7671]">Controls remain attached to the workflow.</p></div>
            </div>
            <span className="flex items-center gap-2 text-[10px] font-semibold text-[#087f70]"><span className="size-1.5 rounded-full bg-[#0ea894]" />{trustSection.status}</span>
          </div>

          <div className="divide-y divide-black/[0.07]">
            {trustItems.map((item, index) => {
              const Icon = icons[item.icon];
              return (
                <div key={item.id} className="grid grid-cols-[36px_minmax(0,1fr)_auto] gap-x-3 gap-y-2 px-5 py-5 sm:grid-cols-[42px_0.7fr_1.3fr_auto] sm:items-center sm:gap-4 sm:px-7">
                  <span className="row-span-2 flex size-9 items-center justify-center rounded-[7px] bg-[#f0f5f3] text-[#087f70] sm:row-span-1"><Icon className="size-4" /></span>
                  <div><span className="text-[9px] font-semibold text-[#087f70]">0{index + 1}</span><h3 className="mt-1 text-[14px] font-semibold">{item.title}</h3></div>
                  <p className="col-span-2 col-start-2 text-[11px] leading-5 text-[#5f6a65] sm:col-span-1 sm:col-start-auto">{item.body}</p>
                  <span className="col-start-3 row-start-1 w-fit rounded-[6px] bg-[#e6f5f2] px-2.5 py-1.5 text-[9px] font-semibold text-[#087f70] sm:col-start-auto sm:row-start-auto">{item.status}</span>
                </div>
              );
            })}
          </div>

          <div className="grid border-t border-black/[0.08] bg-[#f7f9f8] grid-cols-2 sm:grid-cols-4">
            {trustSignals.map((signal) => (
              <div key={signal} className="flex min-h-[58px] items-center gap-2 border-b border-r border-black/[0.06] px-4 text-[10px] font-medium text-[#53605a] last:border-r-0 sm:border-b-0">
                <CheckMark />{signal}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function CheckMark() {
  return <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-[#dcefeb] text-[9px] font-bold text-[#087f70]">✓</span>;
}
