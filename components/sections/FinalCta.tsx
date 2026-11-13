"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DemoRequestDialog } from "@/components/ui/DemoRequestDialog";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/lib/content/trust";
import { useEmailOnboarding } from "@/lib/hooks/useEmailOnboarding";

export function FinalCta() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { handleSubmit, loading, error } = useEmailOnboarding();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email);
  };

  return (
    <section id="signup" className="section-tinted section-glow-top relative overflow-hidden py-24 sm:py-32">
      <Image
        src="/images/cta-background-texture.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-[0.12] mix-blend-overlay"
      />
      <Container className="relative flex flex-col items-center gap-10 text-center">
        <Reveal className="flex flex-col items-center gap-5">
          <h2 className="max-w-[820px] text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)]">
            {finalCta.heading}
          </h2>
          <p className="max-w-[560px] text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[19px]">
            {finalCta.subhead}
          </p>
        </Reveal>

        {/* Email capture */}
        <Reveal delay={0.1} className="flex w-full max-w-[540px] flex-col gap-4">
          <form
            id="final-signup-form"
            className="flex w-full flex-col items-stretch gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1.5 shadow-[0_2px_6px_rgba(10,15,13,0.04)] sm:flex-row sm:items-center sm:pl-4"
            onSubmit={onSubmit}
          >
            <input
              id="final-email-input"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={finalCta.emailPlaceholder}
              disabled={loading}
              className="min-h-[44px] w-full min-w-0 flex-1 border-none bg-transparent px-2.5 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:outline-none disabled:opacity-50 sm:px-0"
            />
            <button
              type="submit"
              id="final-signup-btn"
              disabled={loading}
              className="flex min-h-[46px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--accent)] px-6 text-[15px] font-semibold text-[var(--accent-contrast)] transition-transform hover:-translate-y-[1px] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : finalCta.primaryCta.label}
            </button>
          </form>
          {error && <p className="text-[13px] text-red-500">{error}</p>}

          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 text-[13px] text-[var(--text-secondary)]">
            <span>{finalCta.trialNote}</span>
            <span className="hidden sm:inline text-[var(--border-hairline)]">•</span>
            <button
              type="button"
              onClick={() => setDemoOpen(true)}
              className="inline-flex items-center gap-1.5 font-semibold text-[var(--accent-text)] transition-colors hover:underline cursor-pointer"
            >
              <CalendarDays className="size-3.5" />
              <span>{finalCta.demo?.label ?? "Request a walkthrough"}</span>
              <ArrowRight className="size-3" />
            </button>
          </div>
        </Reveal>
      </Container>

      <DemoRequestDialog open={demoOpen} onClose={() => setDemoOpen(false)} initialEmail={email} />
    </section>
  );
}
