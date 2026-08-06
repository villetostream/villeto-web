import Image from "next/image";
import { CheckCircle2, FileClock, Link2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const evidence = [
  { icon: ShieldCheck, title: "Rule applied", body: "Software purchases above $5,000 require finance approval." },
  { icon: FileClock, title: "Decision recorded", body: "Approver, timestamp, and visible request context remain attached." },
  { icon: Link2, title: "Record linked", body: "Invoice, payment, and audit evidence resolve to the same decision." },
] as const;

export function TestimonialBand() {
  return (
    <section className="overflow-hidden bg-[#0b100e] py-20 text-white sm:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-[0.76fr_1.24fr] md:gap-16">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase text-[#72dece]">Operational proof</p>
          <h2 className="mt-5 max-w-[480px] text-[length:var(--fs-h2)] font-semibold leading-[1.08]">Proof lives in the record.</h2>
          <p className="mt-5 max-w-[460px] text-[14px] leading-6 text-white/55">Every rule, reviewer, and financial outcome stays connected, so finance can explain what happened without reconstructing it.</p>

          <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {evidence.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="grid grid-cols-[32px_1fr] gap-3 py-4">
                  <span className="flex size-8 items-center justify-center rounded-[7px] bg-[#17342e] text-[#72dece]"><Icon className="size-3.5" /></span>
                  <div><div className="flex items-center gap-2"><span className="text-[8px] font-semibold text-[#72dece]">0{index + 1}</span><h3 className="text-[11px] font-semibold">{item.title}</h3></div><p className="mt-1.5 text-[10px] leading-4 text-white/45">{item.body}</p></div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative aspect-[1.35/1] overflow-hidden rounded-[8px] border border-white/10 bg-[#111714] shadow-[0_38px_90px_-48px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div className="absolute inset-5 overflow-hidden rounded-[7px] border border-white/10 bg-white sm:inset-7">
              <Image src="/images/finance-visibility-dashboard.png" alt="Villeto finance visibility and audit workspace" fill sizes="(max-width: 1024px) 92vw, 60vw" className="object-contain" />
            </div>

            <div className="absolute bottom-4 left-4 w-[230px] rounded-[8px] border border-white/10 bg-[#0b100e]/95 p-4 shadow-xl backdrop-blur sm:bottom-6 sm:left-6 sm:w-[260px]">
              <div className="flex items-center justify-between"><span className="text-[8px] font-semibold uppercase text-[#72dece]">Decision record</span><span className="flex items-center gap-1.5 text-[8px] text-white/55"><CheckCircle2 className="size-3 text-[#72dece]" />Complete</span></div>
              <div className="mt-3 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-3">
                <div><p className="text-[7px] uppercase text-white/35">Rule</p><p className="mt-1 text-[9px] font-medium">SW-05</p></div>
                <div className="pl-3"><p className="text-[7px] uppercase text-white/35">Owner</p><p className="mt-1 text-[9px] font-medium">Finance</p></div>
                <div className="pl-3"><p className="text-[7px] uppercase text-white/35">Record</p><p className="mt-1 text-[9px] font-medium">INV-2048</p></div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
