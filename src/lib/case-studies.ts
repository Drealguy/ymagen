/**
 * Real client work only. Outcomes describe what was delivered; never add
 * numbers or results unless the client has confirmed them.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  service: string;
  summary: string;
  challenge: string;
  solution: string;
  outcome: string;
  cover: { src: string; alt: string; width: number; height: number };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "jemfak",
    client: "Jemfak Solution Service",
    service: "Branding",
    summary:
      "A complete brand identity built from the ground up, giving Jemfak a clear personality and a professional foundation for growth.",
    challenge:
      "Jemfak had a working business but no defined brand. Its visuals were inconsistent, which made the business hard to recognise and gave customers no clear sense of what it stood for.",
    solution:
      "We developed Jemfak's brand identity and visual direction from scratch, including the logo, visual system and a consistent way of presenting the brand everywhere it shows up.",
    outcome:
      "Jemfak now has a distinct, cohesive identity that customers can recognise and trust, and a consistent foundation for its future marketing.",
    cover: {
      src: "/case-studies/jemfak-cover.jpg",
      alt: "Jemfak Solution Service logo in blue on a dark navy background",
      width: 1600,
      height: 1600,
    },
  },
];
