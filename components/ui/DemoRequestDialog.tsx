"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, X } from "lucide-react";

type DemoRequestDialogProps = {
  initialEmail?: string;
  open: boolean;
  onClose: () => void;
};

const inputClassName =
  "type-card-copy min-h-[46px] w-full rounded-[8px] border border-black/10 bg-white px-3.5 text-[#111714] placeholder:text-[#7a8580] focus:border-[#0ea894] focus:outline-none";

export function DemoRequestDialog({ initialEmail = "", open, onClose }: DemoRequestDialogProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => nameInputRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), [href]',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  const handleClose = () => {
    if (submitting) return;
    setSubmitted(false);
    setError(null);
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { error?: string; success?: boolean };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "We could not send your request. Please try again.");
      }

      form.reset();
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) handleClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-dialog-title"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-[8px] border border-black/10 bg-[#f5f8f7] text-[#111714] shadow-[0_32px_90px_-32px_rgba(0,0,0,0.55)] sm:max-w-[680px] sm:rounded-[8px]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-[#f5f8f7]/95 px-5 py-4 backdrop-blur sm:px-7">
              <div>
                <p className="type-eyebrow font-semibold uppercase text-[#087f70]">Guided walkthrough</p>
                <h2 id="demo-dialog-title" className="mt-1 text-[length:var(--fs-h3)] font-semibold">Tell us what you need to see.</h2>
              </div>
              <button type="button" onClick={handleClose} aria-label="Close walkthrough request" className="flex size-10 shrink-0 items-center justify-center rounded-[8px] text-[#53605a] transition-colors hover:bg-black/5 hover:text-[#111714]">
                <X className="size-5" />
              </button>
            </div>

            {submitted ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center px-6 py-14 text-center sm:px-10">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#dff4ef] text-[#087f70]"><CheckCircle2 className="size-6" /></span>
                <h3 className="mt-5 text-[length:var(--fs-h3)] font-semibold">Your request is with our team.</h3>
                <p className="type-card-copy mt-3 max-w-[420px] text-[#53605a]">We’ll review your workflow and contact you using the details you provided.</p>
                <button type="button" onClick={handleClose} className="type-card-copy mt-7 min-h-[46px] rounded-[8px] bg-[#0ea894] px-6 font-semibold text-white">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-7 sm:py-7">
                <p className="type-card-copy max-w-[560px] text-[#53605a]">Share your contact details and the workflow or challenge you want the walkthrough to cover.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Name" htmlFor="demo-name">
                    <input ref={nameInputRef} id="demo-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} className={inputClassName} placeholder="Your full name" />
                  </Field>
                  <Field label="Contact email" htmlFor="demo-email">
                    <input id="demo-email" name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={initialEmail} className={inputClassName} placeholder="you@company.com" />
                  </Field>
                  <Field label="Phone number" htmlFor="demo-phone">
                    <input id="demo-phone" name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={32} className={inputClassName} placeholder="+1 555 000 0000" />
                  </Field>
                  <Field label="Company" htmlFor="demo-company">
                    <input id="demo-company" name="company" type="text" autoComplete="organization" required minLength={2} maxLength={120} className={inputClassName} placeholder="Company name" />
                  </Field>
                </div>

                <Field label="What should the walkthrough cover?" htmlFor="demo-message" className="mt-4">
                  <textarea id="demo-message" name="message" required minLength={10} maxLength={2000} rows={5} className={`${inputClassName} resize-y py-3`} placeholder="Tell us about your current process, the teams involved, and what you want to improve." />
                </Field>

                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="demo-website">Website</label>
                  <input id="demo-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {error && <p role="alert" className="type-ui mt-4 rounded-[8px] bg-red-50 px-3.5 py-3 text-red-700">{error}</p>}

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="type-meta max-w-[340px] text-[#6b7671]">By submitting, you agree that Villeto may contact you about this request.</p>
                  <button type="submit" disabled={submitting} className="type-card-copy flex min-h-[46px] items-center justify-center gap-2 rounded-[8px] bg-[#0ea894] px-5 font-semibold text-white transition-colors hover:bg-[#0b907f] disabled:pointer-events-none disabled:opacity-60">
                    {submitting ? <Loader2 className="size-4 animate-spin" /> : <>Send request <ArrowRight className="size-4" /></>}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Field({ children, className = "", htmlFor, label }: { children: React.ReactNode; className?: string; htmlFor: string; label: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="type-ui mb-2 block font-semibold">{label}</label>
      {children}
    </div>
  );
}
