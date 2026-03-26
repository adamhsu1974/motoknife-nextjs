import Link from "next/link";
import HomeMethodTabs from "@/components/HomeMethodTabs";

const PRODUCT_CATEGORIES = [
  {
    href: "/products/score-cut",
    name: "Score Cut",
    description: "Precision score cutting knife holders for flexible films and paper.",
    materials: ["Plastic Film", "Paper", "Nonwoven"],
  },
  {
    href: "/products/shear-cut",
    name: "Shear Cut",
    description: "High-performance shear slitting for metallic foils and tough materials.",
    materials: ["Metallic Foil", "Plastic Film", "Paper"],
  },
  {
    href: "/products/half-cut",
    name: "Half Cut",
    description: "Controlled depth cutting for label and laminate applications.",
    materials: ["Labels", "Laminates"],
  },
  {
    href: "/products/hot-cut",
    name: "Hot Cut",
    description: "Thermal slitting for synthetic fabrics and heat-sealable materials.",
    materials: ["Nonwoven", "Synthetic Fabric"],
  },
  {
    href: "/products/knives",
    name: "Knives",
    description: "Precision slitting knives and score blades for all cutting methods.",
    materials: ["All Materials"],
  },
  {
    href: "/products/guide-bar",
    name: "Guide Bar",
    description: "High-rigidity guide bars for accurate knife positioning.",
    materials: ["Universal"],
  },
] as const;

const STATS = [
  { value: "±0.005mm", label: "Precision Tolerance" },
  { value: "30+", label: "Years Experience" },
  { value: "5", label: "Countries Served" },
  { value: "100+", label: "Products Available" },
] as const;

const APPLICATIONS = [
  { href: "/applications/plastic-film", name: "Plastic Film" },
  { href: "/applications/metallic-foil", name: "Metallic Foil" },
  { href: "/applications/rubber", name: "Rubber" },
  { href: "/applications/paper", name: "Paper" },
  { href: "/applications/nonwoven", name: "Nonwoven" },
] as const;

export default function Home() {
  return (
    <div>
      {/* Section 1: Hero */}
      <section className="flex min-h-[calc(100vh-56px)] items-center justify-center bg-hero-black">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-heading text-5xl font-bold tracking-tight text-white md:text-7xl">
            PRECISION SLITTING
            <br />
            <span className="text-orange">SOLUTIONS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
            Your Partner in High-Performance Flexible Material Converting
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="rounded bg-orange px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="rounded border border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/60"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Stats */}
      <section className="bg-[#1a1a1a] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 lg:px-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-orange md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Product Categories */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
              Our Products
            </h2>
            <div className="mt-3 h-1 w-16 bg-orange" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="group relative rounded-lg bg-bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-orange opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mb-4 flex h-40 items-center justify-center rounded bg-white">
                  <span className="text-4xl font-bold text-text-secondary/20">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {category.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.materials.map((material) => (
                    <span
                      key={material}
                      className="rounded-sm bg-white px-2 py-0.5 text-xs text-text-secondary"
                    >
                      {material}
                    </span>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange">
                  View Series
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Applications */}
      <section className="bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              What Are You Cutting?
            </h2>
            <div className="mt-3 h-1 w-16 bg-orange" />
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {APPLICATIONS.map((app) => (
              <Link
                key={app.href}
                href={app.href}
                className="group flex flex-col items-center gap-4 rounded-lg border border-white/10 p-6 text-center transition-all hover:border-orange hover:bg-white/5"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-orange group-hover:text-orange">
                  <MaterialIcon name={app.name} />
                </div>
                <span className="text-sm font-medium text-white/80 transition-colors group-hover:text-orange">
                  {app.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Cutting Methods */}
      <section className="bg-bg-warm py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
              Cutting Methods
            </h2>
            <div className="mt-3 h-1 w-16 bg-orange" />
          </div>
          <HomeMethodTabs />
        </div>
      </section>

      {/* Section 6: Brand Story */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image placeholder */}
            <div className="flex h-72 items-center justify-center rounded-lg bg-bg-card lg:h-96">
              <span className="text-lg text-text-secondary/40">
                Factory / CNC Photo
              </span>
            </div>
            {/* Text */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                Made in Taiwan
              </p>
              <h2 className="mt-2 text-3xl font-bold text-text-primary md:text-4xl">
                30+ Years of Precision Manufacturing
              </h2>
              <p className="mt-6 leading-relaxed text-text-secondary">
                MOTOKNIFE (友聚工業) specializes in high-precision slitting knife
                holders and blades, serving customers across Asia, Europe, and
                the Americas. Our MAZAK CNC multi-tasking turning centers ensure
                ±0.005mm tolerance on every product.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-orange transition-colors hover:text-orange-hover"
              >
                Learn About Us
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Bottom CTA */}
      <section className="bg-orange py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to Find the Right Cutting Solution?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Tell us your material and we&apos;ll recommend the perfect knife
            holder for your application.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded bg-white px-10 py-3.5 text-sm font-semibold text-orange transition-colors hover:bg-white/90"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ─── Material Icons ──────────────────────────────────────── */

function MaterialIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    "Plastic Film": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <path d="M2 9h20" />
      </svg>
    ),
    "Metallic Foil": (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    Rubber: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    Paper: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="12" y2="17" />
      </svg>
    ),
    Nonwoven: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h18v18H3z" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
  };

  return <span className="text-white/60">{iconMap[name]}</span>;
}
