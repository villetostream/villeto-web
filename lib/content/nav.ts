import type { NavMenuKey } from "./mega-nav";

export type NavLink = {
  label: string;
  href: string;
};

// "Company" is a single link. "Products" and "Solutions" each have sub-items
export const navLinks: NavLink[] = [
  { label: "Vendor Portal", href: "/vendors" },
  { label: "Support", href: "/support" },
];

export const navMegaTriggers: Array<{ label: string; key: NavMenuKey }> = [
  { label: "Products", key: "products" as const },
  { label: "Solutions", key: "solutions" as const },
  { label: "Company", key: "company" as const },
];

// CTA cluster ordered by commitment level.
export const navCtas = {
  signIn: { label: "Sign In", href: "https://app.villeto.com/login" },
  primary: { label: "Get Started for free", href: "https://app.villeto.com/pre-onboarding" },
};

export const brand = {
  name: "Villeto",
  tagline: "Spend control",
};
