import Link from "next/link";
import { iconMap } from "@/lib/icon-map";
import type { MegaNavItem } from "@/lib/content/mega-nav";

export function MegaMenu({
  items,
  basePath,
  onNavigate,
}: {
  items: MegaNavItem[];
  basePath: "products" | "solutions";
  onNavigate?: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = iconMap[item.icon] as React.ElementType;
        return (
          <Link
            key={item.slug}
            href={`/${basePath}/${item.slug}`}
            onClick={onNavigate}
            className="group flex items-start gap-3 rounded-[var(--radius-md)] p-3 transition-colors hover:bg-[var(--bg-surface)]"
          >
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent-soft)] text-[var(--accent-text)]">
              <Icon className="size-4.5" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold text-[var(--text-primary)]">{item.title}</span>
              <span className="mt-0.5 block text-[13px] leading-snug text-[var(--text-secondary)]">
                {item.description}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
