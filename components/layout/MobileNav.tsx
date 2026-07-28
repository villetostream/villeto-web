"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { navLinks, navCtas, navMegaTriggers } from "@/lib/content/nav";
import { productNavItems, solutionNavItems } from "@/lib/content/mega-nav";
import { iconMap } from "@/lib/icon-map";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";

const groups: Record<"products" | "solutions", typeof productNavItems> = {
  products: productNavItems,
  solutions: solutionNavItems,
};

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<"products" | "solutions" | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-[var(--bg-canvas)] md:hidden"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={onClose} className="relative flex overflow-hidden w-[150px] h-[48px] -ml-2">
              <Image src="/images/villeto-logo.png" alt="Villeto" fill className="object-contain scale-[2.2] object-center" priority />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="flex size-11 items-center justify-center rounded-full border border-[var(--border-hairline)] text-[var(--text-primary)]"
            >
              <X className="size-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-4 pb-6">
            {navMegaTriggers.map((trigger) => (
              <div key={trigger.key} className="border-b border-[var(--border-hairline)]">
                <button
                  className="flex min-h-[52px] w-full items-center justify-between px-2 text-left text-[16px] font-medium text-[var(--text-primary)]"
                  onClick={() => setExpanded((prev) => (prev === trigger.key ? null : trigger.key))}
                  aria-expanded={expanded === trigger.key}
                >
                  {trigger.label}
                  <ChevronDown
                    className={`size-4 shrink-0 transition-transform duration-200 ${expanded === trigger.key ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {expanded === trigger.key && (
                    <motion.div
                      initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-1 pb-3">
                        {groups[trigger.key].map((item) => {
                          const Icon = iconMap[item.icon] as React.ElementType;
                          return (
                            <Link
                              key={item.slug}
                              href={`/${trigger.key}/${item.slug}`}
                              onClick={onClose}
                              className="flex items-start gap-3 rounded-[var(--radius-md)] px-2 py-2.5 active:bg-[var(--bg-surface)]"
                            >
                              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent-soft)] text-[var(--accent-text)]">
                                <Icon className="size-4" strokeWidth={2} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[14px] font-semibold text-[var(--text-primary)]">
                                  {item.title}
                                </span>
                                <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--text-secondary)]">
                                  {item.description}
                                </span>
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="flex min-h-[52px] items-center border-b border-[var(--border-hairline)] px-2 text-[16px] font-medium text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-[var(--border-hairline)] px-6 py-5">
            <div className="flex items-center justify-between">
              <Link href={navCtas.signIn.href} onClick={onClose} className="text-[15px] font-medium text-[var(--text-primary)]">
                {navCtas.signIn.label}
              </Link>
              <ThemeToggle />
            </div>
            <Button href={navCtas.demo.href} variant="secondary" size="lg" onClick={onClose} className="w-full">
              {navCtas.demo.label}
            </Button>
            <Button href={navCtas.primary.href} variant="primary" size="lg" onClick={onClose} className="w-full">
              {navCtas.primary.label}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
