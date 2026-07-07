# MOTOKNIFE 官網重建規劃文件 v1.0

**專案名稱**：MOTOKNIFE 官網重建（motoknife.com）
**文件日期**：2026-07-07
**文件用途**：網站重建專案的核心規劃依據，同時作為 Claude Code 開發時的 context 文件
**技術架構**：Next.js 15 + Payload CMS（GitHub: adamhsu1974/motoknife-nextjs）
**部署規劃**：DigitalOcean Singapore + Cloudflare CDN；Email 維持 Yuan-Jhen Info cPanel

---

## 一、專案目標

1. 讓海外買家找到我們並詢價（SEO + 詢價轉換）
2. 展示產品目錄（依切割方式 + 依應用材料雙路徑）
3. 建立品牌形象、提升可信度（歐洲高端 B2B 工業美學）
4. 取代目前的靜態頁面（LAZYWeb 封閉式 CMS，2018 年建置）
5. SEO 優化與 UX/UI 全面升級

**投入節奏**：每週 5-8 小時，預計 13 週完成（四階段）

---

## 二、現有官網診斷（2026-07 掃描結果）

### 嚴重問題
1. **首頁沒有品牌敘事**：進站直接看到產品分類圖示，沒有一句話說明 MOTOKNIFE 是誰、解決什麼問題
2. **About 頁缺乏差異化論述**：1990 年創立、美/德/台/中專利、垂直整合製造等優勢完全沒有突顯
3. **沒有明確詢價引導（CTA）**：產品頁只有規格，沒有 Request a Quote 按鈕

### 中度問題
4. News 停更（最後 2023/11），給買家「公司停業」的錯誤印象
5. 產品頁缺少應用場景說明，買家難以自行對號入座
6. SEO 基礎薄弱：所有頁面標題都是「MOTOKNIFE」，meta description 千篇一律

### 技術問題
7. 行動裝置禁止縮放（user-scalable=no），Google 行動友善評分扣分
8. Copyright 停在 2018 年

### 資安確認（2026-07-07 官方工具檢查）
- Google Search Console 安全性問題：未偵測到任何問題（www 與非 www 版本皆已驗證）
- Google Safe Browsing：未找到任何不安全的內容
- Sucuri SiteCheck：No Malware Found，9 個黑名單全部乾淨
- VirusTotal：0/91 全部 Clean
- 結論：網站目前安全，但舊 CMS 為封閉系統（Sucuri 顯示 CMS: Unknown），安全性完全依賴外包商，是遷移的理由之一
- Google Search Console 已完成設定，可持續監控 SEO 與索引狀況

---

## 三、客戶結構與策略定位

### 客戶結構
- **交易扁平化**：少數大客戶佔 70%+ 營收，大量小客戶少量或低頻交易，遍佈五大洲
- **大客戶**：代理商 / 大型製造廠，決策週期長，重視技術支援，透過展覽、口碑、業務關係進入
- **小客戶**：小型工廠老闆直接下單，自己 Google 搜尋找上門，重視 CP 值與快速下單
- **通路現實**：許多客戶同時向貿易商與原廠詢價，存在通路衝突

### 詢價策略（通路衝突解法）
**視地區而定**：有代理商的地區保護代理商（官網引導找當地代理商）；無代理商的地區直接接單（官網承接詢價）。以互動地圖實作。

### 品牌定位
- **核心主張**：Made in Taiwan — Precision you can trust
- **一句話定位**：台灣精密製造 35 年，全球分條刀具專家
- **網站北極星**：「讓第一次來訪的海外採購工程師，在 3 分鐘內建立信任感並發出詢價。」

### 差異化論述（對抗兩端競爭）
- 對歐美龍頭（DIENES/slittec/Maxcess）：同等工程水準、更合理的價格（歐洲品質的 70% 價格）
- 對中國仿冒廠商：35 年正廠、多國專利、品質穩定、交期可靠

