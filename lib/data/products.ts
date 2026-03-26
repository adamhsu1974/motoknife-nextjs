export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  model: string;
  description: string;
  specs: ProductSpec[];
}

export interface ProductSeries {
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  cuttingMethod: string;
  materials: string[];
  keySpecs: ProductSpec[];
  products: Product[];
}

export const PRODUCT_SERIES: ProductSeries[] = [
  {
    slug: "score-cut",
    name: "Score Cut",
    fullName: "Score Cut Knife Holders",
    tagline: "Precision score cutting for flexible materials",
    description:
      "Score cut knife holders use a circular blade pressing against a hardened anvil roller to create a clean separation. Ideal for thin films, paper, and nonwoven fabrics where edge quality is critical.",
    cuttingMethod: "Score Cut",
    materials: ["Plastic Film", "Paper", "Nonwoven", "Rubber", "Labels"],
    keySpecs: [
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Min. Slit Width", value: "12mm" },
      { label: "Max. Speed", value: "600 M/min" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade Diameter", value: "Ø76.2mm" },
    ],
    products: [
      {
        model: "MT-A110",
        description: "Standard pneumatic score cut holder for general-purpose slitting.",
        specs: [
          { label: "Min. Slit Width", value: "12mm" },
          { label: "Max. Speed", value: "400 M/min" },
          { label: "Air Pressure", value: "3–6 kg/cm²" },
          { label: "Blade Diameter", value: "Ø76.2mm" },
          { label: "Guide Bar", value: "Round / Square" },
        ],
      },
      {
        model: "MT-A120",
        description: "High-speed score cut holder with enhanced blade stability.",
        specs: [
          { label: "Min. Slit Width", value: "15mm" },
          { label: "Max. Speed", value: "600 M/min" },
          { label: "Air Pressure", value: "3–6 kg/cm²" },
          { label: "Blade Diameter", value: "Ø76.2mm" },
          { label: "Guide Bar", value: "Round / Square" },
        ],
      },
      {
        model: "MT-A130",
        description: "Compact score cut holder for narrow web applications.",
        specs: [
          { label: "Min. Slit Width", value: "8mm" },
          { label: "Max. Speed", value: "400 M/min" },
          { label: "Air Pressure", value: "3–6 kg/cm²" },
          { label: "Blade Diameter", value: "Ø57mm" },
          { label: "Guide Bar", value: "Round" },
        ],
      },
    ],
  },
  {
    slug: "shear-cut",
    name: "Shear Cut",
    fullName: "Shear Cut Knife Holders",
    tagline: "High-performance shear slitting for tough materials",
    description:
      "Shear cut knife holders use two blades in a scissor-like action for precise cuts through tougher materials. Best suited for metallic foils, thicker plastic films, and multi-layer laminates.",
    cuttingMethod: "Shear Cut",
    materials: ["Metallic Foil", "Aluminum Foil", "Copper Foil", "Plastic Film", "Paper"],
    keySpecs: [
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Min. Slit Width", value: "20mm" },
      { label: "Max. Speed", value: "500 M/min" },
      { label: "Air Pressure", value: "3–6 kg/cm²" },
      { label: "Blade Diameter", value: "Ø100mm" },
    ],
    products: [
      {
        model: "MT-B210",
        description: "Standard pneumatic shear cut holder for foil and film slitting.",
        specs: [
          { label: "Min. Slit Width", value: "20mm" },
          { label: "Max. Speed", value: "400 M/min" },
          { label: "Air Pressure", value: "3–6 kg/cm²" },
          { label: "Blade Diameter", value: "Ø100mm" },
          { label: "Guide Bar", value: "Square" },
        ],
      },
      {
        model: "MT-B220",
        description: "Heavy-duty shear cut holder for thick metallic foils.",
        specs: [
          { label: "Min. Slit Width", value: "25mm" },
          { label: "Max. Speed", value: "500 M/min" },
          { label: "Air Pressure", value: "4–7 kg/cm²" },
          { label: "Blade Diameter", value: "Ø120mm" },
          { label: "Guide Bar", value: "Square" },
        ],
      },
    ],
  },
  {
    slug: "half-cut",
    name: "Half Cut",
    fullName: "Half Cut Knife Holders",
    tagline: "Controlled depth cutting for labels and laminates",
    description:
      "Half cut knife holders cut through the top layer while leaving the backing material intact. Essential for label die-cutting, laminate processing, and protective film applications.",
    cuttingMethod: "Half Cut",
    materials: ["Labels", "Laminates", "Adhesive Films", "Protective Films"],
    keySpecs: [
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Depth Control", value: "Micrometer" },
      { label: "Max. Speed", value: "300 M/min" },
      { label: "Air Pressure", value: "2–5 kg/cm²" },
      { label: "Blade Diameter", value: "Ø76.2mm" },
    ],
    products: [
      {
        model: "MT-C310",
        description: "Precision half cut holder with micrometer depth adjustment.",
        specs: [
          { label: "Depth Control", value: "Micrometer ±0.01mm" },
          { label: "Max. Speed", value: "300 M/min" },
          { label: "Air Pressure", value: "2–5 kg/cm²" },
          { label: "Blade Diameter", value: "Ø76.2mm" },
          { label: "Guide Bar", value: "Round" },
        ],
      },
    ],
  },
  {
    slug: "hot-cut",
    name: "Hot Cut",
    fullName: "Hot Cut Knife Holders",
    tagline: "Thermal slitting for synthetic materials",
    description:
      "Hot cut knife holders use a heated blade to melt through synthetic materials, sealing edges to prevent fraying. Ideal for nonwoven fabrics, synthetic textiles, and thermoplastic films.",
    cuttingMethod: "Hot Cut",
    materials: ["Nonwoven", "Synthetic Fabric", "Thermoplastics", "Polypropylene"],
    keySpecs: [
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Temperature", value: "Up to 400°C" },
      { label: "Max. Speed", value: "200 M/min" },
      { label: "Power", value: "200W" },
      { label: "Blade Type", value: "Heated blade" },
    ],
    products: [
      {
        model: "MT-D410",
        description: "Standard hot cut holder with temperature controller.",
        specs: [
          { label: "Temperature Range", value: "100–400°C" },
          { label: "Max. Speed", value: "200 M/min" },
          { label: "Power", value: "200W" },
          { label: "Controller", value: "PID digital" },
          { label: "Guide Bar", value: "Round" },
        ],
      },
    ],
  },
  {
    slug: "knives",
    name: "Knives",
    fullName: "Slitting Knives & Score Blades",
    tagline: "Precision blades for all cutting methods",
    description:
      "MOTOKNIFE manufactures high-precision slitting knives and score blades from premium tool steel. Available in various sizes and materials to match your cutting application.",
    cuttingMethod: "All Methods",
    materials: ["All Materials"],
    keySpecs: [
      { label: "Material", value: "HSS / Tungsten Carbide" },
      { label: "Hardness", value: "HRC 60–65" },
      { label: "Tolerance", value: "±0.005mm" },
      { label: "Diameters", value: "Ø57–120mm" },
      { label: "Custom Sizes", value: "Available" },
    ],
    products: [
      {
        model: "MK-S76",
        description: "Standard score blade Ø76.2mm for score cut holders.",
        specs: [
          { label: "Diameter", value: "Ø76.2mm" },
          { label: "Material", value: "HSS M2" },
          { label: "Hardness", value: "HRC 62" },
          { label: "Edge Angle", value: "20°" },
        ],
      },
      {
        model: "MK-R100",
        description: "Shear cut round knife Ø100mm.",
        specs: [
          { label: "Diameter", value: "Ø100mm" },
          { label: "Material", value: "Tungsten Carbide" },
          { label: "Hardness", value: "HRC 65" },
          { label: "Edge Type", value: "Flat / Bevel" },
        ],
      },
    ],
  },
  {
    slug: "guide-bar",
    name: "Guide Bar",
    fullName: "Guide Bars",
    tagline: "High-rigidity bars for accurate knife positioning",
    description:
      "MOTOKNIFE guide bars are precision-ground from high-grade steel to ensure accurate and stable knife positioning. Available in round and square profiles.",
    cuttingMethod: "All Methods",
    materials: ["Universal"],
    keySpecs: [
      { label: "Material", value: "Chrome-plated steel" },
      { label: "Straightness", value: "0.02mm/m" },
      { label: "Profiles", value: "Round / Square" },
      { label: "Lengths", value: "Up to 6000mm" },
      { label: "Custom Sizes", value: "Available" },
    ],
    products: [
      {
        model: "GB-R25",
        description: "Round guide bar Ø25mm for standard knife holders.",
        specs: [
          { label: "Profile", value: "Round Ø25mm" },
          { label: "Material", value: "Chrome-plated steel" },
          { label: "Max. Length", value: "4000mm" },
          { label: "Straightness", value: "0.02mm/m" },
        ],
      },
      {
        model: "GB-S30",
        description: "Square guide bar 30×30mm for heavy-duty applications.",
        specs: [
          { label: "Profile", value: "Square 30×30mm" },
          { label: "Material", value: "Chrome-plated steel" },
          { label: "Max. Length", value: "6000mm" },
          { label: "Straightness", value: "0.02mm/m" },
        ],
      },
    ],
  },
];

export function getSeriesBySlug(slug: string): ProductSeries | undefined {
  return PRODUCT_SERIES.find((s) => s.slug === slug);
}
