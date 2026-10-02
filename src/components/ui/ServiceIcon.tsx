/**
 * Line icons for each service, drawn in ink with a brand-blue accent and a
 * small looping animation. All motion stops for reduced-motion users via the
 * global rule in globals.css.
 */

const INK = "var(--color-ink-950)";
const BRAND = "var(--color-brand-500)";
const line = { fill: "none", strokeWidth: 3.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Lets CSS transforms on SVG parts pivot around the part itself. */
const part = "[transform-box:fill-box]";

function Strategy() {
  return (
    <>
      <circle cx="56" cy="64" r="36" stroke={INK} {...line} />
      <circle cx="56" cy="64" r="21" stroke={BRAND} {...line} />
      <circle cx="56" cy="64" r="6" fill={BRAND} />
      <g className={`${part} animate-icon-dart`}>
        <path d="M58 62 96 24" stroke={INK} {...line} />
        <path d="M96 24h12M96 24V12" stroke={INK} {...line} />
      </g>
    </>
  );
}

function PaidAdvertising() {
  return (
    <>
      <path d="M26 50h14l36-18v56L40 70H26a4 4 0 0 1-4-4V54a4 4 0 0 1 4-4Z" stroke={INK} {...line} />
      <path d="m38 70 6 22h10l-4-22" stroke={INK} {...line} />
      <path d="M88 48c6 7 6 17 0 24" stroke={BRAND} {...line} className="animate-icon-pulse" />
      <path
        d="M96 40c11 12 11 28 0 40"
        stroke={BRAND}
        {...line}
        className="animate-icon-pulse"
        style={{ animationDelay: "0.3s" }}
      />
    </>
  );
}

function SocialMedia() {
  return (
    <>
      <g className={`${part} animate-icon-float`}>
        <path d="M24 22h46a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H44l-10 10V62H24a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6Z" stroke={BRAND} {...line} />
        <path
          d="m47 31 3.6 7.3 8 1.2-5.8 5.6 1.4 8-7.2-3.8-7.2 3.8 1.4-8-5.8-5.6 8-1.2L47 31Z"
          stroke={INK}
          strokeWidth="3"
          fill="none"
          strokeLinejoin="round"
        />
      </g>
      <g className={`${part} animate-icon-float`} style={{ animationDelay: "1.6s" }}>
        <path d="M54 58h46a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6h-8v10L82 94H54a6 6 0 0 1-6-6V64a6 6 0 0 1 6-6Z" stroke={INK} {...line} fill="var(--color-surface)" />
        <path d="M60 70h34M60 80h24" stroke={INK} {...line} />
      </g>
    </>
  );
}

function Branding() {
  const swatch = (fan: string, stroke: string, fill: string, delay = "0s") => (
    <rect
      x="40"
      y="18"
      width="28"
      height="80"
      rx="7"
      stroke={stroke}
      {...line}
      fill={fill}
      className={`${part} origin-bottom animate-icon-fan`}
      style={{ ["--fan" as string]: fan, animationDelay: delay }}
    />
  );
  return (
    <>
      {swatch("-28deg", INK, "var(--color-surface)")}
      {swatch("-14deg", INK, "var(--color-surface)", "0.1s")}
      {swatch("14deg", BRAND, "var(--color-surface)", "0.2s")}
      <circle cx="54" cy="86" r="4" fill={BRAND} />
    </>
  );
}

function WebsiteDesign() {
  return (
    <>
      <rect x="14" y="22" width="92" height="70" rx="8" stroke={INK} {...line} />
      <path d="M14 38h92" stroke={INK} {...line} />
      <circle cx="24" cy="30" r="2.5" fill={INK} />
      <circle cx="32" cy="30" r="2.5" fill={INK} />
      <path d="M26 52h40M26 61h28" stroke={INK} {...line} />
      <rect x="26" y="70" width="34" height="12" rx="6" fill={BRAND} />
      <path
        d="m52 76 4 18 4.5-6.5 8 8 4-4-8-8 6.5-4.5L52 76Z"
        fill="var(--color-surface)"
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
        className={`${part} origin-top-left animate-icon-click`}
      />
    </>
  );
}

function EmailMarketing() {
  return (
    <>
      {/* Open flap behind the letter */}
      <path d="M22 54 60 30l38 24" stroke={INK} {...line} />
      <g className={`${part} animate-icon-letter`}>
        <rect x="34" y="24" width="52" height="50" rx="5" stroke={BRAND} {...line} fill="var(--color-surface)" />
        <path d="M44 38h32M44 48h22" stroke={BRAND} {...line} />
      </g>
      {/* Envelope front sits over the letter so it appears to slide in and out */}
      <path d="M22 54v38a4 4 0 0 0 4 4h68a4 4 0 0 0 4-4V54l-38 26-38-26Z" stroke={INK} {...line} fill="var(--color-surface)" />
    </>
  );
}

const ICONS: Record<string, () => React.ReactElement> = {
  strategy: Strategy,
  "paid-advertising": PaidAdvertising,
  "social-media-management": SocialMedia,
  branding: Branding,
  "website-design": WebsiteDesign,
  "email-marketing": EmailMarketing,
};

export function ServiceIcon({ slug, className = "" }: { slug: string; className?: string }) {
  const Icon = ICONS[slug];
  if (!Icon) return null;
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={`overflow-visible ${className}`}>
      <Icon />
    </svg>
  );
}
