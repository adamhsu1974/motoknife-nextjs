import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageShell from "@/components/PageShell";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchProducts } from "@/lib/cms";

export const revalidate = 3600;

const METHODS = [
  { slug: "score-cut", name: "Score Cut", desc: "A circular blade scores the material against a hardened anvil roller, creating a clean separation." },
  { slug: "shear-cut", name: "Shear Cut", desc: "Two blades work like scissors, providing precise cuts for tougher materials like metallic foils." },
  { slug: "half-cut", name: "Half Cut", desc: "The blade cuts through the top layer while leaving the backing material intact." },
  { slug: "hot-cut", name: "Hot Cut", desc: "A heated blade melts through synthetic materials, sealing edges to prevent fraying." },
] as const;

interface CuttingMethodsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: CuttingMethodsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/products/cutting-methods",
    title: dict.meta.cuttingMethods.title,
    description: dict.meta.cuttingMethods.description,
  });
}

export default async function CuttingMethodsPage({ params }: CuttingMethodsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const products = await fetchProducts(lang);

  return (
    <PageShell
      title={dict.meta.cuttingMethods.title}
      breadcrumbs={[
        { label: dict.common.home, href: `/${lang}` },
        { label: dict.nav.products, href: `/${lang}/products` },
        { label: dict.common.cuttingMethods },
      ]}
    >
      <p className="mb-10 max-w-2xl text-text-secondary">
        Understanding the right cutting method is essential for achieving optimal results.
        Each method is suited for different materials and applications.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {METHODS.map((method) => {
          const methodProducts = products.filter((p) => p.cuttingMethod === method.slug);
          return (
            <div key={method.slug} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-text-primary">{method.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{method.desc}</p>

              {/* Products using this method（內部連結網絡） */}
              {methodProducts.length > 0 && (
                <div className="mt-5 border-t border-border pt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                    {dict.products.usingMethod}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {methodProducts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/${lang}/products/model/${p.slug}`}
                        className="rounded-sm bg-bg-card px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:bg-orange-soft hover:text-orange"
                      >
                        {p.model}
                      </Link>
                    ))}
                    <Link
                      href={`/${lang}/products/${method.slug}`}
                      className="rounded-sm px-2.5 py-1 text-xs font-semibold text-orange transition-colors hover:text-orange-hover"
                    >
                      {dict.common.viewSeries} →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
