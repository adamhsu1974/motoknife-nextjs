/**
 * ISO 3166-1 alpha-2 → numeric 對照（世界地圖 topojson 的 geo.id 為 numeric）。
 * 涵蓋現有代理商國家與主要潛在市場；新增代理商國家若不在表內，
 * 地圖不會高亮該國（詳情面板仍正常），在此補一行即可。
 */
export const ISO_ALPHA2_TO_NUMERIC: Record<string, string> = {
  // 現有代理商
  CL: "152", // Chile
  RU: "643", // Russia
  IN: "356", // India
  DE: "276", // Germany
  NL: "528", // Netherlands
  KR: "410", // South Korea
  // 主要市場（PLANNING 目標買家輪廓）
  US: "840",
  CA: "124",
  MX: "484",
  BR: "076",
  AR: "032",
  GB: "826",
  FR: "250",
  IT: "380",
  ES: "724",
  PL: "616",
  CZ: "203",
  TR: "792",
  VN: "704",
  TH: "764",
  ID: "360",
  MY: "458",
  PH: "608",
  JP: "392",
  CN: "156",
  TW: "158",
  AU: "036",
  NZ: "554",
  ZA: "710",
  EG: "818",
  AE: "784",
  SA: "682",
};

export function numericIdForCountry(alpha2: string): string | undefined {
  return ISO_ALPHA2_TO_NUMERIC[alpha2.toUpperCase()];
}
