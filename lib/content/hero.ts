export const hero = {
  eyebrow: "Reinvented for Modern Finance Teams",
  headline: "Control how Money leaves your Company",
  subhead:
    "Villeto helps organizations manage procurement, vendors, approvals, invoices, and payments in one connected finance operations platform.",
  primaryCta: { label: "Get Started for free", href: "#get-started" },
  emailPlaceholder: "What is your work email?",
  secondaryCta: { label: "See Villeto in action", href: "#demo" },
};

export type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  kicker: string;
  detail: string;
};

export const stats: Stat[] = [
  { value: 100, suffix: "+", kicker: "Scale", label: "Enterprise customers", detail: "One operating record across finance and procurement." },
  { value: 98, suffix: "%", kicker: "Accuracy", label: "Invoice auto-match rate", detail: "Fewer exceptions reach the finance queue." },
  { value: 12, suffix: "x", kicker: "Speed", label: "Faster approval cycles", detail: "Requests arrive with context and the right route." },
  { value: 200, suffix: "k+", prefix: "$", kicker: "Control", label: "Payments processed", detail: "Policy, approval, and payment stay connected." },
];

// Content for the hero's "governance layer" proof widget — rebuilt as a
// simplified, responsive component per DESIGN_RULES.md Prime Directive
// (visual treatment is ours to decide; the copy below is Figma's).
export const governanceSteps = [
  { label: "Request" },
  { label: "Intake" },
  { label: "Policy" },
  { label: "Rules" },
  { label: "Approval" },
  { label: "Context" },
  { label: "Vendor" },
  { label: "Ready" },
  { label: "Invoice" },
  { label: "Review" },
  { label: "Ledger" },
  { label: "Audit" },
];

export const governanceCallouts = [
  {
    title: "Before spend",
    body: "Policy, vendor, and approval context align.",
  },
  {
    title: "After spend",
    body: "Invoice, receipt, and audit records stay connected.",
  },
];

// Six items that orbit the central "Policy Engine" hub in the hero's
// governance visualization — a simplified, animated rebuild of the
// Figma "Live governance layer" widget (solar-system motion, not a
// pixel clone — see DESIGN_RULES.md Prime Directive).
export const orbitItems: { id: string; label: string; icon: "inbox" | "shield-check" | "route" | "book" | "receipt" | "handshake" }[] = [
  { id: "policy-rules", label: "Policy Rules", icon: "shield-check" },
  { id: "request-intake", label: "Request Intake", icon: "inbox" },
  { id: "approval-context", label: "Approval Context", icon: "route" },
  { id: "vendor-ready", label: "Vendor Ready", icon: "handshake" },
  { id: "invoice-review", label: "Invoice Review", icon: "receipt" },
  { id: "ledger-audit", label: "Ledger Audit", icon: "book" },
];
