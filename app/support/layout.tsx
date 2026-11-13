import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & FAQ",
  description:
    "Answers to common questions about Villeto Spend Programs, Expense Policies, 3-way invoice matching, CAC/TIN vendor verification, multi-entity accounting, and setup.",
  alternates: {
    canonical: "/support",
  },
  openGraph: {
    title: "Support & FAQ | Villeto",
    description:
      "Answers to common questions about Villeto Spend Programs, 3-way matching, vendor verification, and multi-entity spend management.",
    url: "/support",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return children;
}

