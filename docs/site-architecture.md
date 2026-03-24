# MOTOKNIFE 新網站架構規劃

> 版本：v1.0 ｜ 建立日期：2026-03-25
> 依據：競爭對手研究（docs/competitor-research.md）

---

## 頁面路由架構

```
/                           首頁
/products/                  產品總覽
  /products/score-cut/      Score Cut 系列（壓切刀座）
  /products/shear-cut/      Shear Cut 系列（剪切刀座）
  /products/half-cut/       Half Cut 系列
  /products/hot-cut/        Hot Cut 系列（熱切）
  /products/knives/         刀片系列
  /products/guide-bar/      導桿系列
/applications/              應用場景（按材料分類）
  /applications/plastic-film/     塑膠薄膜
  /applications/metallic-foil/    金屬箔膜（鋁箔、銅箔）
  /applications/rubber/           橡膠
  /applications/paper/            紙類
  /applications/nonwoven/         不織布
/cutting-methods/           切法說明
/services/                  服務
/about/                     關於友聚
/contact/                   聯絡與詢價
/[lang]/                    多語系（en / zh-tw / de）
```

---

## 各頁面設計規格

### 首頁 `/`
**設計參考：** Helios Slitting（視覺）+ Mario Cotta（架構）

**區塊順序：**
1. **Hero 區塊**
   - 全黑或深色背景
   - 高精度刀座產品圖（3D 渲染或專業實拍）
   - 主標語（待定，建議方向：「Precision Slitting Solutions」或「Your Partner in Precision Cutting」）
   - 副標：強調 ±0.005mm 精度 + 台灣製造
   - 兩個 Hero CTA：「探索產品」+ 「立即詢價」

2. **浮動 CTA**（固定在右下角）
   - 文字：「Find the Right Solution」
   - 顏色：橙色（#E07830）或黃色
   - 行為：點擊後展開材料選擇工具或跳至 /contact

3. **產品分類入口**（Hero 下方 Tab 列）
   - Score Cut / Shear Cut / Half Cut / Hot Cut / Knives / Guide-Bar

4. **應用場景區塊**
   - 參考 Mario Cotta「your industry」設計
   - 6 大材料圖示：塑膠薄膜 / 金屬箔膜 / 橡膠 / 紙類 / 不織布 / 其他

5. **品牌訴求區塊**
   - 核心數字：±0.005mm 精度 / X 年製造經驗 / X 個國家客戶
   - 參考 Slittec 的 8 大優勢呈現方式

6. **精選產品**
   - 展示 4-6 個主力產品

7. **聯絡/詢價 CTA 區塊**
   - 頁面底部大型 CTA
   - 嵌入簡易詢價表單或跳至 /contact

---

### 產品頁 `/products/[category]/[product]`
**設計參考：** DIENES（規格呈現）+ Intertech（PDF 下載）

**頁面元素：**
- 產品大圖（多角度）
- 技術規格表（材質 / 壓力範圍 / 精度 / 尺寸）
- 適用材料說明
- 適用切法說明
- 相關配件
- 詢價表單（嵌入側欄，參考 Double E Group 設計）
- PDF 規格書下載

---

### 應用場景頁 `/applications/[material]`
**設計參考：** Mario Cotta「your industry」

**頁面元素：**
- 材料說明（特性、常見應用）
- 推薦刀具/刀座列表（含連結）
- 客戶案例（如有）
- 技術建議（切法選擇）
- 詢價 CTA

---

### 切法說明頁 `/cutting-methods`
**設計參考：** Helios Slitting（ScoreCut/ShearCut/RazorCut）+ Dienes USA（4種切法）

**說明內容：**
- **Score Cut（壓切）**：原理 / 適用材料 / 優缺點 / 推薦產品
- **Shear Cut（剪切）**：原理 / 適用材料 / 優缺點 / 推薦產品
- **Half Cut（半切）**：原理 / 適用材料 / 優缺點 / 推薦產品
- **Hot Cut（熱切）**：原理 / 適用材料 / 優缺點 / 推薦產品

---

### 服務頁 `/services`
**設計參考：** DIENES（Slitting Academy）+ Dienes USA（Try-A-Product）

**服務項目：**
- 免費樣品測試
- 技術諮詢（遠端 / 到廠）
- 刀具研磨服務
- 客製化設計

---

### 關於友聚 `/about`
**設計參考：** Mario Cotta（百年品牌故事）+ Slittec（企業優勢）

**內容：**
- 公司成立年份與歷史
- 製造能力（MAZAK CNC 設備）
- 精度承諾（±0.005mm）
- 全球客戶地圖（德國 / 馬來西亞 / 印度…）
- 品質認證（如有）

---

### 聯絡與詢價 `/contact`
**設計參考：** Double E Group（嵌入式三選一表單）

**表單設計：**
- 需求選擇：更多資訊 / 索取報價 / 訂購產品
- 欄位：姓名 / 公司 / Email / 電話 / 國家 / 產品需求 / 訊息
- 右側：公司聯絡資訊 + 地圖

---

## 導覽列設計規格

```
[LOGO]  Products  Applications  Cutting Methods  Services  About  [語言切換]  [詢價 CTA 橙色按鈕]
```

- CTA 按鈕：橙色背景 / 白色文字 / 「Get a Quote」
- 語言切換：EN / 繁中 / DE（未來擴充）
- 固定在頁面頂部（sticky header）

---

## 品牌設計方向（待確認）

| 項目 | 建議方向 | 參考 |
|------|---------|------|
| 主色 | 深藍 #1c2b3a 或 深灰 | Mario Cotta / DIENES |
| 強調色 | 橙色 #E07830 | Mario Cotta / Intertech |
| Hero 背景 | 全黑 #111111 | Helios Slitting |
| 字型 | 待定 | — |
| 主標語 | 待定 | — |

---

## 多語系規劃

| 語言 | 路由 | 優先度 |
|------|------|--------|
| 英文 | `/en/` 或預設 | 🔴 第一優先 |
| 繁體中文 | `/zh-tw/` | 🟠 第二 |
| 德文 | `/de/` | 🟡 第三（歐洲市場） |

---

## 版本記錄

| 版本 | 日期 | 更新內容 |
|-----|------|---------|
| v1.0 | 2026-03-25 | 初始建立，基於競品研究確立頁面架構 |
