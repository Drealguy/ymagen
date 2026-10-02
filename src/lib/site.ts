/**
 * Single source of truth for the values most likely to change.
 */

/**
 * The live site address, used for canonical URLs, the sitemap and social
 * previews. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a staging deploy).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ymagen.online").replace(/\/$/, "");

/**
 * When the site is expected back online: Friday 25 September 2026, end of day.
 * The explicit +01:00 (West Africa Time) offset is deliberate — it pins the
 * countdown to one real instant, so a visitor in Lagos and a visitor in London
 * see the same number rather than each counting to their own local midnight.
 */
export const BACK_ONLINE_ISO = "2026-09-25T23:59:59+01:00";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgldraz";

export const INSTAGRAM_HANDLE = "ymagenafrica";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
] as const;

/** Every "Let's Talk" CTA on the site points here. */
export const CONTACT_HREF = "/contact";

export type ClientLogo = { name: string; src: string; width: number; height: number };

const JEMFAK: ClientLogo = {
  name: "Jemfak Solution Service",
  src: "/clients/jemfak.png",
  width: 747,
  height: 260,
};

/**
 * Real clients only. Jemfak is repeated as a stand-in until more logos arrive —
 * replace the duplicates, don't add invented brands.
 */
export const CLIENT_LOGOS: ClientLogo[] = [JEMFAK, JEMFAK, JEMFAK, JEMFAK, JEMFAK, JEMFAK];

/**
 * Public contact details. Leave a value as null until the real one is
 * confirmed; the footer only shows what's filled in.
 */
export const CONTACT: { email: string | null; phone: string | null; whatsapp: string } = {
  email: null,
  phone: null,
  /** Display format; see WHATSAPP_URL for the dialable link. */
  whatsapp: "0916 656 0652",
};

/** wa.me needs the international number without + or spaces (Nigeria: 234, drop the leading 0). */
export const WHATSAPP_URL = "https://wa.me/2349166560652";

export const SOCIAL_LINKS = [{ label: "Instagram", href: INSTAGRAM_URL, icon: "instagram" }] as const;

export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
