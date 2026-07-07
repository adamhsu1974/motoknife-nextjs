import type { Metadata } from "next";

import { DEFAULT_LOCALE, LOCALES, hreflang, ogLocale, type Locale } from "./config";

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

interface PageMetadataArgs {
  lang: Locale;
  /** Path without locale prefix, e.g. "/products" or "" for home */
  path: string;
  title: string;
  description: string;
}

export function pageMetadata({ lang, path, title, description }: PageMetadataArgs): Metadata {
  const languages: Record<string, string> = {
    "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
  };
  for (const locale of LOCALES) {
    languages[hreflang(locale)] = `${SITE_URL}/${locale}${path}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}${path}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}${path}`,
      siteName: "MOTOKNIFE",
      locale: ogLocale(lang),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-default.png`],
    },
  };
}
