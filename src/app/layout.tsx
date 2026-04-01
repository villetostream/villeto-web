import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const geistSans = Figtree({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Villeto — Spend Management",
  description: "The modern spend management platform for businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-white min-h-svh`}>
        {children}
      </body>
    </html>
  );
}
