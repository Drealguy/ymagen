"use client";

import { useCallback, useEffect, useRef } from "react";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/site";

const FOCUSABLE = 'a[href], button:not([disabled])';

export function InstagramModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      // Keep Tab inside the dialog while it is open.
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panelRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", handleKeyDown);

    // Lock scroll without letting the page jump as the scrollbar disappears.
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      restoreFocusTo.current?.focus?.();
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-canvas/80 p-4 backdrop-blur-md sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ig-title"
        aria-describedby="ig-copy"
        className="animate-rise w-full max-w-sm rounded-3xl bg-gradient-to-b from-white/20 to-white/5 p-px shadow-[0_40px_90px_-30px_rgba(16,134,197,0.85)]"
      >
        <div className="relative overflow-hidden rounded-[23px] bg-[#060b13] p-6 text-center sm:p-7">
          <div className="absolute inset-x-0 -top-24 h-40 bg-[radial-gradient(50%_100%_at_50%_100%,rgba(56,169,232,0.4),transparent)]" />

          <div className="relative">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-[0_12px_30px_-10px_rgba(16,134,197,0.9)]">
              <InstagramGlyph className="h-7 w-7 text-white" />
            </div>

            <h2
              id="ig-title"
              className="mt-4 font-heading text-xl font-semibold text-white sm:text-2xl"
            >
              Follow us on Instagram?
            </h2>
            <p id="ig-copy" className="mt-2 text-sm leading-relaxed text-ink-300">
              We post updates there while we work, and we&rsquo;ll announce the
              moment we&rsquo;re back online.
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(16,134,197,1)] transition hover:brightness-110 active:scale-[0.99]"
              >
                Follow @{INSTAGRAM_HANDLE}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl px-5 py-3 text-sm font-medium text-ink-500 transition hover:text-ink-300"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="2.75"
        y="2.75"
        width="18.5"
        height="18.5"
        rx="5.25"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.25" fill="currentColor" />
    </svg>
  );
}
