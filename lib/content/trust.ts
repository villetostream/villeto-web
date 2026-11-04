export const trustSection = {
  heading: "Controls your auditors will recognise.",
  subhead:
    "Accountability is built into the workflow — not bolted on after the fact. Every decision has an owner, every record is traceable, and history cannot be quietly overwritten.",
};

export type TrustItem = {
  id: string;
  title: string;
  body: string;
  icon: "book" | "key" | "lock" | "badge-check" | "globe" | "database" | "calendar";
};

export const trustItems: TrustItem[] = [
  {
    id: "separation",
    title: "Separation of duties",
    body: "No one approves their own request. Payment approvers must differ from the person who created the record.",
    icon: "key",
  },
  {
    id: "approval-rules",
    title: "Approval rules by amount",
    body: "Set how many approvals a payment requires at each amount band. Rules apply at the moment of action, not after the fact.",
    icon: "badge-check",
  },
  {
    id: "policy-governance",
    title: "Policy governance",
    body: "Decide who can approve new expense policies and Spend Programs, or let them go live automatically. Policy changes themselves have an approval lifecycle.",
    icon: "lock",
  },
  {
    id: "permissions",
    title: "Precise permissions",
    body: "Custom roles with fine-grained access — scoped to a person's own records, their team, their department, or the whole company.",
    icon: "badge-check",
  },
  {
    id: "immutable-ledger",
    title: "Immutable ledger",
    body: "Journal entries cannot be edited. Corrections are recorded as reversals. The trial balance flags imbalances immediately.",
    icon: "book",
  },
  {
    id: "fiscal-periods",
    title: "Fiscal period controls",
    body: "Entries can only post to open periods. Closing a period is irreversible — so nothing gets quietly backdated.",
    icon: "calendar",
  },
  {
    id: "audit-trail",
    title: "Audit trail",
    body: "Every expense report, approval decision, policy exception, and delivery record is timestamped and traceable — ready for your next audit.",
    icon: "database",
  },
];

export const testimonialBand = {
  video: {
    src: "/images/testimonial-video-placeholder.png",
    alt: "Villeto customer testimonial",
  },
};

export const finalCta = {
  heading: "One platform for every request, every expense, and every invoice.",
  subhead:
    "Give your team one place to manage procurement, expenses, bills, vendors, and accounting — across every entity you run.",
  emailPlaceholder: "What is your work email?",
  primaryCta: { label: "Get Started for free", href: "https://app.villeto.com/signup" },
  trialNote: "Free trial · No credit card required",
  demo: { label: "Request a walkthrough" },
};
