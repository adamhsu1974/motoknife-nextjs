export interface FaqItem {
  question: string;
  answer: string;
}

export const PRODUCTS_FAQ: FaqItem[] = [
  {
    question: "How do I choose between score cut and shear cut knife holders?",
    answer:
      "Score cut is the most economic method for films, paper, tapes, and nonwovens, especially at narrow widths. Shear cut is required for metal foils (burr-free edges) and is the better choice for heavy board, thick films, and high-speed low-dust lines. If your material fits both, start with score cut for cost and switch to shear cut when edge quality or dust becomes the limiting factor.",
  },
  {
    question: "What is the minimum slit width MOTOKNIFE holders can achieve?",
    answer:
      "The compact MT-A130 score cut holder slits down to 8mm, and the MT-A710 hot cut holder achieves fused-edge slitting below 13mm — nearly half the typical industry minimum for thermal slitting. The practical minimum depends on your material and machine layout, so tell us your target width and we will confirm feasibility.",
  },
  {
    question: "Can MOTOKNIFE manufacture custom knife holders or blades?",
    answer:
      "Yes. All components are designed, machined, and assembled in-house at our Taoyuan factory on MAZAK CNC multi-tasking centers, so custom holders, blades, and guide bars to your specifications are part of normal production — not an exception.",
  },
  {
    question: "Do you provide sample testing before purchase?",
    answer:
      "Yes. Send us a sample roll of your material and we will test it against candidate holders, then return a report with edge photographs and recommended settings before you commit to a purchase.",
  },
  {
    question: "Are MOTOKNIFE holders compatible with my existing slitting machine?",
    answer:
      "MOTOKNIFE holders mount on standard round and square guide bars and are used on slitter rewinders worldwide. Share your machine make and guide bar dimensions in the quote form and our engineers will confirm compatibility.",
  },
];

export const APPLICATIONS_FAQ: FaqItem[] = [
  {
    question: "How do I know which cutting method suits my material?",
    answer:
      "Start from the material, not the machine: films, paper, and tapes usually take score cut; metal foils require shear cut; medical laminates on release liner need half cut; and synthetic textiles that fray need hot cut. Our interactive selector on this page walks you from material and thickness to recommended models in two steps.",
  },
  {
    question: "What knife holder should I use for battery-grade copper or aluminum foil?",
    answer:
      "Ultra-thin battery foils (6–20 µm) call for the MT-A410 precision shear holder; standard foils (20–100 µm) use the MT-A450. Shear cutting is mandatory here because a single burr on the foil edge can pierce the battery separator and scrap the cell.",
  },
  {
    question: "How can I reduce dust and lint when slitting nonwovens?",
    answer:
      "Dust comes from fibers accumulating at the cut zone. The MT-A170 heavy-duty score holder is designed with a large chip clearance that evacuates fibers continuously, and for high-speed lines the MT-A450/A850 shear path cuts with inherently less dust. Hot cut (MT-A710) eliminates loose fibers entirely by fusing the edge.",
  },
  {
    question: "What is the right holder for multi-layer medical materials?",
    answer:
      "Half cut holders — the MT-A310 for standard medical patches and foam tapes, and the MT-A310H for complex multi-layer dressings. Both cut the product layers precisely while leaving the release liner intact.",
  },
];
