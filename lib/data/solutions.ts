/**
 * Solutions 長尾關鍵字頁資料（SEO 靜態內容，非 CMS）。
 * 每個 solution = 材料 × 推薦切法 × 推薦型號 + 應用描述 + FAQ。
 * 型號 slug 由 model 小寫推導（MT-A410 → mt-a410）。
 */

export type SolutionMethod = "score-cut" | "shear-cut" | "half-cut" | "hot-cut";

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface Solution {
  slug: string;
  /** 頁面 h1 / meta title */
  title: string;
  metaDescription: string;
  material: string;
  cuttingMethod: SolutionMethod;
  /** 推薦型號（連到 /products/model/[slug]） */
  recommendedModels: string[];
  /** 對應 CMS Application slug（內部連結） */
  applicationSlug: string;
  intro: string[];
  faqs: SolutionFaq[];
}

/** 內容新鮮度信號：Solutions 內容有實質更新時手動調整（頁面顯示 + AI 爬蟲提取） */
export const SOLUTIONS_LAST_UPDATED = "2026-07-08";

export const SOLUTIONS: Solution[] = [
  {
    slug: "aluminum-foil-shear-cut",
    title: "Aluminum Foil Slitting with Shear Cut Knife Holders",
    metaDescription:
      "How to slit aluminum foil without burrs: shear cut is the recommended method — MT-A410 for 6–20 µm battery foil, MT-A450 for 20–100 µm packaging foil.",
    material: "Aluminum Foil",
    cuttingMethod: "shear-cut",
    recommendedModels: ["MT-A410", "MT-A450"],
    applicationSlug: "metal-foil",
    intro: [
      "Aluminum foil demands shear cutting: a score blade deforms the soft metal and leaves burrs that disqualify the roll. Two precision-ground blades working in a scissor action separate the foil cleanly, keeping the edge straight and burr-free at production speed.",
      "For ultra-thin battery and capacitor foils (6–20 µm), the MT-A410 precision shear holder provides the fine blade overlap and side-force control the material requires. Standard packaging and household foils (20–100 µm) run on the MT-A450, the most versatile precision holder in the range.",
    ],
    faqs: [
      {
        question: "Why can't aluminum foil be slit with score cut holders?",
        answer:
          "Score cutting presses a blade against an anvil roller, which plastically deforms soft aluminum and produces burrs and wavy edges. Shear cutting separates the foil between two blade edges without crushing it, which is why every serious foil line uses shear cut holders.",
      },
      {
        question: "What is the thinnest aluminum foil MOTOKNIFE holders can slit?",
        answer:
          "The MT-A410 precision shear holder is designed for foils down to 6 µm — the range used in lithium battery current collectors. Send us a sample roll and we will verify edge quality on our own equipment with a free test report in 3 working days.",
      },
      {
        question: "How do I reduce burrs when slitting aluminum foil?",
        answer:
          "Burrs come from worn blade edges, incorrect blade overlap, or excessive side force. Precision-ground blades, fine overlap adjustment, and stable holder rigidity — the core design of the MT-A410/A450 — keep edges burr-free through long runs.",
      },
      {
        question: "What blade material is recommended for aluminum foil slitting?",
        answer:
          "Precision-ground high-speed steel (HSS) covers most aluminum foil work; tungsten carbide extends blade life on long production runs and coated foils. Because aluminum is soft, edge sharpness and grinding quality matter more than raw blade hardness — a finely ground edge in the correct overlap does more for burr control than upgrading the material alone.",
      },
    ],
  },
  {
    slug: "copper-foil-shear-cut",
    title: "Copper Foil Slitting with Shear Cut Knife Holders",
    metaDescription:
      "What is the best way to slit battery copper foil? Shear cut with precision holders: MT-A410 covers 6–20 µm electrodeposited foil with burr-free edges.",
    material: "Copper Foil",
    cuttingMethod: "shear-cut",
    recommendedModels: ["MT-A410", "MT-A450"],
    applicationSlug: "metal-foil",
    intro: [
      "In lithium battery production, copper foil edge quality is a safety specification: a single burr can pierce the separator and scrap the cell — or worse, pass inspection and fail in the field. Shear cutting with precision holders is the only accepted method for battery-grade copper foil.",
      "The MT-A410 handles ultra-thin electrodeposited copper foil from 6 µm with burr-free edges, while the MT-A450 covers heavier foils and gives multi-material lines one holder for copper, aluminum, and film. Every rotating component is machined in-house to ±0.005mm.",
    ],
    faqs: [
      {
        question: "What knife holder is recommended for 8 µm battery copper foil?",
        answer:
          "The MT-A410 precision shear holder is purpose-built for 6–20 µm battery foils. Its precision spindles and fine blade overlap adjustment maintain burr-free edges at the tolerances battery makers specify.",
      },
      {
        question: "How is copper foil slitting different from aluminum foil?",
        answer:
          "Copper is harder and less forgiving than aluminum: blade wear shows up in edge quality sooner, and burr specifications are stricter because of separator puncture risk. The same shear principle applies, but blade material, overlap, and holder rigidity matter more.",
      },
      {
        question: "What is the best cutting method for copper foil?",
        answer:
          "Shear cut is the only method accepted for battery-grade copper foil. Score cut deforms the soft metal against the anvil roller and leaves burrs; razor cut cannot hold edge quality on metal at production speed. Two precision-ground blades in a scissor action separate the foil without plastic deformation, which is what keeps burr height inside battery specifications.",
      },
      {
        question: "How often should blades be resharpened when slitting copper foil?",
        answer:
          "There is no universal interval — it depends on foil hardness, run length, and how tight your burr specification is. The practical approach is to track burr height and edge quality per shift and resharpen before they drift out of tolerance. Correct blade overlap and side-force setting, which the MT-A410 adjusts finely, are the biggest levers for extending the interval.",
      },
    ],
  },
  {
    slug: "pet-film-score-cut",
    title: "PET Film Slitting with Score Cut Knife Holders",
    metaDescription:
      "Score cut or shear cut for PET film? Score cut wins on cost for most gauges — MT-A110 standard, MT-A130 from 8mm widths, MT-A160 for 600 M/min lines.",
    material: "PET Film",
    cuttingMethod: "score-cut",
    recommendedModels: ["MT-A110", "MT-A130", "MT-A160"],
    applicationSlug: "plastic-film",
    intro: [
      "PET film is the workhorse of converting — and score cutting is its workhorse method. A circular blade pressing against a hardened anvil roller gives clean edges at the lowest cost per slit, with narrow widths and fast setup that shear systems cannot match.",
      "The MT-A110 is the standard choice for general PET work; the compact MT-A130 slits down to 8mm for narrow-web products; and the MT-A160's stabilized blade mount holds edge quality on high-speed lines up to 600 M/min.",
    ],
    faqs: [
      {
        question: "Score cut or shear cut for PET film?",
        answer:
          "For most PET gauges (below roughly 100 µm), score cut delivers clean edges at significantly lower cost per station. Move to shear cut when the film is heavy-gauge, when dust specifications are extreme, or when edge quality at very high speed becomes the limiting factor.",
      },
      {
        question: "What causes ragged edges when slitting PET film?",
        answer:
          "Usually inconsistent blade pressure or a worn blade. Pneumatic holders like the MT-A110 hold set pressure shift after shift, and tool-free blade change keeps replacement downtime to minutes.",
      },
      {
        question: "What is the minimum slit width for PET film?",
        answer:
          "The MT-A130 compact holder slits PET down to 8mm. The practical minimum depends on your machine layout — tell us your target width and we will confirm feasibility.",
      },
      {
        question: "What blade material is recommended for PET film score cutting?",
        answer:
          "PET is more abrasive than polyolefin films, so blade life is the deciding factor. Hardened tool-steel score blades handle general work; tungsten carbide blades cost more per piece but hold their edge several times longer on high-volume PET lines, which usually wins on cost per slit kilometer.",
      },
    ],
  },
  {
    slug: "nonwoven-score-cut",
    title: "Nonwoven Fabric Slitting with Score Cut Knife Holders",
    metaDescription:
      "How to slit nonwoven fabric without dust and lint: score cut with large chip clearance — the MT-A170 evacuates fibers from the cut zone continuously.",
    material: "Nonwoven Fabric",
    cuttingMethod: "score-cut",
    recommendedModels: ["MT-A170", "MT-A140"],
    applicationSlug: "nonwoven",
    intro: [
      "Dust and loose fibers are the chronic complaint in nonwoven converting: they contaminate hygiene products, clog holders, and force cleaning stops. The cutting station is where the problem starts — and where it is solved.",
      "The MT-A170's defining feature is its large chip-clearance geometry, which evacuates fibers and lint away from the cut zone continuously instead of letting them accumulate. For lighter webs the MT-A140 provides the same controlled high-pressure scoring in a simpler package.",
    ],
    faqs: [
      {
        question: "How do I reduce dust when slitting nonwoven fabric?",
        answer:
          "Choose a holder designed to evacuate fibers rather than trap them. The MT-A170's open chip-clearance area clears debris continuously — the direct answer to dust-free and lint-free specifications in hygiene and filtration converting.",
      },
      {
        question: "Which cutting method is best for spunbond nonwovens?",
        answer:
          "Score cut with a large chip-clearance holder covers most spunbond work economically. High-speed lines with strict dust limits can move to shear cut (MT-A450/A850), and synthetic nonwovens that fray can be sealed at the edge with hot cut (MT-A710).",
      },
      {
        question: "How to choose a knife holder for nonwoven slitting?",
        answer:
          "Three criteria decide it: chip clearance (can the holder evacuate fibers, or will they pack around the blade?), pressure control (nonwovens need consistent force to cut cleanly without crushing), and web weight. Light-to-medium webs run on the MT-A140; debris-heavy or hygiene-grade work needs the MT-A170's open chip-clearance geometry.",
      },
      {
        question: "What causes fuzzy or linty edges when slitting nonwoven fabric?",
        answer:
          "A dull blade or insufficient cutting pressure tears fibers instead of severing them, leaving a fuzzy edge and loose lint. Keep blades sharp, set pneumatic pressure to cut through in one pass, and use a holder that clears fiber debris away from the cut zone before it interferes with the blade.",
      },
    ],
  },
  {
    slug: "paper-shear-cut",
    title: "Paper & Board Slitting with Shear Cut Knife Holders",
    metaDescription:
      "When should paper switch from score cut to shear cut? Around 200 gsm — MT-A650, MT-A850, and MT-A880 shear holders keep heavy board slitting dust-free.",
    material: "Paper & Board",
    cuttingMethod: "shear-cut",
    recommendedModels: ["MT-A650", "MT-A850", "MT-A880"],
    applicationSlug: "paper",
    intro: [
      "Lightweight papers score-cut economically — but heavy board punishes score blades: edge quality collapses, dust climbs, and blade life drops. From roughly 200 gsm upward, shear cutting is the right tool.",
      "The MT-A650 covers medium board and laminated papers; the MT-A850's reinforced frame keeps true shear geometry under heavy stock; and the MT-A880 handles the extreme end — thick board, abrasive stock, and reinforced papers.",
    ],
    faqs: [
      {
        question: "At what paper weight should I switch from score cut to shear cut?",
        answer:
          "As a rule of thumb, around 200 gsm. Below that, score cut is more economic; above it, shear cut maintains edge quality, cuts dust, and extends blade life. Borderline cases are exactly what our free 3-day material test is for.",
      },
      {
        question: "How do I reduce paper dust at the slitting station?",
        answer:
          "Paper dust comes from crushing rather than cutting the fibers. A sharp shear cut separates fibers cleanly with far less dust than a worn or overloaded score setup — which matters for printing and food-contact applications.",
      },
      {
        question: "What is the difference between shear cut and score cut for paper?",
        answer:
          "Score cut presses one circular blade against a hardened anvil roller — economical and fast to set up, but the crushing action generates dust and struggles above roughly 200 gsm. Shear cut runs two blades in a scissor action that severs fibers cleanly: better edges, less dust, and longer blade life on heavy board, at a higher cost per station.",
      },
      {
        question: "What blade material is recommended for paper and board slitting?",
        answer:
          "Paper is abrasive — clay fillers and coatings wear blade edges faster than most plastic films. HSS blades are the standard choice; tungsten carbide is worth the premium on high-volume board lines and recycled stock, where its wear resistance multiplies the resharpening interval.",
      },
    ],
  },
  {
    slug: "rubber-score-cut",
    title: "Rubber Slitting with Heavy-Duty Score Cut Knife Holders",
    metaDescription:
      "How to slit rubber without stretching it: high-pressure score cut — MT-A140 for light sheet, MT-A170 for rubber leather, MT-A510 for magnetic sheet.",
    material: "Rubber",
    cuttingMethod: "score-cut",
    recommendedModels: ["MT-A140", "MT-A170", "MT-A510"],
    applicationSlug: "rubber",
    intro: [
      "Rubber stretches and springs back: too little blade pressure and the cut does not go through; too much and the web deforms, the slit wanders, and width tolerance is gone. Controlled high-pressure score cutting solves both sides of the problem.",
      "The MT-A140 (4–7 kg/cm²) handles light rubber sheet; the MT-A170 adds large chip clearance for debris-heavy rubber leather work; and the MT-A510 — the strongest score holder in the range — pushes through rubber magnetic sheet and heavy rubber that stalls lighter holders.",
    ],
    faqs: [
      {
        question: "How do I slit rubber without stretching it?",
        answer:
          "Use a holder that delivers precisely set high force. Elastic materials need enough pressure to cut through in one pass — hesitation is what stretches the web. The MT-A140/A170/A510 pneumatic system holds that force constant across the run.",
      },
      {
        question: "What knife holder cuts rubber magnetic sheet?",
        answer:
          "The MT-A510, the maximum-duty score holder in the MOTOKNIFE range. Its 4–8 kg/cm² cylinder and heavy frame are sized for dense, abrasive webs like rubber magnetic sheet and fiberglass composites.",
      },
      {
        question: "What is the best cutting method for rubber sheet?",
        answer:
          "High-pressure score cut. Rubber's elasticity absorbs light blade force, so the method must deliver enough sustained pressure to sever the web in one pass against the anvil roller. Shear cut is rarely used on rubber — the material deflects between the blades — and razor cut lacks the force for anything beyond thin, soft grades.",
      },
      {
        question: "What causes wavy or wandering slits in rubber?",
        answer:
          "Springback. If blade force is marginal or the holder flexes, the elastic web pushes back against the blade and the cut line wanders, taking width tolerance with it. The fix is a rigid, heavy-duty holder set to cut decisively through the material — hesitation at the blade is what deforms the web.",
      },
    ],
  },
  {
    slug: "adhesive-tape-half-cut",
    title: "Adhesive Tape Kiss-Cutting with Half Cut Knife Holders",
    metaDescription:
      "How to kiss-cut adhesive tape without cutting the liner: MT-A310 half cut holder with ±0.01mm micrometer depth control and constant pneumatic force.",
    material: "Adhesive Tape",
    cuttingMethod: "half-cut",
    recommendedModels: ["MT-A310"],
    applicationSlug: "tape-labels",
    intro: [
      "Kiss-cutting — cutting the tape layer while leaving the release liner untouched — is what turns adhesive tape into a usable die-cut product. A few microns too deep scraps the liner and the batch; too shallow and the parts will not release.",
      "The MT-A310's micrometer depth adjustment sets blade penetration in precise increments, and its pneumatic system keeps cutting force constant as the blade wears, so kiss-cut quality does not drift across the roll or the shift.",
    ],
    faqs: [
      {
        question: "What is the difference between half cut and kiss cut?",
        answer:
          "They describe the same operation: cutting through the face material and adhesive while leaving the backing liner intact. Half cut is the equipment term; kiss cut is the converting term.",
      },
      {
        question: "How precise is the depth control on the MT-A310?",
        answer:
          "The micrometer mechanism adjusts blade depth at ±0.01mm, and the holder itself is machined to ±0.005mm tolerance — enough to cut a tape layer reliably without scoring the liner beneath it.",
      },
      {
        question: "How to choose a knife holder for kiss-cutting adhesive tape?",
        answer:
          "Look at three things: depth adjustment resolution (a micrometer mechanism, not a coarse screw), force constancy (pneumatic holders keep cutting force stable as the blade wears), and rigidity (any flex in the holder becomes depth variation at the blade). The MT-A310 is built around exactly these three requirements.",
      },
      {
        question: "What causes the blade to cut through the release liner?",
        answer:
          "Usually depth drift: blade wear, caliper variation in the incoming web, or a holder whose force rises as the cylinder extends. A constant-force pneumatic system with micrometer depth setting compensates for wear automatically; incoming caliper variation is a material problem worth raising with your tape supplier.",
      },
    ],
  },
  {
    slug: "medical-laminate-half-cut",
    title: "Medical Laminate Converting with Half Cut Knife Holders",
    metaDescription:
      "Which knife holder for medical patches and multi-layer dressings? MT-A310 for standard laminates, MT-A310H for depth stability across complex stacks.",
    material: "Medical Laminate",
    cuttingMethod: "half-cut",
    recommendedModels: ["MT-A310", "MT-A310H"],
    applicationSlug: "medical",
    intro: [
      "Medical laminates combine foams, films, adhesives, and liners of different hardness in one web — and every layer transition is a chance for cut depth to drift. In medical converting, drift means scrapped lots and audit findings.",
      "The MT-A310 covers standard medical patches and foam tapes; the MT-A310H extends the platform with enhanced depth stability for complex multi-layer dressings, cutting a chosen number of layers while the layers below stay untouched.",
    ],
    faqs: [
      {
        question: "Which holder is right for multi-layer wound dressings?",
        answer:
          "The MT-A310H. Its enhanced micrometer depth mechanism and added blade stability are designed for thick, heterogeneous laminate stacks where a standard kiss-cut holder drifts at layer transitions.",
      },
      {
        question: "Can MOTOKNIFE test our medical laminate before we commit?",
        answer:
          "Yes — send us your material and we return a full report in 3 working days: recommended method, recommended model, cut sample photos, and test video. The service is free.",
      },
      {
        question: "What is the best cutting method for medical foam tapes and patches?",
        answer:
          "Half cut (kiss cut): the blade severs the foam, adhesive, and facestock while leaving the release liner intact, so the converted parts stay registered on the liner through packaging and dispensing. Full-depth score or shear cutting is only used where the liner is meant to be cut through as well.",
      },
      {
        question: "How do I keep cut depth stable across different laminate layers?",
        answer:
          "Depth stability comes from the holder, not the operator: a micrometer depth stop defines how far the blade can travel, and a pneumatic system holds cutting force constant as layer hardness changes under the blade. That combination is why the MT-A310H holds its set depth at foam-to-film and film-to-adhesive transitions where simpler holders drift.",
      },
    ],
  },
  {
    slug: "battery-separator-shear-cut",
    title: "Battery Separator Film Slitting with Precision Shear Cut",
    metaDescription:
      "How to slit battery separator film with low particle counts: precision shear cut — MT-A410 fine overlap control keeps edges clean and pores intact.",
    material: "Battery Separator Film",
    cuttingMethod: "shear-cut",
    recommendedModels: ["MT-A410", "MT-A450"],
    applicationSlug: "plastic-film",
    intro: [
      "Separator film is the most unforgiving web in battery production: microporous, thin, and safety-critical. Edge defects and particle generation at the slitting station translate directly into cell rejects.",
      "Precision shear cutting with the MT-A410 gives separator lines the fine blade overlap and side-force control that keeps edges clean and particle counts low; the MT-A450 covers heavier separator grades and coated variants. Both are machined in-house to ±0.005mm.",
    ],
    faqs: [
      {
        question: "Why is shear cut preferred for battery separator film?",
        answer:
          "Separator film cannot tolerate the crushing action of score cut — it generates particles and closes pores at the edge. True shear separation keeps the edge structure intact and particle generation low.",
      },
      {
        question: "Can the same holders slit separator film and electrode foil?",
        answer:
          "Yes — the MT-A410/A450 precision shear pair covers copper foil, aluminum foil, and separator film. Battery lines standardize on them so one holder family serves the whole cell stack.",
      },
      {
        question: "How do I reduce particle generation when slitting separator film?",
        answer:
          "Particles come from the blade tearing or crushing the microporous structure instead of shearing it. Keep blade edges precision-ground, set blade overlap to the minimum that still cuts through, control side force finely, and use a rigid holder that does not vibrate at line speed — the parameters the MT-A410 is designed to hold.",
      },
      {
        question: "What blade material is recommended for battery separator film?",
        answer:
          "Uncoated polyolefin separator runs well on precision-ground HSS blades. Ceramic-coated separator grades are far more abrasive and typically justify tungsten carbide, which holds a clean edge many times longer against the coating. The deciding factor is your particle specification — a degrading edge shows up in particle counts before it shows up visually.",
      },
    ],
  },
  {
    slug: "shrink-film-hot-cut",
    title: "Shrink Film Slitting with Hot Cut Knife Holders",
    metaDescription:
      "How to slit shrink film without frayed edges: hot cut fuses the edge while cutting — the MT-A710 runs a 600°C blade and slits widths below 13mm.",
    material: "Shrink Film",
    cuttingMethod: "hot-cut",
    recommendedModels: ["MT-A710"],
    applicationSlug: "heat-sealed",
    intro: [
      "Cut shrink film and synthetic webs with a cold blade and the edge is a liability: it frays, curls, and splits in downstream handling. A heated blade melts through the web and fuses the edge in the same pass — no loose fibers, no fray.",
      "The MT-A710 packages a 600°C blade (capable of 650°C under suitable conditions) with PID temperature control in a body narrow enough to slit below 13mm — nearly half the minimum width of typical hot cut systems, opening narrow-web products other lines cannot make.",
    ],
    faqs: [
      {
        question: "What temperature does shrink film hot cutting require?",
        answer:
          "It depends on the material: most polyolefin shrink films fuse cleanly well below the MT-A710's 600°C rating, and PID control holds the set temperature stable across the run. We confirm the exact setting with a free cut test on your material.",
      },
      {
        question: "What is the minimum slit width for hot cutting?",
        answer:
          "Typical hot cut systems bottom out around 25mm because of heater and insulation bulk. The MT-A710 slits below 13mm — the narrow webbing, label tape, and strap widths where fused edges matter most.",
      },
      {
        question: "What is the difference between hot cut and razor cut for shrink film?",
        answer:
          "Razor cut slices the film cold: cheap and simple, but the open edge frays, curls, and splits in downstream handling. Hot cut melts through the web and fuses the edge in the same pass, sealing loose fibers and film layers together. For synthetic webs where edge integrity matters, the fused edge is the product advantage.",
      },
      {
        question: "Which materials are suitable for hot cut slitting?",
        answer:
          "Thermoplastics — materials that melt cleanly: polyolefin shrink films, woven and nonwoven synthetics, webbing, straps, and label tapes. Materials that char rather than melt (paper, cotton, aramids) are not hot cut candidates; if you are unsure how your material behaves, we run a free cut test and send back samples.",
      },
    ],
  },
];

/* ─── Helpers ─────────────────────────────────────────────── */

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getSolutionsForModel(model: string): Solution[] {
  return SOLUTIONS.filter((s) => s.recommendedModels.includes(model));
}

export function getSolutionsForApplication(applicationSlug: string): Solution[] {
  return SOLUTIONS.filter((s) => s.applicationSlug === applicationSlug);
}

/** 首頁應用卡副標連結用：每個 application 的代表 solution */
export function primarySolutionForApplication(applicationSlug: string): Solution | undefined {
  return getSolutionsForApplication(applicationSlug)[0];
}

export function modelSlug(model: string): string {
  return model.toLowerCase();
}
