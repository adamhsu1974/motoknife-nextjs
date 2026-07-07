/**
 * Applications 選型器資料 — 來源：PLANNING.md 第六章「產業分類與對應矩陣 v2（已經 GM 校正）」
 *
 * 型號家族：
 * - Score Cut：A110 / A130 / A160 / B110 / C121（輕中型）＋ A140 / A170 / A510（重磅型）
 * - Shear Cut：A410 / A450（精密型，含金屬箔）＋ A650 / A850 / A880（通用型）
 * - Half Cut：A310 / A310H（醫療多層材料）
 * - Hot Cut：A710（< 13mm 窄幅熱切割）
 *
 * 厚度分級為原型用的工程預設值，正式版需由 GM 校正後寫入 Payload
 * Applications collection 的 selectorRules 欄位。
 */

export type CuttingMethod = "Score Cut" | "Shear Cut" | "Half Cut" | "Hot Cut";

export const CUTTING_METHOD_SERIES_SLUG: Record<CuttingMethod, string> = {
  "Score Cut": "score-cut",
  "Shear Cut": "shear-cut",
  "Half Cut": "half-cut",
  "Hot Cut": "hot-cut",
};

export interface SelectorRecommendation {
  cuttingMethod: CuttingMethod;
  models: string[];
  note: string;
}

export interface SelectorThicknessOption {
  id: string;
  label: string;
  description: string;
  recommendations: SelectorRecommendation[];
}

export interface SelectorMaterial {
  id: string;
  categoryNumber: number;
  name: string;
  examples: string;
  thicknessOptions: SelectorThicknessOption[];
}

