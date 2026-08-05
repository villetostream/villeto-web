export const productExplorer = {
  heading: "Five products. One connected workflow.",
  subhead: "Start with the module your team needs today. The same policy, approval, vendor, and transaction context follows as you add more.",
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
    description: "Define and enforce approval workflows with dynamic routing rules - every request follows the right path automatically.",
  },
  {
    id: "procurement",
    label: "Procurement",
    description: "Streamline purchase requests from intake to PO with built-in budget checks and multi-level approvals.",
  },
  {
    id: "vendor-management",
    label: "Vendor Management",
    description: "Centralize vendor onboarding, compliance tracking, and contract renewals in one unified workspace.",
  },
  {
    id: "billpay",
    label: "BillPay",
    description: "Automate invoice matching, approval routing, and payment scheduling to close the books faster.",
  },
];

// Distinct visual per tab for the desktop side panel.
export const productTabImages: Record<string, string> = {
  "expense-management": "/images/Expenses.png",
  policies: "/images/Policies.png",
  procurement: "/images/Procurement.png",
  "vendor-management": "/images/Vendor.png",
  billpay: "/images/Bill Pay.png",
};
