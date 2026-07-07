import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BrandTimeline from "@/components/BrandTimeline";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { EQUIPMENT, PATENTS } from "@/lib/about";

const STRENGTHS = [
  {
    title: "Precision Manufacturing",
    value: "±0.005mm",
    description:
      "Every knife holder is manufactured to ±0.005mm tolerance using MAZAK CNC multi-tasking turning centers.",
  },
  {
    title: "35 Years Experience",
    value: "Since 1990",
    description:
      "Three and a half decades of continuous innovation in slitting technology, serving customers worldwide.",
  },
  {
    title: "Complete Product Line",
    value: "100+",
    description:
      "Full range of Score Cut, Shear Cut, Half Cut, Hot Cut holders, blades, and guide bars.",
  },
  {
    title: "Global Reach",
    value: "50+ Countries",
    description:
      "Distribution network spanning Asia, Europe, and the Americas with local support.",
  },
] as const;

const CAPABILITIES = [
  "MAZAK CNC Multi-Tasking Turning Centers",
  "CNC Cylindrical Grinding",
  "CNC Surface Grinding",
  "Wire EDM Machining",
  "Precision Measurement (CMM)",
  "In-house Heat Treatment",
] as const;

const SERVICES = [
  {
    title: "Technical Consultation",
    description:
      "Our engineers analyze your material, speed, and quality requirements to recommend the optimal cutting solution. Free consultation for new customers.",
  },
  {
    title: "Sample Testing",
    description:
      "Send us your material samples and we'll test with different knife holders to find the best setup. Detailed test reports provided.",
  },
  {
    title: "Knife Regrinding",
    description:
      "Professional blade regrinding service to restore cutting performance. We regrind score blades, shear knives, and specialty blades to original specifications.",
  },
  {
    title: "On-site Maintenance",
    description:
      "Our technicians can visit your facility to inspect, calibrate, and maintain your slitting systems. Available for customers in Asia and select international locations.",
  },
  {
    title: "Custom Engineering",
    description:
      "Need a non-standard solution? We design and manufacture custom knife holders, blades, and guide bars to your exact specifications using MAZAK CNC centers.",
  },
  {
    title: "Spare Parts & Accessories",
    description:
      "Quick delivery of replacement blades, bearings, seals, air fittings, and other consumable parts. We stock common parts for fast turnaround.",
  },
] as const;

const PROCESS_STEPS = [
  { step: "01", title: "Contact Us", desc: "Tell us your material, speed, and quality requirements." },
  { step: "02", title: "Analysis", desc: "Our team analyzes your needs and recommends the best solution." },
  { step: "03", title: "Testing", desc: "We test with your material samples to validate performance." },
  { step: "04", title: "Delivery", desc: "Production, quality inspection, and worldwide shipping." },
] as const;

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.nav.about },
        ]}
      />
      {/* Hero */}
      <section className="bg-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="mb-8 text-sm text-white/40">
            <Link href={`/${lang}`} className="hover:text-white/70">{dict.common.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{dict.nav.about}</span>
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            About MOTOKNIFE
          </h1>
          <div className="mt-3 h-1 w-16 bg-orange" />
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            35 years. 50+ countries. All precision. All Taiwan.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/50">
            MOTOKNIFE (友聚工業股份有限公司) is a Taiwan-based manufacturer
            specializing in high-precision slitting knife holders and blades.
            Since 1990, we have been the trusted partner for converting
            companies worldwide, delivering cutting solutions with ±0.005mm
            tolerance.
          </p>
        </div>
      </section>

      {/* Strengths */}
      <section className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STRENGTHS.map((s) => (
              <div key={s.title} className="rounded-lg bg-white p-6 shadow-sm">
                <p className="font-heading text-2xl font-bold text-orange">
                  {s.value}
                </p>
                <h2 className="mt-2 text-lg font-bold text-text-primary">
                  {s.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Timeline */}
      <section className="bg-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">Since 1990</p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Our Story
          </h2>
          <div className="mt-10" data-timeline>
            <BrandTimeline />
          </div>
        </div>
      </section>

      {/* Vertical Integration */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Vertical Integration</p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">
                All components designed, machined, and assembled in Taiwan
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                From raw bar stock to finished holder, every critical step
                happens under one roof in our Taoyuan factory. No outsourced
                machining, no drop-in imported parts — which is how we
                guarantee ±0.005mm tolerance and consistent quality on every
                delivery, year after year.
              </p>

              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Equipment & Capabilities
                </h3>
                <ul className="mt-4 space-y-2">
                  {CAPABILITIES.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-2 text-sm text-text-primary"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="flex h-72 items-center justify-center rounded-lg bg-bg-card lg:h-96">
              <span className="text-lg text-text-secondary/30">
                Factory Photo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Equipment Showcase */}
      <section className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="heading-accent text-2xl font-bold text-text-primary md:text-3xl">
            Inside the Factory
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="flex h-52 items-center justify-center bg-bg-card">
                  <span className="text-sm text-text-secondary/40">
                    {item.name} Photo
                  </span>
                </div>
                <figcaption className="p-5">
                  <p className="font-semibold text-text-primary">{item.name}</p>
                  <p className="mt-1 text-sm text-text-secondary">{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Patents */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="heading-accent text-2xl font-bold text-text-primary md:text-3xl">
            Multi-Country Patents
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Original engineering protected in four countries — the difference
            between a 35-year manufacturer and an imitation.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PATENTS.map((patent) => (
              <div key={patent.countryCode} className="rounded-lg border border-border p-6">
                <span className="font-heading text-3xl font-bold text-orange/30">
                  {patent.countryCode}
                </span>
                <h3 className="mt-2 font-bold text-text-primary">{patent.country}</h3>
                <p className="mt-1 text-sm text-text-secondary">{patent.title}</p>
                <p className="mt-3 text-xs text-text-secondary/70">{patent.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="heading-accent text-2xl font-bold text-text-primary md:text-3xl">
            Certifications
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {["Certification 1", "Certification 2", "Certification 3", "Certification 4"].map(
              (label) => (
                <div
                  key={label}
                  className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border bg-white"
                >
                  <span className="text-sm text-text-secondary/40">
                    {label} — document placeholder
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Services & Support */}
      <section className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
            Services & Support
          </h2>
          <div className="mt-3 h-1 w-16 bg-orange" />
          <p className="mt-4 max-w-2xl text-text-secondary">
            Beyond manufacturing precision cutting tools, MOTOKNIFE provides
            comprehensive technical support throughout the lifecycle of your
            equipment.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
            How We Work
          </h2>
          <div className="mt-3 h-1 w-16 bg-orange" />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item) => (
              <div key={item.step}>
                <span className="font-heading text-4xl font-bold text-orange/20">
                  {item.step}
                </span>
                <h3 className="mt-2 text-lg font-bold text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
            Global Distribution Network
          </h2>
          <div className="mt-3 h-1 w-16 bg-orange" />
          <p className="mt-4 max-w-2xl text-text-secondary">
            MOTOKNIFE products are available worldwide through our network of
            authorized distributors and direct sales.
          </p>
          <Link
            href={`/${lang}/distributors`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange transition-colors hover:text-orange-hover"
          >
            {dict.nav.distributors}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Partner With Us
          </h2>
          <p className="mt-4 text-white/80">
            Whether you need a standard product or a custom solution, our team
            is ready to help.
          </p>
          <Link
            href={`/${lang}/contact`}
            className="mt-8 inline-block rounded bg-white px-10 py-3.5 text-sm font-semibold text-orange transition-colors hover:bg-white/90"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
