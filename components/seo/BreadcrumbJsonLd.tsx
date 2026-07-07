const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "https://motoknife.com";

export interface BreadcrumbItem {
  name: string;
  /** 站內路徑（含語系前綴），最後一項可省略 */
  path?: string;
}

export default function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path && { item: `${SITE_URL}${item.path}` }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
