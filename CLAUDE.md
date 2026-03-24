# Motoknife 官方網站

台灣精密切刀製造商 motoknife.com 的下一代官方網站。

## 技術架構

- **框架**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.0
- **資料庫**: PostgreSQL
- **樣式**: Tailwind CSS
- **語言**: TypeScript

## 語系支援

支援繁體中文（zh-TW）與英文（en）雙語。

## 專案結構

- `app/` — Next.js App Router 頁面與路由
- `collections/` — Payload CMS collection 定義
- `components/` — React 共用元件
- `lib/` — 工具函式與共用邏輯

## 開發

```bash
cp .env.example .env
npm install
npm run dev
```

伺服器預設啟動於 http://localhost:3000
