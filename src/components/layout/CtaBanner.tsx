"use client";

import { usePathname } from "next/navigation";
import { CONTACT_HREF } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { BlurText } from "@/components/ui/BlurText";

/** Soft squares scattered across the banner, echoing the reference's pixel texture. */
const TILES = [
  { top: "8%", left: "6%", size: "4.5rem", opacity: 0.08 },
  { top: "58%", left: "14%", size: "4rem", opacity: 0.06 },
  { top: "22%", left: "31%", size: "4rem", opacity: 0.1 },
  { top: "70%", left: "44%", size: "3.5rem", opacity: 0.07 },
  { top: "6%", left: "62%", size: "4rem", opacity: 0.06 },
  { top: "48%", left: "72%", size: "4.5rem", opacity: 0.09 },
  { top: "14%", left: "86%", size: "3.5rem", opacity: 0.08 },
  { top: "76%", left: "90%", size: "4rem", opacity: 0.06 },
];

/** Pages that are already a form; the banner would only compete with it. */
const HIDDEN_ON = [CONTACT_HREF, "/join-the-team"];

export function CtaBanner() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden rounded-panel bg-gradient-to-b from-brand-500 to-brand-700 px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {TILES.map((tile, i) => (
          <span
            key={i}
            className="absolute rounded-md bg-white"
            style={{ top: tile.top, left: tile.left, width: tile.size, height: tile.size, opacity: tile.opacity }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center">
        <BlurText id="cta-heading" className="font-heading text-title font-semibold text-white">
          Let&rsquo;s turn your goals into growth
        </BlurText>
        <p className="mt-5 max-w-xl font-lead text-lead text-brand-50/85">
          Whether you&rsquo;re launching, scaling, or looking for better marketing results, we&rsquo;re
          ready to help. Tell us about your business and let&rsquo;s build a strategy that works.
        </p>
        <Button href={CONTACT_HREF} variant="light" size="lg" className="mt-9">
          Let&rsquo;s Talk
        </Button>
      </div>
    </section>
  );
}
