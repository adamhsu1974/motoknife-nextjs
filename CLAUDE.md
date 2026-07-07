# MOTOKNIFE 新網站 — Claude Code 工作指引

> 專案：motoknife-nextjs
> 公司：友聚工業股份有限公司（MOTOKNIFE）
> 目標：取代現有 motoknife.com，打造符合國際 B2B 標準的新官方網站

---

## 技術架構

| 層級 | 技術 | 說明 |
|------|------|------|
| 前端框架 | Next.js 15 (App Router) | 使用 /app 目錄結構 |
| CMS | Payload CMS 3.0 | 後台內容管理 |
| 資料庫 | PostgreSQL | 生產環境 |
| 樣式 | Tailwind CSS + TypeScript | |
| 部署 | DigitalOcean + Cloudflare | |
| 語言 | TypeScript（嚴格模式） | |

---

## 專案文件索引

進行任何開發前，必須先閱讀以下文件：

- `docs/competitor-research.md` — 13 間競爭對手第一手分析（UI/UX 決策依據）
- `docs/site-architecture.md` — 頁面架構與各頁設計規格

---

## 頁面路由架構

```
/                           首頁
/products/                  產品總覽
  /products/score-cut/      Score Cut 系列
  /products/shear-cut/      Shear Cut 系列
  /products/half-cut/       Half Cut 系列
  /products/hot-cut/        Hot Cut 系列
  /products/knives/         刀片系列
  /products/guide-bar/      導桿系列
/applications/              應用場景（按材料分類）
  /applications/plastic-film/
  /applications/metallic-foil/
  /applications/rubber/
  /applications/paper/
  /applications/nonwoven/
/cutting-methods/           切法說明（Score/Shear/Half/Hot）
/services/                  服務
/about/                     關於友聚
/contact/                   聯絡與詢價
/[lang]/                    多語系（en / zh-tw / de）
```

---

## UI/UX 設計規範

### 競品研究核心結論（來自 docs/competitor-research.md）
- **最佳視覺參考：** Helios Slitting（全黑 Hero + 3D 渲染 + 浮動 CTA）
- **最佳架構參考：** Mario Cotta（應用場景 9 類 + 產品 Tab 分類）
- **最佳服務參考：** DIENES（切法說明頁 + 服務生態系統）

### 導覽列
```
[LOGO]  Products  Applications  Cutting Methods  Services  About  [EN|繁中|DE]  [Get a Quote 橙色按鈕]
```
- 必須有固定橙色「Get a Quote」CTA 按鈕（參考 Intertech Precision）
- sticky header，捲動後維持顯示

### Hero 區塊（首頁）
- 深色/黑色背景
- 產品高品質大圖（3D 渲染或專業實拍）
- 主標語 + 精度訴求（±0.005mm）
- 兩個 CTA 按鈕：「Explore Products」+「Get a Quote」
- 右下角浮動按鈕（參考 Helios Slitting 的「Find the Right Tool」）

### 品牌色彩
| 用途 | 色碼 | 說明 |
|------|------|------|
| CTA 按鈕 / 強調色 | #E07830 | 橙色，所有 CTA 按鈕統一使用 |
| Hero 背景 | #111111 | 全黑，首頁 Hero 區塊 |
| 主要深色 | #1c2b3a | 導覽列、深色區塊 |
| 文字主色 | #1a1a1a | 內文 |

### 詢價 CTA 規範（最高優先）
每個頁面都必須包含至少一個詢價 CTA，形式如下：
1. **導覽列固定按鈕**：橙色「Get a Quote」，每頁可見
2. **浮動按鈕**：右下角固定，「Find the Right Solution」
3. **產品頁嵌入表單**：參考 Double E Group 設計，三種需求類型可選

---

## 產品資訊規範

### 產品分類對應
| 路由 | 中文名 | 說明 |
|------|--------|------|
| /products/score-cut | 壓切刀座 | Score Cut Knife Holders |
| /products/shear-cut | 剪切刀座 | Shear Cut Knife Holders |
| /products/half-cut | 半切刀座 | Half Cut Knife Holders |
| /products/hot-cut | 熱切刀座 | Hot Cut Knife Holders |
| /products/knives | 刀片系列 | Slitting Knives & Score Blades |
| /products/guide-bar | 導桿 | Guide Bars |

### 每個產品頁必須包含
- 產品圖片（多角度）
- 技術規格表（材質 / 壓力 / 精度 / 尺寸）
- 適用材料列表
- 詢價側欄表單
- 相關產品推薦

---

## 應用場景規範

參考 Mario Cotta「your industry」設計，每個材料類別頁面需包含：
- 材料特性說明
- 推薦刀具清單（含連結）
- 建議切法
- 詢價 CTA

### 材料分類對應
| 路由 | 材料 | 主要產品 |
|------|------|---------|
| /applications/plastic-film | 塑膠薄膜 | Score Cut / Shear Cut |
| /applications/metallic-foil | 金屬箔膜（鋁箔/銅箔）| Shear Cut |
| /applications/rubber | 橡膠 | Score Cut |
| /applications/paper | 紙類 | Score Cut / Shear Cut |
| /applications/nonwoven | 不織布 | Score Cut |

---

## 多語系規範

- 使用 Next.js 15 的 i18n routing（`/[lang]/` 前綴）
- 預設語言：英文（`en`）
- 支援語言：`en`、`zh-tw`、`de`
- 翻譯文件放在 `/messages/[lang].json`

---

## 開發優先順序

### Phase 1（最優先）
1. 導覽列（含固定橙色 CTA 按鈕）
2. 首頁 Hero 區塊
3. 首頁產品分類入口
4. 聯絡/詢價頁（含嵌入式表單）

### Phase 2
5. 產品總覽頁
6. 各產品系列頁（含規格表）
7. 切法說明頁

### Phase 3
8. 應用場景頁（各材料類別）
9. 關於友聚頁
10. 服務頁

### Phase 4
11. 多語系完整實作
12. SEO 優化
13. 效能優化

---

## 程式碼規範

- TypeScript 嚴格模式，禁止使用 `any`
- 元件放在 `/components/` 目錄
- 頁面放在 `/app/` 目錄（App Router）
- 共用型別定義放在 `/lib/types.ts`
- API routes 放在 `/app/api/`
- 所有文字內容透過 i18n 管理，不 hardcode 中文

---

## 版本記錄

| 版本 | 日期 | 更新內容 |
|-----|------|---------|
| v1.0 | 2026-03-25 | 初始建立，整合競品研究與網站架構規劃 |
| v1.1 | 2026-07-07 | Payload CMS 完整整合：admin 掛載（app/(payload)）、seed script（npm run seed）、前台改接 Local API + ISR（revalidate 3600）；Applications 改為 docs/PLANNING.md 第六章 9 分類（路由以 PLANNING.md 為準）；新增 Faqs collection；README 重寫 |
