import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export default function Footer({ lang, dict }: FooterProps) {
  const footerNav = [
    {
      title: dict.footer.productsTitle,
      links: [
        { href: `/${lang}/products/score-cut`, label: "Score Cut" },
        { href: `/${lang}/products/shear-cut`, label: "Shear Cut" },
        { href: `/${lang}/products/half-cut`, label: "Half Cut" },
        { href: `/${lang}/products/hot-cut`, label: "Hot Cut" },
        { href: `/${lang}/products/knives`, label: "Knives" },
        { href: `/${lang}/products/guide-bar`, label: "Guide Bar" },
      ],
    },
    {
      title: dict.footer.applicationsTitle,
      links: [
        { href: `/${lang}/applications/plastic-film`, label: "Plastic Film" },
        { href: `/${lang}/applications/metallic-foil`, label: "Metallic Foil" },
        { href: `/${lang}/applications/rubber`, label: "Rubber" },
        { href: `/${lang}/applications/paper`, label: "Paper" },
        { href: `/${lang}/applications/nonwoven`, label: "Nonwoven" },
      ],
    },
    {
      title: dict.footer.companyTitle,
      links: [
        { href: `/${lang}/about`, label: dict.footer.aboutUs },
        { href: `/${lang}/distributors`, label: dict.nav.distributors },
        { href: `/${lang}/products/cutting-methods`, label: dict.common.cuttingMethods },
        { href: `/${lang}/contact`, label: dict.nav.contact },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link href={`/${lang}`} className="text-xl font-bold tracking-wider">
              MOTOKNIFE
            </Link>
            <p className="mt-2 text-sm text-white/50">
              {dict.footer.companyLegalName}
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>service@motoknife.com</p>
              <p>+886-2-2688-5677</p>
            </div>
          </div>

          {/* Nav Columns */}
          {footerNav.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {dict.footer.companyLegalName}.{" "}
            {dict.footer.allRightsReserved}
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <Link href="/en" className={lang === "en" ? "text-white/80" : "hover:text-white/70"}>
              EN
            </Link>
            <Link
              href="/zh-tw"
              className={lang === "zh-tw" ? "text-white/80" : "hover:text-white/70"}
            >
              繁中
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
