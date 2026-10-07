import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Rishabh Jain — UI/UX Designer & Creative Developer",
  description:
    "UI/UX and product design portfolio of Rishabh Jain, focused on thoughtful interfaces for AI products, developer tools, real-time systems and data-driven applications.",
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Creative Developer",
    "Interaction Design",
    "Design Portfolio",
    "Rishabh Jain",
  ],
  authors: [{ name: "Rishabh Jain" }],
  openGraph: {
    title: "Rishabh Jain — UI/UX Designer & Creative Developer",
    description:
      "Designing interfaces for complex digital products — AI tools, developer environments, real-time systems, and data-driven platforms.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Jain — UI/UX Designer & Creative Developer",
    description:
      "Designing interfaces for complex digital products — AI tools, developer environments, real-time systems, and data-driven platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FDFDFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Film-grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
