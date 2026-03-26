# MOTOKNIFE 第三階段 — 技術架構規劃

> 版本：v1.0 ｜ 建立日期：2026-03-26
> 依據：UX 設計方向（docs/ux-design-direction.md）+ 現有技術環境分析

---

## 一、現有技術環境盤點

在選擇架構前，先確認你現有的技術資產：

| 系統 | 技術 | 位置 | 狀態 |
|------|------|------|------|
| 官網 motoknife.com | 自訂 PHP（lazyweb 框架） | 元貞資訊虛擬主機（板橋） | 待替換 |
| 報價系統 :9447 | React + Ant Design + Vite + Node.js | Synology DS720+ | 運作中 |
| MES/ERP 系統 | PHP + MariaDB | Synology DS720+ | 運作中 |
| 開發工具 | Claude Code + Git + GitHub | MacBook Pro / Windows PC / Mac Mini M4 | 已建立 |

**關鍵洞察：** 你已有 React 前端開發基礎（報價系統），Next.js 是 React 的超集，技術遷移成本最低。

---

## 二、方案比較（4 大選項）

---

### 方案 A：WordPress + WPML（傳統方案）

**架構：**
```
WordPress（PHP）
├── 後台：wp-admin（內建）
├── 多語系：WPML 外掛（付費）
├── SEO：Yoast SEO 外掛
├── 表單：Contact Form 7 / Gravity Forms
├── 頁面編輯：Elementor
└── 主機：共享虛擬主機 或 VPS
```

| 面向 | 評估 |
|------|------|
| 後台易用性 | ⭐⭐⭐⭐⭐ 最直觀，行銷人員可自行操作 |
| 開發速度 | ⭐⭐⭐⭐ 快，大量現成主題外掛 |
| SEO | ⭐⭐⭐⭐ 良好，Yoast 輔助 |
| 效能 | ⭐⭐⭐ 需額外快取外掛才達到可接受速度 |
| 客製彈性 | ⭐⭐⭐ 中等，複雜需求需自行開發 |
| 安全性 | ⭐⭐⭐ 需持續更新，外掛漏洞風險 |
| 長期維護 | ⭐⭐⭐ 外掛版本衝突是常見痛點 |
| 月費 | 主機 $5–30 USD + WPML $99/年 |

**優點：** 業界最多開發者、文件豐富、後台所見即所得
**缺點：** 效能天花板低、外掛衝突、技術債累積快
**適合：** 預算有限、需快速上線、無工程師長期維護

---

### 方案 B：Headless CMS + 靜態網站生成（現代方案）

**架構：**
```
Contentful / Sanity（雲端 Headless CMS）
├── 後台：雲端 CMS 管理介面
└── 前端：Next.js 15（靜態生成 SSG）
    ├── 主機：Vercel / Netlify
    └── API：CMS 提供 REST / GraphQL
```

| 面向 | 評估 |
|------|------|
| 效能 | ⭐⭐⭐⭐⭐ 靜態 CDN，全球極快 |
| SEO | ⭐⭐⭐⭐⭐ 最佳 |
| 後台易用性 | ⭐⭐⭐⭐ 雲端 CMS 介面清晰 |
| 客製彈性 | ⭐⭐⭐⭐⭐ 前端完全自由 |
| 月費 | CMS $0–$99 USD + Vercel $0–$20 USD |
| 資料控制 | ⭐⭐⭐ 資料在第三方雲端 |
| 長期維護 | ⭐⭐⭐⭐ 前後端分離，各自更新 |

**優點：** 效能最佳、開發體驗好、無伺服器維護
**缺點：** 資料在第三方平台、CMS 費用累積、需工程師建置
**適合：** 重視效能與 SEO、有工程師資源

---

### 方案 C：Next.js 15 + Payload CMS 3.0（推薦方案）⭐

**架構：**
```
Next.js 15（App Router + React）
├── 前端：SSG / ISR / SSR 混合渲染
├── API：Next.js API Routes（內建）
├── 後台：Payload CMS 3.0（自架）
├── 資料庫：PostgreSQL
├── 主機：DigitalOcean Droplet（$12–24/月）
├── CDN：Cloudflare（免費層）
├── Email：Resend / SendGrid（詢價表單）
└── 儲存：DigitalOcean Spaces（圖片/PDF）
```

