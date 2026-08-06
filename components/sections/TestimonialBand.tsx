import { Building2, Check, CheckCircle2, FileClock, FileCheck2, Link2, ReceiptText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const evidence = [
  { icon: ShieldCheck, title: "Rule applied", body: "Software purchases above $5,000 require finance approval." },
  { icon: FileClock, title: "Decision recorded", body: "Approver, timestamp, and visible request context remain attached." },
  { icon: Link2, title: "Record linked", body: "Invoice, payment, and audit evidence resolve to the same decision." },
] as const;

const trace = [
  { title: "Request received", detail: "Aster Cloud · $6,800", icon: ReceiptText },
  { title: "Vendor verified", detail: "Tax, banking, security", icon: Building2 },
  { title: "Policy SW-05 applied", detail: "Finance approval required", icon: ShieldCheck },
  { title: "Finance approved", detail: "Amara · 10:42", icon: CheckCircle2 },
  { title: "Invoice matched", detail: "INV-2048", icon: FileCheck2 },
] as const;

function DecisionTraceVisual() {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/10 bg-[#111714] shadow-[0_38px_90px_-48px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#72dece]" /><span className="text-[10px] font-semibold">Decision trace</span></div>
        <span className="flex items-center gap-1.5 text-[8px] text-white/50"><CheckCircle2 className="size-3 text-[#72dece]" />Complete</span>
      </div>

      <div className="grid md:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-white/10 p-5 md:border-b-0 md:border-r sm:p-6">
          <p className="text-[8px] font-semibold uppercase text-[#72dece]">Transaction timeline</p>
          <div className="mt-5">
            {trace.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`relative gap-3 pb-5 last:pb-0 ${index === 1 || index === 3 ? "hidden sm:flex" : "flex"}`}>
                  {index < trace.length - 1 && <span className="absolute left-[15px] top-8 h-7 w-px bg-white/10" />}
                  <span className="z-10 flex size-8 shrink-0 items-center justify-center rounded-[7px] bg-[#17342e] text-[#72dece]"><Icon className="size-3.5" /></span>
                  <div className="min-w-0 flex-1 border-b border-white/[0.07] pb-4 last:border-0"><p className="text-[10px] font-semibold">{item.title}</p><p className="mt-1 text-[8px] text-white/40">{item.detail}</p></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-[8px] font-semibold uppercase text-[#72dece]">Policy evaluation</p><h3 className="mt-2 text-[15px] font-semibold">Software purchase</h3></div>
            <span className="rounded-[6px] bg-[#17342e] px-2 py-1 text-[8px] font-semibold text-[#72dece]">$6,800</span>
          </div>

          <div className="mt-5 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {["Budget available", "Vendor risk cleared", "Finance route selected"].map((item) => (
              <div key={item} className="flex items-center justify-between py-3"><span className="text-[9px] text-white/55">{item}</span><span className="flex size-5 items-center justify-center rounded-full bg-[#17342e] text-[#72dece]"><Check className="size-3" /></span></div>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between"><p className="text-[8px] font-semibold uppercase text-white/40">Evidence attached</p><span className="text-[8px] text-[#72dece]">4 records</span></div>
            <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[7px] border border-white/10 bg-white/10">
              {["Request", "Vendor", "Approval", "Invoice"].map((item) => <div key={item} className="flex items-center gap-2 bg-[#111714] px-3 py-3 text-[9px] text-white/60"><FileCheck2 className="size-3.5 text-[#72dece]" />{item}</div>)}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4"><div><p className="text-[7px] uppercase text-white/35">Trace ID</p><p className="mt-1 text-[9px] font-medium">VL-2048-AX</p></div><span className="text-[9px] font-semibold text-[#72dece]">Audit-ready</span></div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialBand() {
  return (
    <section className="overflow-hidden bg-[#0b100e] py-20 text-white sm:py-28">
      <Container className="grid items-center gap-12 md:grid-cols-[0.76fr_1.24fr] md:gap-16">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase text-[#72dece]">Operational proof</p>
          <h2 className="mt-5 max-w-[480px] text-[length:var(--fs-h2)] font-semibold leading-[1.08]">Proof lives in the record.</h2>
          <p className="mt-5 max-w-[460px] text-[14px] leading-6 text-white/55">Every rule, reviewer, and financial outcome stays connected, so finance can explain what happened without reconstructing it.</p>

          <div className="mt-8 hidden divide-y divide-white/10 border-y border-white/10 sm:block">
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
          <DecisionTraceVisual />
        </Reveal>
      </Container>
    </section>
  );
}
