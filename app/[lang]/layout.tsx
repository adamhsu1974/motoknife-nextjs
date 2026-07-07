import type { Metadata } from "next";
import { DM_Sans, Barlow_Condensed } from "next/font/google";
import { notFound } from "next/navigation";

import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LOCALES, htmlLang, isLocale, ogLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

import "../globals.css";

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

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.home.title,
      template: "%s | MOTOKNIFE",
    },
    description: dict.meta.home.description,
    openGraph: {
      type: "website",
      siteName: "MOTOKNIFE",
      locale: ogLocale(locale),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={htmlLang(lang)}
      className={`${dmSans.variable} ${barlow.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navbar lang={lang} dict={dict} />
        <main className="flex-1 pt-[56px]">{children}</main>
        <Footer lang={lang} dict={dict} />
        <FloatingCTA lang={lang} dict={dict} />
      </body>
    </html>
  );
}
