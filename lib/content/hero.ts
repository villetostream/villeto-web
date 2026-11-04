export const hero = {
  eyebrow: "Spend management that connects everything",
  headline: "One platform for every way your company spends.",
  subhead:
    "Villeto brings procurement, employee expenses, bill pay, vendor management, and accounting into one connected workflow. Spend Programs verify budgets before purchase orders dispatch, while Expense Policies check employee receipts at submission — not at month end.",
  emailPlaceholder: "What is your work email?",
  primaryCta: { label: "Get Started for free", href: "https://app.villeto.com/signup" },
  trialNote: "Free trial available · No credit card required",
  supportingLine: "Built for growing groups that can't wait a year to go live.",
};

// ── 3-scene hero widget data ──────────────────────────────────────────────────

export type HeroScene = {
  id: string;
  label: string;
  kicker: string;
};

export const heroScenes: HeroScene[] = [
  { id: "expenses", label: "Expenses", kicker: "Every receipt checked against Expense Policies before it reaches an approver" },
  { id: "procurement", label: "Procurement", kicker: "3-stage Spend Programs verify budgets and turn requests into purchase orders" },
  { id: "billpay", label: "Bill Pay", kicker: "Automated 3-way matching reconciles invoices to POs and deliveries before AP records it" },
];

// Scene 1: Procurement
export const procurementScene = {
  request: {
    category: "Office Supplies · Q4 2026",
    title: "IT Equipment Restock",
    items: [
      { name: "HP LaserJet Pro Printer", qty: "×2", amount: "₦480,000" },
      { name: "Toner Cartridges", qty: "×10", amount: "₦120,000" },
    ],
    total: "₦600,000",
    requester: { initials: "AO", name: "Adaeze Obi", dept: "Engineering", status: "Raised request" },
  },
  approval: {
    approvers: [
      { name: "Tunde Bello", role: "Line Manager", done: true },
      { name: "Chidi Eze", role: "Finance Lead", done: true },
      { name: "Ngozi Adeyemi", role: "Finance Director", done: false },
    ],
  },
  order: {
    poNumber: "PO-2026-0047",
    vendor: { name: "TechSupply Ltd", status: "Verified · Bank details confirmed" },
  },
};

// Scene 2: Expenses
export const expenseScene = {
  report: {
    title: "Lagos Client Meeting",
    employee: { initials: "KA", name: "Kunle Adeyemi", dept: "Sales" },
    items: [
      { name: "Flight — Lagos ↔ Abuja", receipt: true, amount: "₦185,000" },
      { name: "Hotel — 2 nights", receipt: true, amount: "₦96,000" },
      { name: "Meals & transport", receipt: true, amount: "₦24,500" },
    ],
    total: "₦305,500",
  },
  policyCheck: {
    rules: [
      { label: "Flight within budget", passed: true },
      { label: "Hotel rate under limit", passed: true },
      { label: "All receipts attached", passed: true },
    ],
    result: "In policy · Ready for review",
  },
  approval: {
    approver: { name: "Bola Ogundimu", role: "Sales Director", status: "Approved" },
    reimbursement: "Queued for next cycle",
  },
};

// Scene 3: Bill Pay
export const billPayScene = {
  invoice: {
    number: "INV-TL-0891",
    vendor: "TechSupply Ltd",
    amount: "₦600,000",
    entity: "Villeto NG",
  },
  match: {
    checks: [
      { label: "Purchase Order", ref: "PO-2026-0047", matched: true },
      { label: "Goods Receipt", ref: "GR-2026-0047", matched: true },
      { label: "Supplier Invoice", ref: "INV-TL-0891", matched: true },
    ],
    result: "3-way match complete",
  },
  record: {
    journalEntry: "JE-2026-1847",
    period: "Q4 2026",
    entries: [
      { side: "Dr", account: "Office Supplies Expense", amount: "₦600,000" },
      { side: "Cr", account: "Accounts Payable — TechSupply", amount: "₦600,000" },
    ],
    status: "Immutable · Posted to AP subledger",
  },
};
