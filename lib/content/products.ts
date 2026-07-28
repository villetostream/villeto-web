export const productExplorer = {
  heading: "Seven Products.\u00A0One Workflow.",
  subhead: "Villeto brings together expense management, budgeting, and reporting in one seamless platform, designed to give your team clarity, control, and confidence with every transaction.",
  cta: { label: "See Villeto in action", href: "#demo" },
};

export type ProductTab = {
  id: string;
  label: string;
  description?: string;
};

// Only the active tab ("Expense Management") carries a description in the
// Figma source — the rest are plain labels a person can select.
export const productTabs: ProductTab[] = [
  {
    id: "expense-management",
    label: "Expense Management",
    description:
      "Smart forms route the right details to the right approvers - no Slack threads, no missing context.",
  },
  {
    id: "policies",
    label: "Policies",
    description: "Centralized limits, categories, and approval thresholds — enforced automatically, every time.",
  },
  {
    id: "procurement",
    label: "Procurement",
    description: "Convert purchase intent into approved requests with a named owner from day one.",
  },
  {
    id: "vendor-management",
    label: "Vendor Management",
    description: "Route requests through managers, procurement, and finance before spending happens.",
  },
  {
    id: "billpay",
    label: "BillPay",
    description: "Approvals and invoice verification before a single payment ever releases.",
  },
];

// Distinct visual per tab for the desktop side panel.
export const productTabImages: Record<string, string> = {
  "expense-management": "/images/finance-visibility-dashboard.png",
  policies: "/images/security-compliance-illustration.png",
  procurement: "/images/persona-procurement-teams.png",
  "vendor-management": "/images/persona-operations-teams.png",
  billpay: "/images/po-invoice-dashboard.png",
};