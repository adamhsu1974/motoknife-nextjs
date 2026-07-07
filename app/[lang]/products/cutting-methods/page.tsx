import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageShell from "@/components/PageShell";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";

const METHODS = [
  { name: "Score Cut", desc: "A circular blade scores the material against a hardened anvil roller, creating a clean separation." },
  { name: "Shear Cut", desc: "Two blades work like scissors, providing precise cuts for tougher materials like metallic foils." },
  { name: "Half Cut", desc: "The blade cuts through the top layer while leaving the backing material intact." },
  { name: "Hot Cut", desc: "A heated blade melts through synthetic materials, sealing edges to prevent fraying." },
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
        {METHODS.map((m) => (
          <div
            key={m.name}
            className="rounded-lg bg-white p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-text-primary">{m.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{m.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
