import Link from "next/link";
import type { ApplicationMaterial } from "@/lib/data/applications";
import type { Locale } from "@/lib/i18n/config";

interface ApplicationPageProps {
  material: ApplicationMaterial;
  lang: Locale;
}

export default function ApplicationPage({ material, lang }: ApplicationPageProps) {
  return (
    <div className="bg-bg-warm py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-secondary">
          <Link href={`/${lang}`} className="hover:text-orange">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${lang}/applications`} className="hover:text-orange">Applications</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{material.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* Header */}
            <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
              <h1 className="text-2xl font-bold text-text-primary md:text-3xl">
                {material.name}
              </h1>
              <p className="mt-1 text-text-secondary">{material.tagline}</p>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {material.description}
              </p>

              {/* Recommended Method */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-text-secondary">
                  Recommended:
                </span>
                <Link
                  href={`/${lang}/products/cutting-methods`}
                  className="rounded-sm bg-orange/10 px-3 py-1.5 text-sm font-semibold text-orange"
                >
                  {material.recommendedMethod}
                </Link>
                {material.alternativeMethod && (
                  <>
                    <span className="text-xs text-text-secondary">or</span>
                    <Link
                      href={`/${lang}/products/cutting-methods`}
                      className="rounded-sm bg-navy/5 px-3 py-1.5 text-sm font-medium text-navy"
                    >
                      {material.alternativeMethod}
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Material Characteristics */}
            <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-lg font-bold text-text-primary">
                Material Characteristics
              </h2>
              <ul className="mt-4 space-y-2">
                {material.characteristics.map((char) => (
                  <li key={char} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Products */}
            <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-lg font-bold text-text-primary">
                Recommended Products
              </h2>
              <div className="mt-4 space-y-4">
                {material.products.map((product) => (
                  <div
                    key={product.name}
                    className="flex flex-col gap-3 rounded border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-primary">
                          {product.name}
                        </span>
                        <span className="rounded-sm bg-bg-card px-2 py-0.5 text-xs text-text-secondary">
                          {product.series}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-text-secondary">
                        {product.reason}
                      </p>
                    </div>
                    <Link
                      href={`/${lang}${product.href}`}
                      className="shrink-0 rounded bg-orange px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                    >
                      View Product
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries */}
            <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-lg font-bold text-text-primary">
                Common Industries
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {material.industries.map((ind) => (
                  <span
                    key={ind}
                    className="rounded-sm bg-bg-card px-3 py-1.5 text-sm text-text-primary"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Quote CTA */}
              <div className="rounded-lg bg-navy p-6 text-white">
                <h3 className="text-lg font-bold">
                  Cutting {material.name}?
                </h3>
                <p className="mt-2 text-sm text-white/70">
                  Tell us your specifications and we&apos;ll recommend the
                  optimal setup for your {material.name.toLowerCase()} application.
                </p>
                <Link
                  href={`/${lang}/contact`}
                  className="mt-5 block rounded bg-orange py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                >
                  Get a Recommendation
                </Link>
              </div>

              {/* Other Materials */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Other Materials
                </h3>
                <ul className="mt-3 space-y-2">
                  {["plastic-film", "metallic-foil", "rubber", "paper", "nonwoven"]
                    .filter((s) => s !== material.slug)
                    .map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/${lang}/applications/${slug}`}
                          className="text-sm text-text-secondary transition-colors hover:text-orange"
                        >
                          {slug
                            .split("-")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(" ")}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
