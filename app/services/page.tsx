import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services & Support",
  description:
    "MOTOKNIFE technical services: consultation, sample testing, knife regrinding, on-site maintenance, and custom engineering.",
};

const SERVICES = [
  {
    title: "Technical Consultation",
    icon: "consult",
    description:
      "Our engineers analyze your material, speed, and quality requirements to recommend the optimal cutting solution. Free consultation for new customers.",
  },
  {
    title: "Sample Testing",
    icon: "test",
    description:
      "Send us your material samples and we'll test with different knife holders to find the best setup. Detailed test reports provided.",
  },
  {
    title: "Knife Regrinding",
    icon: "regrind",
    description:
      "Professional blade regrinding service to restore cutting performance. We regrind score blades, shear knives, and specialty blades to original specifications.",
  },
  {
    title: "On-site Maintenance",
    icon: "maintenance",
    description:
      "Our technicians can visit your facility to inspect, calibrate, and maintain your slitting systems. Available for customers in Asia and select international locations.",
  },
  {
    title: "Custom Engineering",
    icon: "custom",
    description:
      "Need a non-standard solution? We design and manufacture custom knife holders, blades, and guide bars to your exact specifications using MAZAK CNC centers.",
  },
  {
    title: "Spare Parts & Accessories",
    icon: "spare",
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

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <nav className="mb-8 text-sm text-white/40">
            <Link href="/" className="hover:text-white/70">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">Services</span>
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Services & Support
          </h1>
          <div className="mt-3 h-1 w-16 bg-orange" />
          <p className="mt-6 max-w-2xl text-white/60">
            Beyond manufacturing precision cutting tools, MOTOKNIFE provides
            comprehensive technical support to ensure optimal performance
            throughout the lifecycle of your equipment.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="rounded-lg bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded bg-orange/10 text-orange">
                  <ServiceIcon name={service.icon} />
                </div>
                <h2 className="mt-4 text-lg font-bold text-text-primary">
                  {service.title}
                </h2>
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

      {/* CTA */}
      <section className="bg-orange py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Need Technical Support?
          </h2>
          <p className="mt-4 text-white/80">
            Our engineering team is ready to help you find the right cutting solution.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded bg-white px-10 py-3.5 text-sm font-semibold text-orange transition-colors hover:bg-white/90"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── Service Icons ───────────────────────────────────────── */

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    consult: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    test: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6v2H9zM12 5v6" />
        <path d="M8 11l-3 9h14l-3-9z" />
      </svg>
    ),
    regrind: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 2v6h-6" />
        <path d="M2.5 22v-6h6" />
        <path d="M21.5 8A10 10 0 0 0 5 5.3L2.5 8" />
        <path d="M2.5 16a10 10 0 0 0 16.5 2.7l2.5-2.7" />
      </svg>
    ),
    maintenance: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    custom: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    spare: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}
