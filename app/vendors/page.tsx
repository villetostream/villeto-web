import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HelpCircle,
  Layers,
  MessageSquare,
  Package,
  Receipt,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VendorPortalInteractive } from "@/components/sections/VendorPortalInteractive";
import { VendorFaqAccordion } from "@/components/sections/VendorFaqAccordion";

export const metadata: Metadata = {
  title: "Vendor Portal — Manage Purchase Orders, Invoices & Payments",
  description:
    "Villeto is the B2B vendor portal that connects suppliers with buyer organizations. Manage purchase orders, track fulfillment, submit invoices, and get paid — all from one verified dashboard.",
  alternates: {
    canonical: "/vendors",
  },
  keywords: [
    "vendor portal",
    "B2B vendor management",
    "purchase order management for vendors",
    "vendor invoice tracking",
    "supplier onboarding platform",
    "multi-company vendor dashboard",
    "CAC verification",
  ],
  openGraph: {
    title: "Stop chasing purchase orders. Start running your vendor business.",
    description:
      "One verified portal to manage every buyer relationship — from the first purchase order to the final payment.",
    url: "/vendors",
  },
};

export default function VendorPortalPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-canvas)]">
      {/* ── 1. Hero Section: High-Impact 2-Column Split ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[var(--bg-canvas)] via-[var(--bg-surface)] to-[var(--bg-canvas)] border-b border-[var(--border-hairline)] pt-12 pb-16 sm:pt-16 sm:pb-24">
        {/* Teal radial glow for depth in dark mode */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[650px]"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% -5%, rgba(45,212,191,0.12), transparent)",
          }}
        />

        <Container className="relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            {/* Left Column: Copy & Actions */}
            <div className="flex flex-col text-left">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1 text-[12px] font-semibold tracking-wide text-teal-300 shadow-xs">
                  <span className="size-2 rounded-full bg-teal-400 animate-pulse" />
                  <span>Free for Suppliers · Single Verified Portal</span>
                </div>
              </div>

              <h1 className="mt-5 text-[clamp(2.2rem,3.4vw,3.35rem)] font-semibold leading-[1.12] tracking-tight text-[var(--text-primary)]">
                Stop chasing purchase orders.{" "}
                <span className="block mt-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-200 bg-clip-text text-transparent">
                  Start running your vendor business.
                </span>
              </h1>

              <p className="mt-5 max-w-[50ch] text-[16.5px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]">
                Villeto gives you one verified portal to manage every buyer relationship — from line-item PO fulfillment to 3-way matched invoice settlement. No scattered emails. No spreadsheet chaos.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Button
                  href="https://app.villeto.com/login"
                  size="lg"
                  className="shadow-lg shadow-teal-500/15"
                >
                  Sign In to Vendor Portal
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  href="https://app.villeto.com/signup"
                  variant="secondary"
                  size="lg"
                >
                  Register as Supplier
                </Button>
              </div>

              {/* Trust Micro-Bullets */}
              <div className="mt-7 flex flex-wrap items-center gap-y-2 gap-x-5 text-[12.5px] text-[var(--text-secondary)]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-teal-400 shrink-0" />
                  <span>CAC & TIN Verified Once</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-teal-400 shrink-0" />
                  <span>Automated 3-Way Matching</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5 text-teal-400 shrink-0" />
                  <span>Scheduled Bank Payouts</span>
                </span>
              </div>
            </div>

            {/* Right Column: Live Interactive Workspace Widget */}
            <div className="w-full">
              <VendorPortalInteractive />
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. The Problem: "The Vendor's Daily Reality" ── */}
      <section className="py-20 sm:py-28 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-red-500">
              The Vendor&apos;s Daily Reality
            </span>
            <h2 className="mt-3 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
              Sound familiar?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
              You receive a purchase order over email on Monday. By Wednesday, you&apos;re texting the buyer on WhatsApp to confirm quantities. By Friday, you&apos;re digging through your inbox to find the delivery address. By next month, your invoice is sitting in someone&apos;s approval queue — and you have no idea whose.
            </p>
            <p className="mt-2.5 text-[16px] font-medium text-[var(--text-primary)]">
              Now multiply that by five different buyers. Each with their own paperwork and payment timeline.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[960px] mx-auto">
            {/* The Chaotic Old Way */}
            <Reveal delay={0.05}>
              <div className="h-full rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-7 sm:p-8">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold text-[14px]">
                  <span className="flex size-6 items-center justify-center rounded-full bg-red-500/10 text-xs">✕</span>
                  The Traditional Friction
                </div>
                <ul className="mt-5 space-y-3 text-[14px] text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span>Scattered purchase orders across Outlook, Gmail, and WhatsApp groups.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span>Re-submitting incorporation certificates and bank forms for every buyer.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span>Zero visibility into whether your invoice was approved, disputed, or lost.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-500 font-bold mt-0.5">•</span>
                    <span>Awkward follow-up phone calls asking &quot;When will payment drop?&quot;</span>
                  </li>
                </ul>
              </div>
            </Reveal>

            {/* The Villeto Way */}
            <Reveal delay={0.1}>
              <div className="h-full rounded-2xl border border-teal-500/30 bg-teal-500/[0.03] p-7 sm:p-8">
                <div className="flex items-center gap-2 text-teal-400 font-semibold text-[14px]">
                  <span className="flex size-6 items-center justify-center rounded-full bg-teal-500/10 text-xs">✓</span>
                  The Villeto Vendor Pipeline
                </div>
                <ul className="mt-5 space-y-3 text-[14px] text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-400 font-bold mt-0.5">•</span>
                    <span>One verified dashboard aggregating every order across all buyer relationships.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-400 font-bold mt-0.5">•</span>
                    <span>Verify your CAC & TIN once — connect to new buyers in two minutes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-400 font-bold mt-0.5">•</span>
                    <span>Line-item fulfillment acknowledgment with live carrier tracking sync.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-teal-400 font-bold mt-0.5">•</span>
                    <span>Transparent 4-stage invoice pipeline with exact scheduled settlement dates.</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 3. How It Works: "From Invitation to Income in 4 Steps" ── */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Operational Simplicity
            </span>
            <h2 className="mt-3 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
              From Invitation to Income in 4 Steps
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
              A transparent, automated pipeline that removes the friction from B2B supplier transactions.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <Reveal delay={0.04}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 shadow-xs">
                <div>
                  <span className="font-display text-[30px] font-bold text-teal-400">
                    01
                  </span>
                  <div className="mt-3 flex items-center gap-2">
                    <ShieldCheck className="size-4.5 text-teal-400" />
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                      Accept & Verify
                    </h3>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                    Receive your buyer&apos;s invitation. Accept with one click and confirm your business identity. If you&apos;ve verified before, your CAC, TIN, and corporate credentials carry over automatically.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[var(--border-hairline)] text-[11.5px] font-medium text-teal-400">
                  Instant CAC / TIN registry validation
                </div>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 shadow-xs">
                <div>
                  <span className="font-display text-[30px] font-bold text-teal-400">
                    02
                  </span>
                  <div className="mt-3 flex items-center gap-2">
                    <Building2 className="size-4.5 text-teal-400" />
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                      Set Up Payments
                    </h3>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                    Select a verified bank account or add a new one. Choose the buyer-offered payment terms (Net 15, Net 30, Net 60) that work for your business, and upload relationship certificates.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[var(--border-hairline)] text-[11.5px] font-medium text-teal-400">
                  Encrypted, bank-verified accounts
                </div>
              </div>
            </Reveal>

            {/* Step 3 */}
            <Reveal delay={0.12}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 shadow-xs">
                <div>
                  <span className="font-display text-[30px] font-bold text-teal-400">
                    03
                  </span>
                  <div className="mt-3 flex items-center gap-2">
                    <Truck className="size-4.5 text-teal-400" />
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                      Manage & Fulfill
                    </h3>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                    Purchase orders arrive directly in your portal. Acknowledge line items, set delivery dates, declare partial or full dispatches, and attach courier tracking details.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[var(--border-hairline)] text-[11.5px] font-medium text-teal-400">
                  Physical, digital, and service fulfillment
                </div>
              </div>
            </Reveal>

            {/* Step 4 */}
            <Reveal delay={0.16}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6 shadow-xs">
                <div>
                  <span className="font-display text-[30px] font-bold text-teal-400">
                    04
                  </span>
                  <div className="mt-3 flex items-center gap-2">
                    <Receipt className="size-4.5 text-teal-400" />
                    <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                      Invoice & Get Paid
                    </h3>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                    Generate invoices linked directly to fulfilled PO lines with zero manual typing. Watch your invoice progress from 3-way match verification to scheduled bank payout.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-[var(--border-hairline)] text-[11.5px] font-medium text-emerald-400">
                  Dispute-free, scheduled settlements
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 4. Core Capabilities Grid ── */}
      <section className="py-20 sm:py-28 border-b border-[var(--border-hairline)]">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Feature Deep-Dive
            </span>
            <h2 className="mt-3 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
              Everything You Need to Run Your Supplier Operations
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
              Built specifically for vendors who supply goods, software, or professional services to high-growth organizations.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Reveal delay={0.04}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <ShieldCheck className="size-5" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-primary)]">
                    Onboard Once, Connect Everywhere
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    Every new buyer used to mean starting from scratch — registration forms, bank letters, document re-uploads. With Villeto, your verified corporate profile pre-fills automatically. Onboarding drops from two weeks to under two minutes.
                  </p>
                </div>
                <ul className="mt-5 space-y-1.5 text-[12.5px] text-[var(--text-secondary)] pt-4 border-t border-[var(--border-hairline)]">
                  <li>• Smart profile reuse across buyers</li>
                  <li>• Automated CAC & TIN government checks</li>
                  <li>• Secure document vault for tax and ID records</li>
                </ul>
              </div>
            </Reveal>

            {/* Feature 2 */}
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <Package className="size-5" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-primary)]">
                    Your Orders, Actually Organized
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    No more hunting through email attachments. Every purchase order lands in your workspace. Acknowledge items line-by-line, set realistic delivery dates, declare partial shipments, and attach dispatch tracking details.
                  </p>
                </div>
                <ul className="mt-5 space-y-1.5 text-[12.5px] text-[var(--text-secondary)] pt-4 border-t border-[var(--border-hairline)]">
                  <li>• Line-by-line item acknowledgment</li>
                  <li>• Multi-method: physical, digital, services</li>
                  <li>• Live delivery sync with buyer dock</li>
                </ul>
              </div>
            </Reveal>

            {/* Feature 3 */}
            <Reveal delay={0.12}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <Receipt className="size-5" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-primary)]">
                    Invoice with Complete Confidence
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    Create invoices directly from confirmed purchase order lines. Villeto matches quantities and amounts against buyer delivery receipts before submission — eliminating variance disputes and payment hold-ups.
                  </p>
                </div>
                <ul className="mt-5 space-y-1.5 text-[12.5px] text-[var(--text-secondary)] pt-4 border-t border-[var(--border-hairline)]">
                  <li>• 1-Click invoice creation from PO lines</li>
                  <li>• 4-Stage visual payment pipeline tracker</li>
                  <li>• Multi-currency support (NGN, USD, GBP, EUR)</li>
                </ul>
              </div>
            </Reveal>

            {/* Feature 4 */}
            <Reveal delay={0.16}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <MessageSquare className="size-5" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-primary)]">
                    Talk to Buyers — In Context
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    When questions arise, the answer is never lost in someone&apos;s personal inbox. Built-in contextual messaging ties discussions directly to the specific purchase order or invoice, keeping conversations clear and audit-ready.
                  </p>
                </div>
                <ul className="mt-5 space-y-1.5 text-[12.5px] text-[var(--text-secondary)] pt-4 border-t border-[var(--border-hairline)]">
                  <li>• Messages locked to purchase order IDs</li>
                  <li>• Direct connection to procurement & AP</li>
                  <li>• Permanent compliance audit history</li>
                </ul>
              </div>
            </Reveal>

            {/* Feature 5 */}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <Zap className="size-5" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-primary)]">
                    Stay Informed, Stay in Control
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    Get notified immediately when a new PO is issued, an invoice is approved, or an onboarding document requires updating. During onboarding, our live approval hub updates in real time — redirecting to your active dashboard the second you&apos;re approved.
                  </p>
                </div>
                <ul className="mt-5 space-y-1.5 text-[12.5px] text-[var(--text-secondary)] pt-4 border-t border-[var(--border-hairline)]">
                  <li>• Live status updates without page refreshing</li>
                  <li>• Deep-link notifications directly to action items</li>
                  <li>• Rejection feedback with instant resubmit</li>
                </ul>
              </div>
            </Reveal>

            {/* Feature 6 */}
            <Reveal delay={0.24}>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs">
                <div>
                  <div className="flex size-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                    <Layers className="size-5" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold text-[var(--text-primary)]">
                    Multiple Buyers, One Identity
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                    Whether you supply two companies or twenty, your verified legal identity remains unified and locked against tampering. Switch between buyers with a single click, with all orders, invoices, and banking terms isolated per company.
                  </p>
                </div>
                <ul className="mt-5 space-y-1.5 text-[12.5px] text-[var(--text-secondary)] pt-4 border-t border-[var(--border-hairline)]">
                  <li>• Instant company switcher in header</li>
                  <li>• Company-specific banking & terms setup</li>
                  <li>• Pending buyer invitation inbox</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 5. Trust & Verification Signals ── */}
      <section className="py-16 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
        <Container>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            <div className="space-y-1.5">
              <div className="text-[28px] sm:text-[34px] font-bold text-teal-400">
                CAC & TIN
              </div>
              <p className="text-[13px] text-[var(--text-secondary)]">
                Automated corporate registry identity checks
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-[28px] sm:text-[34px] font-bold text-teal-400">
                3-Way Match
              </div>
              <p className="text-[13px] text-[var(--text-secondary)]">
                Zero variance between PO, receipt, and invoice
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-[28px] sm:text-[34px] font-bold text-teal-400">
                100% Match
              </div>
              <p className="text-[13px] text-[var(--text-secondary)]">
                Verified bank account legal name confirmation
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-[28px] sm:text-[34px] font-bold text-teal-400">
                Real-Time
              </div>
              <p className="text-[13px] text-[var(--text-secondary)]">
                Live synchronization with buyer receiving docks
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 6. Supplier FAQs & Objections ── */}
      <section className="py-20 sm:py-28 bg-[var(--bg-surface)] border-b border-[var(--border-hairline)]">
        <Container>
          <Reveal className="mx-auto max-w-[680px] text-center mb-14">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-1 shadow-xs">
              <HelpCircle className="size-3 text-teal-400" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-teal-300">
                Supplier FAQs
              </span>
            </div>
            <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
              Common Questions from Suppliers
            </h2>
            <p className="mt-3 text-[16px] text-[var(--text-secondary)]">
              Everything you need to know about joining your buyers on Villeto.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <VendorFaqAccordion />
          </Reveal>
        </Container>
      </section>

      {/* ── 7. Final Call to Action ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-[var(--bg-canvas)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-0 h-80 w-[600px] -translate-x-1/2 rounded-full bg-teal-500 opacity-[0.06] blur-[120px]"
        />

        <Container className="relative">
          <div className="mx-auto max-w-[760px] text-center rounded-3xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-8 sm:p-14 shadow-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-3 py-1 text-[12px] font-semibold text-teal-300">
              Get Started with Your Buyers
            </span>
            <h2 className="mt-5 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
              Your buyers are already using Villeto. <br className="hidden sm:inline" />
              Now it&apos;s your turn.
            </h2>
            <p className="mt-4 mx-auto max-w-[52ch] text-[16px] leading-relaxed text-[var(--text-secondary)]">
              Stop juggling emails, spreadsheets, and unanswered invoices. Get one portal that manages your entire vendor operation — from purchase order to payment.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Button href="https://app.villeto.com/login" size="lg" className="shadow-lg shadow-teal-500/15">
                Sign In to Vendor Portal
                <ArrowRight className="size-4" />
              </Button>
              <Button href="https://app.villeto.com/signup" variant="secondary" size="lg">
                Register as Supplier
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