### 目標買家輪廓
1. **歐洲採購工程師**（德國/荷蘭造紙薄膜廠）：重視認證、交期、技術支援，決策 3-6 個月
2. **印度中小型轉換機廠**（包裝/標籤）：重視 CP 值、備品供應，決策 1-3 個月
3. **東南亞代理商**（越南/泰國/印尼）：重視代理利潤、技術文件
4. **北美設備整合商**（OEM）：重視規格一致性、長期供應，決策 6-12 個月
5. **全球小型工廠主**（五大洲長尾客戶）：Google 搜尋進站，需要清楚的產品頁與低門檻詢價

---

## 四、6 頁網站架構（Sitemap）

### 1. Home
- 任務：10 秒建立信任，引導詢價
- Hero 主標題方向："Precision Slitting Solutions — Made in Taiwan Since 1990"
- 區塊：Hero + 3 大核心優勢 + 產品分類快速入口 + 代理商地圖 + 產業應用 + 詢價 CTA

### 2. Products
- 任務：讓買家快速找到對的產品
- 依切割方式分類（Score / Shear / Half-cut / Hot-cut）+ 應用材料篩選器
- 每產品：規格數字化呈現 + 應用場景 + 詢價按鈕
- PDF 目錄下載、產品比較功能

### 3. About
- 任務：建立品牌信任與差異化
- 標題方向："35 years. 50+ countries. All precision. All Taiwan."
- 區塊：品牌故事時間軸 + 多國專利列表 + 工廠設備照片 + 太陽能廠房 ESG + 垂直整合製造 + 認證文件

### 4. Applications（本次新增的關鍵頁面）
- 任務：讓買家從材料/產業出發對號入座，降低詢價門檻
- 架構：9 大分類（見第六章對應矩陣）
- 每分類敘事結構（參考 DIENES）：痛點 → 切割方式選擇邏輯 → 對應 MT 型號
- 未來升級：互動式選型工具（選材料 → 選厚度 → 推薦型號）

### 5. Distributors
- 任務：代理商保護 + 空白地區直接接單
- 互動世界地圖：點選國家 → 有代理商顯示代理商資訊；無代理商顯示詢價表單
- 代理商申請入口（開發新市場）
- 技術實作：Mapbox 或 Google Maps API

### 6. Contact / Quote
- 任務：讓詢價過程簡單、專業
- 智慧詢價表單：依產品/材料/用量自動分類，寄到對應業務
- 台灣總部 + 上海辦公室聯絡資訊、展覽行程、預計回覆時間承諾

---

## 五、競爭者研究（13 家，2026-07 調查）

### Tier 1 — 指標性競爭者（4 家）

**DIENES（德國）** dienes.de / dienesusa.com
- 100 年歷史、約 500 名員工，全球第一
- 產品分級：Premium / Elite / Ultimate 三級 + SIMU-FLASH 自動定位系統
- 網站亮點：Discover 知識專區（材料 × 切割方式 × 機台三軸知識庫）、具名客戶 Success Stories、Slitting Academy 培訓、Test the Best 免費試用方案、部落格持續更新
- 學習點：Discover 三軸架構直接可套用到 Applications 頁

**Maxcess / Tidland（美國）** maxcessintl.com
- Web handling 巨頭，Tidland 刀組為業界標準
- 9 大產業分類：Packaging / Tag & Label / Nonwovens / Battery / Towel & Tissue / Specialty Converting / Metals / Tire & Rubber / Paper
- 刀組系列採等級金字塔：Performance（旗艦）/ Advantage（中階，最小 19.5mm）/ Control（電子化）/ Precision Lock 與 Unibody（經濟型）
- 學習點：產業分類骨架；Battery 獨立成類代表市場成長訊號

**Mario Cotta（義大利）** mariocotta.com
- 60+ 員工，40+ 款刀組全球最廣，最小分切 12.5mm
- 系列性格定位：X（一致性）/ C（耐用）/ H（全自動）/ Lisa（入門主力，全球裝機 10,000+ 台）
- 學習點：「全球裝機 10,000+ 台」式社會證明；系列定位溝通而非型號列表

**slittec（德國）** slittec.de
- 與 MOTOKNIFE 定位最接近的對標：刀組專業廠（不做整機）
- 產品線：shear / crush / burst / razor / hot cut + 壓花滾花刀組，有 Test Center 實測服務
- 學習點：產品文案三段式結構（技術特點 → 解決什麼問題 → 適用材料）

