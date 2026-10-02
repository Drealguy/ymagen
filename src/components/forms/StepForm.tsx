"use client";

import { useEffect, useRef, useState } from "react";
import { FORMSPREE_ENDPOINT, WHATSAPP_URL } from "@/lib/site";
import { Button, buttonBadgeClass, buttonClass } from "@/components/ui/Button";

/**
 * One-question-at-a-time form (Typeform style) with a review screen before
 * sending. Used by the contact and join-the-team pages; each supplies its own
 * steps and copy.
 */

export type Answers = Record<string, string | string[]>;

export type FormStep = {
  key: string;
  /** Short label used on the review screen. */
  short: string;
  title: (a: Answers) => string;
  help: string;
  placeholder?: string;
  kind: "text" | "textarea" | "tel" | "email" | "url" | "choice";
  choices?: string[];
  /** Choice steps: allow several answers. */
  multiple?: boolean;
  /** Choice steps: an option that can't be combined with the others (e.g. "Not sure yet"). */
  exclusive?: string;
  optional?: boolean;
  autoComplete?: string;
  /** Extra checks beyond "required". Return an error message or null. */
  validate?: (a: Answers) => string | null;
};

type Status = "idle" | "submitting" | "success" | "error";
type Channel = "whatsapp" | "email";

const LETTERS = "ABCDEFGHIJKLMNOP";
const FORMSPREE_HEADERS = { "Content-Type": "application/json", Accept: "application/json" };

export const firstName = (name: unknown) => String(name ?? "").trim().split(/\s+/)[0] ?? "";
const text = (a: Answers, key: string) => String(a[key] ?? "");
export const display = (a: Answers, key: string) => {
  const value = a[key];
  const out = Array.isArray(value) ? value.join(", ") : String(value ?? "").trim();
  return out || "Not provided";
};

function requiredError(step: FormStep, a: Answers): string | null {
  if (step.optional) return null;
  const value = a[step.key];
  if (Array.isArray(value)) return value.length ? null : step.multiple ? "Pick at least one option." : "Pick an option.";
  return String(value ?? "").trim() ? null : "Please answer this question.";
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Zm0 17.3c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-2.8.8.8-2.7-.2-.3A7.8 7.8 0 1 1 12 19.8Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.4 6.4 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6.1.2 1.8 2.7 4.3 3.8 1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z" />
    </svg>
  );
}

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function BackButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-950"
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
        <path d="M10 3.5 5.5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </button>
  );
}

const kbd = "rounded-md border border-ink-200 bg-surface px-2 py-0.5 font-sans text-[13px] font-medium text-ink-950";
const eyebrow = "font-accent text-sm uppercase tracking-[0.08em] text-brand-600";
const field =
  "mt-8 w-full border-b-2 border-ink-300 bg-transparent pb-3 text-2xl text-ink-950 outline-none transition-colors placeholder:text-ink-400 focus:border-brand-500 focus-visible:outline-none sm:mt-10 sm:text-3xl";

export type StepFormProps = {
  steps: FormStep[];
  /** Formspree `source` tag, so submissions from each form can be told apart. */
  source: string;
  subject: (a: Answers) => string;
  reviewTitle: string;
  reviewHelp: string;
  /** When set, the review screen offers "Send on WhatsApp" alongside email. */
  whatsapp?: { message: (a: Answers) => string };
  /** Label for the email/Formspree send button. */
  submitLabel: string;
  success: { title: (a: Answers) => string; body: string };
};

