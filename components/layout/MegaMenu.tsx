import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import { getMegaNavHref, megaNavMenus, type NavMenuKey } from "@/lib/content/mega-nav";

export function MegaMenu({
  menuKey,
  onNavigate,
}: {
  menuKey: NavMenuKey;
  onNavigate?: () => void;
}) {
  const menu = megaNavMenus[menuKey];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_248px]">
      <div className={`grid gap-8 p-6 ${menu.groups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {menu.groups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase text-[var(--text-secondary)]">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] as React.ElementType;
                return (
                  <Link
                    key={item.slug}
                    href={getMegaNavHref(menuKey, item)}
                    onClick={onNavigate}
                    className="group flex items-start gap-3 rounded-[8px] px-2 py-2.5 transition-colors hover:bg-[var(--bg-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[7px] bg-[var(--accent-soft)] text-[var(--accent-text)]">
                      <Icon className="size-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13px] font-semibold text-[var(--text-primary)]">{item.title}</span>
                      <span className="mt-0.5 block text-[11px] leading-[1.45] text-[var(--text-secondary)]">{item.description}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between border-l border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase text-[var(--accent-text)]">{menu.feature.eyebrow}</p>
          <p className="mt-4 text-[19px] font-semibold leading-[1.25] text-[var(--text-primary)]">{menu.feature.title}</p>
          <p className="mt-3 text-[12px] leading-5 text-[var(--text-secondary)]">{menu.feature.description}</p>
        </div>
        <Link href={menu.feature.href} onClick={onNavigate} className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--accent-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
          {menu.feature.label}
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
