"use client";

import Image from "next/image";
import { BookOpen, KeyRound, Lock, BadgeCheck, Globe2, Database } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustSection, trustItems } from "@/lib/content/trust";

const icons = { book: BookOpen, key: KeyRound, lock: Lock, "badge-check": BadgeCheck, globe: Globe2, database: Database };
const iconColors: Record<string, string> = {
  book: "bg-sky-500/15 text-sky-400",
  key: "bg-violet-500/15 text-violet-400",
  lock: "bg-amber-500/15 text-amber-400",
  "badge-check": "bg-fuchsia-500/15 text-fuchsia-400",
  globe: "bg-blue-500/15 text-blue-400",
  database: "bg-orange-500/15 text-orange-400",
};

export function TrustGrid() {
  return (
    <section className="bg-[var(--bg-canvas)] py-20 text-[var(--text-primary)] sm:py-28">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="flex flex-col justify-between">
          <div>
            <h2 className="text-[length:var(--fs-h2)] font-semibold leading-[1.1]">{trustSection.heading}</h2>
            <p className="mt-5 max-w-[440px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
              {trustSection.subhead}
            </p>
          </div>
          <div className="relative mt-12 hidden aspect-square w-full max-w-[380px] opacity-90 lg:block">
            <Image src="/images/security-compliance-illustration.png" alt="" fill className="object-contain" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {trustItems.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <Reveal key={item.id} delay={i * 0.04}>
                <div className="flex h-full flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
                  <motion.span 
                    className={`flex size-11 items-center justify-center rounded-[var(--radius-sm)] ${iconColors[item.icon]}`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </motion.span>
                  <div>
                    <h3 className="text-[17px] font-semibold">{item.title}</h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