### Tier 2 — 區域/專業型（7 家）
- **Intertech Precision**（美國，1954）：PQAS 相容策略；Slitting Basics 手冊下載（lead magnet）
- **Helios Cavagna**（義大利）：50 年氣動刀組；舊系統改造升級服務
- **Toyo Knife 東洋刃物**（日本，1925，Ferrotec 集團）：銅箔/鋁箔（電池產業）強勢；杭州有分公司攻中國市場
- **Carolina Knife & Mfg**（美國）：各大品牌相容刀組；與小客戶市場重疊
- **Double E Group**（美國）：Mario Cotta 北美獨家代理；具名客戶案例內容行銷範本
- **American Cutting Edge**（美國）：線上標價直售刀組（$119-$1,409），類電商模式服務小客戶
- **Parkinson / Dusenbery**（美國）：美國市場事實標準（客戶常用「Dusenbery style」描述需求）

### Tier 3 — 低價競爭者
中國廠商群（Nanjing Quality、LLY PACK、Jiangsu Leizhan 等）：Made-in-China / Alibaba 平台、低價、低 MOQ，多為仿冒品，威脅價格敏感市場（東南亞、中東、南美）

### 觀察名單
- **Kampf / Jagenberg Group**（德國）：全球最大分條整機廠，非競爭者而是潛在 OEM 客戶
- **Krumar**（歐盟）：刀片專業（粉末冶金），技術文章寫法可參考

### 業界標準配備（四家 Tier 1 共同點，新網站必須有）
1. 產業/材料導向入口（驗證 Applications 頁方向正確）
2. 具名客戶案例（從願意具名的代理商或長期客戶開始）
3. 規格數字化溝通（最小分切寬度、氣壓範圍、精度直接寫在產品卡）
4. 試用/測試方案（DIENES 的 Test the Best、slittec 的 Test Center）

### MOTOKNIFE 差異化機會（四家都沒做好的）
1. **亞洲製造 × 歐洲品質的中間定位**：歐洲品質的 70% 價格，35 年實際生存之道
2. **互動式選型工具**：四家的材料找產品都是靜態頁，Next.js 可做互動選型器，體驗領先全業界
3. **現代化網站體驗**：四家都是傳統 WordPress 風格，Devialet 式美學 + GSAP 動效是視覺降維打擊

---

## 六、Applications 產業分類與對應矩陣（v2，已經 GM 校正）

| # | 產業/材料分類 | 涵蓋範圍 | 對應刀組 | 切割方式 |
|---|--------------|---------|---------|---------|
| 1 | 紙類 Paper & Board | 牛皮紙、離型紙、壁紙、美紋紙、瓦楞紙板、砂紙 | MT-A110 / A130 / A160；MT-A650 / A850 / A880 | Score + Shear |
| 2 | 塑膠薄膜 Plastic Film | 軟硬 PVC、PP、PE、PS、LDPE、PLA、保護膜 | MT-A110 / A130 / B110 / C121；MT-A410 / A450 / A650 / A850 / A880 | Score + Shear |
| 3 | 不織布/紡織 Nonwovens & Textiles | 不織布、合成皮、棉布、紗布、商標布 | MT-A510 / A170 / A140；MT-A450 / A850 | Score + Shear |
| 4 | 金屬箔 Metal Foils | 銅箔、鋁箔（電池/電容產業） | MT-A410 / A450 | Shear |
| 5 | 橡膠 Rubber | 橡膠磁板、橡膠皮、輕/重橡膠 | MT-A140 / A170 / A510 | Score |
| 6 | 膠帶/標籤 Tape & Labels | 各式膠帶、藥膠布、黏扣帶 | MT-A110 / A130 / B110 / C121 | Score |
| 7 | 醫療材料 Medical Materials | 醫療貼布、泡棉膠帶、多層敷料 | MT-A310 / A310H（半斷專用） | Half-cut |
| 8 | 複合/重磅材料 Heavy Composites | 玻纖、屋頂油毛氈、多層複合材 | MT-A510 / A170；MT-A850 / A880 | Score + Shear |
| 9 | 熱封切邊應用 Heat-Sealed Edge | 化纖織物、合成纖維、織帶、商標帶（熔封切邊防脫紗） | MT-A710 | Hot cut |

