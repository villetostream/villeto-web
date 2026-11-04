export const audienceSection = {
  heading: "Designed for the people behind each decision.",
  subhead:
    "Villeto gives every team the right view of company spend — with the controls and context they need to move without chasing approvals.",
};

export type Audience = {
  id: string;
  title: string;
  body: string;
  image: { src: string; alt: string };
};

export const audiences: Audience[] = [
  {
    id: "finance-leaders",
    title: "Finance Leaders",
    body: "See commitments, expenses, and obligations before they become surprises — by entity and currency. Design the policies, set the approval rules, and trust that they're being enforced.",
    image: { src: "/images/Finance Teams.png", alt: "Finance leader reviewing entity-level spend commitments" },
  },
  {
    id: "procurement-teams",
    title: "Procurement",
    body: "Turn purchase requests into orders, send them to verified suppliers, and track each one through delivery and invoicing. Every conversation stays on the PO — not in a WhatsApp group.",
    image: { src: "/images/Procurement Teams.png", alt: "Procurement team managing purchase orders" },
  },
  {
    id: "accounts-payable",
    title: "Accounts Payable",
    body: "Review every invoice against its purchase order and goods received. Post it to the ledger in one step, with the full story attached. No more chasing context across email threads.",
    image: { src: "/images/Operation Teams.png", alt: "AP clerk reviewing matched invoices" },
  },
  {
    id: "managers-employees",
    title: "Managers & Employees",
    body: "Approve requests and expenses in one queue with policy flags already raised. File an expense in minutes with receipt scanning that works. See reimbursement status without asking finance.",
    image: { src: "/images/Leadership Teams.png", alt: "Manager approving a purchase request" },
  },
];
