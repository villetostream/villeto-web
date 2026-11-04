"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle, Mail, Search, HelpCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { faqSection, type FaqItem } from "@/lib/content/onboarding";

const CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "policies", label: "Spend Programs & Policies" },
  { id: "procurement", label: "Procurement & 3-Way Match" },
  { id: "accounting", label: "Multi-Entity & Ledger" },
  { id: "vendors", label: "Vendor Portal & Banking" },
  { id: "setup", label: "Setup & Rollout" },
] as const;

export default function SupportPage() {
  const [openId, setOpenId] = useState<string | null>(faqSection.items[0]?.id ?? null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const filteredItems = useMemo(() => {
    return faqSection.items.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)]">
      {/* ── Page Hero ── */}
      <div className="relative overflow-hidden bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] pt-5 pb-7 sm:pt-7 sm:pb-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-48 w-[400px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.05] blur-[80px]"
        />

        <Container className="relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-0.5 shadow-xs mb-2.5">
                <HelpCircle className="size-3 text-[var(--accent)]" />
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
                  Help & Documentation Center
                </span>
              </div>
              <h1 className="text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)] sm:text-[2.25rem]">
                Answers, Guides & Support
              </h1>
              <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Everything you need to understand Villeto&apos;s dual governance engines, 3-way matching, multi-entity accounting, and vendor onboarding.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:support@villeto.com"
                className="inline-flex items-center gap-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-[13px] font-medium text-[var(--text-primary)] shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div className="flex size-7 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-text)]">
                  <Mail className="size-4" />
                </div>
                <div>
                  <p className="font-semibold leading-none">Email Support</p>
                  <p className="text-[11.5px] text-[var(--text-secondary)] mt-0.5">support@villeto.com</p>
                </div>
              </a>

              <a
                href="https://app.villeto.com/login"
                className="inline-flex items-center gap-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-4 py-3 text-[13px] font-medium text-[var(--text-primary)] shadow-xs hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
              >
                <div className="flex size-7 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent-text)]">
                  <MessageCircle className="size-4" />
                </div>
                <div>
                  <p className="font-semibold leading-none">In-App Chat</p>
                  <p className="text-[11.5px] text-[var(--text-secondary)] mt-0.5">Live for logged-in teams</p>
                </div>
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] py-3">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-[12px] font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-xs"
                      : "border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live search input */}
            <div className="relative w-full md:w-68 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="Search topics, SoD, CAC..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] pl-8.5 pr-3 py-1.5 text-[12.5px] text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* ── Questions Accordion ── */}
      <div className="py-8 sm:py-12">
        <Container className="max-w-[880px]">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-12 text-center">
              <p className="text-[16px] font-semibold text-[var(--text-primary)]">
                No matching questions found
              </p>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                Try searching for another term like &quot;matching&quot;, &quot;programs&quot;, or &quot;CAC&quot;.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-text)] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border-hairline)] rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-6 py-2 shadow-xs sm:px-8">
              {filteredItems.map((item, i) => {
                const isOpen = openId === item.id;
                return (
                  <Reveal key={item.id} delay={i * 0.02}>
                    <div>
                      <button
                        id={`support-faq-btn-${item.id}`}
                        onClick={() => toggle(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`support-faq-panel-${item.id}`}
                        className="flex w-full items-start justify-between gap-4 py-5.5 text-left"
                      >
                        <span className="text-[16px] font-semibold text-[var(--text-primary)] leading-snug sm:text-[17px]">
                          {item.question}
                        </span>
                        <span className="mt-0.5 flex shrink-0 size-6 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] transition-colors">
                          {isOpen ? <Minus className="size-3.5" strokeWidth={2.5} /> : <Plus className="size-3.5" strokeWidth={2.5} />}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`support-faq-panel-${item.id}`}
                            role="region"
                            aria-labelledby={`support-faq-btn-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="pb-5 pr-8 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* Quick Help Box */}
          <div className="mt-12 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div>
              <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">
                Need a guided architectural walkthrough?
              </h3>
              <p className="mt-1 text-[14px] text-[var(--text-secondary)]">
                Our solutions engineering team can review your multi-entity chart of accounts and policy hierarchies.
              </p>
            </div>
            <a
              href="mailto:support@villeto.com"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-2.5 text-[13px] font-semibold text-[var(--accent-contrast)] hover:opacity-90 transition-opacity"
            >
              Contact Solutions Team
            </a>
          </div>
        </Container>
      </div>
    </main>
  );
}