| 面向 | 評估 |
|------|------|
| 效能 | ⭐⭐⭐⭐⭐ SSG 靜態生成，0.6 秒載入 |
| SEO | ⭐⭐⭐⭐⭐ 伺服器端渲染，完整索引 |
| 後台易用性 | ⭐⭐⭐⭐ Payload CMS 後台清晰，行銷人員可操作 |
| 客製彈性 | ⭐⭐⭐⭐⭐ 完全自主，無外掛限制 |
| 資料控制 | ⭐⭐⭐⭐⭐ 資料在自己伺服器 |
| 月費 | $12–24 USD，固定可預測 |
| 授權費 | $0（Next.js + Payload 均開源免費）|
| 長期維護 | ⭐⭐⭐⭐ TypeScript 嚴格型別，好維護 |
| 擴充性 | ⭐⭐⭐⭐⭐ 未來可加會員、API 整合 |

**優點：**
- 效能領先所有競爭對手
- 資料完全在自己手中
- 前後台整合在同一專案
- 月費固定最低
- 與現有報價系統同技術棧（React）

**缺點：**
- 初始建置時間較長（比 WordPress 多 2–3 倍）
- 需要熟悉 React / TypeScript 的工程師
- Payload CMS 3.0 較新，部分文件仍在完善

**適合：** 有 Claude Code 輔助開發、重視長期自主控制、技術領先競爭對手

---

### 方案 D：Strapi + Next.js（替代方案）

**架構：**
```
Strapi（Node.js Headless CMS，自架）
└── Next.js 15（前端）
```

| 面向 | 評估 |
|------|------|
| 後台易用性 | ⭐⭐⭐⭐⭐ Strapi 後台最直觀 |
| 效能 | ⭐⭐⭐⭐⭐ 同方案 C |
| 部署複雜度 | ⭐⭐ 需分別部署前後端 |
| 資料控制 | ⭐⭐⭐⭐⭐ 自架 |
| 月費 | 需兩個服務 $24–40 USD |

**缺點：** 前後端分開部署較複雜，Strapi v5 有重大架構變化
**適合：** 不熟悉 Payload CMS、後台易用性優先

---

## 三、4 大方案綜合比較表

| 評分項目 | WordPress | Headless CMS | **Next.js+Payload** | Strapi+Next.js |
|---------|-----------|-------------|---------------------|----------------|
| 效能速度 | ★★★☆☆ | ★★★★★ | **★★★★★** | ★★★★★ |
| SEO 能力 | ★★★★☆ | ★★★★★ | **★★★★★** | ★★★★★ |
| 後台易用 | ★★★★★ | ★★★★☆ | **★★★★☆** | ★★★★★ |
| 客製彈性 | ★★★★☆ | ★★★★★ | **★★★★★** | ★★★★☆ |
| 資料控制 | ★★★☆☆ | ★★★☆☆ | **★★★★★** | ★★★★★ |
| 月費成本 | ★★★☆☆ | ★★★☆☆ | **★★★★★** | ★★★☆☆ |
| 安全維護 | ★★★☆☆ | ★★★★☆ | **★★★★★** | ★★★★☆ |
| 多語系 | ★★★★☆ | ★★★★★ | **★★★★★** | ★★★★☆ |
| 未來擴充 | ★★★☆☆ | ★★★★☆ | **★★★★★** | ★★★★☆ |
| 適合 MOTOKNIFE | ★★★★☆ | ★★★★☆ | **★★★★★** | ★★★★☆ |

---

## 四、推薦方案：Next.js 15 + Payload CMS 3.0（方案 C）

### 推薦理由（針對 MOTOKNIFE）

**1. 技術延續性最高**
你的報價系統已用 React + Vite + Node.js，Next.js 是 React 的超集，學習曲線最低。Claude Code 也最擅長 Next.js 開發。

**2. 效能領先所有競爭對手**
13 間競爭對手沒有一間用 Next.js，新網站 Core Web Vitals 分數可達 95+，在 Google 搜尋排名上取得先天優勢。

**3. 月費最低且固定**
DigitalOcean $12–24/月，沒有外掛授權費、CMS 訂閱費，長期下來是最經濟的選擇。

**4. 資料完全自主**
產品資料、客戶詢價、PDF 型錄全部在自己的伺服器上，不依賴第三方雲端服務。

