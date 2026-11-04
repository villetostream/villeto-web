export type NavLink = {
  label: string;
  href: string;
};

// "Company" is a single link. "Products" and "Solutions" each have sub-items
export const navLinks: NavLink[] = [
  { label: "Vendor Portal", href: "/vendors" },
  { label: "Support", href: "/support" },
];

export const navMegaTriggers = [
  { label: "Products", key: "products" as const },
  { label: "Solutions", key: "solutions" as const },
];

// CTA cluster ordered by commitment level.
export const navCtas = {
  signIn: { label: "Sign In", href: "https://app.villeto.com/login" },
  primary: { label: "Get Started for free", href: "https://app.villeto.com/signup" },
};

export const brand = {
  name: "Villeto",
  tagline: "Spend control",
};
