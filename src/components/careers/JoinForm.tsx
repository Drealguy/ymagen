"use client";

import { validatePhone } from "@/lib/phone";
import { display, firstName, StepForm, type FormStep } from "@/components/forms/StepForm";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS: FormStep[] = [
  {
    key: "name",
    short: "Name",
    title: () => "Hi! What’s your name?",
    help: "Your full name.",
    placeholder: "Type your name here",
    kind: "text",
    autoComplete: "name",
    validate: (a) => (String(a.name).trim().length < 2 ? "Please tell us your name." : null),
  },
  {
    key: "skills",
    short: "Skills",
    title: (a) => `Nice to meet you, ${firstName(a.name)}. What do you do best?`,
    help: "Choose all that apply.",
    kind: "choice",
    multiple: true,
    choices: [
      "Marketing strategy",
      "Paid ads",
      "Social media management",
      "Content creation",
      "Graphic design & branding",
      "Video editing",
      "Copywriting",
      "Web design",
      "Email marketing",
      "Something else",
    ],
  },
  {
    key: "experience",
    short: "Experience",
    title: () => "How long have you been doing this work?",
    help: "Paid or unpaid, it all counts.",
    kind: "choice",
    choices: ["Less than 1 year", "1–2 years", "3–5 years", "More than 5 years"],
  },
  {
    key: "portfolio",
    short: "Portfolio",
    title: () => "Where can we see your work?",
    help: "A portfolio, Instagram page, Behance, Google Drive folder or anything else that shows what you do.",
    placeholder: "Paste a link",
    kind: "url",
    optional: true,
  },
  {
    key: "whatsapp",
    short: "WhatsApp",
    title: () => "What’s your WhatsApp number?",
    help: "This is how we’ll reach you about next steps.",
    placeholder: "+234 801 234 5678",
    kind: "tel",
    autoComplete: "tel",
    validate: (a) => validatePhone(String(a.whatsapp)),
  },
  {
    key: "email",
    short: "Email",
    title: () => "And your email address?",
    help: "In case we need to send you anything.",
    placeholder: "you@example.com",
    kind: "email",
    autoComplete: "email",
    validate: (a) => (EMAIL.test(String(a.email).trim()) ? null : "Please enter a valid email address."),
  },
];

export function JoinForm() {
  return (
    <StepForm
      steps={STEPS}
      source="join-the-team"
      subject={(a) => `New team application from ${display(a, "name")}`}
      reviewTitle="Your application"
      reviewHelp="Check your answers, then send your application."
      submitLabel="Send application"
      success={{
        title: (a) => `Thanks, ${firstName(a.name)}. We’ve got your application.`,
        body: "We read every application. If there’s a fit, we’ll reach out on WhatsApp.",
      }}
    />
  );
}
