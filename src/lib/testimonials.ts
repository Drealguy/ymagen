/**
 * Genuine client feedback only. Never invent names, quotes, ratings or
 * companies.
 *
 * Entries marked `placeholder` exist so the section can be designed before
 * real feedback arrives. They render in development only, with a visible
 * "Sample" tag, and never ship to production.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Square photo of the client. Without one, their initials are shown. */
  photo?: string;
  /** Only include when the client actually gave a rating. */
  rating?: 1 | 2 | 3 | 4 | 5;
  placeholder?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Real client feedback goes here: what changed for their business after working with Ymagen.",
    name: "Client name",
    role: "Role",
    company: "Business name",
    placeholder: true,
  },
  {
    quote:
      "A second genuine quote goes here, ideally about leads, customers or sales rather than likes and followers.",
    name: "Client name",
    role: "Role",
    company: "Business name",
    placeholder: true,
  },
  {
    quote: "A short quote works too. Clear beats long.",
    name: "Client name",
    role: "Role",
    company: "Business name",
    placeholder: true,
  },
];

/** What the site is allowed to show: real feedback, plus samples in development. */
export const VISIBLE_TESTIMONIALS = TESTIMONIALS.filter(
  (t) => !t.placeholder || process.env.NODE_ENV === "development",
);
