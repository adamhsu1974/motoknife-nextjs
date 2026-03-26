import type { ProductSeries } from "@/lib/data/products";

interface ProductJsonLdProps {
  series: ProductSeries;
}

export default function ProductJsonLd({ series }: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: series.fullName,
    brand: {
      "@type": "Brand",
      name: "MOTOKNIFE",
    },
    manufacturer: {
      "@type": "Organization",
      name: "友聚工業股份有限公司",
      url: "https://motoknife.com",
    },
    description: series.description,
    category: "Industrial Slitting Equipment",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: {
        "@type": "Organization",
        name: "MOTOKNIFE",
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
