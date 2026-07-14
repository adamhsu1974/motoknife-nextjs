/**
 * 產品資料 — 型號依 PLANNING.md 第六章型號家族（真實型號）：
 * - Score Cut：A110 / A130 / A160 / B110 / C121（輕型 Light Duty，可視需要改為 Medium Duty）＋ A140 / A170 / A510（重磅型）
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
  /* ── Score Cut · 輕型 Light Duty ────────────────────────── */
  {
    model: "MT-A110",
    slug: "mt-a110",
    series: "score-cut",
    name: "Pneumatic Score Cut Knife Holder",
    tier: "Light Duty",
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
    tier: "Light Duty",
    summary: "Compact holder for narrow-web slitting where mounting space is limited.",
    description: [
      "A compact body built around a Ø57mm blade brings the minimum slit width down to 8mm while keeping the same double-acting pneumatic system and tool-free blade change as the full-size holders. Machined to ±0.005mm on MAZAK CNC centers.",
      "On narrow-web tape and label lines, full-size holders simply cannot be stacked densely enough — the holder body, not the blade, sets your minimum width. The MT-A130's slim footprint lets you mount more knives per meter of guide bar without sacrificing pressure control.",
      "Suited to adhesive tapes, label stock, narrow film strips, and lightweight papers — the light-duty score cut family's answer to dense knife layouts.",
    ],
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
    tier: "Light Duty",
    summary: "Enhanced blade stability for high-speed paper and film lines.",
    description: [
      "Upgraded bearing assemblies and a stiffened blade mount hold the cutting edge steady at line speeds up to 600 M/min. The pneumatic pressure system is shared with the rest of the light-duty score family, so blades and spare parts stay interchangeable.",
      "At high web speeds, blade chatter is what turns a clean score cut into fuzzy edges and paper dust. The MT-A160 suppresses vibration at the source, keeping edge quality consistent as your line runs at full rated speed instead of the compromise speed your holders can tolerate.",
      "The first choice for high-speed lightweight paper converting — printing paper, release paper, masking paper — and fast film lines per the Paper & Board and Plastic Film application categories.",
    ],
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
    tier: "Light Duty",
    summary: "Slim-body economical holder for narrow-width tape and label slitting.",
    description: [
      "A simplified slim-profile body keeps the proven pneumatic scoring action in a lighter, more economical package. Manufactured to the same ±0.005mm tolerance as every MOTOKNIFE holder — economy comes from the simpler construction, not looser machining.",
      "Tape slitting lines often run dozens of knife stations at once, so the cost and width of each station multiplies across the machine. The MT-B110 lowers the per-station investment for high knife-count layouts without giving up cut consistency.",
      "Designed for adhesive tapes, medical plaster tape, label stock, and thin films — the Tape & Labels category's economical workhorse.",
    ],
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
    tier: "Light Duty",
    summary: "The smallest holder in the score cut range — for the narrowest slit widths.",
    description: [
      "The most compact format in the score cut family: a miniaturized pneumatic holder engineered for the narrowest slit widths and the densest knife arrangements the range supports.",
      "Some products — hook-and-loop straps, narrow specialty tapes — need slit widths that ordinary holder bodies physically cannot reach. The MT-C121 exists for exactly these jobs, packing working pneumatic pressure control into the smallest possible envelope.",
      "Suited to narrow adhesive tapes, hook-and-loop fasteners, and narrow film or label strips from the Tape & Labels application category.",
    ],
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
    description: [
      "A reinforced holder body and a higher-force pneumatic cylinder (4–7 kg/cm²) deliver the blade pressure that thick, elastic webs demand — with the same fine pressure adjustability as the lighter holders in the range.",
      "Rubber stretches and springs back: too little pressure and the cut does not go through; too much and the web deforms and the slit wanders. The MT-A140 holds a precisely set high force so elastic materials cut clean without stretching or tearing.",
      "Built for light rubber sheet, rubber leather, and thick flexible webs — the entry point of the heavy-duty score family for the Rubber application category.",
    ],
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
    description: [
      "The MT-A170's defining feature is its large chip-clearance geometry: an open blade area that evacuates fibers, lint, and cutting debris away from the cut zone instead of letting them accumulate. Heavy-duty pneumatics (4–7 kg/cm²) handle thick fibrous webs.",
      "Dust and loose fibers are the chronic complaint in nonwoven converting — they contaminate the product, clog the holder, and force cleaning stops. By clearing debris continuously, the MT-A170 keeps hygiene-critical and filtration products clean and lines running.",
      "The recommended holder for nonwovens, synthetic leather, and textiles, and equally at home on rubber and heavy composites — the dust-free answer across three of Chapter 6's heavy material categories.",
    ],
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
    description: [
      "The maximum-duty frame of the score cut family: the heaviest body casting, the highest-force cylinder (4–8 kg/cm²), and bearings sized for sustained cutting of dense, abrasive webs.",
      "Heavy rubber magnetic sheet and reinforced composites simply stall lighter holders — the blade rides over the material instead of cutting through it. The MT-A510 delivers the sustained force these webs need while retaining score cut's simplicity and narrow-width economy.",
      "Specified for rubber magnetic sheet, heavy rubber, fiberglass mat, roofing felt, and multi-layer composites — the top of the heavy-duty score range for the Rubber and Heavy Composites categories.",
    ],
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
    description: [
      "Precision-ground spindles and fine adjustment of blade overlap and side force give the MT-A410 the control that 6–20 µm foils demand. Every rotating component is machined and matched in-house to ±0.005mm.",
      "In lithium battery production, a single burr on the foil edge can pierce the separator and scrap the cell — edge quality is a safety specification, not a cosmetic one. The MT-A410's true shear action separates ultra-thin foil cleanly, without the deformation or burrs that disqualify material.",
      "Purpose-built for battery-grade copper and aluminum foil — the precision end of the shear range serving Chapter 6's Metal Foils category for the battery and capacitor industries.",
    ],
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
    description: [
      "The versatile half of the precision shear pair: adjustable blade overlap and cant angle let one holder be tuned across foils, films, and fibrous webs, while precision spindles maintain burr-free shear geometry at production speed.",
      "When one line runs aluminum foil today and coated film or nonwoven tomorrow, dedicating a holder to each material is expensive. The MT-A450 covers the 20–100 µm foil range and doubles as the high-speed, low-dust shear option for demanding film and nonwoven work.",
      "Recommended for standard aluminum and copper foils, high-quality plastic films, and the shear path of nonwoven converting — the most broadly applicable precision holder in the shear range.",
    ],
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
    description: [
      "A robust general-purpose shear holder with straightforward setup: standard pneumatic pressure (3–6 kg/cm²), quick blade positioning, and the same ±0.005mm component tolerance as the precision line.",
      "Most converting shops need a dependable shear workhorse more than they need a specialist — a holder that operators can set up quickly and trust across the day's changing job list. The MT-A650 is that holder: consistent scissor-action cutting without specialist adjustment.",
      "The general-purpose choice for medium-gauge plastic films, laminates, and papers — the entry point of the A650/A850/A880 general shear family.",
    ],
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
    description: [
      "A heavier frame and higher-force pneumatics (4–7 kg/cm²) let the MT-A850 keep true shear geometry under loads that flex lighter holders. Reinforced spindle bearings sustain edge quality through long runs of dense material.",
      "Heavy board and thick film punish shear holders: any deflection under load opens the blade gap and edge quality collapses. The MT-A850 stays rigid where it matters, so 200+ gsm board and heavy-gauge film cut as cleanly at the end of the shift as at the start.",
      "Specified for heavy board stock, thick and laminated films, demanding nonwoven lines, and multi-layer composites — the mid-point of the general shear family and its most common heavy-duty pick.",
    ],
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
    description: [
      "The maximum-duty shear platform: the largest frame in the range, 4–8 kg/cm² cylinder force, and drivetrain components sized for continuous cutting of rigid and abrasive webs.",
      "At the extreme end — rigid PVC sheet, roofing felt, glass-reinforced composites — the question is not edge finesse but whether the holder can push a true shear cut through at all. The MT-A880 delivers the force and rigidity these materials demand while keeping the cut a genuine shear, not a tear.",
      "Built for rigid PVC and PS sheet, roofing felt, and reinforced multi-layer composites — the top of Chapter 6's Heavy Composites shear path.",
    ],
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
    description: [
      "The MT-A310H extends the A310 platform with an enhanced micrometer depth mechanism and added blade stability for thicker, more complex laminate stacks — cutting a chosen number of layers while the layers below stay untouched.",
      "Multi-layer dressings combine foams, films, adhesives, and liners of different hardness in one web. A holder tuned for simple two-layer kiss-cutting drifts as it crosses these transitions; the A310H holds its set depth through the whole stack, protecting expensive medical material from scrap.",
      "Purpose-built for multi-layer medical dressings, foam laminate constructions, and complex medical tapes — the specialist variant for Chapter 6's Medical Materials category.",
    ],
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
