import Link from "next/link";
import type { ProductSeries } from "@/lib/data/products";
import ProductJsonLd from "@/components/ProductJsonLd";

interface ProductSeriesPageProps {
  series: ProductSeries;
}

export default function ProductSeriesPage({ series }: ProductSeriesPageProps) {
  return (
    <>
      <ProductJsonLd series={series} />
      <div className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-secondary">
          <Link href="/" className="hover:text-orange">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-orange">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-text-primary">{series.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Series Header */}
            <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
              {/* Image placeholder */}
              <div className="mb-6 flex h-48 items-center justify-center rounded bg-bg-card md:h-64">
                <span className="text-lg text-text-secondary/30">
                  {series.name} Product Photo
                </span>
              </div>

              <span className="inline-block rounded-sm bg-orange/10 px-2.5 py-1 text-xs font-medium text-orange">
                {series.cuttingMethod}
              </span>
              <h1 className="mt-3 text-2xl font-bold text-text-primary md:text-3xl">
                {series.fullName}
              </h1>
              <p className="mt-2 text-text-secondary">{series.tagline}</p>
              <p className="mt-4 leading-relaxed text-text-secondary">
                {series.description}
              </p>

              {/* Key Specs */}
              <div className="mt-8 grid grid-cols-2 gap-4 rounded-lg bg-bg-card p-5 sm:grid-cols-3 md:grid-cols-5">
                {series.keySpecs.map((spec) => (
                  <div key={spec.label} className="text-center">
                    <p className="text-lg font-bold text-text-primary">
                      {spec.value}
                    </p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {spec.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Suitable Materials */}
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Suitable Materials
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {series.materials.map((mat) => (
                    <span
                      key={mat}
                      className="rounded-sm bg-bg-card px-3 py-1.5 text-sm text-text-primary"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="mt-8">
              <h2 className="mb-6 text-xl font-bold text-text-primary">
                Available Models
              </h2>
              <div className="space-y-4">
                {series.products.map((product) => (
                  <div
                    key={product.model}
                    className="rounded-lg bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-text-primary">
                          {product.model}
                        </h3>
                        <p className="mt-1 text-sm text-text-secondary">
                          {product.description}
                        </p>
                      </div>
                      <Link
                        href={`/contact?product=${product.model}`}
                        className="shrink-0 rounded bg-orange px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                      >
                        Get a Quote
                      </Link>
                    </div>

                    {/* Specs Table */}
                    <table className="mt-4 w-full text-sm">
                      <tbody>
                        {product.specs.map((spec, i) => (
                          <tr
                            key={spec.label}
                            className={i % 2 === 0 ? "bg-bg-card" : ""}
                          >
                            <td className="px-3 py-2 font-medium text-text-secondary">
                              {spec.label}
                            </td>
                            <td className="px-3 py-2 text-text-primary">
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Quote CTA */}
            <div className="sticky top-20 space-y-6">
              <div className="rounded-lg bg-navy p-6 text-white">
                <h3 className="text-lg font-bold">Need Help Choosing?</h3>
                <p className="mt-2 text-sm text-white/70">
                  Tell us your material and application. We&apos;ll recommend
                  the right {series.name} holder for you.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 block rounded bg-orange py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
                >
                  Get a Quote
                </Link>
              </div>

              {/* Related Series */}
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Other Series
                </h3>
                <ul className="mt-3 space-y-2">
                  {["score-cut", "shear-cut", "half-cut", "hot-cut", "knives", "guide-bar"]
                    .filter((s) => s !== series.slug)
                    .map((slug) => (
                      <li key={slug}>
                        <Link
                          href={`/products/${slug}`}
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
    </>
  );
}