**5. 未來擴充路徑清晰**
```
現在：官網 + 詢價表單
↓
第二期：會員系統（代理商登入查看技術文件）
↓
第三期：線上選型工具（輸入材料 → 推薦刀座）
↓
第四期：與 MES/ERP 系統整合（庫存查詢、訂單追蹤）
```

---

## 五、完整技術架構圖

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare（免費）                         │
│              CDN + DDoS 防護 + SSL 憑證                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              DigitalOcean Droplet（$12–24/月）                │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js 15 Application                  │   │
│  │                                                      │   │
│  │  前端（訪客看到的）          後台（你管理的）            │   │
│  │  ┌─────────────────┐       ┌──────────────────────┐  │   │
│  │  │ App Router      │       │ Payload CMS 3.0      │  │   │
│  │  │ ├─ /en/         │       │ ├─ 產品管理           │  │   │
│  │  │ ├─ /zh-tw/      │       │ ├─ 多語系內容         │  │   │
│  │  │ ├─ /de/         │       │ ├─ PDF 上傳           │  │   │
│  │  │ │                │       │ ├─ 詢價記錄           │  │   │
│  │  │ SSG 靜態頁面      │       │ ├─ 用戶管理           │  │   │
│  │  │ ├─ 產品頁（快）   │       │ └─ 媒體圖庫           │  │   │
│  │  │ ├─ 首頁          │       └──────────────────────┘  │   │
│  │  │ └─ 應用場景頁     │                                  │   │
│  │  │                  │       API Routes（Next.js 內建）  │   │
│  │  │ ISR 增量更新      │       ├─ POST /api/contact       │   │
│  │  │ └─ 新品更新後     │       │     → 寄 Email 給業務     │   │
│  │  │    自動重建       │       └─ GET /api/products        │   │
│  │  └─────────────────┘                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │  PostgreSQL   │  │  DigitalOcean │  │     Nginx     │   │
│  │  資料庫        │  │  Spaces（CDN）│  │  反向代理      │   │
│  │  產品/詢價/用戶 │  │  圖片/PDF儲存 │  │  SSL 終止      │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          │                        │
┌─────────▼──────┐        ┌────────▼───────┐
│  Resend        │        │  Google Search  │
│  Email 服務     │        │  Console + GA4  │
│  詢價通知寄送   │        │  SEO 監控        │
└────────────────┘        └────────────────┘
```

---

## 六、後台（Payload CMS）功能規劃

### 內容集合（Collections）

```
Products（產品）
├── 型號名稱（EN / ZH-TW / DE）
├── 系列分類（Score/Shear/Half/Hot/Knives/Guide-bar）
├── 主圖 + 多角度圖片集
├── 技術規格（結構化欄位）
│   ├── 最小切寬（mm）
│   ├── 最大切速（M/min）
│   ├── 氣壓範圍（kg/cm²）
│   ├── 刀片直徑（mm）
│   └── 適用導桿型號
├── 適用材料（多選）
├── 產品描述（富文本，多語系）
├── PDF 型錄（EN / ZH-TW）
└── SEO 設定（Meta title / description）

Applications（應用場景）
├── 材料名稱（多語系）
├── 材料說明
├── 推薦產品（關聯 Products）
└── 封面圖

Pages（一般頁面）
├── About / Services 等靜態頁
└── 多語系內容

Inquiries（詢價記錄）
├── 姓名、公司、Email、電話、國家
├── 需求類型（資訊/報價/訂購）
├── 感興趣產品
├── 材料/切速/厚度
├── 送出時間
└── 處理狀態（未讀/已回覆）

Media（媒體圖庫）
├── 產品圖片
├── 工廠照片
└── PDF 型錄
```

---

## 七、詢價表單技術實作

```
訪客填寫表單（React 前端）
     ↓
POST /api/contact（Next.js API Route）
     ↓
┌────────────────────────────────┐
│ 伺服器端處理                    │
│ 1. 驗證表單資料（Zod）          │
│ 2. 儲存至 PostgreSQL            │
│    （Inquiries Collection）    │
│ 3. 寄通知 Email 給業務          │
│    （Resend，$0 免費方案夠用）  │
│ 4. 寄確認 Email 給客戶          │
└────────────────────────────────┘
     ↓
