import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PageShell from "@/components/PageShell";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchNews } from "@/lib/cms";
import { categoryLabel, formatDate } from "@/lib/format";

export const revalidate = 3600;

interface NewsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/news",
    title: dict.meta.news.title,
    description: dict.meta.news.description,
  });
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const articles = await fetchNews(lang);

  return (
    <PageShell
      title={dict.news.heading}
      breadcrumbs={[
        { label: dict.common.home, href: `/${lang}` },
        { label: dict.news.heading },
      ]}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/${lang}/news/${article.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            {/* Thumbnail placeholder */}
            <div className="flex h-44 items-center justify-center bg-bg-card">
              <span className="px-4 text-center text-sm text-text-secondary/40">
                {article.title}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-sm bg-orange-soft px-2 py-0.5 font-semibold text-orange">
                  {categoryLabel(article.category, dict)}
                </span>
                <time dateTime={article.publishedDate} className="text-text-secondary">
                  {formatDate(article.publishedDate, lang)}
                </time>
              </div>
              <h2 className="mt-3 text-lg font-bold leading-snug text-text-primary transition-colors group-hover:text-orange">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">
                  {article.excerpt}
                </p>
              )}
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-orange">
                {dict.news.readMore}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
