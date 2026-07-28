import { solutionNavItems, type MegaNavItem } from "./mega-nav";

export type SolutionPage = MegaNavItem & {
  eyebrow: string;
  capabilities: { title: string; body: string }[];
  quote: { body: string; attribution: string };
};

const extras: Record<string, Omit<SolutionPage, keyof MegaNavItem>> = {
  "finance-teams": {
    eyebrow: "For Finance Teams",
    capabilities: [
      { title: "Commitments before they land", body: "See what's been committed, not just what's been spent." },
      { title: "Accruals stay current", body: "Category spend and accruals update as requests move, not at month-end." },
      { title: "Control approvals and payments", body: "Every payment and invoice verification routes through your policy." },
    ],
    quote: {
      body: "Finance stopped reconciling spreadsheets against five different systems and started trusting one number.",
      attribution: "Finance Operations, mid-market services company",
    },
  },
  "procurement-teams": {
    eyebrow: "For Procurement Teams",
    capabilities: [
      { title: "Requests route themselves", body: "Manager, procurement, and finance approvals happen in the right order automatically." },
      { title: "Vendors managed centrally", body: "Every vendor relationship, document, and status lives in one place." },
      { title: "Fulfillment stays visible", body: "Track a request from intent through delivery without leaving Villeto." },
    ],
    quote: {
      body: "We went from chasing approvals over email to watching requests move through a queue we actually trust.",
      attribution: "Procurement Lead, industrial manufacturer",
    },
  },
  "operations-teams": {
    eyebrow: "For Operations Teams",
    capabilities: [
      { title: "Orders in one portal", body: "Receive orders and submit invoices without switching tools." },
      { title: "Payment status, always visible", body: "Know exactly where a payment stands without asking finance." },
      { title: "Fewer tickets, less chasing", body: "Self-serve status means fewer status-check emails for everyone." },
    ],
    quote: {
      body: "Our ops team finally has a single place to check invoice and payment status instead of five inboxes.",
      attribution: "Operations Manager, logistics provider",
    },
  },
  "leadership-teams": {
    eyebrow: "For Leadership Teams",
    capabilities: [
      { title: "Every request, visible", body: "See requests, exceptions, approvers, and policy decisions in real time." },
      { title: "Exceptions surface themselves", body: "Leadership sees what's flagged, not just what's approved." },
      { title: "Policy decisions, traceable", body: "Understand why a decision was made, not just what happened." },
    ],
    quote: {
      body: "Leadership reviews now take minutes because the exceptions are already surfaced, not buried in a spreadsheet.",
      attribution: "VP Finance, growth-stage SaaS company",
    },
  },
  "security-and-audit": {
    eyebrow: "For Security & Audit",
    capabilities: [
      { title: "Immutable audit logs", body: "Every action is timestamped and exportable — nothing is altered after the fact." },
      { title: "Granular permissions", body: "Role-based access keeps every user scoped to what they need." },
      { title: "Compliance-ready", body: "GDPR and regional data residency are handled by design." },
    ],
    quote: {
      body: "Our auditors get an exportable trail on request instead of a two-week reconstruction project.",
      attribution: "Head of Internal Audit, financial services firm",
    },
  },
  enterprise: {
    eyebrow: "For Enterprise",
    capabilities: [
      { title: "Multi-entity by default", body: "Subsidiaries, currencies, and books are first-class, not a workaround." },
      { title: "Policy-as-code across entities", body: "Approval controls apply consistently, wherever a request originates." },
      { title: "Built for scale", body: "The same policy engine that handles one entity handles fifty." },
    ],
    quote: {
      body: "We rolled out Villeto across twelve subsidiaries without twelve different configurations.",
      attribution: "Group Controller, multinational holding company",
    },
  },
};

export const solutionPages: SolutionPage[] = solutionNavItems.map((item) => ({
  ...item,
  ...(extras[item.slug] as Omit<SolutionPage, keyof MegaNavItem>),
}));

export function getSolutionPage(slug: string) {
  return solutionPages.find((p) => p.slug === slug);
}
