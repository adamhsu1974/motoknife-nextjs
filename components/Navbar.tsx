"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALES, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const LANGUAGE_LABELS: Record<Locale, string> = {
  en: "EN",
  "zh-tw": "繁中",
};

interface NavbarProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const pathname = usePathname();

  const productItems = [
    { href: `/${lang}/products/score-cut`, label: "Score Cut" },
    { href: `/${lang}/products/shear-cut`, label: "Shear Cut" },
    { href: `/${lang}/products/half-cut`, label: "Half Cut" },
    { href: `/${lang}/products/hot-cut`, label: "Hot Cut" },
    { href: `/${lang}/products/knives`, label: "Knives" },
    { href: `/${lang}/products/guide-bar`, label: "Guide Bar" },
  ];

  const navLinks = [
    { href: `/${lang}/applications`, label: dict.nav.applications },
    { href: `/${lang}/distributors`, label: dict.nav.distributors },
    { href: `/${lang}/about`, label: dict.nav.about },
  ];

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  function switchLocaleHref(target: Locale): string {
    const rest = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "");
    return `/${target}${rest}`;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-dark shadow-lg shadow-black/20"
          : "bg-navy"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 text-white"
          onClick={closeMobileMenu}
        >
          <MotoknifeLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <Link
              href={`/${lang}/products`}
              aria-haspopup="menu"
              aria-expanded={isProductsOpen}
              className="relative flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:scale-x-0 after:bg-orange after:transition-transform hover:after:scale-x-100"
            >
              {dict.nav.products}
              <ChevronDownIcon />
            </Link>
            {isProductsOpen && (
              <div className="absolute left-0 top-full w-56 rounded-b bg-navy-dark py-2 shadow-xl shadow-black/30">
                {productItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsProductsOpen(false)}
                    className="block px-5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-orange"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mx-5 my-2 border-t border-white/10" />
                <Link
                  href={`/${lang}/products/cutting-methods`}
                  onClick={() => setIsProductsOpen(false)}
                  className="block px-5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-orange"
                >
                  {dict.common.cuttingMethods}
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:scale-x-0 after:bg-orange after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden items-center gap-4 lg:flex">
          {/* Language Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              onBlur={() => setTimeout(() => setIsLangOpen(false), 150)}
              className="flex items-center gap-1 rounded px-2 py-1 text-sm text-white/70 transition-colors hover:text-white"
              aria-label="Switch language"
            >
              <GlobeIcon />
              <span>{LANGUAGE_LABELS[lang]}</span>
              <ChevronDownIcon />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[80px] rounded bg-navy-dark py-1 shadow-lg">
                {LOCALES.map((locale) => (
                  <Link
                    key={locale}
                    href={switchLocaleHref(locale)}
                    onClick={() => setIsLangOpen(false)}
                    className={`block w-full px-4 py-1.5 text-left text-sm transition-colors ${
                      lang === locale
                        ? "text-orange"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {LANGUAGE_LABELS[locale]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <Link
            href={`/${lang}/contact`}
            className="rounded bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            {dict.nav.getAQuote}
          </Link>
        </div>

        {/* Mobile: CTA + Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={`/${lang}/contact`}
            className="rounded bg-orange px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-orange-hover"
            onClick={closeMobileMenu}
          >
            {dict.nav.getAQuote}
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center text-white"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[56px] z-40 bg-navy/95 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 py-8">
          <div className="flex flex-col gap-1">
            {/* Products expandable group */}
            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                aria-expanded={isMobileProductsOpen}
                className="flex w-full items-center justify-between py-4 text-lg font-medium text-white/85 transition-colors hover:text-orange"
              >
                {dict.nav.products}
                <span className={`transition-transform ${isMobileProductsOpen ? "rotate-180" : ""}`}>
                  <ChevronDownIcon />
                </span>
              </button>
              {isMobileProductsOpen && (
                <div className="pb-3 pl-4">
                  {[
                    ...productItems,
                    { href: `/${lang}/products/cutting-methods`, label: dict.common.cuttingMethods },
                    { href: `/${lang}/products`, label: dict.nav.products },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block py-2.5 text-base text-white/60 transition-colors hover:text-orange"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="border-b border-white/10 py-4 text-lg font-medium text-white/85 transition-colors hover:text-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="mt-8 flex gap-3">
            {LOCALES.map((locale) => (
              <Link
                key={locale}
                href={switchLocaleHref(locale)}
                onClick={closeMobileMenu}
                className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                  lang === locale
                    ? "bg-orange text-white"
                    : "bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {LANGUAGE_LABELS[locale]}
              </Link>
            ))}
          </div>

          {/* Mobile Bottom CTA */}
          <div className="mt-auto pb-8">
            <Link
              href={`/${lang}/contact`}
              onClick={closeMobileMenu}
              className="block w-full rounded bg-orange py-4 text-center text-base font-semibold text-white transition-colors hover:bg-orange-hover"
            >
              {dict.nav.getAQuote}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Inline SVG Icons ────────────────────────────────────── */

function MotoknifeLogo() {
  return (
    <span className="text-lg font-bold tracking-wider lg:text-xl">
      MOTOKNIFE
    </span>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
