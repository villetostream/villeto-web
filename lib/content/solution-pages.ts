export type SolutionPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
  heroHeadline: string;
  capabilities: { title: string; body: string }[];
  steps?: { title: string; body: string }[];
  quote: { body: string; attribution: string };
};

export const allSolutionPages: SolutionPage[] = [
  {
    slug: "finance-leaders",
    title: "Finance Leaders",
    eyebrow: "For CFOs & Finance Directors",
    description:
      "See commitments, expenses, and obligations across every legal entity before cash leaves your bank. Enforce Spend Programs and Expense Policies automatically.",
    heroHeadline: "Complete spend visibility and pre-commitment control across all your legal entities.",
    icon: "trending-up",
    capabilities: [
      {
        title: "Pre-Commitment Budget Protection",
        body: "Budgets are checked against Spend Programs at three stages before POs dispatch — stopping overspend before commitments are made.",
      },
      {
        title: "Multi-Entity Consolidated Control",
        body: "Monitor cash commitments and open AP obligations by entity and currency (NGN, USD, GBP, EUR, KES, GHS) without currency-mixing errors.",
      },
      {
        title: "Structural Separation of Duties",
        body: "Requesters cannot approve their own purchase requests or expenses. Approval routes escalate automatically based on configurable amount bands.",
      },
      {
        title: "Immutable General Ledger Sync",
        body: "Every approved invoice and reimbursement creates an irreversible double-entry journal voucher in your AP subledger with zero manual re-keying.",
      },
    ],
    quote: {
      body: "We replaced manual month-end spreadsheet marathons across five subsidiaries with a continuous, verified subledger we actually trust.",
      attribution: "Chief Financial Officer, Multi-Entity Group",
    },
  },
  {
    slug: "cfos",
    title: "CFOs & Group Controllers",
    eyebrow: "For Chief Financial Officers",
    description:
      "Strategic cash management, automated compliance governance, and group-wide financial discipline without six-month ERP implementation marathons.",
    heroHeadline: "The operating system for modern CFOs managing growing groups and subsidiaries.",
    icon: "trending-up",
    capabilities: [
      {
        title: "Real-Time Group Spend Visibility",
        body: "Track live budget burn across departments and subsidiaries. No waiting for month-end reconciliation to discover budget overruns.",
      },
      {
        title: "Irreversible Fiscal Period Controls",
        body: "Strict fiscal calendar locks prevent unauthorized backdating or unapproved modifications to closed financial periods.",
      },
      {
        title: "Bank Account Verification Safeguards",
        body: "Automated CAC and TIN checks flag name mismatches between supplier invoices and bank accounts before payouts are approved.",
      },
      {
        title: "Audit-Ready Trail on Demand",
        body: "Every policy override, review decision, and delivery receipt carries an immutable cryptographic timestamp for seamless external audits.",
      },
    ],
    quote: {
      body: "Villeto gave us the governance of an enterprise ERP like SAP or Oracle, but with a rollout that took days instead of a year.",
      attribution: "Group Finance Controller, Emerging Markets Holding Co.",
    },
  },
  {
    slug: "procurement-teams",
    title: "Procurement Teams",
    eyebrow: "For Procurement Leaders & Buyers",
    description:
      "Turn department purchase requests into verified purchase orders, collaborate with suppliers on the PO, and track delivery through to invoice matching.",
    heroHeadline: "Structured intake, approved supplier routing, and end-to-end purchase order tracking.",
    icon: "route",
    capabilities: [
      {
        title: "Smart Purchase Request Intake",
        body: "Category-driven intake forms capture itemized lines, units of measure, and business justifications upfront without WhatsApp chasing.",
      },
      {
        title: "3-Stage Spend Program Enforcement",
        body: "Evaluate PR submission, PR-to-PO conversion, and PO dispatch against active Spend Programs, category rules, and 3-quote requirements.",
      },
      {
        title: "Direct Supplier Portal Dispatch",
        body: "Approved POs dispatch directly to the supplier's web workspace for line-item delivery date acknowledgment and fulfillment tracking.",
      },
      {
        title: "Automated Supplier Line Splitting",
        body: "Single requests with items from multiple suppliers are cleanly divided into separate, tracked purchase orders automatically.",
      },
    ],
    quote: {
      body: "Conversations about orders and delivery batches stay locked to the purchase order — not buried in personal WhatsApp groups.",
      attribution: "Head of Procurement, Logistics & Manufacturing",
    },
  },
  {
    slug: "accounts-payable",
    title: "Accounts Payable",
    eyebrow: "For Accounts Payable & Invoicing Teams",
    description:
      "Automated 3-way matching between purchase orders, warehouse delivery receipts, and vendor invoices. Eliminate duplicate and unverified payouts.",
    heroHeadline: "Review facts instead of forwarded emails. Automated 3-way matching and one-click posting.",
    icon: "receipt",
    capabilities: [
      {
        title: "Automated 3-Way Reconciliation",
        body: "Villeto cross-checks PO lines, warehouse goods receipts (GR), and supplier invoices automatically — verifying zero price or quantity variance.",
      },
      {
        title: "Supplier Bank Detail Validation",
        body: "Account names are verified against corporate registry records during onboarding; changes trigger mandatory compliance review.",
      },
      {
        title: "One-Click Subledger Posting",
        body: "Approved invoices generate balanced double-entry journal vouchers and open AP obligations with no manual spreadsheet entry.",
      },
      {
        title: "Scheduled Net-30 Settlements",
        body: "Group approved bills into scheduled payment runs aligned with vendor terms and entity cash flow cycles.",
      },
    ],
    quote: {
      body: "AP reviews evidence instead of guessing. If an invoice doesn't match the purchase order and delivery receipt, it simply cannot post.",
      attribution: "AP Supervisor, Regional Retail Group",
    },
  },
  {
    slug: "managers-employees",
    title: "Managers & Employees",
    eyebrow: "For Approvers & Team Members",
    description:
      "File expense reports in minutes with mobile OCR receipt scanning. Review and approve team requests in one unified queue with policy checks already done.",
    heroHeadline: "Frictionless expense filing, rapid approvals, and clear reimbursement tracking.",
    icon: "eye",
    capabilities: [
      {
        title: "Mobile OCR Receipt Scanning",
        body: "Snap a photo of any receipt — our OCR engine extracts merchant, date, VAT, and line items in seconds, matching lines to Expense Policy categories.",
      },
      {
        title: "Instant Policy Feedback at Submission",
        body: "Daily lodging limits, meal caps, and receipt thresholds are flagged as you file, so you never submit non-compliant reports.",
      },
      {
        title: "Unified Manager Approval Queue",
        body: "Department heads review both purchase requests and expense claims in one mobile-friendly queue with policy badges already highlighted.",
      },
      {
        title: "Real-Time Reimbursement Status",
        body: "See exactly when your claim is approved and queued for payroll reimbursement without having to ping finance.",
      },
    ],
    quote: {
      body: "I file travel expenses from my phone before leaving the airport, and my manager approves them before my flight lands.",
      attribution: "Sales Director, Enterprise Technology",
    },
  },
  {
    slug: "finance-teams",
    title: "Finance Teams",
    eyebrow: "For Financial Controllers & Analysts",
    description:
      "Real-time visibility into commitments, accruals, and category spend across departments and subsidiaries.",
    heroHeadline: "Unify commitments, expenses, and ledger obligations under one continuous policy engine.",
    icon: "trending-up",
    capabilities: [
      {
        title: "Real-Time Accruals Tracking",
        body: "Committed spend updates your financial position the moment purchase orders are approved, not when the bill lands 30 days later.",
      },
      {
        title: "Spend Category Visibility",
        body: "Drill down into department, vendor, and entity spend trends with standardized charts of accounts.",
      },
      {
        title: "Granular Role-Based Access",
        body: "Custom roles scoped to individual records, teams, departments, or entire corporate entities.",
      },
    ],
    quote: {
      body: "We stopped reconciling five different software tools and started running the business from one verified ledger.",
      attribution: "Financial Controller, Services Group",
    },
  },
  {
    slug: "operations-teams",
    title: "Operations Teams",
    eyebrow: "For Operations & Logistics Leads",
    description:
      "Coordinate deliveries, goods receipts, and vendor communications without lost emails or WhatsApp silos.",
    heroHeadline: "Keep physical deliveries, warehouse receiving, and vendor status in lockstep.",
    icon: "package",
    capabilities: [
      {
        title: "Digital Delivery Confirmation",
        body: "Confirm full or partial shipments against active PO lines. Dispatches update the AP matching engine in real time.",
      },
      {
        title: "Contextual Vendor Threads",
        body: "Communicate directly with suppliers on the purchase order so all discussions remain part of the permanent audit trail.",
      },
      {
        title: "Multi-Location Site Management",
        body: "Assign orders and deliveries to specific warehouses, branches, or project sites with localized oversight.",
      },
    ],
    quote: {
      body: "Our warehouse teams confirm receipts in seconds, and AP sees the exact delivered count immediately.",
      attribution: "Operations Manager, Supply Chain Group",
    },
  },
  {
    slug: "leadership-teams",
    title: "Leadership Teams",
    eyebrow: "For Executives & Board Members",
    description:
      "High-level governance, executive approvals, and total operational clarity without getting bogged down in administrative weeds.",
    heroHeadline: "Executive governance, amount-band approvals, and complete transparency.",
    icon: "eye",
    capabilities: [
      {
        title: "Amount-Threshold Escalations",
        body: "High-value transactions (> ₦10M) escalate to executive leadership automatically with full business context attached.",
      },
      {
        title: "Policy Exception Highlighting",
        body: "Review only what requires executive judgment — compliant everyday spend flows seamlessly through standard policy gates.",
      },
      {
        title: "Consolidated Group Health",
        body: "Monitor group-wide commitments and working capital across all subsidiaries from a single executive dashboard.",
      },
    ],
    quote: {
      body: "Executive sign-offs now take seconds because all the evidence, vendor quotes, and budget checks are already in front of us.",
      attribution: "Managing Director, Conglomerate Group",
    },
  },
  {
    slug: "security-and-audit",
    title: "Security & Audit",
    eyebrow: "For Internal Auditors & Compliance Officers",
    description:
      "Continuous audit compliance, irreversible journal vouchers, structural separation of duties, and exportable decision traces.",
    heroHeadline: "Auditability built into the workflow — not reconstructed after the fact.",
    icon: "lock",
    capabilities: [
      {
        title: "Continuous Policy Audit Engine",
        body: "Every decision carries an owner, timestamp, and linked evidence. History cannot be quietly overwritten or deleted.",
      },
      {
        title: "Immutable Subledger Hashing",
        body: "Double-entry journal vouchers are sealed with cryptographic hash validation. Adjustments are strictly recorded as reversals.",
      },
      {
        title: "Separation of Duties Verification",
        body: "Enforced structural barriers prevent self-approval and require distinct creator and payment authorization roles.",
      },
    ],
    quote: {
      body: "Our annual external audit took three days instead of three weeks because every single PO had its complete decision trace attached.",
      attribution: "Head of Internal Audit, Banking & Financial Services",
    },
  },
  {
    slug: "enterprise",
    title: "Enterprise Multi-Entity",
    eyebrow: "For Multi-Entity Groups & Conglomerates",
    description:
      "Multi-subsidiary governance, multi-currency accounting, and shared or isolated vendor lists across global jurisdictions.",
    heroHeadline: "Scale across subsidiaries, currencies, and borders without fragmenting your financial controls.",
    icon: "building",
    capabilities: [
      {
        title: "Isolated Legal Entity Subledgers",
        body: "Each subsidiary maintains its own base currency, chart of accounts, and fiscal calendar with single-login group oversight.",
      },
      {
        title: "Shared or Dedicated Supplier Pools",
        body: "Share approved group vendors or restrict suppliers to specific local operating entities with tailored payment terms.",
      },
      {
        title: "Multi-Currency Native Architecture",
        body: "Native support for NGN, USD, GBP, EUR, KES, and GHS. Currency conversions never obscure legal entity subledger accuracy.",
      },
    ],
    quote: {
      body: "We operate across Nigeria, Ghana, and Kenya under one Villeto governance umbrella with zero spreadsheet consolidation.",
      attribution: "Group Chief Operating Officer, Pan-African Enterprise",
    },
  },
  {
    slug: "spend-management-nigeria",
    title: "Spend Management Software Nigeria",
    eyebrow: "Built for Nigerian & African Enterprises",
    description:
      "Procurement, employee expenses, CAC/TIN vendor verification, 3-way matching, and NGN/USD/GBP/EUR/KES/GHS multi-entity AP subledger in one platform.",
    heroHeadline: "Spend management and procurement software built for Nigerian and Pan-African businesses.",
    icon: "building",
    capabilities: [
      {
        title: "CAC & TIN Supplier Verification",
        body: "Automatically verify supplier bank account names against registered CAC and TIN business records before releasing payouts.",
      },
      {
        title: "Native NGN & Multi-Currency Procurement",
        body: "Run purchase orders, approvals, and AP subledgers natively in NGN, USD, GBP, EUR, KES, and GHS per legal entity.",
      },
      {
        title: "3-Stage Spend Programs & Expense Policies",
        body: "Verify departmental budget headroom before POs dispatch and enforce receipt and travel policies at submission.",
      },
      {
        title: "Audit-Ready Double-Entry Subledger",
        body: "Every approved bill and reimbursement posts an immutable journal entry ready for Nigerian statutory audits and tax reviews.",
      },
    ],
    quote: {
      body: "Having CAC bank verification, Naira and USD entity tracking, and 3-way matching in one place cut our month-end close in half.",
      attribution: "Head of Finance, Lagos Multi-Entity Group",
    },
  },
  {
    slug: "three-way-matching",
    title: "Automated 3-Way Matching & AP",
    eyebrow: "Accounts Payable Automation",
    description:
      "Automatically reconcile purchase orders, goods receipts, and supplier invoices line-by-line before AP records post or payouts are scheduled.",
    heroHeadline: "Prevent duplicate and overbilled supplier payments with automated 3-way matching.",
    icon: "shield-check",
    capabilities: [
      {
        title: "Line-by-Line PO, Receipt & Invoice Reconciliation",
        body: "Compare ordered quantities, receiving dock confirmations, and billed unit prices automatically before an invoice enters AP.",
      },
      {
        title: "Automatic Variance Holds",
        body: "Flag price discrepancies, short deliveries, or unapproved overages immediately so finance resolves them before cash leaves.",
      },
      {
        title: "Supplier Self-Service Invoice Submission",
        body: "Vendors submit invoices directly against issued POs through the free Villeto Vendor Portal, eliminating PDF re-keying.",
      },
      {
        title: "Immutable Journal Posting",
        body: "Matched invoices generate verified double-entry AP journal vouchers with full approval and delivery audit trails.",
      },
    ],
    quote: {
      body: "3-way matching caught overbilled line items in our first week — paying for itself before our first month-end close.",
      attribution: "Accounts Payable Lead, Distribution Group",
    },
  },
  {
    slug: "multi-entity-spend-control",
    title: "Multi-Entity Spend Control",
    eyebrow: "For Subsidiaries & Holding Groups",
    description:
      "Standardize procurement, expense policies, vendor pools, and AP subledgers across every subsidiary with entity-level currency and fiscal isolation.",
    heroHeadline: "Unified spend governance across every subsidiary without six-month ERP rollouts.",
    icon: "layers",
    capabilities: [
      {
        title: "Entity-Isolated Ledgers & Base Currencies",
        body: "Each subsidiary maintains its own chart of accounts, fiscal calendar, and base currency while leadership sees group-wide spend.",
      },
      {
        title: "Centralized or Local Approval Chains",
        body: "Configure entity-specific Spend Programs and escalate cross-subsidiary or high-value requests to group finance automatically.",
      },
      {
        title: "Verified Group Vendor Directory",
        body: "Onboard suppliers once with verified bank details and share them across approved entities without duplicate vendor records.",
      },
      {
        title: "Live Consolidated Commitments",
        body: "Track open PO commitments, pending approvals, and scheduled AP payouts across all operating companies in real time.",
      },
    ],
    quote: {
      body: "We went live across four operating entities in days instead of waiting a year for a legacy ERP rollout.",
      attribution: "Group Controller, Regional Holding Company",
    },
  },
];

export function getSolutionPage(slug: string): SolutionPage | undefined {
  // Direct match
  const found = allSolutionPages.find((p) => p.slug === slug);
  if (found) return found;

  // Normalized alias fallbacks
  if (slug === "finance-leaders" || slug === "finance-teams" || slug === "cfos") {
    return allSolutionPages.find((p) => p.slug === "finance-leaders");
  }
  if (slug === "accounts-payable") {
    return allSolutionPages.find((p) => p.slug === "accounts-payable");
  }
  if (slug === "managers-employees") {
    return allSolutionPages.find((p) => p.slug === "managers-employees");
  }
  if (slug === "procurement-teams") {
    return allSolutionPages.find((p) => p.slug === "procurement-teams");
  }

  return undefined;
}

export const solutionPages = allSolutionPages;

