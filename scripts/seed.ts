/**
 * Seed script — 將 lib/data/*.ts 靜態資料匯入 Payload Collections。
 * 可重複執行：先清空各 collection 再重建，不產生重複資料。
 *
 * 執行：npm run seed（= payload run scripts/seed.ts，自動載入 .env）
 *
 * zh-tw locale：目前尚無翻譯文案（Phase 2），localized 主欄位先寫入
 * 與 en 相同的內容作為佔位，翻譯完成後由後台編輯覆蓋。
 */
import { getPayload, type Payload } from "payload";

import config from "../payload.config";
import { PRODUCTS, type Product as SourceProduct } from "../lib/data/products";
import {
  SELECTOR_MATERIALS,
  CUTTING_METHOD_SERIES_SLUG,
} from "../lib/data/selector";
import { APPLICATION_MATERIALS } from "../lib/data/applications";
import { DISTRIBUTOR_COUNTRIES } from "../lib/data/distributors";
import { ARTICLES } from "../lib/data/news";
import { PRODUCTS_FAQ, APPLICATIONS_FAQ } from "../lib/data/faq";
import type { Application, News, Product as PayloadProduct } from "../lib/payload-types";

/* ─── Lexical richText builders ───────────────────────────── */

function textNode(text: string) {
  return {
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    text,
    type: "text",
    version: 1,
  };
}

function paragraphNode(text: string) {
  return {
    children: [textNode(text)],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "paragraph",
    version: 1,
  };
}

function headingNode(text: string) {
  return {
    children: [textNode(text)],
    direction: "ltr",
    format: "",
    indent: 0,
    tag: "h2",
    type: "heading",
    version: 1,
  };
}

type RichText = NonNullable<Application["painPoints"]>;

