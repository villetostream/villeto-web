"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { brand, navCtas, navMegaTriggers } from "@/lib/content/nav";
import type { NavMenuKey } from "@/lib/content/mega-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<NavMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const activeMenu: NavMenuKey | null = pathname.startsWith("/products")
    ? "products"
    : pathname.startsWith("/solutions")
      ? "solutions"
      : null;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const showMenu = (menu: NavMenuKey) => {
    cancelClose();
    setOpenMenu(menu);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpenMenu(null);
    const onClick = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => () => cancelClose(), []);

  return (
    <>
      <div className="h-[72px] w-full bg-[var(--bg-canvas)]" />

      <header
        ref={headerRef}
        data-scrolled={scrolled}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) scheduleClose();
        }}
        className={`site-header fixed inset-x-0 top-0 z-[60] w-full border-b bg-[var(--bg-canvas)]/95 backdrop-blur-xl transition-colors duration-200 ${scrolled || openMenu ? "border-[var(--border-hairline)]" : "border-transparent"}`}
      >
        <Container className={`flex items-center justify-between transition-[height] duration-200 ${scrolled ? "h-[64px]" : "h-[72px]"}`}>
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
            <Image src="/images/villeto-v.png" alt="" width={28} height={31} className="h-[31px] w-[28px]" priority />
            <span className="text-[19px] font-semibold text-[var(--text-primary)]">{brand.name}</span>
          </Link>

          <nav className="hidden h-full items-center md:flex" aria-label="Primary navigation">
            {navMegaTriggers.map((trigger) => {
              const selected = openMenu === trigger.key;
              const active = activeMenu === trigger.key;
              return (
                <button
                  key={trigger.key}
                  type="button"
                  className={`group relative flex h-full items-center gap-1.5 px-4 text-[13px] font-medium transition-colors focus-visible:outline-none ${selected || active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}
                  onMouseEnter={() => showMenu(trigger.key)}
                  onFocus={() => showMenu(trigger.key)}
                  onClick={() => showMenu(trigger.key)}
                  aria-expanded={selected}
                  aria-controls={`mega-menu-${trigger.key}`}
                  aria-current={active ? "page" : undefined}
                >
                  {trigger.label}
                  <ChevronDown className={`size-3.5 transition-transform duration-200 ${selected ? "rotate-180 text-[var(--accent-text)]" : "group-hover:text-[var(--accent-text)]"}`} />
                  <span className={`absolute inset-x-4 bottom-0 h-0.5 bg-[var(--accent)] transition-transform duration-200 ${selected || active ? "scale-x-100" : "scale-x-0"}`} />
                </button>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link href={navCtas.signIn.href} className="rounded-[6px] text-[13px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]">
              {navCtas.signIn.label}
            </Link>
            <Button href={navCtas.primary.href} variant="primary" size="sm" className="rounded-[8px] px-4">
              {navCtas.primary.label}
            </Button>
          </div>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-[8px] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-surface)] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </Container>

        <AnimatePresence>
          {openMenu && (
            <motion.div
              id={`mega-menu-${openMenu}`}
              initial={reduceMotion ? undefined : { opacity: 0, y: 6 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 4 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="absolute inset-x-0 top-full hidden px-6 pt-2 md:flex md:justify-center"
            >
              <div className="w-full max-w-[920px] overflow-hidden rounded-[8px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_24px_64px_-28px_rgba(5,20,15,0.45)]">
                <MegaMenu menuKey={openMenu} onNavigate={() => setOpenMenu(null)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
