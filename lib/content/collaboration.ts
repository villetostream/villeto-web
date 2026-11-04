export const collaborationSection = {
  heading: "The conversation stays with the purchase.",
  subhead:
    "No more searching WhatsApp for 'that invoice query.' In Villeto, every discussion lives inside the request, order, or invoice it's about — so the context and the audit trail stay together.",
  points: [
    {
      id: "team-threads",
      title: "Team threads",
      body: "Approvers, procurement, and finance discuss a request without leaving it. Internal conversations never leave the platform.",
      icon: "users" as const,
    },
    {
      id: "supplier-threads",
      title: "Supplier threads tied to the PO",
      body: "Every message is tagged to the order or invoice. Suppliers see only what's meant for them — never your internal discussions.",
      icon: "message-circle" as const,
    },
    {
      id: "audit-trail",
      title: "An audit trail you didn't have to build",
      body: "When someone asks why an invoice was approved or a delivery was accepted, the conversation is right there — timestamped and tied to the record.",
      icon: "shield-check" as const,
    },
  ],
  // Mock conversation for visual
  mockThread: {
    poNumber: "PO-2026-0142",
    vendor: "Acme Ltd",
    messages: [
      {
        type: "internal" as const,
        sender: "Fatima A.",
        role: "Procurement",
        initials: "FA",
        color: "bg-violet-500",
        text: "Can we split delivery into two batches? Warehouse B isn't ready.",
        time: "10:23 AM",
      },
      {
        type: "internal" as const,
        sender: "Chidi E.",
        role: "Finance Lead",
        initials: "CE",
        color: "bg-sky-500",
        text: "Works for us — just ensure both are received before month end.",
        time: "10:41 AM",
      },
      {
        type: "supplier" as const,
        sender: "Emeka O.",
        role: "Acme Ltd",
        initials: "EO",
        color: "bg-emerald-500",
        text: "Confirmed. 60 units Friday, 40 next Wednesday.",
        time: "11:15 AM",
      },
    ],
  },
};
