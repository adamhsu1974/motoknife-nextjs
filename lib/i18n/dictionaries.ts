import en from "@/messages/en.json";
import zhTw from "@/messages/zh-tw.json";

import type { Locale } from "./config";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  "zh-tw": zhTw,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