### 型號家族整理
- **Score Cut**：A110 / A130 / A160 / B110 / C121（輕中型）＋ A140 / A170 / A510（重磅型）
- **Shear Cut**：A410 / A450（精密型，含金屬箔）＋ A650 / A850 / A880（通用型）
- **Half Cut**：A310 / A310H（醫療多層材料）
- **Hot Cut**：A710

### MT-A710 vs DIENES PQAS-H 規格對比（行銷素材）
| 規格 | MT-A710 | DIENES PQAS-H |
|------|---------|---------------|
| 加熱溫度 | 600°C（實際可達 650°C） | 750°C |
| 最小分切寬度 | **< 13mm（領先近一倍）** | < 25mm |
| 線速 | 20 m/min（部分材料 30） | 70 m/min（推測為薄材極限值） |

規格標示原則：採雙值標示（up to / max. + 條件註記），避免保守值被拿去比對手極限值。
< 13mm 窄幅熱切割是單點勝過龍頭的黃金素材，對應織帶、商標帶、醫療膠帶等高單價窄幅市場。

### 不織布分類的敘事結構（參考 DIENES）
開頭講痛點（粉塵、毛絮、脫紗）→ 三種切割方式選擇邏輯（Score：窄幅經濟 / Shear：高速高品質低粉塵 / Hot：化纖熔封）→ 各自對應 MT 型號。MT-A170 的大排屑空間設計正對應 DIENES 強調的 dust-free / lint-free 痛點。

---

## 七、四階段執行計畫（13 週）

### 第一階段：診斷 & 策略（第 1-2 週）✅ 已完成
- 現有官網診斷、資安檢查、Search Console 設定
- 客戶結構與策略定位、6 頁架構、競爭者研究（13 家）、Applications 對應矩陣

### 第二階段：內容 & 文案（第 3-5 週）
- 英文主文案（EEAT 策略）：Home Hero、3 大優勢、About 品牌故事
- 產品頁面文案（SEO 關鍵字：pneumatic knife holder、slitting knife holder manufacturer、score cut knife holder 等）
- Applications 9 大分類的完整內容（痛點 → 選擇邏輯 → 型號）
- 品牌故事 / 公司沿革時間軸

### 第三階段：視覺設計 & 開發（第 6-10 週）
- UI 原型（Devialet 式歐洲高端 B2B 美學、GSAP 動效）
- Next.js 15 + Payload CMS 開發（Claude Code + AI Skills）
- AI 產品圖像（Higgsfield）
- 互動功能：Distributors 地圖、Applications 選型器（可列為 v1.1）

### 第四階段：測試 & 上線（第 11-13 週）
- 多語言測試（EN 主站；ZH-TW 視需求）
- SEO / Core Web Vitals 優化
- DigitalOcean Singapore 部署 + Cloudflare CDN
- Google Search Console 提交 sitemap、舊站 301 轉址、下架舊站

---

## 八、待辦與待確認事項

1. [ ] Applications 矩陣：不織布 Shear 路徑主力型號最終確認（A450 / A850 已列入，是否有遺漏）
2. [ ] 各型號完整規格表（最小分切寬度、氣壓、精度）供產品頁數字化呈現
3. [ ] 願意具名的客戶/代理商案例蒐集（Success Story 素材）
4. [ ] 代理商完整名單與地區（Distributors 地圖資料庫）
5. [ ] 多國專利清單整理（About 頁素材）
6. [ ] 工廠/設備/太陽能廠房照片盤點（視覺素材）
7. [ ] News 內容策略：上線時至少準備 3-5 篇（展覽、新產品、產業知識）
8. [ ] 考慮是否導入「試用方案」機制（參考 DIENES Test the Best）
9. [ ] 舊站 LAZYWeb 合約與網域移轉確認