回傳成功 → 前端顯示感謝頁面
```

---

## 八、多語系技術實作

```
使用 next-intl 套件

目錄結構：
messages/
  en.json    ← 英文（主要，SEO 優先）
  zh-tw.json ← 繁體中文
  de.json    ← 德文

URL 結構：
/en/products/score-cut/mt-a110
/zh-tw/products/score-cut/mt-a110
/de/products/score-cut/mt-a110

SEO hreflang：
自動產生 <link rel="alternate" hreflang="en" href="..." />
```

---

## 九、SEO 技術實作

```
每個產品頁自動產生：
- <title>：型號 + 系列 + MOTOKNIFE
- <meta description>：產品摘要
- Open Graph：Facebook/LinkedIn 分享預覽
- JSON-LD 結構化資料：Product Schema
- hreflang：多語系對應
- Sitemap：自動產生 /sitemap.xml
- robots.txt：自動產生

產品頁 JSON-LD 範例：
{
  "@type": "Product",
  "name": "MT-A110 Score Cut Knife Holder",
  "brand": "MOTOKNIFE",
  "manufacturer": "友聚工業股份有限公司",
  "description": "...",
  "offers": { "@type": "Offer", "availability": "InStock" }
}
```

---

## 十、部署流程

```
開發環境（MacBook / Mac Mini M4）
     ↓ git push
GitHub Repository
     ↓ GitHub Actions（CI/CD）
     ↓ 自動測試 + 自動建置
DigitalOcean Droplet
     ↓ pm2 管理 Node.js 進程
     ↓ Nginx 反向代理
Cloudflare（CDN + SSL）
     ↓
全球訪客
```

---

## 十一、費用估算

### 月費（持續）

| 項目 | 費用 | 說明 |
|------|------|------|
| DigitalOcean Droplet | $12–24 USD | 2 vCPU / 4GB RAM |
| DigitalOcean Spaces | $5 USD | 圖片/PDF 儲存 CDN |
| Cloudflare | $0 USD | 免費方案已足夠 |
| Resend Email | $0 USD | 100封/天免費 |
| **總計** | **$17–29 USD/月** | **約 NT$550–930/月** |

### 一次性費用（建置）

| 項目 | 費用 | 說明 |
|------|------|------|
| Next.js 15 | $0 | 開源免費 |
| Payload CMS 3.0 | $0 | 開源免費 |
| next-intl | $0 | 開源免費 |
| 開發工時 | Claude Code 輔助 | 大幅降低 |

---

## 十二、是否適合中小企業長期維護？

### ✅ 適合的理由

**維護分工清楚：**
- 行銷人員：用 Payload CMS 後台更新產品/內容（不需工程師）
- 工程師：只在新增功能時介入
- Claude Code：隨時輔助技術問題

**技術棧穩定：**
- Next.js 由 Vercel 維護，長期更新保障
- Payload CMS 3.0 穩定版，社群活躍
- PostgreSQL 是業界最可靠的資料庫

**備份與還原：**
- 每日自動備份資料庫
- Git 版本控制所有程式碼
- DigitalOcean 提供快照備份

### ⚠️ 需要注意

- 需要工程師初始建置（約 4–8 週）
- 重大版本升級（每 1–2 年）需工程師協助
- 伺服器出問題需技術人員排查（DigitalOcean 有管理服務可選）

---

## 十三、開發時程規劃

### Phase 1（第 1–3 週）：核心功能
- 導覽列 + 多語系切換
- 首頁（Hero + 產品入口）
- 產品列表 + 詳細頁
- Payload CMS 後台建置
- 詢價表單 + Email 通知

### Phase 2（第 4–5 週）：完整內容
- 應用場景頁
- 切法說明頁
- 關於頁 + 服務頁
- SEO 優化（Meta / Sitemap / JSON-LD）

### Phase 3（第 6–7 週）：多語系 + 優化
- 德文版本建立
- 效能優化（圖片 WebP / Lazy load）
- Google Analytics 4 整合
- Core Web Vitals 測試

### Phase 4（第 8 週）：上線準備
- DigitalOcean 部署
- Cloudflare DNS 設定
- 舊網站 301 轉址設定
- 上線測試

---

## 版本記錄

| 版本 | 日期 | 更新內容 |
|-----|------|---------|
| v1.0 | 2026-03-26 | 初始建立，完整技術架構規劃 |
