export const productExplorer = {
  eyebrow: "The Unified Spend Architecture",
  heading: "Two ways companies spend. One control layer and ledger.",
  subhead:
    "Whether an employee submits an offsite lodging receipt or procurement issues a multi-million naira vendor PO, Villeto enforces policy before commitments are made and books every record directly to your subledger.",
  cta: { label: "Get started for free", href: "https://app.villeto.com/signup" },
};

export type ProductTab = {
  id: "expenses" | "procurement" | "policies" | "billpay" | "accounting";
  label: string;
  shortLabel: string;
  badge: string;
  route: string;
  tagline: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const productTabs: ProductTab[] = [
  {
    id: "expenses",
    label: "Expense Management",
    shortLabel: "Expenses",
    badge: "Expense Policies",
    route: "app.villeto.com/expenses",
    tagline: "Receipt-first employee filing with instant policy clearance",
    description:
      "Employees snap or upload receipts while our OCR engine extracts merchant, date, currency, and line items in real time. Bound to Expense Policies: daily lodging caps, meal allowances, and mandatory receipt thresholds (> ₦5,000) are enforced before submission — queued directly for line manager review.",
    highlights: [
      "OCR receipt scanning with 99.4% field match",
      "Expense Policy limits (daily caps, grade limits, receipts)",
      "Automated employee payroll reimbursement queue",
    ],
    ctaLabel: "Explore Expense Workflows",
    ctaHref: "https://app.villeto.com/signup",
  },
  {
    id: "procurement",
    label: "Procurement & POs",
    shortLabel: "Procurement",
    badge: "Spend Programs",
    route: "app.villeto.com/procurement/orders",
    tagline: "Category-driven requests with 3-stage Spend Programs",
    description:
      "Turn department purchase requests into approved purchase orders without losing context. Budgets and quotation rules are checked against Spend Programs across three stages: PR submission, PR-to-PO conversion, and PO submission.",
    highlights: [
      "3-stage Spend Programs (PR submission, PR-to-PO, PO dispatch)",
      "Budget headroom verification and quotation thresholds",
      "Automatic supplier line splitting and direct PO dispatch",
    ],
    ctaLabel: "Explore Procurement Workflows",
    ctaHref: "https://app.villeto.com/signup",
  },
  {
    id: "policies",
    label: "Spend Policies & Governance",
    shortLabel: "Policies",
    badge: "Dual Governance",
    route: "app.villeto.com/policies/governance",
    tagline: "Dual governance engine: Expense Policies vs. Spend Programs",
    description:
      "Villeto never lumps all spend into generic rules. Expense Policies govern employee out-of-pocket cards & receipts by category and grade. Spend Programs govern B2B procurement across 3 lifecycle stages with quotation rules and coverage modes (all categories vs. specific categories). Separation of duties is structurally enforced.",
    highlights: [
      "Separate engines: Expense Policies vs. Spend Programs",
      "Coverage modes: all categories, specific categories, or open",
      "Structural Separation of Duties (no self-approval)",
    ],
    ctaLabel: "Explore Governance Controls",
    ctaHref: "https://app.villeto.com/signup",
  },
  {
    id: "billpay",
    label: "Bill Pay & AP",
    shortLabel: "Bill Pay",
    badge: "3-Way Matching",
    route: "app.villeto.com/bill-pay/invoices",
    tagline: "Automated 3-way matching and scheduled settlements",
    description:
      "Supplier invoices uploaded or received by email are automatically matched against purchase orders and warehouse goods receipts. Line-item discrepancies, quantity variances, and bank account mismatches are stopped before payment.",
    highlights: [
      "Automated PO + Goods Receipt + Invoice 3-way match",
      "Bank detail verification against legal business registration",
      "Scheduled bank settlements with fiscal period gating",
    ],
    ctaLabel: "Explore Bill Pay Workflows",
    ctaHref: "https://app.villeto.com/signup",
  },
  {
    id: "accounting",
    label: "Accounting & Ledger",
    shortLabel: "Accounting",
    badge: "Immutable Subledger",
    route: "app.villeto.com/accounting/subledger",
    tagline: "Entity subledgers with irreversible audit journals",
    description:
      "Every approved transaction — whether an employee expense reimbursement or a supplier invoice — generates an immutable double-entry journal voucher and updates open AP obligations. Entries can never be edited or backdated; trial balances remain balanced in real time.",
    highlights: [
      "Separate subledger and chart of accounts per legal entity",
      "Immutable double-entry journal vouchers (reversals only)",
      "Strict fiscal period open/close gating and audit hashing",
    ],
    ctaLabel: "Explore Accounting Controls",
    ctaHref: "https://app.villeto.com/signup",
  },
];
