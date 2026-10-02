/**
 * Inline headline graphic: a naira coin with chevrons moving forward.
 * Sized in `em` so it scales with the headline at every breakpoint.
 * The naira sign is drawn as SVG so it never depends on font glyph coverage.
 */
export function NairaPill() {
  return (
    <span
      aria-hidden="true"
      className="mx-[0.1em] inline-flex h-[0.74em] w-[1.62em] -translate-y-[0.06em] items-center gap-[0.12em] rounded-full bg-surface p-[0.06em] align-middle shadow-[inset_0_0_0_0.02em_var(--color-ink-200)]"
    >
      <span className="flex aspect-square h-full items-center justify-center rounded-full bg-brand-500 shadow-[inset_0_0_0_0.035em_var(--color-surface),0_0_0_0.03em_var(--color-brand-300)]">
        <svg viewBox="0 0 24 24" fill="none" className="h-[62%] w-[62%]">
          <path
            d="M7.5 18.5v-13l9 13v-13M4.5 10.5h15M4.5 13.5h15"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="flex h-full flex-1 items-center justify-center">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            viewBox="0 0 12 24"
            fill="none"
            className="-mx-[0.03em] h-[56%] w-auto animate-chevron"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <path
              d="m3 4 7 8-7 8"
              stroke="var(--color-brand-500)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </span>
    </span>
  );
}
