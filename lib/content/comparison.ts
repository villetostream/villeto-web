export const comparisonSection = {
  heading: "Spend software works. Just not for how you operate.",
  subhead:
    "The best-known platforms were built for US startups or global enterprises. If you run several companies across multiple countries and can't afford a year-long implementation, you've felt the gap.",
};

export type ComparisonItem = {
  id: string;
  gap: string;
  answer: string;
  icon: "credit-card" | "calendar" | "users" | "message-circle" | "globe";
};

export const comparisonItems: ComparisonItem[] = [
  {
    id: "card-only",
    gap: "Card-first tools that stop at the swipe",
    answer: "The full chain from purchase request to AP ledger — with every step connected",
    icon: "credit-card",
  },
  {
    id: "long-rollout",
    gap: "Six-month implementations with consultants",
    answer: "Set up in steps, go live in days. Start with one workflow and add more as your team is ready",
    icon: "calendar",
  },
  {
    id: "portal-friction",
    gap: "Supplier portals vendors refuse to use",
    answer: "A free supplier workspace that works for all their buyers — so they have a reason to log in",
    icon: "users",
  },
  {
    id: "whatsapp",
    gap: "Approvals and context lost in WhatsApp",
    answer: "Conversations attached to the PO, invoice, or expense — with a built-in audit trail",
    icon: "message-circle",
  },
  {
    id: "single-country",
    gap: "Built for one currency, one country",
    answer: "Separate books per entity, local currencies, and bank account verification that actually works",
    icon: "globe",
  },
];
