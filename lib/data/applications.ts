export interface RecommendedProduct {
  name: string;
  series: string;
  href: string;
  reason: string;
}

export interface ApplicationMaterial {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  characteristics: string[];
  recommendedMethod: string;
  alternativeMethod?: string;
  products: RecommendedProduct[];
  industries: string[];
}

export const APPLICATION_MATERIALS: ApplicationMaterial[] = [
  {
    slug: "plastic-film",
    name: "Plastic Film",
    tagline: "Precision slitting for PE, PP, PET, and specialty films",
    description:
      "Plastic films require clean, dust-free cuts with minimal edge defects. Film thickness ranges from ultra-thin (6 micron) to heavy gauge (250+ micron), each demanding different cutting parameters. MOTOKNIFE holders deliver consistent edge quality across the full range.",
    characteristics: [
      "Thickness range: 6–250+ micron",
      "Sensitive to heat — avoid thermal distortion",
      "Requires dust-free, burr-free edges",
      "High-speed converting lines (up to 600 M/min)",
      "Static charge can affect slit quality",
    ],
    recommendedMethod: "Score Cut",
    alternativeMethod: "Shear Cut",
    products: [
      {
        name: "MT-A110",
        series: "Score Cut",
        href: "/products/score-cut",
        reason: "Standard choice for general film slitting with clean edges",
      },
      {
        name: "MT-A120",
        series: "Score Cut",
        href: "/products/score-cut",
        reason: "High-speed option for fast converting lines",
      },
      {
        name: "MT-B210",
        series: "Shear Cut",
        href: "/products/shear-cut",
        reason: "For thicker films (100+ micron) requiring scissor-action precision",
      },
    ],
    industries: ["Packaging", "Food & Beverage", "Pharmaceutical", "Electronics"],
  },
  {
    slug: "metallic-foil",
    name: "Metallic Foil",
    tagline: "Shear slitting for aluminum, copper, and specialty foils",
    description:
      "Metallic foils (aluminum, copper, lithium battery foils) demand shear cutting for clean, burr-free edges. The scissor-action of shear cut holders prevents material deformation and ensures dimensional accuracy critical for battery and electronics applications.",
    characteristics: [
      "Materials: aluminum, copper, nickel, tin foil",
      "Thickness range: 6–100 micron",
      "Burr-free edges critical for battery applications",
      "Hardness varies significantly between metals",
      "Foil tension control is essential",
    ],
    recommendedMethod: "Shear Cut",
    products: [
      {
        name: "MT-B210",
        series: "Shear Cut",
        href: "/products/shear-cut",
        reason: "Standard shear cut for aluminum and thin foils",
      },
      {
        name: "MT-B220",
        series: "Shear Cut",
        href: "/products/shear-cut",
        reason: "Heavy-duty option for copper foil and thicker metals",
      },
    ],
    industries: ["Battery / EV", "Electronics", "Packaging", "HVAC"],
  },
  {
    slug: "rubber",
    name: "Rubber",
    tagline: "Score cutting solutions for rubber sheets and compounds",
    description:
      "Rubber materials present unique challenges due to their elasticity and tendency to deform under cutting pressure. Score cut holders with controlled blade pressure ensure consistent cuts without stretching or tearing the material.",
    characteristics: [
      "High elasticity — deforms under pressure",
      "Thickness range: 0.5–5mm",
      "Requires controlled blade pressure",
      "Natural and synthetic rubber variants",
      "Surface friction affects knife positioning",
    ],
    recommendedMethod: "Score Cut",
    products: [
      {
        name: "MT-A110",
        series: "Score Cut",
        href: "/products/score-cut",
        reason: "Adjustable pneumatic pressure for optimal rubber cutting",
      },
      {
        name: "MT-A130",
        series: "Score Cut",
        href: "/products/score-cut",
        reason: "Compact design for narrow rubber strip cutting",
      },
    ],
    industries: ["Automotive", "Industrial Gaskets", "Conveyor Belts", "Footwear"],
  },
  {
    slug: "paper",
    name: "Paper",
    tagline: "Clean slitting for paper, cardboard, and tissue",
    description:
      "Paper slitting demands dust-free cuts to maintain product quality. Both score cut and shear cut methods are used depending on paper weight — lightweight papers benefit from score cutting, while heavier board stocks require shear cutting action.",
    characteristics: [
      "Weight range: 20–400 gsm",
      "Dust generation is a primary concern",
      "Lightweight papers: score cut preferred",
      "Heavy board stock: shear cut required",
      "High-speed web lines common",
    ],
    recommendedMethod: "Score Cut",
    alternativeMethod: "Shear Cut",
    products: [
      {
        name: "MT-A120",
        series: "Score Cut",
        href: "/products/score-cut",
        reason: "High-speed score cutting for lightweight papers",
      },
      {
        name: "MT-B210",
        series: "Shear Cut",
        href: "/products/shear-cut",
        reason: "Shear cut for heavier board stocks (200+ gsm)",
      },
    ],
    industries: ["Printing", "Packaging", "Tissue & Hygiene", "Labels"],
  },
  {
    slug: "nonwoven",
    name: "Nonwoven",
    tagline: "Score and hot cut solutions for nonwoven fabrics",
    description:
      "Nonwoven fabrics can be slit with score cut for general applications, or hot cut when edge sealing is needed to prevent fiber shedding. The choice depends on material composition and end-use requirements.",
    characteristics: [
      "Fiber-based structure — prone to fraying",
      "Weight range: 10–300 gsm",
      "PP spunbond and meltblown most common",
      "Edge sealing may be required (hot cut)",
      "Used in medical, hygiene, and filtration",
    ],
    recommendedMethod: "Score Cut",
    alternativeMethod: "Hot Cut",
    products: [
      {
        name: "MT-A110",
        series: "Score Cut",
        href: "/products/score-cut",
        reason: "Standard score cut for general nonwoven slitting",
      },
      {
        name: "MT-D410",
        series: "Hot Cut",
        href: "/products/hot-cut",
        reason: "Thermal cutting with edge sealing to prevent fiber shedding",
      },
    ],
    industries: ["Medical & Hygiene", "Filtration", "Agriculture", "Automotive"],
  },
];

export function getMaterialBySlug(slug: string): ApplicationMaterial | undefined {
  return APPLICATION_MATERIALS.find((m) => m.slug === slug);
}
