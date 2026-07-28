"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { navLinks, navCtas, navMegaTriggers, brand } from "@/lib/content/nav";
import { productNavItems, solutionNavItems } from "@/lib/content/mega-nav";

const groups = { products: productNavItems, solutions: solutionNavItems };

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<"products" | "solutions" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  // lock body scroll while the mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Placeholder to prevent layout shift when header shrinks/becomes fixed */}
      <div className="h-[84px] w-full bg-[var(--bg-canvas)]" />
      
      <header
        ref={headerRef}
        data-scrolled={scrolled}
        className="site-header fixed top-0 inset-x-0 z-[60] w-full border-b border-transparent bg-[var(--bg-canvas)]/90 backdrop-blur-md transition-all duration-300"
      >
        <Container className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-[64px]" : "h-[84px]"}`}>
          <Link href="/" className="relative flex shrink-0 items-center overflow-hidden w-[150px] h-[48px] -ml-2 transition-transform duration-300 hover:scale-[1.03]">
            <Image src="/images/villeto-logo.png" alt={brand.name} fill sizes="120px" className="object-contain scale-[2.2] object-center" priority />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navMegaTriggers.map((trigger) => (
              <div key={trigger.key} className="relative">
                <button
                  className="group relative flex items-center gap-1 cursor-pointer rounded-[var(--radius-sm)] px-3 py-2 text-[14px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                  onClick={() => setOpenMenu((prev) => (prev === trigger.key ? null : trigger.key))}
                  aria-expanded={openMenu === trigger.key}
                >
                  {trigger.label}
                  <ChevronDown
                    className={`size-3.5 transition-transform duration-300 ${openMenu === trigger.key ? "rotate-180 text-[var(--accent)]" : "group-hover:text-[var(--accent)]"}`}
                  />
                  <span className={`absolute -bottom-0.5 left-3 right-3 h-[1.5px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out ${openMenu === trigger.key ? "scale-x-100" : "group-hover:scale-x-100"}`} />
                </button>
                <AnimatePresence>
                {openMenu === trigger.key && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-[var(--radius-lg)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_24px_48px_-16px_rgba(10,15,13,0.25)]">
                      <MegaMenu
                        items={groups[trigger.key]}
                        basePath={trigger.key}
                        onNavigate={() => setOpenMenu(null)}
                      />
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
                onClick={() => setOpenMenu(null)}
                className="group relative rounded-[var(--radius-sm)] px-3 py-2 text-[14px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-3 right-3 h-[1.5px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href={navCtas.signIn.href} className="group relative px-2 text-[14px] font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
              {navCtas.signIn.label}
              <span className="absolute -bottom-1 left-2 right-2 h-[1.5px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
            <div className="transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] rounded-md">
              <Button href={navCtas.primary.href} variant="primary" size="sm">
                {navCtas.primary.label}
              </Button>
            </div>
          </div>

          <button
            className="flex size-10 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-primary)] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
