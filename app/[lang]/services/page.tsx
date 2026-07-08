import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Link from "next/link";

import CTAButton from "@/components/CTAButton";
import PageShell from "@/components/PageShell";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchApplications } from "@/lib/cms";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

interface ServicesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/services",
    title: dict.meta.services.title,
    description: dict.meta.services.description,
  });
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = getDictionary(locale);
  const s = dict.services;
  const applications = await fetchApplications(locale);

  return (
    <PageShell
      title={dict.meta.services.title}
      breadcrumbs={[
        { label: dict.common.home, href: `/${locale}` },
        { label: dict.nav.services },
      ]}
    >
      <ServicesJsonLd dict={dict} lang={locale} />
      <MaterialTestHowToJsonLd />

      {/* ── 1. Test & Report（旗艦，視覺最突出） ─────────────── */}
      <section className="overflow-hidden rounded-lg bg-navy text-white">
        <div className="h-1.5 bg-gradient-to-r from-orange via-orange to-orange/40" />
        <div className="p-8 md:p-12">
          <p className="eyebrow">{s.test.eyebrow}</p>
          <h2 className="mt-3 max-w-2xl text-2xl font-bold md:text-4xl">
            {s.test.heading}
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/60">{s.test.sub}</p>

          {/* 三步驟流程 */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {s.test.steps.map((step, i) => (
              <div key={step} className="relative rounded-lg border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange font-heading text-lg font-bold text-white">
                  {i + 1}
                </div>
                <p className="mt-4 font-semibold">{step}</p>
                {i < 2 && (
                  <span
                    aria-hidden
                    className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-white/30 md:block"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* 報告內容 */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              {s.test.reportHeading}
            </h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {s.test.reportItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/20 text-xs text-orange">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 常見測試材料（內部連結 → Applications） */}
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              {s.test.materialsHeading}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {applications.map((app) => (
                <Link
                  key={app.slug}
                  href={`/${locale}/applications/${app.slug}`}
                  className="rounded-sm border border-white/20 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-orange hover:text-orange"
                >
                  {app.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <CTAButton href={`/${locale}/contact?topic=material-test`} size="lg">
              {s.test.cta}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ── 2–4. 其他服務 ────────────────────────────────────── */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <ServiceCard
          icon={<RegrindIcon />}
          title={s.regrinding.title}
          cta={s.regrinding.cta}
          href={`/${locale}/contact?topic=regrinding`}
        >
          <p className="text-sm leading-relaxed text-text-secondary">{s.regrinding.text}</p>
        </ServiceCard>

        <ServiceCard
          icon={<WrenchIcon />}
          title={s.repair.title}
          cta={s.repair.cta}
          href={`/${locale}/contact?topic=repair`}
        >
          <p className="text-sm leading-relaxed text-text-secondary">{s.repair.text}</p>
        </ServiceCard>

        <ServiceCard
          icon={<ConsultIcon />}
          title={s.consulting.title}
          cta={s.consulting.cta}
          href={`/${locale}/contact?topic=consulting`}
        >
          <ul className="space-y-2">
            {s.consulting.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                {item}
              </li>
            ))}
          </ul>
        </ServiceCard>
      </div>
    </PageShell>
  );
}

/* ─── Sub-components ──────────────────────────────────────── */

function ServiceCard({
  icon,
  title,
  cta,
  href,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  cta: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-lg bg-white p-6 shadow-sm md:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-soft text-orange">
        {icon}
      </div>
      <h2 className="mt-5 text-lg font-bold text-text-primary">{title}</h2>
      <div className="mt-3 flex-1">{children}</div>
      <div className="mt-6">
        <CTAButton href={href} variant="outline-dark" size="sm">
          {cta}
        </CTAButton>
      </div>
    </div>
  );
}

/* ─── Service JSON-LD ─────────────────────────────────────── */

function ServicesJsonLd({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const provider = {
    "@type": "Organization",
    name: "MOTOKNIFE",
    url: SITE_URL,
  };
  const services = [
    { name: dict.services.test.heading, description: dict.services.test.sub },
    { name: dict.services.regrinding.title, description: dict.services.regrinding.text },
    { name: dict.services.repair.title, description: dict.services.repair.text },
    { name: dict.services.consulting.title, description: dict.services.consulting.items.join("; ") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider,
      areaServed: "Worldwide",
      url: `${SITE_URL}/${lang}/services`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── HowTo JSON-LD（Free Material Test & Report 流程） ────── */

function MaterialTestHowToJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to get a free material test report from MOTOKNIFE",
    description:
      "Send your material sample to MOTOKNIFE and receive a comprehensive test report with recommended cutting method, blade type, and actual cut sample photos within 3 working days.",
    totalTime: "P3D",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Contact us",
        text: "Reach out via WhatsApp, email, or contact form to describe your material and cutting requirements.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Send material sample",
        text: "Ship a small sample of your material to our Taoyuan, Taiwan facility.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Receive test report",
        text: "Within 3 working days, receive a detailed report including recommended cutting method, suggested knife holder model, actual cut sample photos, and test video.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── Icons ───────────────────────────────────────────────── */

function RegrindIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6" />
      <path d="M2.5 22v-6h6" />
      <path d="M21.5 8A10 10 0 0 0 5 5.3L2.5 8" />
      <path d="M2.5 16a10 10 0 0 0 16.5 2.7l2.5-2.7" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function ConsultIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
    </svg>
  );
}
