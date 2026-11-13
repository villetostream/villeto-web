import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Quote, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { allSolutionPages, getSolutionPage } from "@/lib/content/solution-pages";

export function generateStaticParams() {
  return allSolutionPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) return {};
  return {
    title: `${page.title} Solutions`,
    description: page.description,
    alternates: { canonical: `/solutions/${slug}` },
    openGraph: {
      title: `${page.title} Solutions | Villeto`,
      description: page.description,
      url: `/solutions/${slug}`,
    },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)]">
      {/* ── Page Hero ── */}
      <section className="relative overflow-hidden bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] py-20 text-[var(--text-primary)] sm:py-28">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.05] blur-[100px]"
        />

        <Container className="relative max-w-[800px] text-center">
          <Reveal>
            <div className="mb-6 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ArrowLeft className="size-3.5" strokeWidth={2.5} />
                Back to overview
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-canvas)] px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-text)] shadow-xs">
              <Sparkles className="size-3 text-[var(--accent)]" />
              <span>{page.eyebrow}</span>
            </div>

            <h1 className="mt-5 text-[length:var(--fs-hero)] font-semibold leading-[1.12] tracking-tight">
              {page.title}
            </h1>

            <p className="mx-auto mt-5 max-w-[58ch] text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[19px]">
              {page.heroHeadline || page.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="https://app.villeto.com/signup" size="lg">
                Get Started for free
                <ArrowRight className="size-4" />
              </Button>
              <Button href="#capabilities" variant="secondary" size="lg">
                Explore capabilities
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Capabilities Grid ── */}
      <section id="capabilities" className="py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-[640px] text-center">
            <h2 className="text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
              Core Capabilities for {page.title}
            </h2>
            <p className="mt-3 text-[16px] text-[var(--text-secondary)]">
              Built directly into Villeto's multi-entity financial workflow.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8 max-w-[1040px] mx-auto">
            {page.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-7 shadow-xs transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-700 sm:p-8">
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent-text)]">
                      <Check className="size-5" strokeWidth={2.25} />
                    </div>
                    <h3 className="mt-5 text-[18px] font-semibold text-[var(--text-primary)]">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
                      {c.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Practitioner Quote ── */}
      {page.quote && (
        <section className="border-y border-[var(--border-hairline)] bg-[var(--bg-surface)] py-16 sm:py-20">
          <Container className="max-w-[760px] text-center">
            <Reveal>
              <Quote className="mx-auto size-8 text-[var(--accent)] opacity-60" />
              <blockquote className="mt-4 text-[19px] font-medium leading-relaxed text-[var(--text-primary)] sm:text-[21px]">
                "{page.quote.body}"
              </blockquote>
              <figcaption className="mt-4 text-[13px] font-semibold uppercase tracking-wider text-[var(--accent-text)]">
                {page.quote.attribution}
              </figcaption>
            </Reveal>
          </Container>
        </section>
      )}

      {/* ── Closing CTA ── */}
      <section className="py-20 text-center sm:py-28">
        <Container className="max-w-[640px]">
          <Reveal>
            <h2 className="text-[length:var(--fs-h2)] font-semibold tracking-tight text-[var(--text-primary)]">
              Ready to take control of your company spend?
            </h2>
            <p className="mt-4 text-[16px] text-[var(--text-secondary)]">
              Set up your workspace in days. No lengthy consultant implementations required.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="https://app.villeto.com/signup" size="lg">
                Get Started for free
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
