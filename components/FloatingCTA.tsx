"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FloatingCTAProps {
  lang: Locale;
  dict: Dictionary;
}

export default function FloatingCTA({ lang, dict }: FloatingCTAProps) {
  const pathname = usePathname();

  // Hide on contact page to avoid overlapping the form
  if (pathname === `/${lang}/contact`) return null;

  return (
    <Link
      href={`/${lang}/contact`}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-hover hover:shadow-xl"
    >
      <SearchIcon />
      <span className="hidden sm:inline">{dict.common.findTheRightSolution}</span>
      <span className="sm:hidden">{dict.nav.getAQuote}</span>
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
