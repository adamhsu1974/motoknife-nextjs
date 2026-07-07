import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/gsap/Reveal";
import WhyMotoknife from "@/components/WhyMotoknife";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchApplications, fetchDistributorCountries } from "@/lib/cms";
import { primarySolutionForApplication } from "@/lib/data/solutions";

export const revalidate = 3600;

const CUTTING_METHODS = [
  {
    slug: "score-cut",
    name: "Score Cut",
    description: "Circular blade against a hardened anvil roller — clean edges on films, paper, and nonwovens.",
    spec: "Min. slit width 8mm",
  },
  {
    slug: "shear-cut",
    name: "Shear Cut",
    description: "Scissor-action precision for metallic foils, heavy board, and thick films.",
    spec: "Burr-free foil edges",
  },
  {
    slug: "half-cut",
    name: "Half Cut",
    description: "Cuts the top layer, keeps the liner intact — built for medical laminates and labels.",
    spec: "Micrometer depth control",
  },
  {
    slug: "hot-cut",
    name: "Hot Cut",
    description: "Heated blade fuses synthetic edges while cutting — no fraying, no loose fibers.",
    spec: "< 13mm slit width · 600°C",
  },
] as const;

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

  return (
    <div>
      {/* ── Section 1: Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-black">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(244,121,32,0.12), transparent 60%)",
          }}
        />
        <Reveal
          mode="mount"
          stagger
          y={28}
          className="relative mx-auto flex min-h-[calc(100vh-56px)] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center"
        >
          <p className="eyebrow">{dict.home.heroEyebrow}</p>
          <h1 className="mt-5 font-heading text-5xl font-bold tracking-tight text-white md:text-7xl">
            {dict.home.heroLine1}
            <br />
            <span className="text-orange">{dict.home.heroLine2}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
            {dict.home.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CTAButton href={`/${locale}/products`} size="lg">
              {dict.common.exploreProducts}
            </CTAButton>
            <CTAButton href={`/${locale}/contact`} variant="outline-light" size="lg">
              {dict.home.ctaButton}
            </CTAButton>
          </div>

          {/* Hero product visual placeholder */}
          <div className="mt-16 flex h-56 w-full max-w-4xl items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] md:h-72">
            <span className="text-sm text-white/25">
              Product Hero Image — 3D Render (Higgsfield, Phase 3)
            </span>
          </div>
        </Reveal>
      </section>

      {/* ── Section 1.5: Why MOTOKNIFE 信任數字 ─────────────── */}
      <WhyMotoknife dict={dict} />

      {/* ── Section 2: 3 Core Advantages ────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="heading-accent text-3xl font-bold text-text-primary md:text-4xl">
            {dict.home.advantagesHeading}
          </h2>
          <Reveal stagger className="mt-12 grid gap-10 md:grid-cols-3">
            {dict.home.advantages.map((adv, i) => (
              <div key={adv.title} className="border-t-2 border-border pt-6">
                <span className="font-heading text-4xl font-bold text-orange/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-bold text-text-primary">{adv.title}</h3>
                <p className="mt-3 leading-relaxed text-text-secondary">{adv.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Section 3: Product Categories ───────────────────── */}
      <section className="bg-bg-warm py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="heading-accent text-3xl font-bold text-text-primary md:text-4xl">
                {dict.home.productsHeading}
              </h2>
              <p className="mt-4 text-text-secondary">{dict.home.productsSub}</p>
            </div>
            <Link
              href={`/${locale}/products`}
              className="shrink-0 text-sm font-semibold text-orange transition-colors hover:text-orange-hover"
            >
              {dict.home.viewAllProducts} →
            </Link>
          </div>

          <Reveal stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CUTTING_METHODS.map((method) => (
              <Link
                key={method.slug}
                href={`/${locale}/products/${method.slug}`}
                className="group relative rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-orange opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-soft text-orange">
                  <MethodIcon slug={method.slug} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-text-primary">{method.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {method.description}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-orange">
                  {method.spec}
                </p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Section 4: Industry Applications ────────────────── */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="heading-accent text-3xl font-bold text-white md:text-4xl">
                {dict.home.applicationsHeading}
              </h2>
              <p className="mt-4 text-white/60">{dict.home.applicationsSub}</p>
            </div>
            <Link
              href={`/${locale}/applications`}
              className="shrink-0 text-sm font-semibold text-orange transition-colors hover:text-orange-hover"
            >
              {dict.home.viewAllApplications} →
            </Link>
          </div>

          <Reveal stagger className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {applications.map((app) => {
              const solution = primarySolutionForApplication(app.slug);
              return (
                <div
                  key={app.slug}
                  className="flex flex-col items-center gap-3 rounded-lg border border-white/10 p-6 text-center transition-all hover:border-orange hover:bg-white/5"
                >
                  <Link
                    href={`/${locale}/applications/${app.slug}`}
                    className="group flex flex-col items-center gap-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-orange group-hover:text-orange">
                      <MaterialIcon slug={app.slug} />
                    </div>
                    <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-orange">
                      {app.title}
                    </span>
                  </Link>
                  {/* 副標 → 對應 solutions 長尾頁 */}
                  {solution && (
                    <Link
                      href={`/${locale}/solutions/${solution.slug}`}
                      className="text-xs text-white/40 underline-offset-2 transition-colors hover:text-orange hover:underline"
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

      {/* ── Section 5: Distributor Map Preview ──────────────── */}
      <section className="bg-navy-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Reveal stagger className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">{dict.home.mapEyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
                {dict.home.mapHeading}
              </h2>
              <p className="mt-5 leading-relaxed text-white/60">{dict.home.mapText}</p>
              <div className="mt-8">
                <CTAButton href={`/${locale}/distributors`} size="lg">
                  {dict.home.mapCta}
                </CTAButton>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8">
              <div className="grid grid-cols-2 gap-4">
                {distributorCountries.map((country) => (
                  <Link
                    key={country.countryCode}
                    href={`/${locale}/distributors`}
                    className="group flex items-center gap-3 rounded border border-white/10 px-4 py-3 transition-colors hover:border-orange"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange" />
                    <div>
                      <p className="text-sm font-semibold text-white transition-colors group-hover:text-orange">
                        {country.countryName}
                      </p>
                      <p className="text-xs text-white/40">{country.region}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Section 6: Quote CTA ────────────────────────────── */}
      <section className="bg-orange py-16 md:py-20">
        <Reveal className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            {dict.home.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{dict.home.ctaText}</p>
          <div className="mt-8">
            <CTAButton href={`/${locale}/contact`} variant="white" size="lg">
              {dict.home.ctaButton}
            </CTAButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

/* ─── Cutting method icons ────────────────────────────────── */

function MethodIcon({ slug }: { slug: string }) {
  const icons: Record<string, React.ReactNode> = {
    "score-cut": (
      // Circular blade pressing on anvil roller
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" />
        <circle cx="12" cy="9" r="1.5" />
        <path d="M3 19h18" />
      </svg>
    ),
    "shear-cut": (
      // Two offset blades (scissor action)
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="5.5" />
        <circle cx="15" cy="15" r="5.5" />
      </svg>
    ),
    "half-cut": (
      // Blade cutting partial depth into layered material
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v9" />
        <path d="M9 9l3 3 3-3" />
        <path d="M3 16h18" />
        <path d="M3 20h18" />
      </svg>
    ),
    "hot-cut": (
      // Heated blade with heat waves
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v10" />
        <path d="M8 6c0 2 1 2.5 1 4s-1 2-1 4" />
        <path d="M16 6c0 2-1 2.5-1 4s1 2 1 4" />
        <path d="M4 20h16" />
      </svg>
    ),
  };
  return <>{icons[slug]}</>;
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

  return <span className="text-white/60">{iconMap[slug] ?? fallback}</span>;
}
