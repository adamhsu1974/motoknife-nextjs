import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { DistributorCountryGroup } from "@/lib/cms-types";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
  distributorCountries: DistributorCountryGroup[];
}

export default function Footer({ lang, dict, distributorCountries }: FooterProps) {
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
      title: dict.footer.companyTitle,
      links: [
        { href: `/${lang}/about`, label: dict.footer.aboutUs },
        { href: `/${lang}/services`, label: dict.nav.services },
        { href: `/${lang}/applications`, label: dict.nav.applications },
        { href: `/${lang}/products/cutting-methods`, label: dict.common.cuttingMethods },
        { href: `/${lang}/news`, label: dict.news.heading },
        { href: `/${lang}/contact`, label: dict.nav.contact },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Offices */}
          <div>
            <Link href={`/${lang}`} className="text-xl font-bold tracking-wider">
              MOTOKNIFE
            </Link>
            <p className="mt-2 text-sm text-white/50">
              {dict.footer.companyLegalName}
            </p>

            <div className="mt-6 space-y-5 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  {dict.footer.taiwanHq}
                </p>
                <div className="mt-2 space-y-1 text-white/60">
                  <p>{dict.footer.taiwanAddress}</p>
                  <p>TEL +886-3-4753005</p>
                  <p>FAX +886-3-4754797</p>
                  <p>service@motoknife.com</p>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-[#25D366]"
                  >
                    <WhatsAppIcon size={14} />
                    {WHATSAPP_DISPLAY}
                  </a>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  {dict.footer.shanghaiOffice}
                </p>
                <div className="mt-2 space-y-1 text-white/60">
                  <p>{dict.footer.shanghaiAddress}</p>
                  <p>TEL +86-21-69596169</p>
                  <p>FAX +86-21-69596163</p>
                  <p>motokevin@126.com</p>
                </div>
              </div>
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

          {/* Distributor quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
              {dict.footer.distributorsTitle}
            </h3>
            <ul className="mt-4 space-y-2">
              {distributorCountries.map((country) => (
                <li key={country.countryCode}>
                  <Link
                    href={`/${lang}/distributors`}
                    className="text-sm text-white/50 transition-colors hover:text-orange"
                  >
                    {country.countryName}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${lang}/distributors`}
                  className="text-sm font-medium text-orange transition-colors hover:text-orange-hover"
                >
                  {dict.footer.allDistributors} →
                </Link>
              </li>
            </ul>
          </div>
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
