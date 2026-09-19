"use client";

import { useSyncExternalStore } from "react";
import { BACK_ONLINE_ISO } from "@/lib/site";

const TARGET_MS = new Date(BACK_ONLINE_ISO).getTime();

const secondsRemaining = () =>
  Math.max(0, Math.floor((TARGET_MS - Date.now()) / 1000));

/**
 * The clock is an external store, so `useSyncExternalStore` is the right tool:
 * it keeps the server render and the hydrating client render in agreement via
 * `getServerSnapshot`, then swaps in the live value after hydration. That
 * avoids both a hydration mismatch and the cascading re-render you get from
 * setting state inside an effect.
 *
 * The snapshot is cached in a module variable because `getSnapshot` must return
 * a referentially stable value between ticks — recomputing `Date.now()` on every
 * call can return a different number within a single render pass.
 */
let snapshot: number | null = null;

function getSnapshot(): number | null {
  if (snapshot === null) snapshot = secondsRemaining();
  return snapshot;
}

function getServerSnapshot(): number | null {
  return null;
}

function subscribe(onChange: () => void) {
  snapshot = secondsRemaining();
  const id = setInterval(() => {
    snapshot = secondsRemaining();
    onChange();
  }, 1_000);

  return () => {
    clearInterval(id);
    snapshot = null;
  };
}

const UNITS = [
  { label: "Days", divisor: 86_400, modulo: Infinity },
  { label: "Hours", divisor: 3_600, modulo: 24 },
  { label: "Minutes", divisor: 60, modulo: 60 },
  { label: "Seconds", divisor: 1, modulo: 60 },
] as const;

export function Countdown() {
  const total = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const values = UNITS.map(({ divisor, modulo }) =>
    total === null ? null : Math.floor(total / divisor) % modulo,
  );

  if (total === 0) {
    return (
      <p className="font-heading text-xl font-semibold text-brand-300 sm:text-2xl">
        We&rsquo;re back online.
      </p>
    );
  }

  return (
    <div>
      <div
        className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4"
        role="timer"
        aria-live="off"
        aria-label={
          total === null
            ? "Counting down to going back online"
            : UNITS.map((unit, i) => `${values[i]} ${unit.label.toLowerCase()}`)
                .join(", ")
                .concat(" until we are back online")
        }
      >
        {UNITS.map(({ label }, index) => (
          <div
            key={label}
            className="rounded-2xl bg-gradient-to-b from-white/18 to-white/5 p-px shadow-[0_18px_40px_-24px_rgba(16,134,197,0.9)]"
          >
            <div className="relative overflow-hidden rounded-[15px] bg-[#050a12]/85 px-1.5 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
              {/* Top sheen */}
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
              <div className="absolute inset-x-0 -top-10 h-16 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(56,169,232,0.35),transparent)]" />

              <span className="block bg-gradient-to-b from-white to-brand-300 bg-clip-text text-center font-heading text-2xl font-semibold tabular-nums text-transparent sm:text-4xl md:text-5xl">
                {values[index] === null
                  ? "--"
                  : String(values[index]).padStart(2, "0")}
              </span>
              <span className="mt-1 block text-center text-[9px] font-medium uppercase tracking-[0.18em] text-ink-500 sm:text-[11px] sm:tracking-[0.22em]">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 text-center text-xs text-ink-500 sm:text-[13px]">
        Back online Friday, 25 September
      </p>
    </div>
  );
}
