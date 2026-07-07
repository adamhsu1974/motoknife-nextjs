import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageShell from "@/components/PageShell";
import ProductCatalog from "@/components/ProductCatalog";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { PRODUCT_SERIES } from "@/lib/data/products";

interface ProductsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ProductsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/products",
    title: dict.meta.products.title,
    description: dict.meta.products.description,
  });
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  const accessories = PRODUCT_SERIES.filter(
    (s) => s.slug === "knives" || s.slug === "guide-bar",
  );

  return (
    <PageShell
      title={dict.meta.products.title}
      breadcrumbs={[
        { label: dict.common.home, href: `/${lang}` },
        { label: dict.nav.products },
      ]}
    >
      <ProductCatalog lang={lang} dict={dict} />

      {/* Blades & Guide Bars */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-text-primary">
          {dict.products.accessoriesHeading}
        </h2>
        <p className="mt-2 text-text-secondary">{dict.products.accessoriesSub}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {accessories.map((s) => (
            <Link
              key={s.slug}
              href={`/${lang}/products/${s.slug}`}
              className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-text-primary">{s.fullName}</h3>
              <p className="mt-1 text-sm text-text-secondary">{s.tagline}</p>
              <span className="mt-3 inline-block text-sm font-medium text-orange">
                {dict.common.viewSeries} →
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Cutting Methods knowledge link */}
      <div className="mt-12 rounded-lg bg-navy p-8 text-white">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold">{dict.common.cuttingMethods}</h2>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Not sure which cutting method fits your material? Learn how Score
              Cut, Shear Cut, Half Cut, and Hot Cut work.
            </p>
          </div>
          <Link
            href={`/${lang}/products/cutting-methods`}
            className="shrink-0 rounded bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-hover"
          >
            {dict.common.learnMore}
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
