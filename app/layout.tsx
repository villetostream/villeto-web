import type { Metadata } from "next";
import { Figtree, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { THEME_COOKIE, isTheme } from "@/lib/theme";
import { ThemeProvider } from "@/lib/theme-provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingThemeToggle } from "@/components/layout/FloatingThemeToggle";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://villeto.com"),
  title: {
    default: "Villeto — Control how money leaves your company",
    template: "%s | Villeto",
  },
  description:
    "Villeto helps organizations manage procurement, vendors, approvals, invoices, and payments in one connected finance operations platform.",
  keywords: ["spend control", "procurement", "finance operations", "vendor management", "invoice processing", "ERP", "approvals"],
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
    title: "Villeto — Control how money leaves your company",
    description: "Manage procurement, vendors, approvals, invoices, and payments in one connected finance operations platform.",
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
    title: "Villeto — Spend control for modern teams",
    description: "Control how money leaves your company. The connected finance operations platform.",
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
    <html lang="en" data-theme={theme} className={`${inter.variable}`} suppressHydrationWarning>
      <head>{!hasCookie && <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />}</head>
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
