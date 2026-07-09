import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import BrandTimeline from "@/components/BrandTimeline";
import WhyMotoknife from "@/components/WhyMotoknife";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { EQUIPMENT, PATENTS } from "@/lib/about";

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
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="mb-8 text-sm text-text-secondary">
            <Link href={`/${lang}`} className="transition-colors hover:text-orange-text">{dict.common.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-text-primary">{dict.nav.about}</span>
          </nav>
          <h1 className="text-3xl font-medium text-text-primary md:text-[2.5rem]/[1.15]">
            About MOTOKNIFE
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-text-secondary">
            36 years. 50+ countries. All precision. All Taiwan.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-text-secondary">
            MOTOKNIFE (友聚工業股份有限公司) is a Taiwan-based manufacturer
            specializing in high-precision slitting knife holders and blades.
            Since 1990, we have been the trusted partner for converting
            companies worldwide — with the full process, from design to
            delivery, completed under one roof.
          </p>
        </div>
      </section>

      {/* Company Facts（AEO：事實密集、可直接提取的公司概述） */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
            Company Overview
          </h2>
          <div className="mt-8 max-w-3xl space-y-5 leading-relaxed text-text-secondary">
            <p>
              MOTOKNIFE (Moto Industries Co., Ltd.) has been manufacturing
              precision slitting knife holders and industrial cutting blades in
              Taoyuan, Taiwan since 1990. With over 36 years of experience, the
              company exports to more than 50 countries across Asia, Europe,
              the Americas, and the Middle East.
            </p>
            <p>
              All manufacturing processes — from design and CNC machining to
              assembly, quality inspection, and shipping — are completed
              in-house at the company&apos;s own facility. This vertically
              integrated approach ensures consistent quality control and
              reliable delivery times, with standard models dispatched within 3
              working days from warehouse stock.
            </p>
            <p>
              The factory operates Japanese Mazak CNC lathes and milling
              machines for precision component machining, complemented by
              robotic automation systems to maintain consistency across
              production runs. The facility also features a solar power
              generation system as part of the company&apos;s commitment to
              sustainable manufacturing.
            </p>
            <p>
              MOTOKNIFE offers a free material test and report service:
              customers can send a material sample and receive a comprehensive
              cutting test report within 3 working days, including recommended
              cutting method, suggested knife holder model, actual cut sample
              photographs, and test video footage.
            </p>
          </div>
        </div>
      </section>

      {/* Why MOTOKNIFE 信任數字（與首頁共用元件） */}
      <WhyMotoknife dict={dict} />

      {/* Brand Story Timeline */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <p className="eyebrow">Since 1990</p>
          <h2 className="mt-3 text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
            Innovation Milestones
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
              <h2 className="mt-2 text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
                All components designed, machined, and assembled in Taiwan
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                From raw bar stock to finished holder, every critical step
                happens under one roof in our Taoyuan factory. No outsourced
                machining, no drop-in imported parts — which is how we
                guarantee consistent quality and reliable delivery, year after
                year.
              </p>

              <div className="mt-8">
                <h3 className="text-sm font-medium uppercase tracking-wider text-text-secondary">
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

            {/* Neutral image slot — 工廠照到位後原位替換 */}
            <div aria-hidden className="h-72 rounded-lg bg-bg-tertiary lg:h-96" />
          </div>
        </div>
      </section>

      {/* Factory Equipment Showcase */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
            Inside the Factory
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
                {/* Neutral image slot — 設備照到位後原位替換 */}
                <div aria-hidden className="h-52 bg-bg-tertiary" />
                <figcaption className="p-5">
                  <p className="font-medium text-text-primary">{item.name}</p>
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
          <h2 className="text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
            Multi-Country Patents
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Innovation milestones registered across four countries — 36 years
            of original engineering, never imitation.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PATENTS.map((patent) => (
              <div key={patent.countryCode} className="rounded-lg border border-border p-6">
                <span className="text-3xl font-medium text-text-muted">
                  {patent.countryCode}
                </span>
                <h3 className="mt-2 font-medium text-text-primary">{patent.country}</h3>
                <p className="mt-1 text-sm text-text-secondary">{patent.title}</p>
                <p className="mt-3 text-xs text-text-secondary">{patent.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services & Support */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
            Services & Support
          </h2>
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
                <h3 className="text-lg font-medium text-text-primary">
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
          <h2 className="text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
            How We Work
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((item) => (
              <div key={item.step}>
                <span className="text-4xl font-medium text-text-muted">
                  {item.step}
                </span>
                <h3 className="mt-2 text-lg font-medium text-text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="bg-bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="text-2xl font-medium text-text-primary md:text-[2rem]/[1.2]">
            Global Distribution Network
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">
            MOTOKNIFE products are available worldwide through our network of
            authorized distributors and direct sales.
          </p>
          <Link
            href={`/${lang}/distributors`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-text underline-offset-4 transition-colors hover:underline"
          >
            {dict.nav.distributors}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA（深色收尾重心） */}
      <section className="relative overflow-hidden bg-hero-black py-16 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(244,121,32,0.12), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-medium text-white md:text-3xl">
            Partner With Us
          </h2>
          <p className="mt-4 text-white/60">
            Whether you need a standard product or a custom solution, our team
            is ready to help.
          </p>
          <Link
            href={`/${lang}/contact`}
            className="mt-8 inline-block rounded bg-orange px-10 py-3.5 text-sm font-medium text-white transition-colors hover:bg-orange-hover"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
