import Link from "next/link";

type CTAVariant = "primary" | "outline-light" | "outline-dark" | "white";
type CTASize = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<CTAVariant, string> = {
  primary: "bg-orange text-white hover:bg-orange-hover",
  "outline-light": "border border-white/30 text-white hover:border-white/70",
  "outline-dark": "border border-border-strong text-text-primary hover:border-orange hover:text-orange-text",
  white: "bg-white text-orange-text hover:bg-white/90",
};

const SIZE_CLASSES: Record<CTASize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-sm md:px-10",
};

interface CTAButtonProps {
  href: string;
  variant?: CTAVariant;
  size?: CTASize;
  className?: string;
  children: React.ReactNode;
}

export default function CTAButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded font-medium transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
