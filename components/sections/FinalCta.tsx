"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { DemoRequestDialog } from "@/components/ui/DemoRequestDialog";
import { Reveal } from "@/components/ui/Reveal";
import { DemoRequestDialog } from "@/components/ui/DemoRequestDialog";
import { finalCta } from "@/lib/content/trust";

export function FinalCta() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [demoOpen, setDemoOpen] = useState(false);
  const demoButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <section id="signup" className="section-tinted section-glow-top relative overflow-hidden py-24 sm:py-32">
      <Image
        src="/images/cta-background-texture.png"
        alt=""
        fill
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
            className="flex w-full flex-col gap-3 sm:flex-row sm:gap-0"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `${finalCta.primaryCta.href}?email=${encodeURIComponent(email)}`;
            }}
          >
            <input
              id="final-email-input"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={finalCta.emailPlaceholder}
              className="h-[52px] flex-1 rounded-[var(--radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15 sm:rounded-r-none"
            />
            <button
              type="submit"
              id="final-signup-btn"
              className="h-[52px] shrink-0 rounded-[var(--radius-sm)] bg-[var(--accent)] px-6 text-[15px] font-semibold text-[var(--accent-contrast)] transition-transform hover:-translate-y-[1px] active:translate-y-0 sm:rounded-l-none"
            >
              {finalCta.primaryCta.label}
            </button>
          </form>

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
