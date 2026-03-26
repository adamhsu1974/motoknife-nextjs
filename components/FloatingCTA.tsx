"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const pathname = usePathname();

  // Hide on contact page to avoid overlapping the form
  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-lg bg-orange px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-orange-hover hover:shadow-xl"
    >
      <SearchIcon />
      <span className="hidden sm:inline">Find the Right Solution</span>
      <span className="sm:hidden">Get a Quote</span>
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
