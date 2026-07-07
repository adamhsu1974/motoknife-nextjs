import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContactForm from "@/components/ContactForm";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";

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
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.nav.contact },
        ]}
      />
      <Suspense>
        <ContactForm lang={lang} dict={dict} />
      </Suspense>
    </>
  );
}
