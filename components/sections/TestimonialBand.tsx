"use client";

import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { testimonialBand } from "@/lib/content/trust";

const quotes = [
  "Villeto saved us 40 hours a month in reconciliation.",
  "Our procurement time dropped by 60%.",
  "The most intuitive ERP we've ever used.",
  "Financial visibility like never before.",
  "Seamless integration with our existing tools."
];

export function TestimonialBand() {
  return (
    <section className="bg-[var(--bg-canvas)] pb-12 sm:pb-20 overflow-hidden">
      <Container>
        <Reveal>
          <div className="group relative aspect-[21/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-hairline)] cursor-pointer">
            <Image
              src={testimonialBand.video.src}
              alt={testimonialBand.video.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
            <button
              aria-label="Play customer testimonial"
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[var(--ink)] shadow-lg transition-transform group-hover:scale-105 sm:size-20"
            >
              <PlayCircle className="size-8 sm:size-10" strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </Container>

      {/* Infinite Horizontal Ticker */}
      <div className="mt-12 sm:mt-20 relative flex whitespace-nowrap py-6 border-y border-[var(--border-hairline)] bg-[var(--bg-surface)]">
        {/* Gradient fades for the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--bg-surface)] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--bg-surface)] to-transparent z-10" />
        
        <motion.div
          className="flex gap-16 pr-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...quotes, ...quotes, ...quotes, ...quotes].map((q, i) => (
            <span key={i} className="text-[14px] sm:text-[16px] font-medium text-[var(--text-secondary)]">
              &quot;{q}&quot;
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
