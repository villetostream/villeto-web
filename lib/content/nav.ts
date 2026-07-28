export type NavLink = {
  label: string;
  href: string;
};

// "Company" is a single link. "Products" and "Solutions" each have 6 sub-items,
// so they use the tiled mega-menu pattern (DESIGN_RULES.md Section 5 table)
// instead of a plain link.
export const navLinks: NavLink[] = [{ label: "Company", href: "#company" }];

export const navMegaTriggers = [
  { label: "Products", key: "products" as const },
  { label: "Solutions", key: "solutions" as const },
];

// CTA cluster ordered by commitment level, per Section 5 hard rule.
export const navCtas = {
  signIn: { label: "Sign In", href: "https://app.villeto.com/login" },
  demo: { label: "See a Demo", href: "#demo" },
  primary: { label: "Get Started for free", href: "https://app.villeto.com/pre-onboarding" },
};

export const brand = {
  name: "Villeto",
  tagline: "Spend control",
};
