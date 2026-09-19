"use client";

import { useId, useState } from "react";
import { FORMSPREE_ENDPOINT, INSTAGRAM_HANDLE } from "@/lib/site";
import { InstagramModal } from "./InstagramModal";

type Status = "idle" | "submitting" | "success" | "error";

/** E.164 allows 15 digits at most; 8 is a sensible floor for a dialable number. */
function validate(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return "Please enter your WhatsApp number.";
  if (/[a-z]/i.test(trimmed)) return "Numbers only — letters aren't allowed.";

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 8) return "That number looks too short.";
  if (digits.length > 15) return "That number looks too long.";
  return null;
}

export function NotifySection() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const inputId = useId();
  const errorId = `${inputId}-error`;
  const submitting = status === "submitting";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Read the honeypot synchronously: currentTarget is nulled after the await.
    const honeypot =
      (event.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)
        ?.value ?? "";

    const problem = validate(phone);
    if (problem) {
      setError(problem);
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          whatsapp: phone.trim(),
          source: "maintenance-page",
          _gotcha: honeypot,
          _subject: "New Ymagen back-online notification signup",
        }),
      });

      if (!response.ok) {
        // Formspree reports validation problems in an `errors` array.
        const body = (await response.json().catch(() => null)) as
          | { errors?: { message?: string }[] }
          | null;
        throw new Error(body?.errors?.[0]?.message ?? "Something went wrong.");
      }

      setStatus("success");
      setModalOpen(true);
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error && cause.message !== "Failed to fetch"
          ? cause.message
          : "We couldn't reach the server. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <>
        <div className="animate-rise mx-auto w-full max-w-md rounded-2xl bg-gradient-to-b from-white/18 to-white/5 p-px">
          <div className="rounded-[15px] bg-[#050a12]/85 px-5 py-5 text-center backdrop-blur-sm">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 shadow-[0_12px_28px_-10px_rgba(16,134,197,1)]">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                <path
                  d="m5 12.5 4.2 4.2L19 7"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p
              role="status"
              className="mt-3 font-heading text-lg font-semibold text-white"
            >
              You&rsquo;re on the list
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-300">
              We&rsquo;ve received your number and we&rsquo;ll message you on
              WhatsApp as soon as Ymagen is back online.
            </p>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-4 text-sm font-medium text-brand-300 underline-offset-4 transition hover:text-brand-400 hover:underline"
            >
              Follow @{INSTAGRAM_HANDLE} on Instagram
            </button>
          </div>
        </div>

        <InstagramModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="mx-auto w-full max-w-md">
        <label htmlFor={inputId} className="sr-only">
          Your WhatsApp number
        </label>

        <div className="rounded-2xl bg-gradient-to-b from-white/18 to-white/5 p-px shadow-[0_20px_50px_-28px_rgba(16,134,197,0.95)]">
          <div className="flex flex-col gap-2 rounded-[15px] bg-[#050a12]/85 p-2 backdrop-blur-sm sm:flex-row sm:items-center">
            <input
              id={inputId}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              name="whatsapp"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setError(null);
                }
              }}
              disabled={submitting}
              placeholder="+234 801 234 5678"
              aria-invalid={status === "error"}
              aria-describedby={error ? errorId : undefined}
              className="min-w-0 flex-1 rounded-lg bg-transparent px-4 py-3 text-[15px] text-white outline-none disabled:opacity-60"
            />

            {/* Formspree's native honeypot — real users never fill this. */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-400 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(16,134,197,1)] transition hover:brightness-110 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && (
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white"
                />
              )}
              {submitting ? "Sending" : "Notify me"}
            </button>
          </div>
        </div>

        <p
          id={errorId}
          role="alert"
          className={`mt-2 min-h-5 text-center text-xs sm:text-left ${
            error ? "text-red-400" : "text-ink-500"
          }`}
        >
          {error ?? "We'll only message you once — when we're back."}
        </p>
      </form>

      <InstagramModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
