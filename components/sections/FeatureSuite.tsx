"use client";

import Image from "next/image";
import { AlertTriangle, ShieldCheck, Zap, Check, Eye, BarChart2, EyeOff, Copy, ArrowDown } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, animate, useInView, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  featureSuite,
  featureCards,
  cardsExpensesMock,
  vendorManagementMock,
  financeVisibilityMock,
  poInvoiceMock,
  procurementIntakeMock,
} from "@/lib/content/features";

function CardShell({
  title,
  body,
  className,
  contentClassName = "max-w-[280px]",
  children,
}: {
  title: string;
  body: string;
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-[24px] bg-[var(--bg-surface)] p-8 text-[var(--text-primary)] ${className ?? ""}`}
    >
      <div className={`relative z-10 ${contentClassName}`}>
        <h3 className="text-[22px] font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-secondary)]">{body}</p>
      </div>
      {children}
    </div>
  );
}

// Stagger container for scroll reveal
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      // Extract numeric part and prefix/suffix
      const match = value.match(/^([^0-9]*)([\d,.]+)([^0-9]*)$/);
      if (!match) return;
      const prefix = match[1];
      const numberStr = match[2]!.replace(/,/g, "");
      const suffix = match[3];
      const num = parseFloat(numberStr);

      const controls = animate(0, num, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        onUpdate(v) {
          if (ref.current) {
            const isInt = numberStr.indexOf(".") === -1;
            const formatted = isInt ? Math.round(v).toLocaleString() : v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            ref.current.textContent = `${prefix}${formatted}${suffix}`;
          }
        },
      });
      return controls.stop;
    }
  }, [inView, value]);

  return <span ref={ref}>{value}</span>;
}

export function FeatureSuite() {
  const [cardsExpenses, vendorManagement, financeVisibility, poInvoice, procurementIntake] = featureCards;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="products" className="py-24 sm:py-32 bg-[var(--bg-canvas)]">
      <Container>
        <Reveal className="mx-auto max-w-[800px] text-center mb-20">
          <h2 className="text-[length:var(--fs-h2)] font-semibold text-[var(--text-primary)] tracking-tight">
            {featureSuite.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
            {featureSuite.subhead}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-6"
        >
          {/* ── Top section: Cards & Expenses (left) | Vendor Management + Finance Visibility stacked (right) ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Cards & Expenses — spans full height of the two right cards combined */}
            <motion.div variants={fadeUpItem} className="md:col-span-1 lg:col-span-1">
              <CardShell title={cardsExpenses!.title} body={cardsExpenses!.body} className="h-full min-h-[480px] lg:min-h-0 bg-[radial-gradient(var(--border-hairline)_1px,transparent_1px)] [background-size:20px_20px]">
                {/* Outer scene wrapper — full width, no max-w so card truly centres */}
                <div className="relative mt-48 mx-auto w-full" style={{ height: 270 }}>

                  {/* ── ATM card — centred, taller ── */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-[20px] shadow-[0_15px_35px_-10px_rgba(155,81,224,0.3)]"
                    style={{
                      top: 0,
                      width: "92%",
                      maxWidth: 340,
                      height: 215,
                      background: "linear-gradient(135deg, #8b31d4 0%, #9b3de0 30%, #b44de8 60%, #c760ea 80%, #d070f0 100%)",
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Decorative rings bottom-right */}
                    <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full border-[1.5px] border-white/10" />
                    <div className="absolute -bottom-16 -right-3  h-44 w-44 rounded-full border-[1.5px] border-white/10" />

                    <div className="relative flex h-full flex-col px-5 py-5 z-10">
                      {/* Top: Logo + hide icon */}
                      <div className="flex items-start justify-between">
                        <Image src="/images/villeto-logo.png" alt="Villeto" width={72} height={22} className="object-contain" />
                        <EyeOff className="size-4 text-white" strokeWidth={1.5} />
                      </div>

                      {/* Bottom: pushed to bottom with mt-auto, clears the overlapping floating cards */}
                      <div className="flex flex-col mt-auto pb-8">
                        <div className="mb-4">
                          <div className="text-[10px] font-semibold tracking-[0.12em] text-white/90 uppercase">Card Number</div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[15px] font-medium tracking-[0.08em] text-white">1234 5678 9012 2345</span>
                            <Copy className="size-[13px] text-white/80 shrink-0" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="flex items-end gap-12">
                          <div>
                            <div className="text-[10px] font-semibold tracking-[0.12em] text-white/90 uppercase">Expiry Date</div>
                            <div className="mt-1">
                              <span className="text-[15px] font-medium text-white">12/24</span>
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] font-semibold tracking-[0.12em] text-white/90 uppercase">CVV</div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[15px] font-medium text-white">272</span>
                              <Copy className="size-[13px] text-white/80" strokeWidth={1.5} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── Expenses — far left, heavily overlaps purple card bottom-left ── */}
                  <motion.div
                    className="absolute flex flex-col gap-1 rounded-2xl bg-white py-2.5 px-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--border-hairline)] pointer-events-none"
                    style={{ bottom: 20, left: 0, width: 138 }}
                    initial={{ opacity: 0, x: -20, y: 12 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">{cardsExpensesMock.changeLabel}</span>
                      <div className="flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-[2px] text-[9px] font-bold text-red-500">
                        <ArrowDown className="size-2.5" strokeWidth={2.5} />
                        <span>{cardsExpensesMock.change}</span>
                      </div>
                    </div>
                    <span className="text-[20px] font-extrabold tracking-tight text-[#1a202c] leading-none mt-0.5">
                      <AnimatedNumber value={cardsExpensesMock.amount} />
                    </span>
                    <div className="flex items-end gap-[3px] h-3.5 mt-0.5">
                      {[25, 45, 65, 45, 60].map((h, i) => (
                        <motion.div
                          key={i}
                          className="w-[6px] rounded-[1.5px] bg-[#9ca3af]"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.35 + i * 0.06, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                  </motion.div>

                  {/* ── Successful Transactions — right-side, slightly higher, overlaps card bottom-right ── */}
                  <motion.div
                    className="absolute flex flex-col gap-1 rounded-2xl bg-white py-2.5 px-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[var(--border-hairline)] pointer-events-none"
                    style={{ bottom: 0, right: 0, width: 148 }}
                    initial={{ opacity: 0, x: 20, y: 12 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: 0.4, ease: "easeOut" }}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] font-semibold text-[var(--text-secondary)] whitespace-nowrap">{cardsExpensesMock.transactionsLabel}</span>
                      <div className="flex size-3.5 items-center justify-center shrink-0 rounded-full bg-emerald-100">
                        <Check className="size-2.5 text-emerald-600" />
                      </div>
                    </div>
                    <span className="text-[20px] font-extrabold tracking-tight text-[var(--text-primary)] leading-none mt-0.5">
                      <AnimatedNumber value={cardsExpensesMock.transactions} />
                    </span>
                    <span className="text-[9px] text-[var(--text-secondary)] whitespace-nowrap mt-0.5">{cardsExpensesMock.note}</span>
                  </motion.div>

                </div>
              </CardShell>
            </motion.div>

            {/* Right column: Vendor Management + Finance Visibility stacked */}
            <div className="flex flex-col gap-6 h-full md:col-span-1 lg:col-span-2">
              {/* ── Vendor Management (Dark) ── */}
              <motion.div variants={fadeUpItem} className="flex-1 flex flex-col">
                <div className="relative flex-1 flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-[var(--ink)] text-[var(--ink-foreground)] p-8 min-h-[320px]">
                  {/* Abstract dark waves background */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/images/vendor-management-photo.png"
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-20 mix-blend-screen"
                    />
                    {/* Gradient fade on the left to keep text readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)] via-[var(--ink)]/80 to-transparent" />
                  </div>

                  {/* Text content — top-left */}
                  <div className="relative z-10 max-w-[280px]">
                    <h3 className="text-[22px] font-semibold tracking-tight">{vendorManagement!.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-foreground-soft)]">{vendorManagement!.body}</p>
                  </div>

                  {/* Vendor steps UI — bottom-right anchored */}
                  <div className="absolute bottom-6 right-6 z-10 w-[280px] sm:w-[300px] flex flex-col gap-2">
                    {/* Main Sign Up box */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      className="overflow-hidden rounded-xl border border-[var(--ink-foreground)]/10 bg-[var(--ink-surface)] shadow-2xl"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-center gap-2 border-b border-[var(--ink-foreground)]/10 px-6 py-4">
                        <Image src="/images/villeto-v.png" alt="Villeto" width={16} height={16} className="object-contain" />
                        <span className="text-[13px] font-semibold text-[var(--accent)]">Villeto</span>
                      </div>
                      <div className="text-center text-[15px] font-semibold text-[var(--ink-foreground)]">{vendorManagementMock.step}</div>
                      <div className="text-center text-[11px] text-[var(--ink-foreground-soft)]">{vendorManagementMock.stepDetail}</div>
                    </motion.div>

                    {/* Staggered checklist */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
                      }}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex flex-col gap-2"
                    >
                      {vendorManagementMock.checklist.map((step) => (
                        <motion.div
                          key={step}
                          variants={{
                            hidden: { opacity: 0, x: 20 },
                            show: { opacity: 1, x: 0 }
                          }}
                          className="flex items-center justify-between rounded-xl border border-[var(--ink-border)] bg-[var(--ink-surface)]/50 px-4 py-3 backdrop-blur-md"
                        >
                          <span className="text-[13px] font-medium text-[var(--ink-foreground-soft)]">{step}</span>
                          <svg viewBox="0 0 24 24" className="size-4 text-[var(--accent)]">
                            <motion.path 
                              d="M20 6L9 17l-5-5" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            />
                          </svg>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* ── Finance Visibility ── */}
              <motion.div variants={fadeUpItem} className="flex-1 flex flex-col">
                <CardShell 
                  title={financeVisibility!.title} 
                  body={financeVisibility!.body} 
                  className="flex-1 min-h-[320px] bg-[radial-gradient(var(--border-hairline)_1px,transparent_1px)] [background-size:20px_20px]"
                  contentClassName="max-w-none sm:max-w-[500px]"
                >
                  {/* Floating tags — stagger in sequentially */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                    className="absolute top-[140px] left-[15%] sm:left-[25%] flex items-center gap-1.5 rounded-full bg-purple-50 px-3.5 py-1.5 text-[12px] font-semibold text-purple-700 shadow-sm border border-purple-100/50"
                  >
                    <span>👁️</span> Full Audit Trail
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: 0.32, duration: 0.5, ease: "easeOut" }}
                    className="absolute top-[120px] right-[5%] sm:right-[10%] flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-[12px] font-semibold text-blue-700 shadow-sm border border-blue-100/50"
                  >
                    <span>📊</span> Real-time Visibility
                  </motion.div>

                  {/* Bottom-anchored stats panel — stagger children */}
                  <motion.div
                    className="absolute bottom-4 left-1/2 w-[94%] -translate-x-1/2 max-w-[560px] rounded-[18px] bg-white shadow-xl shadow-black/5 p-3 flex gap-2 sm:gap-3 z-10"
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.45 } }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    {/* 1st card */}
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
                      className="flex-1 rounded-xl bg-slate-50 p-3 sm:p-4 flex flex-col justify-center"
                    >
                      <div className="text-[11px] sm:text-[12px] font-bold text-slate-800">Total Spend</div>
                      <div className="mt-2 flex items-center gap-1.5 text-[15px] sm:text-[17px] font-bold text-black">
                        <div className="flex size-4 items-center justify-center rounded-full bg-slate-300 text-[9px] font-bold text-white">$</div>
                        <AnimatedNumber value="$2.4M" />
                      </div>
                    </motion.div>

                    {/* 2nd card */}
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
                      className="flex-1 rounded-xl bg-slate-50 p-3 sm:p-4 flex flex-col justify-center"
                    >
                      <div className="text-[11px] sm:text-[12px] font-bold text-slate-800">Exceptions Flagged</div>
                      <div className="mt-2 flex items-center gap-1.5 text-[15px] sm:text-[17px] font-bold text-black">
                        <span className="text-[12px]">🚩</span>
                        <AnimatedNumber value="18" />
                      </div>
                    </motion.div>

                    {/* 3rd card */}
                    <motion.div
                      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }}
                      className="relative flex-1 rounded-xl bg-slate-50 p-3 sm:p-4 flex flex-col justify-center"
                    >
                      <div className="text-[11px] sm:text-[12px] font-bold text-slate-800">
                        Policy <span className="text-red-600">Violations</span>
                      </div>
                      <div className="mt-2 text-[15px] sm:text-[17px] font-bold text-red-600">
                        <AnimatedNumber value="3" />
                      </div>
                      <AlertTriangle className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 size-6 sm:size-7 text-red-600 fill-red-100" strokeWidth={2} />
                    </motion.div>
                  </motion.div>
                </CardShell>
              </motion.div>
            </div>
          </div>

          {/* ── Bottom row: PO Invoice + Procurement Intake ── */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            <motion.div variants={fadeUpItem} className="md:col-span-1 lg:col-span-2 h-[420px] sm:h-[320px]">
              <CardShell title={poInvoice!.title} body={poInvoice!.body} className="bg-[radial-gradient(var(--border-hairline)_1px,transparent_1px)] [background-size:20px_20px]">
                
                {/* SOC 2 Badge */}
                <div className="absolute right-4 bottom-[210px] sm:right-8 sm:bottom-[150px] z-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-1.5 rounded-full bg-green-50/80 backdrop-blur-sm px-3.5 py-1.5 text-[12px] font-bold text-green-700 shadow-sm border border-green-100"
                  >
                    <span>🔒</span> SOC 2 Secured
                  </motion.div>
                </div>

                {/* Bottom Panel */}
                <div className="absolute bottom-0 right-4 sm:right-8 w-[92%] sm:w-auto sm:min-w-[520px] max-w-[600px] h-auto min-h-[130px] sm:h-[140px] rounded-t-[24px] bg-white pt-5 sm:pt-8 pb-5 sm:pb-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] border border-[var(--border-hairline)] border-b-0 overflow-hidden">
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex w-full flex-wrap sm:flex-nowrap sm:justify-between gap-3 sm:gap-4 px-4 sm:px-6"
                  >
                    {poInvoiceMock.stats.map((s) => (
                      <motion.div key={s.label} variants={fadeUpItem} className="flex flex-col gap-1 min-w-[120px] sm:min-w-0 flex-1 bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100/50 p-4">
                        <span className="text-[12px] font-medium text-[var(--text-secondary)] whitespace-nowrap text-left">{s.label}</span>
                        <span className="text-[18px] sm:text-[22px] font-bold text-[var(--text-primary)] text-left">
                          <AnimatedNumber value={s.value} />
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </CardShell>
            </motion.div>

          {/* ── Procurement Intake (Bottom Right) ── */}
          <motion.div variants={fadeUpItem} className="md:col-span-1 lg:col-span-1 h-[350px] sm:h-[320px]">
            <CardShell title={procurementIntake!.title} body={procurementIntake!.body} className="bg-[radial-gradient(var(--border-hairline)_1px,transparent_1px)] [background-size:20px_20px]">
              
              {/* Floating Fast Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute z-20 left-6 sm:left-8 bottom-[105px] flex items-center gap-1.5 rounded-full bg-[#f59e0b] px-4 py-1.5 text-[14px] font-bold text-white shadow-md"
              >
                <Zap className="size-4 fill-current" /> Fast
              </motion.div>

              {/* Gray Table Container — slides up on scroll */}
              <motion.div
                className="absolute bottom-0 right-0 left-10 sm:left-12 h-[120px] rounded-tl-[24px] bg-[#f1f3f4] border-t border-l border-white/60 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.25, duration: 0.55, ease: "easeOut" }}
              >
                {/* Tabs — stagger each tab in */}
                <motion.div
                  className="flex flex-nowrap gap-3 sm:gap-5 border-b border-gray-200/60 px-4 sm:px-6 pt-4 pb-3 text-[11px] sm:text-[12px] font-medium text-gray-400 overflow-hidden"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.45 } } }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {["All Requests", "Submitted", "Awaiting Review", "Appr"].map((tab, i) => (
                    <motion.span
                      key={tab}
                      variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } } }}
                      className={i === 0 ? "rounded-[8px] bg-white px-2.5 sm:px-3 py-1 text-gray-700 shadow-sm whitespace-nowrap" : "py-1 whitespace-nowrap"}
                    >
                      {tab}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Table Headers — fade in after tabs */}
                <motion.div
                  className="flex justify-between px-4 sm:px-6 pt-4 text-[11px] sm:text-[12px] font-bold text-gray-500 overflow-hidden gap-2"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.8 } } }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  {["Request ID", "Request Title", "Requester"].map((h) => (
                    <motion.span
                      key={h}
                      variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } } }}
                      className="whitespace-nowrap"
                    >
                      {h}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </CardShell>
          </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
