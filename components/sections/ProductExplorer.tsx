"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Landmark,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { productExplorer, productTabs, productTabImages } from "@/lib/content/products";

const iconMap = {
  "expense-management": ReceiptText,
  policies: ShieldCheck,
  procurement: ShoppingCart,
  "vendor-management": Building2,
  billpay: Landmark,
};

const productDetails: Record<string, string[]> = {
  "expense-management": ["Capture receipts at the transaction", "Route exceptions to the right owner", "Keep card and reimbursement spend together"],
  policies: ["Set limits by team, role, or category", "Evaluate rules before approval", "Record every exception and decision"],
  procurement: ["Standardize purchase requests", "Connect budgets and approvers", "Track the request through fulfillment"],
  "vendor-management": ["Collect vendor details once", "Track compliance and ownership", "Keep contracts and payments connected"],
  billpay: ["Match invoices to commitments", "Schedule approved payments", "See payment status from one record"],
};

export function ProductExplorer() {
  const [active, setActive] = useState(productTabs[0]?.id ?? "expense-management");
  const activeIndex = productTabs.findIndex((tab) => tab.id === active);
  const activeTab = productTabs[activeIndex] ?? productTabs[0]!;
  const activeImage = productTabImages[active] ?? productTabImages["expense-management"]!;

  return (
    <section id="workflow" className="bg-[var(--bg-surface)] py-20 sm:py-28">
      <Container>
        <Reveal className="grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <p className="text-[11px] font-semibold uppercase text-[var(--accent-text)]">Product workflow</p>
          <div>
            <h2 className="max-w-[700px] text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)]">{productExplorer.heading}</h2>
            <p className="mt-4 max-w-[680px] text-[16px] leading-7 text-[var(--text-secondary)]">{productExplorer.subhead}</p>
          </div>
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-[14px] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_30px_70px_-50px_rgba(5,20,15,0.5)]">
          <div className="overflow-x-auto border-b border-[var(--border-hairline)]" role="tablist" aria-label="Villeto products">
            <div className="grid min-w-[820px] grid-cols-5">
              {productTabs.map((tab, index) => {
                const Icon = iconMap[tab.id as keyof typeof iconMap];
                const selected = tab.id === active;
                return (
                  <button key={tab.id} type="button" role="tab" onClick={() => setActive(tab.id)} aria-selected={selected} className={`relative flex min-h-[72px] items-center gap-2 border-r border-[var(--border-hairline)] px-4 text-left last:border-r-0 ${selected ? "bg-[var(--accent-soft)]/55" : "hover:bg-[var(--bg-surface)]"}`}>
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-[7px] ${selected ? "bg-[var(--accent)] text-[var(--accent-contrast)]" : "bg-[var(--bg-surface)] text-[var(--text-secondary)]"}`}>{Icon && <Icon className="size-3.5" />}</span>
                    <span><span className="block text-[8px] font-semibold text-[var(--text-secondary)]">0{index + 1}</span><span className={`block whitespace-nowrap text-[10px] font-semibold ${selected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>{tab.label}</span></span>
                    {selected && <motion.span layoutId="product-tab" className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)]" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid md:min-h-[520px] md:grid-cols-[0.38fr_0.62fr]">
            <div className="flex flex-col border-b border-[var(--border-hairline)] p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>
                  <span className="text-[10px] font-semibold uppercase text-[var(--accent-text)]">Module {activeIndex + 1} of {productTabs.length}</span>
                  <h3 className="mt-4 text-[26px] font-semibold leading-tight text-[var(--text-primary)]">{activeTab.label}</h3>
                  <p className="mt-4 text-[14px] leading-6 text-[var(--text-secondary)]">{activeTab.description}</p>
                  <ul className="mt-7 space-y-3">
                    {(productDetails[active] ?? []).map((detail) => <li key={detail} className="flex items-start gap-2.5 text-[11px] leading-5 text-[var(--text-primary)]"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />{detail}</li>)}
                  </ul>
                </motion.div>
              </AnimatePresence>
              <a href={productExplorer.cta.href} className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--accent-text)] md:mt-auto">{productExplorer.cta.label}<ArrowRight className="size-4" /></a>
            </div>

            <div className="relative min-h-[380px] overflow-hidden bg-[#f3f6f5] sm:min-h-[460px] md:min-h-0">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(10,15,13,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,15,13,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={active} initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.99 }} transition={{ duration: 0.35 }} className="absolute inset-4 overflow-hidden rounded-[10px] border border-black/[0.07] bg-white shadow-[0_24px_60px_-35px_rgba(5,20,15,0.55)] sm:inset-7">
                  <Image src={activeImage} alt={`${activeTab.label} workspace preview`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-contain object-center" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
