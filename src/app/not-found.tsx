import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_HREF } from "@/lib/site";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Badge } from "@/components/ui/Badge";
import { BlurText } from "@/components/ui/BlurText";
import { Button } from "@/components/ui/Button";
import { ColumnGuides } from "@/components/ui/ColumnGuides";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const INK = "var(--color-ink-950)";
const BRAND = "var(--color-brand-500)";

/** The "0" of 404: a target, with a dart that keeps flying in and missing the bullseye. */
function MissedTarget() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="mx-[0.04em] inline-block h-[0.82em] w-[0.82em] overflow-visible align-[-0.04em]">
      <circle cx="100" cy="100" r="88" fill="var(--color-surface)" stroke={INK} strokeWidth="11" />
      <circle cx="100" cy="100" r="58" fill="none" stroke={BRAND} strokeWidth="11" className="animate-icon-pulse" />
      <circle cx="100" cy="100" r="28" fill="none" stroke={INK} strokeWidth="11" />
      <circle cx="100" cy="100" r="9" fill={BRAND} />
      {/* Dart lands near the rim: close, but no bullseye. */}
      <g className="origin-bottom-left animate-dart-miss [transform-box:fill-box]">
        <path d="M156 44 222 -22" stroke={INK} strokeWidth="9" strokeLinecap="round" />
        <path d="M222 -22h20M222 -22v-20" stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d="m156 44 12-3-9-9Z" fill={INK} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** Soft brand dots drifting in the background. */
const DOTS = [
  { top: "14%", left: "9%", size: 10, dx: "14px", dy: "-18px", delay: "0s" },
  { top: "72%", left: "13%", size: 6, dx: "-10px", dy: "-12px", delay: "-3s" },
  { top: "24%", left: "84%", size: 8, dx: "-16px", dy: "14px", delay: "-6s" },
  { top: "78%", left: "80%", size: 12, dx: "12px", dy: "-20px", delay: "-2s" },
  { top: "48%", left: "93%", size: 5, dx: "-8px", dy: "10px", delay: "-5s" },
  { top: "8%", left: "56%", size: 6, dx: "10px", dy: "12px", delay: "-7s" },
];

const QUICK_LINKS = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: CONTACT_HREF },
];

export default function NotFound() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Container>
          <section
            aria-labelledby="not-found-heading"
            className="relative flex min-h-[calc(100dvh-7.5rem)] items-center overflow-hidden rounded-panel bg-panel px-5 py-16 sm:px-10"
          >
            <ColumnGuides />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              {DOTS.map((dot, i) => (
                <span
                  key={i}
                  className="absolute animate-drift rounded-full bg-brand-500/25"
                  style={
                    {
                      top: dot.top,
                      left: dot.left,
                      width: dot.size,
                      height: dot.size,
                      animationDelay: dot.delay,
                      "--dx": dot.dx,
                      "--dy": dot.dy,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
              <Badge className="animate-rise">Error 404</Badge>

              <p
                aria-hidden="true"
                className="animate-rise mt-6 font-heading text-[clamp(7rem,4rem+18vw,15rem)] font-semibold leading-none tracking-[-0.06em] text-ink-950 [animation-delay:60ms]"
              >
                4<MissedTarget />4
              </p>

              <BlurText
                as="h1"
                id="not-found-heading"
                className="mt-8 text-balance font-heading text-title font-semibold text-ink-950"
              >
                This page <span className="text-brand-500">missed the target.</span>
              </BlurText>
              <p className="animate-rise mt-5 max-w-md font-lead text-lead text-ink-500 [animation-delay:200ms]">
                The page you&rsquo;re looking for doesn&rsquo;t exist or has moved. Let&rsquo;s get
                you back to growing.
              </p>

              <div className="animate-rise mt-9 flex w-full flex-col items-center justify-center gap-3 [animation-delay:280ms] sm:w-auto sm:flex-row sm:gap-4">
                <Button href="/" size="lg" className="w-full sm:w-auto">
                  Back to home
                </Button>
                <Button href={CONTACT_HREF} variant="secondary" size="lg" className="w-full sm:w-auto">
                  Let&rsquo;s Talk
                </Button>
              </div>

              <nav aria-label="Popular pages" className="animate-rise mt-10 [animation-delay:360ms]">
                <ul className="flex flex-wrap justify-center gap-2">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center rounded-full border border-ink-200 bg-surface px-4 py-2 text-sm text-ink-700 transition-colors hover:border-brand-500 hover:text-ink-950"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
