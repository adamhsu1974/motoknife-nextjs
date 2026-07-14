/**
 * Import product copy (tagline + description) to Payload
 * ─────────────────────────────────────────────────────────
 * 只更新既有產品的 `tagline` 與 `description` 兩個欄位(en + zh-tw),
 * 其他欄位一律不動 —— 對 NAS 三機共用資料庫安全。
 *
 * 執行:
 *   npx payload run scripts/import-product-copy.ts            (直接匯入)
 *   npx payload run scripts/import-product-copy.ts --dry-run  (僅預覽)
 *   npx payload run scripts/import-product-copy.ts --verify   (匯入後驗證)
 */
import { getPayload, type Payload } from "payload";

import config from "../payload.config";

/* ─── Lexical richText builder(單段落) ──────────────────── */

function paragraphRichText(text: string) {
  return {
    root: {
      type: "root",
      version: 1,
      format: "" as const,
      indent: 0,
      direction: "ltr" as const,
      children: [
        {
          type: "paragraph",
          version: 1,
          format: "" as const,
          indent: 0,
          direction: "ltr" as const,
          children: [
            {
              type: "text",
              version: 1,
              detail: 0,
              format: 0,
              mode: "normal" as const,
              style: "",
              text,
            },
          ],
        },
      ],
    },
  };
}

/* ─── 文案資料(model → 中英雙語 tagline + description) ─── */

interface CopyEntry {
  model: string;
  tagline: { en: string; "zh-tw": string };
  description: { en: string; "zh-tw": string };
}

