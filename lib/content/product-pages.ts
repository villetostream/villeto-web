import { productNavItems, type MegaNavItem } from "./mega-nav";

export type ProductPage = MegaNavItem & {
  eyebrow: string;
  capabilities: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  stat: { value: string; label: string };
};

const extras: Record<string, Omit<ProductPage, keyof MegaNavItem>> = {
  "cards-and-expenses": {
    eyebrow: "Cards & Expenses",
    capabilities: [
      { title: "Live card controls", body: "Freeze, adjust, or retire a card the moment spend patterns change." },
      { title: "Receipt matching", body: "Card activity reconciles against receipts automatically with instant mobile OCR." },
      { title: "Policy checks at swipe time", body: "Limits and category rules apply before a charge posts, not after." },
    ],
    steps: [
      { title: "Issue a card", body: "Set a limit, category, and owner in seconds." },
      { title: "Spend happens", body: "Every transaction is checked against Expense Policies in real time." },
      { title: "Reconcile automatically", body: "Receipts and categories attach themselves to the subledger." },
    ],
    stat: { value: "1-Click", label: "instant OCR receipt pairing with card transactions" },
  },
  "procurement-intake": {
    eyebrow: "Procurement Intake",
    capabilities: [
      { title: "Structured requests", body: "Smart intake forms capture the details and justification each approver actually needs." },
      { title: "Owner from day one", body: "Every request keeps a named owner from submission to fulfillment." },
      { title: "Status without asking", body: "Requesters see progress in their unified queue without pinging finance." },
    ],
    steps: [
      { title: "Submit intent", body: "A requester describes what they need to buy with category and budget context." },
      { title: "Route automatically", body: "Villeto assigns the right approver based on Spend Program amount bands." },
      { title: "Convert to a PO", body: "Approved intent converts to a tracked, owned purchase order ready for dispatch." },
    ],
    stat: { value: "3-Stage", label: "continuous Spend Program validation from requisition to PO dispatch" },
  },
  "vendor-management": {
    eyebrow: "Vendor Management",
    capabilities: [
      { title: "Guided onboarding", body: "Vendors register their own business identity, banking, and documents." },
      { title: "Verified before payment", body: "Tax ID, incorporation, and banking documents are checked before a vendor is payable." },
      { title: "One portal for everyone", body: "Vendors submit invoices and track payment status without email back-and-forth." },
    ],
    steps: [
      { title: "Invite a vendor", body: "Send a registration link tied to your approval workflow." },
      { title: "Vendor self-registers", body: "Business identity, banking, and documents are collected in one guided flow." },
      { title: "Approve and activate", body: "Once verified, the vendor is ready to receive purchase requests." },
    ],
    stat: { value: "CAC & TIN", label: "automated corporate registry checks before vendor activation" },
  },
  billpay: {
    eyebrow: "BillPay",
    capabilities: [
      { title: "Approval before release", body: "Every payment routes through the approval chain your policy defines." },
      { title: "Invoice verification", body: "Amounts are checked against purchase orders and receipts before payment." },
      { title: "Full payment trail", body: "Every payment is timestamped, attributed, and exportable for audit." },
    ],
    steps: [
      { title: "Invoice arrives", body: "BillPay matches it against the original purchase order and delivery receipt." },
      { title: "Approval routes", body: "Finance reviews and approves based on policy thresholds and separation of duties." },
      { title: "Payment releases", body: "Funds move only after every verification check has passed." },
    ],
    stat: { value: "3-Way", label: "automated matching across purchase order, delivery receipt, and invoice" },
  },
  "expense-management": {
    eyebrow: "Expense Management",
    capabilities: [
      { title: "Context-aware forms", body: "The right fields reach the right approver — no missing context, no Slack threads." },
      { title: "Policy alignment upfront", body: "Vendor, policy, and approval context align before spend happens, not after." },
      { title: "One workflow, every team", body: "The same policy engine governs cards, procurement, and invoices." },
    ],
    steps: [
      { title: "Set your policy once", body: "Define limits, categories, and approvers centrally." },
      { title: "Spend requests check themselves", body: "Every request is validated against policy before it reaches an approver." },
      { title: "Approvers see only what matters", body: "Exceptions are flagged; compliant requests move fast." },
    ],
    stat: { value: "Pre-Spend", label: "policy gate validation before charges occur" },
  },
  ledger: {
    eyebrow: "Ledger",
    capabilities: [
      { title: "Connected records", body: "Invoice, receipt, and audit records stay linked from request to payment." },
      { title: "Immutable history", body: "Every entry is timestamped and exportable — nothing is edited after the fact." },
      { title: "Multi-entity ready", body: "Track subsidiaries, currencies, and books from a single source of truth." },
    ],
    steps: [
      { title: "A transaction posts", body: "Card spend, invoices, and payments write to the subledger automatically." },
      { title: "Records stay linked", body: "Each entry keeps its original request, approval, and receipt attached." },
      { title: "Audit anytime", body: "Export a full, immutable trail for any entity or fiscal period." },
    ],
    stat: { value: "100%", label: "immutable double-entry vouchers with permanent audit traces" },
  },
};

export const productPages: ProductPage[] = productNavItems.map((item) => ({
  ...item,
  ...(extras[item.slug] as Omit<ProductPage, keyof MegaNavItem>),
}));

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}
