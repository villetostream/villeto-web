export const audienceSection = {
  heading: "The whole spend chain,\u00A0aligned.",
};

export type Audience = {
  id: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
};

export const audiences: Audience[] = [
  {
    id: "finance-teams",
    title: "Finance Teams",
    body: "Control approvals, payments, and invoice verification.",
    image: { src: "/images/Finance Teams.png", alt: "Finance team member reviewing approvals" },
  },
  {
    id: "procurement-teams",
    title: "Procurement Teams",
    body: "Manage purchase requests, vendors, and fulfillment workflows.",
    image: { src: "/images/Procurement Teams.png", alt: "Procurement team member sourcing a vendor" },
  },
  {
    id: "operations-teams",
    title: "Operations Teams",
    body: "Receive orders, submit invoices, and track payment status from one portal.",
    image: { src: "/images/Operation Teams.png", alt: "Operations team member tracking an order" },
  },
  {
    id: "leadership-teams",
    title: "Leadership Teams",
    body: "Real-time visibility into commitments, accruals, and category spend.",
    image: { src: "/images/Leadership Teams.png", alt: "Leadership team member reviewing spend" },
  },
];