const COPY: CopyEntry[] = [
  {
    model: "MT-A110",
    tagline: {
      en: "The most versatile crush-cut knife-holder — one rigid modular body, four interchangeable blade profiles, engineered for narrow-web precision.",
      "zh-tw": "最百搭的壓切刀座——單件式剛性機身、四種可換刀型,專為窄幅高精度分切而生。",
    },
    description: {
      en: "The MT-A110 is our most versatile crush-cut knife-holder, engineered for high-precision narrow-web slitting. Its one-piece modular body delivers exceptional rigidity, withstanding up to 6 kg/cm² of pneumatic pressure while maintaining consistent down-force against a hardened anvil roller. Operators can switch quickly between score, zig-zag, K-dash and wave blades, making it ideal for slitting paper, light rubber, textiles and plastic films. A robust screw-lock mounts securely to GB02 / GB04 / GB05 guide-bars.",
      "zh-tw": "MT-A110 是本廠最百搭的壓切刀座,專為窄幅高精度分切而設計。單件式模組化機身提供優異剛性,可承受高達 6 kg/cm² 氣壓,並對硬化砧輥維持穩定下壓力。操作者可在壓切、鋸齒、K-dash 與波浪刀之間快速切換,適用於紙張、輕質橡膠、織物與塑膠膜的分切。堅固的螺鎖結構可穩固安裝於 GB02 / GB04 / GB05 導桿。",
    },
  },
  {
    model: "MT-A130",
    tagline: {
      en: "Slits as narrow as 10 mm from a body just 9.8 mm thick — production-class accuracy at a remarkably low cost.",
      "zh-tw": "機身僅 9.8 mm、最窄可切 10 mm——以極具競爭力的成本達到量產級精度。",
    },
    description: {
      en: "The MT-A130 is engineered for the tightest narrow-web lines, delivering crush-cut slits as narrow as 10 mm from a body only 9.8 mm thick. Its one-piece die-cast frame provides outstanding rigidity, ensuring consistent down-force and clean edges without heavy capital investment. Despite its ultra-compact size, it offers production-class accuracy at a highly cost-effective price. Mounting directly to GB02 / GB04 / GB05 guide-bars, it is ideal for slitting light rubber, paper, textiles and plastic films — delivering the reliability demanded by professional converting lines.",
      "zh-tw": "MT-A130 專為最緊湊的窄幅產線設計,機身僅 9.8 mm 厚,壓切分切寬度最窄可達 10 mm。單件式壓鑄機身提供卓越剛性,無需高額設備投資即可維持穩定下壓力與俐落切邊。體積雖極為精巧,仍以極具成本效益的價格提供量產級精度。可直接安裝於 GB02 / GB04 / GB05 導桿,適用於輕質橡膠、紙張、織物與塑膠膜分切,滿足專業加工產線對可靠度的要求。",
    },
  },
  {
    model: "MT-A140",
    tagline: {
      en: "A slim yet rugged crush-cut holder that slits heavy-gauge materials down to 19 mm wide under a stable 8 kg/cm² down-force.",
      "zh-tw": "纖薄卻強悍的壓切刀座——8 kg/cm² 穩定下壓力,重磅材料最窄可切 19 mm。",
    },
    description: {
      en: "The MT-A140 rugged knife-holder is optimized for heavy-gauge material slitting. Its strong yet slim modular body achieves a minimum slit width of just 19 mm, satisfying both narrow-width and heavy-duty conditions at once. Exceptional rigidity lets it accept up to 8 kg/cm² of air pressure and deliver the stable down-force that thick-material slitting demands. Like the rest of the crush-cut family, it mounts to GB01 / GB02 / GB04 guide-bars and accepts interchangeable blades for multi-purpose use — performing reliably across heavy rubber, paper, cloth and plastic film.",
      "zh-tw": "MT-A140 強悍型刀座專為重磅材料分切最佳化。強固而纖薄的模組化機身,最小分切寬度僅 19 mm,同時滿足窄幅與重磅分切需求。優異剛性可承受高達 8 kg/cm² 氣壓,提供厚材分切所需的穩定下壓力。與其他壓切系列一致,可安裝於 GB01 / GB02 / GB04 導桿並更換多種刀型,靈活適用於重質橡膠、紙張、布料與塑膠膜等廣泛應用。",
    },
  },
  {
    model: "MT-A160",
    tagline: {
      en: "A CNC-machined steel-body score holder for sub-11 mm narrow slitting — outstanding rigidity and an extended service life.",
      "zh-tw": "CNC 鋼製機身壓切刀座——11 mm 以下窄幅分切,剛性出眾、壽命更長。",
    },
    description: {
      en: "The MT-A160 pairs a compact footprint with a steel-body frame for versatile score-cut slitting, optimally suited to narrow work under 11 mm wide. Its CNC-machined steel frame delivers excellent rigidity that not only performs across a wide range of materials but also extends service life. The adaptive holder installs on GB01 / GB02 / GB04 guide-bars and accepts interchangeable blades for multi-purpose applications, making it ideal for light rubber, paper, cloth and plastic film.",
      "zh-tw": "MT-A160 結合精巧外形與鋼製機身,適用於多元壓切分切,尤其適合 11 mm 以下的窄幅作業。CNC 加工鋼製機身提供優異剛性,不僅在各類材料分切表現出色,更能延長使用壽命。此款可安裝於 GB01 / GB02 / GB04 導桿並更換多種刀片,靈活適用於輕質橡膠、紙張、布料與塑膠膜。",
    },
  },
  {
    model: "MT-A170",
    tagline: {
      en: "A high-strength 6061-aluminium crush holder with a 100 mm blade — faster, steadier slitting of thick, dust-heavy materials.",
      "zh-tw": "6061 高強度鋁合金壓切刀座,搭配 100 mm 刀片——厚材與高粉塵材料分切更快更穩。",
    },
    description: {
      en: "The MT-A170 rugged knife-holder is built for crush slitting and inherits the strengths of our proven pneumatic score-cut series. Its 6061 aluminium-alloy body combines high strength with extended service life, while a 100 mm slitting blade markedly improves slitting speed and stability for demanding thick-material work — rubber, paper, non-woven, cloth and plastic film. Compared with standard holders, it also provides more clearance to evacuate slitting dust, a key advantage when cutting dust-prone non-wovens.",
      "zh-tw": "MT-A170 強悍型刀座專為壓切分切打造,承襲本廠成熟氣動壓切系列的優勢。6061 鋁合金機身兼具高強度與長壽命,搭配 100 mm 分切刀片,可顯著提升橡膠、紙張、不織布、布料與塑膠膜等厚材作業的分切速度與穩定性。相較標準刀座,更具備更大的排屑空間,在分切易產生粉塵的不織布時尤具優勢。",
    },
  },
  {
    model: "MT-B110",
    tagline: {
      en: "Tool-free clamp locking that saves setup time and prevents over-tightening — quick, repeatable positioning for everyday slitting.",
      "zh-tw": "免工具快夾鎖定,省下換位時間又不會鎖過頭——日常分切快速且可重複定位。",
    },
    description: {
      en: "The MT-B110 easy-clamp knife-holder features a quick-locking mechanism among the fastest in its class. Its clamp handle locks the holder onto the guide-bar tool-free, while preventing the over-tightening that can damage a holder. Paired optionally with our teeth-ruler guide-bar, positioning becomes effortless and productivity rises. Engineered for simple operation and time savings, the MT-B110 adapts readily to light rubber, paper, cloth and plastic film.",
      "zh-tw": "MT-B110 快夾式刀座採用同級中數一數二的快速鎖定機構。透過夾把即可免工具將刀座鎖固於導桿,同時避免鎖付過緊而損傷刀座。選配本廠附齒尺導桿後,定位更輕鬆、產能更提升。此款專為簡易操作與節省工時而設計,可靈活適用於輕質橡膠、紙張、布料與塑膠膜。",
    },
  },
  {
    model: "MT-C121",
    tagline: {
      en: "The same tool-free quick-clamp convenience, purpose-built for 80° / 60° dovetail systems.",
      "zh-tw": "同樣的免工具快夾便利,專為 80° / 60° 燕尾槽系統打造。",
    },
    description: {
      en: "The MT-C121 easy-clamp knife-holder is designed for 80° / 60° dovetail systems and offers a quick-locking mechanism among the fastest in its class. Its clamp handle locks the holder tool-free while preventing damaging over-tightening, and an optional teeth-ruler guide-bar makes positioning simple and boosts productivity. Engineered for easy, time-saving operation, it adapts readily to light rubber, paper, cloth and plastic film.",
      "zh-tw": "MT-C121 快夾式刀座專為 80° / 60° 燕尾槽系統設計,快速鎖定機構為同級中數一數二。夾把可免工具鎖固刀座,並避免鎖付過緊造成損傷;選配附齒尺導桿更讓定位簡單、產能提升。專為簡易省時操作而設計,可靈活適用於輕質橡膠、紙張、布料與塑膠膜。",
    },
  },
  {
    model: "MT-A510",
    tagline: {
      en: "A high-performance crush solution for thick and multi-layer materials, with micro-depth control accurate to 0.05 mm.",
      "zh-tw": "面向厚材與多層複合材的高效壓切方案,微調下壓精度達 0.05 mm。",
    },
    description: {
      en: "The MT-A510 delivers a crush-slitting solution that maximizes performance while minimizing cost. It handles thicker materials such as rubber, sandpaper, roofing shingles, fibreglass, paper and plastic film — and excels on multi-layer composites, tissue, non-woven and adhesive tapes. Its patented rigid holder provides reliable down-force for consistent slit quality across diverse applications. Integrated self-flow control prevents excess airflow from damaging the blade on the down-stroke, while a micro-depth knob gives operators down-stroke control accurate to 0.05 mm.",
      "zh-tw": "MT-A510 提供兼顧高效能與低成本的壓切分切方案。可處理橡膠、砂紙、屋頂瓦片、玻璃纖維、紙張與塑膠膜等厚材,對多層複合材、衛生紙、不織布與膠帶尤為出色。專利剛性刀座提供可靠下壓力,確保各式應用維持穩定分切品質。內建自流量控制可防止下行程氣流過大而傷刀,微調旋鈕更提供達 0.05 mm 的下壓行程精度。",
    },
  },
  {
    model: "MT-A410",
    tagline: {
      en: "A popular shear holder with dual independent valves for down-stroke and side contact — flexible, precise online slitting under 0.4 mm.",
      "zh-tw": "廣受歡迎的剪切刀座,下行程與側靠雙獨立閥——0.4 mm 以下線上分切靈活精準。",
    },
    description: {
      en: "The MT-A410 is a popular shear knife-holder trusted across many slitting applications. Equipped with a 90 mm top blade for general shear slitting, it features two independent control valves for down-stroke and side contact — each controllable separately, or linked for continuous automatic action, giving convenient and flexible online operation. A depth-adjustment screw sets the overlap, while its modular component design improves quality and reduces cost. The MT-A410 slits a wide range of materials including plastic, paper and copper foil, for thicknesses under 0.4 mm and slit widths within 45 mm.",
      "zh-tw": "MT-A410 是廣受眾多分切應用信賴的剪切刀座。配備 90 mm 上刀片,適用一般剪切分切,並具備下行程與側靠兩組獨立控制閥——可各自獨立控制,亦可連動達成連續自動動作,線上操作便利又靈活。深度調整螺絲可設定重疊量,模組化元件設計則提升品質並降低成本。MT-A410 可分切塑膠、紙張、銅箔等多種材料,適用厚度 0.4 mm 以下、分切寬度 45 mm 以內的應用。",
    },
  },
  {
    model: "MT-A425",
    tagline: {
      en: "A compact, cost-effective shear holder specialised in narrow slitting down to 28 mm, with a swing design for stable side contact.",
      "zh-tw": "精巧又具成本效益的剪切刀座,專攻最窄 28 mm 分切,擺動設計提供穩定側靠力。",
    },
    description: {
      en: "The MT-A425 combines a compact, cost-effective design with dedicated narrow-slitting capability, reaching a minimum slit width of 28 mm. Its new swing design delivers stable side-contact force for a cleaner shear cut. Two independent control valves manage down-stroke and side contact — controllable separately or in continuous linked action — for convenient, flexible online operation, while a modular component design improves quality and reduces cost. It is optimally suited to light-web slitting under 0.3 mm thick, including paper, plastic film and non-woven fibres.",
      "zh-tw": "MT-A425 結合精巧、具成本效益的設計與專屬窄幅分切能力,最小分切寬度可達 28 mm。全新擺動設計提供穩定側靠力,達成更俐落的剪切效果。下行程與側靠兩組獨立控制閥可各自或連動控制,線上操作便利靈活;模組化元件設計則提升品質、降低成本。特別適用於 0.3 mm 以下的輕薄材料分切,如紙張、塑膠膜與不織布纖維。",
    },
  },
  {
    model: "MT-A450",
    tagline: {
      en: "A flexible shear holder with adjustable cant angle, self-flow control and 0.05 mm micro-depth accuracy — with an optional ø105 mm blade.",
      "zh-tw": "靈活的剪切刀座,傾角可調、自流量控制、0.05 mm 微調精度,並可選 ø105 mm 刀片。",
    },
    description: {
      en: "The MT-A450 is newly designed for flexible application and higher operating efficiency. Its adjustable cant angle and replaceable bottom make it easy to run in different web directions. New self-flow control prevents blade damage during operation, while a micrometer-style micro-depth adjustment enhances overlap accuracy to 0.05 mm. The standard holder uses a ø90 mm top blade, with a 450L option for a ø105 mm blade. The MT-A450 slits a wide range of materials including plastic, paper and copper foil, for thicknesses under 0.4 mm and slit widths within 53 mm.",
      "zh-tw": "MT-A450 為靈活應用與提升作業效率而全新設計。可調傾角與可更換底座,使其在不同走料方向下都易於操作。全新自流量控制可防止操作中傷刀,微米級微調機構則將重疊量精度提升至 0.05 mm。標準機型採用 ø90 mm 上刀片,並可選配 450L 以搭載 ø105 mm 刀片。MT-A450 可分切塑膠、紙張、銅箔等多種材料,適用厚度 0.4 mm 以下、分切寬度 53 mm 以內的應用。",
    },
  },
  {
    model: "MT-A610",
    tagline: {
      en: "A patented three-cylinder shear holder delivering rock-steady down-force, with self-flow control and 0.05 mm micro-depth adjustment.",
      "zh-tw": "專利三氣缸剪切刀座,提供極穩下壓力,並具自流量控制與 0.05 mm 微調。",
    },
    description: {
      en: "The MT-A610 features a unique patented design with three cylinders and a robust holder body to deliver stable down-force. Its two-stage action — down-stroke and side-stroke — can be driven by individual valves or as continuous movement, keeping operation simple. Built-in self-flow control moderates the holder's descent rate to prevent blade damage from improper operation, while a new micro-depth adjustment enhances overlap control to an accuracy of 0.05 mm. An adjustable cant angle suits a wide range of web directions, making the MT-A610 ideal for diverse shear slitting of paper, plastic film, non-woven fibres and more.",
      "zh-tw": "MT-A610 採用獨特專利設計,以三氣缸與強固刀座機身提供穩定下壓力。下行程與側行程的兩段式動作,可由獨立閥各自控制或連續連動,操作簡便。內建自流量控制可調節刀座下降速度,避免不當操作傷刀;全新微調機構則將重疊控制精度提升至 0.05 mm。可調傾角適應多種走料方向,使 MT-A610 適用於紙張、塑膠膜、不織布纖維等多元剪切分切。",
    },
  },
  {
    model: "MT-A650",
    tagline: {
      en: "A patented three-cylinder shear holder delivering rock-steady down-force, with self-flow control and 0.05 mm micro-depth adjustment.",
      "zh-tw": "專利三氣缸剪切刀座,提供極穩下壓力,並具自流量控制與 0.05 mm 微調。",
    },
    description: {
      en: "The MT-A650 features the same unique patented design as the MT-A610 — three-cylinder robust holder, individual down-stroke and side-stroke valves, self-flow control and precise micro-depth adjustment — to provide easy operation and stable down-force during online slitting. Its modular integrated bottom holder handles cant-angle adjustment for different web-path directions, while a side-contact limit extends blade life and sustains outstanding performance. The MT-A650 is ideally suited to paper, plastic film, non-woven fibres and other converting-industry materials.",
      "zh-tw": "MT-A650 承襲與 MT-A610 相同的獨特專利設計——三氣缸強固刀座、下行程與側行程獨立閥、自流量控制與精密微調——在線上分切時提供輕鬆操作與穩定下壓力。模組整合底座可進行傾角調整以因應不同走料路徑,側靠限位則延長刀片壽命並維持出色表現。MT-A650 特別適用於紙張、塑膠膜、不織布纖維等加工產業材料。",
    },
  },
  {
    model: "MT-A660",
    tagline: {
      en: "A high-rigidity three-cylinder shear holder in high-strength 6061 aluminium, running a 150 mm blade for consistent heavy-duty quality.",
      "zh-tw": "6061 高強度鋁合金三氣缸剪切刀座,搭載 150 mm 刀片,重磅分切品質穩定一致。",
    },
    description: {
      en: "The MT-A660 pneumatic shear-type knife-holder is fitted with two manual valves that can control the down-stroke and side-stroke individually or in linkage. Its patented body, made of high-strength 6061 aluminium alloy, delivers stable down-force through a robust three-cylinder design for a flawless shear cut. The MT-A660 readily handles cant-angle adjustment for different material-path directions, with a reinforced structure that ensures consistent slit quality. With a high-rigidity holder and a 150 mm blade, it is ideally suited to paper, plastic film, non-woven fibres and other converting-industry materials.",
      "zh-tw": "MT-A660 氣動剪切式刀座配備兩組手動閥,可獨立或連動控制下行程與側行程。專利機身採用高強度 6061 鋁合金,透過強固的三氣缸設計提供穩定下壓力,達成完美剪切效果。MT-A660 可輕鬆調整傾角以因應不同走料方向,並以強化結構確保分切品質一致。搭配高剛性刀座與 150 mm 刀片,特別適用於紙張、塑膠膜、不織布纖維等加工產業材料。",
    },
  },
  {
    model: "MT-A850",
    tagline: {
      en: "A robust heavy-duty shear holder whose changeable mounting bracket fits GB or existing guide-bar systems — outstanding flexibility with stable down- and side-force.",
      "zh-tw": "強悍的重磅剪切刀座,可換安裝座相容 GB 及既有導桿系統——彈性出眾,下壓與側靠力穩定。",
    },
    description: {
      en: "The MT-A850 is ideal for heavy-duty applications, with a robust new holder design that ensures stable down-force and side-force. Individual control valves provide two-stage action — down-stroke and side-stroke — in continuous or separate movement. Self-flow control and micro-depth adjustment are key to preventing blade damage and simplifying operation, offering down-stroke overlap control to 0.05 mm. A new cant-angle adjustment and adaptive bottom holder ease operation across different web directions, while a changeable mounting bracket is compatible with the GB guide-bar series or other existing guide-bar systems. With outstanding design flexibility, the MT-A850 serves paper, plastic film, non-woven fibres and more.",
      "zh-tw": "MT-A850 是重磅應用的理想選擇,全新強固刀座設計確保下壓力與側靠力穩定。獨立控制閥提供下行程與側行程兩段式動作,可連續或分開操作。自流量控制與微調機構是防止傷刀與簡化操作的關鍵,下壓重疊控制達 0.05 mm。全新傾角調整與自適應底座,讓不同走料方向的操作更輕鬆;可更換安裝座則相容 GB 導桿系列或其他既有導桿系統。憑藉出色的設計彈性,MT-A850 適用於紙張、塑膠膜、不織布纖維等應用。",
    },
  },
  {
    model: "MT-A880",
    tagline: {
      en: "Our most versatile heavy-duty shear holder — a 200 mm blade handling slitting speeds up to 2000 m/min.",
      "zh-tw": "本廠最百搭的重磅剪切刀座——200 mm 刀片,分切速度高達 2000 m/min。",
    },
    description: {
      en: "The MT-A880 is our versatile heavy-duty knife-holder, suited to a wide range of shear-slitting applications. It combines an extremely durable holder body with a 200 mm top blade to handle slitting speeds up to 2000 m/min. Micro-depth adjustment, an individual stroke valve, self-flow control, cant-angle adjustment, a reversible blade cartridge and a mounting bracket all work together to cut setup time and simplify operation. The MT-A880 delivers highly reliable slitting performance, primarily for thicker, high-speed slitting of paper, plastic film, non-woven fibres and more.",
      "zh-tw": "MT-A880 是本廠百搭的重磅刀座,適用於廣泛的剪切分切應用。結合極耐用的刀座機身與 200 mm 上刀片,可勝任高達 2000 m/min 的分切速度。微調機構、獨立行程閥、自流量控制、傾角調整、可翻面刀匣與安裝座協同運作,大幅縮短設定時間並簡化操作。MT-A880 提供高度可靠的分切表現,主要適用於紙張、塑膠膜、不織布纖維等厚材與高速分切。",
    },
  },
  {
    model: "MT-A310",
    tagline: {
      en: "Our first depth-controlled half-cut holder — cleanly severs the top layer while leaving the liner intact, with ±0.005 mm blade roundness.",
      "zh-tw": "本廠首款深度可控半切刀座——精準切斷上層、保留底層,刀片圓度達 ±0.005 mm。",
    },
    description: {
      en: "The MT-A310 is our first non-cut-through knife-holder to combine depth-stroke control with a precision blade, mastering multi-layer half-cut applications with precision and ease. With 14 mm of depth adjustment and blade roundness of up to ±0.005 mm, it cleanly severs only the upper layer while leaving the lower layer intact — and reduces blade wear for a longer service life. Available in numerous variations to match your application flexibly, it is well suited to medical adhesive tapes, foam tapes and protection film.",
      "zh-tw": "MT-A310 是本廠首款結合深度行程控制與精密刀片的非切穿刀座,能精準且輕鬆地處理多層材料半切應用。具備 14 mm 深度調整與達 ±0.005 mm 的刀片圓度,可俐落切斷上層而保留下層,同時降低刀片磨耗、延長壽命。提供多種規格變化以彈性搭配應用,特別適用於醫療膠帶、泡棉膠帶與保護膜。",
    },
  },
  {
    model: "MT-A310H",
    tagline: {
      en: "The heavy-duty half-cut holder — steadier down-force than the A310 for thicker, tougher medical and foam materials.",
      "zh-tw": "重磅半切刀座——較 A310 更穩的下壓力,勝任更厚、更硬的醫療與泡棉材料。",
    },
    description: {
      en: "The MT-A310H is the ideal half-cut knife-holder for heavier materials. Its robust design guarantees steadier slitting down-force than the MT-A310 across a thicker, more demanding material range. With 14 mm of depth adjustment and blade roundness of up to ±0.005 mm, it severs only the upper layer while leaving the lower layer intact, and reduces blade wear for extended life. The MT-A310H is ideally suited to heavier applications such as medical adhesive tapes, foam tapes and protection film.",
      "zh-tw": "MT-A310H 是面向較重材料的理想半切刀座。強固結構在更厚、更嚴苛的材料範圍中,提供較 MT-A310 更穩定的分切下壓力。具備 14 mm 深度調整與達 ±0.005 mm 刀片圓度,可切斷上層而保留下層,並降低刀片磨耗、延長壽命。特別適用於醫療膠帶、泡棉膠帶與保護膜等較重應用。",
    },
  },
  {
    model: "MT-A710",
    tagline: {
      en: "A hot-cut holder that slits and seals in one pass — heats up in under a minute and cools within minutes for operator safety.",
      "zh-tw": "一次完成分切與封邊的熱切刀座——一分鐘內升溫、數分鐘內降溫,兼顧效率與安全。",
    },
    description: {
      en: "The MT-A710 hot-cut knife-holder uses a pneumatic design to control the down-stroke, paired with a special heated blade that slits and melt-seals the material simultaneously. It offers compact dimensions, rapid heat-up and cool-down, and highly stable slit quality. Unlike conventional heating methods, the MT-A710 reaches working temperature within one minute — greatly reducing warm-up time — and cools back to room temperature within a few minutes to protect operators from accidental burns. It can be paired optionally with the MT-A710C temperature controller, which uses an SSR-driven PID method to regulate working temperature far more precisely and keep slit quality consistent.",
      "zh-tw": "MT-A710 熱切刀座以氣動設計控制下行程,搭配特殊加熱刀片,可同時完成分切與熔融封邊。機身精巧,升降溫迅速,分切品質高度穩定。有別於傳統加熱方式,MT-A710 可在一分鐘內達到工作溫度,大幅縮短暖機時間;並能在數分鐘內冷卻至室溫,避免操作者誤觸刀片受傷。可選配 MT-A710C 溫度控制器,採 SSR 搭配 PID 控制,更精準地調節工作溫度,確保分切品質一致。",
    },
  },
];

