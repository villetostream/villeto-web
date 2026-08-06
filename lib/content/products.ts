export const productExplorer = {
  heading: "Five workspaces. One control layer.",
  subhead: "Each workspace owns a clear operational job while a policy-aware control layer carries context, evaluates rules, and explains every decision.",
  foundation: ["Budget context", "Policy library", "Approval graph", "Vendor risk", "Audit history"],
  policyFlow: [
    { title: "Understand", detail: "Request, vendor, budget, role" },
    { title: "Evaluate", detail: "Rules, thresholds, routes" },
    { title: "Explain", detail: "Decision, owner, evidence" },
  ],
  cta: { label: "See Villeto on your workflow", href: "#get-started" },
};

export const productArchitecture = [
  {
    id: "procurement",
    name: "Procurement",
    scope: "Purchase intake, budgets, approvals, and purchase orders.",
    policy: "Purchase and budget rules",
    href: "/products/procurement-intake",
    icon: "procurement" as const,
  },
  {
    id: "vendor-management",
    name: "Vendor Management",
    scope: "Onboarding, contracts, ownership, and risk checks.",
    policy: "Onboarding and risk rules",
    href: "/products/vendor-management",
    icon: "vendor" as const,
  },
  {
    id: "cards-expenses",
    name: "Cards & Expenses",
    scope: "Cards, receipts, reimbursements, and spend limits.",
    policy: "Spend and receipt rules",
    href: "/products/cards-and-expenses",
    icon: "expenses" as const,
  },
  {
    id: "billpay",
    name: "BillPay",
    scope: "Invoices, verification, approvals, and payments.",
    policy: "Invoice and payment rules",
    href: "/products/billpay",
    icon: "billpay" as const,
  },
  {
    id: "ledger",
    name: "Ledger",
    scope: "Financial records, reporting, and audit evidence.",
    policy: "Accounting and audit rules",
    href: "/products/ledger",
    icon: "ledger" as const,
  },
] as const;
