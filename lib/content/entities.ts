export const multiEntitySection = {
  badge: "Entity Architecture",
  heading: "Built for one company today. Ready for ten tomorrow.",
  subhead:
    "Start with a single entity or scale across global subsidiaries. Each legal entity gets its own chart of accounts, base currency, fiscal calendar, and AP subledger — with one login and one unified approval queue.",
  entities: [
    {
      id: "ng",
      name: "Villeto Nigeria Ltd",
      currency: "NGN",
      flag: "🇳🇬",
      status: "4 open obligations",
      color: "bg-teal-500",
    },
    {
      id: "uk",
      name: "Villeto UK Ltd",
      currency: "GBP",
      flag: "🇬🇧",
      status: "2 invoices pending review",
      color: "bg-sky-500",
    },
    {
      id: "gh",
      name: "Villeto Ghana Ltd",
      currency: "GHS",
      flag: "🇬🇭",
      status: "1 approval awaiting",
      color: "bg-violet-500",
    },
  ],
  capabilities: [
    { title: "Single or multi-entity", body: "Operate as a standalone business or manage complex group subsidiaries under one roof." },
    { title: "Separate books", body: "Each entity has its own chart of accounts, fiscal periods, and immutable journals." },
    { title: "Multi-currency native", body: "Each entity operates in its own local currency: NGN, USD, GBP, EUR, KES, GHS." },
    { title: "Shared or isolated vendors", body: "Share approved suppliers across the group or keep them exclusive to one subsidiary." },
    { title: "Consolidated group view", body: "Finance leaders see obligations and cash commitments across all entities with one click." },
  ],
};

export const vendorPortalSection = {
  heading: "Your suppliers don't get a form. They get a workspace.",
  subhead:
    "Invite a supplier with a link. They verify their business, accept your orders, record deliveries, and invoice against the PO — in a workspace that also works for every other buyer they sell to. So they actually use it.",
  buyerBenefits: [
    { title: "Self-onboarding", body: "No data entry for AP. Suppliers register themselves with a business lookup and bank verification." },
    { title: "Bank details verified", body: "Account name checked against registered business name. Mismatches flagged before approval." },
    { title: "Invoices tied to evidence", body: "Every supplier invoice links to its PO and delivery record. AP reviews facts, not forwarded emails." },
    { title: "Conversations on the PO", body: "Messages tagged to the specific order — no more 'which order is this about?' emails." },
  ],
  supplierBenefits: [
    { title: "One account for all buyers", body: "Company switcher lets suppliers manage orders from multiple buyers in a single workspace." },
    { title: "Verified once, reused", body: "When a new buyer invites them, their profile and documents carry over — no re-onboarding." },
    { title: "Real-time invoice status", body: "See exactly where every invoice stands. No more calling AP to ask 'has it been approved?'" },
    { title: "Clear rejection reasons", body: "If an invoice is rejected, the supplier sees why and can fix and resubmit without starting over." },
  ],
  cta: { label: "See the vendor portal", href: "/vendors" },
};
