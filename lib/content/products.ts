export const productExplorer = {
  heading: "Five workspaces. One control layer.",
  subhead: "Each workspace owns a clear operational job. Budgets, policy, approvals, vendor context, and audit history remain shared underneath.",
  foundation: ["Budgets", "Policy", "Approvals", "Vendor context", "Audit trail"],
  cta: { label: "See Villeto on your workflow", href: "#get-started" },
};

export const productArchitecture = [
  {
    id: "procurement",
    name: "Procurement",
    scope: "Purchase intake, budgets, approvals, and purchase orders.",
    href: "/products/procurement-intake",
    icon: "procurement" as const,
  },
  {
    id: "vendor-management",
    name: "Vendor Management",
    scope: "Onboarding, contracts, ownership, and risk checks.",
    href: "/products/vendor-management",
    icon: "vendor" as const,
  },
  {
    id: "cards-expenses",
    name: "Cards & Expenses",
    scope: "Cards, receipts, reimbursements, and spend limits.",
    href: "/products/cards-and-expenses",
    icon: "expenses" as const,
  },
  {
    id: "billpay",
    name: "BillPay",
    scope: "Invoices, verification, approvals, and payments.",
    href: "/products/billpay",
    icon: "billpay" as const,
  },
  {
    id: "ledger",
    name: "Ledger",
    scope: "Financial records, reporting, and audit evidence.",
    href: "/products/ledger",
    icon: "ledger" as const,
  },
] as const;
