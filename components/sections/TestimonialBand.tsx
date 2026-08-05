import Image from "next/image";
import { CheckCircle2, FileClock, Link2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const evidence = [
  { icon: ShieldCheck, title: "The rule that applied", body: "Policy checks and exception reasons remain attached to the transaction." },
  { icon: FileClock, title: "The people who decided", body: "Approvals are timestamped with the request context reviewers saw." },
  { icon: Link2, title: "The financial record that followed", body: "Receipt, invoice, payment, and audit history resolve in one place." },
] as const;

export function TestimonialBand() {
  return (
    <section className="overflow-hidden bg-[var(--ink)] py-20 text-[var(--ink-foreground)] sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        <Reveal>
          <div className="relative aspect-[1.18/1] overflow-hidden rounded-[14px] border border-white/10 bg-[#111714] shadow-[0_35px_80px_-45px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div className="absolute inset-5 overflow-hidden rounded-[10px] border border-white/10 bg-white sm:inset-8">
              <Image src="/images/finance-visibility-dashboard.png" alt="Villeto audit and finance visibility workspace" fill sizes="(max-width: 1024px) 92vw, 55vw" className="object-contain" />
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-[8px] border border-white/10 bg-[#0b100e] px-3 py-2 shadow-lg sm:bottom-5 sm:right-5">
              <CheckCircle2 className="size-3.5 text-[#6edbca]" />
              <span className="text-[9px] font-semibold text-white">Audit trail complete</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-[11px] font-semibold uppercase text-[#6edbca]">Operational proof</p>
          <h2 className="mt-5 max-w-[520px] text-[length:var(--fs-h2)] font-semibold leading-[1.08]">Every decision leaves a record.</h2>
          <p className="mt-5 max-w-[500px] text-[15px] leading-7 text-white/58">Finance should not need a testimonial to understand what happened. Villeto keeps the evidence inside the workflow.</p>

          <div className="mt-9 divide-y divide-white/10 border-y border-white/10">
            {evidence.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 py-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[8px] bg-[#15352f] text-[#6edbca]"><Icon className="size-4" /></span>
                  <div><h3 className="text-[12px] font-semibold">{item.title}</h3><p className="mt-1.5 text-[11px] leading-5 text-white/45">{item.body}</p></div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
