"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Building2,
  CreditCard,
  Landmark,
  Layers3,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { productArchitecture, productExplorer } from "@/lib/content/products";

const iconMap = {
  procurement: ShoppingCart,
  vendor: Building2,
  expenses: CreditCard,
  billpay: Landmark,
  ledger: BookOpen,
};

export function ProductExplorer() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="workflow" className="bg-[#edf2f0] py-20 text-[#111714] sm:py-28">
      <Container>
        <Reveal className="grid gap-5 md:grid-cols-[0.72fr_1.28fr] md:items-end">
          <p className="text-[11px] font-semibold uppercase text-[#087f70]">Product architecture</p>
          <div>
            <h2 className="max-w-[700px] text-[length:var(--fs-h2)] font-semibold">{productExplorer.heading}</h2>
            <p className="mt-4 max-w-[640px] text-[15px] leading-6 text-[#53605a]">{productExplorer.subhead}</p>
          </div>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-[8px] border border-black/[0.1] bg-white shadow-[0_32px_80px_-58px_rgba(5,20,15,0.5)]">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {productArchitecture.map((product, index) => {
              const Icon = iconMap[product.icon];
              return (
                <Link
                  key={product.id}
                  href={product.href}
                  className="group relative flex min-h-[210px] flex-col border-b border-r border-black/[0.08] p-4 transition-colors hover:bg-[#f4f7f6] sm:p-5 md:min-h-[250px] md:border-b-0 md:last:border-r-0 [&:nth-child(2n)]:border-r-0 [&:nth-child(2n)]:md:border-r last:col-span-2 last:md:col-span-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-[7px] bg-[#e6f5f2] text-[#087f70]"><Icon className="size-4.5" /></span>
                    <span className="text-[10px] font-semibold text-[#7a8580]">0{index + 1}</span>
                  </div>
                  <div className="mt-auto pt-8">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-[15px] font-semibold leading-tight">{product.name}</h3>
                      <ArrowRight className="size-3.5 text-[#087f70] transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-2 text-[11px] leading-[1.55] text-[#66716c]">{product.scope}</p>
                    <div className="mt-4 flex items-start gap-2 border-t border-black/[0.07] pt-3">
                      <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-[#087f70]" />
                      <span className="text-[10px] leading-4 text-[#53605a]">{product.policy}</span>
                    </div>
                  </div>
                  <span className="absolute bottom-[-17px] left-1/2 z-10 hidden size-8 -translate-x-1/2 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#087f70] md:flex">
                    <ArrowDown className="size-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="relative border-t border-black/[0.08] bg-[#0d1512] px-5 py-8 text-white sm:px-7 md:px-9 md:py-11">
            <motion.span
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute left-[10%] right-[10%] top-0 hidden h-px origin-left bg-[#55d7c4] md:block"
            />
            <div className="grid gap-9 md:grid-cols-[0.86fr_1.14fr] md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[#17342e] text-[#72dece]"><Layers3 className="size-5" /></span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase text-[#72dece]">Policy-aware control layer</p>
                    <p className="mt-1 text-[18px] font-semibold leading-tight">Context becomes a governed decision.</p>
                  </div>
                </div>
                <p className="mt-4 max-w-[410px] text-[12px] leading-5 text-white/55">The system understands the request, vendor, budget, role, and transaction before applying the right rule.</p>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                  {productExplorer.foundation.map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-[10px] text-white/55"><span className="size-1 rounded-full bg-[#55d7c4]" />{item}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 border-y border-white/10 sm:border-y-0 sm:border-l">
                {productExplorer.policyFlow.map((item, index) => (
                  <div key={item.title} className="relative min-w-0 border-r border-white/10 px-3 py-5 last:border-r-0 sm:px-4">
                    <span className="text-[9px] font-semibold text-[#72dece]">0{index + 1}</span>
                    <p className="mt-3 text-[12px] font-semibold">{item.title}</p>
                    <p className="mt-2 text-[10px] leading-4 text-white/45">{item.detail}</p>
                    {index < productExplorer.policyFlow.length - 1 && (
                      <span className="absolute -right-2.5 top-1/2 z-10 hidden size-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#17342e] text-[#72dece] sm:flex"><ArrowRight className="size-3" /></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </Reveal>

        <div className="mt-6 flex justify-end">
          <a href={productExplorer.cta.href} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#087f70]">
            {productExplorer.cta.label}<ArrowRight className="size-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
