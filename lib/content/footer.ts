export const footer = {
  tagline: "The operating system for procurement and financial operations.",
  social: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "X", href: "#", icon: "x" },
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
  ] as const,
  columns: [
    {
      heading: "Solutions",
      links: [
        { label: "Finance Leaders", href: "/solutions/finance-leaders" },
        { label: "Procurement Teams", href: "/solutions/procurement-teams" },
        { label: "Accounts Payable", href: "/solutions/accounts-payable" },
        { label: "Managers & Employees", href: "/solutions/managers-employees" },
        { label: "CFOs & Controllers", href: "/solutions/cfos" },
      ],
    },
    {
      heading: "Platform & Portals",
      links: [
        { label: "Vendor Portal", href: "/vendors" },
        { label: "Cards & Expenses", href: "/products/cards-and-expenses" },
        { label: "Procurement Intake", href: "/products/procurement-intake" },
        { label: "BillPay", href: "/products/billpay" },
        { label: "Help & Support", href: "/support" },
      ],
    },
  ],
  contact: {
    heading: "Contact",
    phone: "+234 706 000 1234",
    email: "info@villeto.com",
  },
  copyrightYear: new Date().getFullYear().toString(),
  brand: "Villeto",
};
