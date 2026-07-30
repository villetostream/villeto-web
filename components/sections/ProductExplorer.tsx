"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { productExplorer, productTabs, productTabImages } from "@/lib/content/products";

export function ProductExplorer() {
  const [active, setActive] = useState(productTabs[0]!.id);
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Very subtle parallax moving the image slightly down as user scrolls down the section
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  // Suppress scroll-driven override for a short window after a manual click,
  // so the user has time to read the selected product before scroll takes over.
  const suppressScrollRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── scroll-driven activation ── */
  useEffect(() => {
    const onScroll = () => {
      if (suppressScrollRef.current) return;

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const scrollable = wrapperHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / scrollable);
      const index = Math.min(
        productTabs.length - 1,
        Math.floor(progress * productTabs.length)
      );

      if (index !== activeIndex) {
        setActiveIndex(index);
        setActive(productTabs[index]!.id);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [activeIndex]);

  /* ── click handler: update visuals only, no page scroll ── */
  const handleTabClick = (id: string, index: number) => {
    if (index === activeIndex) return;

    setActive(id);
    setActiveIndex(index);

    // Suppress scroll-driven override for 2 s so the user can read
    // the clicked product without scroll immediately snapping it back.
    suppressScrollRef.current = true;
    if (suppressTimerRef.current) clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressScrollRef.current = false;
    }, 2000);
  };

  // Total wrapper height: each tab gets 100vh of scroll room
  const wrapperHeight = `${productTabs.length * 100}vh`;

  return (
    <div ref={wrapperRef} style={{ height: wrapperHeight }} className="relative">
      {/*
        Sticky container:
        - `sticky top-0`  → pins while parent wrapper is in view
        - `[overflow:clip]` → clips decorative overflows without creating a scrollbar track
        - `min-h-screen`  → always fills the viewport but never clips children
      */}
      <div className="sticky top-0 min-h-screen flex items-center bg-[var(--bg-canvas)] [overflow:clip]">
        <Container className="w-full py-14 sm:py-16">
          {/* ── Section heading ── */}
          <div className="mx-auto max-w-[800px] text-center">
            <h2 className="text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)]">
              {productExplorer.heading}
            </h2>
            {productExplorer.subhead && (
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
                {productExplorer.subhead}
              </p>
            )}
          </div>

          {/* ── Two-column body ── */}
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14">
            {/* Left: accordion */}
            <div className="flex flex-col md:pt-8 lg:pt-10 pb-4 md:pb-12">
              {productTabs.map((tab, index) => {
                const isActive = tab.id === active;
                const isLast = index === productTabs.length - 1;

                return (
                  <div
                    key={tab.id}
                    className={
                      isLast
                        ? "" // no border on last item
                        : "border-b border-[var(--border-hairline)]"
                    }
                  >
                    <button
                      onClick={() => handleTabClick(tab.id, index)}
                      className="flex min-h-[48px] w-full cursor-pointer items-center justify-between py-3 text-left text-[17px] font-medium sm:text-[19px] transition-colors"
                      style={{
                        color: isActive
                          ? "var(--text-primary)"
                          : "var(--text-secondary)",
                      }}
                    >
                      <span className="flex items-center gap-3">
                        {/* Active indicator dot */}
                        <span
                          className="block h-2 w-2 shrink-0 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: isActive
                              ? "var(--accent)"
                              : "var(--border-hairline)",
                            transform: isActive ? "scale(1.5)" : "scale(1)",
                          }}
                        />
                        {tab.label}
                      </span>

                    </button>

                    {/* Accordion body */}
                    <AnimatePresence initial={false}>
                      {isActive && tab.description && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <p className="pb-4 pr-4 text-[13px] sm:text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-[420px]">
                            {tab.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Progress bar */}
              <div className="mt-5 h-[2px] w-full rounded-full bg-[var(--border-hairline)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[var(--accent)]"
                  style={{ width: progressWidth }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-[var(--text-secondary)]">
                {activeIndex + 1} / {productTabs.length}
              </p>

              <a
                href={productExplorer.cta.href}
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity"
              >
                <PlayCircle className="size-4" />
                {productExplorer.cta.label}
              </a>
            </div>

            {/* Right: image panel — desktop only */}
            <div className="hidden md:block h-full">
              <div className="relative w-full h-full overflow-hidden rounded-l-[var(--radius-lg)] rounded-r-none bg-[var(--bg-surface)] shadow-[-20px_0px_50px_-10px_rgba(0,0,0,0.08)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {productTabImages[active] && (
                      <motion.div className="relative w-full h-full">
                        <img
                          src={productTabImages[active]}
                          alt={`${productTabs.find((t) => t.id === active)?.label} preview`}
                          className="w-full h-full object-cover object-left-top block"
                        />
                        {/* Data Scanline */}
                        <motion.div 
                          className="absolute inset-x-8 h-[2px] bg-[var(--accent)] blur-[1px] shadow-[0_0_12px_2px_var(--accent)]"
                          initial={{ top: "10%", opacity: 0 }}
                          animate={{ top: "90%", opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-[var(--accent)] opacity-[0.05] blur-[60px] pointer-events-none" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
