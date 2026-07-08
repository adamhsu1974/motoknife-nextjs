import Link from "next/link";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

interface PageShellProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export default function PageShell({
  title,
  breadcrumbs,
  children,
}: PageShellProps) {
  return (
    <div className="bg-bg-secondary py-16 md:py-24">
      <BreadcrumbJsonLd
        items={breadcrumbs.map((b) => ({ name: b.label, path: b.href }))}
      />
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-secondary">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label}>
              {i > 0 && <span className="mx-2">/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-orange-text">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-text-primary">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-3xl font-medium text-text-primary md:text-[2.5rem]/[1.15]">
          {title}
        </h1>

        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
