"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { PlayCircle, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/lib/content/hero";
import { GovernanceOrbit } from "./GovernanceOrbit";
import { useEmailOnboarding } from "@/lib/hooks/useEmailOnboarding";

const BOOT_EASE = [0.16, 1, 0.3, 1] as const; // EXPO_OUT

const bootStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const bootItem = {
  hidden: { opacity: 0, y: 15, clipPath: "inset(100% 0 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: BOOT_EASE },
  },
};

export function Hero() {
  const { handleSubmit, loading, error } = useEmailOnboarding();
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(email);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-canvas)] to-[var(--accent-soft)]/40">
      {/* Slow continuous pan for the background texture */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        animate={{ x: ["0%", "-3%", "0%"], y: ["0%", "3%", "0%"] }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
      >
        <Image
          src="/images/hero-background-texture.png"
          alt=""
          fill
          priority
          className="object-cover scale-[1.1]"
        />
      </motion.div>

      <Container className="relative grid grid-cols-1 items-center gap-10 pt-8 pb-10 sm:pt-10 sm:pb-14 md:grid-cols-2 md:pt-12 md:pb-16">
        <div className="flex flex-col">
          {/* Eyebrow with flanking dots */}
          <div className="self-start animate-hero-fade">
            <div className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3.5 py-1.5">
              <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span className="text-[13px] font-medium text-[var(--accent-text)]">{hero.eyebrow}</span>
              <span className="size-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
            </div>
          </div>

          <h1 className="mt-4 text-[length:var(--fs-hero)] font-semibold text-[var(--text-primary)] animate-hero-fade animation-delay-100">
            {hero.headline}
          </h1>

          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[16px] animate-hero-fade animation-delay-200">
            {hero.subhead}
          </p>

          <div className="animate-hero-fade animation-delay-300">
            <form
              className="mt-6 flex max-w-[460px] items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-1.5 pl-4 shadow-[0_2px_6px_rgba(10,15,13,0.04)] relative"
              onSubmit={onSubmit}
            >
              <label htmlFor="hero-email" className="sr-only">
                {hero.emailPlaceholder}
              </label>
              <input
                id="hero-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={hero.emailPlaceholder}
                disabled={loading}
                className="min-h-[40px] w-full min-w-0 flex-1 bg-transparent text-[14.5px] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] border-none focus:outline-none focus:ring-0 focus:border-transparent focus-visible:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex min-h-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 text-[14.5px] font-semibold text-[var(--accent-contrast)] transition-transform hover:translate-y-[-1px] active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : hero.primaryCta.label}
              </button>
              {error && <span className="absolute -bottom-6 left-0 text-[13px] text-red-500">{error}</span>}
            </form>

            {/* See Villeto in action — with play circle icon */}
            <a
              href={hero.secondaryCta.href}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-[var(--accent-text)] transition-opacity hover:opacity-80"
            >
              <PlayCircle className="size-5" strokeWidth={1.75} />
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        {/* Right column: Governance orbit */}
        <Reveal delay={0.1} className="flex flex-col items-center">
          <GovernanceOrbit />
        </Reveal>
      </Container>
    </section>
  );
}