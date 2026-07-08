"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { whatsappHref } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface FloatingCTAProps {
  lang: Locale;
  dict: Dictionary;
}

export default function FloatingCTA({ lang, dict }: FloatingCTAProps) {
  const pathname = usePathname();

  // Hide on contact page (overlaps the form) and on applications (its own destination)
  if (pathname === `/${lang}/contact` || pathname === `/${lang}/applications`) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp 快速入口 */}
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.contact.whatsappCta}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-colors hover:bg-[#1EBE5A]"
      >
        <WhatsAppIcon size={22} />
      </a>

      <Link
        href={`/${lang}/applications`}
        className="flex items-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-orange-hover"
      >
        <SearchIcon />
        <span className="hidden sm:inline">{dict.common.findTheRightSolution}</span>
        <span className="sm:hidden">{dict.common.findSolutionShort}</span>
      </Link>
    </div>
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
