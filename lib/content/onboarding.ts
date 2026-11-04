export const gettingStarted = {
  heading: "Set up in steps, not a project.",
  subhead: "You control what goes live and when. Start with one workflow and add more as your team is ready. Not months. Not weeks. Steps.",
  steps: [
    {
      number: "1",
      title: "Register your company",
      body: "Business details, owners and officers, and your primary legal entity currency.",
    },
    {
      number: "2",
      title: "Choose what you need",
      body: "Expense management, procurement, vendor portal, and AP subledger. Start with one and add more later.",
    },
    {
      number: "3",
      title: "Invite your team and suppliers",
      body: "Invite colleagues by role. Suppliers self-onboard through a guided link with automated bank verification.",
    },
    {
      number: "4",
      title: "Configure your policies",
      body: "Set up Expense Policies for employee spend and 3-stage Spend Programs for procurement before spend is committed.",
    },
  ],
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: "policies" | "procurement" | "accounting" | "vendors" | "setup";
};

export const faqSection: { heading: string; items: FaqItem[] } = {
  heading: "Frequently asked questions.",
  items: [
    {
      id: "single-entity",
      category: "accounting",
      question: "Is Villeto only for companies with multiple entities?",
      answer:
        "No. A single company gets the exact same pre-spend controls, card expense tracking, and 3-way invoice matching. Multi-entity support is built for groups operating subsidiaries, and it's ready whenever you expand.",
    },
    {
      id: "separation-of-duties",
      category: "policies",
      question: "Can employees approve their own spend?",
      answer:
        "Never. Separation of duties is structurally enforced. Requesters cannot approve their own purchase orders or expense reports, and high-value purchases automatically route up the chain for finance or director authorization.",
    },
    {
      id: "supplier-cost",
      category: "vendors",
      question: "Do our suppliers need to pay or install software?",
      answer:
        "No. Suppliers join through an email invite and use a free, secure web portal to accept purchase orders, provide delivery tracking, and submit invoices. There is nothing to install.",
    },
    {
      id: "bank-verification",
      category: "vendors",
      question: "How do you verify supplier bank details?",
      answer:
        "During onboarding, the supplier's bank account name is checked against their registered CAC / TIN legal business name. Any mismatch is flagged immediately so finance can verify credentials before releasing payment.",
    },
    {
      id: "three-way-matching",
      category: "procurement",
      question: "How does invoice matching prevent wrong payments?",
      answer:
        "Villeto uses automated 3-way matching: it reconciles the purchase order, the receiving dock goods receipt, and the supplier invoice line-by-line. If quantities or prices don't match, the invoice is held and cannot post to your subledger.",
    },
    {
      id: "policy-rules",
      category: "policies",
      question: "Can we set different rules for different teams?",
      answer:
        "Yes. You can define Expense Policies for employee cards and travel limits, and 3-stage Spend Programs for department procurement. Rules can require budget headroom checks, mandate 3 quotes for large orders, or flag missing receipts.",
    },
    {
      id: "policy-breach",
      category: "policies",
      question: "What happens when someone breaks a policy?",
      answer:
        "You decide. Rules can hard-block the action, show a real-time warning, require a written justification, or automatically escalate to a department head or CFO for review.",
    },
    {
      id: "does-villeto-move-money",
      category: "accounting",
      question: "Does Villeto hold our money or move funds?",
      answer:
        "Villeto manages the governance, approvals, 3-way matching, and subledger accounting of what you owe. When a bill is approved, it schedules the payout. Cash moves through your existing corporate bank accounts — Villeto provides the verified payment trail.",
    },
    {
      id: "accounting",
      category: "accounting",
      question: "Does Villeto replace our accounting software?",
      answer:
        "Villeto acts as your pre-accounting spend gate and AP subledger — maintaining charts of accounts, fiscal calendars, immutable double-entry journal vouchers, and an open obligations ledger. You can export audit-ready records anytime.",
    },
    {
      id: "currencies",
      category: "accounting",
      question: "Which currencies do you support?",
      answer:
        "Each legal entity has its own base currency. Procurement natively supports NGN, USD, GBP, EUR, KES, and GHS — tracking subsidiary obligations without messy currency mixing.",
    },
    {
      id: "setup-time",
      category: "setup",
      question: "How long does setup take?",
      answer:
        "Days, not months. You can start with a single workflow — like employee card expenses or procurement purchase orders — and activate vendor onboarding and AP subledgers when you're ready. No six-month consulting rollouts.",
    },
    {
      id: "free-trial",
      category: "setup",
      question: "Can we try it before committing?",
      answer:
        "Yes. You can sign up for free, set up your organization workspace, configure your policies, and test the full workflow with your team.",
    },
  ],
};
