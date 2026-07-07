import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContactForm, { PRODUCT_TYPE_LABELS } from "@/components/ContactForm";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchApplications, fetchDistributorCountries, fetchProducts } from "@/lib/cms";

export const revalidate = 3600;

const TYPE_BY_METHOD: Record<string, string> = {
  "score-cut": PRODUCT_TYPE_LABELS[0],
  "shear-cut": PRODUCT_TYPE_LABELS[1],
  "half-cut": PRODUCT_TYPE_LABELS[2],
  "hot-cut": PRODUCT_TYPE_LABELS[3],
};

interface ContactPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/contact",
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const [applications, distributorCountries, products] = await Promise.all([
    fetchApplications(lang),
    fetchDistributorCountries(lang),
    fetchProducts(lang),
  ]);

  const productTypeByModel = Object.fromEntries(
    products.map((p) => [
      p.model,
      p.cuttingMethod
        ? (TYPE_BY_METHOD[p.cuttingMethod] ?? "")
        : p.productType === "knife"
          ? PRODUCT_TYPE_LABELS[4]
          : p.productType === "guide-bar"
            ? PRODUCT_TYPE_LABELS[5]
            : "",
    ]),
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.nav.contact },
        ]}
      />
      <Suspense>
        <ContactForm
          lang={lang}
          dict={dict}
          materialOptions={applications.map((a) => a.title)}
          distributorCountries={distributorCountries}
          productTypeByModel={productTypeByModel}
        />
      </Suspense>
    </>
  );
}
