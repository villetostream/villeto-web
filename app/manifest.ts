import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Villeto — Spend Management, Procurement & AP Platform",
    short_name: "Villeto",
    description:
      "Connect purchase requests, approvals, purchase orders, supplier deliveries, invoices, expenses and AP records in one structured spend-control workflow.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0ea894",
    icons: [
      {
        src: "/images/villeto-v.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

