import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { solutionPages, getSolutionPage } from "@/lib/content/solution-pages";
import { navCtas } from "@/lib/content/nav";

export function generateStaticParams() {
  return solutionPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) return {};
  return { title: `${page.title} — Villeto`, description: page.description };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSolutionPage(slug);
  if (!page) notFound();

  return (
    <>
      <section className="bg-[var(--bg-surface)] py-20 text-[var(--text-primary)] sm:py-28">
        <Container className="max-w-[760px] text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-[var(--border-hairline)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--text-secondary)]">
              {page.eyebrow}
            </span>
            <h1 className="mt-5 text-[length:var(--fs-hero)] font-semibold">{page.title}</h1>
            <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[19px]">
              {page.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={navCtas.primary.href} size="lg">
                Get Started for free
                <ArrowRight className="size-4" />
              </Button>
              <Button href={navCtas.demo.href} variant="secondary" size="lg">
                See a Demo
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-[var(--bg-canvas)] py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {page.capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--border-hairline)] bg-[var(--bg-canvas)] p-6">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                    <Check className="size-4.5" strokeWidth={2} />
                  </span>
                  <h3 className="text-[16px] font-semibold text-[var(--text-primary)]">{c.title}</h3>
                  <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--bg-surface)] py-20 sm:py-24">
        <Container className="max-w-[720px]">
          <Reveal>
            <Quote className="size-8 text-[var(--accent)]" strokeWidth={1.5} />
            <p className="mt-4 text-[20px] font-medium leading-snug text-[var(--text-primary)] sm:text-[24px]">
              {page.quote.body}
            </p>
            <p className="mt-4 text-[14px] text-[var(--text-secondary)]">{page.quote.attribution}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-[var(--border-hairline)] py-16">
        <Container className="flex flex-col items-center gap-4 text-center">
          <p className="text-[15px] text-[var(--text-secondary)]">
            See how it fits your whole company —{" "}
            <Link href="/#solutions" className="font-medium text-[var(--accent-text)]">
              view every solution
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
