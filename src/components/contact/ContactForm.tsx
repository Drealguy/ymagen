"use client";

import { validatePhone } from "@/lib/phone";
import { SERVICES } from "@/lib/services";
import { display, firstName, StepForm, type Answers, type FormStep } from "@/components/forms/StepForm";

const NOT_SURE = "Not sure yet";

const STEPS: FormStep[] = [
  {
    key: "name",
    short: "Name",
    title: () => "Hello! What’s your name?",
    help: "Your full name.",
    placeholder: "Type your name here",
    kind: "text",
    autoComplete: "name",
    validate: (a) => (String(a.name).trim().length < 2 ? "Please tell us your name." : null),
  },
  {
    key: "business",
    short: "Business",
    title: (a) => `Nice to meet you, ${firstName(a.name)}. What’s your business called?`,
    help: "Just starting out? Tell us what you’re building.",
    placeholder: "Business name",
    kind: "text",
    autoComplete: "organization",
  },
  {
    key: "services",
    short: "Help with",
    title: () => "What do you need help with?",
    help: "Choose all that apply. Not sure? That’s fine, we’ll work it out together.",
    kind: "choice",
    choices: [...SERVICES.map((s) => s.name), NOT_SURE],
    multiple: true,
    exclusive: NOT_SURE,
  },
  {
    key: "goal",
    short: "Growth goal",
    title: () => "What would growth look like for your business?",
    help: "More leads, more sales, a new launch? A sentence or two is plenty.",
    placeholder: "Type your answer here",
    kind: "textarea",
  },
  {
    key: "whatsapp",
    short: "WhatsApp",
    title: () => "Where can we reach you on WhatsApp?",
    help: "We’ll message you to set up a conversation.",
    placeholder: "+234 801 234 5678",
    kind: "tel",
    autoComplete: "tel",
    validate: (a) => validatePhone(String(a.whatsapp)),
  },
];

function whatsappMessage(a: Answers) {
  return [
    "Hi Ymagen, I’d like to talk about growing my business.",
    "",
    ...STEPS.map((step) => `${step.short}: ${display(a, step.key)}`),
  ].join("\n");
}

export function ContactForm() {
  return (
    <StepForm
      steps={STEPS}
      source="contact-page"
      subject={(a) => `New enquiry from ${display(a, "name")} (${display(a, "business")})`}
      reviewTitle={"Here’s what you told us"}
      reviewHelp={"Check your answers, then choose how you’d like to send them."}
      whatsapp={{ message: whatsappMessage }}
      submitLabel="Send by email"
      success={{
        title: (a) => `Thanks, ${firstName(a.name)}. We’ll be in touch.`,
        body: "We’ve got your details. We’ll message you on WhatsApp to set up a conversation about your business and your goals.",
      }}
    />
  );
}
