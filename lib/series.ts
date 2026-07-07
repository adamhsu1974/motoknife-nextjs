/**
 * 產品系列 UI 描述檔（非 CMS 資料）— 系列頁/導覽/PDF 的呈現設定。
 * 產品本身一律來自 Payload（lib/cms.ts）。
 */

export type SeriesSlug =
  | "score-cut"
  | "shear-cut"
  | "half-cut"
  | "hot-cut"
  | "knives"
  | "guide-bar";

export interface SeriesInfo {
  slug: SeriesSlug;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  cuttingMethod: string;
  materials: string[];
  keySpecs: { label: string; value: string; note?: string }[];
}

export const SERIES: SeriesInfo[] = [
  {
    slug: "score-cut",
    name: "Score Cut",
    fullName: "Score Cut Knife Holders",
    tagline: "Precision score cutting for flexible materials",
    description:
      "Score cut knife holders press a circular blade against a hardened anvil roller for clean separation. The most economic method for narrow-width slitting of films, paper, tapes, and nonwovens.",
    cuttingMethod: "Score Cut",
    materials: ["Plastic Film", "Paper", "Nonwoven", "Rubber", "Tape & Labels"],
    keySpecs: [
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Model Range", value: "8 models" },
      { label: "Duty Range", value: "Light to Heavy" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
    ],
  },
  {
    slug: "shear-cut",
    name: "Shear Cut",
    fullName: "Shear Cut Knife Holders",
    tagline: "High-performance shear slitting for demanding materials",
    description:
      "Shear cut knife holders use two blades in a scissor-like action for burr-free precision. The required method for metallic foils and the best choice for heavy board, thick films, and low-dust high-speed lines.",
    cuttingMethod: "Shear Cut",
    materials: ["Copper Foil", "Aluminum Foil", "Plastic Film", "Paper & Board", "Nonwoven"],
    keySpecs: [
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Model Range", value: "5 models" },
      { label: "Precision Line", value: "A410 / A450" },
      { label: "General Line", value: "A650 / A850 / A880" },
    ],
  },
  {
    slug: "half-cut",
    name: "Half Cut",
    fullName: "Half Cut Knife Holders",
    tagline: "Controlled depth cutting for medical laminates and labels",
    description:
      "Half cut knife holders cut through the top layer while leaving the backing liner intact — essential for medical patches, foam tapes, multi-layer dressings, and label converting.",
    cuttingMethod: "Half Cut",
    materials: ["Medical Patches", "Foam Tape", "Multi-layer Dressings", "Labels"],
    keySpecs: [
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Depth Control", value: "Micrometer" },
      { label: "Models", value: "A310 / A310H" },
    ],
  },
  {
    slug: "hot-cut",
    name: "Hot Cut",
    fullName: "Hot Cut Knife Holders",
    tagline: "Thermal slitting with fused, fray-free edges",
    description:
      "Hot cut knife holders melt through synthetic materials with a heated blade, fusing the edge as it cuts. The MT-A710 slits down to < 13mm — nearly half the minimum width of leading European competitors.",
    cuttingMethod: "Hot Cut",
    materials: ["Synthetic Fabric", "Webbing", "Woven Labels", "Chemical Fiber"],
    keySpecs: [
      { label: "Temperature", value: "600°C", note: "up to 650°C" },
      { label: "Min. Slit Width", value: "< 13mm" },
      { label: "Line Speed", value: "20 m/min", note: "up to 30 m/min" },
    ],
  },
  {
    slug: "knives",
    name: "Knives",
    fullName: "Slitting Knives & Score Blades",
    tagline: "Precision blades for all cutting methods",
    description:
      "High-precision slitting knives and score blades from premium tool steel and tungsten carbide, matched to every MOTOKNIFE holder.",
    cuttingMethod: "All Methods",
    materials: ["All Materials"],
    keySpecs: [
      { label: "Material", value: "HSS / Tungsten Carbide" },
      { label: "Hardness", value: "HRC 60–65" },
      { label: "Tolerance", value: "±0.005mm" },
    ],
  },
  {
    slug: "guide-bar",
    name: "Guide Bar",
    fullName: "Guide Bars",
    tagline: "High-rigidity bars for accurate knife positioning",
    description:
      "Precision-ground guide bars in round and square profiles ensure accurate, stable knife positioning across the full machine width.",
    cuttingMethod: "All Methods",
    materials: ["Universal"],
    keySpecs: [
      { label: "Straightness", value: "0.02mm/m" },
      { label: "Profiles", value: "Round / Square" },
      { label: "Lengths", value: "Up to 6000mm" },
    ],
  },
];

export const FAMILY_TIER_LABELS: Record<string, string> = {
  "light-medium": "Light / Medium Duty",
  "heavy-duty": "Heavy Duty",
  precision: "Precision",
  general: "General Purpose",
  medical: "Medical",
  "heat-sealed": "Heat-Sealed Edge",
};

export function getSeriesInfo(slug: string): SeriesInfo | undefined {
  return SERIES.find((s) => s.slug === slug);
}

export function seriesForProductType(type: string | null | undefined): SeriesInfo | undefined {
  if (type === "knife") return getSeriesInfo("knives");
  if (type === "guide-bar") return getSeriesInfo("guide-bar");
  return undefined;
}
