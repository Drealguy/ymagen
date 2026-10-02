"use client";

import { useEffect, useRef, useState } from "react";

export type TimelineItem = {
  title: string;
  body: string;
  icon: React.ReactNode;
  /** Small label above the title, e.g. "Step 01". */
  eyebrow?: string;
};

/** The point on screen, as a share of viewport height, that the line fills up to. */
const TRIGGER = 0.6;

/**
 * Vertical timeline whose line fills in brand blue as the reader scrolls, with
 * each marker lighting up as the fill reaches it. Items alternate sides from md.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const icons = useRef<(HTMLSpanElement | null)[]>([]);
  const [reached, setReached] = useState(0);

  // The fill follows the scroll position directly (no transition), so it is
  // driven by the reader, not by an animation, and needs no reduced-motion opt-out.
  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      if (!list.current || !fill.current) return;
      const trigger = window.innerHeight * TRIGGER;
      const box = list.current.getBoundingClientRect();
      const progress = Math.min(Math.max((trigger - box.top) / box.height, 0), 1);
      fill.current.style.transform = `scaleY(${progress})`;
      setReached(
        icons.current.filter((icon) => {
          if (!icon) return false;
          const { top, height } = icon.getBoundingClientRect();
          return top + height / 2 <= trigger;
        }).length,
      );
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ol ref={list} className="relative">
      <span aria-hidden="true" className="absolute inset-y-0 left-6 w-px -translate-x-1/2 bg-ink-200 md:left-1/2" />
      <span
        ref={fill}
        aria-hidden="true"
        className="absolute inset-y-0 left-6 w-0.5 origin-top -translate-x-1/2 bg-brand-500 md:left-1/2"
        style={{ transform: "scaleY(0)" }}
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 h-3 w-3 -translate-x-1/2 -translate-y-full rounded-full border border-brand-300 bg-surface md:left-1/2"
      />

      {items.map((item, i) => {
        const right = i % 2 === 1;
        const lit = i < reached;
        return (
          <li key={item.title} className="relative pb-14 last:pb-0 md:grid md:grid-cols-2 md:pb-24">
            <div className={right ? "md:col-start-2" : "md:col-start-1"}>
              <div className={`flex items-center ${right ? "md:flex-row-reverse" : ""}`}>
                <span
                  ref={(node) => {
                    icons.current[i] = node;
                  }}
                  aria-hidden="true"
                  className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                    lit ? "border-brand-200 bg-brand-50 text-brand-500" : "border-ink-200 bg-ink-50 text-ink-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span
                  aria-hidden="true"
                  className={`hidden flex-1 border-t border-dashed transition-colors duration-500 md:block ${
                    lit ? "border-brand-400" : "border-ink-300"
                  }`}
                />
              </div>

              <div className={`mt-5 pl-16 md:mt-8 md:max-w-sm md:pl-0 ${right ? "md:ml-auto" : ""}`}>
                {item.eyebrow && <p className="mb-2 font-accent text-sm text-brand-600">{item.eyebrow}</p>}
                <h3 className="font-heading text-xl font-medium tracking-[-0.025em] text-ink-950 sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-500">{item.body}</p>
              </div>
            </div>

            {/* Where the dashed connector meets the line. */}
            <span
              aria-hidden="true"
              className={`absolute top-6 left-1/2 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-500 md:block ${
                lit ? "bg-brand-500 ring-4 ring-brand-100" : "bg-ink-300"
              }`}
            />
          </li>
        );
      })}
    </ol>
  );
}
