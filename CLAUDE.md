# MOTOKNIFE 新網站 — Claude Code 工作指引

> 專案：motoknife-nextjs
> 公司：友聚工業股份有限公司（MOTOKNIFE）
> 目標：取代現有 motoknife.com，打造符合國際 B2B 標準的新官方網站

---

## 技術架構

| 層級 | 技術 | 說明 |
|------|------|------|
| 前端框架 | Next.js 16 (App Router, Turbopack) | /app 目錄結構，SSG + ISR（revalidate 3600） |
| CMS | Payload CMS 3.85 | admin 掛載於 app/(payload)，前台經 lib/cms.ts Local API 查詢 |
| 資料庫 | PostgreSQL 16 | 開發用 dev push mode；上線前需切換 migrations |
| 樣式 | Tailwind CSS 4 + TypeScript | 設計 token 於 app/globals.css @theme |
| 動效 | GSAP + @gsap/react | useGSAP hook，SSG 相容 + prefers-reduced-motion 防護 |
| 部署 | DigitalOcean + Cloudflare | build 階段需可連線資料庫 |
| 語言 | TypeScript（嚴格模式） | |

---

## 專案文件索引

進行任何開發前，必須先閱讀以下文件：

- `docs/PLANNING.md` — **權威規劃文件**（6 頁架構、第六章產業分類與型號家族矩陣、競爭者研究），與本檔衝突時以 PLANNING.md 為準
- `docs/competitor-research.md` — 13 間競爭對手第一手分析（UI/UX 決策依據）
- `README.md` — 啟動步驟、環境變數、seed 指令

---

## 頁面路由架構（現況）

所有前台頁面位於 `/[lang]/` 前綴下（en / zh-tw），無前綴路徑由 proxy.ts 308 轉址至 /en。

```
/[lang]/                          首頁（Hero + Why MOTOKNIFE + 產品/應用入口 + 地圖預覽 + CTA）
/[lang]/products                  產品總覽（切割方式篩選器 + 比較功能 + 全目錄 PDF）
  /products/[series]              系列頁（score-cut / shear-cut / half-cut / hot-cut / knives / guide-bar）
  /products/cutting-methods       切法說明（含各切法產品連結）
  /products/model/[slug]          型號詳情（Tab：Overview | Specs | 3D View | Drawings，URL hash 同步）
/[lang]/applications              應用場景（含互動選型器）
  /applications/[slug]            9 分類（CMS 驅動，PLANNING.md 第六章）
/[lang]/solutions/[slug]          SEO 長尾頁（10 個材料×切法組合，無導覽入口、靠內鏈導流）
/[lang]/services                  服務（Test & Report 旗艦 + 研磨/維修/諮詢）
/[lang]/distributors              全球代理（互動地圖：有代理商顯示資訊/無則詢價表單）
/[lang]/about                     關於（時間軸 + 設備 + 專利 + 認證）
/[lang]/contact                   智慧詢價表單（國家判斷代理商、選型器參數帶入、WhatsApp）
/[lang]/news                      消息列表
  /news/[slug]                    文章詳情（richText + 側邊目錄 + Article JSON-LD）
/admin                            Payload 後台
/api/*                            Payload REST + /api/contact + /api/model/[id]（GLB 代理）
```

---

## 元件清單（components/）

### 全站
Navbar（產品下拉）、Footer（雙辦公室 + 代理商連結 + WhatsApp）、FloatingCTA（WhatsApp + 詢價）、CTAButton、PageShell、WhyMotoknife、WhatsAppIcon、gsap/Reveal

### 產品
ProductCatalog（篩選 + 比較勾選）、ProductCompare（浮動列 + 對比彈窗）、ProductSeriesPage、ProductTabs（hash 同步）、ProductGallery（主圖 + 縮圖切換）、FeatureHighlights（交錯圖文）、ModelViewer（3D GLB，經 API 代理防下載）、DrawingViewer（工程圖：縮放/平移/pinch/浮水印）、PdfDownloadButton + pdf/ProductPdfDocument（動態規格 PDF）、ProductJsonLd

### 應用 / 其他
ApplicationSelector（選型器）、ApplicationPage、DistributorsMap（react-simple-maps + 手機下拉）、ContactForm、BrandTimeline、LexicalContent（richText 渲染 + 目錄錨點）、seo/BreadcrumbJsonLd、seo/FaqSection

### 資料層
- `lib/cms.ts` — 前台唯一 CMS 查詢入口（React cache）
- `lib/data/*` — seed 來源（前台不 import；例外：solutions.ts 為純 SEO 靜態內容）
- `lib/series.ts`、`lib/about.ts`、`lib/iso-numeric.ts`、`lib/whatsapp.ts` — UI 設定檔
- `lib/payload-types.ts` — 自動生成（`npm run generate:types`），勿手改

---

## UI/UX 設計規範

### 競品研究核心結論（來自 docs/competitor-research.md）
- **最佳視覺參考：** Helios Slitting（全黑 Hero + 3D 渲染 + 浮動 CTA）
- **最佳架構參考：** Mario Cotta（應用場景 9 類 + 產品 Tab 分類）
- **最佳服務參考：** DIENES（切法說明頁 + 服務生態系統）

### 導覽列（現況）
```
[LOGO]  Products▾  Applications  Services  Distributors  About  [EN|繁中]  [Get a Quote 橙色按鈕]
```
- Products 桌面 hover 下拉（6 系列 + Cutting Methods）；行動版手風琴
- 固定橙色「Get a Quote」CTA、sticky header