/* ─── Main ─────────────────────────────────────────────────── */

const DRY_RUN = process.argv.includes("--dry-run");
const VERIFY_ONLY = process.argv.includes("--verify");

async function main() {
  const payload: Payload = await getPayload({ config });

  console.log("\n═══════════════════════════════════════════════════");
  console.log(`  MODE: ${VERIFY_ONLY ? "VERIFY" : DRY_RUN ? "DRY-RUN" : "APPLY"}`);
  console.log("═══════════════════════════════════════════════════\n");

  // 讀出全部產品(en + zh-tw 各查一次)
  const dbAllEn = await payload.find({
    collection: "products",
    limit: 1000,
    locale: "en",
    depth: 0,
  });
  const dbAllZh = await payload.find({
    collection: "products",
    limit: 1000,
    locale: "zh-tw",
    depth: 0,
  });
  const dbEn = new Map(dbAllEn.docs.map((p) => [p.model, p]));
  const dbZh = new Map(dbAllZh.docs.map((p) => [p.model, p]));

  console.log(`資料庫共有 ${dbAllEn.docs.length} 個產品`);
  console.log(`文案資料共有 ${COPY.length} 個項目\n`);

  const matched: string[] = [];
  const missing: string[] = [];
  for (const entry of COPY) {
    if (dbEn.has(entry.model)) matched.push(entry.model);
    else missing.push(entry.model);
  }

  console.log(`✓ 可對應:${matched.length} 個 → ${matched.join(", ")}`);
  if (missing.length > 0) {
    console.log(`✗ DB 中找不到:${missing.length} 個 → ${missing.join(", ")}`);
  }

  const extras = dbAllEn.docs.map((p) => p.model).filter((m) => !COPY.find((c) => c.model === m));
  if (extras.length > 0) {
    console.log(`ℹ DB 有但本次不覆寫(保留原樣):${extras.length} 個 → ${extras.join(", ")}\n`);
  } else {
    console.log("");
  }

  if (VERIFY_ONLY) {
    console.log("─── 驗證模式:比對 DB 現值 vs 目標值 ───\n");
    let pass = 0;
    let fail = 0;
    const failures: string[] = [];
    for (const entry of COPY) {
      const docEn = dbEn.get(entry.model);
      const docZh = dbZh.get(entry.model);
      if (!docEn || !docZh) {
        failures.push(`${entry.model}: DB 中找不到`);
        fail++;
        continue;
      }
      const enTagOk = docEn.tagline === entry.tagline.en;
      const zhTagOk = docZh.tagline === entry.tagline["zh-tw"];
      const enDescOk = extractText(docEn.description) === entry.description.en;
      const zhDescOk = extractText(docZh.description) === entry.description["zh-tw"];
      const allOk = enTagOk && zhTagOk && enDescOk && zhDescOk;
      if (allOk) {
        pass++;
      } else {
        fail++;
        const issues = [];
        if (!enTagOk) issues.push("tagline.en");
        if (!zhTagOk) issues.push("tagline.zh");
        if (!enDescOk) issues.push("description.en");
        if (!zhDescOk) issues.push("description.zh");
        failures.push(`${entry.model}: ${issues.join(", ")} 不符`);
      }
    }
    console.log(`✓ 通過:${pass} 個`);
    console.log(`✗ 不符:${fail} 個`);
    if (failures.length > 0) {
      console.log("\n細節:");
      failures.forEach((f) => console.log(`  - ${f}`));
    }
    process.exit(fail > 0 ? 1 : 0);
  }

  if (DRY_RUN) {
    console.log("─── DRY-RUN 預覽(不會實際寫入)───\n");
    for (const entry of COPY.slice(0, 2)) {
      console.log(`[${entry.model}]`);
      console.log(`  tagline.en: ${entry.tagline.en.slice(0, 80)}...`);
      console.log(`  tagline.zh: ${entry.tagline["zh-tw"].slice(0, 80)}...\n`);
    }
    console.log(`(略) 共 ${COPY.length} 筆待寫入`);
    process.exit(0);
  }

  console.log("─── 開始寫入 ───\n");
  let updated = 0;
  let errors = 0;
  for (const entry of COPY) {
    const docEn = dbEn.get(entry.model);
    const docZh = dbZh.get(entry.model);
    if (!docEn) {
      console.log(`⚠  跳過 ${entry.model}(DB 中不存在)`);
      continue;
    }
    try {
      // 寫入 en(title 已有值時,只補 tagline + description)
      await payload.update({
        collection: "products",
        id: docEn.id,
        locale: "en",
        data: {
          tagline: entry.tagline.en,
          description: paragraphRichText(entry.description.en) as any,
        },
      });
      // 寫入 zh-tw(若 zh-tw title 為空,用 en title 當佔位以通過 required 驗證)
      const titleZh = (docZh?.title as string | undefined) || (docEn.title as string);
      await payload.update({
        collection: "products",
        id: docEn.id,
        locale: "zh-tw",
        data: {
          title: titleZh,
          tagline: entry.tagline["zh-tw"],
          description: paragraphRichText(entry.description["zh-tw"]) as any,
        },
      });
      console.log(`✓ ${entry.model}`);
      updated++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`✗ ${entry.model}: ${msg}`);
      errors++;
    }
  }

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  完成:更新 ${updated} 個,錯誤 ${errors} 個`);
  console.log(`═══════════════════════════════════════════════════\n`);
  process.exit(errors > 0 ? 1 : 0);
}

/** 把 Payload richText 展開回純文字(段落內容),用於驗證比對 */
function extractText(rt: any): string {
  if (!rt || typeof rt !== "object") return "";
  const root = rt.root;
  if (!root || !Array.isArray(root.children)) return "";
  const parts: string[] = [];
  for (const p of root.children) {
    if (p?.type === "paragraph" && Array.isArray(p.children)) {
      for (const c of p.children) {
        if (c?.type === "text" && typeof c.text === "string") parts.push(c.text);
      }
    }
  }
  return parts.join("");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
