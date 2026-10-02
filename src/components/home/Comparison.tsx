import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { BlurText } from "@/components/ui/BlurText";

/** Paired line by line: each "others" point is answered by the Ymagen point beside it. */
const OTHERS = [
  "Post content without a clear plan",
  "Report likes and followers",
  "Run ads in isolation",
  "Vague reports that say little",
  "Sell one-off services",
];

const YMAGEN = [
  "Strategy before any spending",
  "Measured by leads, customers and sales",
  "Every channel works as one system",
  "Clear, honest reporting",
  "A growth partner, not a vendor",
];

function Cross() {
  return (
    <span aria-hidden="true" className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink-400 text-white">
      <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5">
        <path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Check() {
  return (
    <span aria-hidden="true" className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
      <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
        <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const item = "flex items-center gap-3 text-base sm:text-lg";

export function Comparison() {
  return (
    <section aria-labelledby="comparison-heading" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Badge>Comparison</Badge>
          <BlurText id="comparison-heading" className="mt-5 text-balance font-heading text-title font-semibold text-ink-950">
            Why choose <span className="text-brand-500">Ymagen</span> over others
          </BlurText>
          <p className="mt-5 max-w-md font-lead text-lead text-ink-500">
            Most agencies sell activity. We build marketing systems that bring in customers.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-2 rounded-panel bg-panel p-2 sm:mt-16 md:grid-cols-2">
          <div className="p-6 sm:p-8 lg:p-10">
            <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-ink-500 sm:text-3xl">
              Other agencies
            </h3>
            <ul className="mt-7 flex flex-col gap-4">
              {OTHERS.map((point) => (
                <li key={point} className={`${item} text-ink-500`}>
                  <Cross />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.6rem] border-2 border-brand-500 bg-surface p-6 shadow-[0_24px_50px_-28px_var(--color-brand-500)] sm:p-8 lg:p-10">
            <h3 className="flex items-center gap-3 font-heading text-2xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-3xl">
              <Image src="/logo-mark.png" alt="" width={36} height={36} className="h-9 w-9" />
              Ymagen
            </h3>
            <ul className="mt-7 flex flex-col gap-4">
              {YMAGEN.map((point) => (
                <li key={point} className={`${item} text-ink-950`}>
                  <Check />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