export const SELECTOR_MATERIALS: SelectorMaterial[] = [
  {
    id: "paper",
    categoryNumber: 1,
    name: "Paper & Board",
    examples: "Kraft paper, release paper, wallpaper, masking paper, corrugated board, sandpaper",
    thicknessOptions: [
      {
        id: "light",
        label: "Lightweight (< 200 gsm)",
        description: "Printing paper, release paper, masking paper",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A110", "MT-A130", "MT-A160"],
            note: "Economic choice for standard paper slitting with clean, dust-free edges.",
          },
        ],
      },
      {
        id: "heavy",
        label: "Heavy board (200+ gsm)",
        description: "Corrugated board, thick cardboard, sandpaper",
        recommendations: [
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A650", "MT-A850", "MT-A880"],
            note: "Scissor-action shear cutting for heavy board stock and abrasive materials.",
          },
        ],
      },
    ],
  },
  {
    id: "plastic-film",
    categoryNumber: 2,
    name: "Plastic Film",
    examples: "Rigid/flexible PVC, PP, PE, PS, LDPE, PLA, protective film",
    thicknessOptions: [
      {
        id: "thin",
        label: "Thin film (< 100 µm)",
        description: "Packaging film, protective film, laminating film",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A110", "MT-A130", "MT-B110", "MT-C121"],
            note: "Economic narrow-width slitting for standard films.",
          },
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A410", "MT-A450"],
            note: "Precision shear for highest edge quality on thin films.",
          },
        ],
      },
      {
        id: "medium",
        label: "Medium (100–300 µm)",
        description: "Heavy-gauge film, laminated film",
        recommendations: [
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A650", "MT-A850"],
            note: "General-purpose shear cutting for medium-gauge films.",
          },
        ],
      },
      {
        id: "thick",
        label: "Thick / rigid sheet (> 300 µm)",
        description: "Rigid PVC, PS sheet, thick PLA",
        recommendations: [
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A850", "MT-A880"],
            note: "Heavy-duty shear holders for rigid and thick sheet materials.",
          },
        ],
      },
    ],
  },
  {
    id: "nonwoven",
    categoryNumber: 3,
    name: "Nonwovens & Textiles",
    examples: "Nonwoven fabric, synthetic leather, cotton, gauze, label cloth",
    thicknessOptions: [
      {
        id: "light",
        label: "Light (< 150 gsm)",
        description: "Spunbond, meltblown, gauze",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A140", "MT-A170"],
            note: "Large chip-clearance design for dust-free, lint-free slitting.",
          },
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A450", "MT-A850"],
            note: "High-speed, high-quality, low-dust shear option for demanding lines.",
          },
        ],
      },
      {
        id: "heavy",
        label: "Heavy / thick (150+ gsm)",
        description: "Synthetic leather, thick felt, multi-layer textiles",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A510", "MT-A170"],
            note: "Heavy-duty score holders for thick fibrous materials.",
          },
        ],
      },
    ],
  },
  {
    id: "metal-foil",
    categoryNumber: 4,
    name: "Metal Foils",
    examples: "Copper foil, aluminum foil (battery / capacitor industry)",
    thicknessOptions: [
      {
        id: "ultra-thin",
        label: "Ultra-thin (6–20 µm)",
        description: "Battery-grade copper / aluminum foil",
        recommendations: [
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A410"],
            note: "Precision shear holder for burr-free edges critical in battery applications.",
          },
        ],
      },
      {
        id: "standard",
        label: "Standard (20–100 µm)",
        description: "Capacitor foil, packaging foil",
        recommendations: [
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A450"],
            note: "Precision shear cutting for standard metal foil converting.",
          },
        ],
      },
    ],
  },
  {
    id: "rubber",
    categoryNumber: 5,
    name: "Rubber",
    examples: "Rubber magnetic sheet, rubber leather, light / heavy rubber",
    thicknessOptions: [
      {
        id: "thin",
        label: "Thin (< 2 mm)",
        description: "Light rubber sheet",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A140"],
            note: "Controlled pneumatic pressure prevents stretching and deformation.",
          },
        ],
      },
      {
        id: "medium",
        label: "Medium (2–5 mm)",
        description: "Rubber leather, standard rubber sheet",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A170"],
            note: "Heavy-duty score holder with large chip clearance.",
          },
        ],
      },
      {
        id: "thick",
        label: "Heavy (> 5 mm)",
        description: "Rubber magnetic sheet, heavy rubber",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A510"],
            note: "Strongest score holder in the range for heavy rubber materials.",
          },
        ],
      },
    ],
  },
  {
    id: "tape-labels",
    categoryNumber: 6,
    name: "Tape & Labels",
    examples: "Adhesive tapes, medical plaster tape, hook-and-loop fasteners",
    thicknessOptions: [
      {
        id: "standard",
        label: "Standard tapes",
        description: "General adhesive tape, label stock",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A110", "MT-A130"],
            note: "Clean score cutting for adhesive-coated materials.",
          },
        ],
      },
      {
        id: "narrow",
        label: "Narrow-width tapes",
        description: "Narrow slit width, hook-and-loop, specialty tapes",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-B110", "MT-C121"],
            note: "Compact holders optimized for narrow slitting widths.",
          },
        ],
      },
    ],
  },
  {
    id: "medical",
    categoryNumber: 7,
    name: "Medical Materials",
    examples: "Medical patches, foam tape, multi-layer dressings",
    thicknessOptions: [
      {
        id: "standard",
        label: "Standard laminate",
        description: "Medical patch, foam tape",
        recommendations: [
          {
            cuttingMethod: "Half Cut",
            models: ["MT-A310"],
            note: "Cuts the top layer while keeping the release liner intact.",
          },
        ],
      },
      {
        id: "multi-layer",
        label: "Multi-layer dressing",
        description: "Complex multi-layer medical laminates",
        recommendations: [
          {
            cuttingMethod: "Half Cut",
            models: ["MT-A310H"],
            note: "Enhanced depth control for multi-layer medical materials.",
          },
        ],
      },
    ],
  },
  {
    id: "heavy-composites",
    categoryNumber: 8,
    name: "Heavy Composites",
    examples: "Fiberglass, roofing felt, multi-layer composites",
    thicknessOptions: [
      {
        id: "standard",
        label: "Standard composite",
        description: "Fiberglass mat, multi-layer composite",
        recommendations: [
          {
            cuttingMethod: "Score Cut",
            models: ["MT-A510", "MT-A170"],
            note: "Heavy-duty score holders for abrasive composite materials.",
          },
        ],
      },
      {
        id: "extra-heavy",
        label: "Extra heavy / abrasive",
        description: "Roofing felt, thick reinforced composites",
        recommendations: [
          {
            cuttingMethod: "Shear Cut",
            models: ["MT-A850", "MT-A880"],
            note: "Maximum cutting force with shear action for the heaviest webs.",
          },
        ],
      },
    ],
  },
  {
    id: "heat-sealed",
    categoryNumber: 9,
    name: "Heat-Sealed Edge",
    examples: "Synthetic fabrics, webbing, woven labels (fused edges prevent fraying)",
    thicknessOptions: [
      {
        id: "all",
        label: "All synthetic webs",
        description: "Chemical fiber fabric, webbing, woven label tape",
        recommendations: [
          {
            cuttingMethod: "Hot Cut",
            models: ["MT-A710"],
            note: "600°C (up to 650°C) heated blade fuses edges while cutting — minimum slit width < 13 mm, industry-leading for narrow webbing and label tapes.",
          },
        ],
      },
    ],
  },
];
