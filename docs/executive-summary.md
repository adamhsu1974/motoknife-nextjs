# MOTOKNIFE 網站重建計畫 — 執行摘要

> 版本：v1.0 ｜ 建立日期：2026-03-26
> 本文件整合前三階段所有研究成果，供執行參考

---

## 一、競爭者分析重點（第一階段精華）

### 13 間競品的關鍵發現

**技術分佈：**
- 8 間（61%）用 WordPress — 是現在最普遍但非最好的選擇
- 1 間 HubSpot（TKM，月費 $400+）
- 1 間 Wix（Slittec，SEO 極弱）
- 1 間 Shopify（Baucor，電商定位）
- 2 間自訂 PHP（Double E + 現有 MOTOKNIFE）

**MOTOKNIFE 現況 vs 競品最大落差：**

| 項目 | 競品平均 | MOTOKNIFE 現況 |
|------|---------|--------------|
| 詢價 CTA 按鈕 | 12/13 間都有 | ❌ 完全沒有 |
| 品牌 Hero 主標語 | 全部都有 | ❌ 只有分類圖示 |
| 切法說明頁 | 多數都有 | ❌ 沒有 |
| 應用材料分類 | Mario Cotta 9 類 | ❌ 沒有 |
| 精度數字顯眼展示 | TKM 大字展示 | ⚠️ 藏在產品頁 |

**三大最佳參考對象：**
- **Helios Slitting**（義大利）→ 視覺設計：全黑 Hero + 3D 渲染 + 浮動 CTA
- **Mario Cotta**（義大利）→ 內容架構：9 大行業應用場景分類
- **DIENES**（德國）→ 服務生態：切法說明 + Slitting Academy

---

## 二、UI/UX 設計方向重點（第二階段精華）

### 設計定位
工業風 + 高端感（歐洲品牌基調）、簡潔不花俏

### 色彩系統
```
主色    #1a2b3c   深海藍（導覽列、深色區塊）
強調色  #E07830   橙色（所有 CTA 按鈕）
Hero    #0d0d0d   全黑（首頁 Hero 背景）
白底    #ffffff   主要內容區
暖灰    #f8f8f6   交替區塊背景
```

### 字型
- 英文標題：DM Sans Bold / Barlow Condensed
- 中文：Noto Sans TC

### 首頁 9 大區塊（由上而下）
1. **導覽列**：深藍底，固定橙色「Get a Quote」CTA
2. **Hero**：全黑背景 + 產品 3D 圖 + ±0.005mm 精度大字 + 雙 CTA
3. **數字訴求**：±0.005mm / 30+年 / 5 國 / 100+ 產品
4. **產品分類入口**：6 系列卡片（Score/Shear/Half/Hot/Knives/Guide-bar）
5. **應用場景**：深藍底，5 大材料圖示
6. **切法說明**：Tab 切換（Score/Shear/Half/Hot）
7. **品牌故事**：工廠實拍 + MAZAK CNC 製造能力
8. **全球代理商**：世界地圖（智利/俄羅斯/印度/德國/荷蘭）
9. **橙色大 CTA 區塊** + Footer

### CTA 三層架構
```
第一層：Header 固定「Get a Quote」橙色按鈕（每頁都看得到）
第二層：右下角浮動「Find the Right Solution」按鈕
第三層：產品頁嵌入式三選一表單
         ○ More Information
         ○ Request a Quote
         ○ Order Product
```

### 多語系
`/en/`（主）、`/zh-tw/`、`/de/`（歐洲市場）

---

## 三、技術架構重點（第三階段精華）

### 推薦方案：Next.js 15 + Payload CMS 3.0

**為什麼選這個：**
- 你的報價系統已用 React，技術延續性最高
- 效能領先 13 間競爭對手（全用 WordPress）
- 資料完全自主，不依賴第三方
- 月費最低固定（$17–29 USD）

### 完整技術棧

```
前端框架    Next.js 15（App Router + React）
後台 CMS    Payload CMS 3.0（自架，開源免費）
資料庫      PostgreSQL
主機        DigitalOcean Droplet（$12–24/月）
CDN         Cloudflare（免費層）
圖片/PDF    DigitalOcean Spaces（$5/月）
Email       Resend（$0，100封/天）
多語系      next-intl 套件
部署        GitHub Actions → DigitalOcean
```

### 月費總計：$17–29 USD（約 NT$550–930/月）

### 後台可管理的內容
- ✅ 新增/修改/刪除產品（含多語系）
- ✅ 上傳產品圖片、PDF 型錄
- ✅ 管理應用場景頁
- ✅ 查看詢價記錄
- ✅ 管理媒體圖庫

---

## 四、開發優先順序

### Phase 1（第 1–3 週）✅ 最優先
1. 導覽列（含固定橙色 CTA）
2. 首頁 Hero 區塊
3. 首頁產品分類入口
4. 聯絡/詢價頁（嵌入式三選一表單）

### Phase 2（第 4–5 週）
5. 產品總覽頁
6. 各產品系列頁（含規格表 + PDF 下載）
7. 切法說明頁

### Phase 3（第 6–7 週）
8. 應用場景頁（各材料類別）
9. 關於友聚頁
10. 服務頁

### Phase 4（第 8 週）
11. 多語系完整實作（DE）
12. SEO 優化（Sitemap / JSON-LD）
13. DigitalOcean 正式部署
14. Cloudflare DNS 設定
15. 舊網站 301 轉址

---

## 五、啟動 Claude Code 指令

在 MacBook Terminal 執行：

```bash
cd ~/Documents/motoknife-nextjs
claude
```

然後輸入：

```
請依序閱讀以下文件：
1. CLAUDE.md
2. docs/competitor-research.md
3. docs/ux-design-direction.md
4. docs/technical-architecture.md

閱讀完成後，開始 Phase 1 第一項：
建立 Navbar 導覽列元件，需包含：
- MOTOKNIFE Logo（左側）
- 主選單：Products / Applications / Cutting Methods / Services / About
- 語言切換：EN / 繁中 / DE
- 橙色「Get a Quote」CTA 按鈕（右側）
- Sticky header（捲動固定）
- 行動版漢堡選單
技術規格請參考 CLAUDE.md 的色彩系統與元件規範。
```

---

## 六、GitHub 文件庫索引

| 文件 | 用途 | 行數 |
|------|------|------|
| `CLAUDE.md` | Claude Code 工作指引 | 183 行 |
| `docs/competitor-research.md` | 13 間競品第一手分析 | 407 行 |
| `docs/site-architecture.md` | 頁面架構與設計規格 | 180 行 |
| `docs/ux-design-direction.md` | UI/UX 設計方向 | 505 行 |
| `docs/technical-architecture.md` | 技術架構規劃 | 460 行 |
| `docs/executive-summary.md` | **本文件：執行摘要** | — |

---

## 版本記錄

| 版本 | 日期 | 更新內容 |
|-----|------|---------|
| v1.0 | 2026-03-26 | 整合前三階段成果 |
