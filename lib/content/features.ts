export const featureSuite = {
  heading: "All Your Financial Tools, One Powerful Suite",
  subhead:
    "Villeto brings together expense management, budgeting, and reporting in one seamless platform, designed to give your team clarity, control, and confidence with every transaction.",
};

export const cardsExpensesMock = {
  changeLabel: "Expenses",
  change: "-12%",
  amount: "$1,284",
  transactionsLabel: "Successful Transactions",
  transactions: "128",
  note: "No suspicious activity",
};

export const vendorManagementMock = {
  step: "Onboard a Vendor",
  stepDetail: "Set a password and continue your registration process",
  checklist: ["Business Identity", "Banking Details", "Document Upload"],
};

export const financeVisibilityMock = {
  tags: ["Full Audit Trail", "Real-time Visibility"],
  stats: [
    { label: "Total Spend", value: "$2.4M" },
    { label: "Exceptions Flagged", value: "18" },
    { label: "Policy Violations", value: "3", warn: true },
  ],
};

export const poInvoiceMock = {
  badge: "SOC 2 Secured",
  stats: [
    { label: "Total Invoices", value: "1,250" },
    { label: "Pending Amount", value: "$150,000" },
    { label: "Approved Spend", value: "$450,000" },
  ],
};

export const procurementIntakeMock = {
  badge: "Fast",
  tabs: ["All Requests", "Submitted", "Awaiting Review", "Approved"],
  columns: ["Request ID", "Request Title", "Requester"],
};

export type FeatureCardBase = {
  id: string;
  title: string;
  body: string;
};

export const featureCards: FeatureCardBase[] = [
  { id: "cards-expenses", title: "Cards and Expenses", body: "Capture card activity, receipts, reports, limits, and policy checks." },
  { id: "vendor-management", title: "Vendor Management", body: "Route requests through managers, procurement, and finance before spending happens." },
  { id: "finance-visibility", title: "Finance Visibility", body: "See every request, exception, approver, and policy decision." },
  { id: "po-invoice-review", title: "PO and Invoice Review", body: "Connect commitments, deliveries, invoices, and payment status." },
  { id: "procurement-intake", title: "Procurement Intake", body: "Convert purchase intent into approved requests with owners." },
];
