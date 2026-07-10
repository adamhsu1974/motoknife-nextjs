import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/gsap/Reveal";
import HeroBackground from "@/components/HeroBackground";
import WhyMotoknife from "@/components/WhyMotoknife";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchApplications, fetchDistributorCountries } from "@/lib/cms";
import { primarySolutionForApplication } from "@/lib/data/solutions";

export const revalidate = 3600;

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  });
}

export default async function Home({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const [applications, distributorCountries] = await Promise.all([
    fetchApplications(locale),
    fetchDistributorCountries(locale),
  ]);

  const countryList = new Intl.ListFormat(locale, {
    style: "long",
    type: "conjunction",
  }).format(distributorCountries.map((c) => c.countryName));
  // 單一國家時 "{count} Countries" 文法不成立，退回通用標題
  const mapHeading =
    distributorCountries.length >= 2
      ? dict.home.mapHeading.replace("{count}", String(distributorCountries.length))
      : dict.home.mapHeadingFallback;
  const mapText =
    distributorCountries.length > 0
      ? dict.home.mapText.replace("{countries}", countryList)
      : dict.home.mapTextFallback;

  return (
    <div>
      {/* ── Section 1: Hero（深色影片背景 + 白字疊層） ─────────── */}
      {/* pt-20 md:pt-24 為 fixed navbar（~68px）預留 clearance，避免 eyebrow 被遮 */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden bg-hero-black pt-20 pb-16 md:min-h-[720px] md:pt-24 md:pb-20">
        {/* Layer 1: video BG（reduced-motion 僅顯示 poster；桌面用 hero-bg.mp4、手機 hero-bg-720.mp4） */}
        <HeroBackground />
        {/* Layer 2: 深色遮罩；行動版加深至 /40 補對比，桌面維持 /25 */}
        <div aria-hidden className="absolute inset-0 bg-black/40 md:bg-black/25" />
        {/* Layer 3: 內容 */}
        <Reveal
          mode="mount"
          stagger
          y={16}
          className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center"
        >
          <p className="eyebrow eyebrow-dark">{dict.home.heroEyebrow}</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-[clamp(2.5rem,2rem+1.5vw,3rem)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
            {dict.home.heroTitleLead}
            {/* Accent：Latin 用襯線斜體橙、CJK 只上色（合成斜體不美） */}
            <em
              className={`text-orange ${locale === "en" ? "font-serif italic" : "not-italic"}`}
            >
              {dict.home.heroTitleAccent}
            </em>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white md:text-xl">
            {dict.home.heroLine2}
          </p>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/80">
            {dict.home.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <CTAButton href={`/${locale}/products`} size="lg" shape="pill">
              {dict.common.exploreProducts}
            </CTAButton>
            <CTAButton
              href={`/${locale}/contact`}
              size="lg"
              shape="pill"
              variant="outline-light"
            >
              {dict.common.contactUs}
            </CTAButton>
          </div>
        </Reveal>
      </section>

      {/* ── Section 2: Why MOTOKNIFE 信任條 ─────────────────── */}
      <WhyMotoknife dict={dict} />

      {/* ── Section 3: Products（2×2 白卡） ─────────────────── */}
      {/* data-hide-floating-cta：進入視窗時淡出 FloatingCTA，避免橘色浮動鈕擋到卡片 */}
      <section data-hide-floating-cta className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
                {dict.home.productsHeading}
              </h2>
              <p className="mt-3 text-text-secondary">{dict.home.productsSub}</p>
            </div>
            <Link
              href={`/${locale}/products`}
              className="shrink-0 text-sm font-medium text-orange-text underline-offset-4 transition-colors hover:underline"
            >
              {dict.home.viewAllProducts} →
            </Link>
          </div>

          <Reveal stagger className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {dict.home.cuttingMethodCards.map((method) => (
              <Link
                key={method.slug}
                href={`/${locale}/products/${method.slug}`}
                className="group overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition-colors duration-200 hover:border-orange"
              >
                {/* Neutral image slot — 切法產品圖位 */}
                <div aria-hidden className="aspect-[16/9] min-h-[150px] w-full bg-bg-tertiary" />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-text-primary">{method.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {method.description}
                  </p>
                  <p className="mt-4 text-sm font-medium text-orange-text">
                    {dict.common.learnMore} →
                  </p>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Section 4: Industry Applications（CMS 無資料時整段隱藏） ── */}
      {applications.length > 0 && (
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
                {dict.home.applicationsHeading}
              </h2>
              <p className="mt-3 text-text-secondary">{dict.home.applicationsSub}</p>
            </div>
            <Link
              href={`/${locale}/applications`}
              className="shrink-0 text-sm font-medium text-orange-text underline-offset-4 transition-colors hover:underline"
            >
              {dict.home.viewAllApplications} →
            </Link>
          </div>

          <Reveal stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {applications.map((app, index) => {
              const solution = primarySolutionForApplication(app.slug);
              // 行動版 2 欄且總數為奇數時，最後一格橫跨兩欄避免孤兒格
              const isOddLast =
                index === applications.length - 1 && applications.length % 2 === 1;
              return (
                <div
                  key={app.slug}
                  className={`group relative flex flex-col items-center rounded-lg border border-border p-6 pb-3 text-center transition-colors focus-within:border-orange hover:border-orange ${
                    isOddLast ? "col-span-2 sm:col-span-1" : ""
                  }`}
                >
                  {/* 主連結延伸覆蓋整張卡（after:inset-0），副連結以 z-10 疊於其上 */}
                  <Link
                    href={`/${locale}/applications/${app.slug}`}
                    className="flex flex-col items-center gap-4 after:absolute after:inset-0 after:rounded-lg"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border-strong text-text-secondary transition-colors group-hover:border-orange group-hover:text-orange-text">
                      <MaterialIcon slug={app.slug} />
                    </div>
                    <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-orange-text">
                      {app.title}
                    </span>
                  </Link>
                  {/* 副標 → 對應 solutions 長尾頁（44px 觸控高度） */}
                  {solution && (
                    <Link
                      href={`/${locale}/solutions/${solution.slug}`}
                      className="relative z-10 mt-1 inline-flex min-h-11 items-center px-3 text-xs text-text-secondary underline-offset-2 transition-colors hover:text-orange-text hover:underline"
                    >
                      {solution.material} →
                    </Link>
                  )}
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>
      )}

      {/* ── Section 5: The MOTOKNIFE Difference ─────────────── */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
            {dict.home.advantagesHeading}
          </h2>
          <Reveal stagger className="mt-10 grid gap-10 md:grid-cols-3">
            {dict.home.advantages.map((adv) => (
              <div key={adv.title} className="border-t border-border-strong pt-6">
                <h3 className="text-lg font-medium text-text-primary">{adv.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{adv.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Section 6: Distributor Map Preview ──────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal
            stagger
            className={`grid items-center gap-12 ${
              distributorCountries.length > 0 ? "lg:grid-cols-2" : ""
            }`}
          >
            <div className={distributorCountries.length > 0 ? "" : "max-w-2xl"}>
              <p className="eyebrow">{dict.home.mapEyebrow}</p>
              <h2 className="mt-3 text-[1.75rem]/[1.2] font-medium text-text-primary md:text-[2rem]/[1.2]">
                {mapHeading}
              </h2>
              <p className="mt-5 leading-relaxed text-text-secondary">{mapText}</p>
              <div className="mt-8">
                <CTAButton href={`/${locale}/distributors`} size="lg">
                  {dict.home.mapCta}
                </CTAButton>
              </div>
            </div>

            {distributorCountries.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {distributorCountries.map((country) => (
                  <Link
                    key={country.countryCode}
                    href={`/${locale}/distributors`}
                    className="group flex items-center gap-3 rounded border border-border px-4 py-3 transition-colors hover:border-orange"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange" />
                    <div>
                      <p className="text-sm font-medium text-text-primary transition-colors group-hover:text-orange-text">
                        {country.countryName}
                      </p>
                      <p className="text-xs text-text-secondary">{country.region}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── Section 7: Quote CTA（深色收尾重心；進視窗時 FloatingCTA 淡出） ── */}
      <section
        data-hide-floating-cta
        className="relative overflow-hidden bg-hero-black py-16 md:py-20"
      >
        {/* Stage glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(244,121,32,0.12), transparent 60%)",
          }}
        />
        <Reveal className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-medium text-white md:text-3xl">
            {dict.home.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{dict.home.ctaText}</p>
          <div className="mt-8">
            <CTAButton href={`/${locale}/contact`} size="lg">
              {dict.home.ctaButton}
            </CTAButton>
          </div>
          <p className="mt-4 text-sm text-white/60">{dict.home.ctaReassurance}</p>
        </Reveal>
      </section>
    </div>
  );
}

/* ─── Material icons ──────────────────────────────────────── */

function MaterialIcon({ slug }: { slug: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    "plastic-film": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
      </svg>
    ),
    "metal-foil": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    rubber: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    paper: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="12" y2="17" />
      </svg>
    ),
    nonwoven: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    "tape-labels": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="12" r="7" />
        <circle cx="10" cy="12" r="2.5" />
        <path d="M17 12h5" />
      </svg>
    ),
    medical: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
    "heavy-composites": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M3 11h18" />
        <path d="M3 16h18" />
        <path d="M3 21h18" />
      </svg>
    ),
    "heat-sealed": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-4 3-6 5-9z" />
        <path d="M12 21v-4" />
      </svg>
    ),
  };

  const fallback = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10" />
      <path d="M7 12h10" />
    </svg>
  );

  return <>{iconMap[slug] ?? fallback}</>;
}
