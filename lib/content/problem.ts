export const problemSection = {
  badge: "The Current Reality",
  heading: "Spending happens everywhere. Control happens nowhere.",
  narrative:
    "When purchase requests, invoices, and card swipes live in scattered inboxes and chats, finance teams spend month-end playing detective instead of closing the books.",
  painCards: [
    {
      id: "approvals",
      num: "01",
      title: "Approvals lost in chat & inboxes",
      body: "Purchase requests in email threads, verbal greenlights, and expense sign-offs on WhatsApp. No unified queue and zero audit trail.",
      tag: "Zero audit trail",
      icon: "message-circle-warning" as const,
    },
    {
      id: "invoices",
      num: "02",
      title: "Invoices arrive detached from reality",
      body: "AP receives a detached PDF with no line-item link to what was ordered, delivered, or authorized. Every payout is a judgment call.",
      tag: "Blind AP payments",
      icon: "file-question" as const,
    },
    {
      id: "expenses",
      num: "03",
      title: "Violations discovered post-mortem",
      body: "Unapproved spend and duplicate subscriptions aren't blocked at the swipe — they're flagged weeks later at month-end. By then, cash is already gone.",
      tag: "Delayed discovery",
      icon: "receipt" as const,
    },
    {
      id: "entities",
      num: "04",
      title: "Subsidiaries operating in blind silos",
      body: "Each entity runs separate spreadsheets, localized vendor lists, and uncoordinated currencies. Consolidation is a grueling manual marathon.",
      tag: "Manual consolidation",
      icon: "building-2" as const,
    },
  ],
};
