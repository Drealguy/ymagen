"use client";

import { useId, useState } from "react";
import { FORMSPREE_ENDPOINT } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();
  const messageId = `${inputId}-message`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Read the honeypot synchronously: currentTarget is nulled after the await.
    const honeypot =
      (event.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value ?? "";

    if (!EMAIL.test(email.trim())) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setError(null);
    setStatus("submitting");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "footer-newsletter",
          _gotcha: honeypot,
          _subject: "New Ymagen newsletter signup",
        }),
      });
      if (!response.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
      setError("We couldn't sign you up. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="text-[15px] text-brand-200">
        You&rsquo;re in. Expect practical marketing ideas, not spam.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1.5 pl-5 focus-within:border-brand-400">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setError(null);
            }
          }}
          disabled={status === "submitting"}
          placeholder="Email address"
          aria-invalid={status === "error"}
          aria-describedby={error ? messageId : undefined}
          className="min-w-0 flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/40"
        />
        {/* Formspree's native honeypot — real users never fill this. */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-10 shrink-0 rounded-full bg-white px-5 text-[15px] font-medium text-ink-950 transition hover:bg-brand-50 disabled:opacity-70"
        >
          {status === "submitting" ? "Sending" : "Subscribe"}
        </button>
      </div>
      <p id={messageId} role="alert" className="mt-2 min-h-5 pl-5 text-xs text-red-400">
        {error}
      </p>
    </form>
  );
}
