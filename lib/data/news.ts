export type NewsCategory =
  | "exhibition"
  | "product-news"
  | "industry-knowledge"
  | "company-news";

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  category: NewsCategory;
  /** ISO date */
  publishedDate: string;
  excerpt: string;
  coverCaption: string;
  sections: ArticleSection[];
  relatedProductSlugs: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "how-to-choose-the-right-knife-holder",
    title: "How to Choose the Right Knife Holder for Your Slitting Application",
    category: "industry-knowledge",
    publishedDate: "2026-05-12",
    excerpt:
      "Score, shear, half, or hot cut? A practical four-step guide to matching your material, thickness, and line speed to the right knife holder.",
    coverCaption: "Knife holder selection guide",
    sections: [
      {
        id: "start-from-material",
        heading: "1. Start From Your Material",
        paragraphs: [
          "The single most important input for holder selection is not your machine — it is your material. Paper, film, foil, nonwoven, rubber, and laminates each fail in different ways when cut with the wrong method: dust, burrs, fraying, stretching, or delamination.",
          "Before comparing models, write down three things: what you are cutting, its thickness or grammage range, and the line speed you need to sustain. These three answers eliminate most of the catalog immediately.",
        ],
      },
      {
        id: "four-methods",
        heading: "2. Understand the Four Cutting Methods",
        paragraphs: [
          "Score cut presses a circular blade against a hardened anvil roller. It is the most economic method for narrow widths and handles films, paper, tapes, and nonwovens well.",
          "Shear cut uses two blades in a scissor action. It is mandatory for metal foils, where burr-free edges are a safety specification, and the best choice for heavy board and thick films.",
          "Half cut penetrates only the top layer, leaving the liner intact — the method behind medical patch and label converting.",
          "Hot cut melts through synthetic webs with a heated blade, fusing the edge as it cuts so fibers cannot fray loose.",
        ],
      },
      {
        id: "key-specs",
        heading: "3. Check Three Specifications",
        paragraphs: [
          "Minimum slit width determines whether the holder can physically make your narrowest product. Maximum line speed decides whether the holder keeps edge quality at your production rate, not just at demo speed. Air pressure range tells you whether the holder has the force reserve for your heaviest material.",
          "Beware of single-number specifications. A realistic datasheet states a standard value and a maximum with its conditions — if a supplier only quotes the extreme value, ask what conditions it assumes.",
        ],
      },
      {
        id: "sample-testing",
        heading: "4. When in Doubt, Test With Your Material",
        paragraphs: [
          "No selection chart replaces a cut test on your actual material. Send us a sample roll and we will test it against candidate holders and return a report with edge photographs and recommended settings — before you commit to a purchase.",
        ],
      },
    ],
    relatedProductSlugs: ["mt-a110", "mt-a450", "mt-a310", "mt-a710"],
  },
  {
    slug: "mt-a710-hot-cut-13mm-slit-width",
    title: "MT-A710 Hot Cut: Achieving < 13mm Slit Width for Synthetic Textiles",
    category: "product-news",
    publishedDate: "2026-03-20",
    excerpt:
      "Most hot cut systems stop at 25mm. The MT-A710 slits fused, fray-free edges below 13mm — opening narrow webbing, woven labels, and medical tapes to thermal slitting.",
    coverCaption: "MT-A710 hot cut knife holder",
    sections: [
      {
        id: "why-hot-cut",
        heading: "Why Hot Cut at All?",
        paragraphs: [
          "Cut synthetic webbing or woven label tape with a cold blade and the edge frays: fibers pull loose in downstream handling, and the product is rejected. Thermal slitting solves this at the source — a heated blade melts through the web and fuses the edge in the same pass.",
        ],
      },
      {
        id: "narrow-width-challenge",
        heading: "The Narrow-Width Challenge",
        paragraphs: [
          "The catch has always been width. Heating elements, insulation, and holder mechanics take space, so typical hot cut systems bottom out around a 25mm minimum slit width. That locks thermal slitting out of exactly the products that need it most: narrow webbing, woven labels, and medical tape, where widths of 15mm and below are routine.",
        ],
      },
      {
        id: "how-a710-does-it",
        heading: "How the MT-A710 Reaches < 13mm",
        paragraphs: [
          "The MT-A710 packages a 600°C blade — capable of 650°C under suitable conditions — with PID temperature control in a body narrow enough to slit below 13mm, nearly half the industry's typical minimum.",
          "Line speed is rated at 20 m/min, with up to 30 m/min achievable on selected materials. We publish both numbers deliberately: the standard value is what you can plan production around, and the maximum states its conditions.",
        ],
      },
      {
        id: "applications",
        heading: "Where It Pays Off",
        paragraphs: [
          "Narrow-width fused-edge slitting serves high-value products: safety webbing, woven brand labels, hook-and-loop straps, and medical tapes. If your product needs a sealed edge at a width other hot cut systems cannot reach, this is the tool built for it.",
        ],
      },
    ],
    relatedProductSlugs: ["mt-a710"],
  },
  {
    slug: "motoknife-shanghai-nonwovens-exhibition-2023",
    title: "MOTOKNIFE at Shanghai International Nonwovens Exhibition 2023",
    category: "exhibition",
    publishedDate: "2023-11-08",
    excerpt:
      "Highlights from our booth at SINCE 2023: dust-free nonwoven slitting with the MT-A170 and live hot cut demonstrations with the MT-A710.",
    coverCaption: "MOTOKNIFE booth at SINCE 2023, Shanghai",
    sections: [
      {
        id: "at-the-show",
        heading: "At the Show",
        paragraphs: [
          "Our team spent three days at the Shanghai International Nonwovens Exhibition (SINCE 2023) meeting converters from across China and Southeast Asia. Dust control dominated the conversations: hygiene and filtration producers are under growing pressure to deliver lint-free slit edges.",
        ],
      },
      {
        id: "what-we-showed",
        heading: "What We Showed",
        paragraphs: [
          "The MT-A170 heavy-duty score holder drew the most attention. Its large chip-clearance design evacuates fibers away from the cut zone — a direct answer to the dust problem visitors kept describing.",
          "Alongside it, live demonstrations of the MT-A710 hot cut holder showed fused-edge slitting of synthetic webbing at widths conventional hot cut systems cannot reach.",
        ],
      },
      {
        id: "thank-you",
        heading: "Thank You",
        paragraphs: [
          "Thank you to everyone who visited the booth. Our Shanghai branch continues the conversations locally — and if you missed the show, we are happy to arrange a cut test with your material at our Taoyuan headquarters.",
        ],
      },
    ],
    relatedProductSlugs: ["mt-a170", "mt-a710"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getSortedArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate));
}
