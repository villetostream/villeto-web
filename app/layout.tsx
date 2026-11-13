import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { THEME_COOKIE, isTheme } from "@/lib/theme";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingThemeToggle } from "@/components/layout/FloatingThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://villeto.com"),
  alternates: {
    canonical: "/",
  },
  applicationName: "Villeto",
  category: "finance",
  icons: {
    icon: "/images/villeto-v.png",
    apple: "/images/villeto-v.png",
  },
  title: {
    default: "Villeto — Spend Management, Procurement & AP Platform",
    template: "%s | Villeto",
  },
  description:
    "Connect purchase requests, approvals, purchase orders, supplier deliveries, invoices, expenses and AP records in one structured spend-control workflow.",
  keywords: ["spend management", "procurement to pay", "accounts payable workflow", "multi-entity finance", "vendor management", "spend controls", "purchase order management"],
  authors: [{ name: "Villeto" }],
  creator: "Villeto",
  publisher: "Villeto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Villeto",
    title: "Villeto — Spend Management & Procurement-to-AP",
    description: "Connect purchase requests, approvals, purchase orders, supplier deliveries, invoices and AP records in one structured spend-control workflow.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Villeto Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villeto — Spend Management for Multi-Entity Businesses",
    description: "One structured workflow connecting purchase requests, approvals, purchase orders, invoices, expenses and AP records.",
    images: ["/images/og-image.jpg"],
    creator: "@villeto_hq",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "aSYGFsZqzax_kqFLl3ozDEpUpKsMpOC1TqPJ2wshMN0",
  },
};

// Small blocking script — only runs on a person's very first visit, before
// any theme cookie exists, so the initial paint still matches their OS
// preference instead of defaulting to light (DESIGN_RULES.md Section 3/8/9).
const noFlashScript = `
(function () {
  try {
    var m = document.cookie.match(/(?:^|; )${THEME_COOKIE}=(dark|light)/);
    if (!m) {
      var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = dark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      document.cookie = '${THEME_COOKIE}=' + theme + '; path=/; max-age=31536000; SameSite=Lax';
    }
  } catch (e) {}
})();
`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get(THEME_COOKIE)?.value;
  const theme = isTheme(cookieTheme) ? cookieTheme : "light";
  const hasCookie = isTheme(cookieTheme);

  return (
    <html lang="en" data-theme={theme} className={inter.variable} suppressHydrationWarning>
      <head>
        {!hasCookie && <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />}
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider initialTheme={theme}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--accent-contrast)]"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
