import type { Metadata } from "next";
import { DM_Sans, Barlow_Condensed } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MOTOKNIFE — Precision Slitting Solutions",
    template: "%s | MOTOKNIFE",
  },
  description:
    "High-performance knife holders and slitting knives for flexible material converting. Score Cut, Shear Cut, Half Cut, Hot Cut systems with ±0.005mm precision.",
  openGraph: {
    type: "website",
    siteName: "MOTOKNIFE",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 pt-[56px]">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
