import type { NavMenuKey } from "./mega-nav";

export const navMegaTriggers: Array<{ label: string; key: NavMenuKey }> = [
  { label: "Products", key: "products" as const },
  { label: "Solutions", key: "solutions" as const },
  { label: "Company", key: "company" as const },
];

// CTA cluster ordered by commitment level, per Section 5 hard rule.
export const navCtas = {
  signIn: { label: "Sign In", href: "https://app.villeto.com/login" },
  demo: { label: "See a Demo", href: "/#get-started" },
  primary: { label: "Get Started for free", href: "https://app.villeto.com/pre-onboarding" },
};

export const brand = {
  name: "Villeto",
  tagline: "Spend control",
};