function richText(nodes: ReturnType<typeof paragraphNode | typeof headingNode>[]): RichText {
  return {
    root: {
      children: nodes,
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  } as RichText;
}

/* ─── Mappings ────────────────────────────────────────────── */

const FAMILY_TIER_MAP: Record<string, string> = {
  "Light / Medium Duty": "light-medium",
  "Heavy Duty": "heavy-duty",
  Precision: "precision",
  "General Purpose": "general",
  Medical: "medical",
  "Heat-Sealed Edge": "heat-sealed",
};

const REGION_MAP: Record<string, string> = {
  "Latin America": "latin-america",
  "Europe / Asia": "europe",
  "Asia Pacific": "asia-pacific",
  Europe: "europe",
};

/** applicationSlugs（舊 5 分類）→ Applications collection slug（第六章 9 分類） */
const APP_SLUG_ALIAS: Record<string, string> = {
  "metallic-foil": "metal-foil",
};

function productType(p: SourceProduct): "knife-holder" | "knife" | "guide-bar" | "accessory" {
  if (p.series === "knives") return "knife";
  if (p.series === "guide-bar") return "guide-bar";
  return "knife-holder";
}

function findSpec(p: SourceProduct, labels: string[]) {
  for (const label of labels) {
    const spec = p.specs.find((s) => s.label === label);
    if (spec) return spec;
  }
  return undefined;
}

/* ─── Seed steps ──────────────────────────────────────────── */

async function clearCollections(payload: Payload) {
  // 依關聯順序清空（faqs/news/applications 參照 products）
  for (const collection of ["faqs", "news", "applications", "products", "distributors"] as const) {
    const result = await payload.delete({
      collection,
      where: { id: { exists: true } },
    });
    payload.logger.info(`cleared ${collection}: ${result.docs.length} docs removed`);
  }
}

async function seedProducts(payload: Payload): Promise<Map<string, number>> {
  const idByModel = new Map<string, number>();

  for (const [index, p] of PRODUCTS.entries()) {
    const minSlit = findSpec(p, ["Min. Slit Width"]);
    const speed = findSpec(p, ["Max. Line Speed", "Line Speed"]);
    const airPressure = findSpec(p, ["Air Pressure"]);
    const tolerance = findSpec(p, ["Tolerance"]);
    const temperature = findSpec(p, ["Heating Temperature"]);

    const doc = await payload.create({
      collection: "products",
      draft: false,
      locale: "en",
      depth: 0,
      data: {
        model: p.model,
        slug: p.slug,
        title: p.name,
        productType: productType(p),
        cuttingMethod:
          productType(p) === "knife-holder"
            ? (p.series as "score-cut" | "shear-cut" | "half-cut" | "hot-cut")
            : undefined,
        familyTier: (FAMILY_TIER_MAP[p.tier] ?? undefined) as PayloadProduct["familyTier"],
        tagline: p.summary,
        description: p.description ? richText(p.description.map(paragraphNode)) : undefined,
        keySpecs: {
          minSlitWidth: minSlit
            ? { standard: minSlit.value, condition: minSlit.note }
            : undefined,
          maxSpeed: speed ? { standard: speed.value, condition: speed.note } : undefined,
          airPressure: airPressure?.value,
          tolerance: tolerance?.value,
          maxTemperature: temperature
            ? { standard: temperature.value, condition: temperature.note }
            : undefined,
        },
        detailedSpecs: p.specs.map((s) => ({
          label: s.label,
          value: s.value,
          note: s.note,
        })),
        // technicalDrawings / drawingNotes / model3d / featureHighlights 刻意留空——素材由後台上傳
        displayOrder: index,
        featured: false,
        _status: "published",
      },
    });

    // zh-tw 佔位（同 en，待 Phase 2 翻譯）。
    // 陣列內 localized 必填子欄位（detailedSpecs.label）需帶原列 id 回填，否則驗證失敗。
    await payload.update({
      collection: "products",
      id: doc.id,
      locale: "zh-tw",
      draft: false,
      data: {
        title: p.name,
        tagline: p.summary,
        description: p.description ? richText(p.description.map(paragraphNode)) : undefined,
        detailedSpecs: doc.detailedSpecs?.map((row) => ({
          id: row.id,
          label: row.label,
          value: row.value,
          note: row.note,
        })),
      },
    });

    idByModel.set(p.model, doc.id);
  }

  payload.logger.info(`seeded products: ${idByModel.size}`);
  return idByModel;
}

async function seedApplications(
  payload: Payload,
  idByModel: Map<string, number>,
): Promise<Map<string, number>> {
  const idBySlug = new Map<string, number>();

  for (const material of SELECTOR_MATERIALS) {
    // 對應刀組：依切割方式彙整所有厚度選項的推薦
    const byMethod = new Map<string, { models: Set<string>; note?: string }>();
    for (const option of material.thicknessOptions) {
      for (const rec of option.recommendations) {
        const entry = byMethod.get(rec.cuttingMethod) ?? { models: new Set<string>() };
        rec.models.forEach((m) => entry.models.add(m));
        entry.note = entry.note ?? rec.note;
        byMethod.set(rec.cuttingMethod, entry);
      }
    }

    // 舊 5 分類頁面的內容作為痛點敘事（有對應者）
    const legacy = APPLICATION_MATERIALS.find(
      (m) => (APP_SLUG_ALIAS[m.slug] ?? m.slug) === material.id,
    );

    const doc = await payload.create({
      collection: "applications",
      draft: false,
      locale: "en",
      depth: 0,
      data: {
        categoryNumber: material.categoryNumber,
        title: material.name,
        slug: material.id,
        coverage: material.examples.split(", ").map((m) => ({ material: m })),
        cuttingMethods: [...byMethod.keys()].map(
          (m) =>
            CUTTING_METHOD_SERIES_SLUG[m as keyof typeof CUTTING_METHOD_SERIES_SLUG] as
              | "score-cut"
              | "shear-cut"
              | "half-cut"
              | "hot-cut",
        ),
        painPoints: legacy
          ? richText([paragraphNode(legacy.description), ...legacy.characteristics.map(paragraphNode)])
          : undefined,
        productRecommendations: [...byMethod.entries()].map(([method, entry]) => ({
          cuttingMethod: CUTTING_METHOD_SERIES_SLUG[
            method as keyof typeof CUTTING_METHOD_SERIES_SLUG
          ] as "score-cut" | "shear-cut" | "half-cut" | "hot-cut",
          products: [...entry.models].flatMap((m) => idByModel.get(m) ?? []),
          note: entry.note,
        })),
        selectorRules: material.thicknessOptions.map((option) => ({
          materialLabel: option.label,
          recommendedProducts: option.recommendations
            .flatMap((r) => r.models)
            .flatMap((m) => idByModel.get(m) ?? []),
          note: option.recommendations[0]?.note,
        })),
        _status: "published",
      },
    });

    // coverage.material 與 selectorRules.materialLabel 為 localized 必填，帶列 id 回填
    await payload.update({
      collection: "applications",
      id: doc.id,
      locale: "zh-tw",
      draft: false,
      data: {
        title: material.name,
        coverage: doc.coverage?.map((row) => ({ id: row.id, material: row.material })),
        selectorRules: doc.selectorRules?.map((row) => ({
          id: row.id,
          materialLabel: row.materialLabel,
          recommendedProducts: row.recommendedProducts,
          note: row.note,
        })),
      },
    });

    idBySlug.set(material.id, doc.id);
  }

  payload.logger.info(`seeded applications: ${idBySlug.size}`);
  return idBySlug;
}

async function linkProductsToApplications(
  payload: Payload,
  idByModel: Map<string, number>,
  appIdBySlug: Map<string, number>,
) {
  for (const p of PRODUCTS) {
    if (p.applicationSlugs.length === 0) continue;
    const appIds = p.applicationSlugs.flatMap(
      (slug) => appIdBySlug.get(APP_SLUG_ALIAS[slug] ?? slug) ?? [],
    );
    const productId = idByModel.get(p.model);
    if (!productId || appIds.length === 0) continue;
    await payload.update({
      collection: "products",
      id: productId,
      draft: false,
      data: { applications: appIds },
    });
  }
  payload.logger.info("linked products ↔ applications");
}

async function seedDistributors(payload: Payload) {
  let count = 0;
  for (const country of DISTRIBUTOR_COUNTRIES) {
    for (const [index, company] of country.companies.entries()) {
      const doc = await payload.create({
        collection: "distributors",
        locale: "en",
        data: {
          companyName: company,
          countryCode: country.countryCode,
          countryName: country.countryName,
          region: (REGION_MAP[country.region] ?? "asia-pacific") as
            | "asia-pacific"
            | "europe"
            | "north-america"
            | "latin-america"
            | "middle-east-africa",
          active: true,
          showContactPublicly: true,
          displayOrder: index,
        },
      });
      await payload.update({
        collection: "distributors",
        id: doc.id,
        locale: "zh-tw",
        data: { countryName: country.countryName },
      });
      count++;
    }
  }
  payload.logger.info(`seeded distributors: ${count}`);
}

async function seedNews(payload: Payload, idByModel: Map<string, number>) {
  const modelBySlug = new Map(PRODUCTS.map((p) => [p.slug, p.model]));

  for (const article of ARTICLES) {
    const content: News["content"] = richText(
      article.sections.flatMap((section) => [
        headingNode(section.heading),
        ...section.paragraphs.map(paragraphNode),
      ]),
    );

    const doc = await payload.create({
      collection: "news",
      draft: false,
      locale: "en",
      data: {
        title: article.title,
        slug: article.slug,
        category: article.category,
        publishedDate: article.publishedDate,
        excerpt: article.excerpt,
        content,
        relatedProducts: article.relatedProductSlugs.flatMap((slug) => {
          const model = modelBySlug.get(slug);
          return model ? (idByModel.get(model) ?? []) : [];
        }),
        _status: "published",
      },
    });

    await payload.update({
      collection: "news",
      id: doc.id,
      locale: "zh-tw",
      draft: false,
      data: { title: article.title, excerpt: article.excerpt, content },
    });
  }
  payload.logger.info(`seeded news: ${ARTICLES.length}`);
}

async function seedFaqs(payload: Payload) {
  const all = [
    ...PRODUCTS_FAQ.map((f, i) => ({ ...f, page: "products" as const, displayOrder: i })),
    ...APPLICATIONS_FAQ.map((f, i) => ({ ...f, page: "applications" as const, displayOrder: i })),
  ];

  for (const faq of all) {
    const doc = await payload.create({
      collection: "faqs",
      locale: "en",
      data: {
        question: faq.question,
        answer: faq.answer,
        page: faq.page,
        displayOrder: faq.displayOrder,
      },
    });
    await payload.update({
      collection: "faqs",
      id: doc.id,
      locale: "zh-tw",
      data: { question: faq.question, answer: faq.answer },
    });
  }
  payload.logger.info(`seeded faqs: ${all.length}`);
}

/* ─── Main ────────────────────────────────────────────────── */

const payload = await getPayload({ config });

try {
  await clearCollections(payload);
  const idByModel = await seedProducts(payload);
  const appIdBySlug = await seedApplications(payload, idByModel);
  await linkProductsToApplications(payload, idByModel, appIdBySlug);
  await seedDistributors(payload);
  await seedNews(payload, idByModel);
  await seedFaqs(payload);
  payload.logger.info("✓ seed complete");
  process.exit(0);
} catch (error) {
  if (error && typeof error === "object" && "data" in error) {
    console.error("Validation details:", JSON.stringify((error as { data: unknown }).data, null, 2));
  }
  console.error(error);
  process.exit(1);
}
