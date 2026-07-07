/**
 * 產品資料 — 型號依 PLANNING.md 第六章型號家族（真實型號）：
 * - Score Cut：A110 / A130 / A160 / B110 / C121（輕中型）＋ A140 / A170 / A510（重磅型）
 * - Shear Cut：A410 / A450（精密型）＋ A650 / A850 / A880（通用型）
 * - Half Cut：A310 / A310H
 * - Hot Cut：A710
 *
 * 規格標示原則（第六章）：雙值標示 — value 為保守值，note 標註極限值與條件。
 * 部分規格為工程預設值，待 GM 提供完整規格表（PLANNING.md 待辦 #2）後校正。
 */

export type SeriesSlug =
  | "score-cut"
  | "shear-cut"
  | "half-cut"
  | "hot-cut"
  | "knives"
  | "guide-bar";

export interface ProductSpec {
  label: string;
  value: string;
  note?: string;
}

export interface Product {
  model: string;
  slug: string;
  series: SeriesSlug;
  name: string;
  tier: string;
  summary: string;
  /** slittec 三段式：技術特點 → 解決什麼問題 → 適用材料 */
  description?: string[];
  keySpecs: ProductSpec[];
  specs: ProductSpec[];
  materials: string[];
  applicationSlugs: string[];
}

export interface ProductSeries {
  slug: SeriesSlug;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  cuttingMethod: string;
  materials: string[];
  keySpecs: ProductSpec[];
}

/* ─── Series ──────────────────────────────────────────────── */