### 品牌色彩（現行 token，app/globals.css）
| 用途 | 色碼 | token |
|------|------|-------|
| CTA / 強調色 | #F47920 | orange（hover #D9640C、soft #FEF1E6） |
| Hero 背景 | #0D0D14 | hero-black |
| 主要深色 | #1A1A2E | navy（dark #12121F、light #24243C） |
| 文字主色 | #1A1A1A | text-primary（secondary #64748B） |
| WhatsApp | #25D366 | 僅 WhatsApp 按鈕 |

### 詢價 CTA 規範（最高優先）
每個頁面都必須包含至少一個詢價 CTA：
1. **導覽列固定按鈕**：橙色「Get a Quote」，每頁可見
2. **浮動按鈕**：右下角 WhatsApp + 「Find the Right Solution」
3. **產品/應用/solutions 頁**：側欄詢價卡（帶型號/材料 query 參數進智慧表單）

---

## 產品資訊規範

### 產品分類對應（/[lang]/products/[series]）
| series | 中文名 | 說明 |
|--------|--------|------|
| score-cut | 壓切刀座 | A110/A130/A160/B110/C121（輕中型）＋ A140/A170/A510（重磅型） |
| shear-cut | 剪切刀座 | A410/A450（精密）＋ A650/A850/A880（通用） |
| half-cut | 半切刀座 | A310/A310H（醫療） |
| hot-cut | 熱切刀座 | A710（< 13mm 窄幅） |
| knives | 刀片系列 | Slitting Knives & Score Blades |
| guide-bar | 導桿 | Guide Bars |

### 型號頁必備（已實作於 Tab 架構）
產品圖庫（多角度）、規格表 + 核心數字視覺化、3D 檢視（防下載）、工程圖（浮水印）、Feature Highlights、適用材料與相關應用連結、詢價側欄、相關型號、規格單 PDF 下載、Related Solutions 內鏈

### 規格標示原則（PLANNING.md 第六章）
雙值標示：standard 為保守值、max/condition 為極限值 + 條件註記，避免保守值被拿去比對手極限值

---

## 應用場景規範

- 9 大分類由 **CMS Applications collection** 驅動（categoryNumber 1–9，對應 PLANNING.md 第六章矩陣）
- 每分類敘事（DIENES 框架）：痛點 → 切割方式選擇邏輯 → 對應 MT 型號
- 選型器資料存於 Applications.selectorRules（材料 → 厚度 → 推薦型號）
- 每頁含 Related Solutions 內鏈區塊

---

## 多語系規範

- Next.js i18n routing（`/[lang]/` 前綴），proxy.ts 處理轉址
- 支援語言：`en`（預設）、`zh-tw`（**de 已移除**）
- 介面字串：`/messages/[lang].json`（Dictionary 型別由 en.json 推導，兩檔結構強制一致）
- CMS 內容：Payload localization（zh-tw 目前為英文佔位，待 Phase 2 翻譯後由後台覆蓋）

---

## 開發狀態（2026-07-07）

### 已完成
- ✅ 全站 120 頁 SSG + ISR（雙語系）：6 頁主架構 + News + Services + 10 個 Solutions
- ✅ Payload CMS 整合（admin / seed / Local API）＋ 6 collections + Faqs
- ✅ 互動功能：選型器、代理商地圖、產品比較、3D/工程圖檢視器、動態 PDF
- ✅ SEO：hreflang/canonical、5 種 JSON-LD、FAQ、twitter card、sitemap、內鏈網絡
- ✅ GSAP 動效、手機體驗優化、WhatsApp 整合

### 待辦（依優先序）
1. **部署**：DigitalOcean + Cloudflare、dev push → **Payload migrations**、舊站 301 轉址
2. **內容**：zh-tw 翻譯（Phase 2）、GM 校正（規格表/選型厚度/時間軸年份/專利號）
3. **素材**：產品照片/3D GLB/工程圖/工廠照上傳（Phase 3，Higgsfield 渲染）
4. **上線後**：Lighthouse 驗證（目標 P>90/SEO>95/A11y>90）、Search Console sitemap 提交

---

## 程式碼規範

- TypeScript 嚴格模式，禁止使用 `any`；CMS 型別一律用 `lib/payload-types.ts`
- 元件放 `/components/`、頁面放 `/app/[lang]/`、API 放 `/app/api/`
- 前台資料一律經 `lib/cms.ts` 查詢；`lib/data/*` 僅供 seed
- 介面文字透過 i18n 管理，不 hardcode 中文；產品文案採 slittec 三段式（技術特點 → 解決問題 → 適用材料）
- 修改 `collections/*` 後必跑 `npm run generate:types`；**注意 dev push 對破壞性 schema 變更可能清空資料，改完 collection 後檢查資料量，必要時 `npm run seed`**

---

## 版本記錄

| 版本 | 日期 | 更新內容 |
|-----|------|---------|
| v1.0 | 2026-03-25 | 初始建立，整合競品研究與網站架構規劃 |
| v1.1 | 2026-07-07 | Payload CMS 完整整合：admin 掛載（app/(payload)）、seed script（npm run seed）、前台改接 Local API + ISR（revalidate 3600）；Applications 改為 docs/PLANNING.md 第六章 9 分類（路由以 PLANNING.md 為準）；新增 Faqs collection；README 重寫 |
| v1.2 | 2026-07-07 | 任務 18-20 + 手機優化 + 圖庫 + Feature Highlights：3D/工程圖檢視器、產品頁 Tab UI、Services 頁（Test & Report）、Why MOTOKNIFE 信任區塊、WhatsApp 整合、手機體驗優化（pinch zoom / tabs 滾動 / 地圖下拉 / next/image）、SEO 深度優化（10 個 Solutions 長尾頁 + 內部連結網絡 + twitter card + images.formats）、產品圖庫（主圖 + 縮圖切換）、Feature Highlights 圖文敘事區塊 |
