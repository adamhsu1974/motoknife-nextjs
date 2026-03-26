import Link from "next/link";

const FOOTER_NAV = [
  {
    title: "Products",
    links: [
      { href: "/products/score-cut", label: "Score Cut" },
      { href: "/products/shear-cut", label: "Shear Cut" },
      { href: "/products/half-cut", label: "Half Cut" },
      { href: "/products/hot-cut", label: "Hot Cut" },
      { href: "/products/knives", label: "Knives" },
      { href: "/products/guide-bar", label: "Guide Bar" },
    ],
  },
  {
    title: "Applications",
    links: [
      { href: "/applications/plastic-film", label: "Plastic Film" },
      { href: "/applications/metallic-foil", label: "Metallic Foil" },
      { href: "/applications/rubber", label: "Rubber" },
      { href: "/applications/paper", label: "Paper" },
      { href: "/applications/nonwoven", label: "Nonwoven" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/services", label: "Services" },
      { href: "/cutting-methods", label: "Cutting Methods" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-wider">
              MOTOKNIFE
            </Link>
            <p className="mt-2 text-sm text-white/50">
              友聚工業股份有限公司
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/60">
              <p>service@motoknife.com</p>
              <p>+886-2-2688-5677</p>
            </div>
          </div>

          {/* Nav Columns */}
          {FOOTER_NAV.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} 友聚工業股份有限公司. All Rights
            Reserved.
          </p>
          <div className="flex gap-4 text-xs text-white/40">
            <span>EN</span>
            <span>繁中</span>
            <span>DE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
