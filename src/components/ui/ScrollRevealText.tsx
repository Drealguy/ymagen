"use client";

import { useEffect, useRef } from "react";

export type RevealSegment = { text: string; highlight?: boolean };

const MUTED = "var(--color-ink-300)";
const FULL = "var(--color-ink-950)";
const ACCENT = "var(--color-brand-500)";

/**
 * Text that starts muted and fills in word by word as it scrolls through the
 * viewport. Colours are written straight to the DOM on scroll, so React never
 * re-renders mid-scroll. Reduced-motion users get the finished state.
 */
export function ScrollRevealText({ segments }: { segments: RevealSegment[] }) {
  const root = useRef<HTMLSpanElement>(null);

  const words = segments.flatMap((segment) =>
    segment.text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((part) => ({ part, highlight: !!segment.highlight, space: /^\s+$/.test(part) })),
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the text's top reaches 85% down the screen, 1 when its bottom passes 45%.
      const progress = reduced
        ? 1
        : Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.4)));
      const lit = progress * spans.length;
      spans.forEach((span, i) => {
        const on = i < lit;
        span.style.color = on ? (span.dataset.highlight ? ACCENT : FULL) : MUTED;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <span ref={root}>
      {words.map((word, i) =>
        word.space ? (
          word.part
        ) : (
          <span
            key={i}
            data-word=""
            data-highlight={word.highlight || undefined}
            className="transition-colors duration-200"
            style={{ color: MUTED }}
          >
            {word.part}
          </span>
        ),
      )}
    </span>
  );
}
