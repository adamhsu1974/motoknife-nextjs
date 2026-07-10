import Link from "next/link";

type CTAVariant = "primary" | "outline-light" | "outline-dark" | "white";
type CTASize = "sm" | "md" | "lg";
type CTAShape = "sharp" | "pill";

const VARIANT_CLASSES: Record<CTAVariant, string> = {
  primary: "bg-orange text-white hover:bg-orange-hover",
  "outline-light": "border border-white/60 text-white hover:bg-white/10",
  "outline-dark": "border border-border-strong text-text-primary hover:border-orange hover:text-orange-text",
  white: "bg-white text-orange-text hover:bg-white/90",
};

const SIZE_CLASSES: Record<CTASize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-sm md:px-10",
};

const SHAPE_CLASSES: Record<CTAShape, string> = {
  sharp: "rounded",
  pill: "rounded-full",
};

interface CTAButtonProps {
  href: string;
  variant?: CTAVariant;
  size?: CTASize;
  shape?: CTAShape;
  className?: string;
  children: React.ReactNode;
}

export default function CTAButton({
  href,
  variant = "primary",
  size = "md",
  shape = "sharp",
  className = "",
  children,
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-colors ${SHAPE_CLASSES[shape]} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
