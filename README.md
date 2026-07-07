# MOTOKNIFE 官方網站

友聚工業股份有限公司（MOTOKNIFE）官網 — 台灣精密分條刀具製造商，取代原 motoknife.com。

**技術架構**：Next.js 16（App Router, Turbopack）＋ Payload CMS 3 ＋ PostgreSQL ＋ Tailwind CSS 4 ＋ TypeScript

## 啟動步驟

### 1. 前置需求

- Node.js 20+
- PostgreSQL 16+（本機或遠端皆可）

### 2. 安裝與設定

```bash
npm install
cp .env.example .env   # 填入實際值，見下方環境變數說明
```

在 PostgreSQL 建立資料庫（名稱對應 DATABASE_URI，例如 `motoknife`）。
首次啟動 dev server 時 Payload 會自動建立資料表（dev push mode）。

### 3. 匯入種子資料

```bash
npm run seed
```

將 `lib/data/*.ts` 的產品（20）、應用分類（9）、代理商（8）、消息（3）、FAQ（9）
匯入 Payload Collections，en 與 zh-tw 兩個 locale 都會寫入。
**可重複執行**（每次先清空再重建，不產生重複資料）。

### 4. 啟動

```bash
npm run dev
```

- 前台：http://localhost:3000 （自動轉址至 `/en`）
- 後台：http://localhost:3000/admin （首次進入會要求建立管理者帳號）

## 環境變數

| 變數 | 必填 | 說明 |
|------|------|------|
| `DATABASE_URI` | ✅ | PostgreSQL 連線字串，例如 `postgresql://user:pass@localhost:5432/motoknife` |
| `PAYLOAD_SECRET` | ✅ | Payload 加密金鑰（隨機長字串） |
| `NEXT_PUBLIC_SERVER_URL` | ✅ | 站台網址（本機 `http://localhost:3000`；正式站 `https://motoknife.com`），用於 canonical/hreflang/sitemap |
| `RESEND_API_KEY` | ⬜ | Resend email API key；未設定時詢價表單內容只輸出到 console |
| `CONTACT_EMAIL` | ⬜ | 詢價通知收件信箱（預設 `service@motoknife.com`） |

## 常用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 開發伺服器 |
| `npm run build` | 生產建置（SSG + ISR，需可連線的資料庫） |
| `npm run seed` | 匯入種子資料（可重複執行） |
| `npm run generate:types` | 由 Payload config 產出 `lib/payload-types.ts` |
| `npm run generate:importmap` | 產出 admin import map（新增 admin 元件後執行） |
| `npm run lint` | ESLint |
| `ANALYZE=true npm run build` | Bundle 分析 |

## 專案結構

```
app/[lang]/          前台頁面（en / zh-tw，ISR revalidate 3600）
app/(payload)/       Payload admin 與 REST API
collections/         Payload Collections（Products / Applications / Distributors / News / Pages / Faqs）
components/          React 元件
lib/cms.ts           前台唯一 CMS 查詢入口（Local API + React cache）
lib/data/            種子資料（僅供 npm run seed 使用，前台不 import）
lib/payload-types.ts Payload 自動產出型別（勿手動修改）
messages/            i18n 字串（en / zh-tw）
scripts/seed.ts      種子腳本
docs/PLANNING.md     專案規劃文件（權威來源）
```

## 注意事項

- 修改 `collections/*` 後需執行 `npm run generate:types`
- zh-tw locale 內容目前為英文佔位（Phase 2 翻譯後由後台覆蓋）
- 部署（DigitalOcean + Cloudflare）時 build 階段需能連線資料庫
