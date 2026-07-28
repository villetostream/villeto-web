"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { audienceSection, audiences } from "@/lib/content/audiences";

export function AudienceGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="solutions" className="section-tinted pt-20 pb-20 text-[var(--text-primary)] sm:pt-28 sm:pb-28">
      <Container>
        <Reveal className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[length:var(--fs-h2)] font-semibold">{audienceSection.heading}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
            Villeto brings together expense management, budgeting, and reporting in one seamless
            platform, designed to give your team clarity, control, and confidence with every transaction.
          </p>
        </Reveal>

        <div 
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {audiences.map((a, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <Reveal key={a.id} delay={(i % 2) * 0.06}>
                <a
                  href={`/solutions/${a.id}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  className={`group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-all duration-300 ${
                    isDimmed ? "opacity-60 scale-[0.98]" : "opacity-100 hover:-translate-y-1"
                  }`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 p-6">
                    <h3 className="text-[19px] font-semibold">{a.title}</h3>
                    <p className="max-w-[420px] text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                      {a.body}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
