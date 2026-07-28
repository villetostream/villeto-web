import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/lib/content/hero";

export function StatsBar() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-hairline)] bg-gradient-to-b from-[var(--accent-soft)]/40 to-[var(--bg-surface)]">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:py-14 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06} className="flex flex-col items-center md:items-start">
            <p className="font-display text-[36px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-[var(--accent)] to-[#0b6e61] sm:text-[44px]">
              {stat.prefix ?? ""}
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-[13px] font-medium text-[var(--text-secondary)] sm:text-[14px]">{stat.label}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
