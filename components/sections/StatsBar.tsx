import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { stats } from "@/lib/content/hero";

export function StatsBar() {
  return (
    <section className="border-y border-[var(--border-hairline)] bg-[var(--bg-canvas)]">
      <Container>
        <div className="grid grid-cols-1 divide-y divide-[var(--border-hairline)] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05} className="px-1 py-7 sm:px-6 sm:py-9 first:pl-0 last:pr-0">
              <div className="flex items-baseline gap-2">
                <p className="font-display text-[30px] font-semibold leading-none text-[var(--text-primary)] sm:text-[34px]">
                  {stat.prefix ?? ""}<Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <span className="type-meta font-semibold uppercase text-[var(--accent-text)]">{stat.kicker}</span>
              </div>
              <p className="type-card-copy mt-2 font-semibold text-[var(--text-primary)]">{stat.label}</p>
              <p className="type-ui mt-1 text-[var(--text-secondary)]">{stat.detail}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
