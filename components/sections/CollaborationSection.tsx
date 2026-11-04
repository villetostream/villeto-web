"use client";

import { motion } from "motion/react";
import {
  MessageCircle,
  FileText,
  Mail,
  ShieldCheck,
  MessagesSquare,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { collaborationSection } from "@/lib/content/collaboration";

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  "message-circle": MessageCircle,
  "shield-check": ShieldCheck,
  "file-text": FileText,
  mail: Mail,
};

export function CollaborationSection() {
  const { mockThread } = collaborationSection;

  return (
    <section id="collaboration" className="relative overflow-hidden bg-[var(--bg-surface)] py-20 sm:py-28">
      <Container>
        {/* ── Centered Section Heading ── */}
        <Reveal className="mx-auto max-w-[720px] text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3 py-1 shadow-xs">
            <MessagesSquare className="size-3 text-[var(--accent)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
              Contextual Collaboration
            </span>
          </div>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
            {collaborationSection.heading}
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {collaborationSection.subhead}
          </p>
        </Reveal>

        {/* ── Balanced 2-Column Content ── */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: Value Points */}
          <Reveal>
            <div className="flex flex-col gap-6">
              {collaborationSection.points.map((point, i) => {
                const Icon = iconMap[point.icon] ?? MessageCircle;
                return (
                  <motion.div
                    key={point.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4 rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-5 shadow-xs transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-text)]">
                      <Icon className="size-5" strokeWidth={1.85} />
                    </div>
                    <div>
                      <h3 className="text-[15.5px] font-semibold text-[var(--text-primary)]">{point.title}</h3>
                      <p className="mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)]">{point.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>

          {/* Right: Conversation Mock */}
          <Reveal delay={0.15}>
            <div className="mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-canvas)] shadow-[0_20px_60px_-24px_rgba(5,18,15,0.18)]">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <MessageCircle className="size-4 text-[var(--accent)]" strokeWidth={2} />
                  <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                    {mockThread.poNumber}
                  </span>
                  <span className="text-[12px] text-[var(--text-secondary)]">· {mockThread.vendor}</span>
                </div>
              </div>

              {/* Thread type tabs */}
              <div className="grid grid-cols-2 border-b border-[var(--border-hairline)]">
                <button
                  type="button"
                  className="relative border-r border-[var(--border-hairline)] px-4 py-2.5 text-left"
                >
                  <span className="block text-[10px] font-semibold text-[var(--accent-text)]">Your team</span>
                  <span className="block mt-0.5 text-[9px] text-[var(--text-secondary)]">Internal only</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--accent)]" />
                </button>
                <button
                  type="button"
                  className="px-4 py-2.5 text-left"
                >
                  <span className="block text-[10px] font-semibold text-[var(--text-secondary)]">Supplier</span>
                  <span className="block mt-0.5 text-[9px] text-[var(--text-secondary)]">Visible to vendor</span>
                </button>
              </div>

              {/* Messages */}
              <div className="flex flex-col gap-3 p-5">
                {mockThread.messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-3"
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${msg.color}`}
                    >
                      {msg.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[12px] font-semibold text-[var(--text-primary)]">{msg.sender}</span>
                        <span className="text-[10px] text-[var(--text-secondary)]">{msg.role}</span>
                        <span className="ml-auto text-[10px] text-[var(--text-secondary)]">{msg.time}</span>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-[var(--text-secondary)]">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Segregation notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-2 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3.5 py-2.5"
                >
                  <ShieldCheck className="size-4 shrink-0 text-amber-600 dark:text-amber-400" strokeWidth={2} />
                  <span className="text-[11.5px] font-medium text-amber-700 dark:text-amber-300">
                    Suppliers never see your internal discussions.
                  </span>
                </motion.div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
