"use client";
import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { finalCta } from "@/lib/content/trust";
import { useEmailOnboarding } from "@/lib/hooks/useEmailOnboarding";

export function FinalCta() {
  const { handleSubmit, loading, error } = useEmailOnboarding();
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email);
  };

  return (
    <section id="get-started" className="section-tinted section-glow-top relative overflow-hidden py-24 sm:py-28">
      <Image
        src="/images/cta-background-texture.png"
        alt=""
        fill
        className="pointer-events-none object-cover opacity-[0.12] mix-blend-overlay"
      />
      <Container className="relative flex flex-col items-center gap-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <h2 className="max-w-[820px] text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)]">
            {finalCta.heading}
          </h2>
          <p className="max-w-[600px] text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[19px]">
            {finalCta.subhead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            className="flex w-full max-w-[520px] items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1.5 pl-5 relative"
            onSubmit={onSubmit}
          >
            <label htmlFor="cta-email" className="sr-only">
              {finalCta.emailPlaceholder}
            </label>
            <input
              id="cta-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={finalCta.emailPlaceholder}
              disabled={loading}
              className="min-h-[40px] w-full min-w-0 flex-1 bg-transparent text-[14.5px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 text-[14.5px] font-semibold text-[var(--accent-contrast)] transition-transform hover:translate-y-[-1px] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : finalCta.cta.label}
            </button>
            {error && <span className="absolute -bottom-6 left-0 text-[13px] text-red-500">{error}</span>}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}