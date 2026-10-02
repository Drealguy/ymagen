/**
 * The real Ymagen team only. Never invent names, roles or photos.
 *
 * Entries marked `placeholder` exist so the section can be designed before
 * the real team details arrive. They render in development only, with a
 * visible "Sample" tag, and never ship to production.
 */
export type TeamMember = {
  /** Leave out until confirmed; the card then leads with the role. */
  name?: string;
  /** Leave out until confirmed. */
  role?: string;
  /** Portrait photo, ideally 4:5. Without one, a neutral silhouette is shown. */
  photo?: string;
  linkedin?: string;
  instagram?: string;
  placeholder?: boolean;
};

export const TEAM: TeamMember[] = [
  {
    name: "Rotimi Oyekan",
    role: "Founder & Ads Strategist",
    photo: "/team/rotimi-oyekan.jpg",
  },
  {
    name: "Feranmi Ojediji",
    role: "Creative Director",
    photo: "/team/feranmi-ojediji.jpg",
    instagram: "https://instagram.com/feranmi.ojediji",
  },
  {
    name: "Timileyin Adesina",
    role: "Graphic Designer",
    photo: "/team/timileyin-adesina.jpg",
  },
  // Real team members whose details are on the way. Add name, role and photo when ready.
  { name: "Kehinde Mosope", role: "SEO Specialist" },
  { role: "Social Media Manager" },
];

/** What the site is allowed to show: real people, plus samples in development. */
export const VISIBLE_TEAM = TEAM.filter((m) => !m.placeholder || process.env.NODE_ENV === "development");

