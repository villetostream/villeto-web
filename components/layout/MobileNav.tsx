"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { brand, navCtas, navMegaTriggers } from "@/lib/content/nav";
import { getMegaNavHref, megaNavMenus, type NavMenuKey } from "@/lib/content/mega-nav";
import { iconMap } from "@/lib/icon-map";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<NavMenuKey | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return;
    }
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-[var(--bg-canvas)] md:hidden"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--border-hairline)] px-6">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
              <Image src="/images/villeto-v.png" alt="" width={28} height={31} className="h-[31px] w-[28px]" priority />
              <span className="text-[19px] font-semibold text-[var(--text-primary)]">{brand.name}</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                autoFocus
                className="flex size-10 items-center justify-center rounded-[8px] border border-[var(--border-hairline)] text-[var(--text-primary)]"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          <nav className="flex flex-1 flex-col px-5 py-4" aria-label="Mobile navigation">
            {navMegaTriggers.map((trigger) => {
              const menu = megaNavMenus[trigger.key];
              const isExpanded = expanded === trigger.key;
              return (
                <div key={trigger.key} className="border-b border-[var(--border-hairline)]">
                  <button
                    type="button"
                    className="flex min-h-[58px] w-full items-center justify-between px-1 text-left text-[16px] font-semibold text-[var(--text-primary)]"
                    onClick={() => setExpanded((current) => (current === trigger.key ? null : trigger.key))}
                    aria-expanded={isExpanded}
                    aria-controls={`mobile-menu-${trigger.key}`}
                  >
                    {trigger.label}
                    <ChevronDown className={`size-4 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[var(--accent-text)]" : "text-[var(--text-secondary)]"}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={`mobile-menu-${trigger.key}`}
                        initial={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4">
                          {menu.groups.map((group) => (
                            <div key={group.label} className="mb-4 last:mb-2">
                              <p className="mb-1 px-1 text-[10px] font-semibold uppercase text-[var(--text-secondary)]">{group.label}</p>
                              <div className="space-y-0.5">
                                {group.items.map((item) => {
                                  const Icon = iconMap[item.icon] as React.ElementType;
                                  return (
                                    <Link
                                      key={item.slug}
                                      href={getMegaNavHref(trigger.key, item)}
                                      onClick={onClose}
                                      className="flex items-center gap-3 rounded-[8px] px-1 py-2.5 active:bg-[var(--bg-surface)]"
                                    >
                                      <span className="flex size-8 shrink-0 items-center justify-center rounded-[7px] bg-[var(--accent-soft)] text-[var(--accent-text)]">
                                        <Icon className="size-4" strokeWidth={2} />
                                      </span>
                                      <span className="text-[14px] font-medium text-[var(--text-primary)]">{item.title}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                          <Link href={menu.feature.href} onClick={onClose} className="inline-flex items-center gap-2 px-1 text-[12px] font-semibold text-[var(--accent-text)]">
                            {menu.feature.label}
                            <ArrowUpRight className="size-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-[var(--border-hairline)] px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[12px] text-[var(--text-secondary)]">Already use Villeto?</p>
              <Link href={navCtas.signIn.href} onClick={onClose} className="text-[13px] font-semibold text-[var(--text-primary)]">
                {navCtas.signIn.label}
              </Link>
            </div>
            <Button href={navCtas.primary.href} variant="primary" size="lg" onClick={onClose} className="w-full rounded-[8px]">
              {navCtas.primary.label}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
