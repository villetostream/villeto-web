"use client";

import { useRef, useState } from "react";
import { ArrowRight, CalendarDays, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DemoRequestDialog } from "@/components/ui/DemoRequestDialog";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/lib/content/trust";
import { useEmailOnboarding } from "@/lib/hooks/useEmailOnboarding";

export function FinalCta() {
  const { handleSubmit, loading, error } = useEmailOnboarding();
  const [email, setEmail] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);
  const demoButtonRef = useRef<HTMLButtonElement>(null);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(email);
  };

  const closeDemo = () => {
    setDemoOpen(false);
    window.requestAnimationFrame(() => demoButtonRef.current?.focus());
  };

  return (
    <section id="get-started" className="bg-[#dff4ef] py-20 text-[#111714] sm:py-24">
      <Container className="grid gap-10 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-16">
        <Reveal>
          <p className="type-eyebrow font-semibold uppercase text-[#087f70]">{finalCta.eyebrow}</p>
          <h2 className="mt-5 max-w-[620px] text-[length:var(--fs-h2)] font-semibold leading-[1.08]">{finalCta.heading}</h2>
          <p className="type-section-copy mt-5 max-w-[540px] text-[#53605a]">{finalCta.subhead}</p>
        </Reveal>

        <Reveal delay={0.08} className="border-l border-[#0a0f0d]/10 md:pl-12">
          <p className="type-ui font-semibold">Start with your work email</p>
          <form className="relative mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
            <label htmlFor="cta-email" className="sr-only">{finalCta.emailPlaceholder}</label>
            <input
              id="cta-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={finalCta.emailPlaceholder}
              disabled={loading}
              className="type-card-copy min-h-[48px] min-w-0 flex-1 rounded-[8px] border border-black/10 bg-white px-4 text-[#111714] placeholder:text-[#7a8580] focus:border-[#0ea894] focus:outline-none disabled:opacity-50"
            />
            <button type="submit" disabled={loading} className="type-card-copy flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#0ea894] px-5 font-semibold text-white transition-colors hover:bg-[#0b907f] disabled:pointer-events-none disabled:opacity-50">
              {loading ? <Loader2 className="size-4 animate-spin" /> : finalCta.cta.label}<ArrowRight className="size-4" />
            </button>
            {error && <span className="absolute -bottom-6 left-0 text-[12px] text-red-600">{error}</span>}
          </form>

          <div className="mt-5 flex items-center gap-3 border-t border-[#0a0f0d]/10 pt-5">
            <span className="flex size-8 items-center justify-center rounded-[7px] bg-white/75 text-[#087f70]"><CalendarDays className="size-4" /></span>
            <div className="type-ui flex flex-1 items-center justify-between gap-4"><p className="text-[#53605a]">Prefer a guided walkthrough?</p><button ref={demoButtonRef} type="button" onClick={() => setDemoOpen(true)} className="font-semibold text-[#087f70]">{finalCta.demo.label}</button></div>
          </div>
        </Reveal>
      </Container>
      <DemoRequestDialog open={demoOpen} onClose={closeDemo} initialEmail={email} />
    </section>
  );
}
