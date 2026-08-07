export const trustSection = {
  eyebrow: "Governance & trust",
  heading: "Built for the teams that can't get it wrong",
  subhead: "Controls are part of the operating record, not a checklist finance and security reconstruct after the fact.",
  status: "Controls active",
};

export type TrustItem = {
  id: string;
  title: string;
  body: string;
  status: string;
  icon: "book" | "key" | "lock" | "badge-check";
};

export const trustItems: TrustItem[] = [
  { id: "access", title: "Identity & access", body: "Roles and permissions limit who can request, review, approve, and export.", status: "Controlled", icon: "key" },
  { id: "policy", title: "Policy enforcement", body: "Rules, thresholds, and approval routes evaluate with transaction context.", status: "Enforced", icon: "badge-check" },
  { id: "data", title: "Data protection", body: "Encryption and regional controls protect financial and vendor information.", status: "Protected", icon: "lock" },
  { id: "audit", title: "Audit evidence", body: "Timestamped decisions and linked records remain ready to inspect or export.", status: "Export-ready", icon: "book" },
];

export const trustSignals = ["Role-based access", "Multi-entity controls", "Regional residency", "Immutable history"];

export const testimonialBand = {
  video: {
    src: "/images/testimonial-video-placeholder.png",
    alt: "Villeto customer testimonial",
  },
};

export const finalCta = {
  eyebrow: "Bring one workflow",
  heading: "Start with the spend process creating the most friction.",
  subhead: "Connect the request, vendor, policy decision, invoice, and financial record without replacing everything at once.",
  emailPlaceholder: "What is your work email?",
  cta: { label: "Get Started for free", href: "#get-started" },
  demo: { label: "See a Demo", href: "mailto:info@villeto.com?subject=Villeto%20demo%20request" },
};
