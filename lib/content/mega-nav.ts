export type MegaNavItem = {
  slug: string;
  title: string;
  description: string;
  href?: string;
  icon: "card" | "inbox" | "handshake" | "receipt" | "shield-check" | "book" | "trending-up" | "route" | "package" | "eye" | "lock" | "building";
};

export type NavMenuKey = "products" | "solutions" | "company";

export type MegaNavMenu = {
  groups: Array<{ label: string; items: MegaNavItem[] }>;
  feature: {
    eyebrow: string;
    title: string;
    description: string;
    label: string;
    href: string;
  };
};

export const productNavItems: MegaNavItem[] = [
  {
    slug: "vendor-management",
    title: "Vendor Management",
    description: "Route requests through managers, procurement, and finance before spending happens.",
    icon: "handshake",
  },
  {
    slug: "cards-and-expenses",
    title: "Cards and Expenses",
    description: "Capture card activity, receipts, reports, limits, and policy checks.",
    icon: "card",
  },
  {
    slug: "procurement-intake",
    title: "Procurement Intake",
    description: "Convert purchase intent into approved requests with owners.",
    icon: "inbox",
  },

  {
    slug: "billpay",
    title: "BillPay",
    description: "Control approvals, payments, and invoice verification.",
    icon: "receipt",
  },
  {
    slug: "expense-management",
    title: "Expense Management",
    description: "Policy, vendor, and approval context align before spend happens.",
    icon: "shield-check",
  },
  {
    slug: "ledger",
    title: "Ledger",
    description: "Invoice, receipt, and audit records stay connected.",
    icon: "book",
  },
];

export const solutionNavItems: MegaNavItem[] = [
  {
    slug: "finance-teams",
    title: "Finance Teams",
    description: "Real-time visibility into commitments, accruals, and category spend.",
    icon: "trending-up",
  },
  {
    slug: "procurement-teams",
    title: "Procurement Teams",
    description: "Route requests through managers, procurement, and finance before spending.",
    icon: "route",
  },
  {
    slug: "operations-teams",
    title: "Operations Teams",
    description: "Receive orders, submit invoices, and track payment status from one portal.",
    icon: "package",
  },
  {
    slug: "leadership-teams",
    title: "Leadership Teams",
    description: "See every request, exception, approver, and policy decision.",
    icon: "eye",
  },
  {
    slug: "security-and-audit",
    title: "Security & Audit",
    description: "Immutable, timestamped, exportable audit trail across entities.",
    icon: "lock",
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    description: "Multi-entity, multi-currency controls built for scale.",
    icon: "building",
  },
];

const companyNavItems: MegaNavItem[] = [
  {
    slug: "workflow",
    title: "Product workflow",
    description: "See how requests, policy, approvals, and records connect.",
    href: "/#workflow",
    icon: "route",
  },
  {
    slug: "security-and-audit",
    title: "Security & Audit",
    description: "Review the controls behind every financial decision.",
    href: "/solutions/security-and-audit",
    icon: "lock",
  },
  {
    slug: "enterprise",
    title: "Enterprise readiness",
    description: "Multi-entity and multi-currency controls built for scale.",
    href: "/solutions/enterprise",
    icon: "building",
  },
  {
    slug: "contact",
    title: "Contact sales",
    description: "Talk through your current procurement and spend process.",
    href: "mailto:Contact@villeto.com",
    icon: "inbox",
  },
];

function selectItems(items: MegaNavItem[], slugs: string[]) {
  return slugs.map((slug) => items.find((item) => item.slug === slug)).filter((item): item is MegaNavItem => Boolean(item));
}

export const megaNavMenus: Record<NavMenuKey, MegaNavMenu> = {
  products: {
    groups: [
      {
        label: "Plan & govern",
        items: selectItems(productNavItems, ["procurement-intake", "vendor-management", "expense-management"]),
      },
      {
        label: "Transact & reconcile",
        items: selectItems(productNavItems, ["cards-and-expenses", "billpay", "ledger"]),
      },
    ],
    feature: {
      eyebrow: "Connected workflow",
      title: "Follow a purchase from request to record.",
      description: "See where procurement, policy, expenses, and payment hand context to one another.",
      label: "Explore the workflow",
      href: "/#workflow",
    },
  },
  solutions: {
    groups: [
      {
        label: "By team",
        items: selectItems(solutionNavItems, ["finance-teams", "procurement-teams", "operations-teams", "leadership-teams"]),
      },
      {
        label: "By requirement",
        items: selectItems(solutionNavItems, ["security-and-audit", "enterprise"]),
      },
    ],
    feature: {
      eyebrow: "Built for operators",
      title: "Give every team the context it needs.",
      description: "Different views, one source of truth for the spend decision and the record that follows.",
      label: "Find your solution",
      href: "/#solutions",
    },
  },
  company: {
    groups: [
      { label: "Explore", items: selectItems(companyNavItems, ["workflow", "security-and-audit"]) },
      { label: "Connect", items: selectItems(companyNavItems, ["enterprise", "contact"]) },
    ],
    feature: {
      eyebrow: "See it on your process",
      title: "Start with one spend workflow.",
      description: "Bring the process you use today and see where Villeto removes handoffs and missing context.",
      label: "Get started",
      href: "/#get-started",
    },
  },
};

export function getMegaNavHref(menuKey: NavMenuKey, item: MegaNavItem) {
  if (item.href) return item.href;
  return `/${menuKey}/${item.slug}`;
}
