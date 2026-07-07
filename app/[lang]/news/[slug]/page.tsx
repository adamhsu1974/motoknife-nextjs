import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import LexicalContent from "@/components/LexicalContent";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { pageMetadata } from "@/lib/i18n/metadata";
import { fetchArticleBySlug, fetchNews } from "@/lib/cms";
import { populated } from "@/lib/relations";
import { extractHeadings } from "@/lib/lexical";
import { categoryLabel, formatDate } from "@/lib/format";
import { FAMILY_TIER_LABELS } from "@/lib/series";
import type { News, Product } from "@/lib/payload-types";

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

interface ArticlePageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = await fetchNews("en");
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const article = await fetchArticleBySlug(lang, slug);
  if (!article) return {};
  return pageMetadata({
    lang,
    path: `/news/${article.slug}`,
    title: article.title,
    description: article.excerpt ?? article.title,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const article = await fetchArticleBySlug(lang, slug);
  if (!article) notFound();
  const dict = getDictionary(lang);

  const allArticles = await fetchNews(lang);
  const related = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);
  const relatedProducts = populated<Product>(article.relatedProducts);
  const toc = extractHeadings(article.content);

  return (
    <>
      <ArticleJsonLd article={article} lang={lang} />
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: `/${lang}` },
          { name: dict.news.heading, path: `/${lang}/news` },
          { name: article.title },
        ]}
      />
      <div className="bg-bg-warm py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-secondary">
            <Link href={`/${lang}`} className="hover:text-orange">{dict.common.home}</Link>
            <span className="mx-2">/</span>
            <Link href={`/${lang}/news`} className="hover:text-orange">
              {dict.news.heading}
            </Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1 inline text-text-primary">{article.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-3">
            {/* Article */}
            <article className="lg:col-span-2">
              <div className="rounded-lg bg-white p-6 shadow-sm md:p-10">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-sm bg-orange-soft px-2 py-0.5 font-semibold text-orange">
                    {categoryLabel(article.category, dict)}
                  </span>
                  <time dateTime={article.publishedDate} className="text-text-secondary">
                    {formatDate(article.publishedDate, lang)}
                  </time>
                </div>

                <h1 className="mt-4 text-2xl font-bold leading-tight text-text-primary md:text-3xl">
                  {article.title}
                </h1>
                {article.excerpt && (
                  <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                    {article.excerpt}
                  </p>
                )}

                {/* Cover placeholder */}
                <div className="mt-8 flex h-64 items-center justify-center rounded bg-bg-card md:h-80">
                  <span className="px-4 text-center text-sm text-text-secondary/40">
                    {article.title}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-10">
                  <LexicalContent data={article.content} className="space-y-5" />
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* TOC */}
                {toc.length > 0 && (
                  <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                      {dict.news.toc}
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {toc.map((entry) => (
                        <li key={entry.id}>
                          <a
                            href={`#${entry.id}`}
                            className="text-sm text-text-secondary transition-colors hover:text-orange"
                          >
                            {entry.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related products */}
                {relatedProducts.length > 0 && (
                  <div className="rounded-lg bg-navy p-6 text-white">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                      {dict.news.relatedProducts}
                    </h2>
                    <ul className="mt-3 space-y-2">
                      {relatedProducts.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/${lang}/products/model/${p.slug}`}
                            className="group flex items-baseline justify-between gap-2 text-sm"
                          >
                            <span className="font-medium text-white transition-colors group-hover:text-orange">
                              {p.model}
                            </span>
                            <span className="text-xs text-white/50">
                              {p.familyTier
                                ? (FAMILY_TIER_LABELS[p.familyTier] ?? p.familyTier)
                                : ""}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related articles */}
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">
                    {dict.news.related}
                  </h2>
                  <ul className="mt-3 space-y-4">
                    {related.map((a) => (
                      <li key={a.slug}>
                        <Link href={`/${lang}/news/${a.slug}`} className="group block">
                          <p className="text-sm font-medium leading-snug text-text-primary transition-colors group-hover:text-orange">
                            {a.title}
                          </p>
                          <time
                            dateTime={a.publishedDate}
                            className="mt-1 block text-xs text-text-secondary"
                          >
                            {formatDate(a.publishedDate, lang)}
                          </time>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${lang}/news`}
                    className="mt-4 inline-block text-sm font-semibold text-orange transition-colors hover:text-orange-hover"
                  >
                    {dict.news.backToNews} →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Article JSON-LD ─────────────────────────────────────── */

function ArticleJsonLd({ article, lang }: { article: News; lang: Locale }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt ?? article.title,
    datePublished: article.publishedDate,
    dateModified: article.updatedAt,
    image: `${SITE_URL}/og-default.png`,
    inLanguage: lang === "zh-tw" ? "zh-TW" : "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/news/${article.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "MOTOKNIFE",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "MOTOKNIFE",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-default.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
