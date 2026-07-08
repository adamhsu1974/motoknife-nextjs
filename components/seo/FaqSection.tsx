interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  heading: string;
  items: FaqItem[];
  className?: string;
}

/** 頁面可見 FAQ（原生 details/summary）+ 同源 FAQPage JSON-LD，符合 Google 結構化資料規範 */
export default function FaqSection({ heading, items, className = "mt-16" }: FaqSectionProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-2xl font-medium text-text-primary">{heading}</h2>
      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg bg-white shadow-sm open:shadow-md"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-text-primary transition-colors hover:text-orange-text [&::-webkit-details-marker]:hidden">
              <h3 className="text-sm font-medium">{item.question}</h3>
              <span className="shrink-0 text-orange-text transition-transform group-open:rotate-45">
                <PlusIcon />
              </span>
            </summary>
            <p className="border-t border-border px-6 py-4 text-sm leading-relaxed text-text-secondary">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
