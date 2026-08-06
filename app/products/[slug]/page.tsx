import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { productPages, getProductPage } from "@/lib/content/product-pages";
import { navCtas } from "@/lib/content/nav";

export function generateStaticParams() {
  return productPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getProductPage(slug);
  if (!page) return {};
  return { title: `${page.title} — Villeto`, description: page.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getProductPage(slug);
  if (!page) notFound();

  return (
    <>
      <section className="bg-[var(--bg-surface)] py-20 sm:py-28">
        <Container className="max-w-[760px] text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-[var(--accent-soft)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--accent-text)]">
              {page.eyebrow}
            </span>
            <h1 className="mt-5 text-[length:var(--fs-hero)] font-semibold text-[var(--text-primary)]">
              {page.title}
            </h1>
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

      <section className="bg-[var(--bg-surface)] py-20 text-[var(--text-primary)] sm:py-24">
        <Container>
          <Reveal className="mx-auto max-w-[600px] text-center">
            <h2 className="text-[length:var(--fs-h2)] font-semibold">How it works</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {page.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06} className="relative">
                <span className="font-display text-[40px] font-semibold text-[var(--accent)] opacity-80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold">{step.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[var(--bg-canvas)] py-20 sm:py-24">
        <Container className="flex flex-col items-center gap-3 text-center">
          <Reveal>
            <p className="font-display text-[44px] font-semibold text-[var(--accent-text)] sm:text-[56px]">
              {page.stat.value}
            </p>
            <p className="mt-1 max-w-[420px] text-[15px] text-[var(--text-secondary)]">{page.stat.label}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-[var(--border-hairline)] py-16">
        <Container className="flex flex-col items-center gap-4 text-center">
          <p className="text-[15px] text-[var(--text-secondary)]">
            Want the whole workflow?{" "}
            <Link href="/#products" className="font-medium text-[var(--accent-text)]">
              See every product
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