export const PRODUCT_SERIES: ProductSeries[] = [
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

/* ─── Products ────────────────────────────────────────────── */

export const PRODUCTS: Product[] = [
  /* ── Score Cut · 輕中型 ─────────────────────────────────── */
  {
    model: "MT-A110",
    slug: "mt-a110",
    series: "score-cut",
    name: "Pneumatic Score Cut Knife Holder",
    tier: "Light / Medium Duty",
    summary:
      "The standard of the range — general-purpose pneumatic score cut holder for films, paper, tapes, and nonwovens.",
    description: [
      "A double-acting pneumatic cylinder and precision-ground internal components deliver consistent blade pressure across the full stroke. Every unit is manufactured on MAZAK CNC multi-tasking centers to ±0.005mm tolerance, with tool-free blade change for minimal downtime.",
      "Inconsistent knife pressure is the main cause of ragged edges, dust, and frequent operator adjustment on slitting lines. The MT-A110 holds set pressure reliably shift after shift, keeping edge quality stable at production speeds without babysitting.",
      "Suited to soft and rigid PVC, PP, PE and LDPE films, kraft and release papers, adhesive tapes, and general nonwovens — the first choice for standard score cut applications.",
    ],
    keySpecs: [
      { label: "Min. Slit Width", value: "12mm" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade", value: "Ø76.2mm" },
    ],
    specs: [
      { label: "Min. Slit Width", value: "12mm" },
      { label: "Max. Line Speed", value: "400 M/min", note: "up to 600 M/min, material-dependent" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade Diameter", value: "Ø76.2mm" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round / Square" },
    ],
    materials: ["Plastic Film", "Paper", "Tape & Labels", "Nonwoven"],
    applicationSlugs: ["plastic-film", "paper", "nonwoven"],
  },
  {
    model: "MT-A130",
    slug: "mt-a130",
    series: "score-cut",
    name: "Compact Score Cut Knife Holder",
    tier: "Light / Medium Duty",
    summary: "Compact holder for narrow-web slitting where mounting space is limited.",
    keySpecs: [
      { label: "Min. Slit Width", value: "8mm" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade", value: "Ø57mm" },
    ],
    specs: [
      { label: "Min. Slit Width", value: "8mm" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade Diameter", value: "Ø57mm" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round" },
    ],
    materials: ["Plastic Film", "Paper", "Tape & Labels"],
    applicationSlugs: ["plastic-film", "paper"],
  },
  {
    model: "MT-A160",
    slug: "mt-a160",
    series: "score-cut",
    name: "High-Speed Score Cut Knife Holder",
    tier: "Light / Medium Duty",
    summary: "Enhanced blade stability for high-speed paper and film lines.",
    keySpecs: [
      { label: "Max. Speed", value: "600 M/min" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade", value: "Ø76.2mm" },
    ],
    specs: [
      { label: "Max. Line Speed", value: "600 M/min" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade Diameter", value: "Ø76.2mm" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round / Square" },
    ],
    materials: ["Paper", "Plastic Film"],
    applicationSlugs: ["paper", "plastic-film"],
  },
  {
    model: "MT-B110",
    slug: "mt-b110",
    series: "score-cut",
    name: "Slim Score Cut Knife Holder",
    tier: "Light / Medium Duty",
    summary: "Slim-body economical holder for narrow-width tape and label slitting.",
    keySpecs: [
      { label: "Body Width", value: "Slim profile" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
    ],
    specs: [
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round" },
    ],
    materials: ["Tape & Labels", "Plastic Film"],
    applicationSlugs: ["plastic-film"],
  },
  {
    model: "MT-C121",
    slug: "mt-c121",
    series: "score-cut",
    name: "Mini Score Cut Knife Holder",
    tier: "Light / Medium Duty",
    summary: "The smallest holder in the score cut range — for the narrowest slit widths.",
    keySpecs: [
      { label: "Format", value: "Mini" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
    ],
    specs: [
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round" },
    ],
    materials: ["Tape & Labels", "Plastic Film"],
    applicationSlugs: ["plastic-film"],
  },

  /* ── Score Cut · 重磅型 ─────────────────────────────────── */
  {
    model: "MT-A140",
    slug: "mt-a140",
    series: "score-cut",
    name: "Heavy-Duty Score Cut Knife Holder",
    tier: "Heavy Duty",
    summary: "Controlled high-pressure score cutting for light rubber and thick flexible webs.",
    keySpecs: [
      { label: "Duty", value: "Heavy" },
      { label: "Air Pressure", value: "4–7 kg/cm²" },
    ],
    specs: [
      { label: "Air Pressure", value: "4–7 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Rubber", "Nonwoven", "Heavy Webs"],
    applicationSlugs: ["rubber", "nonwoven"],
  },
  {
    model: "MT-A170",
    slug: "mt-a170",
    series: "score-cut",
    name: "Heavy-Duty Score Cut Knife Holder — Large Chip Clearance",
    tier: "Heavy Duty",
    summary:
      "Large chip-clearance design keeps fibrous dust away from the cut — dust-free, lint-free slitting of nonwovens and rubber.",
    keySpecs: [
      { label: "Duty", value: "Heavy" },
      { label: "Design", value: "Large chip clearance" },
    ],
    specs: [
      { label: "Air Pressure", value: "4–7 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Nonwoven", "Rubber", "Heavy Composites"],
    applicationSlugs: ["nonwoven", "rubber"],
  },
  {
    model: "MT-A510",
    slug: "mt-a510",
    series: "score-cut",
    name: "Maximum-Duty Score Cut Knife Holder",
    tier: "Heavy Duty",
    summary:
      "The strongest score holder in the range — rubber magnetic sheet, fiberglass, and heavy composite webs.",
    keySpecs: [
      { label: "Duty", value: "Maximum" },
      { label: "Air Pressure", value: "4–8 kg/cm²" },
    ],
    specs: [
      { label: "Air Pressure", value: "4–8 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Rubber Magnetic Sheet", "Fiberglass", "Heavy Composites", "Nonwoven"],
    applicationSlugs: ["rubber", "nonwoven"],
  },

  /* ── Shear Cut · 精密型 ─────────────────────────────────── */
  {
    model: "MT-A410",
    slug: "mt-a410",
    series: "shear-cut",
    name: "Precision Shear Cut Knife Holder",
    tier: "Precision",
    summary:
      "Precision shear holder for ultra-thin battery-grade copper and aluminum foils — burr-free edges at 6–20 µm.",
    keySpecs: [
      { label: "Foil Range", value: "6–20 µm" },
      { label: "Edge Quality", value: "Burr-free" },
    ],
    specs: [
      { label: "Material Thickness", value: "6–20 µm" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Copper Foil", "Aluminum Foil"],
    applicationSlugs: ["metallic-foil"],
  },
  {
    model: "MT-A450",
    slug: "mt-a450",
    series: "shear-cut",
    name: "Precision Shear Cut Knife Holder",
    tier: "Precision",
    summary:
      "Precision shear cutting for standard metal foils, high-quality films, and low-dust nonwoven lines.",
    keySpecs: [
      { label: "Foil Range", value: "20–100 µm" },
      { label: "Edge Quality", value: "Burr-free" },
    ],
    specs: [
      { label: "Material Thickness", value: "20–100 µm" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Aluminum Foil", "Copper Foil", "Plastic Film", "Nonwoven"],
    applicationSlugs: ["metallic-foil", "plastic-film", "nonwoven"],
  },

  /* ── Shear Cut · 通用型 ─────────────────────────────────── */
  {
    model: "MT-A650",
    slug: "mt-a650",
    series: "shear-cut",
    name: "General-Purpose Shear Cut Knife Holder",
    tier: "General Purpose",
    summary: "Versatile shear holder for medium-gauge films, laminates, and paper.",
    keySpecs: [
      { label: "Duty", value: "Medium" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
    ],
    specs: [
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Plastic Film", "Paper", "Laminates"],
    applicationSlugs: ["plastic-film", "paper"],
  },
  {
    model: "MT-A850",
    slug: "mt-a850",
    series: "shear-cut",
    name: "Heavy-Duty Shear Cut Knife Holder",
    tier: "General Purpose",
    summary: "Heavy shear cutting for board stock, thick films, and demanding nonwoven lines.",
    keySpecs: [
      { label: "Duty", value: "Heavy" },
      { label: "Air Pressure", value: "4–7 kg/cm²" },
    ],
    specs: [
      { label: "Air Pressure", value: "4–7 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Paper & Board", "Plastic Film", "Nonwoven", "Heavy Composites"],
    applicationSlugs: ["paper", "plastic-film", "nonwoven"],
  },
  {
    model: "MT-A880",
    slug: "mt-a880",
    series: "shear-cut",
    name: "Maximum-Duty Shear Cut Knife Holder",
    tier: "General Purpose",
    summary: "The heaviest shear holder in the range — rigid sheet, roofing felt, reinforced composites.",
    keySpecs: [
      { label: "Duty", value: "Maximum" },
      { label: "Air Pressure", value: "4–8 kg/cm²" },
    ],
    specs: [
      { label: "Air Pressure", value: "4–8 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Square" },
    ],
    materials: ["Rigid Sheet", "Heavy Composites", "Board"],
    applicationSlugs: ["paper"],
  },

  /* ── Half Cut ───────────────────────────────────────────── */
  {
    model: "MT-A310",
    slug: "mt-a310",
    series: "half-cut",
    name: "Half Cut Knife Holder",
    tier: "Medical",
    summary:
      "Micrometer depth control cuts the product layer and leaves the release liner untouched — built for medical converting.",
    description: [
      "A micrometer depth-adjustment mechanism sets the blade penetration in precise increments, while the pneumatic system keeps cutting force constant as the blade wears. Manufactured to ±0.005mm tolerance on MAZAK CNC centers.",
      "In medical patch and foam tape converting, cutting a few microns too deep scraps the liner and the batch; too shallow leaves the layers attached. The MT-A310 holds a set depth across the full web width and run length, so kiss-cut quality does not drift.",
      "Designed for medical patches, foam tapes, and adhesive laminates on release liner — the applications behind Chapter 6's dedicated medical category.",
    ],
    keySpecs: [
      { label: "Depth Control", value: "Micrometer ±0.01mm" },
      { label: "Air Pressure", value: "2–5 kg/cm²" },
      { label: "Blade", value: "Ø76.2mm" },
    ],
    specs: [
      { label: "Depth Control", value: "Micrometer ±0.01mm" },
      { label: "Max. Line Speed", value: "300 M/min" },
      { label: "Air Pressure", value: "2–5 kg/cm²" },
      { label: "Blade Diameter", value: "Ø76.2mm" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round" },
    ],
    materials: ["Medical Patches", "Foam Tape", "Adhesive Laminates"],
    applicationSlugs: ["plastic-film"],
  },
  {
    model: "MT-A310H",
    slug: "mt-a310h",
    series: "half-cut",
    name: "Half Cut Knife Holder — Multi-Layer",
    tier: "Medical",
    summary: "Enhanced depth control for complex multi-layer medical dressings.",
    keySpecs: [
      { label: "Depth Control", value: "Micrometer ±0.01mm" },
      { label: "Layers", value: "Multi-layer" },
    ],
    specs: [
      { label: "Depth Control", value: "Micrometer ±0.01mm" },
      { label: "Air Pressure", value: "2–5 kg/cm²" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round" },
    ],
    materials: ["Multi-layer Dressings", "Medical Laminates"],
    applicationSlugs: ["plastic-film"],
  },

  /* ── Hot Cut ────────────────────────────────────────────── */
  {
    model: "MT-A710",
    slug: "mt-a710",
    series: "hot-cut",
    name: "Hot Cut Knife Holder",
    tier: "Heat-Sealed Edge",
    summary:
      "600°C heated blade fuses synthetic edges while cutting — and slits down to < 13mm, nearly half the minimum width of leading European systems.",
    description: [
      "A temperature-controlled blade heated to 600°C (capable of 650°C under suitable conditions) melts cleanly through synthetic webs, fusing the edge in the same pass. PID control keeps blade temperature stable across long production runs.",
      "Cut synthetic webbing or woven labels with a cold blade and the edge frays — fibers pull loose in downstream handling and the product is rejected. The MT-A710 seals the edge as it cuts, eliminating fraying entirely. Its < 13mm minimum slit width opens narrow-web products (webbing, woven labels, medical tapes) that competing hot cut systems, typically limited to 25mm, cannot reach.",
      "Designed for chemical fiber fabrics, synthetic webbing, woven label tapes, and any thermoplastic web where a fused, fray-free edge is required.",
    ],
    keySpecs: [
      { label: "Temperature", value: "600°C", note: "up to 650°C" },
      { label: "Min. Slit Width", value: "< 13mm" },
      { label: "Line Speed", value: "20 m/min", note: "up to 30 m/min" },
    ],
    specs: [
      { label: "Heating Temperature", value: "600°C", note: "up to 650°C, condition-dependent" },
      { label: "Min. Slit Width", value: "< 13mm", note: "vs. < 25mm typical for competing systems" },
      { label: "Line Speed", value: "20 m/min", note: "up to 30 m/min on selected materials" },
      { label: "Temperature Control", value: "PID digital" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Guide Bar", value: "Round" },
    ],
    materials: ["Synthetic Fabric", "Webbing", "Woven Labels", "Chemical Fiber"],
    applicationSlugs: ["nonwoven"],
  },

  /* ── Knives & Guide Bars（配件） ─────────────────────────── */
  {
    model: "MK-S76",
    slug: "mk-s76",
    series: "knives",
    name: "Score Blade Ø76.2mm",
    tier: "Blade",
    summary: "Standard score blade for MT score cut holders — HSS M2, HRC 62.",
    keySpecs: [
      { label: "Diameter", value: "Ø76.2mm" },
      { label: "Material", value: "HSS M2" },
    ],
    specs: [
      { label: "Diameter", value: "Ø76.2mm" },
      { label: "Material", value: "HSS M2" },
      { label: "Hardness", value: "HRC 62" },
      { label: "Edge Angle", value: "20°" },
    ],
    materials: ["All Materials"],
    applicationSlugs: [],
  },
  {
    model: "MK-R100",
    slug: "mk-r100",
    series: "knives",
    name: "Shear Cut Round Knife Ø100mm",
    tier: "Blade",
    summary: "Tungsten carbide shear knife for maximum edge life.",
    keySpecs: [
      { label: "Diameter", value: "Ø100mm" },
      { label: "Material", value: "Tungsten Carbide" },
    ],
    specs: [
      { label: "Diameter", value: "Ø100mm" },
      { label: "Material", value: "Tungsten Carbide" },
      { label: "Hardness", value: "HRC 65" },
      { label: "Edge Type", value: "Flat / Bevel" },
    ],
    materials: ["All Materials"],
    applicationSlugs: [],
  },
  {
    model: "GB-R25",
    slug: "gb-r25",
    series: "guide-bar",
    name: "Round Guide Bar Ø25mm",
    tier: "Guide Bar",
    summary: "Chrome-plated round guide bar for standard knife holders.",
    keySpecs: [
      { label: "Profile", value: "Round Ø25mm" },
      { label: "Straightness", value: "0.02mm/m" },
    ],
    specs: [
      { label: "Profile", value: "Round Ø25mm" },
      { label: "Material", value: "Chrome-plated steel" },
      { label: "Max. Length", value: "4000mm" },
      { label: "Straightness", value: "0.02mm/m" },
    ],
    materials: ["Universal"],
    applicationSlugs: [],
  },
  {
    model: "GB-S30",
    slug: "gb-s30",
    series: "guide-bar",
    name: "Square Guide Bar 30×30mm",
    tier: "Guide Bar",
    summary: "Square guide bar for heavy-duty holder mounting.",
    keySpecs: [
      { label: "Profile", value: "Square 30×30mm" },
      { label: "Straightness", value: "0.02mm/m" },
    ],
    specs: [
      { label: "Profile", value: "Square 30×30mm" },
      { label: "Material", value: "Chrome-plated steel" },
      { label: "Max. Length", value: "6000mm" },
      { label: "Straightness", value: "0.02mm/m" },
    ],
    materials: ["Universal"],
    applicationSlugs: [],
  },
];

/* ─── Helpers ─────────────────────────────────────────────── */

export function getSeriesBySlug(slug: string): ProductSeries | undefined {
  return PRODUCT_SERIES.find((s) => s.slug === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsBySeries(series: SeriesSlug): Product[] {
  return PRODUCTS.filter((p) => p.series === series);
}
