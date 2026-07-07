export const LOCALES = ["en", "zh-tw"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function htmlLang(locale: Locale): string {
  return locale === "zh-tw" ? "zh-TW" : "en";
}

export function hreflang(locale: Locale): string {
  return locale === "zh-tw" ? "zh-TW" : "en";
}

export function ogLocale(locale: Locale): string {
  return locale === "zh-tw" ? "zh_TW" : "en_US";
}
