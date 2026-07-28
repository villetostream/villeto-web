export const trustSection = {
  heading: "Built for the teams that can't get it wrong",
  subhead: "From day one, Villeto meets the controls finance, security, and audit teams expect.",
};

export type TrustItem = {
  id: string;
  title: string;
  body: string;
  icon: "book" | "key" | "lock" | "badge-check" | "globe" | "database";
};

export const trustItems: TrustItem[] = [
  { id: "audit-logs", title: "Audit logs", body: "Immutable, timestamped, exportable.", icon: "book" },
  { id: "approval-controls", title: "Approval controls", body: "Policy-as-code across entities.", icon: "key" },
  { id: "security", title: "Security", body: "Encryption. Data protection. Always on.", icon: "lock" },
  { id: "permissions", title: "Permissions", body: "Granular, role-based access.", icon: "badge-check" },
  { id: "compliance", title: "Compliance", body: "GDPR, regional data residency.", icon: "globe" },
  { id: "multi-entity", title: "Multi-entity", body: "Subsidiaries, currencies, books.", icon: "database" },
];

export const testimonialBand = {
  video: {
    src: "/images/testimonial-video-placeholder.png",
    alt: "Villeto customer testimonial",
  },
};

export const finalCta = {
  heading: "Stop managing procurement across\u00A010 different tools.",
  subhead: "Bring requests, approvals, vendors, invoices, and payments into one intelligent workflow.",
  emailPlaceholder: "What is your work email?",
  cta: { label: "Get Started for free", href: "#get-started" },
};
