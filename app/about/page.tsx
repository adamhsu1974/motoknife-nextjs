import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About MOTOKNIFE",
  description:
    "友聚工業股份有限公司 — 30+ years of precision slitting knife manufacturing in Taiwan. ±0.005mm tolerance, serving 5 countries worldwide.",
};

const STRENGTHS = [
  {
    title: "Precision Manufacturing",
    value: "±0.005mm",
    description:
      "Every knife holder is manufactured to ±0.005mm tolerance using MAZAK CNC multi-tasking turning centers.",
  },
  {
    title: "30+ Years Experience",
    value: "Since 1990s",
    description:
      "Three decades of continuous innovation in slitting technology, serving customers worldwide.",
  },
  {
    title: "Complete Product Line",
    value: "100+",
    description:
      "Full range of Score Cut, Shear Cut, Half Cut, Hot Cut holders, blades, and guide bars.",
  },
  {
    title: "Global Reach",
    value: "5 Countries",
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

const DISTRIBUTORS = [
  { country: "Germany", region: "Europe" },
  { country: "Netherlands", region: "Europe" },
  { country: "India", region: "Asia" },
  { country: "Chile", region: "Americas" },
  { country: "Russia", region: "Europe / Asia" },
] as const;

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="mb-8 text-sm text-white/40">
            <Link href="/" className="hover:text-white/70">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">About</span>
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            About MOTOKNIFE
          </h1>
          <div className="mt-3 h-1 w-16 bg-orange" />
          <p className="mt-6 max-w-2xl text-lg text-white/60">
            友聚工業股份有限公司
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/50">
            MOTOKNIFE is a Taiwan-based manufacturer specializing in
            high-precision slitting knife holders and blades. For over 30 years,
            we have been the trusted partner for converting companies worldwide,
            delivering cutting solutions with ±0.005mm tolerance.
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

      {/* Manufacturing */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="flex h-72 items-center justify-center rounded-lg bg-bg-card lg:h-96">
              <span className="text-lg text-text-secondary/30">
                Factory Photo
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                Manufacturing Excellence
              </p>
              <h2 className="mt-2 text-2xl font-bold text-text-primary md:text-3xl">
                Made in Taiwan
              </h2>
              <p className="mt-4 leading-relaxed text-text-secondary">
                Our manufacturing facility is equipped with advanced CNC
                machining centers from MAZAK, enabling us to produce knife
                holders and blades with exceptional precision and consistency.
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

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {DISTRIBUTORS.map((d) => (
              <div
                key={d.country}
                className="rounded-lg bg-white p-5 text-center shadow-sm"
              >
                <p className="text-lg font-bold text-text-primary">
                  {d.country}
                </p>
                <p className="mt-1 text-xs text-text-secondary">{d.region}</p>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="mt-10 flex h-64 items-center justify-center rounded-lg bg-white shadow-sm">
            <span className="text-text-secondary/30">World Map</span>
          </div>
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
            href="/contact"
            className="mt-8 inline-block rounded bg-white px-10 py-3.5 text-sm font-semibold text-orange transition-colors hover:bg-white/90"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
