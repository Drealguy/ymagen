import Link from "next/link";

type Variant = "primary" | "secondary" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex shrink-0 items-center justify-center rounded-full font-sans font-medium tracking-[-0.01em] whitespace-nowrap transition duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-[0_14px_30px_-14px_var(--color-brand-500)] hover:bg-brand-600",
  secondary:
    "border border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-white",
  /** For use on brand-blue or dark surfaces. */
  light: "bg-white text-ink-950 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.45)] hover:bg-brand-50",
};

/** Arrow buttons (primary, light) carry the arrow badge, so they are padded tighter on the right. */
const sizes: Record<Size, Record<Variant, string>> = {
  md: {
    primary: "h-11 gap-3 pl-5 pr-1.5 text-[15px]",
    secondary: "h-11 px-5 text-[15px]",
    light: "h-11 gap-3 pl-5 pr-1.5 text-[15px]",
  },
  lg: {
    primary: "h-[3.25rem] gap-3.5 pl-6 pr-1.5 text-base",
    secondary: "h-[3.25rem] px-6 text-base",
    light: "h-[3.25rem] gap-3.5 pl-6 pr-1.5 text-base",
  },
};

const arrowTones: Partial<Record<Variant, string>> = {
  primary: "bg-white text-brand-500",
  light: "bg-brand-500 text-white",
};

const arrowSizes: Record<Size, string> = {
  md: "h-8 w-8",
  lg: "h-10 w-10",
};

/** Class names for a button, for elements that can't use <Button> (e.g. form submits). */
export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${variants[variant]} ${sizes[size][variant]}`;
}

/** Class names for the round badge that sits inside primary and light buttons. */
export function buttonBadgeClass(variant: Variant = "primary", size: Size = "md") {
  return `flex items-center justify-center rounded-full transition-transform duration-200 ${arrowTones[variant] ?? ""} ${arrowSizes[size]}`;
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 11 11 5M6 5h5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonClass(variant, size)} ${className}`}>
      {children}
      {arrowTones[variant] && (
        <span
          className={`${buttonBadgeClass(variant, size)} group-hover:rotate-45`}
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </Link>
  );
}