export function StepForm({ steps, source, subject, reviewTitle, reviewHelp, whatsapp, submitLabel, success }: StepFormProps) {
  const [step, setStep] = useState(0);
  const [reviewing, setReviewing] = useState(false);
  /** Set when a question was opened from the review screen; OK returns there. */
  const [editing, setEditing] = useState(false);
  const [answers, setAnswers] = useState<Answers>(() =>
    Object.fromEntries(steps.map((s) => [s.key, s.kind === "choice" ? [] : ""])),
  );
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [channel, setChannel] = useState<Channel>("email");
  const fieldRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);

  const current = steps[step];
  const last = step === steps.length - 1;
  const submitting = status === "submitting";
  const choices = current.choices ?? [];

  // Move focus to the new screen so the visitor can carry on from the keyboard.
  useEffect(() => {
    if (status === "success") return;
    if (reviewing) reviewRef.current?.focus();
    else if (current.kind === "choice") formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    else fieldRef.current?.focus();
  }, [step, reviewing, current.kind, status]);

  // Letter shortcuts (A, B, C…) pick options on choice questions.
  useEffect(() => {
    if (reviewing || current.kind !== "choice") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const index = LETTERS.indexOf(event.key.toUpperCase());
      if (index < 0 || index >= choices.length) return;
      toggle(choices[index]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function set(key: string, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    if (error) setError(null);
  }

  function toggle(choice: string) {
    setAnswers((a) => {
      const selected = (a[current.key] as string[]) ?? [];
      if (!current.multiple) return { ...a, [current.key]: [choice] };
      if (selected.includes(choice)) return { ...a, [current.key]: selected.filter((c) => c !== choice) };
      const keep = choice === current.exclusive ? [] : selected.filter((c) => c !== current.exclusive);
      return { ...a, [current.key]: [...keep, choice] };
    });
    if (error) setError(null);
  }

  function next(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = requiredError(current, answers) ?? current.validate?.(answers) ?? null;
    if (problem) {
      setError(problem);
      return;
    }
    if (editing || last) {
      setEditing(false);
      setReviewing(true);
      return;
    }
    setStep((s) => s + 1);
  }

  function edit(index: number) {
    setError(null);
    setStatus("idle");
    setStep(index);
    setEditing(true);
    setReviewing(false);
  }

  function payload(via: Channel) {
    return JSON.stringify({
      ...Object.fromEntries(steps.map((s) => [s.key, display(answers, s.key)])),
      source: via === "whatsapp" ? `${source}-whatsapp` : source,
      _subject: `${subject(answers)}${via === "whatsapp" ? " via WhatsApp" : ""}`,
    });
  }

  function whatsappHref() {
    return whatsapp ? `${WHATSAPP_URL}?text=${encodeURIComponent(whatsapp.message(answers))}` : WHATSAPP_URL;
  }

  function sendWhatsApp() {
    // Backup copy: the site can't tell whether the visitor presses send in
    // WhatsApp, so the submission also goes to Formspree. keepalive lets it
    // finish even if the tab loses focus to WhatsApp.
    fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: FORMSPREE_HEADERS, body: payload("whatsapp"), keepalive: true }).catch(
      () => {},
    );
    window.open(whatsappHref(), "_blank", "noopener");
    setChannel("whatsapp");
    setStatus("success");
  }

  async function sendEmail() {
    setError(null);
    setStatus("submitting");
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: FORMSPREE_HEADERS, body: payload("email") });
      if (!response.ok) throw new Error();
      setChannel("email");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(
        whatsapp
          ? "We couldn’t send your details. Please check your connection, or send them on WhatsApp instead."
          : "We couldn’t send your details. Please check your connection and try again.",
      );
    }
  }

  const progress = status === "success" || reviewing ? 100 : (step / steps.length) * 100;

  return (
    <div className="relative flex min-h-[calc(100dvh-7.5rem)] items-center overflow-hidden rounded-panel bg-panel">
      {/* Soft brand glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-brand-100 opacity-70 blur-3xl" />
        <div className="absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-brand-50 blur-3xl" />
      </div>

      <div
        role="progressbar"
        aria-label="Form progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className="absolute inset-x-0 top-0 h-1 bg-ink-200/60"
      >
        <div className="h-full bg-brand-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-5 py-16 sm:px-10 sm:py-20">
        {status === "success" ? (
          <div className="animate-rise" role="status">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500 text-white">
              <CheckIcon className="h-5 w-5" />
            </span>
            {channel === "whatsapp" ? (
              <>
                <h2 className="mt-6 font-heading text-title font-semibold text-ink-950">
                  Almost there, {firstName(answers.name)}.
                </h2>
                <p className="mt-4 max-w-xl font-lead text-lead text-ink-500">
                  WhatsApp should have opened with your message ready. Just press send and we&rsquo;ll
                  reply there.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg")}>
                    Open WhatsApp again
                    <span className={buttonBadgeClass("primary", "lg")}>
                      <WhatsAppIcon />
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-sm text-ink-500 underline-offset-4 hover:text-ink-950 hover:underline"
                  >
                    Back to my answers
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="mt-6 font-heading text-title font-semibold text-ink-950">{success.title(answers)}</h2>
                <p className="mt-4 max-w-xl font-lead text-lead text-ink-500">{success.body}</p>
                <Button href="/" variant="secondary" size="lg" className="mt-10">
                  Back to home
                </Button>
              </>
            )}
          </div>
        ) : reviewing ? (
          <div className="animate-rise">
            <div className="flex items-center gap-4">
              <BackButton
                onClick={() => {
                  setError(null);
                  setReviewing(false);
                  setStep(steps.length - 1);
                }}
              >
                Back
              </BackButton>
              <p className={eyebrow}>Review</p>
            </div>

            <h2 ref={reviewRef} tabIndex={-1} className="mt-4 font-heading text-title font-semibold text-ink-950 outline-none">
              {reviewTitle}
            </h2>
            <p className="mt-3 font-lead text-lead text-ink-500">{reviewHelp}</p>

            <dl className="mt-8 divide-y divide-ink-200 overflow-hidden rounded-card border border-ink-200 bg-surface sm:mt-10">
              {steps.map((s, i) => (
                <div key={s.key} className="flex items-start gap-4 px-5 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:gap-6">
                    <dt className="shrink-0 text-sm text-ink-500 sm:w-32 sm:pt-0.5">{s.short}</dt>
                    <dd className="mt-1 break-words text-[15px] text-ink-950 sm:mt-0 sm:text-base">{display(answers, s.key)}</dd>
                  </div>
                  <button
                    type="button"
                    onClick={() => edit(i)}
                    aria-label={`Edit ${s.short.toLowerCase()}`}
                    className="shrink-0 text-sm font-medium text-brand-600 underline-offset-4 hover:underline"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </dl>

            <p role="alert" className="mt-3 min-h-5 text-sm text-red-600">
              {error}
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              {whatsapp && (
                <button
                  type="button"
                  onClick={sendWhatsApp}
                  disabled={submitting}
                  className={`${buttonClass("primary", "lg")} disabled:opacity-70`}
                >
                  Send on WhatsApp
                  <span className={buttonBadgeClass("primary", "lg")}>
                    <WhatsAppIcon />
                  </span>
                </button>
              )}
              {whatsapp ? (
                <button
                  type="button"
                  onClick={sendEmail}
                  disabled={submitting}
                  className={`${buttonClass("secondary", "lg")} gap-2.5 disabled:opacity-70`}
                >
                  {submitting ? (
                    <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-ink-300 border-t-ink-950" />
                  ) : (
                    <MailIcon />
                  )}
                  {submitting ? "Sending" : submitLabel}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={sendEmail}
                  disabled={submitting}
                  className={`${buttonClass("primary", "lg")} disabled:opacity-70`}
                >
                  {submitting ? "Sending" : submitLabel}
                  <span className={buttonBadgeClass("primary", "lg")}>
                    {submitting ? (
                      <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500" />
                    ) : (
                      <CheckIcon />
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <form ref={formRef} key={step} onSubmit={next} noValidate className="animate-rise">
            <div className="flex items-center gap-4">
              {(step > 0 || editing) && (
                <BackButton
                  onClick={() => {
                    setError(null);
                    if (editing) {
                      setEditing(false);
                      setReviewing(true);
                    } else {
                      setStep((s) => s - 1);
                    }
                  }}
                >
                  {editing ? "Back to review" : "Back"}
                </BackButton>
              )}
              <p className={eyebrow}>
                Question {step + 1} of {steps.length}
              </p>
            </div>

            {current.kind === "choice" ? (
              <fieldset className="mt-4">
                <legend className="font-heading text-title font-semibold text-ink-950">{current.title(answers)}</legend>
                <p className="mt-3 font-lead text-lead text-ink-500">{current.help}</p>
                <div className="mt-8 grid gap-2.5 sm:mt-10 sm:grid-cols-2">
                  {choices.map((choice, i) => {
                    const checked = ((answers[current.key] as string[]) ?? []).includes(choice);
                    return (
                      <label
                        key={choice}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-[15px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-500 ${
                          checked
                            ? "border-brand-500 bg-brand-50 text-ink-950"
                            : "border-ink-200 bg-surface/70 text-ink-700 hover:border-ink-400"
                        }`}
                      >
                        <input
                          type={current.multiple ? "checkbox" : "radio"}
                          name={current.key}
                          checked={checked}
                          onChange={() => toggle(choice)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border font-accent text-xs ${
                            checked ? "border-brand-500 bg-brand-500 text-white" : "border-ink-300 text-ink-500"
                          }`}
                        >
                          {checked ? <CheckIcon className="h-3.5 w-3.5" /> : LETTERS[i]}
                        </span>
                        {choice}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ) : (
              <>
                <label htmlFor={`step-${current.key}`} className="mt-4 block font-heading text-title font-semibold text-ink-950">
                  {current.title(answers)}
                  {current.optional && <span className="ml-2 align-middle font-sans text-base font-normal text-ink-400">(optional)</span>}
                </label>
                <p id={`step-${current.key}-help`} className="mt-3 font-lead text-lead text-ink-500">
                  {current.help}
                </p>
                {current.kind === "textarea" ? (
                  <textarea
                    ref={fieldRef}
                    id={`step-${current.key}`}
                    rows={2}
                    value={text(answers, current.key)}
                    onChange={(e) => set(current.key, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                      }
                    }}
                    placeholder={current.placeholder}
                    aria-describedby={`step-${current.key}-help${error ? " step-error" : ""}`}
                    aria-invalid={!!error}
                    className={`${field} resize-none`}
                  />
                ) : (
                  <input
                    ref={fieldRef}
                    id={`step-${current.key}`}
                    type={current.kind}
                    inputMode={current.kind === "tel" ? "tel" : current.kind === "email" ? "email" : current.kind === "url" ? "url" : undefined}
                    autoComplete={current.autoComplete}
                    value={text(answers, current.key)}
                    onChange={(e) => set(current.key, e.target.value)}
                    placeholder={current.placeholder}
                    aria-describedby={`step-${current.key}-help${error ? " step-error" : ""}`}
                    aria-invalid={!!error}
                    className={field}
                  />
                )}
              </>
            )}

            <p id="step-error" role="alert" className="mt-3 min-h-5 text-sm text-red-600">
              {error}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button type="submit" className={buttonClass("primary", "lg")}>
                {editing ? "Save" : last ? "Review" : current.optional && !text(answers, current.key).trim() ? "Skip" : "OK"}
                <span className={buttonBadgeClass("primary", "lg")}>
                  <CheckIcon />
                </span>
              </button>
              <p className="hidden items-center gap-2 text-sm text-ink-500 sm:flex">
                or press <kbd className={kbd}>Enter &#8629;</kbd>
                {current.kind === "textarea" && <span className="text-ink-400">(Shift + Enter for a new line)</span>}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
