"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";

const COPY: Record<Locale, {
  title: string;
  text: string;
  suggestionsLabel: string;
  cta: string;
}> = {
  en: {
    title: "Page Not Found",
    text: "The page you are looking for doesn't exist or has been moved. Perhaps one of these will help:",
    suggestionsLabel: "Popular pages",
    cta: "Get a Quote",
  },
  "zh-tw": {
    title: "找不到頁面",
    text: "您要找的頁面不存在或已移動，以下連結或許能幫上忙：",
    suggestionsLabel: "熱門頁面",
    cta: "立即詢價",
  },
};

const SUGGESTIONS: Record<Locale, { href: string; label: string }[]> = {
  en: [
    { href: "/products", label: "Products — knife holders by cutting method" },
    { href: "/applications", label: "Applications — find tools by your material" },
    { href: "/distributors", label: "Distributors — your local partner" },
    { href: "/about", label: "About MOTOKNIFE" },
  ],
  "zh-tw": [
    { href: "/products", label: "產品——依切割方式瀏覽刀座" },
    { href: "/applications", label: "應用場景——依材料選型" },
    { href: "/distributors", label: "全球代理——尋找當地夥伴" },
    { href: "/about", label: "關於友聚" },
  ],
};

export default function NotFound() {
  const pathname = usePathname();
  const maybeLang = pathname.split("/")[1] ?? "";
  const lang: Locale = isLocale(maybeLang) ? maybeLang : DEFAULT_LOCALE;
  const copy = COPY[lang];

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-20 text-center">
        <p className="text-8xl font-medium text-text-muted">404</p>
        <h1 className="mt-4 text-2xl font-medium text-text-primary md:text-3xl">{copy.title}</h1>
        <p className="mx-auto mt-4 max-w-md text-text-secondary">{copy.text}</p>

        <div className="mx-auto mt-10 max-w-md rounded-lg border border-border p-6 text-left">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            {copy.suggestionsLabel}
          </p>
          <ul className="mt-3 space-y-2">
            {SUGGESTIONS[lang].map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${lang}${item.href}`}
                  className="text-sm text-text-secondary transition-colors hover:text-orange-text"
                >
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/${lang}/contact`}
          className="mt-10 inline-block rounded bg-orange px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-orange-hover"
        >
          {copy.cta}
        </Link>
      </div>
    </div>
  );
}
