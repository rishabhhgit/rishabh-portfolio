import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import { MotionProvider } from "@/components/layout/MotionProvider";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rishabh-portfolio.vercel.app";

const title = "Rishabh Jain — UI/UX Designer & Creative Developer";
const description =
  "Portfolio of Rishabh Jain — UI/UX and product designer crafting clear interfaces for developer tools, real-time systems, and data platforms, and carrying them through to production.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Interaction Design",
    "Creative Developer",
    "Design Systems",
    "Design Portfolio",
    "Rishabh Jain",
  ],
  authors: [{ name: "Rishabh Jain" }],
  openGraph: {
    title,
    description:
      "UI/UX designer and creative developer — clear interfaces for complex products.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rishabh Jain",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "UI/UX designer and creative developer — clear interfaces for complex products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F2ECDD",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <MotionProvider>
          {/* Film-grain texture overlay */}
          <div className="grain-overlay" aria-hidden="true" />
          <Navigation />
          <main>{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
