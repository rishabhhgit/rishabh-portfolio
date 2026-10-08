import type { Metadata, Viewport } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import { MotionProvider } from "@/components/layout/MotionProvider";
import Preloader from "@/components/layout/Preloader";
import SectionRail from "@/components/layout/SectionRail";

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

const title = "Rishabh Jain — UI/UX Designer, Full-Stack & AI/LLM";
const description =
  "Portfolio of Rishabh Jain — UI/UX and product designer who builds full-stack: clear interfaces for developer tools, real-time systems, and data platforms, backed by APIs, backend systems, and AI/LLM integration.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  keywords: [
    "UI/UX Designer",
    "Product Designer",
    "Interaction Design",
    "Full-Stack Developer",
    "Backend Developer",
    "AI LLM Integration",
    "Creative Developer",
    "Design Systems",
    "Design Portfolio",
    "Rishabh Jain",
  ],
  authors: [{ name: "Rishabh Jain" }],
  openGraph: {
    title,
    description:
      "UI/UX designer building full-stack — interfaces, backend, and AI/LLM for complex products.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Rishabh Jain",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "UI/UX designer building full-stack — interfaces, backend, and AI/LLM for complex products.",
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
          <Preloader />
          <SectionRail />
          <Navigation />
          <main>{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
