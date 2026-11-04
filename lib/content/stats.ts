export type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  kicker: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    value: 100,
    suffix: "+",
    kicker: "Scale",
    label: "Enterprise customers",
    detail: "One operating record across finance and procurement.",
  },
  {
    value: 98,
    suffix: "%",
    kicker: "Accuracy",
    label: "Invoice auto-match rate",
    detail: "Fewer exceptions reach the finance queue.",
  },
  {
    value: 12,
    suffix: "x",
    kicker: "Speed",
    label: "Faster approval cycles",
    detail: "Requests arrive with context and the right route.",
  },
  {
    value: 200,
    suffix: "k+",
    prefix: "$",
    kicker: "Control",
    label: "Payments processed",
    detail: "Policy, approval, and payment stay connected.",
  },
];
