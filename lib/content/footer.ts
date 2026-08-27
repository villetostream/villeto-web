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
      heading: "Quick Links",
      links: [
        { label: "Finance Teams", href: "#finance-teams" },
        { label: "Operations", href: "#operations-teams" },
        { label: "Procurement Teams", href: "#procurement-teams" },
        { label: "Leadership", href: "#leadership-teams" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms & Conditions", href: "#terms" },
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
